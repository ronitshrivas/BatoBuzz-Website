const PRODUCTS = [
  {
    name: "BatoBuzz",
    role: "Marketplace platform",
    live: true,
    text: "Our flagship — a Nepali marketplace with coordinated customer and merchant apps over a shared .NET backend.",
    stack: ["Flutter", ".NET 7", "Firestore"],
  },
  {
    name: "SabMero",
    role: "Multi-vendor e-commerce + repair",
    live: true,
    text: "A multi-vendor retail and repair platform with vendor onboarding, commission settlement, and QR payments.",
    stack: ["Flutter", ".NET 7", "PostgreSQL"],
  },
  {
    name: "RentHive",
    role: "Room rental & finder app",
    live: false,
    text: "A rental marketplace for finding and listing rooms, with search, listings, and real-time availability.",
    stack: ["Flutter", "Firebase", "Firestore"],
  },
  {
    name: "GST Invoice ERP",
    role: "Windows desktop tool",
    live: false,
    text: "A desktop invoicing and ERP utility with tax-ready invoice generation and PDF export for Windows.",
    stack: ["Flutter Desktop", "PDF", "Windows"],
  },
];

export default function Products() {
  return (
    <section className="section" id="products" aria-labelledby="products-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Our own products</span>
          <h2 className="section-title" id="products-title">
            Platforms we own and build
          </h2>
          <p className="lead">
            We do not just ship client work — we run our own products end to
            end, which is where a lot of our platform patterns come from.
          </p>
        </div>
        <div className="grid grid-2">
          {PRODUCTS.map((p) => (
            <div className="card product-card" key={p.name}>
              <div className="product-top">
                <div className="card-title">{p.name}</div>
                {p.live && (
                  <span className="badge badge-live">
                    <span className="dot" />
                    In production
                  </span>
                )}
              </div>
              <div className="role">{p.role}</div>
              <p className="card-text">{p.text}</p>
              <div className="chip-row">
                {p.stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
