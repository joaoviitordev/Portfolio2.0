import React from 'react';

export default function Footer() {
  return (
    <div className="w-full overflow-hidden">
      <footer id="contato" className="w-full h-screen flex flex-col justify-between sm:justify-normal">
        <div className="w-full h-full flex flex-col">
          
          <div className="w-full flex flex-row justify-between items-center px-[4vw] pt-6 sm:pt-[100px] gap-2 sm:gap-0">
            <h3 className="font-mono text-xl sm:text-3xl font-bold">/* CONTATO */</h3>
            <button className="px-6 py-2 bg-[var(--color-primary)] text-[var(--color-background-start)] font-medium rounded-none border border-[var(--color-primary)] hover:bg-transparent hover:text-[var(--color-primary)] transition-all duration-300">
              <a href="/doc/curriculo-joaovitor.pdf" target="_blank" rel="noopener noreferrer">CURRÍCULO</a>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden whitespace-nowrap">
            {/* Substituiremos pelo componente Marquee na refatoração completa */}
            <h1 className="text-[12vw] font-bold opacity-10 tracking-tighter">
              JOÃO VITOR GOMES DE FARIA
            </h1>
          </div>

          <div className="px-[4vw] mb-4 sm:mb-5 flex gap-4 text-3xl">
            <a href="https://www.linkedin.com/in/joaovitor-faria/" target="_blank" rel="nofollow" className="hover:opacity-70 transition-opacity">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/joaoviitordev" target="_blank" rel="nofollow" className="hover:opacity-70 transition-opacity">
              <i className="fab fa-github"></i>
            </a>
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-[4vw] pb-6 sm:pb-8 gap-3 sm:gap-0 sm:transform-none -translate-y-4 sm:translate-y-0">
            <h4 className="font-mono text-[18px] sm:text-[2vw] lg:text-[1.2vw]">E-mail: joaovitorgomesdefaria@gmail.com</h4>
            <h4 className="font-mono text-[16px] sm:text-[2vw] lg:text-[1.2vw]">/* KEEP PUSHING THE LIMITS */</h4>
          </div>

        </div>
      </footer>
    </div>
  );
}
