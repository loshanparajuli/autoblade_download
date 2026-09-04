/**
 * One source for the feature list. The features grid renders it, the page
 * turns it into SoftwareApplication `featureList`, and llms.txt reproduces it
 * for answer engines — so what a crawler is told the app does is exactly what
 * a reader is shown, with no second copy to drift.
 *
 * `id` maps to an icon in AutobladeSections; the icons stay there because they
 * are JSX and this file is imported by plain-text routes too.
 */
export type Feature = {
  id: "sync" | "cut" | "wave" | "chip" | "shield" | "vertical";
  title: string;
  copy: string;
};

export const FEATURES: Feature[] = [
  {
    id: "sync",
    title: "Sync that just happens",
    copy: "Three cameras or more, all with different start times and lengths. autoBlade reads the audio and puts them on one clock — no clapperboard, no timecode box, no dragging.",
  },
  {
    id: "cut",
    title: "It cuts to whoever's talking",
    copy: "Speaker detection drives the switch, frame by frame. When you both jump in, it goes wide, then comes back. That's the four boring hours, gone.",
  },
  {
    id: "wave",
    title: "Every word, transcribed",
    copy: "A full transcript of the session comes out the other side, timed to the edit. Search it, quote it, ship it as subtitles.",
  },
  {
    id: "chip",
    title: "On-device, on Apple silicon",
    copy: "Built for the Neural Engine. A two-hour episode turns around in about two minutes, with no upload bar and no render queue you're waiting behind.",
  },
  {
    id: "shield",
    title: "Your footage never leaves",
    copy: "No cloud step. No account required to edit. Unreleased interviews and NDA'd guests stay on the drive they were recorded to.",
  },
  {
    id: "vertical",
    title: "Shorts, from the same cut",
    copy: "The same engine reframes to 9:16 and follows the speaker vertically. Burn in captions, drag, scale, restyle — then export the set.",
  },
];
