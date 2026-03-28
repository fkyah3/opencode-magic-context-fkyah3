import React from "react";
import { COLORS, FONT, FONT_SIZE, LAYOUT } from "../constants";

type Props = {
  placeholder?: string;
  opacity?: number;
  /** Show text being typed */
  typedText?: string;
};

/**
 * Bottom input field of the session.
 */
export const InputBar: React.FC<Props> = ({
  placeholder = "Type a message...",
  opacity = 1,
  typedText,
}) => {
  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        height: LAYOUT.inputBarHeight,
        padding: "0 14px",
        background: COLORS.panelBg,
        borderRadius: `0 0 ${LAYOUT.borderRadius}px ${LAYOUT.borderRadius}px`,
        borderTop: `1px solid ${COLORS.panelBorder}`,
        gap: 10,
      }}
    >
      <div
        style={{
          flex: 1,
          fontSize: FONT_SIZE.sm,
          color: typedText ? COLORS.textPrimary : COLORS.textDim,
          fontFamily: FONT.sans,
        }}
      >
        {typedText || placeholder}
      </div>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: LAYOUT.borderRadiusSm,
          background: COLORS.panelBorder,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: FONT_SIZE.xs,
          color: COLORS.textMuted,
        }}
      >
        ↵
      </div>
    </div>
  );
};
