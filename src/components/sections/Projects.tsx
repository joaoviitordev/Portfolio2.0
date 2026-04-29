"use client";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface Project {
  title: string;
  url: string;
  repo: string;
  img: string;
  description: string;
  techs: { name: string; icon: string }[];
}

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [closingIdx, setClosingIdx] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: "Stranger Things",
      url: "https://joaoviitordev.github.io/Landing-Page-StrangerThings/",
      repo: "https://github.com/joaoviitordev/Landing-Page-StrangerThings",
      img: "/assets/images/strangerThings.webp",
      description:
        "Este projeto consiste em uma Landing Page inspirada no site oficial da série Stranger Things da Netflix, desenvolvida com foco em UI/UX, experiência imersiva e identidade visual. A interface foi planejada para transmitir a atmosfera da série, respeitando hierarquia visual, consistência de design e boas práticas de front-end.",
      techs: [
        { name: "HTML5", icon: "/assets/icons/html5.svg" },
        { name: "CSS3", icon: "/assets/icons/css3.svg" },
        { name: "JavaScript", icon: "/assets/icons/js.svg" },
        { name: "GSAP", icon: "/assets/icons/gsap2.svg" },
        { name: "Figma", icon: "/assets/icons/figma.svg" },
      ],
    },
    {
      title: "Pringles",
      url: "https://joaoviitordev.github.io/Landing-Page-Pringles/",
      repo: "https://github.com/joaoviitordev/Landing-Page-Pringles",
      img: "/assets/images/pringles.webp",
      description:
        "Assim como o projeto de Stranger Things, este projeto também é uma Landing Page, porém, é inspirada no site oficial da Pringles, desenvolvida com foco em UI/UX, experiência imersiva e identidade visual. A interface foi planejada para transmitir a atmosfera da marca, respeitando hierarquia visual, consistência de design e boas práticas de front-end.",
      techs: [
        { name: "HTML5", icon: "/assets/icons/html5.svg" },
        { name: "CSS3", icon: "/assets/icons/css3.svg" },
        { name: "JavaScript", icon: "/assets/icons/js.svg" },
        { name: "GSAP", icon: "/assets/icons/gsap2.svg" },
        { name: "Figma", icon: "/assets/icons/figma.svg" },
      ],
    },
    {
      title: "Doutor Agenda",
      url: "https://doutor-agenda-indol.vercel.app/",
      repo: "https://github.com/joaoviitordev/doutor-agenda",
      img: "/assets/images/doutoragenda.webp",
      description:
        "Sistema SaaS para agendamento médico construído com React, Next.js e Tailwind CSS. Desafio: otimização de performance e criação de um painel de UI/UX intuitivo para clínicas. Para saber mais sobre as tecnologias utilizadas, acesse o repositório do projeto.",
      techs: [
        { name: "React", icon: "/assets/icons/react.svg" },
        { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
        { name: "Tailwind CSS", icon: "/assets/icons/tailwindcss.svg" },
        { name: "Node.js", icon: "/assets/icons/nodejs2.svg" },
        { name: "PostgreSQL", icon: "/assets/icons/postgresql.svg" },
        { name: "Figma", icon: "/assets/icons/figma.svg" },
      ],
    },
    {
      title: "Agência 3D",
      url: "https://joaoviitordev.github.io/Agencia3D/",
      repo: "https://github.com/joaoviitordev/Agencia3D",
      img: "/assets/images/agencia.webp",
      description:
        "Landing page imersiva para Agência 3D do grupo WebHub usando bibliotecas avançadas de animação web (GSAP e Three.js). A interface foi planejada para transmitir a atmosfera da marca, respeitando hierarquia visual, consistência de design e boas práticas de front-end. Para saber mais sobre as tecnologias utilizadas, acesse o repositório do projeto.",
      techs: [
        { name: "HTML5", icon: "/assets/icons/html5.svg" },
        { name: "CSS3", icon: "/assets/icons/css3.svg" },
        { name: "JavaScript", icon: "/assets/icons/js.svg" },
        { name: "GSAP", icon: "/assets/icons/gsap2.svg" },
        { name: "Three.js", icon: "/assets/icons/threejs.svg" },
        { name: "Figma", icon: "/assets/icons/figma.svg" },
      ],
    },
  ];

  // Projeto ativo para o modal
  const activeProject = activeIdx !== null ? projects[activeIdx] : null;
  const closingProject = closingIdx !== null ? projects[closingIdx] : null;
  const modalProject = activeProject || closingProject;
  const modalIsClosing = closingIdx !== null;

  // Fecha com animação de saída
  const handleClose = useCallback(() => {
    if (activeIdx === null) return;
    setClosingIdx(activeIdx);
    setTimeout(() => {
      setActiveIdx(null);
      setClosingIdx(null);
    }, 350);
  }, [activeIdx]);

  // Trava o scroll do body e pausa o ScrollSmoother
  useEffect(() => {
    const win = window as any;
    if (activeIdx !== null) {
      document.body.style.overflow = "hidden";
      if (win.smoother) win.smoother.paused(true);
    } else {
      document.body.style.overflow = "";
      if (win.smoother) win.smoother.paused(false);
    }
    return () => {
      document.body.style.overflow = "";
      if (win.smoother) win.smoother.paused(false);
    };
  }, [activeIdx]);

  // Conteúdo interno do modal (reutilizado em ambas as versões)
  const renderModalContent = (proj: Project) => (
    <>
      {/* Botão fechar */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-5 text-[var(--color-primary)] text-xl font-bold cursor-pointer bg-transparent border-none hover:opacity-60 transition-opacity duration-200"
        aria-label="Fechar modal"
      >
        ✕
      </button>

      {/* Título */}
      <h4 className="font-mono text-lg sm:text-xl font-bold text-[var(--color-primary)] pr-8 mb-4">
        {proj.title}
      </h4>

      {/* Tecnologias */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
        {proj.techs.map((tech, tIdx) => (
          <div
            key={tIdx}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] bg-white/50 border border-white/40"
            title={tech.name}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] object-contain"
            />
            <span className="font-sans text-xs sm:text-sm text-[var(--color-primary)] font-medium">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Divisor */}
      <div className="w-12 h-[2px] bg-[var(--color-primary)] opacity-30 mb-5" />

      {/* Descrição */}
      <p className="font-sans text-sm sm:text-base text-[var(--color-text-light)] leading-relaxed mb-8">
        {proj.description}
      </p>

      {/* Links */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={proj.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-sans text-sm font-medium no-underline transition-all duration-300 hover:opacity-85 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
        >
          <i className="fab fa-github" aria-hidden="true" />
          Repositório
        </a>
        {proj.url !== "#" && (
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-sans text-sm font-medium no-underline transition-all duration-300 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          >
            <i className="fas fa-external-link-alt" aria-hidden="true" />
            Ver Deploy
          </a>
        )}
      </div>
    </>
  );

  return (
    <>
      <section
        id="projetos"
        className="w-full min-h-screen flex flex-col items-center px-[4vw] py-[24px] sm:py-0"
      >
        <h2 className="font-mono text-[var(--color-primary)] text-xl sm:text-2xl font-bold w-full text-left mt-0 sm:mt-[24px]">
          /* PROJETOS */
        </h2>

        <div className="w-full max-w-[1100px] mt-6 sm:mt-16 flex flex-col gap-6 sm:gap-16">
          {projects.map((proj, idx) => (
            <article
              key={idx}
              className="relative w-full rounded-[24px] shadow-[0_20px_70px_rgba(0,0,0,0.35)] bg-white/5 overflow-hidden transition-all duration-400 ease-in hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
            >
              {/* Cabeçalho do card */}
              <div className="w-full flex items-center justify-between p-4 sm:px-6 sm:py-5">
                <h3 className="font-sans text-base sm:text-xl text-[var(--color-primary)] font-medium m-0 p-0">
                  {proj.title}
                </h3>
                <button
                  onClick={() => setActiveIdx(idx)}
                  className="font-mono text-sm sm:text-base text-[var(--color-primary)] font-bold cursor-pointer bg-transparent border-none relative group flex items-center gap-1"
                >
                  <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-[var(--color-primary)] after:transition-all after:duration-300 group-hover:after:w-full">
                    Saiba mais
                  </span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              {/* Texto Descritivo para SEO - Oculto visualmente, lido por robôs */}
              <p className="sr-only">{proj.description}</p>

              {/* Imagem do projeto */}
              <div className="relative w-full h-[220px] sm:h-[450px] lg:h-[600px] overflow-hidden">
                <Image
                  src={proj.img}
                  alt={`Captura de tela do projeto ${proj.title}`}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1100px"
                />
              </div>

            </article>
          ))}
        </div>
      </section>

      {/* Modal renderizado via portal (fora do #smooth-content) */}
      {modalProject && createPortal(
        <>
          {/* Mobile: fullscreen como o menu hamburger */}
          <div
            className={`
              fixed inset-0 z-[9999] w-full h-screen
              bg-[#F2F2F2] bg-gradient-to-br from-[#F2F2F2] to-[#888888]
              flex flex-col items-center justify-center
              sm:hidden
              ${modalIsClosing ? "modal-backdrop-exit" : "modal-backdrop-enter"}
            `}
          >
            <div
              className={`
                relative w-[88%] max-h-[85vh] overflow-y-auto
                rounded-[24px] p-6
                ${modalIsClosing ? "modal-content-exit" : "modal-content-enter"}
              `}
            >
              {renderModalContent(modalProject)}
            </div>
          </div>

          {/* Desktop: overlay centralizado na viewport */}
          <div
            className={`
              hidden sm:flex
              fixed inset-0 z-[9999] items-center justify-center p-4
              ${modalIsClosing ? "modal-backdrop-exit" : "modal-backdrop-enter"}
            `}
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
            <div
              className={`
                relative w-full max-w-[480px] rounded-[24px] p-8
                shadow-[0_25px_80px_rgba(0,0,0,0.5)]
                ${modalIsClosing ? "modal-content-exit" : "modal-content-enter"}
              `}
              style={{
                background:
                  "radial-gradient(circle, rgba(242,242,242,1) 40%, rgba(136,136,136,1) 100%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {renderModalContent(modalProject)}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
