"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="docs-container">
      <Link href="/" className="back-link">
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>
      <h1>
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
      <SpiralLoader size={80} color="var(--text-primary)" speed={1.2} />
      <OrbitLoader size={60} />
      <WaveLoader size={100} />
    </div>
  );
}`}</code></pre>

      <h2>CSS-Only Loaders</h2>
      <p>
        In addition to React canvas components, we provide <strong>100+ pure CSS loaders</strong> that
        work anywhere — no JavaScript framework required. Browse the{" "}
        <Link href="/loaders" style={{ color: "var(--text-primary)", fontWeight: 500, textDecoration: "underline" }}>loader gallery</Link>,
        customize with live controls, and copy the CSS + HTML code.
      </p>
      <pre><code>{`<!-- Just paste the CSS and HTML into your project -->
<style>
  .cl-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(15, 23, 42, 0.1);
    border-top-color: #0f172a;
    border-radius: 50%;
    animation: cl-spin 1s linear infinite;
  }
  @keyframes cl-spin {
    to { transform: rotate(360deg); }
  }
</style>

<div class="cl-spinner"></div>`}</code></pre>

      <h2>React Components</h2>
      <p>The npm package includes mathematical canvas-based loaders:</p>
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
  --c1: #0f172a;                 /* Primary color */
  --c2: rgba(15,23,42,0.1);      /* Secondary color */
  --sp: 1.5;                     /* Speed multiplier */
  --w: 3px;                      /* Stroke width */
}`}</code></pre>

      <h2>Browser Support</h2>
      <p>CSS loaders work in all modern browsers. Canvas-based React loaders require a browser with Canvas 2D support (all modern browsers).</p>

      <h2>Contributing</h2>
      <p>
        We welcome contributions! Check out the repository and give us a star on GitHub.
      </p>
      <div style={{ marginTop: "1rem", marginBottom: "3rem" }}>
        <a href="https://github.com/mohit-rajput-raj" target="_blank" rel="noopener noreferrer" className="btn-outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          Star on GitHub — mohit-rajput-raj
        </a>
      </div>
    </div>
  );
}
