import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { EASE } from './eases.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

let revealTriggers = [];

// Re-entrant: dynamic sections (expertise/process/experience/achievements) get
// their [data-reveal] nodes replaced wholesale on every language toggle,
// so stale ScrollTriggers pointing at removed nodes must be killed first.
function initReveals() {
  revealTriggers.forEach((st) => st.kill());
  revealTriggers = [];

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
    if (tween.scrollTrigger) revealTriggers.push(tween.scrollTrigger);
  });

  document.querySelectorAll('[data-reveal-mask]').forEach((el) => {
    const inner = el.querySelectorAll(':scope > *');
    const targets = inner.length ? inner : [el];
    const tween = gsap.fromTo(
      targets,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
    if (tween.scrollTrigger) revealTriggers.push(tween.scrollTrigger);
  });
}

function initParallax() {
  document.querySelectorAll('[data-motif-hero], [data-motif-contact]').forEach((el) => {
    gsap.to(el, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  });
}

function initSectionIndex() {
  const sections = document.querySelectorAll('[data-section]');
  const indicator = document.querySelector('[data-section-current]');
  if (!indicator || !sections.length) return;

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => (indicator.textContent = section.dataset.section),
      onEnterBack: () => (indicator.textContent = section.dataset.section),
    });
  });
}

function initReadingProgress() {
  const bar = document.querySelector('.reading-progress');
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

function initHeaderState() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  ScrollTrigger.create({
    start: 'top -10',
    end: 99999,
    onUpdate: (self) => {
      header.classList.toggle('is-scrolled', self.scroll() > 10);
    },
  });
}

export function initMotion() {
  if (prefersReducedMotion()) {
    // Reduced motion: skip smooth scroll/parallax entirely, keep only
    // instant header state + section index (no animation involved).
    initSectionIndex();
    initHeaderState();
    return;
  }

  document.documentElement.classList.add('js-motion-ready');
  initLenis();
  initReveals();
  initParallax();
  initSectionIndex();
  initReadingProgress();
  initHeaderState();

  window.addEventListener('i18n:changed', () => {
    initReveals();
    ScrollTrigger.refresh();
  });
}

export function refreshMotion() {
  ScrollTrigger.refresh();
}
