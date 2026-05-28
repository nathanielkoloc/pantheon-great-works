/* Great Works Studio — The Pantheon
   Main React application. Magazine-cover tile grid + modal detail view.
*/

const { useState, useEffect, useMemo, useRef } = React;

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

function useEscape(onEsc) {
  useEffect(() => {
    function h(e) { if (e.key === "Escape") onEsc(); }
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onEsc]);
}
window.useEscape = useEscape;

function clsx(...args) {
  return args.filter(Boolean).join(" ");
}
window.clsx = clsx;

// Always return an array of category IDs (handles legacy single-cat data).
function categoriesFor(project) {
  if (Array.isArray(project.categories) && project.categories.length > 0) {
    return project.categories;
  }
  if (project.category) return [project.category];
  return [];
}
window.categoriesFor = categoriesFor;

// Accent class derived from primary category, so old `accent` field stays optional.
function accentFor(project) {
  const primary = categoriesFor(project)[0];
  if (project.accent) return project.accent;
  if (primary === "garden") return "green";
  if (primary === "monumental") return "red";
  if (primary === "commissioned") return "blue";
  if (primary === "arcane") return "purple";
  if (primary === "union") return "indigo";
  if (primary === "defense") return "bronze";
  return "ink";
}

// ─────────────────────────────────────────────────────────────────────────
// Masthead
// ─────────────────────────────────────────────────────────────────────────

