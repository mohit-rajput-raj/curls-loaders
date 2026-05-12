import { useRef, useEffect, useCallback } from "react";

/**
 * Core hook that powers every loader.
 * Manages a <canvas> element, a high-precision animation loop, and DPI scaling.
 */
export function useCanvasLoop(
  draw: (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => void,
  fps = 60
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const render = useCallback(
    (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const t = (timestamp - startRef.current) / 1000; // seconds

      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      draw(ctx, t, w, h);

      rafRef.current = requestAnimationFrame(render);
    },
    [draw]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [render]);

  return canvasRef;
}
