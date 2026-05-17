import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface ButterflyLoaderProps extends LoaderBaseProps {
  /** Max theta in degrees for the curve */
  theta?: number;
}

/**
 * Temple Fay's Butterfly Curve:
 * r = e^(sinθ) - 2cos(4θ) + sin^5((2θ-π)/24)
 */
export function ButterflyLoader({
  size = 64,
  color = "#e879f9",
  secondaryColor = "#a21caf",
  speed = 0.6,
  strokeWidth = 2,
  theta = 360,
  style,
  className,
}: ButterflyLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxTheta = (theta / 180) * Math.PI;
      const pts = 800;

      // Pre-compute for scale
      let maxR = 0;
      const rValues: number[] = [];
      for (let i = 0; i <= pts; i++) {
        const th = (i / pts) * maxTheta;
        const r = Math.exp(Math.sin(th)) - 2 * Math.cos(4 * th) + Math.pow(Math.sin((2 * th - Math.PI) / 24), 5);
        rValues.push(r);
        maxR = Math.max(maxR, Math.abs(r));
      }
      const scale = (Math.min(w, h) / 2 - strokeWidth * 3) / (maxR || 1);

      // Ghost curve
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const th = (i / pts) * maxTheta;
        const r = rValues[i]! * scale;
        const x = cx + r * Math.cos(th);
        const y = cy - r * Math.sin(th);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = strokeWidth * 0.5;
      ctx.globalAlpha = 0.1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Animated trail
      const trailLen = 0.2;
      const head = (t * speed * 0.3) % maxTheta;
      const trailPts = 150;

      ctx.beginPath();
      for (let i = 0; i <= trailPts; i++) {
        const frac = i / trailPts;
        const th = head - (1 - frac) * maxTheta * trailLen;
        const r = (Math.exp(Math.sin(th)) - 2 * Math.cos(4 * th) + Math.pow(Math.sin((2 * th - Math.PI) / 24), 5)) * scale;
        const x = cx + r * Math.cos(th);
        const y = cy - r * Math.sin(th);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.3, secondaryColor);
      grad.addColorStop(1, color);
      ctx.strokeStyle = grad;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.stroke();

      // Head glow
      const hr = (Math.exp(Math.sin(head)) - 2 * Math.cos(4 * head) + Math.pow(Math.sin((2 * head - Math.PI) / 24), 5)) * scale;
      const hx = cx + hr * Math.cos(head);
      const hy = cy - hr * Math.sin(head);
      ctx.beginPath();
      ctx.arc(hx, hy, strokeWidth * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, theta]
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
