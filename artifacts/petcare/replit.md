# PetWell — Iteration 1

Smart Pet Care & Veterinary Management System. The warm, trustworthy hub for pet owners to manage their pets' lives.

## Stack
Vanilla HTML / CSS / JavaScript multi-page app, served by Vite in development. Designed so the rendering layer can later be swapped to PHP without changing markup.

- **Vite (MPA mode)** — `vite.config.ts` lists every `.html` page as an input. No bundler-specific imports; HTML / CSS / JS only.
- **Lucide icons** — loaded via CDN script tag on every page; `window.lucide.createIcons()` upgrades `<i data-lucide="...">` placeholders.
- **No frameworks, no chart libraries.** SVG line chart for weight trend is hand-built in `js/pet-detail.js`.
- **Inter font** loaded from Google Fonts.
- **No emojis anywhere.**

## Folder structure

```
artifacts/petcare/
├── index.html               Landing
├── login.html               Sign-in
├── register.html            Sign-up (owner / vet / service)
├── forgot-password.html     Password reset
├── dashboard.html           Owner home
├── pets.html                List + add pet
├── pet-detail.html          Pet profile (Overview / Medical Records tabs)
├── symptom-checker.html     4-step triage flow
├── appointments.html        Upcoming / past tabs
├── appointments-new.html    3-step booking flow + summary
├── lost-pets.html           Community alert grid + broadcast simulation
├── coming-soon.html         Placeholder for vet/service/marketplace
├── css/
│   └── styles.css           All design tokens + utility classes + components
├── js/
│   ├── data.js              window.PetData boundary (PHP swap point)
│   ├── shell.js             TopNav / Sidebar / Footer / Toast / Modal
│   ├── dashboard.js
│   ├── pets.js
│   ├── pet-detail.js        Tabs, accordion, inline SVG weight chart
│   ├── symptom-checker.js   4-step state machine
│   ├── appointments.js      Tabbed list rendering
│   ├── appointments-new.js  3-step booking flow + live summary
│   └── lost-pets.js         Grid + broadcast simulation modal
├── public/
│   └── favicon.svg
├── package.json
└── vite.config.ts
```

## PHP integration boundary

All dummy data and read/write operations live in `js/data.js` under `window.PetData`. The rendering scripts never hold raw arrays — they only call methods like `PetData.getPets()`, `PetData.getUpcomingAppointments()`, etc. To migrate to PHP, replace those method bodies with `fetch()` calls to PHP endpoints that return the same JSON shape; no markup needs to change.

## Page conventions

Each page sets `window.PetWellPage = { id: "<page-id>" }` **before** loading `js/shell.js`. Load order:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>window.PetWellPage = { id: "..." };</script>
<script src="/js/data.js"></script>
<script src="/js/shell.js"></script>
<script src="/js/<page>.js"></script>
```

Layout slots (filled by `shell.js`):
- `<div id="topnav-slot"></div>` — global nav
- `<div id="sidebar-slot"></div>` — owner sidebar (only on dashboard / pets / pet-detail / symptom-checker / appointments / appointments-new / lost-pets)
- `<div id="footer-slot"></div>` — global footer

## Design tokens

- Primary green `hsl(160 47% 45%)`, secondary cream `hsl(40 40% 92%)`, destructive red `hsl(0 70% 60%)`.
- Border radius scale `0.5rem` → `1.5rem`.
- All defined as CSS custom properties on `:root` in `css/styles.css`.

## Workflow

`artifacts/petcare: web` runs `pnpm --filter @workspace/petcare run dev` → `vite --config vite.config.ts --host 0.0.0.0` on `PORT` (artifact port 20603, mounted at `/`).
