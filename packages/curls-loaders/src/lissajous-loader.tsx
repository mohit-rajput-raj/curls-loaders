import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface LissajousLoaderProps extends LoaderBaseProps {
  /** X-axis frequency ratio (a in the Lissajous equation) */
  freqX?: number;
  /** Y-axis frequency ratio (b in the Lissajous equation) */
  freqY?: number;
  /** Phase delta (δ in the equation) */
  phaseDelta?: number;
  /** Length of the visible trail (0–1) */
  trailLength?: number;
}

/**
 * ## LissajousLoader
 * Parametric Lissajous curve: `x = A·sin(a·t + δ), y = B·sin(b·t)`
 *
 * A luminous point traces a Lissajous figure,
 * leaving a fading phosphor trail behind it.
 */
export function LissajousLoader({
  size = 64,
  color = "#34d399",
  secondaryColor = "#059669",
  speed = 1,
  strokeWidth = 2.5,
  freqX = 3,
  freqY = 2,
  phaseDelta = Math.PI / 2,
  trailLength = 0.75,
  style,
  className,
}: LissajousLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const cy = h / 2;
      const ax = (w / 2) * 0.78;
      const ay = (h / 2) * 0.78;
      const segments = 200;
      const period = 2 * Math.PI;
      const phase = t * speed * 0.8;

      // Draw the full ghost curve
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * period;
        const x = cx + ax * Math.sin(freqX * theta + phaseDelta);
        const y = cy + ay * Math.sin(freqY * theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = secondaryColor;
      ctx.globalAlpha = 0.12;
      ctx.lineWidth = strokeWidth * 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Animated trail
      const trailSegments = Math.floor(segments * trailLength);
      const headPos = (phase % period + period) % period;

      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= trailSegments; i++) {
        const frac = i / trailSegments;
        const theta = headPos - (1 - frac) * period * trailLength;
        const x = cx + ax * Math.sin(freqX * theta + phaseDelta);
        const y = cy + ay * Math.sin(freqY * theta);

        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }

      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.3, secondaryColor);
      gradient.addColorStop(1, color);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Glowing head dot
      const headTheta = headPos;
      const hx = cx + ax * Math.sin(freqX * headTheta + phaseDelta);
      const hy = cy + ay * Math.sin(freqY * headTheta);

      ctx.beginPath();
      ctx.arc(hx, hy, strokeWidth * 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, freqX, freqY, phaseDelta, trailLength]
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
