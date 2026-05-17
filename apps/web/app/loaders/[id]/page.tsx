"use client";
import { useState, useMemo, use } from "react";
import Link from "next/link";
import { LOADERS } from "../../data/loaders";
import { LoaderPreview } from "../../components/LoaderPreview";
import { ArrowLeft, Check, Copy, Terminal, Code2, Settings2, RotateCcw, Box } from "lucide-react";

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
  const [color, setColor] = useState(loader?.defaults.color ?? "#0f172a");
  const [secondaryColor, setSecondaryColor] = useState(loader?.defaults.secondaryColor ?? "rgba(15,23,42,0.1)");
  const [speed, setSpeed] = useState(loader?.defaults.speed ?? 1);
  const [strokeWidth, setStrokeWidth] = useState(loader?.defaults.strokeWidth ?? 3);
  const [codeTab, setCodeTab] = useState<"css" | "html">("css");
  const [copied, setCopied] = useState(false);
  const [cliCopied, setCliCopied] = useState(false);

  if (!loader) {
    return (
      <div className="detail-container" style={{ textAlign: "center", paddingTop: "10rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Loader not found</h1>
        <Link href="/loaders" className="back-link"><ArrowLeft className="w-4 h-4" /> Back to all loaders</Link>
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
        <ArrowLeft className="w-4 h-4" />
        Back to all loaders
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>{loader.name}</h1>
        <span className="badge"><Box className="w-3.5 h-3.5" /> {loader.category}</span>
      </div>

      {/* CLI install */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="cli-box" onClick={handleCliCopy} style={{ display: "inline-flex" }}>
          <Terminal className="w-4 h-4 text-slate-400" />
          <span>npm i curls-loaders</span>
          <button className="copy-btn" aria-label="Copy CLI">
            {cliCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
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
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Settings2 className="w-5 h-5" /> Customize
          </h3>

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
              <label>Primary</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="color" value={color.startsWith("#") ? color : "#0f172a"} onChange={e => setColor(e.target.value)} />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "'Fira Code', monospace" }}>{color}</span>
              </div>
            </div>
            <div className="control-group" style={{ flex: 1 }}>
              <label>Secondary</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="color" value={secondaryColor.startsWith("#") ? secondaryColor : "#e2e8f0"} onChange={e => setSecondaryColor(e.target.value)} />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "'Fira Code', monospace" }}>{secondaryColor}</span>
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
            className="btn-outline" style={{ marginTop: "0.5rem", justifyContent: "center" }}
          >
            <RotateCcw className="w-4 h-4" /> Reset to defaults
          </button>
        </div>
      </div>

      {/* Code Panel */}
      <div className="code-panel" style={{ marginTop: "2.5rem" }}>
        <div className="code-header">
          <div className="code-tabs">
            <button className={`code-tab ${codeTab === "css" ? "active" : ""}`} onClick={() => setCodeTab("css")}>CSS</button>
            <button className={`code-tab ${codeTab === "html" ? "active" : ""}`} onClick={() => setCodeTab("html")}>HTML</button>
          </div>
          <button className="copy-code-btn" onClick={handleCopy}>
            {copied ? (
              <><Check className="w-4 h-4 text-green-500" /> Copied!</>
            ) : (
              <><Copy className="w-4 h-4" /> Copy Code</>
            )}
          </button>
        </div>
        <div className="code-body">{displayCode}</div>
      </div>
    </div>
  );
}
