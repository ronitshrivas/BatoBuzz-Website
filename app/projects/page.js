import PageHero from "@/components/PageHero";
import CaseStudies from "@/components/CaseStudies";
import CtaBand from "@/components/CtaBand";

export const metadata = {
  title: "Projects — BatoBuzz Software",
  description:
    "Platforms and apps BatoBuzz Software has delivered across defence, e-commerce, advertising, trading, coaching, and more.",
};

const PROJECTS = [
  { name: "Secure Officer Vault", sector: "Defence", live: false, text: "Security-management platform for a national institution — device management, 2FA, RBAC, and a hash-chain audit log.", stack: ".NET 7 · PostgreSQL · Flutter" },
  { name: "BatoBuzz", sector: "Marketplace", live: true, text: "Our flagship marketplace — coordinated customer and merchant apps over a shared, server-authoritative backend.", stack: "Flutter · .NET 7 · Firestore" },
  { name: "SabMero", sector: "E-commerce", live: true, text: "Multi-vendor e-commerce and repair platform with vendor KYC, commission settlement, and QR payments.", stack: "Flutter · .NET 7 · PostgreSQL" },
  { name: "AdvertTech", sector: "Advertising", live: false, text: "Unfinished ad-business app taken to a launch-ready MVP for an overseas client, with Meta/Google/TikTok ad integrations.", stack: "Flutter · Node.js" },
  { name: "OrderBoard", sector: "Trading", live: false, text: "Real-time order-management system built for a trading-business client.", stack: "Flutter · Real-time" },
  { name: "Grow With Roja", sector: "Coaching", live: false, text: "Coaching website for a creator, with content and booking flows.", stack: "Next.js 14 · Firebase" },
  { name: "RentHive", sector: "Rentals", live: false, text: "Room rental and finder app with listings, search, and real-time availability.", stack: "Flutter · Firebase · Firestore" },
  { name: "GST Invoice ERP", sector: "Desktop", live: false, text: "Windows desktop invoicing and ERP tool with tax-ready invoices and PDF export.", stack: "Flutter Desktop · PDF · Windows" },
  { name: "Becky Pinder Yoga", sector: "Web", live: false, text: "A clean marketing and booking website for a yoga and wellness creator.", stack: "Next.js · Vercel" },
];

export default function ProjectsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Our work"
        title="Projects we've delivered"
        subtitle="A sample across sectors and stacks — client platforms and products we've taken to real users."
      />

      <section className="section">
        <div className="wrap">
          <div className="grid grid-3">
            {PROJECTS.map((p) => (
              <article className="card proj-grid-card" key={p.name}>
                <div className="top">
                  <span className="badge badge-sector">{p.sector}</span>
                  {p.live && (
                    <span className="badge badge-live">
                      <span className="dot" />
                      In production
                    </span>
                  )}
                </div>
                <div className="card-title" style={{ marginTop: 4 }}>
                  {p.name}
                </div>
                <p className="card-text">{p.text}</p>
                <div className="pg-stack">{p.stack}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CaseStudies />
      <CtaBand />
    </main>
  );
}
