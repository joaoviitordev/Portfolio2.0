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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor" aria-hidden="true" className="w-4 h-4">
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
          </svg>
          Repositório
        </a>
        {proj.url !== '#' && (
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] border-2 border-primary text-primary font-sans text-sm font-medium no-underline transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" className="w-4 h-4">
              <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" />
            </svg>
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
