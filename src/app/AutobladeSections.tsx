import Link from "next/link";
import { CouponChip } from "./AutobladeCoupon";
import { AutobladeNotify } from "./AutobladeNotify";
import { PROMO_CODE, PROMO_LABEL, PROMO_PLAN, REFUND_DAYS } from "./promo";

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
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  apple: (
    <path
      d="M16.7 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.4-1-2.5-3.5ZM14.5 5.3c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 0 2.1-.5 2.7-1.3Z"
      fill="currentColor"
      stroke="none"
    />
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

/* Leads with what the product *is* — an AI editor — before the proof points.
   The strip is the first thing under the hero, so it should name the category
   rather than open on a spec. */
const MARQUEE = [
  "AI-powered podcast editor",
  "On-device AI engine",
  "Runs entirely on your Mac",
  "AI multicam editing",
  "Apple silicon native",
  "Nothing uploaded, ever",
  "AI blunder detection",
  "2 hours in ~2 minutes",
  "Automatic multicam sync",
  "AI transcription built in",
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
      {/* Both cards end in an action row of the same height followed by a note
          line, so the Mac button and the Windows field sit on one baseline
          instead of drifting apart with the copy above them. */}
      <div className="ab-platform-grid">
        <article className="ab-platform is-live">
          <span className="ab-platform-status">Available today</span>
          <h3>macOS</h3>
          <p>
            Apple silicon &mdash; M1 or later. Native, on-device, and the reason
            a two-hour session turns around in minutes instead of overnight.
          </p>
          <div className="ab-platform-foot">
            <a className="dark-cta ab-platform-cta" href="#download">
              <svg
                className="ab-apple-mark"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {icon.apple}
              </svg>
              Download for Mac
            </a>
            <p className="ab-platform-note">Free while the beta is open.</p>
          </div>
        </article>
        <article className="ab-platform is-soon">
          <span className="ab-platform-status">Coming soon</span>
          <h3>Windows</h3>
          <p>
            In progress and the most-asked-for thing on the list. No date to
            promise yet &mdash; leave your email and you will hear the day
            there is a build worth installing.
          </p>
          <div className="ab-platform-foot">
            <AutobladeNotify />
          </div>
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
          {PROMO_PLAN}, <em>{PROMO_LABEL}</em>
        </h2>
        <p className="ab-offer-copy">
          autoBlade is in beta, so beta testers do not pay for the full editor.
          Enter <strong>{PROMO_CODE}</strong> in the discount field on the{" "}
          {PROMO_PLAN} checkout and the total drops to zero. Pro AI, with the AI
          engine on every cut, stays at its normal price.
        </p>
        <div className="ab-offer-actions">
          <CouponChip tone="dark" />
          <Link className="ab-offer-cta" href="#pricing">
            See the plans
          </Link>
        </div>
        <ul className="ab-offer-points">
          <li>Nothing to pay on {PROMO_PLAN} while the code is live</li>
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
            Not for you? Email{" "}
            <a href="mailto:losh@fromsilicon.com">losh@fromsilicon.com</a>{" "}
            within {REFUND_DAYS}{" "}
            days for a full refund. No form, no retention script.
          </p>
        </div>
      </div>
    </section>
  );
}
