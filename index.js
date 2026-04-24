<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flugverspätung? Dein fertiges Anspruchsschreiben in 24 Stunden | FlugClaim.de</title>
  <meta name="description" content="Flug verspätet oder annulliert? Erhalte innerhalb von 24 Stunden eine vollständige EU261-Analyse und ein fertiges Anspruchsschreiben. Einmalig €29 — du behältst 100% der Entschädigung.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <style>
    /* ── For-whom section ── */
    .forwhom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 8px; }
    @media (max-width: 680px) { .forwhom-grid { grid-template-columns: 1fr; } }
    .forwhom-card { border-radius: 14px; padding: 24px; }
    .forwhom-card--yes { background: var(--green-soft); border: 1.5px solid #bbf7d0; }
    .forwhom-card--no  { background: var(--surface); border: 1.5px solid var(--line); }
    .forwhom-title { font-weight: 700; font-size: 1rem; margin-bottom: 14px; }
    .forwhom-title--yes { color: var(--green); }
    .forwhom-title--no  { color: var(--muted); }
    .forwhom-list { list-style: none; display: grid; gap: 8px; }
    .forwhom-list li { font-size: 0.88rem; color: var(--ink-3); display: flex; gap: 8px; line-height: 1.5; }
    .forwhom-icon--yes { color: var(--green); font-weight: 700; flex-shrink: 0; }
    .forwhom-icon--no  { color: var(--muted); flex-shrink: 0; }

    /* ── Trust badges ── */
    .trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 8px; }
    @media (max-width: 680px) { .trust-grid { grid-template-columns: 1fr; } }
    .trust-item { background: var(--white); border: 1px solid var(--line); border-radius: 12px; padding: 20px 16px; }
    .trust-item__label { font-size: 0.76rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); margin-bottom: 6px; }
    .trust-item__text { font-size: 0.88rem; color: var(--ink-3); line-height: 1.65; }

    /* ── Expectation box ── */
    .expectation-box { background: var(--surface); border: 1.5px solid var(--line); border-radius: 14px; padding: 28px; margin-top: 8px; }
    .expectation-box h3 { font-size: 1.05rem; margin-bottom: 16px; color: var(--ink); }
    .expectation-row { display: flex; gap: 12px; margin-bottom: 14px; font-size: 0.9rem; color: var(--ink-3); line-height: 1.6; }
    .expectation-icon { flex-shrink: 0; font-weight: 700; color: var(--green); }

    /* ── Compare table ── */
    .compare-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; margin-top: 24px; }
    .compare-table th { padding: 12px 16px; font-weight: 700; border-bottom: 2px solid var(--line); }
    .compare-table th:first-child { text-align: left; }
    .compare-table th:not(:first-child) { text-align: center; }
    .compare-table td { padding: 12px 16px; border-bottom: 1px solid var(--line); }
    .compare-table td:first-child { text-align: left; color: var(--ink); }
    .compare-table td:not(:first-child) { text-align: center; }
    .compare-table tr:nth-child(even) { background: var(--surface); }
    .col-them { color: var(--muted); }
    .col-us { color: var(--accent); font-weight: 700; }
    .compare-winner { background: var(--green-soft) !important; }
    .compare-winner td:last-child { color: var(--green); font-weight: 700; }

    /* ── Pricing box ── */
    .pricing-box { background: var(--accent-soft); border: 2px solid var(--accent-2); border-radius: 16px; padding: 32px 28px; text-align: center; margin-top: 8px; }
    .pricing-box__amount { font-size: 3rem; font-weight: 700; color: var(--accent); line-height: 1; margin-bottom: 6px; font-family: 'DM Serif Display', Georgia, serif; }
    .pricing-box__sub { font-size: 0.9rem; color: var(--muted); margin-bottom: 20px; }
    .pricing-box__list { list-style: none; display: grid; gap: 8px; max-width: 400px; margin: 0 auto 24px; text-align: left; }
    .pricing-box__list li { font-size: 0.9rem; color: var(--ink-3); display: flex; gap: 8px; }
    .pricing-box__honest { background: var(--white); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; font-size: 0.84rem; color: var(--ink-3); line-height: 1.65; max-width: 480px; margin: 0 auto 24px; text-align: left; }
  </style>
</head>

<body>

