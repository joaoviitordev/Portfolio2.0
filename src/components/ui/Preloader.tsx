"use client";
import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let progressObj = { value: 0 };
    
    // Tween de contagem falsa até 80%
    let countingTween = gsap.to(progressObj, {
      value: 80,
      duration: 3,
      ease: "power1.out",
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      }
    });

    const hidePreloader = (tl: gsap.core.Timeline) => {
      tl.to(progressObj, {
        value: 100,
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.round(progressObj.value));
        }
      })
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
        }
      }, "+=0.2");
    };

    // Simulando o load real. Em Next.js o DOM carrega rápido, 
    // então vou deixar um timer mínimo pra rolar a animação
    const timer = setTimeout(() => {
      countingTween.kill();
      let tl = gsap.timeline();
      hidePreloader(tl);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={preloaderRef} 
      className="fixed inset-0 z-[9999] bg-[#0D0D0D] flex items-center justify-center pointer-events-none"
    >
      <span className="font-mono text-4xl sm:text-9xl text-[#F2F2F2] font-bold">
        {progress}%
      </span>
    </div>
  );
}
