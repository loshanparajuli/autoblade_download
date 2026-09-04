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
      </div>
      <div className="footer-bottom">
        <a href="mailto:losh@fromsilicon.com">
          <img src={asset("desktop-icon-18.svg")} alt="" />
          losh@fromsilicon.com
        </a>
        <span>© 2026, Powered by fromSilicon</span>
        <div>
          <a
            href="https://x.com/@fromsf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="fromSilicon on X"
          >
            <img src={asset("twitter-x.svg")} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}
