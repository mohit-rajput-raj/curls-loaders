import type { CSSProperties } from "react";

/** Base props shared by every loader component */
export interface LoaderBaseProps {
  /** Width & height in CSS pixels (loaders are always square) */
  size?: number;
  /** Primary color — accepts any CSS color value */
  color?: string;
  /** Secondary / trail color */
  secondaryColor?: string;
  /** Animation speed multiplier (1 = default) */
  speed?: number;
  /** Line / stroke thickness in px */
  strokeWidth?: number;
  /** Additional inline styles applied to the canvas wrapper */
  style?: CSSProperties;
  /** Additional CSS class */
  className?: string;
}
