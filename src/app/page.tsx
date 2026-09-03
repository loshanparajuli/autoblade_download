import type { Metadata } from "next";
import { SiteFooter } from "./SiteFooter";
import { AutobladeBetaBanner, AutobladeHeader } from "./AutobladeChrome";
import { PARENT_SITE_URL, SITE_DESCRIPTION, SITE_URL } from "./siteConfig";
import { AutobladeAnimations } from "./AutobladeAnimations";
import { AutobladeDownload } from "./AutobladeDownload";
import { AutobladeCarousel } from "./AutobladeCarousel";
import { AutobladeFaq } from "./AutobladeFaq";
import { FAQS } from "./faqData";
import { PROMO_CODE, PROMO_LABEL, REFUND_DAYS } from "./promo";
import {
  AutobladeFeatures,
  AutobladeGuarantee,
  AutobladeMarquee,
  AutobladeOffer,
  AutobladePlatforms,
} from "./AutobladeSections";

const LINKEDIN_URL = "https://www.linkedin.com/in/loshanparajuli/";

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
  { value: "3 cams", label: "synced from audio alone" },
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
          Beta is open · code <strong>{PROMO_CODE}</strong> takes {PROMO_LABEL}
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

function AutobladeDemo() {
  return (
    <section className="ab-demo" aria-label="autoBlade walkthrough">
      <div className="section-heading">
        <p>Try it here</p>
        <h2>The walkthrough</h2>
      </div>
      <p className="ab-section-lede">
        This is the same five-step onboarding you get on first launch. Click
        through it right here &mdash; arrow keys work too.
      </p>
      <div className="ab-demo-frame">
        <iframe
          className="ab-demo-embed"
          src="/autoblade-wizard.html"
          title="autoBlade interactive walkthrough"
          loading="lazy"
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
      <div className="ab-story-body">
        <p>
          Last week, I spent an entire night on post for a standard one-on-one
          podcast. A week later, I was staring down the exact same tedious
          project. I was so frustrated by the repetition...all I was really doing
          was comparing audio waveforms and cutting out the dead space. That is a
          machine&rsquo;s job, not mine.
        </p>
        <p>That&rsquo;s when i thought... why not like build a tool that saves me from this nightmare?</p>
        <p>
          I looked into existing software, but everything was either too
          expensive or clearly built by people who had never sat through the
          work. So, I decided to build my own. I combined my software engineering
          background with a focus on simple, welcoming design to create something
          truly built for creators. It has a minimal interface with very few
          knobs to tweak, but it perfectly automates the boring stuff.
        </p>
        <p>
          That&rsquo;s how we came with an idea for <b>autoBlade</b>, and I am
          super excited to see what else I can do with it.
        </p>
      </div>

      <div className="ab-founder">
        <div className="ab-founder-mark" aria-hidden="true">
          LP
        </div>
        <div className="ab-founder-copy">
          <p className="ab-founder-name">Losh Parajuli</p>
          <p className="ab-founder-role">
            Founder &amp; engineer, fromSilicon &mdash; building autoBlade in the
            open
          </p>
        </div>
        <a
          className="ab-linkedin-cta"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
          </svg>
          Follow the founder&rsquo;s story
        </a>
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */

function AutobladeFaqSection() {
  return (
    <section className="ab-faq" id="faq">
      <div className="section-heading">
        <p>Questions</p>
        <h2>Before you download</h2>
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
          &mdash; the full app launches fall 2026. Paid plans are{" "}
          {PROMO_LABEL} with code <strong>{PROMO_CODE}</strong>, and there is a{" "}
          {REFUND_DAYS}-day money-back guarantee after that.
        </p>
        <AutobladeDownload />
      </div>
    </section>
  );
}

/* ---------------- structured data ---------------- */

// Describes autoBlade as a product so answer engines can cite concrete facts
// (platform, requirements, what it does) rather than paraphrasing the hero.
// `offers` is declared on /pricing against this same @id, so the two nodes
// merge into one product rather than competing. No `aggregateRating` — there
// are no reviews yet, and inventing one would be a fabricated claim.
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
        <AutobladeDemo />
        <AutobladeOffer />
        <AutobladePlatforms />
        <AutobladeStory />
        <AutobladeGuarantee />
        <AutobladeFaqSection />
        <AutobladeGet />
        <SiteFooter />
      </div>
    </main>
  );
}
