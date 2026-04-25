"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    if (isOpen && window.innerWidth <= 440) {
      gsap.fromTo(".header-link",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const win = window as any;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (win.smoother) win.smoother.paused(true);
    } else {
      document.body.style.overflow = '';
      if (win.smoother) win.smoother.paused(false);
    }
    
    return () => {
      document.body.style.overflow = '';
      if (win.smoother) win.smoother.paused(false);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Aguarda um instante para o menu fechar e destravar o scroll (via useEffect) antes de rolar
    setTimeout(() => {
      const win = window as any;
      if (win.smoother) {
        win.smoother.scrollTo(target, true);
      } else {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="w-full flex justify-between items-center px-[4vw] py-6 absolute z-50">
      <h2 className="font-mono font-bold text-2xl relative z-50">
        /* DESENVOLVEDOR <br /> FRONT END */
      </h2>
      
      <button 
        className="block sm:hidden text-2xl text-[var(--color-primary)] bg-transparent border-none cursor-pointer relative z-50"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </button>

      <nav className={`
        fixed inset-0 w-full h-screen bg-[#F2F2F2] bg-gradient-to-br from-[#F2F2F2] to-[#888888] z-40 transition-all duration-300 ease-in-out flex flex-col items-center justify-center
        sm:static sm:w-auto sm:h-auto sm:bg-transparent sm:z-auto sm:translate-y-0 sm:opacity-100 sm:visible sm:flex sm:bg-none
        ${isOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none sm:pointer-events-auto'}
      `}>
        <ul className="flex flex-col items-center justify-center gap-8 text-2xl sm:text-base sm:flex-row sm:gap-8 sm:p-0">
          <li><a href="#projetos" className="header-link font-medium hover:color-link-hover" onClick={(e) => handleNavClick(e, '#projetos')}>PROJETOS</a></li>
          <li><a href="#sobre" className="header-link font-medium hover:color-link-hover" onClick={(e) => handleNavClick(e, '#sobre')}>SOBRE</a></li>
          <li><a href="#tecnologias" className="header-link font-medium hover:color-link-hover" onClick={(e) => handleNavClick(e, '#tecnologias')}>TECNOLOGIAS</a></li>
          <li><a href="#contato" className="header-link font-medium hover:color-link-hover" onClick={(e) => handleNavClick(e, '#contato')}>CONTATO</a></li>
        </ul>
      </nav>
    </header>
  );
}
