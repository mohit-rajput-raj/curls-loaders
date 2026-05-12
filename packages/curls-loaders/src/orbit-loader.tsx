import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface OrbitLoaderProps extends LoaderBaseProps {
  /** Number of orbiting particles */
  particles?: number;
  /** Orbit eccentricity (0 = circle, approaching 1 = very elliptical) */
  eccentricity?: number;
}

/**
 * ## OrbitLoader
 * Kepler-inspired elliptical orbits:
 * `x = a·cos(θ), y = b·sin(θ)` where `b = a·√(1 − e²)`
 *
 * Particles orbit in ellipses at different inclinations,
 * producing a mini solar-system effect.
 */
export function OrbitLoader({
  size = 64,
  color = "#fbbf24",
  secondaryColor = "#f59e0b",
  speed = 1,
  strokeWidth = 2,
  particles = 3,
  eccentricity = 0.4,
  style,
  className,
}: OrbitLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxA = Math.min(w, h) / 2 - strokeWidth * 3;

      for (let p = 0; p < particles; p++) {
        const frac = p / particles;
        const a = maxA * (0.45 + frac * 0.55);
        const b = a * Math.sqrt(1 - eccentricity * eccentricity);
        const tilt = frac * Math.PI * 0.6; // Inclination
        const angularSpeed = speed * (1.5 - frac * 0.5);

        // Draw orbit path (faint)
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
          const theta = (i / 100) * 2 * Math.PI;
          const ox = a * Math.cos(theta);
          const oy = b * Math.sin(theta);
          // Apply tilt rotation
          const rx = ox * Math.cos(tilt) - oy * Math.sin(tilt);
          const ry = ox * Math.sin(tilt) + oy * Math.cos(tilt);
          if (i === 0) ctx.moveTo(cx + rx, cy + ry);
          else ctx.lineTo(cx + rx, cy + ry);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.1;
        ctx.lineWidth = strokeWidth * 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Particle position
        const theta = t * angularSpeed + frac * 2 * Math.PI;
        const ox = a * Math.cos(theta);
        const oy = b * Math.sin(theta);
        const rx = ox * Math.cos(tilt) - oy * Math.sin(tilt);
        const ry = ox * Math.sin(tilt) + oy * Math.cos(tilt);

        // Trail (short arc behind the particle)
        ctx.beginPath();
        const trailSteps = 25;
        for (let i = 0; i <= trailSteps; i++) {
          const trailTheta = theta - (i / trailSteps) * 0.8;
          const tx = a * Math.cos(trailTheta);
          const ty = b * Math.sin(trailTheta);
          const trx = tx * Math.cos(tilt) - ty * Math.sin(tilt);
          const tryy = tx * Math.sin(tilt) + ty * Math.cos(tilt);
          if (i === 0) ctx.moveTo(cx + trx, cy + tryy);
          else ctx.lineTo(cx + trx, cy + tryy);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Particle dot
        const dotSize = strokeWidth * (1.8 - frac * 0.5);
        ctx.beginPath();
        ctx.arc(cx + rx, cy + ry, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Center body (sun)
      const sunPulse = 0.7 + 0.3 * Math.sin(t * speed * 3);
      ctx.beginPath();
      ctx.arc(cx, cy, strokeWidth * 2.5 * sunPulse, 0, Math.PI * 2);
      ctx.fillStyle = secondaryColor;
      ctx.shadowColor = secondaryColor;
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, particles, eccentricity]
  );

  const canvasRef = useCanvasLoop(draw);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size, ...style }}
      aria-label="Loading…"
      role="progressbar"
    />
  );
}
