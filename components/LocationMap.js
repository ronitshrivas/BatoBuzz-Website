"use client";

import { useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MB_VERSION = "3.9.0";

function loadMapbox() {
  return new Promise((resolve, reject) => {
    if (window.mapboxgl) return resolve(window.mapboxgl);
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/${MB_VERSION}/mapbox-gl.min.css`;
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = `https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/${MB_VERSION}/mapbox-gl.min.js`;
    js.onload = () => resolve(window.mapboxgl);
    js.onerror = reject;
    document.head.appendChild(js);
  });
}

export default function LocationMap({ lat, lng, zoom = 13, label }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  const hasCoords = typeof lat === "number" && typeof lng === "number";

  useEffect(() => {
    let map;
    if (!MAPBOX_TOKEN || !hasCoords) return;
    loadMapbox()
      .then((mapboxgl) => {
        if (!ref.current) return;
        mapboxgl.accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [lng, lat],
          zoom,
          attributionControl: true,
        });
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        new mapboxgl.Marker({ color: "#eb1700" }).setLngLat([lng, lat]).addTo(map);
      })
      .catch(() => setFailed(true));
    return () => { if (map) map.remove(); };
  }, [lat, lng, zoom, hasCoords]);

  if (!hasCoords) return null;

  // Fallback: OpenStreetMap embed (no API key needed).
  if (!MAPBOX_TOKEN || failed) {
    const d = 0.02;
    const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
    return (
      <div className="map-box">
        <iframe
          title={label || "Location map"}
          className="map-frame"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`}
        />
      </div>
    );
  }

  return <div className="map-box" ref={ref} aria-label={label || "Location map"} />;
}
