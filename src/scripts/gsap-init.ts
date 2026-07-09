// GSAP global — vanilla, sem React (substitui o useGSAP do page.tsx/Preloader.tsx).
// ScrollSmoother foi removido (não agregava e pesava ~125kB de JS); usamos rolagem
// nativa. Mantemos gsap + ScrollTrigger para o Preloader, o BackToTop e o stagger.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
