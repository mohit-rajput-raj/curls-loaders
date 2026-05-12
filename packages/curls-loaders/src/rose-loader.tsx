import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface RoseLoaderProps extends LoaderBaseProps {
  /** Petal count numerator (k = n/d) */
  petals?: number;
  /** Petal denominator for rational rose curves */
  denominator?: number;
}

/**
 * Rhodonea / Rose curve: r = cos(kθ)
 * A point traces a rose pattern with a glowing trail.
 */
export function RoseLoader({
  size = 64,
  color = "#f43f5e",
  secondaryColor = "#881337",
  speed = 1,
  strokeWidth = 2,
  petals = 5,
  denominator = 1,
  style,
  className,
}: RoseLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) / 2 - strokeWidth * 2;
      const k = petals / denominator;
      const totalTheta = denominator * Math.PI * 2;
      const pts = 300;

      // Ghost curve
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const theta = (i / pts) * totalTheta;
        const r = maxR * Math.cos(k * theta);
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = strokeWidth * 0.6;
      ctx.globalAlpha = 0.12;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Animated trail
      const trailLen = 0.3;
      const head = (t * speed * 0.5) % totalTheta;
      const trailPts = 80;

      ctx.beginPath();
      for (let i = 0; i <= trailPts; i++) {
        const frac = i / trailPts;
        const theta = head - (1 - frac) * totalTheta * trailLen;
        const r = maxR * Math.cos(k * theta);
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
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
      const hr = maxR * Math.cos(k * head);
      const hx = cx + hr * Math.cos(head);
      const hy = cy + hr * Math.sin(head);
      ctx.beginPath();
      ctx.arc(hx, hy, strokeWidth * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, petals, denominator]
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
