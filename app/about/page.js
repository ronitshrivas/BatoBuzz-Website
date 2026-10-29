import PageHero from "@/components/PageHero";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export const metadata = {
  title: "About — BatoBuzz Software",
  description:
    "BatoBuzz Software (Batobaj Technology) is a full-stack development studio in Tulsipur, Nepal, building and running production apps end to end.",
};

const VALUES = [
  {
    icon: "rocket",
    title: "Production-first",
    text: "We build for real users from day one — not demos. Every project is meant to ship, run, and hold up under load.",
  },
  {
    icon: "security",
    title: "Server-authoritative",
    text: "Critical logic lives on the backend. Pricing, auth, and transactions are decided on the server, not trusted to the client.",
  },
  {
    icon: "layers",
    title: "Full-stack, in-house",
    text: "One team from UI to database. No hand-offs between vendors — the people designing the screens also build the APIs.",
  },
  {
    icon: "wrench",
    title: "Long-term partners",
    text: "We stay after launch with CI/CD, monitoring, and support, because software is a living thing, not a one-off delivery.",
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About us"
        title="A studio that builds software people depend on"
        subtitle="BatoBuzz Software is the development studio of Batobaj Technology, based in Tulsipur, Lumbini, Nepal."
      />

      <section className="section">
        <div className="wrap">
          <div className="prose">
            <p>
              We are a full-stack software studio. We design, build, and
              maintain production applications end to end — mobile apps, web
              apps, and the backends and infrastructure behind them.
            </p>
            <p>
              Our work spans very different industries: a security-management
              platform for a national institution, a multi-vendor e-commerce and
              repair marketplace, an advertising platform for an overseas client,
              order-management tooling for a trading business, and coaching and
              services websites for creators. We also build and run our own
              products, which is where a lot of our platform patterns come from.
            </p>
            <p>
              Alongside client work, we invest in the local developer community
              in Nepal through hands-on workshops — because the best way to raise
              the bar is to help more people clear it.
            </p>
          </div>
        </div>
      </section>

      <Stats />

      <section className="section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">What we believe</span>
            <h2 className="section-title">How we approach every build</h2>
          </div>
          <div className="grid grid-2">
            {VALUES.map((v) => (
              <div className="card" key={v.title}>
                <span className="sector-icon">
                  <Icon name={v.icon} />
                </span>
                <div className="card-title" style={{ marginTop: 16 }}>
                  {v.title}
                </div>
                <p className="card-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process wave="ink" />
      <CtaBand />
    </main>
  );
}
