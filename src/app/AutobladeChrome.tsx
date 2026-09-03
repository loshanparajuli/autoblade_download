/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { PROMO_CODE, PROMO_LABEL } from "./promo";

/** Sticky beta notice. Shared by every autoBlade page so the launch date and
    the live offer are stated once, in one place. */
export function AutobladeBetaBanner() {
  return (
    <div className="ab-beta-banner">
      <p>
        <strong>Beta test open</strong> · code <b>{PROMO_CODE}</b> takes{" "}
        {PROMO_LABEL} at checkout · full launch fall 2026
      </p>
    </div>
  );
}

/** Brand pill plus the page's anchors. Getting back to fromSilicon is still
    handled by the shared footer, not up here. On the pricing page the
    same-page anchors would go nowhere, so only the real routes are shown. */
export function AutobladeHeader({ current }: { current?: "pricing" }) {
  const onPricing = current === "pricing";

  return (
    <header className="ab-header">
      <Link className="brand-pill ab-brand-pill" href="/">
        <img src="/autoblade.png" alt="" className="ab-logo" />
        autoBlade
      </Link>
      <nav className="ab-nav" aria-label="Main">
        <Link href={onPricing ? "/#features" : "#features"}>Features</Link>
        <Link href={onPricing ? "/#screens" : "#screens"}>Screens</Link>
        <Link href={onPricing ? "/#faq" : "#faq"}>FAQ</Link>
        <Link href="/pricing" aria-current={onPricing ? "page" : undefined}>
          Pricing
        </Link>
        <Link className="ab-nav-cta" href={onPricing ? "/#download" : "#download"}>
          Download
        </Link>
      </nav>
    </header>
  );
}
