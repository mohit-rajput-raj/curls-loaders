import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface HelixLoaderProps extends LoaderBaseProps {
  /** Number of helix strands */
  strands?: number;
  /** Number of full twists visible */
  twists?: number;
}

/**
 * 3D projected double helix (DNA-like):
 * x = R·cos(θ + offset), z = R·sin(θ + offset)
 * projected with simple perspective scaling.
 */
export function HelixLoader({
  size = 64,
  color = "#fb923c",
  secondaryColor = "#c2410c",
  speed = 1,
  strokeWidth = 2,
  strands = 2,
  twists = 2,
  style,
  className,
}: HelixLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2;
      const R = w * 0.3;
      const vertSpan = h * 0.8;
      const topY = h * 0.1;
      const pts = 80;
      const rot = t * speed * 1.5;

      for (let s = 0; s < strands; s++) {
        const offset = (s / strands) * Math.PI * 2;

        // Collect points with depth
        const points: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i <= pts; i++) {
          const frac = i / pts;
          const theta = frac * twists * Math.PI * 2 + rot + offset;
          const x = cx + R * Math.cos(theta);
          const y = topY + frac * vertSpan;
          const z = Math.sin(theta);
          points.push({ x, y, z });
        }

        // Draw strand
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const p = points[i]!;
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        const grad = ctx.createLinearGradient(0, topY, 0, topY + vertSpan);
        grad.addColorStop(0, secondaryColor);
        grad.addColorStop(0.5, color);
        grad.addColorStop(1, secondaryColor);
        ctx.strokeStyle = grad;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw dots at each point with depth-based size
        for (let i = 0; i < points.length; i += 4) {
          const p = points[i]!;
          const depthScale = 0.5 + 0.5 * ((p.z + 1) / 2);
          const dotR = strokeWidth * 0.8 * depthScale;

          ctx.beginPath();
          ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.3 + 0.7 * depthScale;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // Cross-rungs between strands (like DNA base pairs)
      if (strands >= 2) {
        for (let i = 0; i <= pts; i += 5) {
          const frac = i / pts;
          const theta1 = frac * twists * Math.PI * 2 + rot;
          const theta2 = theta1 + Math.PI;
          const x1 = cx + R * Math.cos(theta1);
          const x2 = cx + R * Math.cos(theta2);
          const y = topY + frac * vertSpan;
          const z1 = Math.sin(theta1);

          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = color;
          ctx.lineWidth = strokeWidth * 0.4;
          ctx.globalAlpha = 0.15 + 0.15 * ((z1 + 1) / 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    },
    [color, secondaryColor, speed, strokeWidth, strands, twists]
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
