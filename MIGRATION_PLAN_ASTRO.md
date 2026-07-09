# Plano de Migração: Next.js → Astro (portfólio joaoviitordev.com.br)

> Documento de planejamento da migração incremental do portfólio de Next.js para Astro,
> usando *islands architecture* (React apenas onde há interatividade real).
> Trabalhar sempre na branch `feat/astro-migration` — produção intocada até a Fase 5.

## Contexto do projeto atual (levantamento)

- **É um one-page só.** Uma rota (`/`), sem blog, sem rotas dinâmicas.
- **"Contato" hoje NÃO é formulário** — é só e-mail em texto + links LinkedIn/GitHub + botão de currículo (PDF). Não existe form nem API route. Isso muda a decisão do formulário (vira "quero adicionar?", não "como migro?").
- **Quase toda a interatividade é GSAP**, não React: `ScrollSmoother` global (envolve a página inteira via `#smooth-wrapper`/`#smooth-content`), `ScrollTrigger`, `SplitText`, Preloader. Carregados via CDN no `<head>`. O único estado React de verdade é o **modal de Projetos** (portal), o menu mobile do Header e o BackToTop.
- Stack atual: Next 16, React 19, Tailwind v4, fontes Poppins + Space Mono via `next/font`, FontAwesome via kit CDN, imagens `.webp` em `/public`.

A consequência arquitetural mais importante — e que responde direto à motivação de "demonstrar maturidade": **quase nada aqui precisa de React.** Isso vira o eixo do plano.

---

## 1. Diagnóstico rápido — o que repensar ao sair do Next para o Astro

O ponto-chave: hoje **a página inteira é `"use client"`**. Todo o `page.tsx` hidrata no cliente só pra rodar GSAP. No Astro, o modelo é o inverso — **zero JS por padrão**, e você "liga" JavaScript só onde precisa (as *islands*). Traduzindo cada peça:

| Área | Como é no Next hoje | O que muda no Astro | Precisa de React? |
|---|---|---|---|
| **Roteamento** | App Router, `src/app/page.tsx` | Arquivo → rota em `src/pages/`. `index.astro` = `/`. Sem `layout.tsx` automático; layout é um componente que você importa. | Não |
| **ScrollSmoother / ScrollTrigger / SplitText** | Client-side global via CDN no `<head>` + `useGSAP` | Um único **script vanilla** (`<script>` no `.astro`), sem React. GSAP roda igual, só que sem custo de hidratação. | **Não** |
| **Modal de Projetos** | React `useState` + `createPortal` | Ou uma **island React** (`client:visible`), ou HTML + `<dialog>` nativo. | Opcional |
| **Preloader / BackToTop / menu mobile** | React state | Vanilla JS trivial (classes/`hidden`). | Não |
| **Data dos projetos** | Array hardcoded dentro do componente client | Sai do bundle do cliente: fica no frontmatter `.astro` (roda no build) ou numa Content Collection. | Não |
| **Imagens** | `next/image` (`/public`) | `astro:assets` `<Image>` (assets movidos p/ `src/assets/`); SVGs de ícone continuam em `public/`. | — |
| **SEO / metadata** | `export const metadata` (Metadata API) | Tags no `<head>` do layout `.astro`, via props. Sem API mágica — é HTML explícito. | — |
| **Fontes** | `next/font/google` (self-host automático) | `@fontsource/*` (self-host via npm) ou a Fonts API do Astro. Sai o Google Fonts em runtime. | — |
| **Formulário de contato** | **Não existe** | Decisão nova (ver §4) | Depende |

**Conceitos do Astro que vão aparecer** (explicados na primeira vez que surgem):
- **Island**: um trecho interativo (ex: um componente React) isolado numa página estática. Só ele carrega JS; o resto é HTML puro.
- **`client:*` directives**: como você diz ao Astro *quando* hidratar uma island — `client:load` (na hora), `client:idle` (quando o browser ociar), `client:visible` (quando entra na viewport), `client:only="react"` (só no cliente, sem render no server).
- **Content Collections**: pasta de arquivos Markdown/MDX com schema validado por Zod — a forma idiomática de blog/conteúdo no Astro.

> ⚠️ **O maior risco técnico da migração** está aqui e é melhor já saber: `ScrollSmoother` reescreve o scroll nativo e envolve toda a página. Ele **conflita com View Transitions** (`<ClientRouter />`) do Astro. Como seu site é uma página só, a recomendação é **não usar View Transitions** — você não perde nada e evita o bug clássico de o smooth-scroll quebrar entre navegações. Detalhado em §6.

