/**
 * Hand-authored line-art motif: geometry drawn from Hangul jamo strokes
 * (ㅇ ㅎ ㅁ) interlaced with Vietnamese diacritic marks (sắc/huyền/hỏi/ngã/nặng).
 * Monoline, single accent color, no photographic assets — this is the
 * site's signature visual per the approved "Two Scripts" motif.
 */
export function getMotifSVG() {
  return `
<svg viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- ㅇ ieung -->
  <circle cx="150" cy="150" r="86" stroke="var(--accent)" stroke-width="1.2" opacity="0.9"/>

  <!-- ㅎ hieut (top stroke + small circle + base arc) -->
  <line x1="230" y1="290" x2="300" y2="290" stroke="var(--accent)" stroke-width="1.2"/>
  <circle cx="265" cy="316" r="14" stroke="var(--accent)" stroke-width="1.2"/>
  <path d="M215 372 Q265 410 315 372" stroke="var(--accent)" stroke-width="1.2"/>

  <!-- ㅁ mieum -->
  <rect x="70" y="330" width="120" height="110" rx="4" stroke="var(--accent)" stroke-width="1.2" opacity="0.75"/>

  <!-- sắc (acute) -->
  <line x1="330" y1="120" x2="360" y2="90" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/>

  <!-- huyền (grave) -->
  <line x1="330" y1="160" x2="360" y2="190" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round"/>

  <!-- hỏi (hook above) -->
  <path d="M300 60 Q312 44 324 56 Q332 64 322 72" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round"/>

  <!-- ngã (tilde) -->
  <path d="M270 480 Q282 466 294 480 Q306 494 318 480" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round"/>

  <!-- nặng (dot below) -->
  <circle cx="150" cy="470" r="4" fill="var(--accent)" opacity="0.9"/>
</svg>`;
}

export function mountMotifs() {
  document.querySelectorAll('[data-motif-hero], [data-motif-contact]').forEach((el) => {
    el.innerHTML = getMotifSVG();
  });
}
