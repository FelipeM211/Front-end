# Aula prática – Portfólio com React + Vite + Tailwind

> Objetivo: sair com um portfólio pessoal responsivo, com tema claro/escuro, animações leves, acessível, e pronto para deploy na Vercel.

---

## 1) Criar o Projeto

Primeiro, crie um novo projeto React usando o Vite. Abra seu terminal e execute o seguinte comando:

```bash
npm create vite@latest meu-portfolio
cd meu-portfolio
npm i
```

Instale o React Router:

```bash
npm i react-router-dom
```

Instale o Lucide-React - ícones e animações

```bash
npm i lucide-react framer-motion
```

Agora configure o Tailwind CSS. Abra seu terminal na raiz do projeto e instale as dependências:

```bash
npm i tailwindcss @tailwindcss/vite
```

Configure os Arquivos do Tailwind. Edite `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

No `src/index.css` (ou `App.css`):

```css
@import "tailwindcss";

.section-y {
  @apply py-20;
}
.container-px {
  @apply max-w-6xl mx-auto px-4;
}
```

---

## 2) Estrutura de pastas

```bash
src/
  components/
    Header.jsx
    ThemeToggle.jsx
    SectionTitle.jsx
    ProjectCard.jsx
    SkillBadge.jsx
  sections/
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Experience.jsx
    Contact.jsx
  data/
    skills.js
    projects.js
    experience.js
  routes/ (se usar react-router)
    Home.jsx
    ProjectDetails.jsx
  App.jsx
  index.css
