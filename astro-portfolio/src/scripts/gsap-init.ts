// GSAP global — vanilla, sem React (substitui o useGSAP do page.tsx/Preloader.tsx).
// Plugins agora são gratuitos (GSAP 3.13+), então importamos via npm, sem CDN.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
// window.smoother é tipado globalmente em src/env.d.ts

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- ScrollSmoother ----------
// Desligado para quem pediu menos movimento (acessibilidade).
if (!prefersReduced) {
  window.smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1,
  });
}

// ---------- Back to Top ----------
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  const hiddenClasses = ['opacity-0', 'invisible', 'translate-y-5'];
  ScrollTrigger.create({
    trigger: '#contato',
    start: 'top bottom',
    onEnter: () => backToTop.classList.remove(...hiddenClasses),
    onLeaveBack: () => backToTop.classList.add(...hiddenClasses),
  });

  backToTop.addEventListener('click', () => {
    if (window.smoother) {
      window.smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// ---------- Preloader ----------
const preloader = document.getElementById('preloader');
const preloaderCount = document.getElementById('preloader-count');
if (preloader && preloaderCount) {
  const obj = { value: 0 };
  const setLabel = () => {
    preloaderCount.textContent = `${Math.round(obj.value)}%`;
  };

  // Contagem falsa até 80%
  const counting = gsap.to(obj, {
    value: 80,
    duration: 3,
    ease: 'power1.out',
    onUpdate: setLabel,
  });

  // Após um tempo mínimo, completa e some
  window.setTimeout(() => {
    counting.kill();
    gsap
      .timeline()
      .to(obj, { value: 100, duration: 0.6, ease: 'power2.inOut', onUpdate: setLabel })
      .to(
        preloader,
        {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
          },
        },
        '+=0.2'
      );
  }, 1000);
}
