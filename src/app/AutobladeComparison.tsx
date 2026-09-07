/* eslint-disable @next/next/no-img-element */

import {
  CAPABILITIES,
  CHECKED_ON,
  COMPARISON_ROWS,
  RIVALS,
} from "./comparisonData";

/**
 * The price comparison, as a real table, plus autoBlade's own capability list.
 *
 * It sits below the plan cards rather than above them: the cards are the thing
 * being sold, and a reader who has already decided should not have to scroll
 * past a competitor's name to reach a checkout button. This is for the reader
 * who is still weighing it up.
 *
 * A <table> and not a grid of divs, because it *is* tabular data — a screen
 * reader announcing "Descript Creator, per month, $35" is only possible if the
 * row and column headers are marked up as headers.
 */
export function AutobladeComparison() {
  return (
    <div className="ab-compare">
      <div className="ab-compare-head">
        <p className="ab-compare-title">How that compares</p>
        {/* The table's punchline, stated before the table. Five rows by five
            columns is a lot to ask of someone who has not yet decided they
            care; this is the sentence they can leave with if they read
            nothing else. Everything in it is readable straight off the grid
            below, so the two can never disagree. */}
        <p className="ab-compare-tldr">
          Roughly the same money. The difference is the fine print: no seat
          count, no monthly ceiling, no upload.
        </p>
      </div>

      {/* The table is wider than a phone. It scrolls inside this wrapper so the
          page body never scrolls sideways. tabindex makes the scroll region
          reachable by keyboard, which is required once a region scrolls. */}
      <div
        className="ab-compare-scroll"
        tabIndex={0}
        role="group"
        aria-label="Price comparison"
      >
        <table className="ab-compare-table">
          <caption className="ab-sr-only">
            autoBlade Pro AI compared with Descript, Riverside and Opus Clip on
            price, billing model, monthly volume, whether footage is uploaded
            and whether it runs offline.
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="ab-sr-only">Feature</span>
              </th>
              {RIVALS.map((rival) => (
                <th
                  scope="col"
                  key={rival.id}
                  className={rival.isUs ? "is-us" : undefined}
                >
                  <span className="ab-compare-brand">
                    {/* Our own mark is the real thing; the rivals get a neutral
                        monogram rather than a trademark we have no licence to
                        host. See comparisonData for the reasoning. */}
                    {rival.isUs ? (
                      <img
                        className="ab-compare-logo"
                        src="/autoblade.png"
                        alt=""
                        width={20}
                        height={20}
                      />
                    ) : (
                      <span className="ab-compare-mark" aria-hidden="true">
                        {rival.mark}
                      </span>
                    )}
                    {rival.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                {RIVALS.map((rival) => (
                  <td
                    key={rival.id}
                    className={rival.isUs ? "is-us" : undefined}
                  >
                    {rival[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dated on purpose. Rival pricing moves, and an undated comparison is
          one price change away from being a false claim. */}
      <p className="ab-compare-note">
        Competitor list prices, {CHECKED_ON}. Check theirs before you decide.
      </p>

      {/* Capabilities, not comparisons — every line here is a claim about
          autoBlade only. */}
      <div className="ab-capability">
        <p className="ab-capability-title">Everything Pro AI does</p>
        <ul className="ab-capability-grid">
          {CAPABILITIES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
