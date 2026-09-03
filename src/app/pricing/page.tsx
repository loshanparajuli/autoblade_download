import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../SiteFooter";
import { AutobladeBetaBanner, AutobladeHeader } from "../AutobladeChrome";
import { PARENT_SITE_URL, SITE_URL } from "../siteConfig";
import { PricingAnimations } from "./PricingAnimations";
import { CouponChip } from "../AutobladeCoupon";
import { AutobladeGuarantee } from "../AutobladeSections";
import { CHECKOUT_HINT, PROMO_CODE, PROMO_LABEL, REFUND_DAYS } from "../promo";

const PAGE_DESCRIPTION =
  `autoBlade pricing. Pro is $11.99 a month for 40 podcasts, no watermark and your own API key. Pro AI is $19.99 a month and adds blunder detection and highlights sequences. Beta code ${PROMO_CODE} takes ${PROMO_LABEL} at checkout.`;

export const metadata: Metadata = {
  title: "Pricing",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/pricing`,
    title: "autoBlade pricing",
    description: PAGE_DESCRIPTION,
  },
};

type Plan = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  /** Dodo Payments hosted checkout. Each plan has its own product id. */
  checkoutUrl: string;
  featured: boolean;
};

/** The two published plans. Prices are monthly, in USD, and the checkout links
    go straight to the matching Dodo Payments product. */
const PLANS: Plan[] = [
  {
    id: "pro",
    name: "Pro",
    price: "11.99",
    tagline: "The full editor. Sync, transcribe and cut, all on your Mac.",
    features: [
      "40 podcasts per month",
      "No watermark",
      "Add your own API key",
      "Sessions are fully private and secured",
      "24/7 email support",
    ],
    checkoutUrl:
      "https://checkout.dodopayments.com/buy/pdt_0Nm49aGjz9MELqm6aj8hA?quantity=1",
    featured: false,
  },
  {
    id: "pro-ai",
    name: "Pro AI",
    price: "19.99",
    tagline: "Everything in Pro, plus autoBlade's AI engine on every cut.",
    // Pro AI is capped too, but the number isn't published. Listing only the
    // capabilities states nothing false about volume — whereas "unlimited"
    // would, and this page takes payment.
    features: [
      "Everything in Pro plan",
      "Blunder detection",
      "Highlights sequence",
    ],
    checkoutUrl:
      "https://checkout.dodopayments.com/buy/pdt_0Nm4ADM6mkXQjvgfX0gQK?quantity=1",
    featured: true,
  },
];

function PricingHero() {
  return (
    <section className="hero-section ab-hero">
      <div className="hero-rule">
        <span />
        <p>Plans &amp; pricing</p>
        <span />
      </div>
      <div className="hero-title-block">
        <h1 className="ab-title">
          pricing that
          <br />
          <em>stays simple.</em>
        </h1>
        <p className="ab-lede">
          Two plans, no seat maths, no per-export fees. Pick Pro for the full
          editor, or Pro AI to hand the tedious calls to autoBlade as well.
          During the beta, both are free with a code.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`ab-plan${plan.featured ? " ab-plan-featured" : ""}`}>
      <div className="ab-plan-head">
        <p className="ab-plan-name">
          {plan.name}
          {plan.featured && <span className="ab-plan-badge">Most capable</span>}
        </p>
        <p className="ab-plan-price">
          <span className="ab-plan-currency">$</span>
          <span className="ab-plan-amount">{plan.price}</span>
          <span className="ab-plan-period">/ month</span>
        </p>
        <p className="ab-plan-tagline">{plan.tagline}</p>
      </div>

      <div className="ab-plan-features">
        <p className="ab-plan-features-label">What&rsquo;s included</p>
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Hosted Dodo Payments checkout — an external origin, so a plain <a>
          rather than next/link. Same tab, which is what buyers expect. */}
      <a className="dark-cta ab-plan-cta" href={plan.checkoutUrl}>
        Get {plan.name}
      </a>
    </article>
  );
}

function PricingPlans() {
  return (
    <section className="ab-pricing" id="plans">
      <div className="section-heading">
        <p>USD · billed monthly</p>
        <h2>Choose a plan</h2>
      </div>
      <div className="ab-promo-strip">
        <div className="ab-promo-copy">
          <p className="ab-promo-eyebrow">Beta offer · limited window</p>
          <p className="ab-promo-headline">
            Take <strong>{PROMO_LABEL}</strong> either plan
          </p>
          <p className="ab-promo-hint">{CHECKOUT_HINT}</p>
        </div>
        <CouponChip tone="light" />
      </div>

      <div className="ab-plans">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <p className="ab-pricing-note">
        Prices are in US dollars, billed monthly, and cancellable from your
        account at any time. Checkout is handled securely by Dodo Payments
        &mdash; the discount field is on the payment page, so keep{" "}
        <strong>{PROMO_CODE}</strong> handy. Every plan is covered by the{" "}
        {REFUND_DAYS}-day money-back guarantee below.
      </p>

      <div className="ab-pricing-soon">
        <span className="ab-platform-status">Coming soon</span>
        <p>
          <strong>Windows.</strong>{" "}
          autoBlade is Apple silicon only today. A
          Windows build is in progress with no date to promise yet &mdash;{" "}
          <Link href="/#download">join the beta list</Link> and you will hear first.
        </p>
      </div>
    </section>
  );
}

// Shares the home page's SoftwareApplication @id so both pages describe one
// product. The `offers` live here because this is the page that states them.
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "autoBlade",
  url: SITE_URL,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "macOS, Apple silicon (M1 or later)",
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

export default function PricingPage() {
  return (
    <main className="ab-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingAnimations />
      <AutobladeBetaBanner />
      <div className="ab-canvas">
        <AutobladeHeader current="pricing" />
        <PricingHero />
        <PricingPlans />
        <AutobladeGuarantee />
        <section className="ab-pricing-faq">
          <p>
            Questions about limits, refunds or what runs on-device?{" "}
            <Link href="/#faq">Read the FAQ</Link> or{" "}
            <a href="mailto:losh@fromsilicon.com">email me directly</a>.
          </p>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}
