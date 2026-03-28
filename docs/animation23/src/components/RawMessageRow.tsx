import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";
import { formatTokens } from "../helpers";

type Props = {
  label: string;
  tokens: number;
  age: "old" | "recent" | "live";
  opacity?: number;
  /** Highlight for historian selection */
  highlighted?: boolean;
  /** Ghosted for queued reductions */
  ghosted?: boolean;
};

const AGE_COLORS: Record<string, string> = {
  old: COLORS.textDim,
  recent: COLORS.textMuted,
  live: COLORS.textSecondary,
};

/**
 * Single raw message entry in the context inspector.
 */
export const RawMessageRow: React.FC<Props> = ({
  label,
  tokens,
  age,
  opacity = 1,
  highlighted = false,
  ghosted = false,
}) => {
  const textColor = ghosted
    ? `${AGE_COLORS[age]}88`
    : highlighted
      ? COLORS.historianLight
      : AGE_COLORS[age];

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: LAYOUT.rawMessageHeight,
        padding: "0 16px",
        background: highlighted
          ? `${COLORS.historianAccent}11`
          : ghosted
            ? `${COLORS.queuedBg}`
            : undefined,
        borderLeft: highlighted
          ? `2px solid ${COLORS.historianLight}`
          : "2px solid transparent",
        transition: ghosted ? "opacity 0.3s" : undefined,
      }}
    >
      <span
        style={{
          fontSize: FONT_SIZE.xs,
          color: textColor,
          fontFamily: FONT.mono,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 10,
          color: textColor,
          fontFamily: FONT.mono,
          opacity: 0.7,
        }}
      >
        {formatTokens(tokens)}
      </span>
    </div>
  );
};
