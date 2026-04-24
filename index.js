import TRIAGE_PROMPT from '../prompts/triage.js';
import HAIKU_PROMPT from '../prompts/haiku.js';
import SONNET_PROMPT from '../prompts/sonnet.js';

const GRATIS_PROMPT = `Du bist ein Analyse-System für EU261/2004 Fluggastrechte.

Deine Aufgabe:
Lies das Dokument und erstelle eine kurze, kostenlose Ersteinschätzung für den Fluggast.

Fokus: Besteht möglicherweise ein Anspruch auf Entschädigung nach EU-Verordnung 261/2004?

Gib deine Antwort IMMER exakt in dieser Struktur zurück:

[AIRLINE]
Name der Fluggesellschaft
[/AIRLINE]

[DISRUPTION_TYPE]
Art der Störung (z.B. Verspätung, Annullierung, Beförderungsverweigerung)
[/DISRUPTION_TYPE]

[CLAIM_AMOUNT]
Möglicher Entschädigungsbetrag als Zahl (250, 400 oder 600) — nur die Zahl, kein €-Zeichen
[/CLAIM_AMOUNT]

[FLIGHT_DATE]
Flugdatum (z.B. 15.03.2024) oder "unklar"
[/FLIGHT_DATE]

[RISK]
low oder medium oder high
[/RISK]

[TEASER]
Schreibe genau 1 Satz: Nenne NUR dass möglicherweise ein Anspruch auf Entschädigung besteht.
Nenne KEINE Gründe, KEINE Paragraphen, KEINE Details.
[/TEASER]`;

// ── Claude API ────────────────────────────────────────────────────────────────

async function callClaudeDocument(env, { model, maxTokens, prompt, fileBase64, mediaType }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{
        role: "user",
        content: [
          mediaType === "application/pdf"
            ? { type: "document", source: { type: "base64", media_type: mediaType, data: fileBase64 } }
            : { type: "image", source: { type: "base64", media_type: mediaType, data: fileBase64 } },
          { type: "text", text: prompt }
        ]
      }]
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Claude API Fehler: ${JSON.stringify(data)}`);
  return data?.content?.[0]?.text || "";
}

// ── Utils ─────────────────────────────────────────────────────────────────────

async function fileToBase64(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return { base64: btoa(binary), mediaType: file.type || "application/pdf" };
}

function safeJsonParse(str) {
  try {
    const match = String(str).match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch { return null; }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}

function validateUploadInput({ file, name, email }) {
  if (!file) return "Keine Datei empfangen";
  if (!name || !String(name).trim()) return "Name fehlt";
  if (!email || !String(email).includes("@")) return "Ungültige E-Mail-Adresse";
  return null;
}

function extractTaggedSection(text, tag) {
  const start = `[${tag}]`;
  const end = `[/${tag}]`;
  const si = text.indexOf(start);
  const ei = text.indexOf(end);
  if (si === -1 || ei === -1) return "";
  return text.substring(si + start.length, ei).trim();
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

// ── RTF ───────────────────────────────────────────────────────────────────────

function rtfEscape(str) {
  return String(str || "")
    .replace(/\\/g, "\\\\").replace(/\{/g, "\\{").replace(/\}/g, "\\}")
    .replace(/\n/g, "\\par\n")
    .replace(/[^\x00-\x7F]/g, c => `\\u${c.charCodeAt(0)}?`);
}

function rtfToBase64(rtfString) {
  const bytes = new TextEncoder().encode(rtfString);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function bulletLines(text) {
  return String(text || "").split("\n").map(l => l.trim()).filter(Boolean)
    .map(l => `{\\pard\\sb0\\sa200\\fi-300\\li300\\f1\\fs22 \\bullet  ${rtfEscape(l.replace(/^- /, ""))}\\par}`)
    .join("\n");
}

function maakAnalyseRtf(analysis, customerName, customerEmail, triage) {
  const title = extractTaggedSection(analysis, "TITLE") || "Fluganspruch Analyse";
  const claimBetrag = triage?.claim_amount ? `\\u8364?${triage.claim_amount}` : "unbekannt";

  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}{\\f1\\fswiss\\fcharset0 Arial;}}
{\\colortbl;\\red27\\green58\\blue140;\\red153\\green26\\blue26;}
\\paperw11906\\paperh16838\\margl1800\\margr1800\\margt1440\\margb1440\\f1\\fs22
{\\pard\\sb400\\sa200\\f1\\fs32\\b\\cf1 ${rtfEscape(title)}\\par}
{\\pard\\sb0\\sa100\\f1\\fs20\\cf0 Fluggast: ${rtfEscape(customerName || "")} (${rtfEscape(customerEmail || "")})\\par}
{\\pard\\sb0\\sa200\\f1\\fs20\\cf0 Airline: ${rtfEscape(triage?.airline || "unbekannt")} | St\\u246?rung: ${rtfEscape(triage?.disruption_type || "unbekannt")} | M\\u246?gl. Entsch\\u228?digung: ${claimBetrag} | Risiko: ${rtfEscape(triage?.risk || "")}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Zusammenfassung\\par}
{\\pard\\sa200\\f1\\fs22 ${rtfEscape(extractTaggedSection(analysis, "SUMMARY"))}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Feststellungen\\par}
${bulletLines(extractTaggedSection(analysis, "ISSUES"))}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Einsch\\u228?tzung\\par}
{\\pard\\sa200\\f1\\fs22 ${rtfEscape(extractTaggedSection(analysis, "ASSESSMENT"))}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b N\\u228?chste Schritte\\par}
${bulletLines(extractTaggedSection(analysis, "NEXT_STEPS"))}
{\\pard\\sb400\\sa100\\f1\\fs18\\cf0\\i Hinweis: Dies ist eine informative Analyse und keine Rechtsberatung. Bei Unsicherheiten empfehlen wir, die Verbraucherzentrale oder einen Anwalt zu konsultieren.\\par}
}`;
}

