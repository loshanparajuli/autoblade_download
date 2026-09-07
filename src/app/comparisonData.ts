/**
 * How autoBlade prices against the tools people actually weigh it against.
 *
 * Two rules govern what may go in this file, because this is comparative
 * advertising about named companies on a page that takes money:
 *
 *   1. Every cell is a *pricing or delivery* fact — list price, seat model,
 *      volume cap, whether footage is uploaded. Those are published, checkable
 *      and stable. Feature-quality judgements ("better cuts", "limited
 *      multicam") are not in here on purpose: they are arguable, they date
 *      badly, and being wrong about a competitor's feature set is how a
 *      comparison table turns into a legal letter.
 *   2. Rival pricing moves. `CHECKED_ON` is rendered on the page next to the
 *      table so a reader knows how fresh it is. When you revisit these numbers,
 *      move that date. If it goes stale, delete the table rather than leave
 *      figures the vendors no longer charge.
 *
 * Figures below are month-to-month list prices as published in September 2026.
 * Descript and Riverside are both cheaper on annual billing; that is noted in
 * the price cell rather than hidden, because quoting a rival's worst number
 * while showing your own best one is the thing that makes these tables
 * untrustworthy.
 */

export const CHECKED_ON = "September 2026";

export type Rival = {
  id: string;
  name: string;
  /** Set on autoBlade's own column so the table can lift it out. */
  isUs?: boolean;
  /**
   * One or two letters, drawn as a monogram in the column head.
   *
   * Not the rivals' real logos, deliberately. Those are trademarked assets we
   * have no licence to host, and lifting a competitor's mark onto a page that
   * sells against it is the kind of thing that draws a takedown rather than a
   * customer. autoBlade's column uses its own real logo; everyone else gets a
   * neutral monogram, which is honest and keeps the row visually even.
   */
  mark: string;
  price: string;
  /** Charged per person, or once for the account? */
  seats: string;
  /** How much you may run through it in a month. */
  cap: string;
  /** Does the footage leave the machine it was recorded on? */
  upload: string;
  /** Can it run with the wifi off? */
  offline: string;
};

export const RIVALS: Rival[] = [
  {
    id: "autoblade",
    name: "autoBlade Pro AI",
    isUs: true,
    mark: "aB",
    price: "$29.99",
    // "One price, whole account" wrapped to two lines in this column and made
    // the row twice as tall as its neighbours. "Whole account" is shorter and
    // a sharper opposite of "Per seat", which is the contrast that matters.
    seats: "Whole account",
    cap: "Unlimited",
    upload: "Never leaves your Mac",
    offline: "Yes, fully offline",
  },
  {
    id: "descript",
    name: "Descript Creator",
    mark: "D",
    price: "$35 ($24 annual)",
    seats: "Per seat",
    cap: "~10 hrs per seat",
    upload: "Uploaded to cloud",
    offline: "Internet required",
  },
  {
    id: "riverside",
    name: "Riverside Pro",
    mark: "R",
    price: "$29 ($24 annual)",
    seats: "Per seat",
    cap: "Plan limits apply",
    upload: "Uploaded to cloud",
    offline: "Internet required",
  },
  {
    id: "opusclip",
    name: "Opus Clip Pro",
    mark: "O",
    price: "$29",
    seats: "One price",
    cap: "300 min per month",
    upload: "Uploaded to cloud",
    offline: "Internet required",
  },
];

export const COMPARISON_ROWS: {
  label: string;
  key: keyof Pick<Rival, "price" | "seats" | "cap" | "upload" | "offline">;
}[] = [
  { label: "Per month", key: "price" },
  { label: "Billing", key: "seats" },
  { label: "Monthly volume", key: "cap" },
  { label: "Your footage", key: "upload" },
  // Last because it is the one nobody else can answer. All three rivals are
  // hosted services: there is no build of them that runs with the wifi off.
  { label: "Works offline", key: "offline" },
];

/**
 * What Pro AI does, listed on its own.
 *
 * This is a capability list, NOT a comparison, and it is separate from the
 * table above for one reason: stating "Descript: no blunder detection" means
 * asserting a fact about somebody else's product that changes every release
 * and that we have not verified. Being wrong about a rival's feature set is
 * how a comparison table becomes a legal letter.
 *
 * So the table compares the four things that are published, checkable and
 * stable — price, billing model, volume, where the footage goes, whether it
 * runs offline — and this strip says what autoBlade does without putting words
 * in anyone else's mouth. Add to it freely; every line only has to be true of
 * autoBlade.
 */
export const CAPABILITIES: string[] = [
  "Automatic multicam sync",
  "Cuts to whoever is talking",
  "Blunder detection",
  "Highlights detection",
  "Multicam 9:16 shorts",
  "Transcription export",
  "Editable burned-in captions",
  "Bring your own API key",
  "Runs on the Neural Engine",
  "No account needed to edit",
];
