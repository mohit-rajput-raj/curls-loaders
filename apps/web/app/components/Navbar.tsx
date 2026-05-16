"use client";
import Link from "next/link";
import { useState } from "react";
import { LOADERS } from "../data/loaders";

export function Navbar() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const filtered = query.trim()
    ? LOADERS.filter(l => l.name.toLowerCase().includes(query.toLowerCase()) || l.category.includes(query.toLowerCase())).slice(0, 8)
    : [];

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">curls-loaders</Link>
      <div className="navbar-search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          type="text"
          placeholder="Search 100+ loaders..."
          value={query}
          onChange={e => { setQuery(e.target.value); setShowResults(true); }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        {showResults && filtered.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            background: "rgba(18,18,31,0.98)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12, overflow: "hidden", zIndex: 200,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          }}>
            {filtered.map(l => (
              <Link
                key={l.id} href={`/loaders/${l.id}`}
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.6rem 1rem", fontSize: "0.85rem",
                  color: "#e2e8f0", transition: "background 0.15s",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                onClick={() => { setQuery(""); setShowResults(false); }}
              >
                <span style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", minWidth: 60 }}>{l.category}</span>
                <span style={{ fontWeight: 600 }}>{l.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="navbar-links">
        <Link href="/loaders">All Loaders</Link>
        <Link href="/docs">Docs</Link>
        <a href="https://github.com/mohit-rajput-raj" target="_blank" rel="noopener noreferrer" className="github-star">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Star on GitHub
        </a>
      </div>
    </nav>
  );
}