function maakAnspruchsschreibenRtf(analysis, customerName, triage) {
  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}{\\f1\\fswiss\\fcharset0 Arial;}}
{\\colortbl;\\red27\\green58\\blue140;\\red153\\green26\\blue26;}
\\paperw11906\\paperh16838\\margl1800\\margr1800\\margt1440\\margb1440\\f1\\fs22
{\\pard\\sb400\\sa200\\f1\\fs28\\b\\cf2 Anspruchsschreiben EU-VO 261/2004\\par}
{\\pard\\sb0\\sa200\\f1\\fs20\\cf0 Erstellt f\\u252?r: ${rtfEscape(customerName || "")} | Airline: ${rtfEscape(triage?.airline || "unbekannt")}\\par}
{\\pard\\sb300\\sa200\\f1\\fs22\\cf0 ${rtfEscape(extractTaggedSection(analysis, "OBJECTION"))}\\par}
{\\pard\\sb400\\sa100\\f1\\fs18\\cf0\\i Hinweis: Dies ist ein Entwurf und keine Rechtsberatung. Sende das Schreiben per Einschreiben, wenn eine schriftliche Form erforderlich ist. FlugClaim.de haftet nicht f\\u252?r den Ausgang deines Anspruchs.\\par}
}`;
}

function maakAdminRtf(analysis, customerName, customerEmail, triage) {
  const claimBetrag = triage?.claim_amount ? `\\u8364?${triage.claim_amount}` : "unbekannt";

  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}{\\f1\\fswiss\\fcharset0 Arial;}}
{\\colortbl;\\red27\\green58\\blue140;\\red153\\green26\\blue26;}
\\paperw11906\\paperh16838\\margl1800\\margr1800\\margt1440\\margb1440\\f1\\fs22
{\\pard\\sb400\\sa200\\f1\\fs32\\b\\cf1 ${rtfEscape(extractTaggedSection(analysis, "TITLE") || "Fluganspruch Analyse")}\\par}
{\\pard\\sb0\\sa100\\f1\\fs20\\cf0 Fluggast: ${rtfEscape(customerName || "")} (${rtfEscape(customerEmail || "")})\\par}
{\\pard\\sb0\\sa200\\f1\\fs20\\cf0 Airline: ${rtfEscape(triage?.airline || "unbekannt")} | Flug: ${rtfEscape(triage?.flight_number || "unbekannt")} | Datum: ${rtfEscape(triage?.flight_date || "unbekannt")} | Versp\\u228?tung: ${triage?.delay_hours ? triage.delay_hours + " Std." : "unbekannt"} | Betrag: ${claimBetrag} | Risiko: ${rtfEscape(triage?.risk || "")}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Zusammenfassung\\par}
{\\pard\\sa200\\f1\\fs22 ${rtfEscape(extractTaggedSection(analysis, "SUMMARY"))}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Feststellungen\\par}
${bulletLines(extractTaggedSection(analysis, "ISSUES"))}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Einsch\\u228?tzung\\par}
{\\pard\\sa200\\f1\\fs22 ${rtfEscape(extractTaggedSection(analysis, "ASSESSMENT"))}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b N\\u228?chste Schritte\\par}
${bulletLines(extractTaggedSection(analysis, "NEXT_STEPS"))}
{\\pard\\sa200\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b\\cf2 Anspruchsschreiben\\par}
{\\pard\\sa200\\f1\\fs22\\cf0 ${rtfEscape(extractTaggedSection(analysis, "OBJECTION"))}\\par}
{\\pard\\sb400\\sa100\\f1\\fs18\\cf0\\i Hinweis: Informative Analyse, keine Rechtsberatung.\\par}
}`;
}

