import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  children: React.ReactNode;
  opacity?: number;
  /** Width as CSS value */
  width?: string;
  /** Optional highlight glow for pressure states */
  glowColor?: string;
};

/**
 * Right panel: Context inspector container.
 * Houses stats, raw messages, and breakdown bar.
 */
export const ContextInspector: React.FC<Props> = ({
  children,
  opacity = 1,
  width,
  glowColor,
}) => {
  return (
    <div
      style={{
        opacity,
        width: width || `${LAYOUT.contextWidth * 100}%`,
        display: "flex",
        flexDirection: "column",
        background: COLORS.panelBg,
        borderRadius: LAYOUT.borderRadius,
        border: `1px solid ${glowColor ? `${glowColor}66` : COLORS.panelBorder}`,
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        boxShadow: glowColor ? `0 0 20px ${glowColor}22` : undefined,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 40,
          padding: "0 16px",
          borderBottom: `1px solid ${COLORS.panelBorder}`,
        }}
      >
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            fontWeight: 600,
            color: COLORS.textSecondary,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: FONT.mono,
          }}
        >
          Context Inspector
        </span>
      </div>
      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "8px 0",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </div>
    </div>
  );
};
