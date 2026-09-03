import Link from "next/link";
import { CouponChip } from "./AutobladeCoupon";
import { AutobladeNotify } from "./AutobladeNotify";
import { PROMO_CODE, PROMO_LABEL, REFUND_DAYS } from "./promo";

/* Icons are inline, stroke-only and 24×24 on a shared grid, so the feature
   grid stays one weight instead of a ransom note of mismatched glyphs. */
const icon = {
  sync: (
    <path d="M4 8h16M4 12h10M4 16h16M17 10l3 2-3 2" />
  ),
  wave: (
    <path d="M3 12h2l2-6 3 13 3-10 2 5 2-3h4" />
  ),
  cut: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M7.8 16.2 18 4M16.2 16.2 6 4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4 3 7.2 7 9 4-1.8 7-5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  vertical: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="1" />
      <path d="M9.5 16h5" />
    </>
  ),
  spark: (
    <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6.5 6.5l3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" />
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  dial: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
};

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="ab-feature-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const FEATURES = [
  {
    icon: icon.sync,
    title: "Sync that just happens",
    copy: "Three cameras or more, all with different start times and lengths. autoBlade reads the audio and puts them on one clock — no clapperboard, no timecode box, no dragging.",
  },
  {
    icon: icon.cut,
    title: "It cuts to whoever's talking",
    copy: "Speaker detection drives the switch, frame by frame. When you both jump in, it goes wide, then comes back. That's the four boring hours, gone.",
  },
  {
    icon: icon.wave,
    title: "Every word, transcribed",
    copy: "A full transcript of the session comes out the other side, timed to the edit. Search it, quote it, ship it as subtitles.",
  },
  {
    icon: icon.chip,
    title: "On-device, on Apple silicon",
    copy: "Built for the Neural Engine. A two-hour episode turns around in about two minutes, with no upload bar and no render queue you're waiting behind.",
  },
  {
    icon: icon.shield,
    title: "Your footage never leaves",
    copy: "No cloud step. No account required to edit. Unreleased interviews and NDA'd guests stay on the drive they were recorded to.",
  },
  {
    icon: icon.vertical,
    title: "Shorts, from the same cut",
    copy: "The same engine reframes to 9:16 and follows the speaker vertically. Burn in captions, drag, scale, restyle — then export the set.",
  },
  {
    icon: icon.spark,
    title: "Blunder detection & highlights",
    copy: "On Pro AI, autoBlade flags the retakes and stumbles worth dropping and pulls the moments worth clipping out of the transcript.",
  },
  {
    icon: icon.dial,
    title: "Almost no knobs",
    copy: "Designed to be finished with, not fiddled with. A handful of decisions that matter, and sane defaults for everything that doesn't.",
  },
];

export function AutobladeFeatures() {
  return (
    <section className="ab-features" id="features">
      <div className="section-heading">
        <p>What it does</p>
        <h2>The boring part, automated</h2>
      </div>
      <p className="ab-section-lede">
        autoBlade is not another timeline to learn. It is the four hours between
        &ldquo;we finished recording&rdquo; and &ldquo;it&rsquo;s published&rdquo;
        &mdash; handed to your Mac.
      </p>
      <div className="ab-feature-grid">
        {FEATURES.map((feature) => (
          <article className="ab-feature" key={feature.title}>
            <Icon>{feature.icon}</Icon>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- marquee ---------------- */

const MARQUEE = [
  "Runs entirely on-device",
  "Apple silicon native",
  "Nothing uploaded, ever",
  "2 hours in ~2 minutes",
  "Automatic multicam sync",
  "Speaker-aware cutting",
  "Full transcript included",
  "9:16 shorts + captions",
];

/** Two identical runs side by side, translated -50% — the seam lands exactly
    where the second copy starts, so the loop reads as continuous. */
export function AutobladeMarquee() {
  return (
    <div className="ab-marquee" aria-hidden="true">
      <div className="ab-marquee-track">
        {[0, 1].map((run) => (
          <div className="ab-marquee-run" key={run}>
            {MARQUEE.map((item) => (
              <span key={item}>
                {item}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- platforms ---------------- */

export function AutobladePlatforms() {
  return (
    <section className="ab-platforms" id="platforms">
      <div className="section-heading">
        <p>Where it runs</p>
        <h2>Mac now. Windows next.</h2>
      </div>
      <div className="ab-platform-grid">
        <article className="ab-platform is-live">
          <span className="ab-platform-status">Available today</span>
          <h3>macOS</h3>
          <p>
            Apple silicon &mdash; M1 or later. Native, on-device, and the reason
            a two-hour session turns around in minutes instead of overnight.
          </p>
          <a className="dark-cta ab-platform-cta" href="#download">
            Download for Mac
          </a>
        </article>
        <article className="ab-platform is-soon">
          <span className="ab-platform-status">Coming soon</span>
          <h3>Windows</h3>
          <p>
            In progress and the most-asked-for thing on the list. No date to
            promise yet &mdash; leave your email and you will hear the day
            there is a build worth installing.
          </p>
          <AutobladeNotify />
        </article>
      </div>
    </section>
  );
}

/* ---------------- offer + guarantee ---------------- */

export function AutobladeOffer() {
  return (
    <section className="ab-offer" id="offer">
      <div className="ab-offer-card">
        <p className="ab-offer-eyebrow">Beta offer · limited window</p>
        <h2 className="ab-offer-title">
          Every plan, <em>{PROMO_LABEL}</em>
        </h2>
        <p className="ab-offer-copy">
          autoBlade is in beta, so beta testers do not pay. Pick Pro or Pro AI,
          then enter <strong>{PROMO_CODE}</strong> in the discount field at
          checkout and the total drops to zero.
        </p>
        <div className="ab-offer-actions">
          <CouponChip tone="dark" />
          <Link className="ab-offer-cta" href="/pricing">
            See the plans
          </Link>
        </div>
        <ul className="ab-offer-points">
          <li>No card charged while the code is live</li>
          <li>{REFUND_DAYS}-day money-back guarantee after that</li>
          <li>Cancel whenever you want</li>
        </ul>
      </div>
    </section>
  );
}

export function AutobladeGuarantee() {
  return (
    <section className="ab-guarantee">
      <div className="ab-guarantee-inner">
        <div className="ab-guarantee-seal" aria-hidden="true">
          <span className="ab-guarantee-days">{REFUND_DAYS}</span>
          <span className="ab-guarantee-unit">days</span>
        </div>
        <div className="ab-guarantee-copy">
          <h2>A {REFUND_DAYS}-day money-back guarantee</h2>
          <p>
            If autoBlade does not save you the night it promises, email{" "}
            <a href="mailto:losh@fromsilicon.com">losh@fromsilicon.com</a>{" "}
            within {REFUND_DAYS}{" "}
            days and you get a full refund. No form, no
            retention script, no &ldquo;what could we have done better&rdquo;
            gauntlet. It is a young app asking you to take a chance on it, and
            that should cost you nothing if it does not work out.
          </p>
        </div>
      </div>
    </section>
  );
}
