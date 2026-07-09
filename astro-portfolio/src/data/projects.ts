import type { ImageMetadata } from 'astro';

// Imagens importadas de src/assets → otimizadas pelo astro:assets (<Image>).
import strangerThings from '../assets/images/strangerThings.webp';
import pringles from '../assets/images/pringles.webp';
import doutoragenda from '../assets/images/doutoragenda.webp';
import agencia from '../assets/images/agencia.webp';
import superMario from '../assets/images/superMario.webp';
import stockly from '../assets/images/stockly.webp';

export interface Tech {
  name: string;
  /** Caminho de public/ (SVG servido cru). */
  icon: string;
}

export interface Project {
  title: string;
  url: string;
  repo: string;
  img: ImageMetadata;
  description: string;
  techs: Tech[];
}

export const projects: Project[] = [
  {
    title: 'Stranger Things',
    url: 'https://joaoviitordev.github.io/Landing-Page-StrangerThings/',
    repo: 'https://github.com/joaoviitordev/Landing-Page-StrangerThings',
    img: strangerThings,
    description:
      'Este projeto consiste em uma Landing Page inspirada no site oficial da série Stranger Things da Netflix, desenvolvida com foco em UI/UX, experiência imersiva e identidade visual. A interface foi planejada para transmitir a atmosfera da série, respeitando hierarquia visual, consistência de design e boas práticas de front-end.',
    techs: [
      { name: 'HTML5', icon: '/assets/icons/html5.svg' },
      { name: 'CSS3', icon: '/assets/icons/css3.svg' },
      { name: 'JavaScript', icon: '/assets/icons/js.svg' },
      { name: 'GSAP', icon: '/assets/icons/gsap2.svg' },
      { name: 'Figma', icon: '/assets/icons/figma.svg' },
    ],
  },
  {
    title: 'Pringles',
    url: 'https://joaoviitordev.github.io/Landing-Page-Pringles/',
    repo: 'https://github.com/joaoviitordev/Landing-Page-Pringles',
    img: pringles,
    description:
      'Assim como o projeto de Stranger Things, este projeto também é uma Landing Page, porém, é inspirada no site oficial da Pringles, desenvolvida com foco em UI/UX, experiência imersiva e identidade visual. A interface foi planejada para transmitir a atmosfera da marca, respeitando hierarquia visual, consistência de design e boas práticas de front-end.',
    techs: [
      { name: 'HTML5', icon: '/assets/icons/html5.svg' },
      { name: 'CSS3', icon: '/assets/icons/css3.svg' },
      { name: 'JavaScript', icon: '/assets/icons/js.svg' },
      { name: 'GSAP', icon: '/assets/icons/gsap2.svg' },
      { name: 'Figma', icon: '/assets/icons/figma.svg' },
    ],
  },
  {
    title: 'Doutor Agenda',
    url: 'https://doutor-agenda-indol.vercel.app/',
    repo: 'https://github.com/joaoviitordev/doutor-agenda',
    img: doutoragenda,
    description:
      'Sistema SaaS para agendamento médico construído com React, Next.js e Tailwind CSS. Desafio: otimização de performance e criação de um painel de UI/UX intuitivo para clínicas. Para saber mais sobre as tecnologias utilizadas, acesse o repositório do projeto.',
    techs: [
      { name: 'React', icon: '/assets/icons/react.svg' },
      { name: 'Next.js', icon: '/assets/icons/nextjs.svg' },
      { name: 'Tailwind CSS', icon: '/assets/icons/tailwindcss.svg' },
      { name: 'Node.js', icon: '/assets/icons/nodejs2.svg' },
      { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
      { name: 'Figma', icon: '/assets/icons/figma.svg' },
    ],
  },
  {
    title: 'Agência 3D',
    url: 'https://joaoviitordev.github.io/Agencia3D/',
    repo: 'https://github.com/joaoviitordev/Agencia3D',
    img: agencia,
    description:
      'Landing page imersiva para Agência 3D do grupo WebHub usando bibliotecas avançadas de animação web (GSAP e Three.js). A interface foi planejada para transmitir a atmosfera da marca, respeitando hierarquia visual, consistência de design e boas práticas de front-end. Para saber mais sobre as tecnologias utilizadas, acesse o repositório do projeto.',
    techs: [
      { name: 'HTML5', icon: '/assets/icons/html5.svg' },
      { name: 'CSS3', icon: '/assets/icons/css3.svg' },
      { name: 'JavaScript', icon: '/assets/icons/js.svg' },
      { name: 'GSAP', icon: '/assets/icons/gsap2.svg' },
      { name: 'Three.js', icon: '/assets/icons/threejs.svg' },
      { name: 'Figma', icon: '/assets/icons/figma.svg' },
    ],
  },
  {
    title: 'Super Mario Galaxy',
    url: 'https://joaoviitordev.github.io/SuperMarioGalaxy/',
    repo: 'https://github.com/joaoviitordev/SuperMarioGalaxy',
    img: superMario,
    description:
      'Landing page conceitual e animada inspirada no universo Super Mario Galaxy, simulando o site oficial de um filme fictício com visual imersivo, animações avançadas de scroll e efeitos visuais galáticos. Para saber mais sobre as tecnologias utilizadas, acesse o repositório do projeto.',
    techs: [
      { name: 'HTML5', icon: '/assets/icons/html5.svg' },
      { name: 'CSS3', icon: '/assets/icons/css3.svg' },
      { name: 'JavaScript', icon: '/assets/icons/js.svg' },
      { name: 'GSAP', icon: '/assets/icons/gsap2.svg' },
      { name: 'Figma', icon: '/assets/icons/figma.svg' },
    ],
  },
  {
    title: 'Stockly',
    url: 'https://stockly-seven-nu.vercel.app/',
    repo: 'https://github.com/joaoviitordev/stockly',
    img: stockly,
    description:
      'Este projeto consiste em uma aplicação web completa para o controle de estoque e vendas, desenvolvida com o objetivo de aprender a criar soluções full stack robustas. O sistema permite o gerenciamento de produtos, registro de vendas e possui um painel de controle com gráficos de receita em tempo real.',
    techs: [
      { name: 'Next.js', icon: '/assets/icons/nextjs.svg' },
      { name: 'React', icon: '/assets/icons/react.svg' },
      { name: 'Tailwind CSS', icon: '/assets/icons/tailwindcss.svg' },
      { name: 'Node.js', icon: '/assets/icons/nodejs2.svg' },
      { name: 'PostgreSQL', icon: '/assets/icons/postgresql.svg' },
      { name: 'Figma', icon: '/assets/icons/figma.svg' },
    ],
  },
];
