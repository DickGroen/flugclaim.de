// ── Teaser flow ───────────────────────────────────────────────────────────────

async function handleFile(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  if (file.size > 10 * 1024 * 1024) {
    showTeaserError('Datei zu groß. Maximal 10 MB erlaubt.');
    return;
  }

  const teaser = document.getElementById('teaser');
  const teaserCompany = document.getElementById('teaser-company');
  const teaserFound = document.getElementById('teaser-found');
  const teaserSub = document.getElementById('teaser-sub');
  const teaserLocked = document.getElementById('teaser-locked-text');
  const modalCopy = document.getElementById('modal-dynamic-copy');

  teaser.style.display = 'block';
  teaser.classList.remove('teaser--visible');
  teaserCompany.textContent = 'Wird analysiert...';
  teaserFound.textContent = '⏳ Einen Moment bitte...';
  teaserSub.textContent = 'Dein Dokument wird analysiert.';
  setTimeout(() => teaser.classList.add('teaser--visible'), 10);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${WORKER_URL}/analyze`, { method: 'POST', body: formData });
    const data = await res.json();

    if (!data.ok) throw new Error(data.error || 'Analyse fehlgeschlagen');

    const airline = data.airline || null;
    const risk = data.risk || 'medium';
    const claimAmount = data.claim_amount || null;
    const disruptionType = data.disruption_type || null;
    const riskLabel = { low: '🟡 Niedrig', medium: '🟠 Mittel', high: '🟢 Hoch' }[risk] || risk;

    teaserCompany.textContent = airline || 'Dokument erkannt';
    teaserFound.textContent = 'Erste Feststellung:';

    let subText = 'Dein Fluggastdokument wurde analysiert.';
    if (claimAmount) subText += ` Mögliche Entschädigung: €${claimAmount}.`;
    if (disruptionType) subText += ` Art der Störung: ${disruptionType}.`;
    subText += ' Erfolgsaussicht: ' + riskLabel + '.';
    teaserSub.textContent = subText;

    if (teaserLocked) {
      teaserLocked.innerHTML = `<strong>Vollständige Analyse nach Zahlung</strong>
        Entschädigungsmöglichkeiten, Einschätzung und fertiges Anspruchsschreiben — bis morgen 16:00 Uhr per E-Mail.`;
    }
    if (modalCopy) {
      modalCopy.textContent = airline
        ? `Wir haben deinen Flug bei ${airline} erkannt. Die vollständige Prüfung folgt nach der Zahlung.`
        : 'Wir haben erste Hinweise erkannt. Die vollständige Prüfung folgt nach der Zahlung.';
    }

  } catch (err) {
    teaserCompany.textContent = 'Dokument erkannt';
    teaserFound.textContent = 'Bereit zur Analyse:';
    teaserSub.textContent = 'Klicke unten, um deine vollständige Analyse anzufordern.';
    console.warn('Triage-Fehler:', err.message);
  }

  teaser.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showTeaserError(msg) {
  const teaser = document.getElementById('teaser');
  if (teaser) {
    teaser.style.display = 'block';
    const sub = document.getElementById('teaser-sub');
    if (sub) sub.textContent = msg;
  }
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function openModal() {
  const modal = document.getElementById('modal');
  if (modal) { modal.classList.add('modal--open'); document.body.style.overflow = 'hidden'; }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) { modal.classList.remove('modal--open'); document.body.style.overflow = ''; }
}

function closeModalOutside(event) {
  if (event.target === document.getElementById('modal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── FAQ accordion ─────────────────────────────────────────────────────────────

function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const chevron = item.querySelector('.faq-chevron');
  const isOpen = item.classList.contains('faq-item--open');

  document.querySelectorAll('.faq-item--open').forEach(openItem => {
    openItem.classList.remove('faq-item--open');
    const a = openItem.querySelector('.faq-a');
    const c = openItem.querySelector('.faq-chevron');
    if (a) a.style.maxHeight = null;
    if (c) c.style.transform = '';
  });

  if (!isOpen) {
    item.classList.add('faq-item--open');
    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

// ── Sticky footer ─────────────────────────────────────────────────────────────

(function initStickyFooter() {
  const stickyFooter = document.getElementById('sticky-footer');
  if (!stickyFooter) return;
  let ticking = false;

  function updateSticky() {
    const scrollY = window.scrollY;
    const nearBottom = scrollY + window.innerHeight > document.documentElement.scrollHeight - 200;
    if (scrollY > 400 && !nearBottom) {
      stickyFooter.classList.add('sticky-footer--visible');
    } else {
      stickyFooter.classList.remove('sticky-footer--visible');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateSticky); ticking = true; }
  }, { passive: true });
})();
