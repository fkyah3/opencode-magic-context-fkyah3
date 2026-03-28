import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  children?: React.ReactNode;
  opacity?: number;
  active?: boolean;
  title?: string;
};

/**
 * Sidekick panel. Cyan/mint accent, fresh-session warmth.
 */
export const SidekickPanel: React.FC<Props> = ({
  children,
  opacity = 1,
  active = false,
  title = "Sidekick",
}) => {
  return (
    <div
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "14px 18px",
        background: COLORS.sidekickBg,
        border: `1px solid ${active ? COLORS.sidekickAccent : COLORS.sidekickBorder}`,
        borderRadius: LAYOUT.borderRadiusSm,
        boxShadow: active
          ? `0 0 20px ${COLORS.sidekickGlow}`
          : undefined,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: active ? COLORS.sidekickAccent : COLORS.textMuted,
            boxShadow: active ? `0 0 6px ${COLORS.sidekickAccent}` : undefined,
          }}
        />
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            fontWeight: 600,
            color: COLORS.sidekickAccent,
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: FONT.mono,
          }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
};
