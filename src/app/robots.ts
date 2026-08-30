import type { MetadataRoute } from "next";

import { SITE_URL } from "./siteConfig";

/**
 * Answer/generative engines. Being cited by ChatGPT, Claude, Perplexity and
 * Gemini means letting their crawlers in — several of these (Google-Extended,
 * Applebot-Extended) are opt-out-only, so listing them is a deliberate,
 * self-documenting "yes" rather than a silent default.
 */
const ANSWER_ENGINE_BOTS = [
  "OAI-SearchBot", // ChatGPT search citations
  "ChatGPT-User", // user-triggered fetches from ChatGPT
  "GPTBot", // OpenAI crawler
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini grounding
  "Applebot-Extended",
  "DuckAssistBot",
  "meta-externalagent",
  "CCBot", // Common Crawl — feeds many downstream models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Route handlers return JSON and have no standalone value in an index.
        disallow: ["/api/"],
      },
      {
        userAgent: ANSWER_ENGINE_BOTS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
