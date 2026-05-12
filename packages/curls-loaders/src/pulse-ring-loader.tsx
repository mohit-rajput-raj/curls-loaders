import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface PulseRingLoaderProps extends LoaderBaseProps {
  /** Number of concentric rings */
  rings?: number;
  /** Delay between each ring's pulse in seconds */
  stagger?: number;
}

/**
 * ## PulseRingLoader
 * Expanding concentric circles following: `r(t) = R_max · ((t − d) mod T) / T`
 *
 * Rings expand outward from the center with staggered timing,
 * fading as they grow — like ripples in a pond.
 */
export function PulseRingLoader({
  size = 64,
  color = "#f472b6",
  secondaryColor = "#ec4899",
  speed = 1,
  strokeWidth = 2,
  rings = 3,
  stagger = 0.4,
  style,
  className,
}: PulseRingLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) / 2 - strokeWidth;
      const cycleDuration = 1.8 / speed;

      for (let i = 0; i < rings; i++) {
        const delay = i * stagger;
        const elapsed = ((t - delay) % cycleDuration + cycleDuration) % cycleDuration;
        const progress = elapsed / cycleDuration; // 0 → 1

        const r = maxR * progress;
        const alpha = 1 - progress;

        // Eased alpha for smoother fade
        const easedAlpha = alpha * alpha;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth * (1 + (1 - progress) * 0.8);
        ctx.globalAlpha = easedAlpha * 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Static center dot with glow
      const pulse = 0.6 + 0.4 * Math.sin(t * speed * 6);
      ctx.beginPath();
      ctx.arc(cx, cy, strokeWidth * 2 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = secondaryColor;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, rings, stagger]
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
