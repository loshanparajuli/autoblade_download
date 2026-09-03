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

      // The hero above the fold renders untouched — no blank flash on load —
      // but the pieces below the headline still come in on their own beat.
      gsap.from(".ab-hero-stats > div", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.09,
        duration: 0.7,
        delay: 0.25,
      });

      revealHeading(".ab-screens");
      reveal(".ab-screens .ab-section-lede", ".ab-screens .ab-section-lede");

      gsap.from(".ab-carousel", {
        autoAlpha: 0,
        y: 80,
        scale: 0.985,
        duration: 1,
        ease: editorialEase,
        scrollTrigger: { trigger: ".ab-carousel", start: "top 82%", once: true },
      });

      revealHeading(".ab-features");
      reveal(".ab-features .ab-section-lede", ".ab-features .ab-section-lede");

      // The grid shares hairlines, so the cells fade rather than slide — a y
      // offset here would tear the 1px borders apart mid-reveal.
      gsap.from(".ab-feature", {
        autoAlpha: 0,
        stagger: 0.055,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".ab-feature-grid",
          start: "top 84%",
          once: true,
        },
      });

      revealHeading(".ab-demo");

      gsap.from(".ab-demo-frame", {
        autoAlpha: 0,
        y: 90,
        scale: 0.985,
        duration: 1,
        ease: editorialEase,
        scrollTrigger: { trigger: ".ab-demo", start: "top 78%", once: true },
      });

      gsap.from(".ab-offer-card", {
        autoAlpha: 0,
        y: 60,
        scale: 0.98,
        duration: 0.95,
        ease: editorialEase,
        scrollTrigger: { trigger: ".ab-offer", start: "top 82%", once: true },
      });

      revealHeading(".ab-platforms");

      gsap.from(".ab-platform", {
        autoAlpha: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.9,
        ease: editorialEase,
        scrollTrigger: {
          trigger: ".ab-platform-grid",
          start: "top 84%",
          once: true,
        },
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

      reveal(".ab-founder", ".ab-founder");

      gsap.from(".ab-guarantee-seal, .ab-guarantee-copy", {
        autoAlpha: 0,
        y: 34,
        stagger: 0.12,
        duration: 0.85,
        ease: editorialEase,
        scrollTrigger: {
          trigger: ".ab-guarantee",
          start: "top 84%",
          once: true,
        },
      });

      revealHeading(".ab-faq");

      gsap.from(".ab-faq-item", {
        autoAlpha: 0,
        y: 18,
        stagger: 0.05,
        duration: 0.6,
        scrollTrigger: { trigger: ".ab-faq-list", start: "top 86%", once: true },
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

function reveal(targets: string, trigger: string) {
  gsap.from(targets, {
    autoAlpha: 0,
    y: 26,
    duration: 0.72,
    scrollTrigger: { trigger, start: "top 88%", once: true },
  });
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