```

---

## 3) Dados de exemplo (TS)

**src/data/skills.js**

```js
export const skills = [
  { name: 'React', level: 'Avançado' },
  { name: 'TypeScript', level: 'Intermediário' },
  { name: 'Tailwind', level: 'Avançado' },
  { name: 'Node.js', level: 'Intermediário' },
]
```

**src/data/projects.js**

```js
 export const projects = [
  {
    slug: 'meu-portifolio',
    title: 'Meu Portfólio',
    description: 'Site responsivo com skills, formulário e animações suaves.',
    tech: ['React', 'Tailwind', 'Vite'],
    repo: 'https://github.com/seuusuario/portifolio',
    demo: 'https://portifolio.vercel.app',
  },
  {
    slug: 'portfolio',
    title: 'Meu Portfólio',
    description: 'Projeto atual, com tema escuro e acessibilidade.',
    tech: ['React', 'Tailwind'],
  },
]
```

**src/data/experience.js**

```js
export const experience = [
  {
    role: 'Desenvolvedor Front-end',
    company: 'Empresa X',
    period: '2023 — atual',
    bullets: [
      'Desenvolvimento de SPA com React e JS',
      'Aprimoramento de acessibilidade (WCAG AA)'
    ]
  }
]
```

---

## 4) Componentes base

**src/components/SectionTitle.jsx**

```jsx
export default function SectionTitle({ id, children }) {
  return (
    <h2 id={id} className="text-2xl sm:text-3xl font-bold tracking-tight">
      {children}
    </h2>
  )
}
```

**src/components/ProjectCard.jsx**

```jsx
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectCard(p) {
  return (
    <article className="rounded-2xl border p-6 bg-white dark:bg-gray-900 hover:shadow-2xl hover:-translate-y-1 transition-transform">
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="mt-1 text-sm opacity-80">{p.description}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {p.tech.map(t => (
          <li key={t} className="text-xs bg-brand-100 text-brand-800 px-2 py-1 rounded-full">{t}</li>
        ))}
      </ul>
      <div className="mt-4 flex gap-3">
        {p.demo && (
          <a className="inline-flex items-center gap-1 text-sm underline" href={p.demo} target="_blank" rel="noreferrer">
            <ExternalLink size={16}/> demo
          </a>
        )}
        {p.repo && (
          <a className="inline-flex items-center gap-1 text-sm underline" href={p.repo} target="_blank" rel="noreferrer">
            <Github size={16}/> código
          </a>
        )}
      </div>
    </article>
  )
}
```

**src/components/ThemeToggle.jsx**

```jsx
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    dark ? root.classList.add('dark') : root.classList.remove('dark')
  }, [dark])

  return (
    <button
      aria-label="Alternar tema"
      className="p-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-900"
      onClick={() => setDark(d => !d)}
    >
      {dark ? <Sun size={18}/> : <Moon size={18}/>}
    </button>
  )
}
```

---

## 5) Seções

**src/sections/Hero.jsx**

```jsx
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent"
      >
        Olá, eu sou <span className="text-brand-600">Seu Nome</span>
      </motion.h1>
      <p className="mt-3 opacity-80 max-w-2xl mx-auto">
        Desenvolvedor Front-end focado em React, acessibilidade e UX.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <a href="#projects" className="px-4 py-2 rounded-xl bg-brand-600 text-white">Ver projetos</a>
        <a href="#contact" className="px-4 py-2 rounded-xl border">Contato</a>
      </div>
    </section>
  )
}
```

**src/sections/About.jsx**

```jsx
export default function About() {
  return (
    <section id="about" className="section-y container-px">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold">Sobre mim</h2>
          <p className="mt-2 opacity-80">
            Breve bio com foco no que você resolve: performance, acessibilidade, produtos.
          </p>
        </div>
        <img src="/portrait.png" alt="Foto de perfil" className="w-40 h-40 rounded-2xl mx-auto md:mx-0 object-cover"/>
      </div>
    </section>
  )
}
```

**src/sections/Skills.jsx**

```jsx
import { skills } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="section-y container-px">
      <h2 className="text-2xl font-bold">Habilidades</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {skills.map(s => (
          <li key={s.name} className="px-3 py-1 rounded-full border text-sm">
            {s.name} · {s.level}
          </li>
        ))}
      </ul>
    </section>
  )
}
```

**src/sections/Projects.jsx**

```jsx
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="section-y container-px">
      <h2 className="text-2xl font-bold">Projetos</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => <ProjectCard key={p.slug} {...p} />)}
      </div>
    </section>
  )
}
```

**src/sections/Experience.jsx**

```jsx
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="section-y container-px">
      <h2 className="text-2xl font-bold">Experiência</h2>
      <div className="mt-4 space-y-4">
        {experience.map((e, i) => (
          <article key={i} className="rounded-xl border p-4">
            <h3 className="font-semibold">{e.role} · {e.company}</h3>
            <p className="text-sm opacity-70">{e.period}</p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
```

**src/sections/Contact.jsx**

```jsx
export default function Contact() {
  return (
    <section id="contact" className="section-y container-px">
      <h2 className="text-2xl font-bold">Contato</h2>
      <form className="mt-4 grid sm:grid-cols-2 gap-4 max-w-2xl">
        <input className="border rounded-xl p-3" placeholder="Seu nome" aria-label="Seu nome"/>
        <input className="border rounded-xl p-3" type="email" placeholder="Seu e-mail" aria-label="Seu e-mail"/>
        <textarea className="border rounded-xl p-3 sm:col-span-2" rows={4} placeholder="Mensagem" aria-label="Mensagem"/>
        <button className="bg-brand-600 text-white rounded-xl px-4 py-2 w-fit sm:col-span-2">Enviar</button>
      </form>
    </section>
  )
}
```

---

## 6) Layout principal

**src/components/Header.jsx**

```jsx
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/30 border-b">
      <nav className="container-px h-14 flex items-center justify-between">
        <a href="#" className="font-bold">SeuNome.dev</a>
        <ul className="hidden sm:flex items-center gap-4 text-sm">
          <li><a href="#about">Sobre</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projetos</a></li>
          <li><a href="#experience">Experiência</a></li>
          <li><a href="#contact">Contato</a></li>
        </ul>
        <ThemeToggle/>
      </nav>
    </header>
  )
}
```

**src/App.jsx**

```jsx
import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="min-h-dvh bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header/>
      <main>
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Contact/>
      </main>
      <footer className="container-px py-10 text-sm opacity-70">
        © {new Date().getFullYear()} Seu Nome • Feito com React + Tailwind
      </footer>
    </div>
  )
}
```

---

## 7) Acessibilidade rápida (checklist)

- `alt` descritivo em imagens
- Hierarquia de headings (`h1` único, `h2` por seção)
- Contraste ok no modo claro/escuro
- Foco visível: `focus:outline-none focus:ring-2 focus:ring-brand-500`
- Labels e `aria-label` em inputs

---

## 8) Responsividade (padrões prontos)

- Grid adaptativa nas seções de projetos.
- Tipografia fluida (`text-3xl sm:text-5xl`).
- Espaçamento consistente via util classes.

---

## 9) Dark mode

- Alternância via classe `dark` (já habilitada no `tailwind.config.js`).
- Cores neutras: `bg-white dark:bg-gray-950`, `text-gray-900 dark:text-gray-100`.
- Testar contraste: modo claro/escuro.

---

## 10) Deploy (Vercel)

1. `git init && git add -A && git commit -m "feat: portfolio base"`
2. Criar repositório no GitHub e fazer `git push`.
3. Na Vercel, **New Project** → importar o repo → framework **Vite** → build `npm run build` e output `dist/`.
4. Configurar domínio.

---

## 11) Roteiro

Portfólio como cartão de visitas técnico. Precisa ser rápido, responsivo e sem enrolação.
Muitos portfólios são bonitos, porém não mostram valor: faltam projetos claros, acessibilidade e links de demo/código.
SPA com React + Vite + Tailwind, seções objetivas, dados tipados, cards reutilizáveis e tema dark.

1) Componentização (props, tipagem leve)
2) Estilos utilitários (Tailwind)
3) Responsividade por breakpoints
4) Acessibilidade mínima
5) Deploy contínuo (GitHub → Vercel)

- Seguir os passos 1 a 6 para montar base.
- Popular `data/*` com conteúdo real.
- Subir no GitHub e publicar na Vercel.

Checklist final + próximos passos (abaixo).

---

## 12) Desafios (para quem for além)

**Filtro por tecnologia** nos projetos (state + `.filter`).

- **Página de detalhes** do projeto (`/project/:slug`) com `react-router-dom`.
- **Form de contato real** via Formspree/Resend/Serverless.
- **i18n** (pt/en) com toggle.
- **SEO** básico: `<title>`, meta tags, Open Graph, sitemap.

---

> Dica final: portfólio bom conta história. Cada seção precisa responder “o que eu resolvo?” com exemplos e links.
