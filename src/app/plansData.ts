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
    tagline: "The full editor. Sync, transcribe and cut, all on your Mac.",
    // The trial leads the list and is repeated on the button. It is the only
    // reason to click that does not require deciding on a price first, so it
    // is stated where the eye lands and again where the hand goes.
    cta: "Get Pro · 7-day free trial",
    features: [
      "7-day free trial",
      "Up to 50 podcasts per month",
      "Automatic multicam sync, from audio alone",
      "Add your own API key for AI features",
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
    features: [
      "Unlimited podcasts",
      "Full transcript of every session",
      "9:16 shorts with editable captions",
      "AI blunder detection",
      "AI highlights sequence",
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
