"use client";
import Link from "next/link";
import { useState } from "react";
import { LOADERS } from "../data/loaders";
import { Search } from "lucide-react";

export function Navbar() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const filtered = query.trim()
    ? LOADERS.filter(l => l.name.toLowerCase().includes(query.toLowerCase()) || l.category.includes(query.toLowerCase())).slice(0, 8)
    : [];

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        curls-loaders
      </Link>
      <div className="navbar-search">
        <Search className="w-4 h-4 text-slate-400" />
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
            position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
            background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius)", overflow: "hidden", zIndex: 200,
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          }}>
            {filtered.map(l => (
              <Link
                key={l.id} href={`/loaders/${l.id}`}
                style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.75rem 1rem", fontSize: "0.875rem",
                  color: "var(--text-primary)", transition: "background 0.15s",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                onClick={() => { setQuery(""); setShowResults(false); }}
              >
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", minWidth: 60, fontWeight: 500 }}>{l.category}</span>
                <span style={{ fontWeight: 500 }}>{l.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="navbar-links">
        <Link href="/loaders">All Loaders</Link>
        <Link href="/loaders/equations">Equations</Link>
        <Link href="/docs">Docs</Link>
        <a href="https://github.com/mohit-rajput-raj" target="_blank" rel="noopener noreferrer" className="github-star">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          Star on GitHub
        </a>
      </div>
    </nav>
  );
}
