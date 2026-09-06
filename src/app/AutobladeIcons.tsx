/**
 * Icons shared across the server-rendered sections and the client-side forms.
 *
 * The Apple mark used to live inline in AutobladeSections' `icon` map, which
 * meant the download form (a client component) could not reach it and its
 * button was the one "Download" on the page with no platform mark on it.
 */

/** Solid Apple logo on the same 24x24 grid as the feature icons. */
export function AppleMark({ className = "ab-apple-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16.7 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.4-1-2.5-3.5ZM14.5 5.3c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 0 2.1-.5 2.7-1.3Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
