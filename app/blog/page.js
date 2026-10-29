import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Blog — BatoBuzz Software",
  description:
    "Notes on building production software — architecture, process, and lessons from the field, from the BatoBuzz Software team.",
};

// Starter posts — replace with your own, and point `href` at each real post.
const POSTS = [
  {
    title: "Why we build server-authoritative logic",
    date: "Coming soon",
    tag: "Architecture",
    excerpt:
      "The client is convenient but not trustworthy. Here's why pricing, auth, and transactions belong on the server — and how we structure them.",
    href: "#",
  },
  {
    title: "Shipping two apps on one backend",
    date: "Coming soon",
    tag: "Platforms",
    excerpt:
      "Running a customer app and a merchant app off a single source of truth: the trade-offs, the shared models, and keeping both in sync in real time.",
    href: "#",
  },
  {
    title: "From prototype to production: how we run a build",
    date: "Coming soon",
    tag: "Process",
    excerpt:
      "Discovery, a prototype you can feel, incremental delivery with weekly check-ins, then deploy and maintain. A look at how a project actually runs.",
    href: "#",
  },
];

export default function BlogPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Blog"
        title="Notes on building software"
        subtitle="Architecture, process, and lessons from the field."
      />

      <section className="section">
        <div className="wrap">
          <div className="grid grid-3">
            {POSTS.map((p) => (
              <a className="card post-card" href={p.href} key={p.title}>
                <div className="post-meta">
                  <span className="badge badge-sector">{p.tag}</span>
                  <span>{p.date}</span>
                </div>
                <div className="card-title">{p.title}</div>
                <p className="post-excerpt">{p.excerpt}</p>
                <span className="read-more">
                  Read more
                  <Icon name="arrow" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to work with us?"
        text="We'd rather build your product than just write about it. Let's talk."
      />
    </main>
  );
}
