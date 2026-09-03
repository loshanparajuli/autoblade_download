import { REFUND_DAYS } from "./promo";

/**
 * One source for the FAQ. The accordion renders it and the page turns the same
 * array into FAQPage JSON-LD, so what answer engines quote is exactly what a
 * reader sees — no second, drifting copy of the answers in a script tag.
 */
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What does autoBlade actually do?",
    a: "You give it your host, guest and wide camera files. It lines them up from the audio, transcribes the session, then cuts to whoever is speaking and goes wide when you talk over each other. You get a finished multicam edit plus a transcript, without touching a timeline.",
  },
  {
    q: "How long does a two-hour episode take?",
    a: "About two minutes on an Apple silicon Mac, which is where the tagline comes from. Long sessions and slower machines take longer, and rendering the final file is on top of that. Nothing is queued behind anyone else, because nothing leaves your computer.",
  },
  {
    q: "Does my footage get uploaded anywhere?",
    a: "No. Sync, transcription and speaker detection all run locally on your machine. The only thing that ever leaves is an optional text request to your own AI provider, if you paste in your own API key to unlock the shorts-finding feature.",
  },
  {
    q: "What do I need to run it?",
    a: "A MacBook or Mac with Apple silicon — M1 or later — running a current macOS. Intel Macs are not supported, because the on-device engine leans on the Neural Engine to hit those speeds.",
  },
  {
    q: "Is there a Windows version?",
    a: "Not yet. Windows is on the roadmap and is the single most requested thing so far, but there is no date to promise yet. Join the beta list and you will hear the moment there is a build worth installing.",
  },
  {
    q: "What if I do not like it?",
    a: `Email losh@fromsilicon.com within ${REFUND_DAYS} days of paying and you get your money back, in full, no interrogation. The app is new and this is a fair trade for taking a chance on it.`,
  },
  {
    q: "Do I need an API key?",
    a: "Not on Pro AI. That plan includes everything — sync, transcription, the multicam cut, captions, blunder detection and highlights — with the AI running on our side. All you need is an active licence key: paste it in once and the app is ready to work. Bringing your own key is an option on Pro if you would rather run the AI features through your own provider.",
  },
  {
    q: "Can I fix a cut autoBlade got wrong?",
    a: "Yes. The output is a real edit, not a locked black box, and you can take the render or the transcript into the editor you already use. autoBlade is there to kill the four hours of waveform-matching, not to have the last word on your episode.",
  },
  {
    q: "Does it do vertical shorts and captions?",
    a: "Yes. The same speaker-detection engine reframes to 9:16, and you can burn in captions, drag them where you want them, scale the size and change the colours before exporting.",
  },
  {
    q: "It says beta — how finished is it?",
    a: "Finished enough that it edits real episodes end to end today; unfinished enough that you will find rough edges and I will want to hear about them. The full 1.0 lands in fall 2026, and beta testers get every update in between.",
  },
  {
    q: "Know the developer",
    a: "Losh Parajuli, a software engineer who got tired of spending entire nights matching waveforms for a one-hour conversation and built the tool he wanted instead. He is building autoBlade in public — the post that started it is further up this page. autoBlade ships under fromSilicon.",
  },
];
