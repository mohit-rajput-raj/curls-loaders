import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface HypotrochoidLoaderProps extends LoaderBaseProps {
  /** Inner circle radius ratio (smaller number) */
  innerRadius?: number;
  /** Outer circle radius ratio (larger number) */
  outerRadius?: number;
  /** Drawing point distance ratio (0-1 of inner radius) */
  distance?: number;
  /** Max theta in degrees for the curve */
  theta?: number;
}

/**
 * Hypotrochoid curve — like a Spirograph.
 * x = (R-r)cos(θ) + d·cos((R-r)θ/r)
 * y = (R-r)sin(θ) - d·sin((R-r)θ/r)
 */
export function HypotrochoidLoader({
  size = 64,
  color = "#38bdf8",
  secondaryColor = "#0284c7",
  speed = 1,
  strokeWidth = 2,
  innerRadius = 3,
  outerRadius = 7,
  distance = 0.8,
  theta = 360,
  style,
  className,
}: HypotrochoidLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const scale = (Math.min(w, h) / 2 - strokeWidth * 3) / (outerRadius + 1);
      const R = outerRadius;
      const r = innerRadius;
      const d = r * distance;
      const maxTheta = (theta / 180) * Math.PI;
      const pts = 600;

      // Ghost curve
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const th = (i / pts) * maxTheta;
        const x = cx + scale * ((R - r) * Math.cos(th) + d * Math.cos(((R - r) / r) * th));
        const y = cy + scale * ((R - r) * Math.sin(th) - d * Math.sin(((R - r) / r) * th));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = strokeWidth * 0.5;
      ctx.globalAlpha = 0.1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Animated trail
      const trailLen = 0.35;
      const head = (t * speed * 0.5) % maxTheta;
      const trailPts = 120;

      ctx.beginPath();
      for (let i = 0; i <= trailPts; i++) {
        const frac = i / trailPts;
        const th = head - (1 - frac) * maxTheta * trailLen;
        const x = cx + scale * ((R - r) * Math.cos(th) + d * Math.cos(((R - r) / r) * th));
        const y = cy + scale * ((R - r) * Math.sin(th) - d * Math.sin(((R - r) / r) * th));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.4, secondaryColor);
      grad.addColorStop(1, color);
      ctx.strokeStyle = grad;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.stroke();

      // Head glow
      const hth = head;
      const hx = cx + scale * ((R - r) * Math.cos(hth) + d * Math.cos(((R - r) / r) * hth));
      const hy = cy + scale * ((R - r) * Math.sin(hth) - d * Math.sin(((R - r) / r) * hth));
      ctx.beginPath();
      ctx.arc(hx, hy, strokeWidth * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, innerRadius, outerRadius, distance, theta]
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
