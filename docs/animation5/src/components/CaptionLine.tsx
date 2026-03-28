import React from "react";
import { C, FONT } from "../constants";

type Props = {
  text: string;
  opacity?: number;
  y?: number;
  bold?: boolean;
};

export const CaptionLine: React.FC<Props> = ({
  text,
  opacity = 1,
  y = 0,
  bold = true,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 48,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          padding: "14px 32px",
          borderRadius: 12,
          background: "rgba(11, 14, 23, 0.85)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${C.border}`,
          fontFamily: FONT.sans,
          fontSize: 22,
          fontWeight: bold ? 600 : 400,
          color: C.textPrimary,
          letterSpacing: "-0.02em",
          lineHeight: 1.4,
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </div>
  );
};
