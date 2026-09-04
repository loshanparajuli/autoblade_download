import type { MetadataRoute } from "next";

import { SITE_URL } from "./siteConfig";

/**
 * Real content dates, not build dates. Using `new Date()` here would claim
 * every page changed on every deploy, which crawlers learn to distrust, so bump
 * this by hand when the page's content actually changes.
 */
const LAST_MODIFIED = {
  home: new Date("2026-09-04"),
} as const;

/** One page. Pricing used to be its own route; it's now a section of the home
    page, so there is nothing else to list. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED.home,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