<!-- HEADER -->
<header class="site-header">
  <div class="container--wide">
    <div class="site-header__inner">
      <div class="logo">
        <span class="logo-dot"></span>
        FlugClaim.de
      </div>
      <button class="header-cta" onclick="openModal()">Anspruch prüfen — €29</button>
    </div>
  </div>
</header>

<!-- HERO -->
<section class="hero">
  <div class="container">

    <div class="hero__eyebrow" style="justify-content:center;text-align:center;display:block;margin-left:auto;margin-right:auto;">
      EU-Verordnung 261/2004 · bis zu €600 Entschädigung pro Person
    </div>

    <h1 style="text-align:center;">Dein Flug war verspätet oder annulliert.<br>Hol dir das volle Geld zurück.</h1>

    <p class="hero__sub" style="text-align:center;margin-left:auto;margin-right:auto;">
      Wir analysieren deinen Anspruch und erstellen ein fertiges Anspruchsschreiben — innerhalb von 24 Stunden.
      Du sendest es selbst an die Airline und behältst <strong>100% der Entschädigung</strong>.
      Kein Claimbureau, das 25–35% einbehält.
    </p>

    <div class="value-strip">
      <span class="value-item"><span class="vi-check">✔</span> Fertiges Schreiben innerhalb von 24 Stunden</span>
      <span class="value-item"><span class="vi-check">✔</span> Keine Erfolgsprovision — einmalig €29</span>
      <span class="value-item"><span class="vi-check">✔</span> Prüfung auf außergewöhnliche Umstände</span>
      <span class="value-item"><span class="vi-check">✔</span> Dokument wird nach Analyse gelöscht</span>
    </div>

    <!-- ZWEI OPTIONEN -->
    <div class="optie-grid">

      <!-- BEZAHLT -->
      <div class="optie-card optie-card--betaald">
        <div class="optie-badge optie-badge--betaald">Empfohlen</div>
        <h3 class="optie-title">Analyse + Anspruchsschreiben</h3>
        <p class="optie-desc">Du sendest das Schreiben selbst — und behältst bis zu €181 mehr als bei einem Claimbureau.</p>
        <ul class="optie-list">
          <li>✓ Vollständige EU261-Analyse deines Anspruchs</li>
          <li>✓ Prüfung: Hält das "außergewöhnliche Umstände"-Argument stand?</li>
          <li>✓ Fertiges Anspruchsschreiben — direkt sendbar</li>
          <li>✓ Konkrete nächste Schritte bei Ablehnung</li>
          <li>✓ Innerhalb von 24 Stunden per E-Mail</li>
        </ul>
        <div style="background:var(--accent-soft);border:1px solid var(--line);border-radius:8px;padding:10px 12px;font-size:0.82rem;color:var(--accent);margin-bottom:16px;line-height:1.55;">
          Du sendest die Anfrage selbst. Dafür behältst du bis zu <strong>€181 mehr</strong> als bei einem Claimbureau.
        </div>
        <div class="optie-price">€29 <span>einmalig · kein Abo</span></div>
        <a href="https://buy.stripe.com/DEIN_STRIPE_LINK" class="optie-btn optie-btn--betaald">
          Jetzt zahlen und Analyse starten →
        </a>
        <p class="optie-security">🔒 Sichere Zahlung über Stripe · SEPA-Lastschrift verfügbar</p>
        <p class="optie-guarantee">Nicht zufrieden? Geld zurück — ohne Diskussion.</p>
      </div>

      <!-- GRATIS -->
      <div class="optie-card optie-card--gratis">
        <div class="optie-badge optie-badge--gratis">Kostenlos</div>
        <h3 class="optie-title">Erst prüfen, dann entscheiden</h3>
        <p class="optie-desc">Noch unsicher, ob dein Anspruch Aussicht auf Erfolg hat? Wir schätzen kostenlos ein.</p>
        <ul class="optie-list">
          <li>✓ Fluggesellschaft und Störungsart erkannt</li>
          <li>✓ Erste Einschätzung: hoch, mittel oder niedrig</li>
          <li>✓ Möglicher Entschädigungsbetrag (€250 / €400 / €600)</li>
          <li>✓ Per E-Mail — spätestens nächsten Werktag vor 16:00 Uhr</li>
        </ul>
        <div class="optie-price">Kostenlos</div>
        <input type="file" id="gratis-file-input" accept=".pdf,.jpg,.jpeg,.png"
               onchange="handleGratisFileSelect(this)" style="display:none;">
        <label class="upload-section upload-section--small" id="gratis-upload-zone" for="gratis-file-input">
          <div class="upload-label">Dokument hochladen</div>
          <div class="upload-hint">PDF, JPG oder PNG · max. 10 MB</div>
        </label>
        <div id="gratis-contact-fields" style="display:none;gap:8px;flex-direction:column;">
          <input type="text" id="gratis-name" placeholder="Dein Name" class="optie-input">
          <input type="email" id="gratis-email" placeholder="Deine E-Mail-Adresse" class="optie-input">
        </div>
        <button class="optie-btn optie-btn--gratis" id="gratis-btn" onclick="startGratisUpload()" disabled>
          Kostenlose Einschätzung anfordern
        </button>
        <div class="optie-status" id="gratis-status"></div>
      </div>

    </div>

    <!-- UPLOAD (verborgen) -->
    <input type="file" id="file-input" accept=".pdf,.jpg,.jpeg,.png" onchange="handleFile(this)" style="display:none;">
    <label class="upload-section" id="upload-zone" for="file-input" style="display:none;">
      <div class="upload-label">Dokument hochladen</div>
      <div class="upload-hint">PDF, JPG oder PNG</div>
    </label>

    <!-- TEASER -->
    <div class="teaser" id="teaser">
      <div class="teaser__header">
        <div>
          <div style="font-size:0.72rem;color:rgba(255,255,255,0.6);margin-bottom:4px;letter-spacing:0.05em;text-transform:uppercase;">Erkannt</div>
          <div class="teaser__company" id="teaser-company">Dein Flug ist bereit zur Analyse</div>
        </div>
        <div class="teaser__status-label">Bereit</div>
      </div>
      <div class="teaser__body">
        <div class="teaser__found" id="teaser-found">Gut. Das passiert jetzt:</div>
        <div class="teaser__sub" id="teaser-sub">Dein Dokument wurde erkannt. Klicke unten um deine Analyse anzufordern.</div>
        <div class="teaser__locked">
          <div class="lock-icon">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div class="teaser__locked-text" id="teaser-locked-text">
            <strong>Vollständige Analyse nach Zahlung</strong>
            Entschädigungsmöglichkeiten, Einschätzung und fertiges Anspruchsschreiben — innerhalb von 24 Stunden.
          </div>
        </div>
      </div>
    </div>

    <div class="cta-wrap">
      <button class="cta-main" onclick="openModal()">
        Anspruch prüfen — €29 · Innerhalb von 24 Stunden
      </button>
      <div class="cta-sub">Einmalige Zahlung · kein Abo · 🔒 Sichere Zahlung über Stripe</div>
    </div>

  </div>
