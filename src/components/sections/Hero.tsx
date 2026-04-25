import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="w-full h-screen flex flex-col items-center justify-between">
      {/* H1 real escondido para SEO */}
      <h1 className="sr-only">João Vitor | Desenvolvedor Front-end Next.js & UI/UX</h1>
      
      {/* Container flex com width expandido para caber todo o texto do letreiro */}
      <div className="flex-1 overflow-hidden w-full flex items-center" aria-hidden="true">
        <div className="h-full w-max flex items-center justify-center">
          <div className="animate-[marquee-anim_20s_infinite_linear] font-mono font-bold pl-[20px] sm:pl-[100px] text-[16vw] sm:text-[12vw] whitespace-nowrap">JOÃO VITOR GOMES DE FARIA</div>
          <div className="animate-[marquee-anim_20s_infinite_linear] font-mono font-bold pl-[20px] sm:pl-[100px] text-[16vw] sm:text-[12vw] whitespace-nowrap">JOÃO VITOR GOMES DE FARIA</div>
          <div className="animate-[marquee-anim_20s_infinite_linear] font-mono font-bold pl-[20px] sm:pl-[100px] text-[16vw] sm:text-[12vw] whitespace-nowrap">JOÃO VITOR GOMES DE FARIA</div>
        </div>
      </div>
      
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-[4vw] pb-[24px] sm:pb-0 sm:-translate-y-1/2 gap-[14px] sm:gap-0">
        <div className="flex gap-4 items-start sm:items-center">
          <a 
            href="https://www.linkedin.com/in/joaovitor-faria/" 
            target="_blank" 
            rel="nofollow noreferrer"
            className="text-[28px] sm:text-[32px] w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] flex items-center justify-center text-[var(--color-primary)] hover:color-link-hover"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href="https://github.com/joaoviitordev" 
            target="_blank" 
            rel="nofollow noreferrer"
            className="text-[28px] sm:text-[32px] w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] flex items-center justify-center text-[var(--color-primary)] hover:opacity-70 transition-opacity duration-300"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <h3 className="font-mono font-bold text-lg text-base sm:text-xl w-full sm:w-auto">/* WEB DEVELOPER - UI | UX */</h3>
      </div>
    </section>
  );
}
