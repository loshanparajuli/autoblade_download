import type { MetadataRoute } from "next";

import { SITE_URL } from "./siteConfig";

/**
 * Real content dates, not build dates. Using `new Date()` here would claim
 * every page changed on every deploy, which crawlers learn to distrust, so bump
 * this by hand when the page's content actually changes.
 */
const LAST_MODIFIED = {
  home: new Date("2026-08-30"),
  pricing: new Date("2026-09-03"),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: LAST_MODIFIED.pricing,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