</section>

<!-- HOW IT WORKS -->
<section class="section">
  <div class="container">
    <div class="section-label">So funktioniert es</div>
    <h2>In 3 Schritten zum fertigen Anspruchsschreiben</h2>
    <div class="steps">
      <div class="step">
        <div class="step__num">01</div>
        <div class="step__title">Zahlen und Dokument hochladen</div>
        <div class="step__desc">Nach der Zahlung lädst du deine Bordkarte, Buchungsbestätigung oder den Airline-Brief hoch. Dauert weniger als 2 Minuten.</div>
      </div>
      <div class="step">
        <div class="step__num">02</div>
        <div class="step__title">Wir analysieren deinen Anspruch</div>
        <div class="step__desc">Wir prüfen Verspätung, Annullierung, ob das "außergewöhnliche Umstände"-Argument der Airline stichhaltig ist, und welcher Entschädigungsbetrag gilt.</div>
      </div>
      <div class="step">
        <div class="step__num">03</div>
        <div class="step__title">Fertiges Schreiben per E-Mail</div>
        <div class="step__desc">Innerhalb von 24 Stunden erhältst du die Analyse und ein fertiges Anspruchsschreiben. Du sendest es selbst — und behältst 100% der Entschädigung.</div>
      </div>
    </div>
  </div>
</section>

