import viData from '../locales/vi.json';
import koData from '../locales/ko.json';

const LOCALES = { vi: viData, ko: koData };
const STORAGE_KEY = 'pqh-lang';
let currentLang = 'vi';
let koreanFontLoaded = false;

function resolve(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function loadKoreanFont() {
  if (koreanFontLoaded) return;
  koreanFontLoaded = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${import.meta.env.BASE_URL}fonts/pretendard/pretendard.css`;
  document.head.appendChild(link);
}

function renderExpertise(data) {
  const list = document.querySelector('[data-expertise-list]');
  if (!list) return;
  list.innerHTML = data.expertise.items
    .map(
      (item, i) => `
    <li class="expertise__item" data-reveal>
      <span class="expertise__item-num mono-label">${String(i + 1).padStart(2, '0')}</span>
      <span class="expertise__item-title">${item.title}</span>
      <span class="expertise__item-desc">${item.desc}</span>
    </li>`
    )
    .join('');
}

function renderProcess(data) {
  const list = document.querySelector('[data-process-list]');
  if (!list) return;
  list.innerHTML = data.process.steps
    .map(
      (step) => `
    <li class="process__step" data-reveal>
      <span class="process__step-num">${step.num}</span>
      <h3 class="process__step-title">${step.title}</h3>
      <p class="process__step-desc">${step.desc}</p>
    </li>`
    )
    .join('');
}

function renderExperience(data) {
  const list = document.querySelector('[data-experience-list]');
  if (!list) return;
  list.innerHTML = data.experience.items
    .map(
      (item) => `
    <article class="experience-item" data-reveal>
      <div class="experience-item__header">
        <h3 class="experience-item__role">${item.role}</h3>
        <p class="experience-item__meta mono-label">${item.company} · ${item.meta}</p>
      </div>
      <ul class="experience-item__bullets">
        ${item.bullets.map((b) => `<li>${b}</li>`).join('')}
      </ul>
    </article>`
    )
    .join('');
}

function renderAchievements(data) {
  const list = document.querySelector('[data-achievements-list]');
  if (!list) return;
  list.innerHTML = data.achievements.items
    .map(
      (item) => `
    <li class="achievement-item" data-reveal>
      <span class="achievement-item__year mono-label">${item.year}</span>
      <span class="achievement-item__title">${item.title}</span>
      <span class="achievement-item__desc">${item.desc}</span>
    </li>`
    )
    .join('');
}

function applyStaticText(data) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = resolve(data, key);
    if (value != null) el.innerHTML = value;
  });
}

function applyMeta(data) {
  document.title = data.meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', data.meta.description);
}

export function applyLang(lang, { silent = false } = {}) {
  const data = LOCALES[lang];
  if (!data) return;
  currentLang = lang;

  if (lang === 'ko') loadKoreanFont();

  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);

  applyMeta(data);
  applyStaticText(data);
  renderExpertise(data);
  renderProcess(data);
  renderExperience(data);
  renderAchievements(data);

  localStorage.setItem(STORAGE_KEY, lang);

  if (!silent) {
    window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
  }
}

export function getCurrentLang() {
  return currentLang;
}

export function initI18n() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const browserKo = navigator.language?.toLowerCase().startsWith('ko');
  const initial = saved || (browserKo ? 'ko' : 'vi');

  applyLang(initial, { silent: true });

  const toggle = document.querySelector('[data-lang-toggle]');
  toggle?.addEventListener('click', () => {
    const scrollY = window.scrollY;
    const next = currentLang === 'vi' ? 'ko' : 'vi';
    applyLang(next);
    requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: 'auto' }));
  });
}
