export type Plan = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  /** Short label on the card, e.g. "Best value". */
  badge?: string;
  /** Overrides the default "Get {name}" button label. */
  cta?: string;
  /**
   * Optional yearly alternative, shown under the monthly price.
   *
   * `checkoutUrl` must be a *separate* Dodo product priced yearly — reusing the
   * monthly link would bill monthly while the page promised a year. The card
   * renders nothing at all until that URL is filled in, so an unconfigured
   * annual plan is invisible rather than broken.
   */
  annual?: {
    /** Total charged once per year, in USD. */
    price: string;
    /** What the buyer keeps versus paying monthly, e.g. "two months free". */
    saving: string;
    checkoutUrl: string;
  };
  /** Dodo Payments hosted checkout. Each plan has its own product id. */
  checkoutUrl: string;
  featured: boolean;
  /** Whether BETA100 applies. Only Pro is discounted; Pro AI is full price. */
  promoEligible: boolean;
};

/**
 * The two published plans, shared by /pricing and the landing page's pricing
 * block so the prices and checkout links can't drift between them. Prices are
 * monthly, in USD, and each link goes straight to its Dodo Payments product.
 *
 * Both lists are written out in full rather than leaning on an "everything in
 * Pro, plus…" shorthand. A reader comparing two columns compares them line by
 * line, and the shorthand made the more expensive card the shorter one. Keep
 * the shared rows in the same order in both lists so the differences land on
 * the same lines: the volume cap, transcript, shorts, the AI rows and the
 * support tier are the whole argument for the higher plan.
 */
export const PLANS: Plan[] = [
  {
    id: "pro",
    name: "Pro",
    price: "13.99",
    // Was "The full editor. Sync, transcribe and cut, all on your Mac." — which
    // promised transcription on a card whose feature list does not include it.
    // A tagline that contradicts the rows underneath it is the kind of thing a
    // buyer notices after paying, so it now claims only what Pro ships.
    tagline: "The editor itself. Sync your cameras and cut to whoever is talking, all on your Mac.",
    // The trial lives on the button and nowhere else. It was also a feature
    // row, which said "7-day" while the app grants three — so the number is
    // gone from the site entirely rather than restated wrongly in two places.
    // If the trial length is ever fixed and worth advertising, put the number
    // in one place, not two.
    cta: "Get Pro · free trial",
    features: [
      "Up to 50 podcasts per month",
      "Automatic multicam sync, from audio alone",
      "Add your own API key for AI features",
      "Works fully offline, no internet needed",
      "Sessions are fully private and secured",
      "24/7 email support",
    ],
    checkoutUrl:
      "https://checkout.dodopayments.com/buy/pdt_0Nm49aGjz9MELqm6aj8hA?quantity=1",
    featured: false,
    promoEligible: true,
  },
  {
    id: "pro-ai",
    name: "Pro AI",
    price: "29.99",
    tagline:
      "Everything in Pro, uncapped, with autoBlade's AI engine on every cut.",
    badge: "Best value",
    cta: "Get Pro AI · free trial",
    // Yearly is offered on this plan only. It is the plan that actually earns
    // during the beta — Pro is free with the code — so it is the one where a
    // year up front is worth discounting for.
    //
    // A separate Dodo product, because Dodo does not support two billing
    // intervals on one: "create separate products for each pricing option
    // (for example, Monthly and Yearly)". Never point this at the monthly
    // product — it would bill monthly against a yearly promise.
    annual: {
      price: "299",
      saving: "two months free",
      checkoutUrl:
        "https://checkout.dodopayments.com/buy/pdt_0Nn3cFe2dThkQVZV9ORxp?quantity=1",
    },
    features: [
      "Unlimited podcasts",
      "Full transcript of every session",
      "9:16 shorts with editable captions",
      "AI blunder detection",
      "AI highlights sequence",
      "Works fully offline, no internet needed",
      "Sessions are fully private and secured",
      "24/7 priority support",
    ],
    checkoutUrl:
      "https://checkout.dodopayments.com/buy/pdt_0Nm4ADM6mkXQjvgfX0gQK?quantity=1",
    featured: true,
    promoEligible: false,
  },
];

/**
 * The plan BETA100 applies to. Derived from `promoEligible` rather than hard-
 * coded so the offer card's checkout link can never point at a plan the code
 * would be rejected on.
 */
export const PROMO_PLAN_DATA =
  PLANS.find((plan) => plan.promoEligible) ?? PLANS[0];
