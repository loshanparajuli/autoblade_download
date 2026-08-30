/* eslint-disable @next/next/no-img-element */

import { figmaAsset as asset } from "./figma";
import { PARENT_SITE_URL } from "./siteConfig";

/** Same brand block that closes fromsilicon.com, so autoBlade still reads as a
    fromSilicon product. On this domain the wordmark is a real link home —
    there's no shared nav to get back through. */
export function SiteFooter() {
  return (
    <footer className="site-footer" data-animate-section="footer">
      <div className="footer-brand">
        <h2>
          <a href={PARENT_SITE_URL}>fromSilicon</a>
        </h2>
        <p>
          Distribution for VCs and founders. We turn how you think into content
          the right people actually see.
        </p>
        <nav className="footer-links" aria-label="External links">
          <a href={PARENT_SITE_URL}>fromSilicon</a>
          <a
            href="https://substack.com/@fromsilicon"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blogs
          </a>
          <a
            href="https://fromsilicon.notion.site/Onboarding/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Onboarding
          </a>
          <a
            className="footer-hiring"
            href="https://fromsilicon.notion.site/we-are-hiring"
            target="_blank"
            rel="noopener noreferrer"
          >
            We are hiring
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <a href="mailto:losh@fromsilicon.com">
          <img src={asset("desktop-icon-18.svg")} alt="" />
          losh@fromsilicon.com
        </a>
        <span>© 2026 fromSilicon • All rights reserved</span>
        <div>
          <a
            href="https://www.linkedin.com/in/loshanparajuli/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img src={asset("icons8-linkedin.svg")} alt="" />
          </a>
          <a
            href="https://x.com/@fromsf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <img src={asset("twitter-x.svg")} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}
