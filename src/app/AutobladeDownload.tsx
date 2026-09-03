"use client";

import { useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_URL = "https://formspree.io/f/mjybqewk";
// Resolves to the .dmg of whatever release is tagged "Latest" on GitHub.
const DMG_URL = "/api/download";

type Status = "idle" | "loading" | "error" | "done";

export function AutobladeDownload() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: trimmed,
          message: "autoBlade beta download / early access request",
        }),
      });

      if (!res.ok) throw new Error("request failed");

      window.location.assign(DMG_URL);
      setStatus("done");
      setMessage(
        "autoBlade is currently in beta — your download has started. We've noted your interest for early access. The full application launches this fall 2026."
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const buttonLabel = status === "loading" ? "Sending…" : "Download (BETA)";

  return (
    <form className="ab-download" onSubmit={handleSubmit} noValidate>
      <div className="ab-field-row">
        <input
          className="ab-input"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="yourname@mail.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          disabled={status === "loading"}
        />
        <div className="ab-download-btn-wrap">
          <button
            className="dark-cta ab-download-btn"
            type="submit"
            disabled={status === "loading"}
          >
            {buttonLabel}
          </button>
        </div>
      </div>

      <p
        className={`ab-download-note${status === "error" ? " err" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message ||
          "Runs only on Apple silicon MacBooks (M1 or later), on macOS"}
      </p>
    </form>
  );
}
