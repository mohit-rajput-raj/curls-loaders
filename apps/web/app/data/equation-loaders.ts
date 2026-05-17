export interface EquationLoaderDef {
  id: string;
  name: string;
  equation: string;          // LaTeX-like equation display
  description: string;
  /** Which canvas component to render */
  component: string;
  defaults: {
    size: number;
    color: string;
    secondaryColor: string;
    speed: number;
    strokeWidth: number;
    theta: number;            // angle parameter
    // equation-specific params
    petals?: number;
    denominator?: number;
    freqX?: number;
    freqY?: number;
    phaseDelta?: number;
    arms?: number;
    tightness?: number;
    symmetry?: number;
    layers?: number;
    innerRadius?: number;
    outerRadius?: number;
    trailLength?: number;
  };
}

export const EQUATION_LOADERS: EquationLoaderDef[] = [
  {
    id: "rose-curve",
    name: "Rose Curve",
    equation: "r = cos(kθ)",
    description: "A rhodonea rose curve where petals emerge from polar coordinates. Adjust k (petals) and theta to morph the flower.",
    component: "RoseLoader",
    defaults: {
      size: 200,
      color: "#f43f5e",
      secondaryColor: "#881337",
      speed: 1,
      strokeWidth: 2,
      theta: 360,
      petals: 5,
      denominator: 1,
    },
  },
  {
    id: "lissajous",
    name: "Lissajous Figure",
    equation: "x = sin(aθ + δ), y = sin(bθ)",
    description: "Parametric curves from two perpendicular oscillations. Change frequency ratios to discover intricate interlocking patterns.",
    component: "LissajousLoader",
    defaults: {
      size: 200,
      color: "#34d399",
      secondaryColor: "#059669",
      speed: 1,
      strokeWidth: 2.5,
      theta: 360,
      freqX: 3,
      freqY: 2,
      phaseDelta: 90,
      trailLength: 0.75,
    },
  },
  {
    id: "spiral",
    name: "Archimedean Spiral",
    equation: "r = a + bθ",
    description: "The classic spiral of Archimedes — arms wind outward at a constant rate. Adjust tightness and arm count.",
    component: "SpiralLoader",
    defaults: {
      size: 200,
      color: "#a78bfa",
      secondaryColor: "#6d28d9",
      speed: 1,
      strokeWidth: 2.5,
      theta: 720,
      arms: 3,
      tightness: 0.12,
    },
  },
  {
    id: "hypotrochoid",
    name: "Hypotrochoid",
    equation: "x = (R-r)cos(θ) + d·cos((R-r)θ/r)",
    description: "Like a Spirograph! A circle rolls inside a larger one, tracing elegant looping patterns.",
    component: "HypotrochoidLoader",
    defaults: {
      size: 200,
      color: "#38bdf8",
      secondaryColor: "#0284c7",
      speed: 1,
      strokeWidth: 2,
      theta: 360,
      innerRadius: 3,
      outerRadius: 7,
    },
  },
  {
    id: "epitrochoid",
    name: "Epitrochoid",
    equation: "x = (R+r)cos(θ) - d·cos((R+r)θ/r)",
    description: "A circle rolls outside another — the dual of the hypotrochoid. Creates flower-like looping curves.",
    component: "EpitrochoidLoader",
    defaults: {
      size: 200,
      color: "#f472b6",
      secondaryColor: "#be185d",
      speed: 1,
      strokeWidth: 2,
      theta: 360,
      innerRadius: 3,
      outerRadius: 5,
    },
  },
  {
    id: "butterfly",
    name: "Butterfly Curve",
    equation: "r = e^(sinθ) - 2cos(4θ) + sin⁵(θ/12)",
    description: "Temple Fay's butterfly — an exotic polar curve resembling butterfly wings. Pure mathematical beauty.",
    component: "ButterflyLoader",
    defaults: {
      size: 200,
      color: "#e879f9",
      secondaryColor: "#a21caf",
      speed: 0.6,
      strokeWidth: 2,
      theta: 360,
    },
  },
  {
    id: "fermat-spiral",
    name: "Fermat Spiral",
    equation: "r = ±√θ",
    description: "Parabolic spiral found in sunflower seed arrangements. Two mirrored spirals create natural harmony.",
    component: "FermatLoader",
    defaults: {
      size: 200,
      color: "#fbbf24",
      secondaryColor: "#d97706",
      speed: 1,
      strokeWidth: 2,
      theta: 720,
      arms: 2,
    },
  },
  {
    id: "cardioid",
    name: "Cardioid",
    equation: "r = a(1 + cosθ)",
    description: "The heart-shaped curve — formed when a circle rolls around another of equal size. A symbol of mathematical elegance.",
    component: "CardioidLoader",
    defaults: {
      size: 200,
      color: "#fb7185",
      secondaryColor: "#e11d48",
      speed: 1,
      strokeWidth: 2.5,
      theta: 360,
    },
  },
  {
    id: "astroid",
    name: "Astroid",
    equation: "x²ᐟ³ + y²ᐟ³ = a²ᐟ³",
    description: "A hypocycloid with 4 cusps — a star shape created by rolling a circle inside one 4× its size.",
    component: "AstroidLoader",
    defaults: {
      size: 200,
      color: "#22d3ee",
      secondaryColor: "#0891b2",
      speed: 1,
      strokeWidth: 2.5,
      theta: 360,
    },
  },
  {
    id: "mandala",
    name: "Mandala",
    equation: "Polar symmetry: r, θ → repeated n times",
    description: "Sacred geometry — concentric rings of dots rotating in alternating directions. Adjust symmetry and layers.",
    component: "MandalaLoader",
    defaults: {
      size: 200,
      color: "#c084fc",
      secondaryColor: "#7c3aed",
      speed: 1,
      strokeWidth: 2,
      theta: 360,
      symmetry: 8,
      layers: 4,
    },
  },
  {
    id: "orbit",
    name: "Planetary Orbits",
    equation: "r = a(1-e²) / (1+e·cosθ)",
    description: "Kepler's elliptical orbits — planets tracing conic sections around a central star with gravitational elegance.",
    component: "OrbitLoader",
    defaults: {
      size: 200,
      color: "#fbbf24",
      secondaryColor: "#f97316",
      speed: 1,
      strokeWidth: 2,
      theta: 360,
    },
  },
  {
    id: "helix",
    name: "Double Helix",
    equation: "x = cos(θ), y = sin(θ), z = θ/2π",
    description: "DNA-inspired double helix — two sinusoidal strands intertwined with connecting rungs, projected into 2D.",
    component: "HelixLoader",
    defaults: {
      size: 200,
      color: "#60a5fa",
      secondaryColor: "#2563eb",
      speed: 1,
      strokeWidth: 2,
      theta: 360,
    },
  },
];
