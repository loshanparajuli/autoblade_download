"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const revealEase = "power3.out";
const editorialEase = "expo.out";

/** Same eases, offsets and "heading first, then body" cadence as the landing
    page's reveals, so /pricing reads as the same site rather than a bolt-on. */
export function PricingAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const ctx = gsap.context(() => {
      gsap.defaults({ ease: revealEase, overwrite: "auto" });

      // The hero renders untouched on load, matching the landing page — no
      // blank flash while the first screen fades in.

      gsap.from(".ab-pricing .section-heading > *", {
        autoAlpha: 0,
        y: 34,
        stagger: 0.11,
        duration: 0.82,
        ease: editorialEase,
        scrollTrigger: {
          trigger: ".ab-pricing .section-heading",
          start: "top 84%",
          once: true,
        },
      });

      gsap.from(".ab-plan", {
        autoAlpha: 0,
        y: 90,
        scale: 0.985,
        stagger: 0.12,
        duration: 1,
        ease: editorialEase,
        scrollTrigger: { trigger: ".ab-plans", start: "top 82%", once: true },
      });

      gsap.from(".ab-pricing-note", {
        autoAlpha: 0,
        y: 26,
        duration: 0.72,
        scrollTrigger: {
          trigger: ".ab-pricing-note",
          start: "top 92%",
          once: true,
        },
      });

      gsap.from(".site-footer .footer-brand > *, .site-footer .footer-bottom > *", {
        autoAlpha: 0,
        y: 26,
        stagger: 0.08,
        duration: 0.72,
        scrollTrigger: { trigger: ".site-footer", start: "top 82%", once: true },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.setTimeout(refresh, 500);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
