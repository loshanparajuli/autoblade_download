"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * A slide either renders a real screenshot (`image`) or the illustrated stage
 * below it. The illustrations are drawn from the same primitives as the
 * walkthrough embed, so a real PNG can replace one slide at a time without the
 * carousel suddenly reading as two different products.
 *
 * To swap in real captures: drop a PNG in /public/screenshots and set `image`.
 */
type Slide = {
  id: string;
  step: string;
  title: string;
  copy: string;
  image?: string;
  stage: ReactNode;
};

const AUTOPLAY_MS = 5200;

/* ---------------- illustrated stages ---------------- */

/** Deterministic bar heights — Math.random() here would mismatch on hydration. */
const WAVE_STEPS = [34, 64, 88, 46, 72, 28, 96, 52, 40, 78, 30, 90, 58, 44, 84, 36];

function Waveform({ tone, count = 32 }: { tone: string; count?: number }) {
  return (
    <div className={`shot-wave shot-wave-${tone}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} style={{ height: `${WAVE_STEPS[i % WAVE_STEPS.length]}%` }} />
      ))}
    </div>
  );
}

function ImportStage() {
  return (
    <div className="shot-import" aria-hidden="true">
      {(["Host", "Guest", "Wide"] as const).map((label, i) => (
        <div
          key={label}
          className={`shot-slot shot-slot-${label.toLowerCase()}`}
          style={{ animationDelay: `${i * 0.5}s` }}
        >
          <span className="shot-file" />
          <span className="shot-slot-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function SyncStage() {
  return (
    <div className="shot-sync" aria-hidden="true">
      <div className="shot-sync-rows">
        <Waveform tone="host" />
        <Waveform tone="guest" />
        <Waveform tone="wide" />
      </div>
      <p className="shot-sync-badge">◆ Locked in sync · 0.008s drift</p>
    </div>
  );
}

function CutStage() {
  const segments = [
    { tone: "host", width: 22 },
    { tone: "guest", width: 18 },
    { tone: "wide", width: 13 },
    { tone: "guest", width: 21 },
    { tone: "host", width: 26 },
  ];
  return (
    <div className="shot-cut" aria-hidden="true">
      <div className="shot-cut-cams">
        {(["Host", "Guest", "Wide"] as const).map((label) => (
          <span key={label} className={`shot-cam shot-cam-${label.toLowerCase()}`}>
            {label}
          </span>
        ))}
      </div>
      <div className="shot-track">
        {segments.map((seg, i) => (
          <span
            key={i}
            className={`shot-seg shot-seg-${seg.tone}`}
            style={{ width: `${seg.width}%` }}
          />
        ))}
        <span className="shot-playhead" />
      </div>
      <div className="shot-transcript">
        <p><b>Host</b> so the thing nobody tells you is—</p>
        <p><b>Guest</b> right, and that&rsquo;s exactly where it breaks.</p>
      </div>
    </div>
  );
}

function CaptionStage() {
  return (
    <div className="shot-caption" aria-hidden="true">
      <div className="shot-phone">
        <span className="shot-phone-head" />
        <span className="shot-capbar">this changes everything</span>
      </div>
      <div className="shot-caption-controls">
        <span className="shot-control" />
        <span className="shot-control" />
        <span className="shot-control" />
        <span className="shot-control shot-control-short" />
      </div>
    </div>
  );
}

function ExportStage() {
  return (
    <div className="shot-export" aria-hidden="true">
      <div className="shot-export-ring">
        <span className="shot-export-pct">100%</span>
      </div>
      <div className="shot-export-rows">
        <p><span className="shot-tick" />podcast-ep-14.mp4 · 16:9 master</p>
        <p><span className="shot-tick" />shorts-01.mp4 · 9:16 captioned</p>
        <p><span className="shot-tick" />transcript.srt</p>
      </div>
    </div>
  );
}

const SLIDES: Slide[] = [
  {
    id: "import",
    step: "01 · Import",
    title: "Drop in three cameras",
    copy: "Host, guest and the wide shot. Any lengths, any offsets, no naming convention to memorise.",
    stage: <ImportStage />,
  },
  {
    id: "sync",
    step: "02 · Sync",
    title: "They line themselves up",
    copy: "autoBlade slides every angle onto one clock from the audio alone, then transcribes the whole session on your Mac.",
    stage: <SyncStage />,
  },
  {
    id: "cut",
    step: "03 · Cut",
    title: "The cut follows the talking",
    copy: "It picks the active speaker frame by frame and goes wide when you talk over each other, the way a human editor would.",
    stage: <CutStage />,
  },
  {
    id: "captions",
    step: "04 · Shorts",
    title: "Reframe and caption",
    copy: "Same engine, 9:16. Burn in captions, drag them where you want them, scale, restyle, done.",
    stage: <CaptionStage />,
  },
  {
    id: "export",
    step: "05 · Export",
    title: "Ship the whole set",
    copy: "A finished 16:9 master, your shorts, and the transcript — rendered locally and dropped in a folder.",
    stage: <ExportStage />,
  },
];

/* ---------------- carousel ---------------- */

export function AutobladeCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay stops on hover, focus, tab-away and prefers-reduced-motion — a
  // carousel that keeps moving while someone is reading a slide is hostile.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  const active = SLIDES[index];

  return (
    <div
      className="ab-carousel"
      ref={regionRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="autoBlade screens"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="ab-window">
        <div className="ab-window-bar">
          <span className="ab-window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="ab-window-title">autoBlade — {active.title}</span>
          <span className="ab-window-badge" aria-hidden="true">
            on-device
          </span>
        </div>

        <div className="ab-window-body">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className={`ab-slide${i === index ? " is-active" : ""}`}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              {slide.image ? (
                <img
                  className="ab-slide-shot"
                  src={slide.image}
                  alt={`autoBlade: ${slide.title}`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ) : (
                slide.stage
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="ab-carousel-caption">
        <p className="ab-carousel-step">{active.step}</p>
        <h3 className="ab-carousel-title">{active.title}</h3>
        <p className="ab-carousel-copy">{active.copy}</p>
      </div>

      <div className="ab-carousel-controls">
        <button
          type="button"
          className="ab-carousel-arrow"
          onClick={() => go(index - 1)}
          aria-label="Previous screen"
        >
          ←
        </button>
        <div className="ab-carousel-dots">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`ab-carousel-dot${i === index ? " is-on" : ""}`}
              onClick={() => go(i)}
              aria-label={`Show ${slide.title}`}
              aria-current={i === index ? "true" : undefined}
            >
              <span
                className="ab-carousel-dot-fill"
                style={{
                  animationDuration: `${AUTOPLAY_MS}ms`,
                  animationPlayState: i === index && !paused ? "running" : "paused",
                }}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="ab-carousel-arrow"
          onClick={() => go(index + 1)}
          aria-label="Next screen"
        >
          →
        </button>
      </div>
    </div>
  );
}
