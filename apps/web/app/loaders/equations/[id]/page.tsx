"use client";
import { useState, use } from "react";
import Link from "next/link";
import { EQUATION_LOADERS } from "../../../data/equation-loaders";
import { EquationLoaderPreview } from "../../../components/EquationLoaderPreview";
import { ArrowLeft, Check, Copy, Terminal, Code2, Settings2, RotateCcw, FunctionSquare } from "lucide-react";

export default function EquationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const loader = EQUATION_LOADERS.find(l => l.id === id);

  const [size, setSize] = useState(loader?.defaults.size ?? 200);
  const [color, setColor] = useState(loader?.defaults.color ?? "#0f172a");
  const [secondaryColor, setSecondaryColor] = useState(loader?.defaults.secondaryColor ?? "#94a3b8");
  const [speed, setSpeed] = useState(loader?.defaults.speed ?? 1);
  const [strokeWidth, setStrokeWidth] = useState(loader?.defaults.strokeWidth ?? 2);
  const [theta, setTheta] = useState(loader?.defaults.theta ?? 360);
  const [petals, setPetals] = useState(loader?.defaults.petals ?? 5);
  const [denominator, setDenominator] = useState(loader?.defaults.denominator ?? 1);
  const [freqX, setFreqX] = useState(loader?.defaults.freqX ?? 3);
  const [freqY, setFreqY] = useState(loader?.defaults.freqY ?? 2);
  const [phaseDelta, setPhaseDelta] = useState(loader?.defaults.phaseDelta ?? 90);
  const [arms, setArms] = useState(loader?.defaults.arms ?? 3);
  const [tightness, setTightness] = useState(loader?.defaults.tightness ?? 0.12);
  const [symmetry, setSymmetry] = useState(loader?.defaults.symmetry ?? 8);
  const [layers, setLayers] = useState(loader?.defaults.layers ?? 4);
  const [innerRadius, setInnerRadius] = useState(loader?.defaults.innerRadius ?? 3);
  const [outerRadius, setOuterRadius] = useState(loader?.defaults.outerRadius ?? 7);
  const [trailLength, setTrailLength] = useState(loader?.defaults.trailLength ?? 0.75);
  const [cliCopied, setCliCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  if (!loader) {
    return (
      <div className="detail-container" style={{ textAlign: "center", paddingTop: "10rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Equation loader not found</h1>
        <Link href="/loaders/equations" style={{ color: "var(--text-primary)" }} className="back-link"><ArrowLeft className="w-4 h-4" /> Back to equation loaders</Link>
      </div>
    );
  }

  const comp = loader.component;

  // Build code snippet for the current configuration
  const buildCodeSnippet = () => {
    const props: string[] = [];
    props.push(`size={${size}}`);
    props.push(`color="${color}"`);
    props.push(`secondaryColor="${secondaryColor}"`);
    if (speed !== 1) props.push(`speed={${speed}}`);
    if (strokeWidth !== 2) props.push(`strokeWidth={${strokeWidth}}`);
    if (comp === "RoseLoader") {
      props.push(`petals={${petals}}`);
      if (denominator !== 1) props.push(`denominator={${denominator}}`);
    }
    if (comp === "LissajousLoader") {
      props.push(`freqX={${freqX}}`);
      props.push(`freqY={${freqY}}`);
      props.push(`phaseDelta={${(phaseDelta / 180 * Math.PI).toFixed(4)}}`);
      props.push(`trailLength={${trailLength}}`);
    }
    if (comp === "SpiralLoader") {
      props.push(`arms={${arms}}`);
      props.push(`tightness={${tightness}}`);
    }
    if (comp === "HypotrochoidLoader" || comp === "EpitrochoidLoader") {
      props.push(`innerRadius={${innerRadius}}`);
      props.push(`outerRadius={${outerRadius}}`);
      props.push(`theta={${theta}}`);
    }
    if (comp === "ButterflyLoader" || comp === "CardioidLoader" || comp === "AstroidLoader") {
      props.push(`theta={${theta}}`);
    }
    if (comp === "FermatLoader") {
      props.push(`arms={${arms}}`);
      props.push(`theta={${theta}}`);
    }
    if (comp === "MandalaLoader") {
      props.push(`symmetry={${symmetry}}`);
      props.push(`layers={${layers}}`);
    }
    return `import { ${comp} } from "curls-loaders";\n\n<${comp}\n  ${props.join("\n  ")}\n/>`;
  };

  const resetAll = () => {
    setSize(loader.defaults.size);
    setColor(loader.defaults.color);
    setSecondaryColor(loader.defaults.secondaryColor);
    setSpeed(loader.defaults.speed);
    setStrokeWidth(loader.defaults.strokeWidth);
    setTheta(loader.defaults.theta);
    if (loader.defaults.petals) setPetals(loader.defaults.petals);
    if (loader.defaults.denominator) setDenominator(loader.defaults.denominator);
    if (loader.defaults.freqX) setFreqX(loader.defaults.freqX);
    if (loader.defaults.freqY) setFreqY(loader.defaults.freqY);
    if (loader.defaults.phaseDelta) setPhaseDelta(loader.defaults.phaseDelta);
    if (loader.defaults.arms) setArms(loader.defaults.arms);
    if (loader.defaults.tightness) setTightness(loader.defaults.tightness);
    if (loader.defaults.symmetry) setSymmetry(loader.defaults.symmetry);
    if (loader.defaults.layers) setLayers(loader.defaults.layers);
    if (loader.defaults.innerRadius) setInnerRadius(loader.defaults.innerRadius);
    if (loader.defaults.outerRadius) setOuterRadius(loader.defaults.outerRadius);
    if (loader.defaults.trailLength) setTrailLength(loader.defaults.trailLength);
  };

  return (
    <div className="detail-container">
      <Link href="/loaders/equations" className="back-link">
        <ArrowLeft className="w-4 h-4" />
        Back to equation loaders
      </Link>

      <div className="eq-detail-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>{loader.name}</h1>
          <span className="badge">
            <FunctionSquare className="w-3.5 h-3.5" /> Equation
          </span>
        </div>
        <div className="eq-equation-display">
          <code>{loader.equation}</code>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.6, maxWidth: 600 }}>
          {loader.description}
        </p>
      </div>

      {/* CLI install */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="cli-box" onClick={() => { navigator.clipboard.writeText("npm i curls-loaders"); setCliCopied(true); setTimeout(() => setCliCopied(false), 2000); }} style={{ display: "inline-flex" }}>
          <Terminal className="w-4 h-4 text-slate-400" />
          <span>npm i curls-loaders</span>
          <button className="copy-btn" aria-label="Copy CLI">
            {cliCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="detail-grid">
        {/* Preview */}
        <div className="detail-preview eq-detail-preview">
          <EquationLoaderPreview
            component={loader.component}
            size={size}
            color={color}
            secondaryColor={secondaryColor}
            speed={speed}
            strokeWidth={strokeWidth}
            theta={theta}
            petals={petals}
            denominator={denominator}
            freqX={freqX}
            freqY={freqY}
            phaseDelta={phaseDelta}
            trailLength={trailLength}
            arms={arms}
            tightness={tightness}
            symmetry={symmetry}
            layers={layers}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
        </div>

        {/* Controls */}
        <div className="detail-controls">
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Settings2 className="w-5 h-5" /> Customize
          </h3>

          {/* θ Theta — the star control */}
          <div className="control-group eq-theta-control">
            <label>θ Theta <span>{theta}°</span></label>
            <input type="range" min="30" max="1440" value={theta} onChange={e => setTheta(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Speed <span>{speed.toFixed(1)}x</span></label>
            <input type="range" min="0.1" max="5" step="0.1" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Stroke Width <span>{strokeWidth}px</span></label>
            <input type="range" min="1" max="8" step="0.5" value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Size <span>{size}px</span></label>
            <input type="range" min="60" max="350" value={size} onChange={e => setSize(Number(e.target.value))} />
          </div>

          {/* Equation-specific controls */}
          {(comp === "RoseLoader") && (
            <>
              <div className="control-group">
                <label>Petals (k) <span>{petals}</span></label>
                <input type="range" min="1" max="12" value={petals} onChange={e => setPetals(Number(e.target.value))} />
              </div>
              <div className="control-group">
                <label>Denominator <span>{denominator}</span></label>
                <input type="range" min="1" max="8" value={denominator} onChange={e => setDenominator(Number(e.target.value))} />
              </div>
            </>
          )}

          {(comp === "LissajousLoader") && (
            <>
              <div className="control-group">
                <label>Freq X (a) <span>{freqX}</span></label>
                <input type="range" min="1" max="10" value={freqX} onChange={e => setFreqX(Number(e.target.value))} />
              </div>
              <div className="control-group">
                <label>Freq Y (b) <span>{freqY}</span></label>
                <input type="range" min="1" max="10" value={freqY} onChange={e => setFreqY(Number(e.target.value))} />
              </div>
              <div className="control-group">
                <label>Phase δ <span>{phaseDelta}°</span></label>
                <input type="range" min="0" max="360" value={phaseDelta} onChange={e => setPhaseDelta(Number(e.target.value))} />
              </div>
              <div className="control-group">
                <label>Trail Length <span>{trailLength.toFixed(2)}</span></label>
                <input type="range" min="0.1" max="1" step="0.05" value={trailLength} onChange={e => setTrailLength(Number(e.target.value))} />
              </div>
            </>
          )}

          {(comp === "SpiralLoader") && (
            <>
              <div className="control-group">
                <label>Arms <span>{arms}</span></label>
                <input type="range" min="1" max="8" value={arms} onChange={e => setArms(Number(e.target.value))} />
              </div>
              <div className="control-group">
                <label>Tightness <span>{tightness.toFixed(2)}</span></label>
                <input type="range" min="0.02" max="0.5" step="0.02" value={tightness} onChange={e => setTightness(Number(e.target.value))} />
              </div>
            </>
          )}

          {(comp === "HypotrochoidLoader" || comp === "EpitrochoidLoader") && (
            <>
              <div className="control-group">
                <label>Inner Radius <span>{innerRadius}</span></label>
                <input type="range" min="1" max="10" value={innerRadius} onChange={e => setInnerRadius(Number(e.target.value))} />
              </div>
              <div className="control-group">
                <label>Outer Radius <span>{outerRadius}</span></label>
                <input type="range" min="2" max="12" value={outerRadius} onChange={e => setOuterRadius(Number(e.target.value))} />
              </div>
            </>
          )}

          {(comp === "FermatLoader") && (
            <div className="control-group">
              <label>Arms <span>{arms}</span></label>
              <input type="range" min="1" max="6" value={arms} onChange={e => setArms(Number(e.target.value))} />
            </div>
          )}

          {(comp === "MandalaLoader") && (
            <>
              <div className="control-group">
                <label>Symmetry <span>{symmetry}</span></label>
                <input type="range" min="3" max="16" value={symmetry} onChange={e => setSymmetry(Number(e.target.value))} />
              </div>
              <div className="control-group">
                <label>Layers <span>{layers}</span></label>
                <input type="range" min="1" max="8" value={layers} onChange={e => setLayers(Number(e.target.value))} />
              </div>
            </>
          )}

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
                <input type="color" value={secondaryColor.startsWith("#") ? secondaryColor : "#94a3b8"} onChange={e => setSecondaryColor(e.target.value)} />
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "'Fira Code', monospace" }}>{secondaryColor}</span>
              </div>
            </div>
          </div>

          <button onClick={resetAll} className="btn-outline" style={{ marginTop: "0.5rem", justifyContent: "center" }}>
            <RotateCcw className="w-4 h-4" /> Reset to defaults
          </button>
        </div>
      </div>

      {/* Code Panel */}
      <div className="code-panel" style={{ marginTop: "2.5rem" }}>
        <div className="code-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Code2 className="w-5 h-5 text-slate-400" />
            <span style={{ fontSize: "0.875rem", color: "#f8fafc", fontWeight: 500 }}>React Component</span>
          </div>
          <button className="copy-code-btn" onClick={() => { navigator.clipboard.writeText(buildCodeSnippet()); setCodeCopied(true); setTimeout(() => setCodeCopied(false), 2000); }}>
            {codeCopied ? (
              <><Check className="w-4 h-4 text-green-500" /> Copied!</>
            ) : (
              <><Copy className="w-4 h-4" /> Copy Code</>
            )}
          </button>
        </div>
        <div className="code-body">{buildCodeSnippet()}</div>
      </div>
    </div>
  );
}
