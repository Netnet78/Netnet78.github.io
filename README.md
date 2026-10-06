# Sy Sophaneth — Personal Developer Portfolio

<div align="center">

[![Live Site](https://img.shields.io/badge/Live_Site-netnet78.github.io-success?style=for-the-badge&logo=githubpages&logoColor=white)](https://netnet78.github.io/)
[![Astro](https://img.shields.io/badge/Astro-7.3-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](#license)

<br/>

**A fast, data-driven personal portfolio and curriculum vitae built with Astro, React, and Tailwind CSS v4.**

[Explore Live Demo](https://netnet78.github.io/) • [Report Bug](https://github.com/Netnet78/Netnet78.github.io/issues) • [Request Feature](https://github.com/Netnet78/Netnet78.github.io/issues)

</div>

---

## 📖 Overview

This repository hosts the source code for the personal portfolio of **Sy Sophaneth**, a Software Developer & Educator based in Cambodia. 

Engineered with performance, elegance, and maintainability in mind, the portfolio leverages Astro's **Islands Architecture** to deliver zero unnecessary client-side JavaScript by default, hydrating interactive components only where required. All personal milestones, professional experience, projects, skills, and contact channels are decoupled from presentation components and managed from a single typed source of truth.

---

## ✨ Key Highlights & Features

- **⚡ Blazing Fast Static Delivery:** Pre-rendered statically with Astro 7 for instant page loads and maximum SEO performance.
- **🏝️ Selective Island Hydration:** Interactive controls (such as tooltips and dynamic action triggers) are isolated in React 19 components and hydrated on demand with `client:load`.
- **🌌 Interactive Canvas Particle Network:** A lightweight, dependency-free HTML5 Canvas particle background (`NetworkBackground.astro`) simulating interconnected nodes that adapt to viewport dimensions and render cycles.
- **✍️ Dynamic Typewriter Animation:** Smooth, cycling title headline in the hero section introducing developer and educator roles.
- **🧭 Scroll-Spy Sticky Navigation:** Header nav items dynamically track the user's scroll position with an IntersectionObserver and highlight active sections in real time.
- **💫 Fluid Scroll-Reveal Motion:** Global viewport reveal observer animating sections gracefully as they enter the screen.
- **🎨 Modern OKLCH Theme Architecture:** Styled with Tailwind CSS v4 using perceptually uniform OKLCH color palettes, glassmorphism blur effects, and rich typography.
- **🗃️ Single Source of Truth (`src/data/cv.ts`):** All resume data (experience, projects, stack, education, languages) lives in one centralized file—no digging through HTML or layouts to update your resume.
- **🚀 Automated CI/CD:** GitHub Actions workflow automatically builds and publishes the production bundle directly to GitHub Pages on every push to `main`.

---

## 🛠️ Tech Stack Breakdown

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Astro v7](https://astro.build/) | Static site generator & islands architecture orchestration |
| **Interactive Islands** | [React 19](https://react.dev/) | Isolated client components (`@astrojs/react`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation CSS framework compiled via `@tailwindcss/vite` |
| **Theme System** | OKLCH Color Space & CSS Variables | Perceptually uniform dark and light color tokens |
| **UI Primitives** | Base UI & Lucide React | Accessible tooltip wrappers and icon primitives |
| **Iconography** | [Font Awesome](https://fontawesome.com/) | Comprehensive vector icons for tech tags, roles, and contacts |
| **Typography** | Space Grotesk, Aleo, Space Mono | Web font stack paired with `@fontsource-variable` packages |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe components, data models, and configurations |
| **Deployment** | [GitHub Actions & Pages](https://pages.github.com/) | Automated build & zero-downtime static hosting pipeline |

---

## 📂 Project Architecture

```text
Netnet78.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD to GitHub Pages
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── images/
│       └── square-profile.jpg  # Profile portrait photo
├── src/
│   ├── components/
│   │   ├── sections/           # Modular page sections
│   │   │   ├── Hero.astro          # Headline, typewriter effect, CTA & profile card
│   │   │   ├── About.astro         # Narrative bio, personal snapshot & languages
│   │   │   ├── Experiences.astro   # Professional & volunteer timeline
│   │   │   ├── Projects.astro      # Featured engineering projects & repositories
│   │   │   ├── Skills.astro        # Categorized technical competencies
│   │   │   ├── Education.astro     # Academic milestones & diplomas
│   │   │   └── Contact.astro       # Direct channels & message submission form
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   ├── button.tsx          # Styled button variants with CVA
│   │   │   └── tooltip.tsx         # Accessible Base UI tooltip wrapper
│   │   ├── ContactButton.tsx       # Header quick-contact action button
│   │   ├── DownloadCvButton.tsx    # Header CV download button (external PDF)
│   │   ├── MainHeader.astro        # Sticky navigation bar with scroll-spy
│   │   ├── MainFooter.astro        # Footer branding, copyright & quick links
│   │   └── NetworkBackground.astro # Interactive canvas particle constellation
│   ├── data/
│   │   └── cv.ts                   # Centralized resume & portfolio content data
│   ├── layouts/
│   │   └── BaseLayout.astro        # HTML scaffold, metadata, fonts, scroll observer
│   ├── lib/
│   │   └── utils.ts                # Class merging utility (clsx + tailwind-merge)
│   ├── pages/
│   │   └── index.astro             # Single-page portfolio root route
│   └── styles/
│       └── global.css              # Global tokens, OKLCH themes & animation classes
├── astro.config.mjs                # Astro configuration (Vite, React, Tailwind plugins)
├── package.json
└── tsconfig.json
```

---

## 📝 Content Management Guide

All portfolio content is decoupled from layout markup. You can update virtually everything on the site simply by editing [`src/data/cv.ts`](src/data/cv.ts):

### 1. Basic Info & Socials
Update your headline, location, and contact email:
```ts
export const profile = {
  name: "Sy Sophaneth",
  title: "Software Developer & Educator",
  location: "Poipet, Banteay Meanchey, Cambodia",
  email: "sysophaneth@gmail.com",
  // ...
};
```

### 2. Work & Teaching Experience
Add or edit roles in the `experiences` array:
```ts
experiences: [
  {
    role: "Volunteer Computer Science Teacher",
    org: "Don Bosco High School of Poipet",
    period: "Aug 2026 - Present",
    icon: "fa-solid fa-chalkboard-user",
    skills: ["CS Fundamentals", "Lab Curriculum", "Mentorship"],
    bullets: [
      "Volunteered to instruct high school students in fundamental CS...",
    ],
  },
]
```

### 3. Projects
Add new software or media projects to the `projects` array:
```ts
projects: [
  {
    title: "School Management System",
    category: "DESKTOP APP",
    icon: "fa-solid fa-desktop",
    description: "Comprehensive desktop application to streamline...",
    tags: ["C#", "WPF", "XAML", "Database"],
    github: "https://github.com/Netnet78/School-Management-System",
    view: "https://www.youtube.com/watch?v=...",
  },
]
```

### 4. Technical Skills
Organize skills under custom categories in the `skills` array:
```ts
skills: [
  {
    faIcon: "fa-solid fa-code",
    category: "Development & Systems",
    items: ["C# • .NET Ecosystem", "Desktop Dev (XAML & WPF)", "Full Stack Web"],
  },
]
```

---

## 📐 Conventions & Rules

When extending or maintaining this codebase, keep these rules in mind:

- **Mandatory `reveal` Class on Sections:** Every `<section>` element created across pages or components must include the `.reveal` class (e.g. `<section id="..." class="... reveal">`). This is required by the global IntersectionObserver in `BaseLayout.astro` for entrance animations.
- **Astro Islands:** Use `.astro` components for all static content. Only use `.tsx` when stateful DOM interaction or React hooks are required, and include an appropriate client directive (e.g., `<ContactButton client:load />`).
- **Tailwind v4 Setup:** Tailwind v4 runs directly through `@tailwindcss/vite` within `astro.config.mjs` and imports styles via `@import "tailwindcss";` in `src/styles/global.css`.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** `>= 22.12.0`
- **Package Manager:** `npm` (or `pnpm` / `bun`)

### 1. Clone the Repository
```bash
git clone https://github.com/Netnet78/Netnet78.github.io.git
cd Netnet78.github.io
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
> Alternatively, start the Astro dev server in background mode:
> ```bash
> astro dev --background
> ```
> Open [http://localhost:4321](http://localhost:4321) in your browser to view the site.

### 4. Production Build & Preview
```bash
# Build static files into ./dist
npm run build

# Preview the production build locally
npm run preview
```

---

## 🚢 Deployment Pipeline

The portfolio is continuously deployed to GitHub Pages using GitHub Actions:

1. Whenever a commit is pushed to the `main` branch, the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) triggers automatically.
2. The `withastro/action@v3` action checks out the repository, installs dependencies, and runs `astro build` on Node 22.
3. The generated `./dist` artifacts are uploaded and published to GitHub Pages with zero manual intervention.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE). Feel free to use the structure as inspiration for your own portfolio!

<div align="center">
  <sub>Developed with passion by <a href="https://github.com/Netnet78">Sy Sophaneth</a>.</sub>
</div>
