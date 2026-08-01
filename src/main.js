import './styles/main.css';
import './scripts/eases.js';
import { initI18n } from './scripts/i18n.js';
import { mountMotifs } from './scripts/motif.js';
import { initMotion } from './scripts/motion.js';
import { initCursor, initMagnetic } from './scripts/cursor.js';
import { initHeroScene } from './scripts/hero-scene.js';

function initBackToTop() {
  const btn = document.querySelector('[data-back-to-top]');
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function init() {
  mountMotifs();
  initI18n();
  initMotion();
  initCursor();
  initMagnetic();
  initBackToTop();
  initHeroScene();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
