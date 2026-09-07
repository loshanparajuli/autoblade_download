/**
 * Testimonials and the "trusted by" strip.
 *
 * BOTH ARRAYS ARE EMPTY, AND THAT IS DELIBERATE. The components that read them
 * render nothing at all while they are empty, so the page simply does not have
 * these sections yet. Fill them in and the sections appear.
 *
 * Why they ship empty rather than filled with something plausible:
 *
 *   A quote attributed to a person who did not say it, or a logo implying a
 *   company uses a product it has never run, is a fabricated claim on a page
 *   that takes payment. It is the same class of thing as the `aggregateRating`
 *   this codebase already refuses to invent. Placeholder names have a habit of
 *   surviving to production, and "we'll swap them before launch" is exactly how
 *   fake testimonials end up live.
 *
 * So: no seed data, no lorem, no "Podcast Host, Acme Media". Real names only.
 *
 * How to fill TESTIMONIALS:
 *   Email your five most active beta testers. Ask for one sentence about what
 *   autoBlade replaced and how long it used to take. Get explicit permission to
 *   use their name and show name on the site. Ask for a photo; skip `avatar` if
 *   they would rather not, the card handles it.
 *
 * How to fill TRUSTED_BY:
 *   Only shows or companies that genuinely run autoBlade, and only with their
 *   permission. A podcast's name is its brand — using it as an endorsement it
 *   did not give is the thing that gets a launch written about badly. Three
 *   real names beat twelve borrowed ones.
 */

export type Testimonial = {
  /** Real name of a real person who agreed to appear here. */
  name: string;
  /** Their show, company or role — whatever makes them credible. */
  role: string;
  /** One or two sentences, in their words. Do not tidy their voice away. */
  quote: string;
  /** Path under /public. Omit and the card falls back to their initials. */
  avatar?: string;
};

export const TESTIMONIALS: Testimonial[] = [];

/** Names of shows or companies that actually use autoBlade, with permission. */
export const TRUSTED_BY: string[] = [];
