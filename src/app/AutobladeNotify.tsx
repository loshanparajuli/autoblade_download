"use client";

import { useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Separate Formspree endpoint from the beta download list, so "tell me when
    Windows ships" doesn't get mixed into the Mac early-access replies. */
const FORMSPREE_URL = "https://formspree.io/f/mppzryba";

type Status = "idle" | "loading" | "error" | "done";

export function AutobladeNotify() {
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
          message: "autoBlade for Windows — notify me at launch",
        }),
      });

      if (!res.ok) throw new Error("request failed");

      setStatus("done");
      setEmail("");
      setMessage("You're on the Windows list. You'll hear the day there's a build.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="ab-notify" onSubmit={handleSubmit} noValidate>
      <div className="ab-notify-row">
        <input
          className="ab-input"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-label="Email address for Windows availability"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "loading") {
              setStatus("idle");
              setMessage("");
            }
          }}
          disabled={status === "loading"}
        />
        <button
          className="ab-ghost-cta ab-notify-btn"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending…" : "Notify me"}
        </button>
      </div>
      <p
        className={`ab-notify-note${status === "error" ? " err" : ""}${
          status === "done" ? " ok" : ""
        }`}
        role="status"
        aria-live="polite"
      >
        {message || "One email, when there's something to install."}
      </p>
    </form>
  );
}