**Boa notícia que simplifica tudo:** desde o **GSAP 3.13 todos os plugins são gratuitos** (incluindo ScrollSmoother e SplitText). Você pode largar o hack dos 4 CDNs no `<head>` e fazer `npm i gsap`, importando `ScrollSmoother`/`SplitText` direto. Menos requests, versionamento travado, tree-shaking.

---

## 2. Estrutura de pastas proposta (Astro)

```
portfolio/
├── astro.config.mjs          # integrações: react, sitemap, adapter vercel
├── src/
│   ├── pages/
│   │   ├── index.astro        # a home (equivale ao seu page.tsx)
│   │   └── blog/              # (Fase 4, opcional)
│   │       ├── index.astro     # lista de posts
│   │       └── [slug].astro    # post individual
│   ├── layouts/
│   │   └── BaseLayout.astro    # <html>, <head>, SEO, fontes, footer/header slots
│   ├── components/
│   │   ├── sections/           # .astro ESTÁTICOS (sem JS)
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Technologies.astro
│   │   │   └── Projects.astro   # renderiza os cards (estático); o modal é island
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── islands/            # os ÚNICOS componentes React (.tsx)
│   │   │   └── ProjectModal.tsx # se optar por island (ver §4)
│   │   └── seo/
│   │       └── SEO.astro        # <title>, OG, twitter, canonical
│   ├── scripts/
│   │   └── gsap-init.ts         # ScrollSmoother + ScrollTrigger + Preloader (vanilla)
│   ├── content/
│   │   ├── config.ts           # (Astro 5: src/content.config.ts) schema Zod do blog
│   │   └── blog/               # posts .md/.mdx (Fase 4)
│   ├── data/
│   │   └── projects.ts         # o array de projetos, tipado (sai do componente)
│   ├── assets/                 # imagens processadas por astro:assets
│   │   └── images/*.webp
│   └── styles/
│       └── globals.css         # seu globals.css + tokens Tailwind v4
└── public/                     # servido as-is, sem processar
    ├── assets/icons/*.svg      # ícones de tech (ficam aqui, não precisam otimizar)
    ├── doc/joaovitorcurriculo.pdf
    ├── favicon/
    ├── robots.txt              # novo
    └── og-image.png            # novo (imagem de compartilhamento)
```

Regra mental de onde cada coisa vai:
- **`.astro` em `components/sections/`** → conteúdo que hoje é JSX mas sem estado (Hero, About, Technologies, Footer, os *cards* de Projects).
- **`.tsx` em `components/islands/`** → só o que tem estado React que você decide manter (no seu caso, no máximo o modal).
- **`src/scripts/gsap-init.ts`** → tudo de GSAP global.
- **`src/assets/`** = imagens que o Astro otimiza; **`public/`** = SVGs e PDF servidos crus.

---

## 3. Estratégia de migração incremental (por fases)

Trabalhe numa branch. Produção fica intocada até a Fase 5.

```bash
git checkout -b feat/astro-migration
```

### Fase 0 — Setup base
**Objetivo:** ter um projeto Astro rodando ao lado do atual, sem tocar em `src/app`.

Recomendo criar o Astro num diretório separado e depois trazer os arquivos, pra não brigar com o `package.json` do Next durante o processo:

```bash
# na raiz, cria um projeto astro limpo numa pasta temporária
npm create astro@latest astro-portfolio -- --template minimal --typescript strict --no-install --no-git
cd astro-portfolio
npm install
npx astro add react tailwind sitemap vercel   # integrações + adapter Vercel
npm i gsap                                     # GSAP completo (todos plugins grátis)
npm i @fontsource/poppins @fontsource/space-mono   # Poppins NÃO tem versão variável no Fontsource
```

**Critério de pronto:** `npm run dev` sobe uma página em branco do Astro; `astro.config.mjs` já lista `react()`, `tailwind` (via Vite plugin no Tailwind v4), `sitemap()` e `adapter: vercel()`.

---

### Fase 1 — Layout base, fontes e estilos
**Objetivo:** o "esqueleto" — `<html>`, `<head>`, SEO, fontes e Tailwind funcionando.

**Tarefas:**
1. Portar `globals.css` para `src/styles/globals.css`. No Tailwind v4 o import é `@import "tailwindcss";` — seus tokens `@theme` continuam iguais.
2. Trocar `next/font` por Fontsource. No `BaseLayout.astro`:
   ```astro
   ---
   import '@fontsource-variable/poppins';
   import '@fontsource/space-mono/400.css';
   import '@fontsource/space-mono/700.css';
   import '../styles/globals.css';
   const { title, description } = Astro.props;
   ---
   <html lang="pt-BR">
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="icon" href="/favicon/myfavicon.svg" />
       <slot name="head" />
     </head>
     <body><slot /></body>
   </html>
   ```
   As variáveis CSS `--font-poppins`/`--font-space-mono` você redefine apontando pros nomes das famílias do Fontsource.
