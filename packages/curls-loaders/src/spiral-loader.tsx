import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface SpiralLoaderProps extends LoaderBaseProps {
  /** Number of spiral arms */
  arms?: number;
  /** How tightly the spiral winds (higher = tighter) */
  tightness?: number;
}

/**
 * ## SpiralLoader
 * An Archimedean spiral: `r = a + b·θ`
 *
 * Particles orbit outward along multiple spiral arms,
 * fading as they travel — creating a hypnotic vortex effect.
 */
export function SpiralLoader({
  size = 64,
  color = "#a78bfa",
  secondaryColor = "#6d28d9",
  speed = 1,
  strokeWidth = 2.5,
  arms = 3,
  tightness = 0.12,
  style,
  className,
}: SpiralLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) / 2 - strokeWidth;
      const totalPoints = 120;
      const maxTheta = 4 * Math.PI;

      for (let arm = 0; arm < arms; arm++) {
        const armOffset = (arm / arms) * 2 * Math.PI;

        ctx.beginPath();
        for (let i = 0; i <= totalPoints; i++) {
          const frac = i / totalPoints;
          const theta = frac * maxTheta + t * speed * 2 + armOffset;
          const r = tightness * theta * (maxR / (tightness * maxTheta));

          const x = cx + r * Math.cos(theta);
          const y = cy + r * Math.sin(theta);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, secondaryColor);
        gradient.addColorStop(1, color);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = "round";
        ctx.globalAlpha = 0.85;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Glowing center dot
      const pulse = 0.5 + 0.5 * Math.sin(t * speed * 4);
      const dotR = strokeWidth * (1.5 + pulse * 0.8);
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, arms, tightness]
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
