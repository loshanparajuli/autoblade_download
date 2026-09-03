import type { Metadata } from "next";
import { AutobladeBetaBanner, AutobladeHeader } from "./AutobladeChrome";
import { PARENT_SITE_URL, SITE_DESCRIPTION, SITE_URL } from "./siteConfig";
import { AutobladeAnimations } from "./AutobladeAnimations";
import { AutobladeDownload } from "./AutobladeDownload";
import { AutobladeCarousel } from "./AutobladeCarousel";
import { AutobladeLinkedInPost } from "./AutobladeLinkedInPost";
import { AutobladeFaq } from "./AutobladeFaq";
import { FAQS } from "./faqData";
import { AutobladePlanCards } from "./AutobladePlans";
import { PLANS } from "./plansData";
import { PROMO_CODE, PROMO_LABEL, PROMO_PLAN, REFUND_DAYS } from "./promo";
import {
  AutobladeFeatures,
  AutobladeGuarantee,
  AutobladeMarquee,
  AutobladeOffer,
  AutobladePlatforms,
} from "./AutobladeSections";

export const metadata: Metadata = {
  // Absolute so the root layout's `%s | autoBlade` template doesn't append.
  title: { absolute: "autoBlade | 2 minute for 2hr podcast" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "autoBlade | 2 minute for 2hr podcast",
    description:
      "An AI-powered multicam podcast app for Mac. It syncs your cameras, transcribes every word, and cuts to whoever is talking.",
  },
};

/* ---------------- hero ---------------- */

const HERO_STATS = [
  { value: "~2 min", label: "to edit a 2-hour episode" },
  { value: "3+ cameras", label: "synced from audio alone" },
  { value: "0 bytes", label: "uploaded off your Mac" },
];

