"use client";

import { useEffect, useRef, useState } from "react";
import { PROMO_CODE } from "./promo";

type State = "idle" | "copied" | "manual";

/**
 * The promo code as a click-to-copy chip. Buyers have to retype it into Dodo's
 * discount field, so copying it is the actual job — the visual is secondary.
 */
export function CouponChip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [state, setState] = useState<State>("idle");
  const codeRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function flash(next: State, ms: number) {
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), ms);
  }

  /** Puts the code under the caret so ⌘C still works when the API won't. */
  function selectCode() {
    const node = codeRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  // The confirmation is shown first and the write fired off unawaited:
  // writeText rejects outright when the document isn't focused, so a label
  // that waits on the promise would often never appear. A rejection swaps the
  // chip to a "press ⌘C" prompt with the code selected — never a silent no-op.
  function copy() {
    flash("copied", 2000);

    const write = navigator.clipboard?.writeText(PROMO_CODE);
    if (!write) {
      selectCode();
      flash("manual", 4000);
      return;
    }
    write.catch(() => {
      selectCode();
      flash("manual", 4000);
    });
  }

  const label =
    state === "copied" ? "Copied" : state === "manual" ? "Press ⌘C" : "Copy";

  return (
    <button
      type="button"
      className={`ab-coupon-chip ab-coupon-${tone}`}
      onClick={copy}
      aria-label={`Copy discount code ${PROMO_CODE}`}
    >
      <span className="ab-coupon-code" ref={codeRef}>
        {PROMO_CODE}
      </span>
      <span className="ab-coupon-action" aria-hidden="true">
        {label}
      </span>
      <span className="ab-sr-only" role="status" aria-live="polite">
        {state === "copied"
          ? `${PROMO_CODE} copied to clipboard`
          : state === "manual"
            ? `${PROMO_CODE} is selected — press Command C to copy`
            : ""}
      </span>
    </button>
  );
}
