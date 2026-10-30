"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultContent } from "@/lib/defaults";
import {
  firebaseReady,
  loadContent,
  saveContent,
  seedIfEmpty,
  signIn,
  signOutUser,
  onAuth,
  loadProjectInquiries,
  loadApplications,
  changePassword,
} from "@/lib/store";
import {
  TextField,
  NumberField,
  TextArea,
  TagField,
  LinesField,
  ListEditor,
  JsonField,
} from "./fields";

const ICON_HINT =
  "icon name: layers, rocket, grad, shield, web, chart, backend, mobile, megaphone, cloud, pen, wrench, spark, security, cart, search";

const TABS = [
  "Hero", "About", "Credibility", "Services", "Products", "Projects",
  "Success Stories", "Tech Stack", "Process", "Team", "Gallery", "Careers",
  "Quote", "Testimonials", "Stats", "FAQ", "Contact", "Submissions", "Advanced",
];

export default function Admin() {
  const [user, setUser] = useState(undefined); // undefined = loading
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState("Hero");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // Auth state
  useEffect(() => {
    const unsub = onAuth((u) => setUser(u));
    return () => unsub && unsub();
  }, []);

  // Load content once signed in
  useEffect(() => {
    if (user) {
      seedIfEmpty()
        .then((seeded) => {
          if (seeded) setStatus("No content found, so default content was added to Firebase. Edit or delete it below.");
          return loadContent();
        })
        .then(setContent)
        .catch(() => loadContent().then(setContent));
    }
  }, [user]);

  function up(section, value) {
    setContent((c) => ({ ...c, [section]: value }));
  }
  function upField(section, key, value) {
    setContent((c) => ({ ...c, [section]: { ...c[section], [key]: value } }));
  }

  async function handleSave() {
    setSaving(true);
    setStatus("");
    try {
      await saveContent(content);
      setStatus("Saved. Your live site now shows these changes.");
    } catch (e) {
      setStatus("Error: " + (e?.message || e));
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(""), 5000);
    }
  }

  function loadDefaults() {
    if (confirm("Replace the current editor content with the built-in defaults? (You still need to click Save to publish.)")) {
      setContent(JSON.parse(JSON.stringify(defaultContent)));
    }
  }

  // ---------------- Firebase not configured ----------------
  if (!firebaseReady) {
    return (
      <main className="admin-shell">
        <div className="admin-card">
          <h1>Admin</h1>
          <p className="admin-note">
            Firebase is not configured yet. Add your Firebase keys to a
            <code> .env.local</code> file (see <code>.env.local.example</code>)
            and restart the dev server. Until then the site runs on built-in
            default content.
          </p>
        </div>
      </main>
    );
  }

  // ---------------- Loading auth ----------------
  if (user === undefined) {
    return (
      <main className="admin-shell">
        <div className="admin-card"><p className="admin-note">Loading...</p></div>
      </main>
    );
  }

  // ---------------- Login ----------------
  if (!user) return <Login onError={setStatus} status={status} setStatus={setStatus} />;

  // ---------------- Loading content ----------------
  if (!content) {
    return (
      <main className="admin-shell">
        <div className="admin-card"><p className="admin-note">Loading content...</p></div>
      </main>
    );
  }

  return (
    <main className="admin-wrap">
      <header className="admin-top">
        <div className="admin-top-left">
          <strong>BatoBuzz CMS</strong>
          <span className="admin-user">{user.email}</span>
        </div>
        <div className="admin-top-actions">
          <button className="mini-btn" onClick={loadDefaults}>Load defaults</button>
          <a className="mini-btn" href="/" target="_blank" rel="noreferrer">View site</a>
          <button className="mini-btn" onClick={() => signOutUser()}>Sign out</button>
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save & publish"}
          </button>
        </div>
      </header>

      {status ? <div className="admin-status">{status}</div> : null}

      <div className="admin-body">
        <nav className="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>

        <section className="admin-panel">
          {tab === "Submissions" ? (
            <Submissions />
          ) : tab === "Account" ? (
            <Account />
          ) : (
            <Editor tab={tab} content={content} up={up} upField={upField} setContent={setContent} />
          )}
        </section>
      </div>
    </main>
  );
}

