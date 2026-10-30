"use client";

import Icon from "./Icon";
import { useContent } from "@/lib/useContent";
import { useModal } from "./ModalProvider";
import LocationMap from "./LocationMap";

export default function Contact() {
  const c = useContent("contact");
  const { openSchedule } = useModal();
  const phones = (c.phones || []).filter(Boolean);

  return (
    <section className="section-ink section" id="contact" aria-labelledby="contact-title">
      <div className="glow" />
      <div className="wrap above">
        <div className="contact-grid">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="section-title" id="contact-title">{c.title}</h2>
            <p className="lead">{c.lead}</p>
            <div className="hero-cta" style={{ marginTop: 28, gap: 12 }}>
              <button className="btn btn-primary" onClick={openSchedule}>
                <Icon name="phone" /> Schedule a call
              </button>
              <a className="btn btn-ghost" href={`mailto:${c.email}`}>
                Email us <Icon name="arrow" />
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-item">
              <span className="ci-icon"><Icon name="mail" /></span>
              <div className="ci-body">
                <div className="ci-label">Email</div>
                <div className="ci-value"><a href={`mailto:${c.email}`}>{c.email}</a></div>
              </div>
            </div>

            {phones.map((ph, i) => (
              <div className="contact-item" key={i}>
                <span className="ci-icon"><Icon name="phone" /></span>
                <div className="ci-body">
                  <div className="ci-label">{i === 0 ? "Phone" : "Also"}</div>
                  <div className="ci-value"><a href={`tel:${ph.replace(/\s+/g, "")}`}>{ph}</a></div>
                </div>
              </div>
            ))}

            <div className="contact-item">
              <span className="ci-icon"><Icon name="pin" /></span>
              <div className="ci-body">
                <div className="ci-label">Location</div>
                <div className="ci-value">{c.location}</div>
              </div>
            </div>
          </div>
        </div>

        <LocationMap lat={c.mapLat} lng={c.mapLng} zoom={c.mapZoom} label={c.location} />
      </div>
    </section>
  );
}
