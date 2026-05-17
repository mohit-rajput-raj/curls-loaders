"use client";
import Link from "next/link";
import { LOADERS } from "./data/loaders";
import { EQUATION_LOADERS } from "./data/equation-loaders";
import { LoaderPreview } from "./components/LoaderPreview";
import { EquationLoaderPreview } from "./components/EquationLoaderPreview";
import { useState } from "react";
import {
  Copy, Check, ChevronRight, Terminal,
  Palette, PlaySquare, FunctionSquare, LayoutTemplate,
  Sparkles, Layers, BarChart, Settings2,
  Activity, CircleDot, MoveDiagonal
} from "lucide-react";

const ROW_SIZE = 10;
const rows = [
  { title: "Spinners", icon: <CircleDot className="w-5 h-5 text-slate-500" />, loaders: LOADERS.filter(l => l.category === "spinners").slice(0, ROW_SIZE), reverse: false },
  { title: "Dots & Pulses", icon: <Activity className="w-5 h-5 text-slate-500" />, loaders: LOADERS.filter(l => l.category === "dots").slice(0, ROW_SIZE), reverse: true },
  { title: "Bars & Equalizers", icon: <BarChart className="w-5 h-5 text-slate-500" />, loaders: LOADERS.filter(l => l.category === "bars").slice(0, ROW_SIZE), reverse: false },
  { title: "Shapes & Creative", icon: <Sparkles className="w-5 h-5 text-slate-500" />, loaders: [...LOADERS.filter(l => l.category === "shapes").slice(0, 5), ...LOADERS.filter(l => l.category === "creative").slice(0, 5)], reverse: true },
];

function CopyCliBox() {
  const [copied, setCopied] = useState(false);
  const cmd = "npm i curls-loaders";
  return (
    <div className="cli-box" onClick={() => { navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
      <Terminal className="w-4 h-4 text-slate-400" />
      <span>{cmd}</span>
      <button className="copy-btn" aria-label="Copy">
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
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
          <span className="badge"><LayoutTemplate className="w-3.5 h-3.5" /> 100+ Loaders</span>
          <span className="badge"><Copy className="w-3.5 h-3.5" /> Copy & Paste</span>
          <span className="badge"><Sparkles className="w-3.5 h-3.5" /> Pure CSS</span>
          <span className="badge"><FunctionSquare className="w-3.5 h-3.5" /> Math Equations</span>
          <span className="badge"><Settings2 className="w-3.5 h-3.5" /> Customizable</span>
        </div>
        <h1>Beautiful Loading Animations</h1>
        <p>
          A curated collection of 100+ stunning CSS loaders & mathematical equation loaders. Browse, customize with live controls, copy the code, and drop into any project — zero dependencies.
        </p>
        <CopyCliBox />
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/loaders" className="btn-primary">
            Browse All Loaders <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/loaders/equations" className="btn-outline">
            <FunctionSquare className="w-4 h-4" /> Equation Loaders
          </Link>
          <Link href="/docs" className="btn-secondary">
            Documentation
          </Link>
        </div>
      </section>

      {/* Equation Loaders Carousel */}
      <section className="carousel-section">
        <div className="see-all-row">
          <h2 style={{ padding: 0, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FunctionSquare className="w-5 h-5 text-slate-500" /> Equation Loaders
          </h2>
          <Link href="/loaders/equations" className="see-all-link">See all <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="carousel-track">
          {[...EQUATION_LOADERS, ...EQUATION_LOADERS].map((loader, j) => (
            <Link key={`${loader.id}-${j}`} href={`/loaders/equations/${loader.id}`} className="loader-card">
              <div className="preview">
                <EquationLoaderPreview
                  component={loader.component}
                  size={60}
                  color={loader.defaults.color}
                  secondaryColor={loader.defaults.secondaryColor}
                  speed={loader.defaults.speed}
                  strokeWidth={loader.defaults.strokeWidth}
                  petals={loader.defaults.petals}
                  denominator={loader.defaults.denominator}
                  freqX={loader.defaults.freqX}
                  freqY={loader.defaults.freqY}
                  phaseDelta={loader.defaults.phaseDelta}
                  arms={loader.defaults.arms}
                  tightness={loader.defaults.tightness}
                  symmetry={loader.defaults.symmetry}
                  layers={loader.defaults.layers}
                  innerRadius={loader.defaults.innerRadius}
                  outerRadius={loader.defaults.outerRadius}
                />
              </div>
              <span className="card-name">{loader.name}</span>
              <span className="card-cat">equation</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4 Zigzag Carousels */}
      {rows.map((row, i) => (
        <section key={i} className="carousel-section">
          <div className="see-all-row">
            <h2 style={{ padding: 0, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {row.icon} {row.title}
            </h2>
            <Link href="/loaders" className="see-all-link">See all <ChevronRight className="w-4 h-4" /></Link>
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
      <section style={{ textAlign: "center", padding: "5rem 2rem 6rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", letterSpacing: "-0.02em" }}>Ready to get started?</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem", fontSize: "1.125rem", lineHeight: 1.6 }}>
          Browse all 100+ loaders, customize them to match your brand, and copy the code with a single click.
        </p>
        <Link href="/loaders" className="btn-primary">
          Explore All Loaders <ChevronRight className="w-4 h-4" />
        </Link>
        <div style={{ marginTop: "2rem" }}>
          <a href="https://github.com/mohit-rajput-raj" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> Give us a Star on GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