3. Criar `SEO.astro` com `<title>`, description, OG e Twitter (copiando os valores do seu `layout.tsx` atual).

**Critério de pronto:** página em branco, mas com as duas fontes carregando (self-hosted, sem request pro Google), Tailwind aplicando, e `<head>` com as meta tags certas (confira no DevTools → Elements).

---

### Fase 2 — Seções estáticas (o grosso do site)
**Objetivo:** o site inteiro renderizado como HTML puro, **ainda sem animação**.

**Tarefas:**
1. Converter `Hero`, `About`, `Technologies`, `Header`, `Footer` de `.tsx` → `.astro`. É quase copiar-colar o JSX: tira `export default function`, remove `"use client"`, e o que era prop/variável vai pro frontmatter (entre os `---`). `className` vira `class`.
2. Mover o array de projetos de dentro de `Projects.tsx` para `src/data/projects.ts` (tipado com a `interface Project` que você já tem). No `Projects.astro`, itera com `.map()` no frontmatter e renderiza os cards.
3. Migrar imagens: mover `public/assets/images/*.webp` → `src/assets/images/`, e usar `<Image>` do `astro:assets`. SVGs de ícone **ficam em `public/`** (não vale otimizar SVG pequeno).
   ```astro
   ---
   import { Image } from 'astro:assets';
   import strangerThings from '../assets/images/strangerThings.webp';
   ---
   <Image src={strangerThings} alt="Projeto Stranger Things" widths={[400, 800]} />
   ```
4. FontAwesome: manter o kit CDN por ora (é 1 linha no `<head>`) — otimizar depois se quiser (§6).

**Critério de pronto:** `npm run build && npm run preview` mostra o site visualmente idêntico ao de produção, **com JS desligado no browser** (DevTools → Command Palette → "Disable JavaScript"). Tudo deve aparecer, exceto animações. Rode um Lighthouse aqui só pra ver a linha de base.

---

### Fase 3 — Interatividade (GSAP como script vanilla + island do modal)
**Objetivo:** trazer as animações de volta, com o mínimo de JS.

**Tarefas:**
1. Criar `src/scripts/gsap-init.ts` com ScrollSmoother, ScrollTrigger, SplitText e a lógica do Preloader e do BackToTop — **tudo vanilla**, sem React:
   ```ts
   import gsap from 'gsap';
   import { ScrollTrigger } from 'gsap/ScrollTrigger';
   import { ScrollSmoother } from 'gsap/ScrollSmoother';
   gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

   ScrollSmoother.create({
     wrapper: '#smooth-wrapper',
     content: '#smooth-content',
     smooth: 1.5, effects: true, smoothTouch: 0.1,
   });
   // ...Preloader, BackToTop com querySelector + classList
   ```
   Importar na página com `<script>` (o Astro faz bundle/tree-shake automático):
   ```astro
   <script>import '../scripts/gsap-init.ts';</script>
   ```
   O `#smooth-wrapper`/`#smooth-content` você mantém no `index.astro` exatamente como no `page.tsx`.
2. **Decisão do modal de Projetos** (ver §4 pros trade-offs). Recomendo: começar mantendo como **island React** (`ProjectModal.tsx`, hidratada com `client:visible`) pra migrar rápido, e avaliar trocar por `<dialog>` nativo depois. `client:visible` = só baixa o JS do modal quando a seção de projetos entra na tela.

**Critério de pronto:** smooth scroll, ScrollTriggers, Preloader e BackToTop funcionando igual à produção. No Network do DevTools, confirme que o JS baixado é só o chunk do GSAP + (se mantiver) o do modal — nada de bundle da página inteira como hoje.

---

### Fase 4 — Blog / conteúdo (OPCIONAL — só se você quiser mesmo)
**Objetivo:** seção de artigos via Content Collections. **Pule se blog não é prioridade agora** — não migre o que não existe.

**Tarefas:**
1. `src/content.config.ts` com schema Zod (`title`, `date`, `description`, `tags`, `draft`) usando o `glob` loader do Astro 5.
2. Posts em `src/content/blog/*.mdx`.
3. `src/pages/blog/index.astro` (lista) e `src/pages/blog/[slug].astro` (usa `getStaticPaths` + `render()` da entry).

**Critério de pronto:** `/blog` lista os posts e cada post renderiza; schema barra post com campo faltando no build.

---

