import React from 'react';

export default function Projects() {
  const projects = [
    {
      title: "Landing Page - Stranger Things",
      url: "https://joaoviitordev.github.io/Landing-Page-StrangerThings/",
      img: "/assets/images/strangerThings.webp",
      description: "Desenvolvimento Front-end de uma landing page interativa temática de Stranger Things usando HTML, CSS, JavaScript puro e animações complexas focadas em UI/UX e performance."
    },
    {
      title: "Landing Page - Pringles",
      url: "https://joaoviitordev.github.io/Landing-Page-Pringles/",
      img: "/assets/images/pringles.webp",
      description: "Página de produto da Pringles focada em experiência do usuário (UX) e design moderno, utilizando CSS avançado e otimização de imagens para carregamento rápido (LCP)."
    },
    {
      title: "SaaS - Doutor Agenda",
      url: "#",
      img: "/assets/images/doutoragenda.webp",
      description: "Sistema SaaS para agendamento médico construído com React, Next.js e Tailwind CSS. Desafio: otimização de performance e criação de um painel de UI/UX intuitivo para clínicas."
    },
    {
      title: "Landing Page - Agência 3D",
      url: "https://joaoviitordev.github.io/Agencia3D/",
      img: "/assets/images/agencia.webp",
      description: "Landing page imersiva para Agência 3D usando bibliotecas avançadas de animação web (GSAP e Three.js) combinadas com Next.js para entregar alto impacto visual com alta performance."
    }
  ];

  return (
    <section id="projetos" className="w-full min-h-screen flex flex-col items-center px-[4vw] py-[24px] sm:py-0">
      <h2 className="font-mono text-[var(--color-primary)] text-xl sm:text-2xl font-bold w-full text-left mt-0 sm:mt-[24px]">
        /* PROJETOS */
      </h2>
      
      <div className="w-full max-w-[1100px] mt-6 sm:mt-16 flex flex-col gap-6 sm:gap-16">
        {projects.map((proj, idx) => (
          <article 
            key={idx} 
            className="w-full rounded-[24px] shadow-[0_20px_70px_rgba(0,0,0,0.35)] bg-white/5 overflow-hidden transition-all duration-400 ease-in hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="w-full flex items-center justify-between p-4 sm:px-6 sm:py-5">
              <h3 className="font-sans text-base sm:text-xl text-[var(--color-primary)] font-medium m-0 p-0">
                {proj.title}
              </h3>
              <a 
                href={proj.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Ver projeto ${proj.title} no GitHub`}
                className="text-[28px] sm:text-[32px] text-[var(--color-primary)] flex items-center hover:opacity-70 transition-opacity"
              >
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
            </div>
            
            {/* Texto Descritivo para SEO - Oculto visualmente, lido por robôs */}
            <p className="sr-only">
              {proj.description}
            </p>
            
            <div 
              className="relative w-full h-[220px] sm:h-[450px] lg:h-[600px] bg-cover bg-center bg-no-repeat" 
              style={{ backgroundImage: `url(${proj.img})` }}
            >
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
