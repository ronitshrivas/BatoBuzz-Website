# BatoBuzz Software — company website

A single-page company website for **BatoBuzz Software** (operating under
*Batobaj Technology*), a full-stack development studio in Tulsipur, Lumbini,
Nepal.

Built with **Next.js 14 (App Router)**, React 18, and plain CSS — no CSS
framework, no backend. The site is fully static-exportable.

---

## Run locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Build

```bash
npm run build
```

Because `next.config.mjs` sets `output: "export"`, the build also writes a
fully static site to the **`out/`** folder. You can serve it with any static
host (`npx serve out`) or upload `out/` directly.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to <https://vercel.com/new> and import the repo.
3. Vercel auto-detects Next.js — no configuration needed. Click **Deploy**.

To deploy from the CLI instead:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

> The static `out/` folder also deploys to Netlify, Firebase Hosting,
> Cloudflare Pages, GitHub Pages, or any static host.

---

## Project structure

```
app/
  layout.js      Fonts, metadata, and the no-flash theme script
  globals.css    All design tokens + component styles (edit to re-skin)
  page.js        Composes every section in order
components/
  Icon.js        Shared inline-SVG icon set
  Header.js      Sticky nav, theme toggle, mobile menu
  Hero.js        Headline + terminal card
  Stats.js       Stats band
  Clients.js     Sectors we build for
  Work.js        Services
  Featured.js    BatoBuzz flagship + UI mockup
  Products.js    Our own products
  CaseStudies.js Three detailed case studies
  Projects.js    Numbered project list
  Stack.js       Technologies by layer
  Process.js     How we work
  Contact.js     Contact card (copy-email button)
  Footer.js      Footer
```

## Where to edit things

- **Content** — each section's data lives in a plain array at the top of its
  component file in `components/`. For example, edit `Products.js` to change
  the product cards, or `Stack.js` to add a technology chip. No need to touch
  the markup below the array.
- **Colors / theme** — all colors are CSS custom properties (tokens) defined at
  the top of `app/globals.css`, with separate light, dark, and "ink" (navy
  band) sets. Change a token once and it updates everywhere.
- **Fonts** — configured in `app/layout.js` via `next/font/google`
  (Bricolage Grotesque, Hanken Grotesk, JetBrains Mono).
- **Navigation links** — the `NAV` array at the top of `components/Header.js`.

## Placeholders to replace

A few values are stand-ins — search for these and swap in the real ones:

- **Email** — `hello@batobaj.tech` in `components/Contact.js` (marked as a
  placeholder).
- **Stat numbers** — the `STATS` array in `components/Stats.js` (marked with a
  `NOTE` comment).
- **Logo / screenshots** — the header/footer "B" mark is a CSS-rendered letter,
  and the hero terminal and featured mockup are stylised CSS, not real
  screenshots. Replace them with real assets when you have them.

## Theme

A light/dark toggle sits in the header. The choice is saved to
`localStorage` under the key `bb-theme` and applied before first paint by a
small inline script in `app/layout.js`, so there is no flash. When no choice
has been made, the site follows the operating-system `prefers-color-scheme`.

## Notes

- `next` is pinned to a patched `14.2.35`.
- The site respects `prefers-reduced-motion` and has visible keyboard focus
  states.
- Responsive down to ~400px; grids collapse to one column and the nav becomes a
  hamburger menu on small screens.

---

## Design update (BizzClan-inspired restyle)

The site now uses a **blue** accent palette, a centered **photo-overlay hero**,
**curved section dividers**, **scroll-reveal animations**, **animated stat
counters**, an **FAQ accordion**, and a **floating "Start a project" button** —
while keeping the BatoBuzz logo and honest content (no invented testimonials or
metrics).

### Hero background image (optional)
The hero shows a dark gradient over an optional photo. To use your own image:
1. Drop a file at `public/hero.jpg` (a wide team/office/tech shot works well).
2. In `app/globals.css`, in the `:root` block, add:
   ```css
   --hero-image: url("/hero.jpg");
   ```
The dark overlay keeps the headline readable over any image. With no image set,
the hero falls back to the navy + blue-glow gradient (what you see by default).

### New / changed files
- `components/Hero.js` — centered hero, overlay background, scroll indicator.
- `components/Wave.js` — the curved SVG divider (reused between sections).
- `components/ScrollFX.js` — scroll-reveal + stat count-up (progressive
  enhancement; respects reduced-motion).
- `components/FloatingCta.js` — the floating contact button.
- `components/Faq.js` — the FAQ accordion (edit the `FAQS` array to change Q&As).

### Changing the accent color
All blue values are CSS tokens at the top of `app/globals.css`
(`--accent`, `--accent-soft`, `--accent-ink`, `--grad`, `--glow-red`). Change
them once to re-skin the whole site — e.g. back to the original red
(`--accent: #eb1700`) if you prefer the logo's warm tone to lead.

---

## Pages

The site is now multi-page (Next.js App Router). Each route is a folder under `app/`:

| Route        | File                   | Notes |
|--------------|------------------------|-------|
| `/`          | `app/page.js`          | Home — all the main sections + contact. |
| `/about`     | `app/about/page.js`    | Studio story, values, stats, process. |
| `/team`      | `app/team/page.js`     | In-house disciplines + ways of working. |
| `/projects`  | `app/projects/page.js` | Full project grid + detailed case studies. |
| `/career`    | `app/career/page.js`   | Why join + open roles. |
| `/blog`      | `app/blog/page.js`     | Post listing. |

The header, footer, floating button, and scroll effects live in `app/layout.js`,
so they appear on every page automatically. Navigation links are the `NAV` array
in `components/Header.js`; footer links are in `components/Footer.js`.

### Placeholder content to replace
These pages are scaffolded with editable data arrays — swap in your real content:

- **Team** (`app/team/page.js`): shows disciplines, not named people, so nothing is
  invented. To list real team members, fill the `MEMBERS` array (a comment shows the
  shape) and render a grid.
- **Career** (`app/career/page.js`): the `ROLES` array is empty, so the page shows an
  "open application" state. Add role objects to list real openings.
- **Blog** (`app/blog/page.js`): the `POSTS` array holds three starter posts marked
  "Coming soon". Replace them with real posts and point each `href` at the real URL.
  (There are no post detail pages yet — add `app/blog/[slug]/page.js` when you want them.)
