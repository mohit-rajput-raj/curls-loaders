"use client";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="docs-container">
      <Link href="/" className="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        Home
      </Link>
      <h1 style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Documentation
      </h1>
      <p>Everything you need to get started with curls-loaders.</p>

      <h2>Installation</h2>
      <p>Install the package using your preferred package manager:</p>
      <pre><code>{`# npm
npm install curls-loaders

# pnpm
pnpm add curls-loaders

# yarn
yarn add curls-loaders`}</code></pre>

      <h2>Quick Start</h2>
      <p>Import and use any loader component in your React application:</p>
      <pre><code>{`import { SpiralLoader, OrbitLoader, WaveLoader } from "curls-loaders";

function App() {
  return (
    <div>
      <SpiralLoader size={80} color="#a78bfa" speed={1.2} />
      <OrbitLoader size={60} particles={4} />
      <WaveLoader size={100} waves={5} frequency={4} />
    </div>
  );
}`}</code></pre>

      <h2>CSS-Only Loaders</h2>
      <p>
        In addition to React canvas components, we provide <strong>100+ pure CSS loaders</strong> that
        work anywhere — no JavaScript framework required. Browse the{" "}
        <Link href="/loaders" style={{ color: "#a78bfa", textDecoration: "underline" }}>loader gallery</Link>,
        customize with live controls, and copy the CSS + HTML code.
      </p>
      <pre><code>{`<!-- Just paste the CSS and HTML into your project -->
<style>
  .cl-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255,255,255,0.15);
    border-top-color: #a78bfa;
    border-radius: 50%;
    animation: cl-spin 1s linear infinite;
  }
  @keyframes cl-spin {
    to { transform: rotate(360deg); }
  }
</style>

<div class="cl-spinner"></div>`}</code></pre>

      <h2>React Components</h2>
      <p>The npm package includes 10 mathematical canvas-based loaders:</p>
      <ul>
        <li><code>SpiralLoader</code> — Archimedean spiral: r = a + b·θ</li>
        <li><code>LissajousLoader</code> — Parametric Lissajous curves</li>
        <li><code>WaveLoader</code> — Superimposed sine waves</li>
        <li><code>PulseRingLoader</code> — Expanding concentric rings</li>
        <li><code>OrbitLoader</code> — Kepler-inspired elliptical orbits</li>
        <li><code>FractalTreeLoader</code> — Recursive fractal tree</li>
        <li><code>RoseLoader</code> — Rhodonea / Rose curves</li>
        <li><code>MandalaLoader</code> — Rotating polar mandala</li>
        <li><code>InfinityLoader</code> — Lemniscate of Bernoulli</li>
        <li><code>HelixLoader</code> — 3D projected DNA helix</li>
      </ul>

      <h2>Common Props</h2>
      <p>All React loader components share these base props:</p>
      <pre><code>{`interface LoaderBaseProps {
  size?: number;           // Width & height in px (default: 64)
  color?: string;          // Primary color (any CSS color)
  secondaryColor?: string; // Secondary / trail color
  speed?: number;          // Animation speed multiplier (default: 1)
  strokeWidth?: number;    // Line thickness in px
  style?: CSSProperties;   // Additional inline styles
  className?: string;      // Additional CSS class
}`}</code></pre>
      <p>Each loader also has unique props — for example, <code>SpiralLoader</code> accepts <code>arms</code> and <code>tightness</code>.</p>

      <h2>CSS Custom Properties</h2>
      <p>CSS loaders use custom properties for easy customization:</p>
      <pre><code>{`/* Override via inline styles or parent class */
.my-loader {
  --s: 60px;                     /* Size */
  --c1: #a78bfa;                 /* Primary color */
  --c2: rgba(255,255,255,0.1);   /* Secondary color */
  --sp: 1.5;                     /* Speed multiplier */
  --w: 3px;                      /* Stroke width */
}`}</code></pre>

      <h2>Browser Support</h2>
      <p>CSS loaders work in all modern browsers. Canvas-based React loaders require a browser with Canvas 2D support (all modern browsers).</p>

      <h2>Contributing</h2>
      <p>
        We welcome contributions! Check out the repository and give us a star ⭐
      </p>
      <div style={{ marginTop: "1rem", marginBottom: "3rem" }}>
        <a
          href="https://github.com/mohit-rajput-raj"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.6rem 1.4rem", borderRadius: 10,
            background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)",
            color: "#fbbf24", fontWeight: 700, fontSize: "0.9rem",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          Star on GitHub — mohit-rajput-raj
        </a>
      </div>
    </div>
  );
}
