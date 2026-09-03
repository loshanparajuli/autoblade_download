export type Plan = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
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
 */
export const PLANS: Plan[] = [
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
    promoEligible: true,
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
    promoEligible: false,
  },
];
