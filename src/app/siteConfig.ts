/**
 * Central place for site-wide constants used by metadata routes
 * (robots.ts, sitemap.ts, manifest.ts, llms.txt) and the root layout.
 *
 * Override the production URL at build time with NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://autoblade.fromsilicon.com"
).replace(/\/$/, "");

export const SITE_NAME = "autoBlade";

/** The brand line. Kept for on-page and app-shell use (PWA name, banners). */
export const SITE_TAGLINE = "2 minute for 2hr podcast";

/**
 * The <title>. Deliberately *not* the brand tagline: a title tag is the
 * strongest on-page ranking signal and the first line of a SERP, so it leads
 * with the brand and then the words people actually search — "multicam
 * podcast editor", "Mac". The tagline still carries the voice on the page.
 * Kept under ~60 chars so Google doesn't truncate it.
 */
export const SITE_TITLE = "autoBlade — AI Multicam Podcast Editor for Mac";

/**
 * The meta description. Not a ranking factor, but it is the snippet that wins
 * or loses the click, so it states the mechanism (sync, transcribe, cut) and
 * the one number that makes people stop. Held to ~155 characters, the point
 * where Google starts truncating.
 */
export const SITE_DESCRIPTION =
  "autoBlade syncs your multicam podcast footage, transcribes every word, and cuts to whoever is talking — on-device on your Mac. A 2-hour episode in ~2 minutes.";

/**
 * The longer prose version, for surfaces with room: OG/social cards, the PWA
 * manifest, schema.org descriptions, llms.txt. Same claims, more air.
 */
export const SITE_DESCRIPTION_LONG =
  "autoBlade is an AI-powered multicam podcast app for Mac. Drop in your host, guest and wide cameras and it syncs them from audio alone, transcribes every word, and cuts to whoever is talking — entirely on your own machine, with no upload and no render queue.";

/** One-line answer to "what is this?", written to be quotable verbatim by an
    answer engine. */
export const SITE_SUMMARY =
  "autoBlade is a macOS app that automatically edits multicam podcasts: it syncs the camera angles from their audio, transcribes the session, and cuts to whichever person is speaking — all on-device on Apple silicon.";

/** Hard requirements, stated once so no surface can contradict another. */
export const REQUIREMENTS = "macOS on Apple silicon (M1 or later)";

/** Where the product is in its lifecycle. Bump when 1.0 ships. */
export const RELEASE_STATUS = "Public beta; version 1.0 is due fall 2026.";

/**
 * autoBlade is built by fromSilicon, which lives on its own domain. Schema.org
 * @ids stay anchored there so both sites describe the *same* Organization
 * rather than two competing ones.
 */
export const PARENT_SITE_URL = "https://fromsilicon.com";

export const PARENT_SITE_NAME = "fromSilicon";

export const CONTACT_EMAIL = "losh@fromsilicon.com";
