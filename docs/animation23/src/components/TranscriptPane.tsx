import React from "react";
import { COLORS, LAYOUT } from "../constants";

type Props = {
  children: React.ReactNode;
  /** Vertical scroll offset in px (positive = scrolled up) */
  scrollOffset?: number;
  opacity?: number;
  /** Width as CSS value */
  width?: string;
};

/**
 * Left column transcript container.
 * Clips content and applies scroll offset to simulate live scrolling.
 */
export const TranscriptPane: React.FC<Props> = ({
  children,
  scrollOffset = 0,
  opacity = 1,
  width,
}) => {
  return (
    <div
      style={{
        opacity,
        width: width || `${LAYOUT.transcriptWidth * 100}%`,
        display: "flex",
        flexDirection: "column",
        background: COLORS.panelBg,
        borderRadius: LAYOUT.borderRadius,
        border: `1px solid ${COLORS.panelBorder}`,
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Scrollable content area */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `translateY(${-scrollOffset}px)`,
            display: "flex",
            flexDirection: "column",
            gap: LAYOUT.transcriptEntryGap,
            padding: `${LAYOUT.padding / 2}px ${LAYOUT.padding}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
