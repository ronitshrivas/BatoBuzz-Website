# BatoBuzz Technology - company website

The official website for **BatoBuzz Technology**, a full-stack product studio
in Inaruwa, Nepal. Software, web and mobile apps, networking, digital
marketing and complete IT solutions.

Built with **Next.js 16 (App Router)**, React and plain CSS. Content is
dynamic and managed from a built-in admin panel backed by **Firebase**
(Firestore + Authentication). The site is a fully static export, so it hosts
anywhere.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The admin panel is at http://localhost:3000/admin.

## Build

```bash
npm run build
```

With `output: "export"` in `next.config.mjs`, the build writes a static site
to `out/`. Serve it with any static host (`npx serve out`) or deploy the
folder directly.

## Firebase (dynamic content + admin)

The site runs on built-in default content out of the box. To edit content from
`/admin`, connect Firebase by following **FIREBASE_SETUP.md**. In short:

1. Create a Firebase project and a Web App, put its config in `.env.local`.
2. Enable Firestore and publish the rules in `firestore.rules`.
3. Enable Email/Password auth and create your admin user.
4. Sign in at `/admin`, click "Load defaults", then "Save & publish".

## Editing content

Everything is editable in `/admin`:

- **Hero, About, Credibility, Services** - headlines and cards.
- **Products** - myBaato and myBaato Merchant, each with Google Play and App
  Store links and a "live" toggle per store.
- **Projects** - the featured work, by category.
- **Tech Stack** - groups of technologies with logo URLs.
- **Process, Team (with hierarchy), Gallery, Quote, Stats, FAQ, Contact.**
- **Success Stories** - editable case results.
- **Careers** - open positions with an Apply form (name, email, CV upload), or
  a "send your CV" option when there are no openings.
- **Contact** - multiple phone numbers and a map (Mapbox, or OpenStreetMap
  without a token).

Form submissions (Schedule a call, job applications) are saved to Firebase and
read in the admin **Submissions** tab. The header has a hover mega-menu and a
"Schedule a call" button that opens a lead form.

Default content lives in `lib/defaults.js`. The "Load defaults" button in the
admin copies it into the editor so you can seed or reset.

## Structure

```
app/
  layout.js        Fonts, metadata, ContentProvider, header/footer
  page.js          Home - all sections in order
  admin/           The CMS (login + section editors)
  globals.css      Design tokens + all styles
components/         One file per section, each reads live content
lib/
  firebase.js      Firebase init from NEXT_PUBLIC_FIREBASE_* env
  defaults.js      Default/seed content for every section
  store.js         Firestore read/write + auth helpers
  useContent.js    ContentProvider + useContent() hook
```

## Deploy

Push to GitHub and import at https://vercel.com/new (Next.js is auto-detected).
Add the `NEXT_PUBLIC_FIREBASE_*` variables in the Vercel project settings.
The static `out/` folder also works on Netlify, Firebase Hosting, Cloudflare
Pages or any static host.
