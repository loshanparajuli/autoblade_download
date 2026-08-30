import { NextResponse } from "next/server";

const REPO = "loshanparajuli/autoBlade-releases";
const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;

// Cache the lookup so a burst of downloads doesn't burn GitHub's rate limit.
const REVALIDATE = 600;

type Release = {
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
};

function pickDmg(assets: Release["assets"]) {
  const dmgs = assets.filter((a) => a.name.toLowerCase().endsWith(".dmg"));
  if (dmgs.length === 0) return null;
  // Prefer an explicit Apple silicon build when several .dmg files ship.
  const arm = dmgs.find((a) => /arm64|aarch64|apple[-_]?silicon/i.test(a.name));
  return (arm ?? dmgs[0]).browser_download_url;
}

// Primary: the release API gives us the exact asset name, whatever it's called.
async function fromApi() {
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return null;
  const release = (await res.json()) as Release;
  return pickDmg(release.assets ?? []);
}

// Fallback: /releases/latest is a plain 302 to the tag, and isn't rate limited.
// Costs us an assumption about the file name (autoBlade-<version>.dmg).
async function fromTagRedirect() {
  const res = await fetch(RELEASES_PAGE, {
    redirect: "manual",
    next: { revalidate: REVALIDATE },
  });
  const location = res.headers.get("location");
  const tag = location?.split("/tag/")[1];
  if (!tag) return null;
  const version = tag.replace(/^v/, "");
  return `https://github.com/${REPO}/releases/download/${tag}/autoBlade-${version}.dmg`;
}

export async function GET() {
  let url: string | null = null;

  try {
    url = (await fromApi()) ?? (await fromTagRedirect());
  } catch {
    url = null;
  }

  // Last resort: send them to the releases page so the download is never a dead end.
  return NextResponse.redirect(url ?? RELEASES_PAGE, {
    status: 302,
    headers: { "Cache-Control": "no-store" },
  });
}
