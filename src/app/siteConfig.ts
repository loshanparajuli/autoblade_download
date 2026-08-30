/**
 * Central place for site-wide constants used by metadata routes
 * (robots.ts, sitemap.ts, manifest.ts) and the root layout.
 *
 * Override the production URL at build time with NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://autoblade.fromsilicon.com"
).replace(/\/$/, "");

export const SITE_NAME = "autoBlade";

export const SITE_TAGLINE = "2 minute for 2hr podcast";

export const SITE_DESCRIPTION =
  "autoBlade is an AI-powered multicam podcast app for Mac. Drop in your cameras and it syncs them, transcribes every word, and cuts to whoever is talking, all on your own machine.";

/**
 * autoBlade is built by fromSilicon, which lives on its own domain. Schema.org
 * @ids stay anchored there so both sites describe the *same* Organization
 * rather than two competing ones.
 */
export const PARENT_SITE_URL = "https://fromsilicon.com";

export const PARENT_SITE_NAME = "fromSilicon";
