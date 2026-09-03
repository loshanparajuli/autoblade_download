"use client";

import { useState } from "react";
import { FAQS } from "./faqData";

/**
 * Plain disclosure list. Native <details> would be less code, but Safari still
 * refuses to animate its open height, and this page leans on motion — so the
 * open state is held in React and the panel is a grid-rows transition.
 */
export function AutobladeFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="ab-faq-list">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q} className={`ab-faq-item${isOpen ? " is-open" : ""}`}>
            <h3 className="ab-faq-q">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-btn-${i}`}
              >
                <span>{faq.q}</span>
                <span className="ab-faq-sign" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="ab-faq-panel"
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
            >
              <div className="ab-faq-panel-inner">
                <p>{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
