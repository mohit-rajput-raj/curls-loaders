"use client";
import {
  SpiralLoader, LissajousLoader, RoseLoader, MandalaLoader,
  OrbitLoader, HelixLoader, HypotrochoidLoader, EpitrochoidLoader,
  ButterflyLoader, FermatLoader, CardioidLoader, AstroidLoader,
} from "curls-loaders";

interface Props {
  component: string;
  size?: number;
  color?: string;
  secondaryColor?: string;
  speed?: number;
  strokeWidth?: number;
  theta?: number;
  petals?: number;
  denominator?: number;
  freqX?: number;
  freqY?: number;
  phaseDelta?: number;
  trailLength?: number;
  arms?: number;
  tightness?: number;
  symmetry?: number;
  layers?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function EquationLoaderPreview({
  component, size = 120, color, secondaryColor,
  speed, strokeWidth, theta, petals, denominator,
  freqX, freqY, phaseDelta, trailLength,
  arms, tightness, symmetry, layers,
  innerRadius, outerRadius,
}: Props) {
  const baseProps = { size, color, secondaryColor, speed, strokeWidth };

  switch (component) {
    case "RoseLoader":
      return <RoseLoader {...baseProps} petals={petals} denominator={denominator} />;
    case "LissajousLoader":
      return <LissajousLoader {...baseProps} freqX={freqX} freqY={freqY} phaseDelta={phaseDelta ? (phaseDelta / 180) * Math.PI : undefined} trailLength={trailLength} />;
    case "SpiralLoader":
      return <SpiralLoader {...baseProps} arms={arms} tightness={tightness} />;
    case "HypotrochoidLoader":
      return <HypotrochoidLoader {...baseProps} innerRadius={innerRadius} outerRadius={outerRadius} theta={theta} />;
    case "EpitrochoidLoader":
      return <EpitrochoidLoader {...baseProps} innerRadius={innerRadius} outerRadius={outerRadius} theta={theta} />;
    case "ButterflyLoader":
      return <ButterflyLoader {...baseProps} theta={theta} />;
    case "FermatLoader":
      return <FermatLoader {...baseProps} arms={arms} theta={theta} />;
    case "CardioidLoader":
      return <CardioidLoader {...baseProps} theta={theta} />;
    case "AstroidLoader":
      return <AstroidLoader {...baseProps} theta={theta} />;
    case "MandalaLoader":
      return <MandalaLoader {...baseProps} symmetry={symmetry} layers={layers} />;
    case "OrbitLoader":
      return <OrbitLoader {...baseProps} />;
    case "HelixLoader":
      return <HelixLoader {...baseProps} />;
    default:
      return <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>?</div>;
  }
}
