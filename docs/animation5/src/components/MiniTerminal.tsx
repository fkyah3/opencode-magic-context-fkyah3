import React from "react";
import { C, FONT, LAYOUT } from "../constants";

type Props = {
  lines: string[];
  visibleLines?: number;
  opacity?: number;
  frozen?: boolean;
  width?: number;
  height?: number;
};

export const MiniTerminal: React.FC<Props> = ({
  lines,
  visibleLines = 6,
  opacity = 1,
  frozen = false,
  width,
  height,
}) => {
  const shownLines = lines.slice(0, visibleLines);

  return (
    <div
      style={{
        width: width || "100%",
        height: height || "auto",
        borderRadius: LAYOUT.cardRadius,
        background: "#0d1117",
        border: `1px solid ${C.border}`,
        overflow: "hidden",
        opacity,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: "#0a0e14",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: frozen ? C.oldRed : C.meterSafe,
            opacity: 0.6,
          }}
        />
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            color: C.textMuted,
          }}
        >
          terminal
        </span>
      </div>

      {/* Output */}
      <div
        style={{
          flex: 1,
          padding: "10px 14px",
          fontFamily: FONT.mono,
          fontSize: 12,
          lineHeight: 1.6,
          color: C.textSecondary,
          position: "relative",
        }}
      >
        {shownLines.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.startsWith("$")
                ? C.textPrimary
                : line.includes("✓")
                  ? C.success
                  : line.includes("passed")
                    ? C.success
                    : C.textSecondary,
              opacity: frozen ? 0.5 : 1,
            }}
          >
            {line}
          </div>
        ))}

        {/* Frozen overlay */}
        {frozen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.15)",
            }}
          />
        )}
      </div>
    </div>
  );
};
