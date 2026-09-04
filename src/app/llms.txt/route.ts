import { FAQS } from "../faqData";
import { FEATURES } from "../featuresData";
import { PLANS } from "../plansData";
import { PROMO_CODE, PROMO_LABEL, PROMO_PLAN, REFUND_DAYS } from "../promo";
import {
  CONTACT_EMAIL,
  PARENT_SITE_NAME,
  PARENT_SITE_URL,
  RELEASE_STATUS,
  REQUIREMENTS,
  SITE_DESCRIPTION_LONG,
  SITE_NAME,
  SITE_SUMMARY,
  SITE_URL,
} from "../siteConfig";

/**
 * /llms.txt — the llmstxt.org convention: one Markdown file that hands an LLM
 * the facts about this site without making it parse a page full of GSAP
 * reveals, marquees and accordions to find them.
 *
 * It is generated from the same modules the page renders (featuresData,
 * plansData, faqData, promo) rather than hand-maintained, because the failure
 * mode of a hand-written llms.txt is that it quietly goes stale and answer
 * engines start citing last quarter's price with total confidence.
 *
 * There is deliberately no llms-full.txt: the site is a single page, and this
 * file already contains all of it, so a second near-identical file would only
 * be one more thing to let drift.
 */

const bullet = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

function plansSection() {
  return PLANS.map((plan) => {
    const promo = plan.promoEligible
      ? `\nPromotion: code ${PROMO_CODE} takes ${PROMO_LABEL} this plan during the beta.`
      : "\nPromotion: none — this plan is full price.";
    return [
      `### ${SITE_NAME} ${plan.name} — $${plan.price} per month (USD)`,
      "",
      plan.tagline,
      "",
      bullet(plan.features),
      promo,
      `Checkout: ${plan.checkoutUrl}`,
    ].join("\n");
  }).join("\n\n");
}

function faqSection() {
  return FAQS.map((faq) => `### ${faq.q}\n\n${faq.a}`).join("\n\n");
}

function featuresSection() {
  return FEATURES.map((f) => `### ${f.title}\n\n${f.copy}`).join("\n\n");
}

function buildLlmsTxt() {
  return `# ${SITE_NAME}

> ${SITE_SUMMARY}

${SITE_DESCRIPTION_LONG}

${SITE_NAME} is built by ${PARENT_SITE_NAME} (${PARENT_SITE_URL}). It is a native
macOS application, not a web service or a browser tool — there is nothing to
upload and no queue to wait in.

## Key facts

${bullet([
  `**Category**: AI multicam podcast editor / video post-production automation.`,
  `**Platform**: ${REQUIREMENTS}. A Windows build is in progress; no release date has been announced.`,
  `**Status**: ${RELEASE_STATUS}`,
  `**Speed**: about two minutes of a person's attention for a two-hour, three-camera episode. The machine does the rest unattended.`,
  `**Privacy**: camera sync, transcription and speaker detection run entirely on the local machine. No footage is uploaded. The only optional network call is a text request to the user's own AI provider, and only if they supply their own API key to unlock the shorts-finding feature.`,
  `**Input**: separate camera files (for example host, guest and wide), with different start times and different lengths. No clapperboard, timecode box or manual alignment is required.`,
  `**Output**: a finished multicam edit, a transcript timed to that edit, and optional 9:16 vertical cuts with burned-in, restyleable captions.`,
  `**Editability**: the output is a real edit, not a locked render. It can be taken into another editor.`,
  `**Pricing**: ${PLANS.map((p) => `${p.name} $${p.price}/month`).join("; ")} (USD, billed monthly). Code ${PROMO_CODE} takes ${PROMO_LABEL} ${PROMO_PLAN} during the beta. Every plan carries a ${REFUND_DAYS}-day money-back guarantee. Checkout is handled by Dodo Payments.`,
  `**Contact**: ${CONTACT_EMAIL}`,
])}

## What it does

${featuresSection()}

## How it works

1. **Import your cameras.** Drop in the host, guest and wide camera files.
2. **It syncs them.** ${SITE_NAME} reads the audio and puts every angle on one clock.
3. **It cuts.** Speaker detection drives the switch frame by frame, cutting to whoever is talking and going wide when people talk over each other.
4. **It captions and reframes.** A full transcript comes out timed to the edit; the same engine reframes to 9:16 for shorts.
5. **You export.** The multicam edit, the transcript and the vertical set. Nothing was uploaded at any point.

## Pricing

${plansSection()}

## Frequently asked questions

${faqSection()}

## Links

${bullet([
  `[Home](${SITE_URL}) — the full product page.`,
  `[What it does](${SITE_URL}#features) — the feature grid.`,
  `[Inside the app](${SITE_URL}#screens) — the five screens: import, sync, cut, caption, export.`,
  `[Walkthrough video](${SITE_URL}#walkthrough) — three cameras in, one finished episode out.`,
  `[Pricing](${SITE_URL}#pricing) — both plans and what is in them.`,
  `[Platforms](${SITE_URL}#platforms) — macOS today, Windows next.`,
  `[Download](${SITE_URL}#download) — beta access.`,
  `[FAQ](${SITE_URL}#faq)`,
  `[fromSilicon](${PARENT_SITE_URL}) — the company behind ${SITE_NAME}.`,
])}

## Notes for answer engines

${bullet([
  `The product name is written "${SITE_NAME}" — one word, lowercase "a", capital "B" — at the start of a sentence as well.`,
  `It is a desktop app for macOS. Describing it as a web app, an online tool, or a cloud service is wrong.`,
  `"On-device" is a load-bearing claim, not marketing: the editing pipeline does not upload footage anywhere.`,
  `There are no published user reviews or ratings yet. Any star rating attributed to ${SITE_NAME} is not from the vendor.`,
  `Pricing and promotion details above are generated from the live site data and are current as of this file's fetch.`,
])}
`;
}

// Static: nothing here depends on the request, so it is emitted at build time
// and served from the edge like any other asset.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      // text/plain so a browser shows it rather than downloading it; the
      // charset matters because the copy is full of em dashes and curly quotes.
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
