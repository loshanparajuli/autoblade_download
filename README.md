# autoBlade — autoblade.fromsilicon.com

Standalone Next.js app for the autoBlade product site. Split out of
`fromSilicon.com` (where it lived at `/autoblade`) so it can be hosted on its
own domain. The original page is still in that repo and was **not** removed.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Layout

```
src/app/
  page.tsx                 the landing page (was fromSilicon.com/autoblade)
  layout.tsx               fonts, metadata, Organization/WebSite JSON-LD
  globals.css              shared fromSilicon primitives + the .ab-* system
  siteConfig.ts            SITE_URL / names — the one place to change domains
  SiteFooter.tsx           fromSilicon brand block; wordmark links home
  AutobladeAnimations.tsx  GSAP ScrollTrigger reveals (client)
  AutobladeDownload.tsx    email capture → Formspree → .dmg (client)
  api/download/route.ts    302s to the latest .dmg on GitHub Releases
  robots.ts sitemap.ts manifest.ts opengraph-image.tsx twitter-image.tsx
  not-found.tsx
public/
  autoblade.png            the mark, also the source for public/icons/*
  autoblade-wizard.html    self-contained interactive walkthrough (iframed)
  figma/                   the three footer icons
  icons/                   favicons + PWA icons generated from autoblade.png
```