<!-- FÜR WEN -->
<section class="section section--alt">
  <div class="container">
    <div class="section-label">Für wen ist das?</div>
    <h2>Ehrlich: das passt nicht für jeden</h2>
    <div class="forwhom-grid">
      <div class="forwhom-card forwhom-card--yes">
        <div class="forwhom-title forwhom-title--yes">Gut geeignet wenn...</div>
        <ul class="forwhom-list">
          <li><span class="forwhom-icon--yes">✓</span> Dein Flug mindestens 3 Stunden verspätet ankam oder annulliert wurde</li>
          <li><span class="forwhom-icon--yes">✓</span> Der Flug in der EU abflog — oder mit einer EU-Airline ankam</li>
          <li><span class="forwhom-icon--yes">✓</span> Die Verspätung nicht älter als 3 Jahre ist</li>
          <li><span class="forwhom-icon--yes">✓</span> Du bereit bist, das Schreiben selbst zu senden und ggf. einmal nachzuhaken</li>
          <li><span class="forwhom-icon--yes">✓</span> Du lieber €29 zahlst als 25–35% Provision abzugeben</li>
        </ul>
      </div>
      <div class="forwhom-card forwhom-card--no">
        <div class="forwhom-title forwhom-title--no">Weniger geeignet wenn...</div>
        <ul class="forwhom-list">
          <li><span class="forwhom-icon--no">—</span> Du gar keine Zeit hast, das Schreiben selbst zu senden</li>
          <li><span class="forwhom-icon--no">—</span> Der Flug von außerhalb der EU mit einer Nicht-EU-Airline kam</li>
          <li><span class="forwhom-icon--no">—</span> Die Verspätung weniger als 3 Stunden betrug</li>
          <li><span class="forwhom-icon--no">—</span> Du rechtliche Vertretung für ein Gerichtsverfahren benötigst</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- VERGLEICH -->
<section class="section">
  <div class="container">
    <div class="section-label">Warum FlugClaim.de?</div>
    <h2>Du behältst 100% — nicht 65%</h2>
    <p style="color:var(--ink-3);max-width:620px;margin-bottom:8px;line-height:1.7;">
      Traditionelle Fluggasthelfer klingen kostenlos — aber auf €600 Entschädigung zahlst du bis zu <strong>€210 Provision</strong>. Mit FlugClaim.de für €29 behältst du den Rest.
    </p>
    <div style="overflow-x:auto;">
      <table class="compare-table">
        <thead>
          <tr>
            <th></th>
            <th class="col-them">Claimbureau</th>
            <th class="col-us">FlugClaim.de</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Kosten</td><td class="col-them">25–35% deiner Entschädigung</td><td class="col-us">€29 einmalig</td></tr>
          <tr><td>Du erhältst bei €600</td><td class="col-them">€390 – €450</td><td class="col-us">€571</td></tr>
          <tr class="compare-winner"><td>Dein Vorteil</td><td class="col-them">—</td><td class="col-us">Bis zu €181 mehr</td></tr>
          <tr><td>Ergebnis</td><td class="col-them">Wochen bis Monate</td><td class="col-us">Innerhalb von 24 Stunden</td></tr>
          <tr><td>Du sendest das Schreiben</td><td class="col-them">Nein</td><td class="col-us">Ja — fertig zum Senden</td></tr>
          <tr><td>Kosten bei Misserfolg</td><td class="col-them">Nichts</td><td class="col-us">€29 + vollständiger Bericht</td></tr>
        </tbody>
      </table>
    </div>
    <p style="font-size:0.78rem;color:var(--muted);margin-top:12px;">Vergleich basiert auf öffentlich verfügbaren Provisionssätzen (25–35%). Keine namentliche Nennung einzelner Anbieter.</p>
  </div>
</section>

<!-- VERTRAUEN -->
<section class="section section--alt">
  <div class="container">
    <div class="section-label">Vertrauensbasis</div>
    <h2>Auf welcher Grundlage arbeiten wir?</h2>
    <div class="trust-grid">
      <div class="trust-item">
        <div class="trust-item__label">Rechtliche Grundlage</div>
        <div class="trust-item__text">EU-Verordnung 261/2004 gilt für alle Flüge ab einem EU-Flughafen und für EU-Airlines bei Ankunft in der EU. Sie ist unmittelbar geltendes Recht — keine Grauzone.</div>
      </div>
      <div class="trust-item">
        <div class="trust-item__label">Was wir prüfen</div>
        <div class="trust-item__text">Verspätungsdauer, Flugstrecke, Abflugort, Airline-Nationalität und ob ein "außergewöhnliche Umstände"-Einwand rechtlich standhält. Technische Defekte zählen in der Regel nicht dazu.</div>
      </div>
      <div class="trust-item">
        <div class="trust-item__label">Was wir nicht sind</div>
        <div class="trust-item__text">Wir leisten keine Rechtsberatung und übernehmen keine rechtliche Vertretung. Bei Ablehnung empfehlen wir konkrete nächste Schritte: Schlichtungsstelle Reise & Verkehr, Luftfahrt-Bundesamt oder Amtsgericht.</div>
      </div>
    </div>
  </div>
