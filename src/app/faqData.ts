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
    a: "A two-hour podcast takes under two minutes of your work — dropping the files in and picking your options. The system does the rest on its own while you get on with something else. Nothing is queued behind anyone else, because nothing leaves your computer.",
  },
  {
    q: "Does my footage get uploaded anywhere?",
    a: "No. Sync, transcription and speaker detection all run locally on your machine. The only thing that ever leaves is an optional text request to your own AI provider, if you paste in your own API key to unlock the shorts-finding feature.",
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
    q: "It says BETA! How finished is it?",
    a: "Finished enough that it edits real episodes end to end today; unfinished enough that you will find rough edges and I will want to hear about them. The full 1.0 lands in fall 2026, and beta testers get every update in between.",
  },
];