function Login({ status, setStatus }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await signIn(email, pw);
    } catch (err) {
      setStatus("Sign in failed: " + (err?.code || err?.message || "check your email and password"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-shell">
      <form className="admin-card" onSubmit={submit}>
        <h1>Admin sign in</h1>
        <p className="admin-note">Use the admin account you created in Firebase Authentication.</p>
        <label className="fld">
          <span className="fld-label">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="fld">
          <span className="fld-label">Password</span>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
        </label>
        {status ? <p className="danger-text">{status}</p> : null}
        <button className="save-btn full" type="submit" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function Editor({ tab, content, up, upField, setContent }) {
  if (tab === "Hero") {
    const h = content.hero;
    return (
      <>
        <TagField label="Badges" value={h.badges} onChange={(v) => upField("hero", "badges", v)} />
        <TextField label="Title" value={h.title} onChange={(v) => upField("hero", "title", v)} />
        <TextArea label="Lead" value={h.lead} onChange={(v) => upField("hero", "lead", v)} />
        <div className="two-col">
          <TextField label="Primary button label" value={h.primaryCta?.label} onChange={(v) => upField("hero", "primaryCta", { ...h.primaryCta, label: v })} />
          <TextField label="Primary button link" value={h.primaryCta?.href} onChange={(v) => upField("hero", "primaryCta", { ...h.primaryCta, href: v })} />
        </div>
        <div className="two-col">
          <TextField label="Secondary button label" value={h.secondaryCta?.label} onChange={(v) => upField("hero", "secondaryCta", { ...h.secondaryCta, label: v })} />
          <TextField label="Secondary button link" value={h.secondaryCta?.href} onChange={(v) => upField("hero", "secondaryCta", { ...h.secondaryCta, href: v })} />
        </div>
        <ListEditor
          label="Tech chips (hero)"
          items={h.chips}
          blank={{ name: "", logo: "" }}
          schema={[
            { key: "name", label: "Name" },
            { key: "logo", label: "Logo URL" },
          ]}
          onChange={(v) => upField("hero", "chips", v)}
        />
      </>
    );
  }

  if (tab === "About") {
    const a = content.about;
    return (
      <>
        <TextField label="Eyebrow" value={a.eyebrow} onChange={(v) => upField("about", "eyebrow", v)} />
        <TextField label="Title" value={a.title} onChange={(v) => upField("about", "title", v)} />
        <LinesField label="Paragraphs" value={a.paragraphs} rows={8} onChange={(v) => upField("about", "paragraphs", v)} />
      </>
    );
  }

  if (tab === "Credibility") {
    const c = content.credibility;
    return (
      <>
        <TextField label="Eyebrow" value={c.eyebrow} onChange={(v) => upField("credibility", "eyebrow", v)} />
        <TextField label="Title" value={c.title} onChange={(v) => upField("credibility", "title", v)} />
        <TextArea label="Lead" value={c.lead} onChange={(v) => upField("credibility", "lead", v)} />
        <ListEditor
          label="Points"
          items={c.points}
          blank={{ icon: "spark", title: "", text: "" }}
          schema={[
            { key: "icon", label: "Icon", placeholder: ICON_HINT },
            { key: "title", label: "Title" },
            { key: "text", label: "Text", type: "textarea" },
          ]}
          onChange={(v) => upField("credibility", "points", v)}
        />
      </>
    );
  }

  if (tab === "Services") {
    const s = content.services;
    return (
      <>
        <TextField label="Eyebrow" value={s.eyebrow} onChange={(v) => upField("services", "eyebrow", v)} />
        <TextField label="Title" value={s.title} onChange={(v) => upField("services", "title", v)} />
        <TextArea label="Lead" value={s.lead} onChange={(v) => upField("services", "lead", v)} />
        <ListEditor
          label="Services"
          items={s.items}
          blank={{ icon: "spark", title: "", text: "" }}
          schema={[
            { key: "icon", label: "Icon", placeholder: ICON_HINT },
            { key: "title", label: "Title" },
            { key: "text", label: "Text", type: "textarea" },
          ]}
          onChange={(v) => upField("services", "items", v)}
        />
      </>
    );
  }

  if (tab === "Products") {
    const p = content.products;
    return (
      <>
        <TextField label="Eyebrow" value={p.eyebrow} onChange={(v) => upField("products", "eyebrow", v)} />
        <TextField label="Title" value={p.title} onChange={(v) => upField("products", "title", v)} />
        <TextArea label="Lead" value={p.lead} onChange={(v) => upField("products", "lead", v)} />
        <ListEditor
          label="Products"
          items={p.items}
          blank={{ name: "", role: "", description: "", tags: [], playStoreLive: false, playStoreUrl: "", appStoreLive: false, appStoreUrl: "" }}
          schema={[
            { key: "name", label: "Name" },
            { key: "role", label: "Role (e.g. Customer app)" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "tags", label: "Tags", type: "tags" },
            { key: "playStoreLive", label: "Live on Google Play", type: "toggle" },
            { key: "playStoreUrl", label: "Google Play URL" },
            { key: "appStoreLive", label: "Live on App Store", type: "toggle" },
            { key: "appStoreUrl", label: "App Store URL" },
          ]}
          onChange={(v) => upField("products", "items", v)}
        />
      </>
    );
  }

  if (tab === "Projects") {
    const p = content.projects;
    return (
      <>
        <TextField label="Eyebrow" value={p.eyebrow} onChange={(v) => upField("projects", "eyebrow", v)} />
        <TextField label="Title" value={p.title} onChange={(v) => upField("projects", "title", v)} />
        <TextArea label="Lead" value={p.lead} onChange={(v) => upField("projects", "lead", v)} />
        <ListEditor
          label="Projects"
          items={p.items}
          blank={{ category: "", name: "", role: "", description: "", outcome: "", tags: [], url: "" }}
          schema={[
            { key: "category", label: "Category (Individuals, Businesses, Enterprise, Learning)" },
            { key: "name", label: "Name" },
            { key: "role", label: "Role" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "outcome", label: "Outcome", type: "textarea" },
            { key: "tags", label: "Tags", type: "tags" },
            { key: "url", label: "Link URL (optional)" },
          ]}
          onChange={(v) => upField("projects", "items", v)}
        />
      </>
    );
  }

  if (tab === "Tech Stack") {
    return <JsonEditor label="Tech stack (groups)" value={content.techStack} onChange={(v) => up("techStack", v)} />;
  }

  if (tab === "Process") {
    const p = content.process;
    return (
      <>
        <TextField label="Eyebrow" value={p.eyebrow} onChange={(v) => upField("process", "eyebrow", v)} />
        <TextField label="Title" value={p.title} onChange={(v) => upField("process", "title", v)} />
        <TextArea label="Lead" value={p.lead} onChange={(v) => upField("process", "lead", v)} />
        <ListEditor
          label="Steps"
          items={p.steps}
          blank={{ time: "", title: "", text: "" }}
          schema={[
            { key: "time", label: "Timeframe" },
            { key: "title", label: "Title" },
            { key: "text", label: "Text", type: "textarea" },
          ]}
          onChange={(v) => upField("process", "steps", v)}
        />
      </>
    );
  }

  if (tab === "Team") {
    const t = content.team;
    return (
      <>
        <TextField label="Eyebrow" value={t.eyebrow} onChange={(v) => upField("team", "eyebrow", v)} />
        <TextField label="Title" value={t.title} onChange={(v) => upField("team", "title", v)} />
        <TextArea label="Lead" value={t.lead} onChange={(v) => upField("team", "lead", v)} />
        <ListEditor
          label="Members (lower hierarchy number shows first)"
          items={t.members}
          blank={{ name: "", role: "", level: 5, bio: "", tags: [], photo: "", linkedin: "" }}
          schema={[
            { key: "name", label: "Name" },
            { key: "role", label: "Role / position" },
            { key: "level", label: "Hierarchy level (1 = top)", type: "number" },
            { key: "bio", label: "Description", type: "textarea" },
            { key: "tags", label: "Skills / tags", type: "tags" },
            { key: "linkedin", label: "LinkedIn URL" },
            { key: "photo", label: "Photo URL (optional)" },
          ]}
          onChange={(v) => upField("team", "members", v)}
        />
      </>
    );
  }

  if (tab === "Gallery") {
    const g = content.gallery;
    return (
      <>
        <TextField label="Eyebrow" value={g.eyebrow} onChange={(v) => upField("gallery", "eyebrow", v)} />
        <TextField label="Title" value={g.title} onChange={(v) => upField("gallery", "title", v)} />
        <TextArea label="Lead" value={g.lead} onChange={(v) => upField("gallery", "lead", v)} />
        <ListEditor
          label="Gallery items"
          items={g.items}
          blank={{ caption: "", image: "" }}
          schema={[
            { key: "caption", label: "Caption" },
            { key: "image", label: "Image URL" },
          ]}
          onChange={(v) => upField("gallery", "items", v)}
        />
      </>
    );
  }

  if (tab === "Quote") {
    const q = content.quote;
    return (
      <>
        <TextArea label="Quote text" value={q.text} rows={4} onChange={(v) => upField("quote", "text", v)} />
        <TextField label="Author" value={q.author} onChange={(v) => upField("quote", "author", v)} />
        <TextField label="Role / attribution" value={q.role} onChange={(v) => upField("quote", "role", v)} />
      </>
    );
  }

  if (tab === "Stats") {
    return (
      <ListEditor
        label="Stats"
        items={content.stats}
        blank={{ num: "", label: "" }}
        schema={[
          { key: "num", label: "Number (e.g. 10+)" },
          { key: "label", label: "Label" },
        ]}
        onChange={(v) => up("stats", v)}
      />
    );
  }

  if (tab === "FAQ") {
    const f = content.faq;
    return (
      <>
        <TextField label="Eyebrow" value={f.eyebrow} onChange={(v) => upField("faq", "eyebrow", v)} />
        <TextField label="Title" value={f.title} onChange={(v) => upField("faq", "title", v)} />
        <ListEditor
          label="Questions"
          items={f.items}
          blank={{ q: "", a: "" }}
          schema={[
            { key: "q", label: "Question" },
            { key: "a", label: "Answer", type: "textarea" },
          ]}
          onChange={(v) => upField("faq", "items", v)}
        />
      </>
    );
  }

  if (tab === "Contact") {
    const c = content.contact;
    return (
      <>
        <TextField label="Eyebrow" value={c.eyebrow} onChange={(v) => upField("contact", "eyebrow", v)} />
        <TextField label="Title" value={c.title} onChange={(v) => upField("contact", "title", v)} />
        <TextArea label="Lead" value={c.lead} onChange={(v) => upField("contact", "lead", v)} />
        <TextField label="Email" value={c.email} onChange={(v) => upField("contact", "email", v)} />
        <TextField label="Location" value={c.location} onChange={(v) => upField("contact", "location", v)} />
        <TagField label="Phone numbers" value={c.phones} onChange={(v) => upField("contact", "phones", v)} hint="Add one or more, separated by commas" />
        <div className="two-col">
          <NumberField label="Map latitude" value={c.mapLat} onChange={(v) => upField("contact", "mapLat", v)} />
          <NumberField label="Map longitude" value={c.mapLng} onChange={(v) => upField("contact", "mapLng", v)} />
        </div>
        <NumberField label="Map zoom (1-18)" value={c.mapZoom} onChange={(v) => upField("contact", "mapZoom", v)} />
      </>
    );
  }

  if (tab === "Success Stories") {
    const ss = content.successStories;
    return (
      <>
        <TextField label="Eyebrow" value={ss.eyebrow} onChange={(v) => upField("successStories", "eyebrow", v)} />
        <TextField label="Title" value={ss.title} onChange={(v) => upField("successStories", "title", v)} />
        <TextArea label="Lead" value={ss.lead} onChange={(v) => upField("successStories", "lead", v)} />
        <ListEditor
          label="Stories"
          items={ss.items}
          blank={{ client: "", title: "", story: "", result: "", image: "", url: "" }}
          schema={[
            { key: "client", label: "Client / project" },
            { key: "title", label: "Title" },
            { key: "story", label: "Story", type: "textarea" },
            { key: "result", label: "Result", type: "textarea" },
            { key: "image", label: "Logo / image URL (optional)" },
            { key: "url", label: "Link URL (opens when clicked)" },
          ]}
          onChange={(v) => upField("successStories", "items", v)}
        />
      </>
    );
  }

  if (tab === "Careers") {
    const cr = content.careers;
    return (
      <>
        <TextField label="Eyebrow" value={cr.eyebrow} onChange={(v) => upField("careers", "eyebrow", v)} />
        <TextField label="Title" value={cr.title} onChange={(v) => upField("careers", "title", v)} />
        <TextArea label="Lead" value={cr.lead} onChange={(v) => upField("careers", "lead", v)} />
        <ListEditor
          label="Open positions (leave empty to show the send-your-CV state)"
          items={cr.jobs}
          blank={{ title: "", type: "Full-time", location: "Inaruwa / Remote", description: "" }}
          schema={[
            { key: "title", label: "Job title" },
            { key: "type", label: "Type (Full-time, Internship...)" },
            { key: "location", label: "Location" },
            { key: "description", label: "Description", type: "textarea" },
          ]}
          onChange={(v) => upField("careers", "jobs", v)}
        />
        <TextField label="No-vacancy title" value={cr.noVacancyTitle} onChange={(v) => upField("careers", "noVacancyTitle", v)} />
        <TextArea label="No-vacancy message" value={cr.noVacancyText} onChange={(v) => upField("careers", "noVacancyText", v)} />
      </>
    );
  }

  if (tab === "Testimonials") {
    const t = content.testimonials;
    return (
      <>
        <TextField label="Eyebrow" value={t.eyebrow} onChange={(v) => upField("testimonials", "eyebrow", v)} />
        <TextField label="Title" value={t.title} onChange={(v) => upField("testimonials", "title", v)} />
        <TextArea label="Lead" value={t.lead} onChange={(v) => upField("testimonials", "lead", v)} />
        <ListEditor
          label="Testimonials"
          items={t.items}
          blank={{ quote: "", author: "", role: "", photo: "" }}
          schema={[
            { key: "quote", label: "Quote", type: "textarea" },
            { key: "author", label: "Author name" },
            { key: "role", label: "Role / company" },
            { key: "photo", label: "Photo URL (optional)" },
          ]}
          onChange={(v) => upField("testimonials", "items", v)}
        />
      </>
    );
  }

  if (tab === "Advanced") {
    return <JsonEditor label="Full content (advanced)" value={content} onChange={(v) => setContent(v)} full />;
  }

  return null;
}

function Account() {
  const [cur, setCur] = useState("");
  const [nw, setNw] = useState("");
  const [cf, setCf] = useState("");
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setMsg(""); setOk(false);
    if (nw !== cf) { setMsg("New passwords do not match."); return; }
    if (nw.length < 6) { setMsg("New password must be at least 6 characters."); return; }
    setBusy(true);
    try {
      await changePassword(cur, nw);
      setOk(true); setMsg("Password changed. Use it next time you sign in.");
      setCur(""); setNw(""); setCf("");
    } catch (e2) {
      const code = e2?.code || e2?.message || "error";
      setMsg(code.includes("wrong-password") || code.includes("invalid-credential")
        ? "Current password is incorrect."
        : "Error: " + code);
    } finally { setBusy(false); }
  }

  return (
    <div style={{ maxWidth: 460 }}>
      <h2 className="adm-h">Change password</h2>
      <p className="admin-note">Change the password for the admin account you are signed in with.</p>
      <form className="lead-form" onSubmit={submit}>
        <label className="fld"><span className="fld-label">Current password</span>
          <input type="password" required value={cur} onChange={(e) => setCur(e.target.value)} /></label>
        <label className="fld"><span className="fld-label">New password</span>
          <input type="password" required value={nw} onChange={(e) => setNw(e.target.value)} /></label>
        <label className="fld"><span className="fld-label">Confirm new password</span>
          <input type="password" required value={cf} onChange={(e) => setCf(e.target.value)} /></label>
        {msg ? <p className={ok ? "" : "danger-text"} style={ok ? { color: "var(--teal)" } : undefined}>{msg}</p> : null}
        <button className="save-btn" type="submit" disabled={busy}>{busy ? "Saving..." : "Change password"}</button>
      </form>
    </div>
  );
}

function fmtDate(ts) {
  try {
    const d = ts?.toDate ? ts.toDate() : ts?.seconds ? new Date(ts.seconds * 1000) : null;
    return d ? d.toLocaleString() : "";
  } catch (e) { return ""; }
}

function Submissions() {
  const [inq, setInq] = useState(null);
  const [apps, setApps] = useState(null);
  useEffect(() => {
    loadProjectInquiries().then(setInq);
    loadApplications().then(setApps);
  }, []);
  return (
    <div>
      <h2 className="adm-h">Project inquiries (start a project / schedule a call)</h2>
      {inq === null ? (
        <p className="admin-note">Loading...</p>
      ) : inq.length === 0 ? (
        <p className="admin-note">No inquiries yet.</p>
      ) : (
        inq.map((l) => (
          <div className="sub-card" key={l.id}>
            <div className="sub-top"><strong>{l.name}</strong><span>{fmtDate(l.createdAt)}</span></div>
            <div className="sub-meta">{l.email}{l.phone ? " / " + l.phone : ""}</div>
            {l.needType ? <div className="sub-meta">Type: {l.needType}</div> : null}
            {l.services && l.services.length ? <div className="sub-meta">Needs: {l.services.join(", ")}</div> : null}
            {(l.details || l.message) ? <p className="sub-msg">{l.details || l.message}</p> : null}
          </div>
        ))
      )}
      <h2 className="adm-h" style={{ marginTop: 30 }}>Job applications</h2>
      {apps === null ? (
        <p className="admin-note">Loading...</p>
      ) : apps.length === 0 ? (
        <p className="admin-note">No applications yet.</p>
      ) : (
        apps.map((a) => (
          <div className="sub-card" key={a.id}>
            <div className="sub-top"><strong>{a.name}</strong><span>{fmtDate(a.createdAt)}</span></div>
            <div className="sub-meta">{a.email} / {a.position || a.role}</div>
            {a.message ? <p className="sub-msg">{a.message}</p> : null}
            {a.cvUrl ? (
              <a className="mini-btn" href={a.cvUrl} target="_blank" rel="noreferrer">
                Download CV{a.cvName ? " (" + a.cvName + ")" : ""}
              </a>
            ) : (
              <span className="fld-hint">No CV file attached</span>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// JSON editor that keeps its own text buffer so invalid JSON does not crash.
function JsonEditor({ label, value, onChange, full }) {
  const initial = useMemo(() => JSON.stringify(value, null, 2), [value]);
  const [text, setText] = useState(initial);
  const [err, setErr] = useState("");

  function apply(t) {
    setText(t);
    try {
      const parsed = JSON.parse(t);
      setErr("");
      onChange(parsed);
    } catch (e) {
      setErr("Invalid JSON: " + e.message);
    }
  }

  return (
    <>
      <p className="admin-note">
        {full
          ? "Edit the entire site content as JSON. Changes apply only when the JSON is valid."
          : "Edit this section as JSON. Changes apply only when the JSON is valid."}
      </p>
      <JsonField label={label} value={text} onChange={apply} error={err} />
    </>
  );
}
