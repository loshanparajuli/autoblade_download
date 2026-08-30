import { ImageResponse } from "next/og";

import { SITE_NAME } from "./siteConfig";

// Route segment config
export const alt = `${SITE_NAME} | an AI multicam podcast app for Mac`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image generation
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            The edit that cuts itself.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 34,
              color: "#a3a3a3",
              maxWidth: 820,
            }}
          >
            An AI multicam podcast app for Mac. Syncs your cameras, transcribes
            every word, cuts to whoever is talking — all on-device.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
