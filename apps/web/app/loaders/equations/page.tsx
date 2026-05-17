"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { EQUATION_LOADERS } from "../../data/equation-loaders";
import { EquationLoaderPreview } from "../../components/EquationLoaderPreview";
import { FunctionSquare, Palette, Gauge, Settings2, Search, ArrowLeft } from "lucide-react";

export default function EquationsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return EQUATION_LOADERS.filter(l => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.equation.toLowerCase().includes(q) || l.description.toLowerCase().includes(q);
    });
  }, [search]);

  return (
    <div className="page-container">
      <div className="eq-page-header">
        <div className="eq-badge-row">
          <span className="badge"><FunctionSquare className="w-3 h-3" /> Math Equations</span>
          <span className="badge"><Palette className="w-3 h-3" /> Canvas Rendered</span>
          <span className="badge"><Gauge className="w-3 h-3" /> 60fps</span>
          <span className="badge"><Settings2 className="w-3 h-3" /> Theta Controls</span>
        </div>
        <h1 className="page-title" style={{ fontSize: "2.4rem" }}>
          Equation Loaders
        </h1>
        <p className="page-subtitle" style={{ maxWidth: 600 }}>
          {EQUATION_LOADERS.length} mathematical curve loaders powered by polar & parametric equations.
          Each loader lets you control <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>θ (theta)</strong>, angles, speed, stroke & equation-specific parameters.
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem", alignItems: "center" }}>
        <div className="navbar-search" style={{ maxWidth: 350, flex: "1 1 280px" }}>
          <Search className="w-4 h-4 text-slate-400" />
          <input placeholder="Search equation loaders..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Link href="/loaders" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
          <ArrowLeft className="w-4 h-4" /> CSS Loaders
        </Link>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1.1rem" }}>No equation loaders found matching &ldquo;{search}&rdquo;</p>
        </div>
      )}

      <div className="eq-grid">
        {filtered.map(loader => (
          <Link key={loader.id} href={`/loaders/equations/${loader.id}`} className="eq-card">
            <div className="eq-card-canvas">
              <EquationLoaderPreview
                component={loader.component}
                size={100}
                color={loader.defaults.color}
                secondaryColor={loader.defaults.secondaryColor}
                speed={loader.defaults.speed}
                strokeWidth={loader.defaults.strokeWidth}
                theta={loader.defaults.theta}
                petals={loader.defaults.petals}
                denominator={loader.defaults.denominator}
                freqX={loader.defaults.freqX}
                freqY={loader.defaults.freqY}
                phaseDelta={loader.defaults.phaseDelta}
                trailLength={loader.defaults.trailLength}
                arms={loader.defaults.arms}
                tightness={loader.defaults.tightness}
                symmetry={loader.defaults.symmetry}
                layers={loader.defaults.layers}
                innerRadius={loader.defaults.innerRadius}
                outerRadius={loader.defaults.outerRadius}
              />
            </div>
            <div className="eq-card-info">
              <span className="eq-card-name">{loader.name}</span>
              <code className="eq-card-equation">{loader.equation}</code>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