### Fase 5 — SEO, performance e deploy
**Objetivo:** validar tudo e apontar a Vercel para a nova versão.

**Tarefas:**
1. `@astrojs/sitemap` gerando `sitemap-index.xml`; criar `public/robots.txt` apontando pro sitemap.
2. Gerar `og-image.png` (1200×630) e referenciar no SEO.
3. Rodar o **checklist da §5** inteiro.
4. Deploy de preview na Vercel a partir da branch (a Vercel detecta Astro sozinha e cria uma URL de preview — produção continua no Next).
5. Só depois de validado o preview: fazer o Astro virar a raiz do repo (mover arquivos, remover deps do Next) e mergear.

**Critério de pronto:** Lighthouse ~100/100/100/100 no preview, OG tags validadas, e a URL de preview idêntica em comportamento à produção.

---

## 4. Decisões técnicas que você precisa tomar

### 4.1 Formulário de contato

**Realidade:** hoje **não há formulário** — só e-mail em texto + botão de currículo. Então a decisão real é: *você quer adicionar um form?* Se sim:

| Opção | Prós | Contras | Quando escolher |
|---|---|---|---|
| **Manter como está** (e-mail + `mailto:`) | Zero backend, zero JS, nada quebra | Menos "pro"; abre cliente de e-mail | Se quer entregar a migração rápido |
| **Formspree / Web3Forms** (serviço) | Sem backend, sem chave no server, plano grátis, SPAM protection | Depende de terceiro; branding no free tier | Recomendado p/ portfólio |
| **Astro API endpoint + Resend** | Controle total, e-mail bonito, domínio próprio | Precisa `output: 'server'`/adapter, gerenciar `RESEND_API_KEY`, verificar domínio no Resend | Se quer demonstrar backend na Vercel |

**Recomendação:** se adicionar, comece com **Web3Forms/Formspree** (form estático, `method="POST"`, nenhuma island necessária). Migra pra Resend depois se quiser mostrar serverless — aí usa um endpoint em `src/pages/api/contact.ts` com o adapter Vercel que você já instalou.

### 4.2 Conteúdo do blog (se fizer a Fase 4)

| Opção | Prós | Contras |
|---|---|---|
| **MDX local (Content Collections)** | Versionado no git, zero custo, type-safe via Zod, componentes React dentro do post | Publicar = commit; sem UI de edição |
| **Headless CMS** (Sanity, Contentful) | UI de edição, publica sem deploy | Overkill p/ portfólio, custo/vendor lock-in, mais JS |

**Recomendação:** **MDX local com Content Collections.** Para um portfólio júnior/pleno, git-as-CMS é o padrão certo e mostra domínio da ferramenta.

### 4.3 Imagens

| Opção | Prós | Contras |
|---|---|---|
| **`astro:assets` `<Image>`** (recomendado) | Otimização no build, `width`/`height` automáticos (evita CLS), `srcset` responsivo, lazy default | Imagem precisa estar em `src/`, não `public/` |
| **`<img>` cru em `public/`** | Simples | Sem otimização, sem srcset, risco de CLS |

**Recomendação:** `<Image>` para as `.webp` de projeto (mover pra `src/assets/`). SVGs de ícone: `<img>` normal de `public/`, ou inline. Suas imagens já são `.webp`, então o ganho é sobretudo `srcset` + dimensões.

### 4.4 SEO / metadata

Não existe "Metadata API" no Astro — é HTML explícito, o que na prática é *mais* controle. Centralize num `SEO.astro` que recebe props (`title`, `description`, `image`, `canonical`) e renderiza `<title>`, `<meta name="description">`, OG e Twitter. Migre 1:1 os valores do seu `layout.tsx`. Adicione `<link rel="canonical">` (você não tem hoje) e a `og:image` (também não tem).

---

## 5. Checklist de validação pré-deploy

**Performance / Core Web Vitals**
- [ ] Lighthouse mobile ≥ 95 nas 4 categorias (meta ~100)
- [ ] LCP < 2.5s — o LCP provável é o letreiro do Hero ou 1ª imagem; garanta que a fonte não bloqueia
- [ ] CLS ~0 — todas as imagens com `width`/`height` (o `<Image>` resolve)
- [ ] No Network: só os chunks de GSAP (+ modal, se island). Nenhum bundle de página inteira
- [ ] Fontes self-hosted com `font-display: swap` e preload da fonte crítica

**Acessibilidade**
- [ ] `<h1>` único (você já tem o `sr-only` no Hero — mantenha)
- [ ] Todas as `<Image>` com `alt` descritivo (hoje alguns cards podem herdar genérico)
- [ ] Contraste do texto sobre os gradientes
- [ ] `prefers-reduced-motion`: desligar ScrollSmoother/animações pra quem pediu (fácil no `gsap-init.ts`)
- [ ] Foco visível e navegação por teclado no modal (`<dialog>` dá isso de graça)

