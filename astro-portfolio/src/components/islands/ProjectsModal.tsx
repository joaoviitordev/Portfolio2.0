import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProject {
  title: string;
  url: string;
  repo: string;
  description: string;
  techs: { name: string; icon: string }[];
}

interface Props {
  projects: ModalProject[];
}

// Island: o modal "Saiba mais" dos projetos. Os cards são HTML estático (Astro);
// esta ilha só engata nos botões [data-project-index] e gerencia o overlay.
export default function ProjectsModal({ projects }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [closingIdx, setClosingIdx] = useState<number | null>(null);

  const activeProject = activeIdx !== null ? projects[activeIdx] : null;
  const closingProject = closingIdx !== null ? projects[closingIdx] : null;
  const modalProject = activeProject || closingProject;
  const modalIsClosing = closingIdx !== null;

  const handleClose = useCallback(() => {
    setActiveIdx((idx) => {
      if (idx === null) return null;
      setClosingIdx(idx);
      setTimeout(() => {
        setClosingIdx(null);
      }, 350);
      return null;
    });
  }, []);

  // Liga os botões estáticos dos cards a esta ilha
  useEffect(() => {
    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>('.project-open')
    );
    const handlers = buttons.map((btn) => {
      const handler = () => {
        const idx = Number(btn.dataset.projectIndex);
        if (!Number.isNaN(idx)) setActiveIdx(idx);
      };
      btn.addEventListener('click', handler);
      return { btn, handler };
    });
    return () => handlers.forEach(({ btn, handler }) => btn.removeEventListener('click', handler));
  }, []);

  // Trava o scroll do body e fecha no Esc
  useEffect(() => {
    document.body.style.overflow = activeIdx !== null ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeIdx, handleClose]);

  if (!modalProject) return null;

  const content = (proj: ModalProject) => (
    <>
      <button
        onClick={handleClose}
        className="absolute top-4 right-5 text-primary text-xl font-bold cursor-pointer bg-transparent border-none hover:opacity-60 transition-opacity duration-200"
        aria-label="Fechar modal"
      >
        ✕
      </button>

      <h4 className="font-mono text-lg sm:text-xl font-bold text-primary pr-8 mb-4">
        {proj.title}
      </h4>

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
              width={20}
              height={20}
              className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] object-contain"
            />
            <span className="font-sans text-xs sm:text-sm text-primary font-medium">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      <div className="w-12 h-[2px] bg-primary opacity-30 mb-5" />

      <p className="font-sans text-sm sm:text-base text-text-light leading-relaxed mb-8">
        {proj.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={proj.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] bg-primary text-white font-sans text-sm font-medium no-underline transition-all duration-300 hover:opacity-85 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
        >
          <i className="fab fa-github" aria-hidden="true" />
          Repositório
        </a>
        {proj.url !== '#' && (
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] border-2 border-primary text-primary font-sans text-sm font-medium no-underline transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          >
            <i className="fas fa-external-link-alt" aria-hidden="true" />
            Ver Deploy
          </a>
        )}
      </div>
    </>
  );

  return createPortal(
    <>
      {/* Mobile: fullscreen */}
      <div
        className={`fixed inset-0 z-[9999] w-full h-screen bg-[#F2F2F2] bg-linear-to-br from-[#F2F2F2] to-background-end flex flex-col items-center justify-center sm:hidden ${
          modalIsClosing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'
        }`}
      >
        <div
          className={`relative w-[88%] max-h-[85vh] overflow-y-auto rounded-[24px] p-6 ${
            modalIsClosing ? 'modal-content-exit' : 'modal-content-enter'
          }`}
        >
          {content(modalProject)}
        </div>
      </div>

      {/* Desktop: overlay centralizado */}
      <div
        className={`hidden sm:flex fixed inset-0 z-[9999] items-center justify-center p-4 ${
          modalIsClosing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'
        }`}
        onClick={handleClose}
      >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
        <div
          className={`relative w-full max-w-[480px] rounded-[24px] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.5)] ${
            modalIsClosing ? 'modal-content-exit' : 'modal-content-enter'
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(242,242,242,1) 40%, rgba(136,136,136,1) 100%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {content(modalProject)}
        </div>
      </div>
    </>,
    document.body
  );
}
