import React from "react";
import { C, FONT } from "../constants";

type Props = {
  label: string;
  active?: boolean;
  applied?: boolean;
  opacity?: number;
};

export const QueueBadge: React.FC<Props> = ({
  label,
  active = false,
  applied = false,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 8,
        background: applied
          ? "rgba(52, 211, 153, 0.06)"
          : active
            ? "rgba(245, 158, 11, 0.08)"
            : C.bgCard,
        border: applied
          ? `1px solid ${C.compBorder}`
          : active
            ? `1px solid ${C.oldBorder}`
            : `1px solid ${C.border}`,
        fontFamily: FONT.mono,
        fontSize: 13,
        color: applied ? C.success : active ? C.oldAmber : C.textSecondary,
        opacity,
        letterSpacing: "-0.01em",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: applied ? C.success : active ? C.oldAmber : C.textMuted,
          opacity: applied ? 0.8 : active ? 0.6 : 0.3,
        }}
      />
      {label}
      {applied && (
        <span style={{ color: C.success, fontSize: 12 }}>✓</span>
      )}
    </div>
  );
};
