"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

import { track } from "./analytics";

/**
 * Loads the analytics provider, if one is configured.
 *
 * Plausible is the default suggestion for this site specifically: it is
 * cookieless and sends nothing personal, which matters for a product whose
 * entire pitch is that nothing leaves your machine. A consent banner would be
 * a bad look on a page selling on-device privacy, and this avoids needing one.
 *
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN to the bare host (no protocol, no path):
 *
 *     NEXT_PUBLIC_PLAUSIBLE_DOMAIN=autoblade.fromsilicon.com
 *
 * With it unset, nothing loads and every track() call is a no-op, so local dev
 * and preview deploys stay out of the numbers on their own.
 *
 * Using Vercel Analytics instead: drop this component, render <Analytics /> from
 * @vercel/analytics/react in its place, and leave every call site alone —
 * track() already forwards to window.va when it is present.
 */
export function AutobladeAnalytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      // The "manual" variant is what exposes window.plausible for custom
      // events. The plain script only counts pageviews, which would leave
      // every event below silently dropped.
      src="https://plausible.io/js/script.manual.outbound-links.js"
      data-domain={domain}
      strategy="afterInteractive"
    />
  );
}

/**
 * Fires one event the first time a section is scrolled into view.
 *
 * The walkthrough is an autoplaying muted embed, so "did they press play" is
 * not a real signal — the video is already playing when it arrives. What is
 * worth knowing is how far down the page people actually get, which is what
 * this measures. Paired with checkout_click it gives the drop-off between
 * "saw the demo", "saw the prices" and "clicked to buy".
 *
 * `once: true` in spirit: the observer disconnects after the first hit, so a
 * reader scrolling up and down does not inflate the count.
 */
export function SectionView({
  event,
  children,
}: {
  event: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    // The wrapper is `display: contents`, so it generates no box of its own and
    // IntersectionObserver would never report it as intersecting — its rect is
    // permanently 0x0 at 0,0. Observe the section it wraps instead.
    const node = ref.current?.firstElementChild ?? ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || fired.current) return;
        fired.current = true;
        observer.disconnect();
        track(event);
      },
      // A section taller than the viewport can never reach a 0.33 ratio, so the
      // threshold is paired with a root margin that pulls the bottom edge up:
      // the event fires once a third of the *viewport* is filled by it.
      { threshold: 0.01, rootMargin: "0px 0px -33% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [event]);

  // `display: contents` so this wrapper adds no box of its own — the sections
  // it wraps are grid and flex children whose layout would otherwise change.
  return (
    <div ref={ref} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