function Masthead({ onAdmin }) {
  return (
    <header className="masthead">
      <div className="masthead-rule"></div>

      <div className="masthead-meta">
        <span className="meta-block">VOL. I · NO. 02</span>
        <span className="meta-block">PUBLISHED BY GREAT WORKS STUDIO</span>
        <span className="meta-block">NEW YORK · EST. 2026</span>
        <button className="admin-link" onClick={onAdmin} title="Open the Pantheon editor">
          ✎ Edit the Pantheon
        </button>
      </div>

      <div className="masthead-title">
        <div className="masthead-ornament">❦</div>
        <h1 className="masthead-name">
          <span className="masthead-name-the">the</span>
          Pantheon<span className="masthead-period">.</span>
        </h1>
        <div className="masthead-ornament">❦</div>
      </div>

      <div className="masthead-sub">
        A catalog of commission-able great work(s).
      </div>

      <div className="masthead-rule"></div>

      <div className="manifesto">
        <p className="manifesto-lead">
          The world is in need of more <em>great works</em>.
        </p>
        <p className="manifesto-body">
          Many of the great works that our world needs are not shaped like startups,
          nor will they happen unless someone determines to apply force of will at a
          very precise point in the system. We pair far-sighted patrons with
          well-scoped, audacious, accomplishable projects and assemble the teams who
          can get them done.
        </p>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Partners strip — horizontal scrolling marquee of partner-org logos.
// ─────────────────────────────────────────────────────────────────────────

function PartnersStrip({ partners }) {
  if (!partners || partners.length === 0) return null;
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...partners, ...partners];
  return (
    <section className="partners-section" aria-label="Studio partners">
      <div className="partners-eyebrow">
        <span className="partners-rule"></span>
        <span className="partners-label">Partners</span>
        <span className="partners-rule"></span>
      </div>
      <div className="partners-marquee">
        <div className="partners-track">
          {loop.map((p, i) => (
            <div className="partner" key={`${p.id}-${i}`}>
              <div className="partner-logo">
                <image-slot
                  id={`gw-partner-${p.id}`}
                  shape="rect"
                  placeholder={p.name}
                  style={{ width: "100%", height: "100%", display: "block" }}
                ></image-slot>
              </div>
              <div className="partner-name">{p.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Filter Bar
// ─────────────────────────────────────────────────────────────────────────

function FilterBar({ active, setActive, counts }) {
  const cats = Object.values(window.GW_CATEGORIES);
  return (
    <div className="filter-bar">
      <div className="filter-label">Category ▶</div>
      <button
        className={clsx("filter-chip", active === "all" && "is-active")}
        onClick={() => setActive("all")}
      >
        <span className="chip-glyph">✦</span>
        <span className="chip-label">All Works</span>
        <span className="chip-count">{counts.all}</span>
      </button>
      {cats.map((c) => (
        <button
          key={c.id}
          className={clsx("filter-chip", active === c.id && "is-active")}
          style={{ "--chip-color": c.color }}
          onClick={() => setActive(c.id)}
        >
          <span className="chip-glyph" style={{ color: c.color }}>{c.glyph}</span>
          <span className="chip-label">{c.label}</span>
          <span className="chip-count">{counts[c.id] || 0}</span>
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Category strip — one or more category tags on a tile / modal header.
// ─────────────────────────────────────────────────────────────────────────

function CategoryStrip({ project, variant = "tile" }) {
  const ids = categoriesFor(project);
  const cats = ids
    .map((id) => window.GW_CATEGORIES[id])
    .filter(Boolean);
  if (cats.length === 0) return null;
  return (
    <div className={clsx("tile-cat-strip", variant === "modal" && "is-modal")}>
      <div className="tile-cat-segs">
        {cats.map((c, i) => (
          <span
            key={c.id}
            className="tile-cat-seg"
            style={{ background: c.color }}
          >
            <span className="tile-cat-glyph">{c.glyph}</span>
            <span className="tile-cat-label">{c.label}</span>
          </span>
        ))}
      </div>
      <span className="tile-no">{project.no}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Tile
// ─────────────────────────────────────────────────────────────────────────

function Tile({ project, onOpen }) {
  const cats = categoriesFor(project)
    .map((id) => window.GW_CATEGORIES[id])
    .filter(Boolean);
  if (cats.length === 0) return null;
  const primary = cats[0];
  return (
    <article
      className={clsx("tile", "tile-accent-" + accentFor(project))}
      onClick={onOpen}
      data-screen-label={`Tile · ${project.title}`}
      style={{ "--cat-color": primary.color }}
    >
      <div className="tile-frame">
        <CategoryStrip project={project} />

        <div className="tile-image-wrap">
          <image-slot
            id={`gw-${project.id}`}
            shape="rect"
            placeholder={`Drop illustration · ${project.title}`}
            style={{ width: "100%", height: "100%", display: "block" }}
          ></image-slot>
          <div className="tile-image-corner">
            <span className="corner-cat">{primary.glyph}</span>
          </div>
        </div>

        <div className="tile-body">
          <h2 className="tile-title">{project.title}</h2>
          <p className="tile-pitch">{project.pitch}</p>

          <div className="tile-meta">
            <div className="meta-cell">
              <div className="meta-cell-label">Seed Funding</div>
              <div className="meta-cell-value">{project.scoping}</div>
            </div>
            <div className="meta-cell">
              <div className="meta-cell-label">Full Funding</div>
              <div className="meta-cell-value">{project.budget}</div>
            </div>
            <div className="meta-cell">
              <div className="meta-cell-label">Horizon</div>
              <div className="meta-cell-value">{project.timeline}</div>
            </div>
          </div>

          <div className="tile-cta">
            <span>Inquire about funding this work</span>
            <span className="cta-arrow">→</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────────────────────────────────

function Modal({ project, onClose }) {
  const [tab, setTab] = useState("brief"); // brief | direction | inquire
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef(null);
  useEscape(onClose);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [project.id, tab]);

  if (!project) return null;
  const cats = categoriesFor(project)
    .map((id) => window.GW_CATEGORIES[id])
    .filter(Boolean);
  if (cats.length === 0) return null;
  const primary = cats[0];

  const fullPrompt = `${project.imagePrompt}\n\n— Shared style —\n${window.GW_STYLE_PREAMBLE}`;

  function copyPrompt() {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={clsx("modal", "tile-accent-" + accentFor(project))}
        onClick={(e) => e.stopPropagation()}
        style={{ "--cat-color": primary.color }}
        data-screen-label={`Modal · ${project.title}`}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <CategoryStrip project={project} variant="modal" />

        <div className="modal-grid">
          <div className="modal-image">
            <image-slot
              id={`gw-${project.id}`}
              shape="rect"
              placeholder={`Drop illustration · ${project.title}`}
              style={{ width: "100%", height: "100%", display: "block" }}
            ></image-slot>
            <div className="modal-image-caption">
              <span className="caption-mark">FIG. {(project.no || "").replace("GW—", "")}</span>
              <span className="caption-text">{project.title} — illustration to be commissioned.</span>
            </div>
          </div>

          <div className="modal-content" ref={scrollRef}>
            <div className="modal-eyebrow">A Great Work, Seeking Patron</div>
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-pitch">{project.pitch}</p>

            <div className="modal-stats">
              <div className="modal-stat">
                <div className="stat-label">Seed Funding</div>
                <div className="stat-value">{project.scoping}</div>
              </div>
              <div className="modal-stat">
                <div className="stat-label">Full Funding</div>
                <div className="stat-value">{project.budget}</div>
              </div>
              <div className="modal-stat">
                <div className="stat-label">Horizon</div>
                <div className="stat-value">{project.timeline}</div>
              </div>
              <div className="modal-stat">
                <div className="stat-label">Locale</div>
                <div className="stat-value sm">{project.locale}</div>
              </div>
              <div className="modal-stat">
                <div className="stat-label">Proposed Lead</div>
                <div className="stat-value sm">{project.lead}</div>
              </div>
            </div>

            <div className="modal-tabs">
              <button
                className={clsx("modal-tab", tab === "brief" && "is-active")}
                onClick={() => setTab("brief")}
              >The Brief</button>
              <button
                className={clsx("modal-tab", tab === "direction" && "is-active")}
                onClick={() => setTab("direction")}
              >Image Direction</button>
              <button
                className={clsx("modal-tab", tab === "inquire" && "is-active")}
                onClick={() => setTab("inquire")}
              >Inquire</button>
            </div>

            {tab === "brief" && (
              <div className="modal-tab-panel">
                {(project.body || []).map((p, i) => (
                  <p key={i} className="brief-para">
                    {i === 0 && p.length > 0 && <span className="drop-cap">{p[0]}</span>}
                    {i === 0 ? p.slice(1) : p}
                  </p>
                ))}

                <div className="scoping-callout">
                  <div className="scoping-eyebrow">▶ Phase I · Seed Funding</div>
                  <div className="scoping-row">
                    <div className="scoping-price">{project.scoping}</div>
                    <div className="scoping-explain">
                      The minimum first commitment. Produces the charter, the team, and
                      the implementation plan that unlocks the full programme.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "direction" && (
              <div className="modal-tab-panel">
                <p className="direction-intro">
                  Each Great Work is illustrated in a single cover style — 1940s Fortune
                  Magazine meets golden-age comics. Below: the scene to commission for
                  this work, plus the shared style preamble. Paste both into Midjourney v7,
                  Imagen 4, or DALL·E. Drop the result onto the image slot.
                </p>

                <div className="prompt-block">
                  <div className="prompt-header">
                    <span className="prompt-label">SCENE · {project.no}</span>
                    <button className="prompt-copy" onClick={copyPrompt}>
                      {copied ? "✓ Copied" : "Copy prompt"}
                    </button>
                  </div>
                  <div className="prompt-body">
                    <p className="prompt-scene">{project.imagePrompt}</p>
                    <div className="prompt-rule"></div>
                    <p className="prompt-preamble">{window.GW_STYLE_PREAMBLE}</p>
                  </div>
                </div>

                <div className="direction-tip">
                  <strong>Tip.</strong> Generate four candidates per project at 4:5 portrait,
                  then upscale the strongest. Keep palettes consistent across the menu by
                  reusing the style preamble verbatim.
                </div>
              </div>
            )}

            {tab === "inquire" && (
              <div className="modal-tab-panel">
                {!submitted ? (
                  <form className="inquire-form" onSubmit={submit}>
                    <p className="inquire-lede">
                      An inquiry is not a commitment. It begins a private conversation
                      with a partner of the Studio. We respond within five working days.
                    </p>

                    <label className="field">
                      <span className="field-label">Your name</span>
                      <input required type="text" placeholder="" />
                    </label>

                    <div className="field-row">
                      <label className="field">
                        <span className="field-label">Email</span>
                        <input required type="email" placeholder="" />
                      </label>
                      <label className="field">
                        <span className="field-label">Affiliation</span>
                        <input type="text" placeholder="Family office, foundation, individual…" />
                      </label>
                    </div>

                    <label className="field">
                      <span className="field-label">Interest</span>
                      <select required defaultValue="scoping">
                        <option value="scoping">Seed funding ({project.scoping})</option>
                        <option value="full">Full programme commitment ({project.budget})</option>
                        <option value="consortium">Join a patron consortium</option>
                        <option value="conversation">Schedule an exploratory conversation</option>
                      </select>
                    </label>

                    <label className="field">
                      <span className="field-label">A few sentences (optional)</span>
                      <textarea rows="4" placeholder={`Why this Great Work, and not another.`}></textarea>
                    </label>

                    <div className="inquire-actions">
                      <button type="submit" className="inquire-submit">
                        Inquire about <em>{project.title}</em> <span>→</span>
                      </button>
                      <div className="inquire-fineprint">
                        Confidential. Held by the Studio. Never shared.
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="inquire-confirmation">
                    <div className="confirmation-mark">✓</div>
                    <h3>Inquiry received.</h3>
                    <p>
                      A partner of the Studio will reach out within five working days
                      regarding <em>{project.title}</em>. In the meantime, you may continue
                      to browse the Pantheon.
                    </p>
                    <button className="confirmation-close" onClick={onClose}>
                      Return to the Pantheon →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Suggest a Great Work — sticky right-side drawer
// ─────────────────────────────────────────────────────────────────────────

function SuggestDrawer() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    function h(e) { if (e.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function reset() {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 340);
  }

  return (
    <aside
      className={clsx("suggest-drawer", open && "is-open")}
      data-screen-label="Drawer · Suggest a Great Work"
      aria-label="Suggest a great work"
    >
      <button
        className="suggest-handle"
        onClick={() => setOpen(true)}
        aria-label="Open suggestion drawer"
      >
        <span className="handle-glyph">✦</span>
        <span>Suggest a</span>
        <em>great work</em>
      </button>

      <div className="suggest-panel" role="dialog" aria-hidden={!open}>
        <div className="suggest-panel-head">
          <div className="suggest-panel-eyebrow">✦ Suggest a Great Work</div>
          <h3 className="suggest-panel-title">
            What ought to be in <span style={{ fontStyle: "italic" }}>the Pantheon</span>?
          </h3>
          <p className="suggest-panel-lede">
            Tell us the idea you wish existed in the world. We read every suggestion.
          </p>
          <button
            className="suggest-panel-close"
            onClick={() => setOpen(false)}
            aria-label="Collapse drawer"
            title="Collapse"
          >→</button>
        </div>

        <div className="suggest-panel-body">
          {!submitted ? (
            <form onSubmit={submit}>
              <label className="field">
                <span className="field-label">Your name</span>
                <input required type="text" />
              </label>
              <label className="field">
                <span className="field-label">Title</span>
                <input required type="text" placeholder="What you do" />
              </label>
              <label className="field">
                <span className="field-label">Email</span>
                <input required type="email" />
              </label>
              <label className="field">
                <span className="field-label">The idea</span>
                <textarea
                  required
                  rows="5"
                  placeholder="A one-paragraph sketch of the great work you think the world needs."
                />
              </label>
              <div className="inquire-actions">
                <button type="submit" className="inquire-submit">
                  Send <em>suggestion</em> <span>→</span>
                </button>
                <div className="inquire-fineprint">
                  Confidential. Held by the Studio.
                </div>
              </div>
            </form>
          ) : (
            <div className="inquire-confirmation">
              <div className="confirmation-mark">✓</div>
              <h3>Suggestion received.</h3>
              <p>
                Thank you. A partner of the Studio reads every suggestion personally.
                If yours sparks a commission, we will write to you.
              </p>
              <button className="confirmation-close" onClick={reset}>
                Return to the Pantheon →
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Tweaks
// ─────────────────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "density": "spacious"
}/*EDITMODE-END*/;

const PALETTES = [
  { id: "cream",     label: "Cream",     swatch: ["#F5EFE0", "#1A1410", "#B98718"] },
  { id: "newsprint", label: "Newsprint", swatch: ["#EAE6DC", "#15110D", "#B23A2A"] },
  { id: "midnight",  label: "Midnight",  swatch: ["#161821", "#ECE2C5", "#E8A820"] },
  { id: "bone",      label: "Bone",      swatch: ["#EDE3CE", "#241A12", "#A05028"] },
];

function PaletteSwatches({ value, onChange }) {
  return (
    <div className="palette-swatches">
      {PALETTES.map((p) => (
        <button
          key={p.id}
          type="button"
          className={clsx("palette-swatch", value === p.id && "is-on")}
          onClick={() => onChange(p.id)}
          aria-label={p.label}
          title={p.label}
        >
          <span className="palette-swatch-stack" aria-hidden="true">
            <i style={{ background: p.swatch[0] }}></i>
            <i style={{ background: p.swatch[1] }}></i>
            <i style={{ background: p.swatch[2] }}></i>
          </span>
          <span className="palette-swatch-label">{p.label}</span>
        </button>
      ))}
    </div>
  );
}

function TweakBar() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.dataset.palette = t.palette;
    document.documentElement.dataset.density = t.density;
  }, [t.palette, t.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette">
        <PaletteSwatches value={t.palette} onChange={(v) => setTweak("palette", v)} />
      </TweakSection>
      <TweakSection label="Density">
        <TweakRadio
          label="Layout"
          value={t.density}
          options={[
            { value: "spacious", label: "Spacious" },
            { value: "dense", label: "Dense" },
          ]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────

function App() {
  // Initial projects + partners: localStorage override → source defaults.
  const [projects, setProjects] = useState(() => {
    const stored = window.GW_loadProjects && window.GW_loadProjects();
    return stored || window.GW_PROJECTS;
  });
  const [partners, setPartners] = useState(() => {
    const stored = window.GW_loadPartners && window.GW_loadPartners();
    return stored || window.GW_PARTNERS;
  });

  const [activeCat, setActiveCat] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const catCounts = useMemo(() => {
    const c = { all: projects.length };
    for (const p of projects) {
      for (const id of categoriesFor(p)) {
        c[id] = (c[id] || 0) + 1;
      }
    }
    return c;
  }, [projects]);

  const visible = useMemo(() => {
    return projects.filter((p) => {
      if (activeCat === "all") return true;
      return categoriesFor(p).includes(activeCat);
    });
  }, [projects, activeCat]);

  const openProject = openId ? projects.find((p) => p.id === openId) : null;

  // initial palette applied once on mount
  useEffect(() => {
    if (!document.documentElement.dataset.palette) {
      document.documentElement.dataset.palette = TWEAK_DEFAULTS.palette;
    }
    if (!document.documentElement.dataset.density) {
      document.documentElement.dataset.density = TWEAK_DEFAULTS.density;
    }
  }, []);

  // Keep window-globals in sync so other scripts see edits.
  useEffect(() => { window.GW_PROJECTS = projects; }, [projects]);
  useEffect(() => { window.GW_PARTNERS = partners; }, [partners]);

  return (
    <div className="app">
      <div className="page-frame">
        <Masthead onAdmin={() => setAdminOpen(true)} />

        <PartnersStrip partners={partners} />

        <FilterBar
          active={activeCat}
          setActive={setActiveCat}
          counts={catCounts}
        />

        <div className="grid-eyebrow">
          <span className="grid-eyebrow-rule"></span>
          <span className="grid-eyebrow-text">
            {visible.length} {visible.length === 1 ? "Work" : "Works"} · Each a real commission · Each scoped for one patron or a small consortium
          </span>
          <span className="grid-eyebrow-rule"></span>
        </div>

        <div className="tile-grid">
          {visible.map((p) => (
            <Tile key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
          ))}
        </div>

        {visible.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--muted)",
          }}>
            No works in this category — try a different filter.
          </div>
        )}

        <footer className="page-foot">
          <div className="foot-rule"></div>
          <div className="foot-row">
            <div className="foot-logo">Great Works Studio</div>
            <div className="foot-contact">studio@greatworks.studio</div>
            <div className="foot-meta">CONFIDENTIAL · 2026 · IDEA STAGE</div>
          </div>
        </footer>
      </div>

      {openProject && <Modal project={openProject} onClose={() => setOpenId(null)} />}

      {adminOpen && (
        <AdminPanel
          projects={projects}
          onApply={(next) => setProjects(next)}
          partners={partners}
          onApplyPartners={(next) => setPartners(next)}
          onClose={() => setAdminOpen(false)}
        />
      )}

      <SuggestDrawer />

      <TweakBar />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
