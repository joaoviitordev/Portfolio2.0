"use client";
import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Importação dos Componentes
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Technologies from '@/components/sections/Technologies';
import Preloader from '@/components/ui/Preloader';

// Registrar plugins do GSAP nativos
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  
  // Implementação do ScrollSmoother global para se manter fiel ao código original
  useGSAP(() => {
    // Registramos via window porque adicionamos os CDNs em layout.tsx para os plugins pagos/gratuitos originais
    const win = window as any;
    if (win.gsap && win.ScrollSmoother) {
      win.gsap.registerPlugin(win.ScrollSmoother);
      win.smoother = win.ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1
      });
    }
  }, []);

  return (
    <>
      <Preloader />
      
      <div id="smooth-wrapper" className="w-full overflow-hidden">
        <div id="smooth-content" className="w-full">
          <Header />
          <main>
            <Hero />
            <About />
            <Projects />
            <Technologies />
          </main>
          <Footer />
        </div>
      </div>
      
      <BackToTop />
    </>
  );
}

// Subcomponente do botão Back To Top
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#contato",
      start: "top bottom",
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false)
    });
  }, []);

  const scrollToTop = () => {
    const win = window as any;
    if (win.smoother) {
      win.smoother.scrollTo("#hero", true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button 
      id="backToTop"
      onClick={scrollToTop}
      className={`
        fixed bottom-[30px] sm:bottom-[80px] right-[20px] sm:right-[65px] 
        w-[50px] sm:w-[60px] h-[50px] sm:h-[60px] 
        bg-gradient-to-br from-[#F2F2F2] to-[#888888] 
        text-[#0D0D0D] text-[20px] sm:text-[24px] 
        rounded-full flex items-center justify-center 
        shadow-[0_4px_15px_rgba(0,0,0,0.2)] z-[3000] cursor-pointer
        transition-all duration-400 ease-in-out
        hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]
        active:scale-90
        ${isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-5'}
      `}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}
