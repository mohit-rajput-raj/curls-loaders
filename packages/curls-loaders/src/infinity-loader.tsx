import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface InfinityLoaderProps extends LoaderBaseProps {
  /** Curve sharpness — higher values make a tighter figure-eight */
  sharpness?: number;
}

/**
 * Lemniscate of Bernoulli (infinity symbol):
 * x = a·cos(t) / (1 + sin²(t)),  y = a·sin(t)·cos(t) / (1 + sin²(t))
 */
export function InfinityLoader({
  size = 64,
  color = "#38bdf8",
  secondaryColor = "#0369a1",
  speed = 1,
  strokeWidth = 2.5,
  sharpness = 1,
  style,
  className,
}: InfinityLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const a = Math.min(w, h) * 0.38;
      const pts = 200;

      function lemniscatePoint(theta: number): [number, number] {
        const s = Math.sin(theta);
        const c = Math.cos(theta);
        const denom = 1 + s * s * sharpness;
        return [cx + (a * c) / denom, cy + (a * s * c) / denom];
      }

      // Ghost curve
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const theta = (i / pts) * Math.PI * 2;
        const [x, y] = lemniscatePoint(theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = strokeWidth * 0.7;
      ctx.globalAlpha = 0.12;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Animated trail
      const trailLen = 0.35;
      const head = (t * speed * 0.7) % (Math.PI * 2);
      const trailPts = 80;

      ctx.beginPath();
      for (let i = 0; i <= trailPts; i++) {
        const frac = i / trailPts;
        const theta = head - (1 - frac) * Math.PI * 2 * trailLen;
        const [x, y] = lemniscatePoint(theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const g = ctx.createLinearGradient(0, cy, w, cy);
      g.addColorStop(0, "transparent");
      g.addColorStop(0.35, secondaryColor);
      g.addColorStop(1, color);
      ctx.strokeStyle = g;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.stroke();

      // Head
      const [hx, hy] = lemniscatePoint(head);
      ctx.beginPath();
      ctx.arc(hx, hy, strokeWidth * 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, sharpness]
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
