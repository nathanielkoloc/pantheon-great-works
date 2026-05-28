/* Great Works Studio — The Pantheon
   Admin panel: edit project tiles + partner roster without touching code.
   Persists edits to localStorage; on load, app merges them with the defaults.
*/

const LS_PROJECTS_KEY = "gw_menu_projects_v1";
const LS_PARTNERS_KEY = "gw_menu_partners_v1";

// ── Projects ─────────────────────────────────────────────────────────────
window.GW_loadProjects = function () {
  try {
    const raw = localStorage.getItem(LS_PROJECTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    // Back-compat: legacy single-cat data → categories array.
    parsed.forEach((p) => {
      if (!Array.isArray(p.categories)) {
        p.categories = p.category ? [p.category] : [];
      }
      p.category = p.categories[0];
    });
    return parsed;
  } catch (e) {
    return null;
  }
};
window.GW_saveProjects = function (projects) {
  localStorage.setItem(LS_PROJECTS_KEY, JSON.stringify(projects));
};
window.GW_clearProjects = function () {
  localStorage.removeItem(LS_PROJECTS_KEY);
};

// ── Partners ─────────────────────────────────────────────────────────────
window.GW_loadPartners = function () {
  try {
    const raw = localStorage.getItem(LS_PARTNERS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch (e) {
    return null;
  }
};
window.GW_savePartners = function (partners) {
  localStorage.setItem(LS_PARTNERS_KEY, JSON.stringify(partners));
};
window.GW_clearPartners = function () {
  localStorage.removeItem(LS_PARTNERS_KEY);
};

function nextProjectNo(projects) {
  let max = 0;
  for (const p of projects) {
    const m = (p.no || "").match(/(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return "GW—" + (max + 1).toString().padStart(2, "0");
}

function blankProject(projects) {
  const cats = Object.keys(window.GW_CATEGORIES);
  return {
    id: "new-" + Date.now(),
    no: nextProjectNo(projects),
    categories: [cats[0]],
    category: cats[0],
    title: "Untitled Great Work",
    pitch: "A one-sentence promise of what this work, once done, becomes in the world.",
    budget: "$1M",
    timeline: "5 years",
    years: 5,
    scoping: "$100,000",
    horizon: "Half-decade",
    lead: "Lead to be recruited",
    locale: "TBD",
    body: [
      "First paragraph — the problem, stated plainly. Why the world does not solve this already.",
      "Second paragraph — the proposal. What we would build, how, with whom.",
      "Phase I scopes the charter, the team, and the implementation plan.",
    ],
    imagePrompt: "Painterly editorial cover illustration in the style of 1940s Fortune Magazine.",
    accent: "purple",
  };
}

function blankPartner(partners) {
  return {
    id: "p" + Date.now(),
    name: "New Partner",
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Admin Panel
// ─────────────────────────────────────────────────────────────────────────

function AdminPanel({ projects, onApply, partners, onApplyPartners, onClose }) {
  const [projectDraft, setProjectDraft] = React.useState(() =>
    JSON.parse(JSON.stringify(projects))
  );
  const [partnerDraft, setPartnerDraft] = React.useState(() =>
    JSON.parse(JSON.stringify(partners))
  );
  // Selection: { type: 'project'|'partner', id }
  const [selection, setSelection] = React.useState(() =>
    projectDraft[0]
      ? { type: "project", id: projectDraft[0].id }
      : { type: "none" }
  );
  const [toast, setToast] = React.useState(null);

  useEscape(onClose);

  const cats = Object.values(window.GW_CATEGORIES);

  const selectedProject =
    selection.type === "project"
      ? projectDraft.find((p) => p.id === selection.id)
      : null;
  const selectedPartner =
    selection.type === "partner"
      ? partnerDraft.find((p) => p.id === selection.id)
      : null;

  // ── Project mutators ───────────────────────────────────────────────────
  function updateProjectField(field, value) {
    setProjectDraft((d) =>
      d.map((p) => {
        if (p.id !== selection.id) return p;
        const next = { ...p, [field]: value };
        // Keep legacy `category` in sync with primary of `categories`.
        if (field === "categories") {
          next.category = (value && value[0]) || "";
        }
        return next;
      })
    );
  }
  function toggleCategory(catId) {
    if (!selectedProject) return;
    const current = Array.isArray(selectedProject.categories)
      ? selectedProject.categories
      : [];
    let next;
    if (current.includes(catId)) {
      // Don't allow removing the last category.
      if (current.length === 1) return;
      next = current.filter((c) => c !== catId);
    } else {
      next = [...current, catId];
    }
    updateProjectField("categories", next);
  }
  function updateBodyText(text) {
    const paras = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
    updateProjectField("body", paras);
  }
  function addProject() {
    const fresh = blankProject(projectDraft);
    setProjectDraft((d) => [...d, fresh]);
    setSelection({ type: "project", id: fresh.id });
  }
  function deleteProject(id) {
    setProjectDraft((d) => {
      const next = d.filter((p) => p.id !== id);
      if (selection.type === "project" && selection.id === id) {
        setSelection(
          next[0]
            ? { type: "project", id: next[0].id }
            : { type: "none" }
        );
      }
      return next;
    });
  }

  // ── Partner mutators ───────────────────────────────────────────────────
  function updatePartnerField(field, value) {
    setPartnerDraft((d) =>
      d.map((p) => (p.id === selection.id ? { ...p, [field]: value } : p))
    );
  }
  function addPartner() {
    const fresh = blankPartner(partnerDraft);
    setPartnerDraft((d) => [...d, fresh]);
    setSelection({ type: "partner", id: fresh.id });
  }
  function deletePartner(id) {
    setPartnerDraft((d) => {
      const next = d.filter((p) => p.id !== id);
      if (selection.type === "partner" && selection.id === id) {
        setSelection(
          next[0]
            ? { type: "partner", id: next[0].id }
            : projectDraft[0]
            ? { type: "project", id: projectDraft[0].id }
            : { type: "none" }
        );
      }
      return next;
    });
  }
  function movePartner(id, dir) {
    setPartnerDraft((d) => {
      const idx = d.findIndex((p) => p.id === id);
      if (idx < 0) return d;
      const target = idx + dir;
      if (target < 0 || target >= d.length) return d;
      const next = [...d];
      const [item] = next.splice(idx, 1);
      next.splice(target, 0, item);
      return next;
    });
  }

  // ── Save / reset / import / export ─────────────────────────────────────
  function applyChanges() {
    window.GW_saveProjects(projectDraft);
    window.GW_savePartners(partnerDraft);
    onApply(projectDraft);
    onApplyPartners(partnerDraft);
    setToast("Saved");
    setTimeout(() => setToast(null), 1600);
  }

  function resetToDefaults() {
    if (!confirm("Reset every project and partner back to the studio defaults? Your edits will be lost.")) return;
    window.GW_clearProjects();
    window.GW_clearPartners();
    const defaultsP = JSON.parse(JSON.stringify(window.GW_DEFAULT_PROJECTS));
    const defaultsT = JSON.parse(JSON.stringify(window.GW_DEFAULT_PARTNERS));
    setProjectDraft(defaultsP);
    setPartnerDraft(defaultsT);
    setSelection(
      defaultsP[0] ? { type: "project", id: defaultsP[0].id } : { type: "none" }
    );
    onApply(defaultsP);
    onApplyPartners(defaultsT);
    setToast("Reset to defaults");
    setTimeout(() => setToast(null), 1600);
  }

  function exportJSON() {
    const payload = { projects: projectDraft, partners: partnerDraft };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "great-works-pantheon.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        // Accept either a bare project array (legacy) or {projects, partners}.
        let nextProjects, nextPartners;
        if (Array.isArray(parsed)) {
          nextProjects = parsed;
          nextPartners = partnerDraft;
        } else if (parsed && typeof parsed === "object") {
          nextProjects = parsed.projects || projectDraft;
          nextPartners = parsed.partners || partnerDraft;
        } else {
          throw new Error("Unrecognized shape");
        }
        nextProjects.forEach((p) => {
          if (!Array.isArray(p.categories)) {
            p.categories = p.category ? [p.category] : [];
          }
          p.category = p.categories[0];
        });
        setProjectDraft(nextProjects);
        setPartnerDraft(nextPartners);
        setSelection(
          nextProjects[0]
            ? { type: "project", id: nextProjects[0].id }
            : { type: "none" }
        );
        setToast("Imported · review and Save");
        setTimeout(() => setToast(null), 1800);
      } catch (err) {
        alert("Could not import that file: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="admin-shell" data-screen-label="Admin · Pantheon Editor">
      <div className="admin-topbar">
        <div>
          <div className="admin-topbar-eyebrow">Studio · Editor</div>
          <div className="admin-topbar-title">The Pantheon — Edit Mode</div>
        </div>
        <div className="admin-topbar-spacer"></div>
        <button className="admin-btn" onClick={exportJSON}>Export JSON</button>
        <label className="admin-btn" style={{ cursor: "pointer" }}>
          Import JSON
          <input
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            onChange={(e) => e.target.files[0] && importJSON(e.target.files[0])}
          />
        </label>
        <button className="admin-btn is-danger" onClick={resetToDefaults}>
          Reset to defaults
        </button>
        <button className="admin-btn is-primary" onClick={applyChanges}>
          ✓ Save changes
        </button>
        <button className="admin-btn" onClick={onClose}>Close</button>
      </div>

      <div className="admin-body">
        <aside className="admin-list">
          {/* Partners section */}
          <div className="admin-list-section">
            <div className="admin-list-head">
              <span className="admin-list-head-label">
                Partners · {partnerDraft.length}
              </span>
              <button className="admin-add" onClick={addPartner}>＋ Add partner</button>
            </div>
            {partnerDraft.map((p) => (
              <button
                key={p.id}
                className={clsx(
                  "admin-row admin-row-sm",
                  selection.type === "partner" && selection.id === p.id && "is-active"
                )}
                onClick={() => setSelection({ type: "partner", id: p.id })}
              >
                <span className="admin-row-title">{p.name || "Untitled"}</span>
              </button>
            ))}
          </div>

          {/* Projects section */}
          <div className="admin-list-section">
            <div className="admin-list-head">
              <span className="admin-list-head-label">
                Works · {projectDraft.length}
              </span>
              <button className="admin-add" onClick={addProject}>＋ Add work</button>
            </div>
            {projectDraft.map((p) => {
              const primaryId = categoriesFor(p)[0];
              const cat = primaryId ? window.GW_CATEGORIES[primaryId] : null;
              const tagLabels = categoriesFor(p)
                .map((id) => window.GW_CATEGORIES[id]?.label)
                .filter(Boolean)
                .join(" · ");
              return (
                <button
                  key={p.id}
                  className={clsx(
                    "admin-row",
                    selection.type === "project" && selection.id === p.id && "is-active"
                  )}
                  onClick={() => setSelection({ type: "project", id: p.id })}
                  style={{ "--row-color": cat ? cat.color : "var(--muted)" }}
                >
                  <span className="admin-row-no">
                    {p.no} · {tagLabels || "—"}
                  </span>
                  <span className="admin-row-title">{p.title || "Untitled"}</span>
                  <span className="admin-row-meta">
                    {p.scoping} seed · {p.budget} full
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="admin-editor">
          {selection.type === "none" && (
            <div className="admin-editor-empty">
              Add a new work or partner, or select one from the list.
            </div>
          )}

          {/* PROJECT EDITOR */}
          {selectedProject && (
            <>
              <div className="admin-editor-head">
                <h3>{selectedProject.title || "Untitled"}</h3>
                <button
                  className="admin-btn is-danger"
                  onClick={() => {
                    if (confirm("Delete this work from the Pantheon?")) {
                      deleteProject(selectedProject.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>

              <div className="admin-section">
                <div className="admin-section-label">▼ Identity</div>
                <div className="admin-field-row">
                  <label className="admin-field">
                    <span className="admin-field-label">Catalog no.</span>
                    <input
                      type="text"
                      value={selectedProject.no}
                      onChange={(e) => updateProjectField("no", e.target.value)}
                    />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field-label">Accent</span>
                    <select
                      value={selectedProject.accent || "purple"}
                      onChange={(e) => updateProjectField("accent", e.target.value)}
                    >
                      <option value="green">Green</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="indigo">Indigo</option>
                      <option value="bronze">Bronze</option>
                    </select>
                  </label>
                </div>

                <label className="admin-field">
                  <span className="admin-field-label">Title</span>
                  <input
                    type="text"
                    value={selectedProject.title}
                    onChange={(e) => updateProjectField("title", e.target.value)}
                  />
                </label>

                <label className="admin-field">
                  <span className="admin-field-label">One-line pitch</span>
                  <textarea
                    rows="2"
                    value={selectedProject.pitch}
                    onChange={(e) => updateProjectField("pitch", e.target.value)}
                  />
                </label>

                <div className="admin-field">
                  <span className="admin-field-label">
                    Categories &nbsp;<span style={{ color: "var(--muted)", letterSpacing: 0, textTransform: "none" }}>— a work can carry more than one</span>
                  </span>
                  <div className="cat-checkboxes">
                    {cats.map((c) => {
                      const on = (selectedProject.categories || []).includes(c.id);
                      return (
                        <label
                          key={c.id}
                          className={clsx("cat-checkbox", on && "is-on")}
                          style={{ "--cat-color": c.color }}
                        >
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggleCategory(c.id)}
                          />
                          <span className="cat-checkbox-glyph">{c.glyph}</span>
                          <span className="cat-checkbox-label">{c.label}</span>
                        </label>
                      );
                    })}
                  </div>
                  <span className="admin-field-hint">
                    The first checked category sets the card's primary color.
                    Reorder by un-checking and re-checking in the order you want.
                  </span>
                </div>
              </div>

              <div className="admin-section">
                <div className="admin-section-label">▼ Funding &amp; Horizon</div>
                <div className="admin-field-row">
                  <label className="admin-field">
                    <span className="admin-field-label">Seed funding (Phase I)</span>
                    <input
                      type="text"
                      value={selectedProject.scoping}
                      onChange={(e) => updateProjectField("scoping", e.target.value)}
                    />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field-label">Full funding</span>
                    <input
                      type="text"
                      value={selectedProject.budget}
                      onChange={(e) => updateProjectField("budget", e.target.value)}
                    />
                  </label>
                </div>
                <div className="admin-field-row">
                  <label className="admin-field">
                    <span className="admin-field-label">Horizon (card label)</span>
                    <input
                      type="text"
                      value={selectedProject.timeline}
                      onChange={(e) => updateProjectField("timeline", e.target.value)}
                    />
                  </label>
                  <label className="admin-field">
                    <span className="admin-field-label">Locale</span>
                    <input
                      type="text"
                      value={selectedProject.locale || ""}
                      onChange={(e) => updateProjectField("locale", e.target.value)}
                    />
                  </label>
                </div>
                <label className="admin-field">
                  <span className="admin-field-label">Proposed lead</span>
                  <input
                    type="text"
                    value={selectedProject.lead || ""}
                    onChange={(e) => updateProjectField("lead", e.target.value)}
                  />
                </label>
              </div>

              <div className="admin-section">
                <div className="admin-section-label">▼ The Brief</div>
                <label className="admin-field">
                  <span className="admin-field-label">
                    Body paragraphs — separate with a blank line
                  </span>
                  <textarea
                    rows="12"
                    value={(selectedProject.body || []).join("\n\n")}
                    onChange={(e) => updateBodyText(e.target.value)}
                  />
                </label>
              </div>

              <div className="admin-section">
                <div className="admin-section-label">▼ Illustration</div>
                <label className="admin-field">
                  <span className="admin-field-label">
                    Image-prompt scene (style preamble is appended automatically)
                  </span>
                  <textarea
                    rows="4"
                    value={selectedProject.imagePrompt || ""}
                    onChange={(e) => updateProjectField("imagePrompt", e.target.value)}
                  />
                  <span className="admin-field-hint">
                    The image itself is dropped onto the tile in the live menu.
                  </span>
                </label>
              </div>

              <div className="admin-actions">
                <button className="admin-btn is-primary" onClick={applyChanges}>
                  ✓ Save changes
                </button>
                <button className="admin-btn" onClick={onClose}>
                  Close editor
                </button>
              </div>
            </>
          )}

          {/* PARTNER EDITOR */}
          {selectedPartner && (
            <>
              <div className="admin-editor-head">
                <h3>{selectedPartner.name || "Untitled partner"}</h3>
                <button
                  className="admin-btn is-danger"
                  onClick={() => {
                    if (confirm("Remove this partner from the strip?")) {
                      deletePartner(selectedPartner.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>

              <div className="admin-section">
                <div className="admin-section-label">▼ Partner</div>
                <label className="admin-field">
                  <span className="admin-field-label">Display name</span>
                  <input
                    type="text"
                    value={selectedPartner.name || ""}
                    onChange={(e) => updatePartnerField("name", e.target.value)}
                  />
                  <span className="admin-field-hint">
                    Shown as a caption under the logo. Drop the partner's actual logo onto the matching image slot in the live page.
                  </span>
                </label>

                <div className="admin-field-row">
                  <button
                    type="button"
                    className="admin-btn"
                    onClick={() => movePartner(selectedPartner.id, -1)}
                  >
                    ← Move earlier
                  </button>
                  <button
                    type="button"
                    className="admin-btn"
                    onClick={() => movePartner(selectedPartner.id, 1)}
                  >
                    Move later →
                  </button>
                </div>
              </div>

              <div className="admin-section">
                <div className="admin-section-label">▼ Preview</div>
                <div className="admin-partner-preview">
                  <div className="partner-logo" style={{ width: 160, height: 90 }}>
                    <image-slot
                      id={`gw-partner-${selectedPartner.id}`}
                      shape="rect"
                      placeholder={selectedPartner.name}
                      style={{ width: "100%", height: "100%", display: "block" }}
                    ></image-slot>
                  </div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", marginTop: 10, color: "var(--ink-soft)" }}>
                    {selectedPartner.name}
                  </div>
                </div>
              </div>

              <div className="admin-actions">
                <button className="admin-btn is-primary" onClick={applyChanges}>
                  ✓ Save changes
                </button>
                <button className="admin-btn" onClick={onClose}>
                  Close editor
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {toast && (
        <div className="admin-toast">
          ✓ <em>{toast}</em>
        </div>
      )}
    </div>
  );
}

window.AdminPanel = AdminPanel;
