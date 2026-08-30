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

## What changed vs. the fromSilicon.com copy

- `/autoblade` → `/`. The header brand link and 404 CTA point at `/`.
- `/api/download/autoblade` → `/api/download`. The whole app is autoBlade now,
  so the extra segment was redundant.
- `siteConfig` defaults to `https://autoblade.fromsilicon.com`, with the
  fromSilicon URL/name kept as `PARENT_SITE_URL` / `PARENT_SITE_NAME`.
- The footer wordmark is a real link to fromsilicon.com — there's no shared nav
  to get back through on this domain.
- Metadata is autoBlade's own: title, description, keywords, OG image, favicons
  from the app mark, and a sitemap with a single URL.
- `globals.css` carries only the primitives this page uses. The home page's
  works grid, carousel, tabs and hero computer were left behind.
- `@calcom/embed-react` dropped — only the home page's booking widget used it.

The Organization/Person schema `@id`s still point at `fromsilicon.com` on
purpose, so both domains describe one company rather than two.

## Env

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://autoblade.fromsilicon.com` | Canonical origin for metadata, sitemap, robots. |
| `GITHUB_TOKEN` | — | Optional. Raises the GitHub API rate limit for `/api/download`. Without it the route falls back to the unauthenticated `/releases/latest` redirect. |

## Deploying

Point the host at this directory and set `NEXT_PUBLIC_SITE_URL` to the real
origin. `/api/download` needs a Node runtime (it fetches GitHub at request
time), so a static export won't work.

Once this is live, consider a redirect on the main site:
`fromsilicon.com/autoblade` → `https://autoblade.fromsilicon.com` so the old URL
doesn't compete with the new one in search.
