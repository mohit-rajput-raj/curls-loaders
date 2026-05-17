import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface FermatLoaderProps extends LoaderBaseProps {
  /** Number of spiral arms (1 or 2 for the ± branches) */
  arms?: number;
  /** Max theta in degrees */
  theta?: number;
}

/**
 * Fermat's Spiral: r² = a²θ  →  r = ±a√θ
 * Found in sunflower seed patterns.
 */
export function FermatLoader({
  size = 64,
  color = "#fbbf24",
  secondaryColor = "#d97706",
  speed = 1,
  strokeWidth = 2,
  arms = 2,
  theta = 720,
  style,
  className,
}: FermatLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxTheta = (theta / 180) * Math.PI;
      const maxR = Math.sqrt(maxTheta);
      const scale = (Math.min(w, h) / 2 - strokeWidth * 3) / maxR;
      const pts = 400;
      const rot = t * speed * 0.5;

      for (let arm = 0; arm < arms; arm++) {
        const sign = arm === 0 ? 1 : -1;

        // Ghost curve
        ctx.beginPath();
        for (let i = 0; i <= pts; i++) {
          const th = (i / pts) * maxTheta;
          const r = sign * Math.sqrt(th) * scale;
          const angle = th + rot;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = secondaryColor;
        ctx.lineWidth = strokeWidth * 0.5;
        ctx.globalAlpha = 0.1;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Animated trail
        const trailLen = 0.3;
        const head = (t * speed * 0.8 + arm * Math.PI) % maxTheta;
        const trailPts = 100;

        ctx.beginPath();
        for (let i = 0; i <= trailPts; i++) {
          const frac = i / trailPts;
          const th = head - (1 - frac) * maxTheta * trailLen;
          const r = sign * Math.sqrt(Math.abs(th)) * scale;
          const angle = th + rot;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.4, arm === 0 ? secondaryColor : color);
        grad.addColorStop(1, arm === 0 ? color : secondaryColor);
        ctx.strokeStyle = grad;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Center glow
      const pulse = 0.6 + 0.4 * Math.sin(t * speed * 3);
      ctx.beginPath();
      ctx.arc(cx, cy, strokeWidth * 2 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, arms, theta]
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
