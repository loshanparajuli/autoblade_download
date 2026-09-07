# autoBlade — sales recommendations

Written 6 September 2026, against the site as it stands today (post-pricing-update).
Ordered by expected impact per hour of work, not by how interesting they are.

## Status

| | Item | State |
|---|---|---|
| §0 | Analytics + six funnel events | **Shipped.** Needs `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set in prod to start recording |
| §1 | 57-minute demo | **Placeholder confirmed.** Copy and embed config now sized for the ~60s motion-graphics cut; swap `DEMO_VIDEO` in `page.tsx` when it lands |
| §2a | Freelancer price anchor | **Shipped.** Sits directly under "What it costs" |
| §4 | Surface existing proof | **Partly shipped.** "Hundreds of hours of real recordings" now in the download block. Testimonials still to gather |
| §2b | Comparison table | **Shipped.** Below the plan cards, dated, pricing facts only |
| §3 | Annual billing | **Built, dormant.** Pro AI only. Needs a yearly Dodo product; paste its URL into `plansData.ts` and the line appears |
| §4 | Testimonials + trusted-by | **Built, empty.** Renders nothing until you add real quotes to `socialProofData.ts` |
| §5 | Trial / discount economics | **Shipped.** Trial now on both plans; BETA100 capped at first 100 |
| §6 | Post-download email sequence | Not started |
| §8 | Pro tagline contradiction | **Fixed.** Other two claims still outstanding |
| — | Agency / enterprise contact | **Shipped.** Under the plan cards |

---

## 0. The blocker: you cannot measure any of this yet

There is no analytics in the codebase. No Plausible, no Vercel Analytics, no
PostHog, nothing. Which means:

- You don't know how many people reach the pricing section.
- You don't know whether anyone copies `BETA100`.
- You don't know which of the two "Get" buttons gets clicked.
- You don't know if the 57-minute video is watched for 5 seconds or 5 minutes.

Everything below this line is an informed guess until that changes. **Do this
first.** It is about an hour of work.

Minimum useful event set:

| Event | Where | Shipped |
|---|---|---|
| `demo_view` | walkthrough section, 1/3 of viewport filled | yes |
| `pricing_view` | plan cards section, same rule | yes |
| `coupon_copy` | `CouponChip` click | yes |
| `checkout_click` (with `plan: pro \| pro-ai`) | `AutobladePlans` CTA | yes |
| `download_submit` | `AutobladeDownload` form submit | yes |
| `windows_waitlist` | `AutobladeNotify` submit | yes |

Note: this became `demo_view` rather than `demo_play`. The embed is muted
autoplay, so it is already playing when it arrives — "did they press play" is
not a signal that exists. How far down the page people get is.

Plausible or Vercel Analytics are both fine and both privacy-preserving, which
matters for a product whose entire pitch is "nothing leaves your machine."

---

## 1. The 57-minute autoplaying walkthrough is your biggest leak

`page.tsx` embeds the demo with `autoplay=1&mute=1&loop=1`, and the JSON-LD
records its real length: **`PT57M4S`**. Fifty-seven minutes.

The section copy currently sells this as a virtue:

> "The whole thing, start to finish, with nothing sped up that matters."

That is a promise of a 57-minute commitment, placed directly above the pricing.
The honesty is admirable and the instinct is right, but nobody evaluating a
$29.99 app watches an hour of video first. They bounce, and they bounce *right
before the money*.

**Fix:** cut a 60–90 second version. Three cameras dropped in, the sync landing,
the cut happening, the export. Make that the embed. Keep the long one as a text
link underneath: *"Prefer the unedited 57-minute run? Watch it on YouTube."*
That link is genuinely good proof for the small number of people who want it,
and it costs the other 95% nothing.

This is probably the single highest-impact change on the list.

---

## 2. You are not anchoring the price against anything

Right now a visitor sees `$13.99` and `$29.99` with nothing to compare them to,
so the only comparison available is *zero* — not buying. Give them a better one.

**What the alternatives actually cost (researched, September 2026):**

| Option | Cost | Catch |
|---|---|---|
| Freelance podcast editor | **$150–$500 per episode**; most indies pay $100–$300 | Per episode, forever |
| Descript Creator | $35/mo month-to-month ($24 annual) | **Per seat**, ~10 hrs/mo |
| Descript Business | $65/mo month-to-month | Per seat |
| Riverside Pro | $29/mo month-to-month ($24 annual) | Recording-first |
| Opus Clip Pro | $29/mo | **300 min/mo cap**, shorts only |
| **autoBlade Pro AI** | **$29.99/mo** | Unlimited, on-device, no seats |

Two things fall out of this:

**a) The freelancer line is your strongest sentence and it is not on the site.**
Something like: *"A freelance editor charges $150 to $500 an episode. Pro AI is
$29.99 a month, for as many episodes as you make."* Put it directly above the
plan cards, where the pricing lede is now. One episode pays for five months.

**b) You are priced at parity with Opus Clip and Riverside but you win on the
axes buyers get burned by.** Opus Clip caps at 300 minutes. Descript charges per
seat and per media-hour. Riverside is cloud-first. autoBlade has no cap, no
seats, and no upload. That is a comparison table, and it belongs on the page.

---

## 3. There is no annual plan, and your competitors all push one

Descript and Riverside both discount annual by roughly 30% and lead with it.
You bill monthly only. That costs you three things: cash up front, a much lower
churn rate, and the anchoring effect of showing a struck-through monthly price.

**Suggested:** Pro $139/yr, Pro AI $299/yr — i.e. two months free. Show annual
as the default toggle with monthly available, which is the pattern buyers in
this category already expect.

---

## 4. Zero social proof, and you are sitting on assets you aren't using

The code is scrupulous about this — there's a comment explaining that inventing
an `aggregateRating` would be a fabricated claim. That is the right call and you
should keep it. But "no fake proof" is not the same as "no proof," and you have
real material going unused:

- **The Windows waitlist.** `AutobladeNotify` has been collecting emails. If
  that number is respectable, *"312 people are waiting for the Windows build"*
  is honest, specific demand evidence.
- **Beta tester count.** Same logic. A real number beats an adjective.
- **The LinkedIn post.** It already carries the origin story and it clearly
  resonated. If it has meaningful engagement, the count is proof.
- **"100s of hrs of recording"** — already in the post, buried. That is a
  testing claim worth surfacing near the download button.

**The highest-ROI single addition to this page** is three real quotes from beta
users: name, show name, one sentence, photo. Email your five most active testers
today and ask. Podcasters are a talkative, generous audience and they like being
credited. A card with three faces on it will outperform another paragraph of
copy by a wide margin.

---

## 5. Your incentives all point at the plan that makes no money

Worth looking at as a system:

| | Pro | Pro AI |
|---|---|---|
| Price | $13.99 | $29.99 |
| `BETA100` (100% off) | **Yes** | No |
| 7-day free trial | **Yes** | No |
| Positioned as | the cheap one | "Best value" |

Every incentive on the page pushes toward Pro, and during the beta Pro generates
**$0**. Meanwhile Pro AI — the only plan that can currently produce revenue — has
no trial, no discount, and the higher price.

You may well want exactly this (land free on Pro, upgrade later), and that is a
legitimate funnel. But it only works if the upgrade path is actually built, and
right now there isn't one: no in-app upgrade prompt, no email sequence, no
end-of-trial nudge.

**Pick one deliberately:**

- **Land-and-expand:** keep the incentives on Pro, but build the upgrade path —
  trial-end email, in-app prompt when a user hits the 50-podcast cap, "you ran
  27 episodes this month, Pro AI would have been unlimited."
- **Monetise now:** put the free trial on Pro AI too (or only), so the trial
  feeds the plan that converts to revenue.

Also: `BETA100` has no visible end date. "Limited window" is in the eyebrow but
no deadline is stated, which removes the only reason to act today. A real date
would help — but only state one you intend to honour.

---

## 6. The funnel stops dead after the download

`AutobladeDownload` posts the email to Formspree, then immediately redirects to
the `.dmg`. After that: nothing. No welcome email, no "did it install?", no
upgrade prompt, no re-engagement.

For a beta, **that email list is your sales channel** — it's warmer than any
traffic you can buy. A four-email sequence would cost you an afternoon:

1. **Day 0** — the download link again (people lose it), plus the 3-step
   quickstart and the system requirement in plain language.
2. **Day 2** — "Did your first edit work?" One question, reply-to-founder. This
   doubles as your bug channel and your testimonial source.
3. **Day 7** — the shorts/captions feature, which is the thing people don't
   discover on their own.
4. **Day 14** — the plan comparison, with `BETA100` and its deadline.

You already have the strongest possible sender identity for this: a founder who
writes like the LinkedIn post. Don't let a marketing template near it.

---

## 7. Channels, in the order I'd actually try them

Research consensus for indie desktop apps in 2026 is unambiguous: organic and
community beat paid, and paid installs no longer carry an indie app. Specific to
this product:

1. **LinkedIn, again.** The origin post already worked once. That is your one
   proven channel and it is criminally under-exploited. Post the 90-second demo.
   Post the "$150/episode vs $29.99/month" maths. Post the Windows waitlist
   number. Weekly, in the same voice as the original.
2. **YouTube, with a searchable title.** *"I edited a 2-hour, 3-camera podcast in
   2 minutes"* is a high-intent query pattern with a demonstrable payoff. You
   already have 57 minutes of footage to cut from.
3. **Comparison SEO.** Your technical SEO is genuinely strong already — the
   JSON-LD, `llms.txt` and metadata are better than most funded startups ship.
   The gap is intent pages: `autoBlade vs Descript`, `Descript alternative for
   Mac`, `multicam podcast editor without upload`. These are the highest-intent
   queries in the category and you currently rank for none of them.
4. **Product Hunt.** macOS apps still do well there. Worth one concentrated
   launch, once the 90-second demo exists — not before.
5. **Reddit — carefully.** r/podcasting and r/VideoEditing have hard self-promo
   rules and will remove a pitch. The origin-story format is what passes there:
   lead with the problem, mention the tool once at the end.

I would not spend on ads until you can measure a funnel (§0) and until the
landing page converts (§1, §2, §4).

---

## 8. Claims that need verifying before you scale traffic

Not marketing advice — risk. Each of these is currently asserted at checkout:

- **"Unlimited podcasts"** on Pro AI. The original code comment said the cap was
  deliberately unpublished because "unlimited" would be false. If a ceiling is
  enforced in the app, this is a refund and chargeback liability.
- **"7-day free trial"** on Pro. This is on the button and in the feature list,
  but the site only links to a hosted Dodo checkout — the trial must be
  configured on the Dodo product itself, or buyers are charged immediately after
  being promised otherwise.
- **Pro's tagline contradicts its own feature list.** It reads *"The full editor.
  Sync, transcribe and cut"*, but transcript is now a Pro AI row only. The FAQ
  has the same problem, describing transcription as something the app just does.

Fix these before you drive traffic, not after.

---

## What is already working (don't break it)

- The technical SEO and answer-engine work is excellent and unusual. `llms.txt`
  generated from live data, correct `SoftwareApplication` / `VideoObject` /
  `HowTo` / `FAQPage` markup, honest `uploadDate` and `duration`. Leave it alone.
- The on-device / no-upload angle is a genuine differentiator against every
  competitor listed in §2. It is a privacy story *and* a speed story *and* an
  NDA story. Lean harder on it.
- The founder story is real and specific. That is worth more than any feature
  grid, and most competitors cannot copy it.
- The refusal to fabricate reviews or ratings. Keep refusing.

---

## If you only do four things this week

1. Add analytics with the five events in §0. *(1 hour)*
2. Cut the 90-second demo and swap the embed. *(half a day)*
3. Put the "$150–$500 per episode vs $29.99 a month" line above the plan cards.
   *(15 minutes)*
4. Email five beta testers asking for a one-line quote. *(20 minutes)*

Items 3 and 4 are half an hour combined and are probably worth more than
everything else on this page.

---

## Sources

- [Descript Pricing 2026 — Castmagic](https://www.castmagic.io/blog/descript-pricing)
- [Descript Pricing 2026 — CostBench](https://costbench.com/software/ai-video-generators/descript/)
- [Riverside Pricing 2026 — Fluxnote](https://fluxnote.io/guides/riverside-pricing-guide-2026)
- [Opus Clip Pricing 2026 — Fluxnote](https://fluxnote.io/guides/opus-clip-pricing-2026)
- [OpusClip pricing: what you actually pay — eesel AI](https://www.eesel.ai/blog/opusclip-pricing)
- [Podcast Editor Rates 2026 — WhatShouldICharge](https://whatshouldicharge.io/podcast-editor)
- [How Much Does Podcast Editing Cost? — Rephonic](https://rephonic.com/blog/podcast-editing-cost/)
- [Podcast Video Editing Cost in 2026 — VeedYou](https://www.veedyou.com/podcast-video-editing-cost/)
- [Indie App Marketing: 7 Strategies That Work in 2026 — ApsteQ](https://apsteq.com/blog/indie-app-marketing/)
- [How to Launch on Product Hunt: 2026 Guide for macOS Apps — Screen Charm](https://screencharm.com/blog/how-to-launch-on-product-hunt)
