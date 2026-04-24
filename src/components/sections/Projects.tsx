import React from 'react';

export default function Projects() {
  const projects = [
    {
      title: "Landing Page - Stranger Things",
      url: "https://joaoviitordev.github.io/Landing-Page-StrangerThings/",
      img: "/assets/images/strangerThings.webp"
    },
    {
      title: "Landing Page - Pringles",
      url: "https://joaoviitordev.github.io/Landing-Page-Pringles/",
      img: "/assets/images/pringles.webp"
    },
    {
      title: "SaaS - Doutor Agenda",
      url: "#",
      img: "/assets/images/doutoragenda.webp"
    },
    {
      title: "Landing Page - Agência 3D",
      url: "https://joaoviitordev.github.io/Agencia3D/",
      img: "/assets/images/agencia.webp"
    }
  ];

  return (
    <section id="projetos" className="w-full min-h-screen flex flex-col items-center px-[4vw] py-[24px] sm:py-0">
      <h3 className="font-mono text-[var(--color-primary)] text-xl sm:text-2xl font-bold w-full text-left mt-0 sm:mt-[24px]">
        /* PROJETOS */
      </h3>
      
      <div className="w-full max-w-[1100px] mt-6 sm:mt-16 flex flex-col gap-6 sm:gap-16">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
            className="w-full rounded-[24px] shadow-[0_20px_70px_rgba(0,0,0,0.35)] bg-white/5 overflow-hidden transition-all duration-400 ease-in hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="w-full flex items-center justify-between p-4 sm:px-6 sm:py-5">
              <span className="font-sans text-base sm:text-xl text-[var(--color-primary)] font-medium">
                {proj.title}
              </span>
              <a 
                href={proj.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[28px] sm:text-[32px] text-[var(--color-primary)] flex items-center hover:opacity-70 transition-opacity"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
            
            <div 
              className="relative w-full h-[220px] sm:h-[450px] lg:h-[600px] bg-cover bg-center bg-no-repeat" 
              style={{ backgroundImage: `url(${proj.img})` }}
            >
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
