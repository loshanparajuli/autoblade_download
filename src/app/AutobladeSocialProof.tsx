import { TESTIMONIALS, TRUSTED_BY, type Testimonial } from "./socialProofData";

/**
 * Both components below return null while their data is empty, which is how
 * they ship today. See socialProofData.ts for why they are not pre-filled.
 */

/** Initials, for a testimonial with no photo. Two letters, never more. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function TestimonialCard({ person }: { person: Testimonial }) {
  return (
    <figure className="ab-quote">
      <blockquote>{person.quote}</blockquote>
      <figcaption>
        {person.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="ab-quote-avatar" src={person.avatar} alt="" />
        ) : (
          <span className="ab-quote-avatar ab-quote-initials" aria-hidden="true">
            {initials(person.name)}
          </span>
        )}
        <span className="ab-quote-who">
          <b>{person.name}</b>
          <small>{person.role}</small>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * The "trusted by" strip.
 *
 * Set as a static row, not a scrolling marquee. A marquee is the right shape
 * for twenty logos and the wrong one for three: motion implies a list too long
 * to show at once, so animating a handful of names advertises how few there
 * are. It also reintroduces exactly the kind of ambient movement the hero was
 * cleared of. If this ever passes ten names, revisit that.
 */
export function AutobladeTrustedBy() {
  if (TRUSTED_BY.length === 0) return null;

  return (
    <div className="ab-trusted">
      <p className="ab-trusted-label">Cut with autoBlade</p>
      <ul className="ab-trusted-row">
        {TRUSTED_BY.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export function AutobladeTestimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="ab-quotes" id="reviews">
      <div className="section-heading">
        <p>From the beta</p>
        <h2>What they say</h2>
      </div>
      <div className="ab-quote-grid">
        {TESTIMONIALS.map((person) => (
          <TestimonialCard key={person.name} person={person} />
        ))}
      </div>
      <AutobladeTrustedBy />
    </section>
  );
}