// ── Handlers ──────────────────────────────────────────────────────────────────

async function handleTriage(env, fileBase64, mediaType) {
  const raw = await callClaudeDocument(env, {
    model: "claude-haiku-4-5-20251001", maxTokens: 800,
    prompt: TRIAGE_PROMPT, fileBase64, mediaType
  });
  const p = safeJsonParse(raw);
  if (!p) return { airline: null, flight_number: null, flight_date: null, delay_hours: null, disruption_type: null, claim_amount: null, risk: "medium", route: "SONNET" };
  return {
    airline: p.airline || null,
    flight_number: p.flight_number || null,
    flight_date: p.flight_date || null,
    delay_hours: typeof p.delay_hours === "number" ? p.delay_hours : null,
    disruption_type: p.disruption_type || null,
    claim_amount: typeof p.claim_amount === "number" ? p.claim_amount : null,
    risk: p.risk || "medium",
    route: p.route || "SONNET"
  };
}

async function handleGratisAnalyse(env, fileBase64, mediaType) {
  const raw = await callClaudeDocument(env, {
    model: "claude-haiku-4-5-20251001", maxTokens: 600,
    prompt: GRATIS_PROMPT, fileBase64, mediaType
  });
  return {
    airline: extractTaggedSection(raw, "AIRLINE") || null,
    disruption_type: extractTaggedSection(raw, "DISRUPTION_TYPE") || null,
    claim_amount: parseFloat(extractTaggedSection(raw, "CLAIM_AMOUNT")) || null,
    flight_date: extractTaggedSection(raw, "FLIGHT_DATE") || null,
    risk: extractTaggedSection(raw, "RISK") || "medium",
    teaser: extractTaggedSection(raw, "TEASER") || null
  };
}

async function generateAnalysis(env, { fileBase64, mediaType, route }) {
  const useSonnet = route === "SONNET";
  return await callClaudeDocument(env, {
    model: useSonnet ? "claude-sonnet-4-6" : "claude-haiku-4-5-20251001",
    maxTokens: useSonnet ? 3500 : 1800,
    prompt: useSonnet ? SONNET_PROMPT : HAIKU_PROMPT,
    fileBase64, mediaType
  }) || "";
}

// ── Mail helpers ──────────────────────────────────────────────────────────────

