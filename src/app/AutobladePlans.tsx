import { PLANS, type Plan } from "./plansData";
import { PROMO_CODE, PROMO_LABEL } from "./promo";

/**
 * One plan card, shared by /pricing and the landing page's pricing block so
 * the two can never show different prices or different checkout links.
 *
 * The BETA100 badge is driven by `promoEligible`, not hard-coded: the code
 * only works on Pro, and a badge on Pro AI would send someone to a checkout
 * that rejects it.
 */
function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`ab-plan${plan.featured ? " ab-plan-featured" : ""}`}>
      <div className="ab-plan-head">
        <p className="ab-plan-name">
          {plan.name}
          {plan.featured && <span className="ab-plan-badge">Most capable</span>}
          {plan.promoEligible && (
            <span className="ab-plan-badge ab-plan-badge-promo">
              {PROMO_LABEL} with {PROMO_CODE}
            </span>
          )}
        </p>
        <p className="ab-plan-price">
          <span className="ab-plan-currency">$</span>
          <span className="ab-plan-amount">{plan.price}</span>
          <span className="ab-plan-period">/ month</span>
        </p>
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
      <a className="dark-cta ab-plan-cta" href={plan.checkoutUrl}>
        Get {plan.name}
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