</section>

<!-- ERWARTUNGSMANAGEMENT -->
<section class="section">
  <div class="container">
    <div class="section-label">Ehrlich gesagt</div>
    <h2>Was du wissen solltest — bevor du zahlst</h2>
    <div class="expectation-box">
      <div class="expectation-row">
        <span class="expectation-icon">✓</span>
        <span>Du erhältst ein fertiges Anspruchsschreiben, das du per E-Mail oder Post an die Airline sendest. Das dauert 5 Minuten.</span>
      </div>
      <div class="expectation-row">
        <span class="expectation-icon">✓</span>
        <span>Viele Airlines antworten innerhalb von 2–4 Wochen. Manche brauchen länger oder lehnen zunächst ab. Das ist normal.</span>
      </div>
      <div class="expectation-row">
        <span class="expectation-icon">✓</span>
        <span>Bei Ablehnung bekommst du von uns konkrete Hinweise zum weiteren Vorgehen — Schlichtungsstelle, Amtsgericht oder Verbraucherzentrale.</span>
      </div>
      <div class="expectation-row">
        <span class="expectation-icon">✓</span>
        <span>Wenn dein Anspruch nicht kansrijk ist, sagen wir das klar — du erhältst trotzdem einen vollständigen Bericht. Kein leerer Report.</span>
      </div>
      <div class="expectation-row" style="margin-bottom:0;">
        <span class="expectation-icon">✓</span>
        <span>FlugClaim.de ist für Fluggäste, die bereit sind, den Brief selbst zu senden — und dafür bis zu €181 mehr in der Tasche behalten wollen.</span>
      </div>
    </div>
  </div>
</section>