function buildGratisMailHtml({ name, airline, disruption_type, claim_amount, flight_date, risk, teaser, stripeLink }) {
  const riskLabel = { low: "Niedrig", medium: "Mittel", high: "Hoch" }[risk] || risk;
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
      <h2 style="color:#1d3a6e;">Deine kostenlose Ersteinschätzung</h2>
      <p>Hallo ${escapeHtml(name)},</p>
      <p>wir haben dein Fluggastdokument auf Basis der EU-Verordnung 261/2004 analysiert.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0;">
        <tr style="background:#f3f4f6;"><td style="padding:10px 14px;font-weight:bold;">Fluggesellschaft</td><td style="padding:10px 14px;">${escapeHtml(airline || "unbekannt")}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:bold;">Art der Störung</td><td style="padding:10px 14px;">${escapeHtml(disruption_type || "unbekannt")}</td></tr>
        ${flight_date && flight_date !== "unklar" ? `<tr style="background:#f3f4f6;"><td style="padding:10px 14px;font-weight:bold;">Flugdatum</td><td style="padding:10px 14px;">${escapeHtml(flight_date)}</td></tr>` : ""}
        <tr style="background:#f3f4f6;"><td style="padding:10px 14px;font-weight:bold;">Mögliche Entschädigung</td><td style="padding:10px 14px;font-weight:bold;color:#1d3a6e;">${claim_amount ? `€ ${claim_amount}` : "unbekannt"}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:bold;">Erfolgsaussicht</td><td style="padding:10px 14px;">${riskLabel}</td></tr>
      </table>
      <p style="background:#fef9c3;border-left:4px solid #eab308;padding:12px 16px;border-radius:4px;">${escapeHtml(teaser || "Möglicherweise besteht ein Anspruch auf Entschädigung nach EU-Verordnung 261/2004.")}</p>
      <p>Für eine vollständige Analyse mit fertigem Anspruchsschreiben:</p>
      <a href="${stripeLink}" style="display:inline-block;background:#1d3a6e;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;margin:8px 0;">
        Vollständige Analyse für €29 →
      </a>
      <p style="color:#6b7280;font-size:0.85rem;margin-top:32px;">Hinweis: Dies ist eine informative Ersteinschätzung und keine Rechtsberatung. Bei komplexen Fragen empfehlen wir die Verbraucherzentrale oder einen Anwalt.</p>
    </div>
  `;
}

// ── Mailers ───────────────────────────────────────────────────────────────────

async function sendAdminGratisNotification(env, { name, email, gratis, stripeLink }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "FlugClaim.de <noreply@flugclaim.de>",
      to: [env.ADMIN_EMAIL || "admin@flugclaim.de"],
      reply_to: [email],
      subject: `Neue Gratis-Anfrage: ${name} (${email})`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <p style="background:#f3f4f6;padding:10px 14px;border-radius:6px;font-size:0.85rem;color:#6b7280;">📬 Kundenmail wird morgen um 15:00 Uhr versandt an <strong>${escapeHtml(email)}</strong></p>
        ${buildGratisMailHtml({ name, ...gratis, stripeLink })}
      </div>`
    })
  });
  if (!res.ok) throw new Error(`Admin-Benachrichtigung fehlgeschlagen: ${await res.text()}`);
}

