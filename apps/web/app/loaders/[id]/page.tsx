"use client";
import { useState, useMemo, use } from "react";
import Link from "next/link";
import { LOADERS } from "../../data/loaders";
import { LoaderPreview } from "../../components/LoaderPreview";

function formatCSS(css: string): string {
  return css.replace(/\{/g, " {\n  ").replace(/;/g, ";\n  ").replace(/\}/g, "\n}\n").replace(/\n  \n/g, "\n").trim();
}

function buildCustomCSS(css: string, opts: { size: number; color: string; secondaryColor: string; speed: number; strokeWidth: number }) {
  return css
    .replace(/var\(--s,[^)]+\)/g, `${opts.size}px`)
    .replace(/var\(--c1,[^)]+\)/g, opts.color)
    .replace(/var\(--c2,[^)]+\)/g, opts.secondaryColor)
    .replace(/var\(--sp,[^)]+\)/g, String(opts.speed))
    .replace(/var\(--w,[^)]+\)/g, `${opts.strokeWidth}px`);
}

export default function LoaderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const loader = LOADERS.find(l => l.id === id);

  const [size, setSize] = useState(loader?.defaults.size ?? 60);
  const [color, setColor] = useState(loader?.defaults.color ?? "#a78bfa");
  const [secondaryColor, setSecondaryColor] = useState(loader?.defaults.secondaryColor ?? "rgba(255,255,255,0.1)");
  const [speed, setSpeed] = useState(loader?.defaults.speed ?? 1);
  const [strokeWidth, setStrokeWidth] = useState(loader?.defaults.strokeWidth ?? 3);
  const [codeTab, setCodeTab] = useState<"css" | "html">("css");
  const [copied, setCopied] = useState(false);
  const [cliCopied, setCliCopied] = useState(false);

  if (!loader) {
    return (
      <div className="detail-container" style={{ textAlign: "center", paddingTop: "10rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Loader not found</h1>
        <Link href="/loaders" style={{ color: "#a78bfa" }}>← Back to all loaders</Link>
      </div>
    );
  }

  const customCSS = useMemo(() => buildCustomCSS(loader.css, { size, color, secondaryColor, speed, strokeWidth }), [loader.css, size, color, secondaryColor, speed, strokeWidth]);
  const displayCode = codeTab === "css" ? formatCSS(customCSS) : loader.html;

  const handleCopy = () => {
    const full = codeTab === "css" ? formatCSS(customCSS) : loader.html;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCliCopy = () => {
    navigator.clipboard.writeText("npm i curls-loaders");
    setCliCopied(true);
    setTimeout(() => setCliCopied(false), 2000);
  };

  return (
    <div className="detail-container">
      <Link href="/loaders" className="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        Back to all loaders
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>{loader.name}</h1>
        <span className="badge">{loader.category}</span>
      </div>

      {/* CLI install */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="cli-box" onClick={handleCliCopy} style={{ display: "inline-flex" }}>
          <span>$ npm i curls-loaders</span>
          <button className="copy-btn" aria-label="Copy CLI">
            {cliCopied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            )}
          </button>
        </div>
      </div>

      <div className="detail-grid">
        {/* Preview */}
        <div className="detail-preview">
          <LoaderPreview css={loader.css} html={loader.html} size={size} color={color} secondaryColor={secondaryColor} speed={speed} strokeWidth={strokeWidth} />
        </div>

        {/* Controls */}
        <div className="detail-controls">
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#a78bfa" }}>Customize</h3>

          <div className="control-group">
            <label>Size <span>{size}px</span></label>
            <input type="range" min="20" max="200" value={size} onChange={e => setSize(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Speed <span>{speed.toFixed(1)}x</span></label>
            <input type="range" min="0.1" max="5" step="0.1" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Stroke Width <span>{strokeWidth}px</span></label>
            <input type="range" min="1" max="12" value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div className="control-group" style={{ flex: 1 }}>
              <label>Primary Color</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="color" value={color.startsWith("#") ? color : "#a78bfa"} onChange={e => setColor(e.target.value)} />
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "'Fira Code', monospace" }}>{color}</span>
              </div>
            </div>
            <div className="control-group" style={{ flex: 1 }}>
              <label>Secondary Color</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="color" value={secondaryColor.startsWith("#") ? secondaryColor : "#333333"} onChange={e => setSecondaryColor(e.target.value)} />
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "'Fira Code', monospace" }}>{secondaryColor}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSize(loader.defaults.size);
              setColor(loader.defaults.color);
              setSecondaryColor(loader.defaults.secondaryColor);
              setSpeed(loader.defaults.speed);
              setStrokeWidth(loader.defaults.strokeWidth);
            }}
            style={{
              padding: "0.4rem 1rem", borderRadius: 8,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8", fontSize: "0.8rem", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", marginTop: "0.5rem",
            }}
          >
            Reset to defaults
          </button>
        </div>
      </div>

      {/* Code Panel */}
      <div className="code-panel">
        <div className="code-header">
          <div className="code-tabs">
            <button className={`code-tab ${codeTab === "css" ? "active" : ""}`} onClick={() => setCodeTab("css")}>CSS</button>
            <button className={`code-tab ${codeTab === "html" ? "active" : ""}`} onClick={() => setCodeTab("html")}>HTML</button>
          </div>
          <button className="copy-code-btn" onClick={handleCopy}>
            {copied ? (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Code</>
            )}
          </button>
        </div>
        <div className="code-body">{displayCode}</div>
      </div>
    </div>
  );
}
