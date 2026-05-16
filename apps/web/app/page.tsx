"use client";
import Link from "next/link";
import { LOADERS } from "./data/loaders";
import { LoaderPreview } from "./components/LoaderPreview";
import { useState } from "react";

const ROW_SIZE = 10;
const rows = [
  { title: "✨ Spinners", loaders: LOADERS.filter(l => l.category === "spinners").slice(0, ROW_SIZE), reverse: false },
  { title: "⚡ Dots & Pulses", loaders: LOADERS.filter(l => l.category === "dots").slice(0, ROW_SIZE), reverse: true },
  { title: "🎵 Bars & Equalizers", loaders: LOADERS.filter(l => l.category === "bars").slice(0, ROW_SIZE), reverse: false },
  { title: "🔮 Shapes & Creative", loaders: [...LOADERS.filter(l => l.category === "shapes").slice(0, 5), ...LOADERS.filter(l => l.category === "creative").slice(0, 5)], reverse: true },
];

function CopyCliBox() {
  const [copied, setCopied] = useState(false);
  const cmd = "npm i curls-loaders";
  return (
    <div className="cli-box" onClick={() => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
      <span>$ {cmd}</span>
      <button className="copy-btn" aria-label="Copy">
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        )}
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-badges">
          <span className="badge">🎨 100+ Loaders</span>
          <span className="badge">📋 Copy & Paste</span>
          <span className="badge">⚡ Pure CSS</span>
          <span className="badge">🎛️ Customizable</span>
        </div>
        <h1>Beautiful Loading Animations</h1>
        <p>
          A curated collection of 100+ stunning CSS loaders. Browse, customize with live controls, copy the code, and drop into any project — zero dependencies.
        </p>
        <CopyCliBox />
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <Link href="/loaders" style={{
            padding: "0.65rem 1.5rem", borderRadius: 10, fontWeight: 600, fontSize: "0.9rem",
            background: "linear-gradient(135deg, #a78bfa, #f472b6)", color: "#fff",
            transition: "opacity 0.2s", display: "inline-block",
          }}>
            Browse All Loaders →
          </Link>
          <Link href="/docs" style={{
            padding: "0.65rem 1.5rem", borderRadius: 10, fontWeight: 600, fontSize: "0.9rem",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0",
            transition: "all 0.2s", display: "inline-block",
          }}>
            Documentation
          </Link>
        </div>
      </section>

      {/* 4 Zigzag Carousels */}
      {rows.map((row, i) => (
        <section key={i} className="carousel-section">
          <div className="see-all-row">
            <h2 style={{ padding: 0, margin: 0 }}>{row.title}</h2>
            <Link href="/loaders" className="see-all-link">See all →</Link>
          </div>
          <div className={`carousel-track ${row.reverse ? "reverse" : ""}`}>
            {[...row.loaders, ...row.loaders].map((loader, j) => (
              <Link key={`${loader.id}-${j}`} href={`/loaders/${loader.id}`} className="loader-card">
                <div className="preview">
                  <LoaderPreview css={loader.css} html={loader.html} size={60} color={loader.defaults.color} secondaryColor={loader.defaults.secondaryColor} speed={loader.defaults.speed} strokeWidth={loader.defaults.strokeWidth} />
                </div>
                <span className="card-name">{loader.name}</span>
                <span className="card-cat">{loader.category}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "4rem 2rem 5rem" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.75rem" }}>Ready to get started?</h2>
        <p style={{ color: "#94a3b8", marginBottom: "1.5rem", maxWidth: 460, margin: "0 auto 1.5rem" }}>
          Browse all 100+ loaders, customize them to match your brand, and copy the code with a single click.
        </p>
        <Link href="/loaders" style={{
          padding: "0.7rem 2rem", borderRadius: 10, fontWeight: 700, fontSize: "0.95rem",
          background: "linear-gradient(135deg, #a78bfa, #f472b6)", color: "#fff",
          display: "inline-block",
        }}>
          Explore All Loaders →
        </Link>
        <div style={{ marginTop: "2rem" }}>
          <a href="https://github.com/mohit-rajput-raj" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 1.2rem", borderRadius: 8,
            background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)",
            color: "#fbbf24", fontWeight: 600, fontSize: "0.85rem",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Give us a ⭐ on GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
