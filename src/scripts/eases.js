import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// Exact SVG-path equivalents of the design tokens
// --ease: cubic-bezier(0.16, 1, 0.3, 1)
// --ease-inout: cubic-bezier(0.65, 0, 0.35, 1)
CustomEase.create('siteEase', 'M0,0 C0.16,1 0.3,1 1,1');
CustomEase.create('siteEaseInOut', 'M0,0 C0.65,0 0.35,1 1,1');

export const EASE = 'siteEase';
export const EASE_INOUT = 'siteEaseInOut';
