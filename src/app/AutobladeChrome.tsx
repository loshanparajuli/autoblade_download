/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

/** Sticky beta notice. Shared by every autoBlade page so the launch date is
    stated once, in one place. */
export function AutobladeBetaBanner() {
  return (
    <div className="ab-beta-banner">
      <p>
        <strong>Beta test open</strong> · full launch this fall 2026
      </p>
    </div>
  );
}

/** Brand pill plus the one nav link the site actually has. Getting back to
    fromSilicon is still handled by the shared footer, not up here. */
export function AutobladeHeader({ current }: { current?: "pricing" }) {
  return (
    <header className="ab-header">
      <Link className="brand-pill ab-brand-pill" href="/">
        <img src="/autoblade.png" alt="" className="ab-logo" />
        autoBlade
      </Link>
      <nav className="ab-nav" aria-label="Main">
        <Link
          href="/pricing"
          aria-current={current === "pricing" ? "page" : undefined}
        >
          Pricing
        </Link>
      </nav>
    </header>
  );
}
