import type { Metadata } from "next";
import { SiteFooter } from "./SiteFooter";
import { AutobladeBetaBanner, AutobladeHeader } from "./AutobladeChrome";
import { PARENT_SITE_URL, SITE_DESCRIPTION, SITE_URL } from "./siteConfig";
import { AutobladeAnimations } from "./AutobladeAnimations";
import { AutobladeDownload } from "./AutobladeDownload";

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

function AutobladeHero() {
  return (
    <section className="hero-section ab-hero">
      <div className="hero-rule">
        <span />
        <p>An AI podcast app for Mac</p>
        <span />
      </div>
      <div className="hero-title-block">
        <h1 className="ab-title">
          the edit that
          <br />
          <em>cuts itself.</em>
        </h1>
        <p className="ab-lede">
          Drop in your host, guest, and wide cameras. autoBlade syncs them,
          transcribes every word, and cuts to whoever&apos;s talking, powered by
          an on-device AI engine.
        </p>
        <a className="dark-cta" href="#download">
          Get autoBlade
        </a>
      </div>
    </section>
  );
}

function AutobladeDemo() {
  return (
    <section className="ab-demo" aria-label="autoBlade walkthrough">
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
    </section>
  );
}

function AutobladeGet() {
  return (
    <section className="ab-get" id="download">
      <div className="section-heading">
        <p>Apple silicon · macOS · free</p>
        <h2>Download autoBlade</h2>
      </div>
      <div className="ab-get-inner">
        <p className="ab-get-copy">
          autoBlade is currently in beta. Enter your email for early access ·
          the full app launches this fall 2026.
        </p>
        <AutobladeDownload />
      </div>
    </section>
  );
}

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
    "No manual setup or alignment required",
    "Runs entirely on your own machine",
  ],
  publisher: { "@id": `${PARENT_SITE_URL}/#organization` },
};

export default function AutobladePage() {
  return (
    <main className="ab-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autobladeJsonLd) }}
      />
      <AutobladeAnimations />
      <AutobladeBetaBanner />
      <div className="ab-canvas">
        <AutobladeHeader />
        <AutobladeHero />
        <AutobladeDemo />
        <AutobladeStory />
        <AutobladeGet />
        <SiteFooter />
      </div>
    </main>
  );
}
