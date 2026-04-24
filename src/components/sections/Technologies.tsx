import React from 'react';

export default function Technologies() {
  const techs = [
    { name: 'HTML5', icon: '/assets/icons/html5.svg', size: 'normal' },
    { name: 'React', icon: '/assets/icons/react.svg', size: 'large' },
    { name: 'CSS3', icon: '/assets/icons/css3.svg', size: 'normal' },
    { name: 'JavaScript (ES6+)', icon: '/assets/icons/js.svg', size: 'wide' },
    { name: 'GSAP', icon: '/assets/icons/gsap2.svg', size: 'normal' },
    { name: 'Figma', icon: '/assets/icons/figma.svg', size: 'tall' },
    { name: 'Node.js', icon: '/assets/icons/nodejs2.svg', size: 'wide' },
    { name: 'Git', icon: '/assets/icons/git.svg', size: 'normal' },
    { name: 'GitHub', icon: '/assets/icons/github.svg', size: 'wide' },
  ];

  return (
    <section id="tecnologias" className="w-full min-h-auto sm:min-h-screen flex flex-col items-center px-[4vw] py-[40px] sm:py-[100px]">
      <h3 className="font-mono text-[var(--color-primary)] text-xl sm:text-2xl font-bold w-full text-left mb-[32px] sm:mb-[48px]">
        /* TECNOLOGIAS */
      </h3>
      
      <div className="w-full max-w-[1100px] grid grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-4 sm:gap-6 auto-rows-[150px] sm:auto-rows-[200px] lg:auto-rows-[240px]">
        {techs.map((tech, index) => {
          
          let colSpan = "col-span-1";
          let rowSpan = "row-span-1";
          let iconSize = "w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px]";
          let textSize = "text-[16px] sm:text-[18px] lg:text-[20px]";

          if (tech.size === 'large') {
            colSpan = "col-span-2";
            rowSpan = "row-span-1 sm:row-span-2";
            iconSize = "w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] lg:w-[140px] lg:h-[140px]";
            textSize = "text-[18px] sm:text-[22px] lg:text-[26px]";
          } else if (tech.size === 'tall') {
            colSpan = "col-span-1";
            rowSpan = "row-span-2";
            iconSize = "w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px]";
            textSize = "text-[18px] sm:text-[20px] lg:text-[22px]";
          } else if (tech.size === 'wide') {
            colSpan = "col-span-2";
          }

          return (
            <div 
              key={index} 
              className={`
                flex flex-col items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6 
                rounded-[16px] sm:rounded-[24px] 
                bg-white/40 backdrop-blur-md border border-white/40 
                shadow-[0_10px_30px_rgba(0,0,0,0.05)] 
                transition-all duration-300 ease-in cursor-pointer 
                hover:-translate-y-2 hover:bg-white/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)]
                ${colSpan} ${rowSpan}
              `}
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className={`${iconSize} object-contain drop-shadow-md`} 
              />
              <span className={`font-sans font-semibold text-[#0D0D0D] text-center ${textSize}`}>
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
