"use client";
"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/store";


export function ImageField({ label, value, onChange, hint }) {
  const [mode, setMode] = useState("url");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="fld">
      <span className="fld-label">{label}</span>
      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
        <button type="button" className="mini-btn"
          style={mode === "url" ? { outline: "2px solid var(--accent)" } : undefined}
          onClick={() => setMode("url")}>From URL</button>
        <button type="button" className="mini-btn"
          style={mode === "device" ? { outline: "2px solid var(--accent)" } : undefined}
          onClick={() => setMode("device")}>From device</button>
      </div>
      {mode === "url" ? (
        <input type="text" value={value ?? ""} placeholder="https://..." onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} disabled={busy} />
      )}
      {busy ? <span className="fld-hint">Uploading...</span> : null}
      {error ? <span className="fld-hint danger-text">{error}</span> : null}
      {value ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" style={{ height: 48, maxWidth: 120, objectFit: "contain", borderRadius: 6 }} />
          <button type="button" className="mini-btn danger" onClick={() => onChange("")}>remove</button>
        </div>
      ) : null}
      {hint ? <span className="fld-hint">{hint}</span> : null}
    </div>
  );
}
// Small reusable form primitives for the admin editor.

export function TextField({ label, value, onChange, placeholder, hint }) {
  return (
    <label className="fld">
      <span className="fld-label">{label}</span>
      <input
        type="text"
        value={value ?? ""}
        placeholder={placeholder || ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <span className="fld-hint">{hint}</span> : null}
    </label>
  );
}

export function NumberField({ label, value, onChange }) {
  return (
    <label className="fld">
      <span className="fld-label">{label}</span>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 3, hint }) {
  return (
    <label className="fld">
      <span className="fld-label">{label}</span>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <span className="fld-hint">{hint}</span> : null}
    </label>
  );
}

export function Toggle({ label, value, onChange }) {
  return (
    <label className="fld fld-toggle">
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="fld-label">{label}</span>
    </label>
  );
}

// Comma-separated list of short strings (tags).
export function TagField({ label, value, onChange, hint }) {
  const text = Array.isArray(value) ? value.join(", ") : value || "";
  return (
    <label className="fld">
      <span className="fld-label">{label}</span>
      <input
        type="text"
        value={text}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
      />
      <span className="fld-hint">{hint || "Separate with commas"}</span>
    </label>
  );
}

// One line per entry (for arrays of plain strings, e.g. paragraphs).
export function LinesField({ label, value, onChange, rows = 5, hint }) {
  const text = Array.isArray(value) ? value.join("\n\n") : value || "";
  return (
    <label className="fld">
      <span className="fld-label">{label}</span>
      <textarea
        rows={rows}
        value={text}
        onChange={(e) =>
          onChange(e.target.value.split("\n\n").map((s) => s.trim()).filter(Boolean))
        }
      />
      <span className="fld-hint">{hint || "Separate each item with a blank line"}</span>
    </label>
  );
}

// Generic editor for an array of objects described by `schema`.
// schema: [{ key, label, type: 'text'|'textarea'|'toggle'|'tags'|'number' }]
export function ListEditor({ label, items, schema, onChange, blank }) {
  const list = Array.isArray(items) ? items : [];

  function update(i, key, val) {
    const next = list.map((it, idx) => (idx === i ? { ...it, [key]: val } : it));
    onChange(next);
  }
  function remove(i) {
    onChange(list.filter((_, idx) => idx !== i));
  }
  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function add() {
    onChange([...list, { ...(blank || {}) }]);
  }

  return (
    <div className="list-editor">
      <div className="list-editor-head">
        <span className="fld-label">{label}</span>
        <button type="button" className="mini-btn" onClick={add}>+ Add</button>
      </div>
      {list.map((it, i) => (
        <div className="list-item" key={i}>
          <div className="list-item-bar">
            <span className="li-index">#{i + 1}</span>
            <div className="li-actions">
              <button type="button" className="mini-btn" onClick={() => move(i, -1)} aria-label="Move up">up</button>
              <button type="button" className="mini-btn" onClick={() => move(i, 1)} aria-label="Move down">down</button>
              <button type="button" className="mini-btn danger" onClick={() => remove(i)}>remove</button>
            </div>
          </div>
          <div className="li-fields">
            {schema.map((f) => {
              const v = it[f.key];
              if (f.type === "textarea")
                return <TextArea key={f.key} label={f.label} value={v} onChange={(x) => update(i, f.key, x)} />;
              if (f.type === "toggle")
                return <Toggle key={f.key} label={f.label} value={v} onChange={(x) => update(i, f.key, x)} />;
              if (f.type === "tags")
                return <TagField key={f.key} label={f.label} value={v} onChange={(x) => update(i, f.key, x)} />;
              if (f.type === "image")
  return <ImageField key={f.key} label={f.label} value={v} onChange={(x) => update(i, f.key, x)} />;
              if (f.type === "number")
                return <NumberField key={f.key} label={f.label} value={v} onChange={(x) => update(i, f.key, x)} />;
              return <TextField key={f.key} label={f.label} value={v} placeholder={f.placeholder} onChange={(x) => update(i, f.key, x)} />;
            })}
          </div>
        </div>
      ))}
      {list.length === 0 ? <p className="fld-hint">No items yet. Click Add.</p> : null}
    </div>
  );
}

export function JsonField({ label, value, onChange, error }) {
  return (
    <label className="fld">
      <span className="fld-label">{label}</span>
      <textarea
        className="json-area"
        rows={14}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
      {error ? <span className="fld-hint danger-text">{error}</span> : null}
    </label>
  );
}
