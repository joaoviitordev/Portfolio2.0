export default function Footer() {
  return (
    <div className="w-full overflow-hidden">
      <footer id="contato" className="w-full h-screen flex flex-col justify-between sm:justify-normal">
        <div className="w-full h-full flex flex-col">
          
          <div className="w-full flex flex-row justify-between items-center px-[4vw] pt-6 sm:pt-[100px] gap-2 sm:gap-0">
            <h2 className="font-mono text-xl sm:text-2xl font-bold">/* CONTATO */</h2>
            <button className="w-[140px] h-[50px] rounded-[30px] border-none bg-gradient-to-br from-[#F2F2F2] to-[#888888] hover:-translate-y-[5%] transition-transform duration-500 ease-out">
              <a href="/doc/joaovitorcurriculo.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full text-[var(--color-primary)] text-[16px] hover:font-medium transition-all">CURRÍCULO</a>
            </button>
          </div>

          <div className="flex-1 overflow-hidden w-full flex items-center">
            <div className="h-full w-max flex items-center justify-center" aria-hidden="true">
              <div className="animate-[marquee-anim_20s_infinite_linear] font-mono font-bold pl-[20px] sm:pl-[100px] text-[16vw] sm:text-[12vw] whitespace-nowrap">JOÃO VITOR GOMES DE FARIA</div>
              <div className="animate-[marquee-anim_20s_infinite_linear] font-mono font-bold pl-[20px] sm:pl-[100px] text-[16vw] sm:text-[12vw] whitespace-nowrap">JOÃO VITOR GOMES DE FARIA</div>
              <div className="animate-[marquee-anim_20s_infinite_linear] font-mono font-bold pl-[20px] sm:pl-[100px] text-[16vw] sm:text-[12vw] whitespace-nowrap">JOÃO VITOR GOMES DE FARIA</div>
            </div>
          </div>

          <div className="px-[3.4vw] mb-4 sm:mb-5 flex gap-4 items-start sm:items-center">
            <a href="https://www.linkedin.com/in/joaovitor-faria/" target="_blank" rel="noopener noreferrer" aria-label="Acesse meu perfil no LinkedIn" className="text-[28px] sm:text-[32px] w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] flex items-center justify-center text-[var(--color-primary)] hover:text-transparent hover:bg-clip-text hover:bg-[image:var(--color-link-hover)] transition-all duration-300">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="https://github.com/joaoviitordev" target="_blank" rel="noopener noreferrer" aria-label="Acesse meu perfil no GitHub" className="text-[28px] sm:text-[32px] w-[28px] sm:w-[32px] h-[28px] sm:h-[32px] flex items-center justify-center text-[var(--color-primary)] hover:text-transparent hover:bg-clip-text hover:bg-[image:var(--color-link-hover)] transition-all duration-300">
              <i className="fab fa-github" aria-hidden="true"></i>
            </a>
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-[3.6vw] pb-6 sm:pb-8 gap-3 sm:gap-0 sm:transform-none -translate-y-4 sm:translate-y-0">
            <p className="font-mono font-bold text-[18px] sm:text-[1.4vw] lg:text-[1.2vw] m-0">E-mail: joaovitorgomesdefaria@gmail.com</p>
            <p className="font-mono font-bold text-[18px] sm:text-[1.4vw] lg:text-[1.2vw] m-0">/* KEEP PUSHING THE LIMITS */</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
