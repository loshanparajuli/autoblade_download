/** The post, as written. Kept as data so the copy stays readable and the
    blank lines between thoughts survive — LinkedIn's rhythm is the point. */
const POST = [
  "several weeks back, I was spending several nights on an edit of a standard one-on-one podcast. A week later, I was staring down the exact same tedious project. I was so frustrated by the repetition...all I was really doing was seeing the audio level and cutting out the dead space. That should be a machine's job, not mine.",
  "i then looked into existing software, but everything was clearly built by people who had never sat through the work.....(sadly)",
  'so, we decided to build our own and called it "autoBlade". autoBlade works for any form of podcasting setup in existence all the way from Multicam to Shorts.',
  "The app has a very simple UI with very few knobs to tweak, and does just one thing at its core! But at its best.",
  "today, we have a fully working prototype. More than Prototype. I have fine tuned with 100s hrs worth of recording, internal testing and testing.",
  "This will either end up big or crash and burn.",
];

/**
 * The founder's LinkedIn post, rendered as if the reader had LinkedIn open
 * inside the app. Everything around the post is deliberately a skeleton — grey
 * blocks standing in for the nav and the rails — so the frame reads as "a page
 * we're showing you a slice of" rather than as a fake LinkedIn nobody can
 * click. Only the post itself is real content.
 */
export function AutobladeLinkedInPost() {
  return (
    <figure className="ab-li">
      <div className="ab-li-chrome">
        <div className="ab-li-bar">
          <span className="ab-window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="ab-li-url" aria-hidden="true">
            linkedin.com/in/loshanparajuli
          </span>
        </div>

        <div className="ab-li-body">
          {/* Left rail — skeleton only. */}
          <aside className="ab-li-rail ab-li-rail-left" aria-hidden="true">
            <span className="sk sk-avatar" />
            <span className="sk sk-line" />
            <span className="sk sk-line sk-short" />
            <span className="sk sk-block" />
            <span className="sk sk-line" />
            <span className="sk sk-line sk-short" />
          </aside>

          <article className="ab-li-post">
            <header className="ab-li-head">
              <span className="ab-li-avatar" aria-hidden="true">
                LP
              </span>
              <div className="ab-li-meta">
                <p className="ab-li-name">
                  Losh
                  <span className="ab-li-badge" aria-hidden="true">
                    in
                  </span>
                  <span className="ab-li-you">· You</span>
                </p>
                <p className="ab-li-role">Producer @fromSilicon</p>
                <p className="ab-li-sub">1w · Edited · 🌐</p>
              </div>
              <span className="ab-li-dots" aria-hidden="true">
                •••
              </span>
            </header>

            <div className="ab-li-copy">
              {POST.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </article>

          <aside className="ab-li-rail ab-li-rail-right" aria-hidden="true">
            <span className="sk sk-block" />
            <span className="sk sk-line" />
            <span className="sk sk-line sk-short" />
            <span className="sk sk-block sk-tall" />
          </aside>
        </div>
      </div>
    </figure>
  );
}
