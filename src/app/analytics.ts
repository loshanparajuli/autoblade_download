/**
 * One `track()` for the whole site.
 *
 * Deliberately provider-agnostic. The page had no analytics at all, which meant
 * nothing about the funnel was knowable — not how many people reached the
 * pricing, not whether anyone copied the discount code, not which of the two
 * checkout buttons got clicked. Rather than hard-wire one vendor, this hands
 * the event to whichever of them is on the page and does nothing if none is.
 *
 * That has two consequences worth knowing:
 *   - Swapping Plausible for Vercel (or adding GA) needs no change here or at
 *     any call site. Only the script in AutobladeAnalytics changes.
 *   - Before a provider is configured, every call is a silent no-op. The events
 *     fire, nothing receives them, nothing breaks.
 *
 * Events fired today, and where from:
 *   demo_view        AutobladeAnalytics <SectionView> on the walkthrough
 *   pricing_view     AutobladeAnalytics <SectionView> on the plan cards
 *   coupon_copy      AutobladeCoupon, on a successful copy
 *   checkout_click   AutobladePlans, with { plan: "pro" | "pro-ai" }
 *   download_submit  AutobladeDownload, on a valid submit
 *   windows_waitlist AutobladeNotify, on a valid submit
 *
 * Together those give the funnel: reached demo -> reached pricing -> took the
 * code -> clicked a checkout, plus the two email captures alongside it.
 */

export type AnalyticsProps = Record<string, string | number | boolean>;

type PlausibleFn = (event: string, options?: { props?: AnalyticsProps }) => void;
type VercelFn = (
  command: "event",
  payload: { name: string } & AnalyticsProps
) => void;
type GtagFn = (command: "event", event: string, props?: AnalyticsProps) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
    va?: VercelFn;
    gtag?: GtagFn;
  }
}

/**
 * Records one event. Safe to call from anywhere: it no-ops during SSR and
 * whenever no provider has loaded, and a provider that throws can never take
 * the click handler that called it down with it.
 */
export function track(event: string, props?: AnalyticsProps) {
  if (typeof window === "undefined") return;

  try {
    window.plausible?.(event, props ? { props } : undefined);
    window.va?.("event", { name: event, ...props });
    window.gtag?.("event", event, props);
  } catch {
    // Analytics is never worth breaking an interaction over.
  }
}