function AutobladeHero() {
  return (
    <section className="hero-section ab-hero">
      {/* Purely decorative gradient wash. Sits behind the type, never over it. */}
      <div className="ab-aurora" aria-hidden="true">
        <span className="ab-aurora-a" />
        <span className="ab-aurora-b" />
        <span className="ab-aurora-c" />
      </div>

      <div className="hero-rule">
        <span />
        <p>An AI podcast app for Mac</p>
        <span />
      </div>

      <div className="hero-title-block">
        <p className="ab-hero-flag">
          <span className="ab-hero-flag-dot" aria-hidden="true" />
          Beta is open · code <strong>{PROMO_CODE}</strong> takes {PROMO_LABEL}{" "}
          {PROMO_PLAN}
        </p>

        <h1 className="ab-title">
          the edit that
          <br />
          <em>cuts itself.</em>
        </h1>

        <p className="ab-lede">
          Drop in your host, guest, and wide cameras. autoBlade syncs them,
          transcribes every word, and cuts to whoever&apos;s talking &mdash;
          powered by an on-device AI engine. A two-hour episode, done in about
          two minutes.
        </p>

        <div className="ab-hero-ctas">
          <a className="dark-cta ab-hero-cta" href="#download">
            Download for Mac
          </a>
          <a className="ab-ghost-cta" href="#features">
            See how it works
          </a>
        </div>

        <dl className="ab-hero-stats">
          {HERO_STATS.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- screens ---------------- */

function AutobladeScreens() {
  return (
    <section className="ab-screens" id="screens">
      <div className="section-heading">
        <p>Inside the app</p>
        <h2>Five screens, one night saved</h2>
      </div>
      <p className="ab-section-lede">
        Import, sync, cut, caption, export. That is the whole app &mdash; there
        is no sixth screen where the real work is hiding.
      </p>
      <AutobladeCarousel />
    </section>
  );
}

/* ---------------- walkthrough embed ---------------- */

// youtube-nocookie keeps the embed from setting tracking cookies before
// anyone presses play.
const DEMO_VIDEO_ID = "sAT4jcrmhXE";

const DEMO_VIDEO_SRC =
  `https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${DEMO_VIDEO_ID}` +
  "&controls=1&rel=0&playsinline=1&modestbranding=1";

function AutobladeDemo() {
  return (
    <section className="ab-demo" aria-label="autoBlade walkthrough">
      <div className="section-heading">
        <p>Watch it run</p>
        <h2>The walkthrough</h2>
      </div>
      <p className="ab-section-lede">
        Three cameras in, one finished episode out. The whole thing, start to
        finish, with nothing sped up that matters.
      </p>
      <div className="ab-demo-frame">
        <iframe
          className="ab-demo-embed"
          src={DEMO_VIDEO_SRC}
          title="autoBlade walkthrough video"
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}

/* ---------------- story ---------------- */

function AutobladeStory() {
  return (
    <section className="ab-story" id="story">
      <div className="section-heading">
        <p>The origin</p>
        <h2>How it started</h2>
      </div>
      {/* The prose used to retell the post word for word. The post says it
          better and it is the primary source, so it carries the section alone. */}
      <AutobladeLinkedInPost />
    </section>
  );
}

/* ---------------- faq ---------------- */

function AutobladeFaqSection() {
  return (
    <section className="ab-faq" id="faq">
      {/* "Before you download" no longer fits — the download block sits above
          this now, and the FAQ closes the page. */}
      <div className="section-heading">
        <p>Questions</p>
        <h2>Good to know</h2>
      </div>
      <AutobladeFaq />
      <p className="ab-faq-foot">
        Still unsure about something?{" "}
        <a href="mailto:losh@fromsilicon.com">Email me directly</a>{" "}
        &mdash; it
        reaches the person who wrote the app.
      </p>
    </section>
  );
}

/* ---------------- pricing ---------------- */

/** The only pricing on the site — there is no separate /pricing route, so the
    nav's Pricing link scrolls here. */
function AutobladePricingBlock() {
  return (
    <section className="ab-pricing ab-pricing-inline" id="pricing">
      <div className="section-heading">
        <p>USD · billed monthly</p>
        <h2>What it costs</h2>
      </div>
      <p className="ab-section-lede">
        Two plans, no seat maths, no per-export fees. {PROMO_PLAN} is{" "}
        {PROMO_LABEL} during the beta with code <strong>{PROMO_CODE}</strong>{" "}
        &mdash; Pro AI is full price.
      </p>
      <AutobladePlanCards />
      <p className="ab-pricing-note">
        Checkout is handled securely by Dodo Payments.
      </p>
    </section>
  );
}

/* ---------------- download ---------------- */

function AutobladeGet() {
  return (
    <section className="ab-get" id="download">
      <div className="section-heading">
        <p>Apple silicon · macOS · free in beta</p>
        <h2>Download autoBlade</h2>
      </div>
      <div className="ab-get-inner">
        <p className="ab-get-copy">
          autoBlade is currently in beta. Enter your email for early access
          &mdash; the full app launches fall 2026. {PROMO_PLAN} is{" "}
          {PROMO_LABEL} with code <strong>{PROMO_CODE}</strong>, and every plan
          carries a {REFUND_DAYS}-day money-back guarantee.
        </p>
        <AutobladeDownload />
      </div>
    </section>
  );
}

/* ---------------- structured data ---------------- */

// Describes autoBlade as a product so answer engines can cite concrete facts
// (platform, requirements, what it does) rather than paraphrasing the hero.
// `offers` used to live on /pricing; with that route gone it moves here, so
// the prices stay in the structured data. No `aggregateRating` — there are no
// reviews yet, and inventing one would be a fabricated claim.
const autobladeJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "autoBlade",
  url: SITE_URL,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "Podcast post-production automation",
  operatingSystem: "macOS, Apple silicon (M1 or later)",
  description:
    "An AI-powered multicam podcast app for Mac. It syncs your cameras, transcribes every word, and cuts to whoever is talking, entirely on-device.",
  featureList: [
    "Automatic multicam sync across host, guest and wide cameras",
    "On-device transcription of every word",
    "Automatic cutting to whoever is speaking",
    "9:16 vertical reframing with burned-in captions",
    "Blunder detection and highlight sequences on Pro AI",
    "No manual setup or alignment required",
    "Runs entirely on your own machine",
  ],
  publisher: { "@id": `${PARENT_SITE_URL}/#organization` },
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: `autoBlade ${plan.name}`,
    price: plan.price,
    priceCurrency: "USD",
    category: "SubscriptionOffer",
    url: plan.checkoutUrl,
    availability: "https://schema.org/InStock",
  })),
};

// Mirrors the visible accordion one-for-one — same questions, same answers.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function AutobladePage() {
  return (
    <main className="ab-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autobladeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AutobladeAnimations />
      <AutobladeBetaBanner />
      <div className="ab-canvas">
        <AutobladeHeader />
        <AutobladeHero />
        <AutobladeMarquee />
        <AutobladeScreens />
        <AutobladeFeatures />
        <AutobladeGet />
        <AutobladeDemo />
        <AutobladeOffer />
        <AutobladePricingBlock />
        <AutobladePlatforms />
        <AutobladeStory />
        <AutobladeGuarantee />
        <AutobladeFaqSection />
      </div>
    </main>
  );
}