async function sendAdminPaidNotification(env, { customerName, customerEmail, triage, analysis }) {
  const rtfContent = maakAdminRtf(analysis, customerName, customerEmail, triage);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "FlugClaim.de <noreply@flugclaim.de>",
      to: [env.ADMIN_EMAIL || "admin@flugclaim.de"],
      reply_to: [customerEmail],
      subject: `Neue bezahlte Analyse: ${customerName || "Unbekannt"} (${customerEmail})`,
      html: `<div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;">
        <p style="background:#f3f4f6;padding:10px 14px;border-radius:6px;font-size:0.85rem;color:#6b7280;">📬 Kundenmail (2 Anhänge) wird morgen um 15:00 Uhr versandt an <strong>${escapeHtml(customerEmail)}</strong></p>
        <h2>Neue bezahlte Fluganspruch-Analyse</h2>
        <p><strong>Name:</strong> ${escapeHtml(customerName || "")}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(customerEmail || "")}</p>
        <p><strong>Airline:</strong> ${escapeHtml(triage?.airline || "unbekannt")}</p>
        <p><strong>Flugnummer:</strong> ${escapeHtml(triage?.flight_number || "unbekannt")}</p>
        <p><strong>Datum:</strong> ${escapeHtml(triage?.flight_date || "unbekannt")}</p>
        <p><strong>Verspätung:</strong> ${triage?.delay_hours ? triage.delay_hours + " Std." : "unbekannt"}</p>
        <p><strong>Möglicher Betrag:</strong> ${triage?.claim_amount ? `€ ${triage.claim_amount}` : "unbekannt"}</p>
        <p><strong>Risiko:</strong> ${escapeHtml(triage?.risk || "")}</p>
      </div>`,
      attachments: [{ filename: "Fluganspruch-Analyse.rtf", content: rtfToBase64(rtfContent) }]
    })
  });
  if (!res.ok) throw new Error(`Admin-Mail fehlgeschlagen: ${await res.text()}`);
}

async function sendDelayedGratisEmail(env, entry) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "FlugClaim.de <noreply@flugclaim.de>",
      to: [entry.email],
      subject: "Deine kostenlose Ersteinschätzung – FlugClaim.de",
      html: buildGratisMailHtml({
        name: entry.name,
        airline: entry.airline,
        disruption_type: entry.disruption_type,
        claim_amount: entry.claim_amount,
        flight_date: entry.flight_date,
        risk: entry.risk,
        teaser: entry.teaser,
        stripeLink: entry.stripe_link || "https://flugclaim.de"
      })
    })
  });
  if (!res.ok) throw new Error(`Gratis-Mail fehlgeschlagen: ${await res.text()}`);
}

