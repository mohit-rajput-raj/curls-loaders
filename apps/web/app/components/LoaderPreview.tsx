"use client";
import { useEffect, useId } from "react";

interface Props {
  css: string;
  html: string;
  size?: number;
  color?: string;
  secondaryColor?: string;
  speed?: number;
  strokeWidth?: number;
}

export function LoaderPreview({ css, html, size = 40, color, secondaryColor, speed = 1, strokeWidth }: Props) {
  const uid = useId().replace(/:/g, "");
  const wrapperId = `lp-${uid}`;

  useEffect(() => {
    const el = document.getElementById(wrapperId);
    if (el) {
      el.style.setProperty("--s", `${size}px`);
      if (color) el.style.setProperty("--c1", color);
      if (secondaryColor) el.style.setProperty("--c2", secondaryColor);
      el.style.setProperty("--sp", String(speed));
      if (strokeWidth) el.style.setProperty("--w", `${strokeWidth}px`);
    }
  }, [wrapperId, size, color, secondaryColor, speed, strokeWidth]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        id={wrapperId}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          ["--s" as string]: `${size}px`,
          ["--c1" as string]: color,
          ["--c2" as string]: secondaryColor,
          ["--sp" as string]: speed,
          ["--w" as string]: strokeWidth ? `${strokeWidth}px` : undefined,
        } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