<!-- ZAHLEN -->
<section class="section section--alt">
  <div class="container">
    <div class="section-label">Die Fakten</div>
    <h2>Deine Rechte kennen, muss nicht teuer sein</h2>
    <div class="proof-grid">
      <div class="proof-item">
        <div class="proof-num">€600</div>
        <div class="proof-label">Max. Entschädigung pro Person auf Langstrecken außerhalb der EU</div>
      </div>
      <div class="proof-item">
        <div class="proof-num">3 Std.</div>
        <div class="proof-label">Ankunftsverspätung, ab der EU261/2004 greifen kann</div>
      </div>
      <div class="proof-item">
        <div class="proof-num">3 Jahre</div>
        <div class="proof-label">Verjährungsfrist in Deutschland — auch ältere Flüge prüfen lassen</div>
      </div>
      <div class="proof-item">
        <div class="proof-num">24 Std.</div>
        <div class="proof-label">Analyse + Anspruchsschreiben in deinem Postfach</div>
      </div>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="section">
  <div class="container">
    <div class="section-label">Preis</div>
    <h2>Transparent und einmalig</h2>
    <div class="pricing-box">
      <div class="pricing-box__amount">€29</div>
      <div class="pricing-box__sub">einmalig · kein Abo · keine Erfolgsprovision</div>
      <ul class="pricing-box__list">
        <li><span style="color:var(--accent);font-weight:700;">✓</span> Vollständige EU261-Analyse</li>
        <li><span style="color:var(--accent);font-weight:700;">✓</span> Fertiges Anspruchsschreiben innerhalb von 24 Stunden</li>
        <li><span style="color:var(--accent);font-weight:700;">✓</span> Konkrete nächste Schritte bei Ablehnung</li>
        <li><span style="color:var(--accent);font-weight:700;">✓</span> Auch wenn kein Anspruch besteht: vollständiger Bericht</li>
      </ul>
      <div class="pricing-box__honest">
        Zur Transparenz: Du sendest das Schreiben selbst und bist der Ansprechpartner für die Airline. Im Gegenzug behältst du 100% der Entschädigung — kein Claimbureau, das 25–35% abzieht.
      </div>
      <a href="https://buy.stripe.com/DEIN_STRIPE_LINK" class="optie-btn optie-btn--betaald" style="max-width:360px;display:block;margin:0 auto;">
        Jetzt zahlen und Analyse starten →
      </a>
      <p style="font-size:0.78rem;color:var(--muted);margin-top:12px;">🔒 Sichere Zahlung über Stripe · SEPA-Lastschrift verfügbar · Nicht zufrieden? Geld zurück.</p>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section section--alt">
  <div class="container">
    <div class="section-label">Häufige Fragen</div>
    <h2>Alles, was du wissen möchtest</h2>
    <div class="faq-list">

      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Für welche Flüge gilt EU-VO 261/2004?
          <svg class="faq-chevron" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="faq-a">Die Verordnung gilt für alle Flüge, die von einem EU-Flughafen abfliegen — unabhängig von der Airline. Außerdem für Flüge, die in der EU ankommen und von einer EU-Airline betrieben werden. Auch Norwegen, Island und die Schweiz fallen darunter.</div>
      </div>

      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Was passiert, wenn die Airline außergewöhnliche Umstände behauptet?
          <svg class="faq-chevron" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="faq-a">Viele Airlines nutzen diesen Einwand pauschal. Unsere Analyse bewertet, ob er in deinem Fall rechtlich standhält. Technische Defekte am Flugzeug und Personalmangel gelten laut Rechtsprechung in der Regel nicht als außergewöhnliche Umstände.</div>
      </div>

      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Kann ich auch ältere Flüge geltend machen?
          <svg class="faq-chevron" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="faq-a">In Deutschland beträgt die Verjährungsfrist 3 Jahre. Du kannst also Flüge aus den letzten 3 Jahren prüfen lassen. Lade einfach deine Unterlagen hoch — wir prüfen, ob dein Anspruch noch gültig ist.</div>
      </div>

      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Was passiert, wenn kein Anspruch besteht?
          <svg class="faq-chevron" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="faq-a">Du erhältst trotzdem einen vollständigen Bericht mit einer klaren Erklärung — warum kein Anspruch besteht, was du alternativ tun kannst, und wo du weitere Hilfe findest. Du zahlst nie für einen leeren Bericht.</div>
      </div>

      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Muss ich selbst mit der Airline kommunizieren?
          <svg class="faq-chevron" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="faq-a">Ja. Du sendest das fertige Anspruchsschreiben selbst — das dauert 5 Minuten. Wenn die Airline ablehnt oder nicht antwortet, bekommst du von uns konkrete Hinweise zu weiteren Schritten: Schlichtungsstelle Reise & Verkehr, Luftfahrt-Bundesamt oder Amtsgericht.</div>
      </div>

      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Ist das eine Rechtsberatung?
          <svg class="faq-chevron" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="faq-a">Nein. FlugClaim.de erstellt eine informative Analyse und ein Musteranspruchsschreiben auf Basis deiner Unterlagen. Wir leisten keine Rechtsberatung. Bei komplexen Situationen empfehlen wir einen Anwalt oder die Verbraucherzentrale.</div>
      </div>

      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Was passiert mit meinen Daten?
          <svg class="faq-chevron" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="faq-a">Dein Dokument wird nach der Analyse sofort und dauerhaft gelöscht. Wir speichern keine personenbezogenen Daten länger als für die Verarbeitung erforderlich.</div>
      </div>

    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="disclaimer">
  <div class="container">
    <p>FlugClaim.de erstellt informative Analysen und Musteranspruchsschreiben auf Basis der EU-Verordnung 261/2004. Wir leisten keine Rechtsberatung und übernehmen keine rechtliche Vertretung. Ein Anspruchsschreiben garantiert keine Auszahlung. Bei Ablehnung können weitere Schritte notwendig sein. Konsultiere bei Bedarf einen Anwalt oder die Verbraucherzentrale. Dokumente werden nach der Verarbeitung gelöscht. &copy; 2025 FlugClaim.de</p>
  </div>
</footer>

<!-- STICKY FOOTER -->
<div class="sticky-footer" id="sticky-footer">
  <div>
    <div class="sticky-footer__text">Flug verspätet oder annulliert?</div>
    <div class="sticky-footer__sub">Fertiges Schreiben innerhalb 24h · einmalig €29</div>
  </div>
  <button class="sticky-cta" onclick="openModal()">Anspruch prüfen — €29 →</button>
</div>

