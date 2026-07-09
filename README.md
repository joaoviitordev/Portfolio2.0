# Portfólio — João Vitor

Portfólio pessoal de João Vitor, desenvolvedor Full-Stack & UI/UX.

🔗 **Produção:** [joaoviitordev.com.br](https://www.joaoviitordev.com.br)

## Stack

- **[Astro](https://astro.build)** — site majoritariamente estático, zero JS por padrão
- **Islands architecture** — React só onde há interatividade real (o modal de projetos)
- **Tailwind CSS v4** (via plugin Vite)
- **GSAP** — Preloader, back-to-top e micro-interações (vanilla, sem React)
- **astro:assets** — imagens otimizadas com `srcset` responsivo
- **Fontsource** — Poppins e Space Mono self-hosted (sem Google Fonts em runtime)
- Deploy na **Vercel**

## Por que Astro

O conteúdo é quase todo estático (apresentação, projetos, tecnologias, contato).
Astro entrega HTML puro e "liga" JavaScript só nas ilhas interativas — menos JS no
cliente, melhor performance. Migrado de Next.js; ver `MIGRATION_PLAN_ASTRO.md` para
o registro da decisão e das fases.

## Desenvolvimento

```sh
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção em ./dist
npm run preview    # preview do build
npx astro check    # type-check
```

## Estrutura

```text
src/
├── pages/index.astro         # a home (one-page)
├── layouts/BaseLayout.astro  # <html>, <head>, SEO, fontes
├── components/
│   ├── sections/             # Hero, About, Projects, Technologies (estáticos)
│   ├── layout/               # Header, Footer
│   ├── islands/              # ProjectsModal.tsx (única ilha React)
│   ├── seo/SEO.astro         # metadata, OG, canonical
│   └── ui/Icon.astro         # ícones SVG inline
├── scripts/gsap-init.ts      # GSAP global (vanilla)
├── data/projects.ts          # dados dos projetos
├── assets/images/            # imagens otimizadas por astro:assets
└── styles/global.css         # tokens Tailwind v4
```
