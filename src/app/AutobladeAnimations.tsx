"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const revealEase = "power3.out";
const editorialEase = "expo.out";

/** autoBlade's scroll reveals. Deliberately mirrors the home page's motion
    (same eases, same offsets, same "heading first, then body" cadence) so the
    two pages feel like one site. */
export function AutobladeAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const ctx = gsap.context(() => {
      gsap.defaults({ ease: revealEase, overwrite: "auto" });

      // The hero renders untouched on load, matching the home page — no blank
      // flash while the first screen fades in.

      gsap.from(".ab-demo-frame", {
        autoAlpha: 0,
        y: 90,
        scale: 0.985,
        duration: 1,
        ease: editorialEase,
        scrollTrigger: { trigger: ".ab-demo", start: "top 78%", once: true },
      });

      revealHeading(".ab-story");

      gsap.from(".ab-story-body p", {
        autoAlpha: 0,
        y: 26,
        stagger: 0.1,
        duration: 0.72,
        scrollTrigger: {
          trigger: ".ab-story-body",
          start: "top 82%",
          once: true,
        },
      });

      revealHeading(".ab-get");

      gsap.from(".ab-get-inner > *", {
        autoAlpha: 0,
        y: 28,
        stagger: 0.11,
        duration: 0.72,
        scrollTrigger: { trigger: ".ab-get-inner", start: "top 82%", once: true },
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

function revealHeading(sectionSelector: string) {
  gsap.from(`${sectionSelector} .section-heading > *`, {
    autoAlpha: 0,
    y: 34,
    stagger: 0.11,
    duration: 0.82,
    ease: editorialEase,
    scrollTrigger: {
      trigger: `${sectionSelector} .section-heading`,
      start: "top 84%",
      once: true,
    },
  });
}
