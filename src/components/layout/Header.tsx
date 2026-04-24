"use client";
import React, { useState } from 'react';
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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full flex justify-between items-center px-[4vw] py-6 absolute z-50">
      <h2 className="font-mono text-base md:text-lg w-full sm:w-auto leading-tight">
        /* DESENVOLVEDOR <br /> FRONT END */
      </h2>
      
      <button 
        className="block sm:hidden text-2xl text-[var(--color-primary)] bg-transparent border-none cursor-pointer"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      <nav className={`
        absolute top-full left-0 w-full bg-gradient-to-t from-[#F2F2F2] to-[#888888] shadow-md transition-all duration-300 ease-in-out
        sm:static sm:w-auto sm:bg-none sm:shadow-none sm:translate-y-0 sm:opacity-100 sm:visible sm:flex sm:bg-transparent
        ${isOpen ? 'visible opacity-100 translate-y-0 pointer-events-auto' : 'invisible opacity-0 -translate-y-5 pointer-events-none sm:pointer-events-auto'}
      `}>
        <ul className="flex flex-col gap-4 p-5 px-[4vw] sm:flex-row sm:gap-8 sm:p-0">
          <li><Link href="#projetos" className="header-link font-medium hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>PROJETOS</Link></li>
          <li><Link href="#sobre" className="header-link font-medium hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>SOBRE</Link></li>
          <li><Link href="#tecnologias" className="header-link font-medium hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>TECNOLOGIAS</Link></li>
          <li><Link href="#contato" className="header-link font-medium hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>CONTATO</Link></li>
        </ul>
      </nav>
    </header>
  );
}
