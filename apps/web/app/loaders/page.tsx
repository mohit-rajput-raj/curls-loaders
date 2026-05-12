"use client";

import {
  SpiralLoader,
  LissajousLoader,
  WaveLoader,
  PulseRingLoader,
  OrbitLoader,
  FractalTreeLoader,
  RoseLoader,
  MandalaLoader,
  InfinityLoader,
  HelixLoader,
} from "curls-loaders";

const loaders = [
  {
    name: "Spiral",
    math: "r = a + b·θ",
    el: <SpiralLoader size={120} />,
  },
  {
    name: "Lissajous",
    math: "x = A·sin(at+δ), y = B·sin(bt)",
    el: <LissajousLoader size={120} />,
  },
  {
    name: "Wave",
    math: "y = A·sin(ωx − φt)",
    el: <WaveLoader size={120} />,
  },
  {
    name: "Pulse Ring",
    math: "r(t) = R·((t−d) mod T)/T",
    el: <PulseRingLoader size={120} />,
  },
  {
    name: "Orbit",
    math: "x = a·cosθ, y = b·sinθ",
    el: <OrbitLoader size={120} />,
  },
  {
    name: "Fractal Tree",
    math: "θ(t) = θ₀ + A·sin(ωt)",
    el: <FractalTreeLoader size={120} />,
  },
  {
    name: "Rose",
    math: "r = cos(kθ)",
    el: <RoseLoader size={120} />,
  },
  {
    name: "Mandala",
    math: "polar grid: (r, 2πn/k)",
    el: <MandalaLoader size={120} />,
  },
  {
    name: "Infinity",
    math: "x = a·cosθ / (1+sin²θ)",
    el: <InfinityLoader size={120} />,
  },
  {
    name: "Helix",
    math: "x = R·cos(θ), z = R·sin(θ)",
    el: <HelixLoader size={120} />,
  },
];

export default function LoadersDemo() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1025 40%, #0d1117 100%)",
        padding: "3rem 1.5rem",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        color: "#e2e8f0",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, #a78bfa, #f472b6, #fbbf24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
          }}
        >
          curls-loaders
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: 520, margin: "0 auto" }}>
          10 mathematical loaders powered by pure Canvas & React — zero dependencies.
        </p>
        <code
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.5rem 1.2rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#c084fc",
            fontSize: "0.95rem",
          }}
        >
          pnpm i curls-loaders
        </code>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.5rem",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {loaders.map(({ name, math, el }) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              padding: "2rem 1rem",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            {el}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>{name}</div>
              <div
                style={{
                  marginTop: "0.25rem",
                  fontSize: "0.75rem",
                  color: "#64748b",
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                {math}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
