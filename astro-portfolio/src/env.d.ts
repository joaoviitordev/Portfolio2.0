/// <reference types="astro/client" />

import type { ScrollSmoother } from 'gsap/ScrollSmoother';

declare global {
  interface Window {
    /** Instância global do ScrollSmoother, criada em src/scripts/gsap-init.ts */
    smoother?: ScrollSmoother;
  }
}

export {};
