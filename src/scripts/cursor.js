import gsap from 'gsap';
import { EASE } from './eases.js';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function initCursor() {
  if (!isFinePointer() || prefersReducedMotion()) return;

  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  document.body.classList.add('cursor-ready');

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const dotPos = { ...pos };

  window.addEventListener('mousemove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
  });

  gsap.ticker.add(() => {
    dotPos.x += (pos.x - dotPos.x) * 0.2;
    dotPos.y += (pos.y - dotPos.y) * 0.2;
    cursor.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px)`;
  });

  const hoverTargets = 'a, button, [data-magnetic]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.add('is-hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.remove('is-hovering');
  });
}

export function initMagnetic() {
  if (!isFinePointer() || prefersReducedMotion()) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 0.28;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.4,
        ease: EASE,
      });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });
}
