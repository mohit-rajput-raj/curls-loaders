"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { LOADERS, CATEGORIES } from "../data/loaders";
import { LoaderPreview } from "../components/LoaderPreview";

export default function LoadersPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const filtered = useMemo(() => {
    return LOADERS.filter(l => {
      const matchCat = activeCat === "all" || l.category === activeCat;
      const matchSearch = !search.trim() || l.name.toLowerCase().includes(search.toLowerCase()) || l.category.includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCat]);

  return (
    <div className="page-container">
      <h1 className="page-title">All Loaders</h1>
      <p className="page-subtitle">{LOADERS.length} beautiful CSS loading animations — click any card to customize & copy code</p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "center" }}>
        <div className="navbar-search" style={{ maxWidth: 300, flex: "1 1 250px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input placeholder="Search loaders..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="filter-bar" style={{ margin: 0 }}>
          <button className={`filter-btn ${activeCat === "all" ? "active" : ""}`} onClick={() => setActiveCat("all")}>All</button>
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-btn ${activeCat === c ? "active" : ""}`} onClick={() => setActiveCat(c)}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>
          <p style={{ fontSize: "1.1rem" }}>No loaders found matching "{search}"</p>
        </div>
      )}

      <div className="loaders-grid">
        {filtered.map(loader => (
          <Link key={loader.id} href={`/loaders/${loader.id}`} className="loader-card">
            <div className="preview">
              <LoaderPreview css={loader.css} html={loader.html} size={60} color={loader.defaults.color} secondaryColor={loader.defaults.secondaryColor} speed={loader.defaults.speed} strokeWidth={loader.defaults.strokeWidth} />
            </div>
            <span className="card-name">{loader.name}</span>
            <span className="card-cat">{loader.category}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
