import React from "react";
import { COLORS, FONT, FONT_SIZE } from "../constants";

type Props = {
  label: string;
  tokens?: number;
  opacity?: number;
  /** Ghosted/pending state */
  ghosted?: boolean;
  /** Applied/collapsed state */
  applied?: boolean;
};

/**
 * Queue badge for cache-aware reductions.
 * Shows ghosted/pending items that will be applied later.
 */
export const QueueBadge: React.FC<Props> = ({
  label,
  tokens,
  opacity = 1,
  ghosted = false,
  applied = false,
}) => {
  return (
    <div
      style={{
        opacity: applied ? opacity * 0.3 : opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: "6px 12px",
        background: ghosted ? COLORS.queuedBg : COLORS.panelBg,
        border: `1px dashed ${ghosted ? COLORS.queuedBorder : COLORS.panelBorder}`,
        borderRadius: 4,
        textDecoration: applied ? "line-through" : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontSize: 10,
            color: COLORS.cacheAccent,
            fontFamily: FONT.mono,
          }}
        >
          ⏳
        </span>
        <span
          style={{
            fontSize: FONT_SIZE.xs,
            color: ghosted ? COLORS.textDim : COLORS.textMuted,
            fontFamily: FONT.sans,
          }}
        >
          {label}
        </span>
      </div>
      {tokens !== undefined && (
        <span
          style={{
            fontSize: 10,
            color: COLORS.textDim,
            fontFamily: FONT.mono,
          }}
        >
          {tokens > 1000 ? `${(tokens / 1000).toFixed(1)}k` : tokens}
        </span>
      )}
    </div>
  );
};
