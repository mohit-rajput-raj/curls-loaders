import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface AstroidLoaderProps extends LoaderBaseProps {
  theta?: number;
}

export function AstroidLoader({
  size = 64, color = "#22d3ee", secondaryColor = "#0891b2",
  speed = 1, strokeWidth = 2.5, theta = 360, style, className,
}: AstroidLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2, cy = h / 2;
      const a = Math.min(w, h) / 2 - strokeWidth * 3;
      const maxT = (theta / 180) * Math.PI, pts = 400;
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const th = (i / pts) * maxT;
        const x = cx + a * Math.pow(Math.cos(th), 3);
        const y = cy + a * Math.pow(Math.sin(th), 3);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = secondaryColor; ctx.lineWidth = strokeWidth * 0.5;
      ctx.globalAlpha = 0.12; ctx.stroke(); ctx.globalAlpha = 1;
      const head = (t * speed * 0.5) % maxT, trailPts = 120;
      ctx.beginPath();
      for (let i = 0; i <= trailPts; i++) {
        const th = head - (1 - i / trailPts) * maxT * 0.35;
        const x = cx + a * Math.pow(Math.cos(th), 3);
        const y = cy + a * Math.pow(Math.sin(th), 3);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "transparent"); grad.addColorStop(0.35, secondaryColor); grad.addColorStop(1, color);
      ctx.strokeStyle = grad; ctx.lineWidth = strokeWidth; ctx.lineCap = "round"; ctx.stroke();
      const hx = cx + a * Math.pow(Math.cos(head), 3);
      const hy = cy + a * Math.pow(Math.sin(head), 3);
      ctx.beginPath(); ctx.arc(hx, hy, strokeWidth * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 14; ctx.fill(); ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, theta]
  );
  const canvasRef = useCanvasLoop(draw);
  return <canvas ref={canvasRef} className={className} style={{ width: size, height: size, ...style }} aria-label="Loading…" role="progressbar" />;
}
