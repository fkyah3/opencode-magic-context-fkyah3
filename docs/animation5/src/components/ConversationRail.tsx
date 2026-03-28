import React from "react";
import { C, FONT, LAYOUT } from "../constants";
import type { RailMessageDef } from "../constants";
import { MessageCard } from "./MessageCard";

type Props = {
  messages: RailMessageDef[];
  /** Horizontal scroll offset (positive = scrolled right) */
  scrollOffset?: number;
  /** Index range of cards being highlighted for extraction [start, end) */
  highlightRange?: [number, number];
  /** 0-1 progress of extraction animation */
  extractProgress?: number;
  /** Number of tail messages to show (for animated growth) */
  visibleTailCount?: number;
  /** Show zone labels */
  showZoneLabels?: boolean;
  /** Index where head zone ends */
  headZoneEnd?: number;
  /** Opacity */
  opacity?: number;
  /** Width override */
  width?: number;
  /** Height override */
  height?: number;
  /** Ghosted card indices (for cache awareness) */
  ghostedIndices?: number[];
};

export const ConversationRail: React.FC<Props> = ({
  messages,
  scrollOffset = 0,
  highlightRange,
  extractProgress = 0,
  visibleTailCount,
  showZoneLabels = false,
  headZoneEnd,
  opacity = 1,
  width,
  height = LAYOUT.railHeight,
  ghostedIndices = [],
}) => {
  const cardW = LAYOUT.railCardWidth;
  const cardH = LAYOUT.railCardHeight;
  const gap = LAYOUT.railGap;
  const totalWidth = messages.length * (cardW + gap) - gap;
  const zoneEnd = headZoneEnd ?? Math.floor(messages.length * 0.4);

  return (
    <div
      style={{
        width: width || "100%",
        height,
        position: "relative",
        overflow: "hidden",
        opacity,
        borderRadius: LAYOUT.cardRadius,
      }}
    >
      {/* Zone background overlays */}
      {showZoneLabels && (
        <>
          {/* Head zone bg */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${(zoneEnd / messages.length) * 100}%`,
              background: "rgba(139, 92, 246, 0.03)",
              borderRight: `1px dashed ${C.histBorder}`,
              zIndex: 0,
            }}
          />
          {/* Zone labels */}
          <div
            style={{
              position: "absolute",
              left: 12,
              top: 6,
              fontFamily: FONT.mono,
              fontSize: 10,
              color: C.histViolet,
              opacity: 0.6,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              zIndex: 2,
            }}
          >
            ← older history (head)
          </div>
          <div
            style={{
              position: "absolute",
              right: 12,
              top: 6,
              fontFamily: FONT.mono,
              fontSize: 10,
              color: C.mcCyan,
              opacity: 0.6,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              zIndex: 2,
            }}
          >
            newest activity (tail) →
          </div>
        </>
      )}

      {/* Rail content */}
      <div
        style={{
          display: "flex",
          gap,
          position: "absolute",
          top: showZoneLabels ? 24 : (height - cardH) / 2,
          left: -scrollOffset,
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {messages.map((msg, i) => {
          const isHighlighted =
            highlightRange !== undefined &&
            i >= highlightRange[0] &&
            i < highlightRange[1];

          const isGhosted = ghostedIndices.includes(i);

          // Extraction animation: highlighted cards float up
          const extractY = isHighlighted
            ? -80 * extractProgress
            : 0;
          const extractScale = isHighlighted
            ? 1 - 0.15 * extractProgress
            : 1;
          const extractOpacity = isHighlighted
            ? 1 - 0.7 * extractProgress
            : 1;

          // Tail visibility
          const tailVisible =
            visibleTailCount === undefined ||
            i < messages.length - (messages.length - (visibleTailCount ?? messages.length));
          const cardOpacity = tailVisible ? extractOpacity : 0;

          return (
            <MessageCard
              key={msg.id}
              message={msg}
              highlighted={isHighlighted}
              extractY={extractY}
              opacity={cardOpacity}
              scale={extractScale}
              glowColor={C.histViolet}
              ghosted={isGhosted}
            />
          );
        })}
      </div>

      {/* Gradient masks for edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 40,
          background: `linear-gradient(90deg, ${C.bg}, transparent)`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 40,
          background: `linear-gradient(270deg, ${C.bg}, transparent)`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
