/**
 * Beta launch promotion + guarantee, in one place.
 *
 * The landing page, the pricing page and the JSON-LD all read from here so the
 * code, the discount and the guarantee window can never drift apart across
 * pages. Change the offer once, here.
 */

/** Discount code buyers type into the Dodo Payments checkout. */
export const PROMO_CODE = "BETA100";

/** Human-readable size of the discount. */
export const PROMO_LABEL = "100% off";

/**
 * The code applies to Pro only — Pro AI is full price. Every surface that
 * mentions the discount names this plan, so nothing on the site can imply the
 * offer covers both and send someone to a checkout that rejects the code.
 */
export const PROMO_PLAN = "Pro";

/** How long the money-back guarantee runs, in days. */
export const REFUND_DAYS = 7;

/**
 * Dodo's hosted checkout does not pre-apply a code from the URL — it renders a
 * "Have a discount code?" field instead. So the site's job is to make the code
 * impossible to miss on the way out, not to smuggle it into the link.
 */
export const CHECKOUT_HINT = `Enter ${PROMO_CODE} in the discount field on the ${PROMO_PLAN} checkout.`;