<!-- MODAL -->
<div class="modal-overlay" id="modal" onclick="closeModalOutside(event)">
  <div class="modal">
    <div class="modal__header">
      <div class="modal__eyebrow">Was du erhältst</div>
      <div class="modal__title">Fertiges Anspruchsschreiben innerhalb von 24 Stunden</div>
      <div class="modal__sub">Du sendest es selbst an die Airline — und behältst 100% der Entschädigung.</div>
      <div class="modal__price">€29 <span style="font-size:1rem;color:rgba(255,255,255,0.6);font-weight:400;">einmalig · kein Abo</span></div>
    </div>
    <div class="modal__body">
      <div class="modal__feature"><div class="check">✓</div><div>Vollständige EU261-Analyse deines Anspruchs</div></div>
      <div class="modal__feature"><div class="check">✓</div><div>Prüfung auf außergewöhnliche Umstände als Einwand</div></div>
      <div class="modal__feature"><div class="check">✓</div><div>Fertiges Anspruchsschreiben — direkt sendbar</div></div>
      <div class="modal__feature"><div class="check">✓</div><div>Du behältst 100% der Entschädigung</div></div>
      <div class="modal__disclaimer">Dies ist eine informative Analyse, keine Rechtsberatung. Du sendest das Schreiben selbst.</div>
      <p id="modal-dynamic-copy" style="margin-bottom:16px;color:var(--muted);font-size:0.88rem;">
        Wir haben erste Hinweise erkannt. Die vollständige Prüfung folgt nach der Zahlung.
      </p>
      <a href="https://buy.stripe.com/DEIN_STRIPE_LINK" class="modal__cta">
        €29 zahlen und Analyse erhalten →
      </a>
      <div class="modal__security">🔒 Sichere Zahlung über Stripe · SEPA-Lastschrift verfügbar</div>
      <div class="modal__close" onclick="closeModal()">Abbrechen</div>
    </div>
  </div>
</div>

<script src="app.js"></script>
<script>
const WORKER_URL = 'https://flugclaimde.workers.dev';
let gratisFile = null;

function handleGratisFileSelect(input) {
  if (!input.files || !input.files[0]) return;
  gratisFile = input.files[0];
  const zone = document.getElementById('gratis-upload-zone');
  zone.innerHTML = `<div class="upload-label" style="color:var(--accent);">✓ ${escapeHtmlLocal(gratisFile.name)}</div><div class="upload-hint">Datei ausgewählt</div>`;
  document.getElementById('gratis-contact-fields').style.display = 'flex';
  checkGratisReady();
}

function escapeHtmlLocal(str) {
  return String(str || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

function checkGratisReady() {
  const name = document.getElementById('gratis-name').value.trim();
  const email = document.getElementById('gratis-email').value.trim();
  document.getElementById('gratis-btn').disabled = !(name && email && email.includes('@') && gratisFile);
}

document.getElementById('gratis-name').addEventListener('input', checkGratisReady);
document.getElementById('gratis-email').addEventListener('input', checkGratisReady);

async function startGratisUpload() {
  const name = document.getElementById('gratis-name').value.trim();
  const email = document.getElementById('gratis-email').value.trim();
  const btn = document.getElementById('gratis-btn');
  const status = document.getElementById('gratis-status');
  if (!gratisFile) return;

  btn.disabled = true;
  btn.textContent = 'Wird gesendet...';
  status.className = 'optie-status optie-status--info';
  status.textContent = 'Dein Dokument wird analysiert...';

  const formData = new FormData();
  formData.append('file', gratisFile);
  formData.append('name', name);
  formData.append('email', email);

  try {
    const res = await fetch(`${WORKER_URL}/analyze-free`, { method: 'POST', body: formData });
    const data = await res.json();
    if (data.ok) {
      status.className = 'optie-status optie-status--success';
      status.textContent = '✓ Du erhältst deine Einschätzung spätestens am nächsten Werktag vor 16:00 Uhr per E-Mail.';
      btn.textContent = 'Gesendet ✓';
    } else {
      throw new Error(data.error || 'Fehler');
    }
  } catch (err) {
    status.className = 'optie-status optie-status--error';
    status.textContent = 'Fehler: ' + err.message;
    btn.disabled = false;
    btn.textContent = 'Kostenlose Einschätzung anfordern';
  }
}
</script>
</body>
</html>
