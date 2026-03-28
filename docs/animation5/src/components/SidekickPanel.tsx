import React from "react";
import { C, FONT, LAYOUT } from "../constants";
import { panelShadow, glow } from "../utils";

type Props = {
  items: string[];
  visibleCount?: number;
  opacity?: number;
  pulseFrame?: number;
};

export const SidekickPanel: React.FC<Props> = ({
  items,
  visibleCount = 0,
  opacity = 1,
  pulseFrame = 0,
}) => {
  return (
    <div
      style={{
        width: 400,
        borderRadius: LAYOUT.panelRadius,
        background: C.bgPanel,
        border: `1px solid ${C.sideBorder}`,
        boxShadow: `${panelShadow(0.4)}, ${glow(C.sideLight, 10, 0)}`,
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: C.sideLight,
            boxShadow: `0 0 8px ${C.sideLight}`,
            opacity: 0.6 + Math.sin(pulseFrame * 0.1) * 0.4,
          }}
        />
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 20,
            fontWeight: 700,
            color: C.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          Sidekick
        </div>
      </div>

      {/* Briefing items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => {
          const visible = i < visibleCount;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: LAYOUT.chipRadius,
                background: visible ? C.sideGlow : "transparent",
                border: visible
                  ? `1px solid ${C.sideBorder}`
                  : "1px solid transparent",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateX(0)"
                  : "translateX(20px)",
              }}
            >
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: C.sideLight,
                  width: 18,
                  textAlign: "center",
                }}
              >
                →
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: C.textPrimary,
                  letterSpacing: "-0.01em",
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
