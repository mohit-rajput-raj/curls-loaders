import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface FractalTreeLoaderProps extends LoaderBaseProps {
  depth?: number;
  branchAngle?: number;
  shrink?: number;
}

/**
 * Recursive binary fractal tree with swaying branches.
 * angle(t) = baseAngle + A·sin(ωt)
 */
export function FractalTreeLoader({
  size = 64,
  color = "#4ade80",
  secondaryColor = "#166534",
  speed = 1,
  strokeWidth = 2,
  depth = 9,
  branchAngle = 25,
  shrink = 0.72,
  style,
  className,
}: FractalTreeLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const startX = w / 2;
      const startY = h * 0.92;
      const trunkLen = h * 0.28;
      const animAngle = branchAngle + 8 * Math.sin(t * speed * 1.5);
      const animAngleRad = (animAngle * Math.PI) / 180;

      function branch(x: number, y: number, angle: number, len: number, level: number) {
        if (level > depth || len < 1) return;
        const x2 = x + len * Math.cos(angle);
        const y2 = y + len * Math.sin(angle);
        const df = level / depth;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgb(${22 + df * 52},${101 + df * 121},${52 + df * 76})`;
        ctx.lineWidth = strokeWidth * Math.pow(0.7, level);
        ctx.lineCap = "round";
        ctx.globalAlpha = 0.7 + 0.3 * (1 - df);
        ctx.stroke();
        ctx.globalAlpha = 1;

        if (level >= depth - 1) {
          const p = 0.5 + 0.5 * Math.sin(t * speed * 4 + level + x * 0.1);
          ctx.beginPath();
          ctx.arc(x2, y2, 1.5 + p, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.6 * p;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        const wobble = 0.05 * Math.sin(t * speed * 2 + level * 0.4);
        branch(x2, y2, angle - animAngleRad + wobble, len * shrink, level + 1);
        branch(x2, y2, angle + animAngleRad + wobble, len * shrink, level + 1);
      }

      branch(startX, startY, -Math.PI / 2, trunkLen, 0);
    },
    [color, speed, strokeWidth, depth, branchAngle, shrink]
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
