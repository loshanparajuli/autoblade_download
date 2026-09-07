/**
 * One source for the feature list. The features grid renders it, the page
 * turns it into SoftwareApplication `featureList`, and llms.txt reproduces it
 * for answer engines — so what a crawler is told the app does is exactly what
 * a reader is shown, with no second copy to drift.
 *
 * `id` maps to an icon in AutobladeSections; the icons stay there because they
 * are JSX and this file is imported by plain-text routes too.
 *
 * Each entry is split into `lead` and `copy` rather than one paragraph. Six
 * cells of three-line grey prose read as a wall: everything is the same size,
 * the same colour and the same weight, so there is nothing for the eye to land
 * on and the grid gets skimmed to nothing. The lead is the sentence that would
 * survive if the reader only took one line from the card, so it is set in ink
 * and the supporting detail stays muted underneath it.
 *
 * Keep leads under about ten words. If a lead needs a comma splice to fit, it
 * is doing the copy's job and belongs below.
 */
export type Feature = {
  id: "sync" | "cut" | "wave" | "chip" | "shield" | "vertical";
  title: string;
  /** The one line worth reading. Ink, short. */
  lead: string;
  /** The detail behind it. Muted. */
  copy: string;
};

export const FEATURES: Feature[] = [
  {
    id: "sync",
    title: "Sync that just happens",
    lead: "Three cameras, three start times, one clock.",
    copy: "autoBlade reads the audio and lines them up. No clapperboard, no timecode box, no dragging.",
  },
  {
    id: "cut",
    title: "It cuts to whoever's talking",
    lead: "Speaker detection drives the switch, frame by frame.",
    copy: "When you both jump in it goes wide, then comes back. That is the four boring hours, gone.",
  },
  {
    id: "wave",
    title: "Every word, transcribed",
    lead: "A full transcript, timed to the edit.",
    copy: "Search it, quote it, ship it as subtitles.",
  },
  {
    id: "chip",
    title: "On-device, on Apple silicon",
    lead: "Two hours of footage, turned around in about two minutes.",
    copy: "Built for the Neural Engine. No upload bar, no render queue you are waiting behind.",
  },
  {
    id: "shield",
    title: "Your footage never leaves",
    lead: "No cloud step, and no account needed to edit.",
    copy: "Unreleased interviews and NDA'd guests stay on the drive they were recorded to.",
  },
  {
    id: "vertical",
    title: "Shorts, from the same cut",
    lead: "The same engine reframes to 9:16 and follows the speaker.",
    copy: "Burn in captions, drag, scale, restyle, then export the set.",
  },
];
