import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface WaveLoaderProps extends LoaderBaseProps {
  /** Number of stacked sine waves */
  waves?: number;
  /** Frequency of the wave oscillation */
  frequency?: number;
  /** Peak amplitude as a fraction of the canvas height (0–0.5) */
  amplitude?: number;
}

/**
 * ## WaveLoader
 * Superimposed sine waves: `y = A·sin(ωx − φt)`
 *
 * Multiple translucent sine waves slide horizontally,
 * each with a slight phase offset, producing an ocean-like shimmer.
 */
export function WaveLoader({
  size = 64,
  color = "#60a5fa",
  secondaryColor = "#2563eb",
  speed = 1,
  strokeWidth = 2,
  waves = 4,
  frequency = 3,
  amplitude = 0.22,
  style,
  className,
}: WaveLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cy = h / 2;

      for (let waveIdx = 0; waveIdx < waves; waveIdx++) {
        const waveFrac = waveIdx / waves;
        const phaseOffset = waveFrac * Math.PI * 0.7;
        const amp = amplitude * h * (1 - waveFrac * 0.3);
        const freq = frequency + waveFrac * 0.5;

        ctx.beginPath();
        for (let x = 0; x <= w; x += 1) {
          const xNorm = x / w;
          // Envelope: fade at edges
          const envelope = Math.sin(xNorm * Math.PI);
          const y =
            cy +
            amp *
            envelope *
            Math.sin(freq * 2 * Math.PI * xNorm - t * speed * 2.5 + phaseOffset);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Interpolate between secondaryColor and color
        const r = Math.round(37 + waveFrac * (96 - 37));
        const g = Math.round(99 + waveFrac * (165 - 99));
        const b = Math.round(235 + waveFrac * (250 - 235));
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.35 + waveFrac * 0.45})`;
        ctx.lineWidth = strokeWidth * (1.2 - waveFrac * 0.3);
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Floating particle accents
      const particleCount = 6;
      for (let i = 0; i < particleCount; i++) {
        const px = ((i / particleCount) * w + t * speed * 30) % w;
        const py =
          cy +
          amplitude * h * 0.6 * Math.sin(frequency * 2 * Math.PI * (px / w) - t * speed * 2.5);
        const pr = 1.5 + Math.sin(t * speed * 3 + i) * 0.8;

        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * speed * 4 + i * 1.2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    },
    [color, secondaryColor, speed, strokeWidth, waves, frequency, amplitude]
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