async function sendDelayedPaidEmail(env, entry) {
  const analyseRtf = maakAnalyseRtf(entry.analysis, entry.name, entry.email, entry.triage);
  const anspruchRtf = maakAnspruchsschreibenRtf(entry.analysis, entry.name, entry.triage);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "FlugClaim.de <noreply@flugclaim.de>",
      to: [entry.email],
      subject: "Deine vollständige Fluganspruch-Analyse – FlugClaim.de",
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
        <h2 style="color:#1d3a6e;">Deine vollständige Analyse ist fertig</h2>
        <p>Hallo ${escapeHtml(entry.name)},</p>
        <p>im Anhang findest du zwei Dateien:</p>
        <ul style="line-height:1.9;">
          <li><strong>Fluganspruch-Analyse.rtf</strong> — vollständige Analyse mit allen Feststellungen, Einschätzung und nächsten Schritten</li>
          <li><strong>Anspruchsschreiben.rtf</strong> — fertiges Anspruchsschreiben auf Basis der EU-VO 261/2004, direkt verwendbar</li>
        </ul>
        <p>Fluggesellschaft: <strong>${escapeHtml(entry.triage?.airline || "unbekannt")}</strong></p>
        ${entry.triage?.claim_amount ? `<p>Mögliche Entschädigung: <strong>€ ${entry.triage.claim_amount}</strong></p>` : ""}
        <p style="background:#f0fdf4;border-left:4px solid #22c55e;padding:12px 16px;border-radius:4px;font-size:0.9rem;">
          💡 Tipp: Sende das Anspruchsschreiben per Einschreiben mit Rückschein. Bei ausbleibender Reaktion kannst du die Schlichtungsstelle Reise &amp; Verkehr einschalten oder das Amtsgericht anrufen.
        </p>
        <p style="color:#6b7280;font-size:0.85rem;margin-top:32px;">Hinweis: Dies ist eine informative Analyse und keine Rechtsberatung.</p>
      </div>`,
      attachments: [
        { filename: "Fluganspruch-Analyse.rtf", content: rtfToBase64(analyseRtf) },
        { filename: "Anspruchsschreiben.rtf", content: rtfToBase64(anspruchRtf) }
      ]
    })
  });
  if (!res.ok) throw new Error(`Bezahlte Mail fehlgeschlagen: ${await res.text()}`);
}

// ── Cron handler ──────────────────────────────────────────────────────────────

async function handleCron(env) {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const list = await env.FLUG_QUEUE.list();

  for (const key of list.keys) {
    try {
      const raw = await env.FLUG_QUEUE.get(key.name);
      if (!raw) continue;
      const entry = JSON.parse(raw);
      if (now - new Date(entry.created_at).getTime() < oneDayMs) continue;
      if (entry.type === "gratis") {
        await sendDelayedGratisEmail(env, entry);
      } else {
        await sendDelayedPaidEmail(env, entry);
      }
      await env.FLUG_QUEUE.delete(key.name);
    } catch (err) {
      console.error(`Cron-Fehler für ${key.name}:`, err.message);
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/analyze") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");
        if (!file) return jsonResponse({ ok: false, error: "Keine Datei empfangen" }, 400);
        const { base64, mediaType } = await fileToBase64(file);
        const triage = await handleTriage(env, base64, mediaType);
        return jsonResponse({ ok: true, ...triage });
      } catch (err) {
        return jsonResponse({ ok: false, error: err.message }, 500);
      }
    }

    if (request.method === "POST" && url.pathname === "/analyze-free") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");
        const name = formData.get("name");
        const email = formData.get("email");
        const stripeLink = env.STRIPE_LINK || "https://flugclaim.de";

        const err = validateUploadInput({ file, name, email });
        if (err) return jsonResponse({ ok: false, error: err }, 400);

        const { base64, mediaType } = await fileToBase64(file);
        const gratis = await handleGratisAnalyse(env, base64, mediaType);

        await env.FLUG_QUEUE.put(`gratis:${Date.now()}:${email}`, JSON.stringify({
          type: "gratis", name, email,
          airline: gratis.airline || "",
          disruption_type: gratis.disruption_type || "",
          claim_amount: gratis.claim_amount || null,
          flight_date: gratis.flight_date || "",
          risk: gratis.risk || "medium",
          teaser: gratis.teaser || "",
          stripe_link: stripeLink,
          created_at: new Date().toISOString()
        }));

        try { await sendAdminGratisNotification(env, { name, email, gratis, stripeLink }); } catch (_) {}

        return jsonResponse({ ok: true, message: "Du erhältst deine Einschätzung spätestens am nächsten Werktag vor 16:00 Uhr per E-Mail." });
      } catch (err) {
        return jsonResponse({ ok: false, error: err.message }, 500);
      }
    }

    if (request.method === "POST" && url.pathname === "/submit") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");
        const name = formData.get("name");
        const email = formData.get("email");

        const err = validateUploadInput({ file, name, email });
        if (err) return jsonResponse({ ok: false, error: err }, 400);

        const { base64, mediaType } = await fileToBase64(file);
        const triage = await handleTriage(env, base64, mediaType);
        const analysis = await generateAnalysis(env, { fileBase64: base64, mediaType, route: triage.route });

        await env.FLUG_QUEUE.put(`paid:${Date.now()}:${email}`, JSON.stringify({
          type: "paid", name, email, analysis, triage,
          created_at: new Date().toISOString()
        }));

        await sendAdminPaidNotification(env, { customerName: name, customerEmail: email, triage, analysis });

        return jsonResponse({ ok: true, message: "Upload erfolgreich. Du erhältst deine vollständige Analyse spätestens am nächsten Werktag vor 16:00 Uhr per E-Mail." });
      } catch (err) {
        return jsonResponse({ ok: false, error: err.message }, 500);
      }
    }

    return new Response("Not found", { status: 404 });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleCron(env));
  }
};
