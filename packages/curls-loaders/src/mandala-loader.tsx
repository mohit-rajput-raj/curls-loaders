import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface MandalaLoaderProps extends LoaderBaseProps {
  /** Symmetry order (number of radial repetitions) */
  symmetry?: number;
  /** Number of concentric layers */
  layers?: number;
}

/**
 * Rotating mandala built from polar math:
 * Multiple concentric rings of dots placed at r, θ intervals
 * with rotation animation per layer.
 */
export function MandalaLoader({
  size = 64,
  color = "#c084fc",
  secondaryColor = "#7c3aed",
  speed = 1,
  strokeWidth = 2,
  symmetry = 8,
  layers = 4,
  style,
  className,
}: MandalaLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) / 2 - strokeWidth * 2;

      for (let layer = 0; layer < layers; layer++) {
        const lf = (layer + 1) / layers;
        const r = maxR * lf;
        const rotDir = layer % 2 === 0 ? 1 : -1;
        const rot = t * speed * 0.6 * rotDir * (1 + layer * 0.2);
        const dotsInLayer = symmetry * (layer + 1);

        for (let d = 0; d < dotsInLayer; d++) {
          const theta = (d / dotsInLayer) * Math.PI * 2 + rot;
          const px = cx + r * Math.cos(theta);
          const py = cy + r * Math.sin(theta);

          const pulse = 0.5 + 0.5 * Math.sin(t * speed * 3 + layer * 1.2 + d * 0.3);
          const dotR = (strokeWidth * 0.6 + pulse * strokeWidth * 0.4) * (1 - lf * 0.3);

          ctx.beginPath();
          ctx.arc(px, py, dotR, 0, Math.PI * 2);

          const alpha = 0.4 + 0.6 * pulse;
          const cr = Math.round(124 + lf * (192 - 124));
          const cg = Math.round(58 + lf * (132 - 58));
          const cb = Math.round(237 + lf * (252 - 237));
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx.fill();
        }

        // Connecting ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, rot, rot + Math.PI * 2);
        ctx.strokeStyle = secondaryColor;
        ctx.lineWidth = strokeWidth * 0.3;
        ctx.globalAlpha = 0.08;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Center gem
      const cp = 0.6 + 0.4 * Math.sin(t * speed * 4);
      ctx.beginPath();
      ctx.arc(cx, cy, strokeWidth * 1.8 * cp, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, symmetry, layers]
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
