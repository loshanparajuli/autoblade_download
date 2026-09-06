/**
 * Beta launch promotion + guarantee, in one place.
 *
 * The offer band, the download copy and /llms.txt all read from here so the
 * code, the discount and the guarantee window can never drift apart. Change
 * the offer once, here.
 *
 * Note on placement, not on values: the *code* is rendered on exactly one
 * surface — the offer band directly above the plan cards. It used to appear in
 * the sticky banner, a hero chip, the pricing lede, a badge on the Pro card
 * and the download block as well, which put a discount in front of readers
 * five times before they had decided they wanted the product. If you add a
 * sixth mention, you are undoing that.
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