**SEO técnico**
- [ ] `sitemap-index.xml` gerado e acessível
- [ ] `public/robots.txt` com `Sitemap:` apontando pro domínio
- [ ] OG tags validadas (opengraph.xyz ou o validador do LinkedIn)
- [ ] `og:image` 1200×630 existindo em `public/`
- [ ] `<link rel="canonical">` com a URL `https://www.joaoviitordev.com.br`
- [ ] `lang="pt-BR"` no `<html>`

**Deploy Vercel**
- [ ] `@astrojs/vercel` no config; se o site for 100% estático (sem form Resend), pode até usar `output: 'static'` e nem precisa de adapter server
- [ ] Preview deploy da branch OK antes de mexer em produção
- [ ] Variáveis de ambiente (se usar Resend) configuradas no dashboard da Vercel
- [ ] Redirect `joaoviitordev.com.br` → `www` (ou vice-versa) mantido igual ao atual

---

## 6. Riscos e pontos de atenção

1. **ScrollSmoother × View Transitions (o principal).** Não instale `<ClientRouter />`. Como é one-page, você não ganha nada com View Transitions e evita o smooth-scroll quebrar. Se um dia adicionar `/blog`, reavalie — mas aí provavelmente sem ScrollSmoother nas rotas de blog.

2. **Ordem de execução do GSAP.** Hoje seus plugins vêm de CDN `beforeInteractive` no `<head>`, e o `useGSAP` garante timing. No Astro com `import` npm, o `<script>` roda como módulo (deferido) — geralmente OK, mas confira que o `ScrollSmoother.create` só roda com o DOM pronto (o script de módulo já espera o parse). Teste o Preloader com cache desabilitado.

3. **Perda do modelo de estado global do React.** Hoje o `smoother` fica em `window.smoother` e o BackToTop lê dele. Isso continua funcionando em vanilla, mas se você tornar o modal uma island, lembre que **ilhas não compartilham estado entre si nem com o script global** — comunicação é via DOM/eventos/`window`, não via contexto React. Para seu caso (modal isolado) isso não é problema.

4. **`next/font` → Fontsource: nomes das famílias.** Suas CSS vars (`--font-poppins`) precisam apontar pro nome exato que o Fontsource registra — `"Poppins"` e `"Space Mono"` (já definidos no `@theme` do `global.css`), senão a fonte cai no fallback silenciosamente. Nota: **Poppins não tem versão variável** no Fontsource, então importa-se por peso (`@fontsource/poppins/400.css`, etc.), não `@fontsource-variable/*`.

5. **O que NÃO vale migrar:**
   - O hack dos 4 `<Script>` de GSAP via CDN — **jogue fora**, use npm (plugins agora são grátis).
   - `"use client"` em tudo — o objetivo é justamente eliminar.
   - Blog/form se você não vai manter — não crie estrutura morta.
   - `next.config.ts`, `next-env.d.ts`, `eslint-config-next` — descartar no fim.

6. **FontAwesome kit via CDN** é um request de terceiro que derruba um pouco o Lighthouse e o "no external JS". Opcional pós-migração: trocar pelos SVGs que você usa (só precisa de LinkedIn, GitHub, arrow-up) inline — elimina o request inteiro.

---

## 7. Próximos passos imediatos (hoje, na branch nova)

1. **`git checkout -b feat/astro-migration`** e rodar o scaffold da **Fase 0** (`npm create astro@latest` + `astro add react tailwind sitemap vercel` + `npm i gsap @fontsource-variable/poppins @fontsource/space-mono`). Meta: `npm run dev` sobe.
2. **Fase 1:** criar `BaseLayout.astro` + `SEO.astro` e portar `globals.css`, trocando `next/font` por Fontsource. Validar fontes e `<head>` no DevTools.
3. **Fase 2, primeiro pedaço:** converter **`Hero.astro`** (o mais simples, é quase só o marquee CSS) e um **`Footer.astro`** — confirma que o fluxo `.tsx → .astro` está redondo antes de fazer as outras seções.
4. **Extrair `src/data/projects.ts`** do `Projects.tsx` atual (copiar o array + a `interface`). Isso desbloqueia o `Projects.astro`.
5. **Decidir uma coisa só:** modal de Projetos como **island React** (rápido) ou **`<dialog>` nativo** (mais leve). Recomendo island primeiro pra destravar a migração; otimiza depois.
