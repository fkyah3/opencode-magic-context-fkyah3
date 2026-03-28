import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT, LAYOUT } from "../constants";

type Props = {
  children: React.ReactNode;
  opacity?: number;
  /** Optional scale for split-screen effects */
  scale?: number;
};

/**
 * Outer container for the OpenCode session.
 * Provides the dark background, subtle noise texture, and padding.
 */
export const SessionShell: React.FC<Props> = ({
  children,
  opacity = 1,
  scale = 1,
}) => {
  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        background: COLORS.bg,
        fontFamily: FONT.sans,
        padding: LAYOUT.padding,
        display: "flex",
        flexDirection: "row",
        gap: LAYOUT.panelGap,
        overflow: "hidden",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${COLORS.panelBorder}22 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.panelBorder}22 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 20%, ${COLORS.panelBg}88 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
