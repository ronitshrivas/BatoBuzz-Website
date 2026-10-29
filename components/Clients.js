import Icon from "./Icon";
import Wave from "./Wave";

const SECTORS = [
  { icon: "shield", name: "Defence", kicker: "National institution" },
  { icon: "cart", name: "E-commerce", kicker: "Multi-vendor retail" },
  { icon: "megaphone", name: "Advertising", kicker: "International client" },
  { icon: "chart", name: "Trading", kicker: "Order management" },
  { icon: "grad", name: "Coaching", kicker: "Creators & services" },
];

export default function Clients() {
  return (
    <section className="section has-wave" aria-labelledby="clients-title">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow">Who we build for</span>
          <h2 className="section-title" id="clients-title">
            Trusted across very different industries
          </h2>
          <p className="lead">
            From a national institution to overseas startups — we adapt the
            stack to the problem, not the other way around.
          </p>
        </div>
        <div className="grid grid-5">
          {SECTORS.map((s) => (
            <div className="card sector-card" key={s.name}>
              <span className="sector-icon">
                <Icon name={s.icon} />
              </span>
              <div>
                <div className="card-title">{s.name}</div>
                <div className="kicker">{s.kicker}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Wave to="ink" />
    </section>
  );
}
