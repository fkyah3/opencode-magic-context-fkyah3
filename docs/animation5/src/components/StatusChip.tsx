import React from "react";
import { C, FONT, LAYOUT } from "../constants";

type Props = {
  text: string;
  variant?: "default" | "active" | "warning" | "success" | "dim";
  opacity?: number;
  scale?: number;
};

export const StatusChip: React.FC<Props> = ({
  text,
  variant = "default",
  opacity = 1,
  scale = 1,
}) => {
  const colors = {
    default: { bg: C.bgCard, border: C.border, text: C.textSecondary },
    active: { bg: "rgba(34, 211, 238, 0.08)", border: C.mcBorder, text: C.mcCyan },
    warning: { bg: "rgba(245, 158, 11, 0.08)", border: C.oldBorder, text: C.oldAmber },
    success: { bg: "rgba(52, 211, 153, 0.08)", border: C.compBorder, text: C.success },
    dim: { bg: C.bgPanel, border: C.border, text: C.textMuted },
  }[variant];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: LAYOUT.chipRadius,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        fontFamily: FONT.mono,
        fontSize: 13,
        color: colors.text,
        opacity,
        transform: `scale(${scale})`,
        whiteSpace: "nowrap",
        letterSpacing: "-0.01em",
      }}
    >
      {variant === "active" && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.mcCyan,
            boxShadow: `0 0 6px ${C.mcCyan}`,
          }}
        />
      )}
      {text}
    </div>
  );
};
