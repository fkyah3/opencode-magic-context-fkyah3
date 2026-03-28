import React from "react";
import { COLORS, FONT, FONT_SIZE } from "../constants";

type Props = {
  text: string;
  opacity?: number;
  /** Position from bottom in px */
  bottom?: number;
};

/**
 * Bottom caption text for scene narration.
 * Clean, readable, centered.
 */
export const CaptionLine: React.FC<Props> = ({
  text,
  opacity = 1,
  bottom = 48,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom,
        display: "flex",
        justifyContent: "center",
        padding: "0 80px",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <div
        style={{
          opacity,
          padding: "10px 24px",
          background: `${COLORS.bg}dd`,
          borderRadius: 8,
          backdropFilter: "blur(8px)",
          border: `1px solid ${COLORS.panelBorder}`,
        }}
      >
        <span
          style={{
            fontSize: FONT_SIZE.base,
            fontWeight: 500,
            color: COLORS.textPrimary,
            fontFamily: FONT.sans,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
