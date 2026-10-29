import Icon from "./Icon";
import Wave from "./Wave";

const CHECKS = [
  {
    lead: "Two apps, one platform.",
    rest: " A customer app and a merchant app sharing a single backend and data model.",
  },
  {
    lead: "Server-authoritative logic on .NET 7.",
    rest: " Pricing, availability, and transactions are decided on the server, not the client.",
  },
  {
    lead: "Real-time via Firebase/Firestore.",
    rest: " Live updates and notifications so both sides stay in sync instantly.",
  },
];

// Illustrative rows only — NOT real data.
const ROWS = [
  { initials: "RS", name: "Reservation #RS-204", meta: "Tulsipur · 2 guests", status: "Confirmed", cls: "pill-confirmed" },
  { initials: "KT", name: "Reservation #KT-198", meta: "Lumbini · 4 guests", status: "Pending", cls: "pill-pending" },
  { initials: "BP", name: "Reservation #BP-187", meta: "Butwal · 1 guest", status: "Done", cls: "pill-done" },
];

export default function Featured() {
  return (
    <section className="section-ink section has-wave" aria-labelledby="featured-title">
      <div className="glow" />
      <div className="wrap above">
        <div className="featured-grid">
          <div>
            <span className="eyebrow">Our flagship</span>
            <h2 className="section-title" id="featured-title">
              BatoBuzz — our flagship marketplace
            </h2>
            <p className="lead">
              A Nepali marketplace platform we designed, built, and run
              ourselves. It is the clearest example of how we think about
              production software: two coordinated apps, a single source of
              truth on the server, and real-time updates across both.
            </p>
            <div className="check-list">
              {CHECKS.map((c) => (
                <div className="check-item" key={c.lead}>
                  <span className="tick">
                    <Icon name="check" />
                  </span>
                  <span className="ct">
                    <b>{c.lead}</b>
                    {c.rest}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mockup" aria-hidden="true">
            <div className="mockup-head">
              <div>
                <div className="mh-title">BatoBuzz</div>
                <div className="mh-sub">Reservations &amp; activity</div>
              </div>
              <span className="badge badge-live">
                <span className="dot" />
                Live
              </span>
            </div>
            <div className="mockup-rows">
              {ROWS.map((r) => (
                <div className="mock-row" key={r.name}>
                  <div className="mr-left">
                    <span className="avatar">{r.initials}</span>
                    <div>
                      <div className="mr-name">{r.name}</div>
                      <div className="mr-meta">{r.meta}</div>
                    </div>
                  </div>
                  <span className={`pill ${r.cls}`}>{r.status}</span>
                </div>
              ))}
            </div>
            <div className="mockup-note">Illustrative UI — not live data</div>
          </div>
        </div>
      </div>
      <Wave to="bg" />
    </section>
  );
}
