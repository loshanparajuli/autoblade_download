"use client";

import { track } from "./analytics";
import { PLANS, type Plan } from "./plansData";

/**
 * One plan card, shared by /pricing and the landing page's pricing block so
 * the two can never show different prices or different checkout links.
 *
 * The BETA100 badge that used to sit on Pro is gone from here on purpose: the
 * code is now presented in exactly one place on the page — the offer band
 * directly above these cards — so it is copied once, right before checkout,
 * instead of being repeated on every surface that mentions money.
 */
function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`ab-plan${plan.featured ? " ab-plan-featured" : ""}`}>
      <div className="ab-plan-head">
        <p className="ab-plan-name">
          {plan.name}
          {plan.badge && <span className="ab-plan-badge">{plan.badge}</span>}
        </p>
        <p className="ab-plan-price">
          <span className="ab-plan-currency">$</span>
          <span className="ab-plan-amount">{plan.price}</span>
          <span className="ab-plan-period">/ month</span>
        </p>
        {/* Rendered only once a yearly Dodo product exists. An annual line
            pointing at the monthly checkout would bill monthly against a
            yearly promise, so an unset URL hides the option entirely rather
            than shipping a link that charges the wrong thing. */}
        {plan.annual?.checkoutUrl && (
          <p className="ab-plan-annual">
            <a
              href={plan.annual.checkoutUrl}
              onClick={() =>
                track("checkout_click", { plan: plan.id, term: "annual" })
              }
            >
              or ${plan.annual.price} a year
            </a>
            <span>{plan.annual.saving}</span>
          </p>
        )}
        <p className="ab-plan-tagline">{plan.tagline}</p>
      </div>

      <div className="ab-plan-features">
        <p className="ab-plan-features-label">What&rsquo;s included</p>
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Hosted Dodo Payments checkout — an external origin, so a plain <a>
          rather than next/link. Same tab, which is what buyers expect. */}
      <a
        className="dark-cta ab-plan-cta"
        href={plan.checkoutUrl}
        onClick={() => track("checkout_click", { plan: plan.id, term: "monthly" })}
      >
        {plan.cta ?? `Get ${plan.name}`}
      </a>
    </article>
  );
}

export function AutobladePlanCards() {
  return (
    <div className="ab-plans">
      {PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
