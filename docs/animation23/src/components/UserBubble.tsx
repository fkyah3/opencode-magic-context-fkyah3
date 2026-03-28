import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  text: string;
  opacity?: number;
  translateY?: number;
};

/**
 * User message bubble with blue accent bar on the left.
 */
export const UserBubble: React.FC<Props> = ({
  text,
  opacity = 1,
  translateY = 0,
}) => {
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "row",
        borderRadius: LAYOUT.borderRadiusSm,
        background: COLORS.userBubbleBg,
        border: `1px solid ${COLORS.userBubbleBorder}`,
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 3,
          background: COLORS.userBubbleAccent,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          padding: "10px 14px",
          fontSize: FONT_SIZE.sm,
          color: COLORS.textPrimary,
          lineHeight: 1.5,
          fontFamily: FONT.sans,
        }}
      >
        {text}
      </div>
    </div>
  );
};
