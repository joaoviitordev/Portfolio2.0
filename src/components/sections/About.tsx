import React from 'react';

export default function About() {
  return (
    <section id="sobre" className="w-full h-auto sm:h-screen px-[4vw] py-[60px] sm:py-[24px] flex flex-col justify-center">
      <h2 className="font-mono text-[var(--color-primary)] text-2xl sm:text-2xl font-bold pb-[68px]">
        /* SOBRE MIM */
      </h2>
      <article className="flex flex-col items-start">
        <p className="text-[6vw] sm:text-[3.5vw] lg:text-[2.4vw] font-bold text-[var(--color-primary)] leading-tight">
          Sou desenvolvedor front-end especializado em Next.js e React, focado em criar interfaces modernas e funcionais. Trabalho com atenção em detalhes de UI/UX, usabilidade e performance, entregando experiências digitais consistentes com animações via GSAP.
        </p>
        <p className="text-[4vw] sm:text-[2.5vw] lg:text-[1.8vw] text-[var(--color-text-light)] pt-[38px] pb-[36px] leading-snug">
          Transformo ideias em soluções práticas, unindo código, design e boas práticas para construir
          projetos eficientes e bem estruturados.
        </p>
        <button className="w-[140px] h-[50px] rounded-[30px] border-none bg-gradient-to-br from-[#F2F2F2] to-[#888888] hover:-translate-y-[5%] transition-transform duration-500 ease-out">
          <a 
            href="/doc/curriculo-joaovitor.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-full h-full text-[var(--color-primary)] text-[16px] hover:font-medium transition-all"
          >
            CURRÍCULO
          </a>
        </button>
      </article>
    </section>
  );
}
