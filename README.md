# Don Bolante’s portfolio

A responsive Blueprint-style portfolio built with React, TypeScript, Vite, and plain CSS. It includes project filters, keyboard-accessible case studies, a scrubbable career timeline with playback, and email copying. The availability badge is hidden by default.

Section links scroll smoothly and animate the destination; case-study changes and project filters use short entrance transitions. The site disables these animations and uses immediate scrolling when visitors prefer reduced motion.

## Run and build

Requires Node.js 22.12+.

```sh
npm install
npm run dev
npm run build
npm run preview
```

The production build is in `dist/`. Assets use relative URLs, so the same build works at a domain root or a GitHub Pages repository path.

## Edit content

All portfolio content lives in `src/data.ts`:

- `profile`: contact information, headline, biography, buttons, and the specification sheet.
- `AVAILABLE`: set to `true` to show the freelance availability badge.
- `navigation` and `services`: section headings and service descriptions.
- `projects`: case-study content, studio, categories, awards, and technology chips. `years` is optional when dates are unavailable. `url` adds a visit link to the case study. The Personal projects filter includes Rival.ph and Room Riot under olisab studio; KiX Dream Soccer appears under KiX Games.
- `career`: timeline roles; dates use `YYYY-MM`, and `end: null` means current. End months are inclusive. Lanes are 0–2.
- `timeline`: chart range, initial cursor, date labels, and controls. Current month is calculated in Manila’s UTC+8 time zone.
- `skillGroups` and `ui`: toolchain and interface labels.
- `metadata`: page title, descriptions, production URL, and social preview image. The build derives meta tags and structured data from this file.

Design tokens and responsive styles live in `src/styles.css`. The supplied `Portfolio.dc.html` reference was not included in the attachment; this build follows the written Blueprint brief.

## Project images and fonts

Put a JPEG at `public/work/<slug>.jpg`, matching the project slug in `data.ts` (for example, `public/work/viewfinder.jpg`). Use a 16:10 image, ideally 800 × 500 or larger, optimized for the web. Missing images display a striped title placeholder. `withheld: true` intentionally displays that placeholder without requesting artwork. Slot game imagery remains withheld under NDA.

Projects with `image: null` intentionally show the title placeholder without requesting a missing file. After adding `kix-dream-soccer.jpg`, remove `image: null` from that project to use the normal slug-based image path. Rival.ph and Room Riot use their published PNG artwork. You can set `image` to a different path relative to `public/`.

The included artwork comes from the games’ official Steam listings and the personal projects’ published social images. Source URLs are recorded in `public/work/sources.json`; the artwork belongs to its respective rights holders. IBM Plex fonts are self-hosted from Google Fonts, with their license at `public/fonts/OFL.txt`. To refresh the Steam artwork and fonts, run `node scripts/fetch-assets.mjs` with internet access.

`public/favicon.svg` is the site favicon. `public/og-image.svg` is the editable social image placeholder; `public/og-image.png` is its exported social preview. Vercel builds use its production domain automatically for the canonical URL, social metadata, and structured data. For other hosts, set the final production URL in `metadata.url` in `data.ts`, or set the `VITE_SITE_URL` build environment variable. `VITE_SITE_URL` also overrides Vercel’s automatic domain.

## Validation

Start the production preview on port 4173, then run:

```sh
npm run test:e2e
npm run audit
```

Tests use Microsoft Edge by default. Set `BROWSER_CHANNEL=chrome` to use an installed Chrome. The browser checks cover 360, 768, 1024 and 1440px, axe accessibility checks, filters, case studies, pointer and keyboard timeline controls, playback, reduced motion, clipboard feedback, and missing-image fallbacks. Lighthouse reports and screenshots are saved to the ignored `.artifacts/` folder. `TEST_URL` can override the local preview URL.

## Deploy

**Vercel:** import the repository or run `vercel link` followed by `vercel --prod` from this directory. `vercel.json` selects Vite, runs `npm ci` and `npm run build`, and serves `dist/`. Vercel supplies its production domain during the build; you can set `VITE_SITE_URL` to use a preferred custom domain. `.vercelignore` excludes local QA reports and Sites metadata from uploads.

**Netlify:** import the repository; build command `npm run build`, publish directory `dist`. A `netlify.toml` is included.

**GitHub Pages:** push this project to GitHub, select **GitHub Actions** as the Pages source, then run the included Pages workflow. Pushes to `main` automatically build and deploy `dist/`. The workflow passes GitHub Pages’ actual base URL to the build so canonical links, social images, and structured data point to the public site, including its repository path. The Sites preview keeps its existing private access.

