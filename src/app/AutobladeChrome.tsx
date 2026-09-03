"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROMO_CODE, PROMO_LABEL, PROMO_PLAN } from "./promo";

/** Sticky beta notice. States the launch date and the live offer once. */
export function AutobladeBetaBanner() {
  return (
    <div className="ab-beta-banner">
      <p>
        <strong>Beta test open</strong> · code <b>{PROMO_CODE}</b> takes{" "}
        {PROMO_LABEL} {PROMO_PLAN} at checkout · full launch fall 2026
      </p>
    </div>
  );
}

type NavLink = { href: string; label: string };

/* Every entry is a section of this one page — there is no second route. */
const LINKS: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#screens", label: "Screens" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

/** Brand pill plus the page's anchors, collapsing to a panel on phones. */
export function AutobladeHeader() {
  const [open, setOpen] = useState(false);

  // Escape closes; so does resizing up into the desktop layout, otherwise the
  // panel is left open behind a nav bar that no longer has a button to shut it.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header className={`ab-header${open ? " is-open" : ""}`}>
      <div className="ab-header-bar">
        <Link className="brand-pill ab-brand-pill" href="/">
          <img src="/autoblade.png" alt="" className="ab-logo" />
          autoBlade
        </Link>

        <nav className="ab-nav" aria-label="Main">
          {LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="ab-nav-cta" href="#download">
            Download
          </Link>
        </nav>

        <button
          type="button"
          className="ab-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="ab-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Collapsed with grid-rows rather than unmounted, so the panel can
          animate open and shut instead of popping. */}
      <div className="ab-mobile-nav" id="ab-mobile-nav">
        <div className="ab-mobile-nav-inner">
          <nav aria-label="Mobile">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              className="ab-mobile-cta"
              href="#download"
              onClick={() => setOpen(false)}
            >
              Download
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
