import { useCallback } from "react";
import { useCanvasLoop } from "./use-canvas-loop.js";
import type { LoaderBaseProps } from "./types.js";

export interface CardioidLoaderProps extends LoaderBaseProps {
  theta?: number;
}

export function CardioidLoader({
  size = 64, color = "#fb7185", secondaryColor = "#e11d48",
  speed = 1, strokeWidth = 2.5, theta = 360, style, className,
}: CardioidLoaderProps) {
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => {
      const cx = w / 2, cy = h / 2;
      const a = (Math.min(w, h) / 2 - strokeWidth * 3) / 2;
      const maxT = (theta / 180) * Math.PI, pts = 400;
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const th = (i / pts) * maxT;
        const r = a * (1 + Math.cos(th));
        const x = cx + r * Math.cos(th), y = cy + r * Math.sin(th);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = secondaryColor; ctx.lineWidth = strokeWidth * 0.5;
      ctx.globalAlpha = 0.12; ctx.stroke(); ctx.globalAlpha = 1;
      const head = (t * speed * 0.6) % maxT, trailPts = 120;
      ctx.beginPath();
      for (let i = 0; i <= trailPts; i++) {
        const th = head - (1 - i / trailPts) * maxT * 0.35;
        const r = a * (1 + Math.cos(th));
        const x = cx + r * Math.cos(th), y = cy + r * Math.sin(th);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "transparent"); grad.addColorStop(0.35, secondaryColor); grad.addColorStop(1, color);
      ctx.strokeStyle = grad; ctx.lineWidth = strokeWidth; ctx.lineCap = "round"; ctx.stroke();
      const hr = a * (1 + Math.cos(head));
      ctx.beginPath(); ctx.arc(cx + hr * Math.cos(head), cy + hr * Math.sin(head), strokeWidth * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 14; ctx.fill(); ctx.shadowBlur = 0;
    },
    [color, secondaryColor, speed, strokeWidth, theta]
  );
  const canvasRef = useCanvasLoop(draw);
  return <canvas ref={canvasRef} className={className} style={{ width: size, height: size, ...style }} aria-label="Loading…" role="progressbar" />;
}
