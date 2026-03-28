import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

interface CaptionLineProps {
  text: string;
  subText?: string;
  visible: boolean;
  style?: React.CSSProperties;
  accentColor?: string;
}

export const CaptionLine: React.FC<CaptionLineProps> = ({
  text,
  subText,
  visible,
  style = {},
  accentColor = COLORS.magicAccent,
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 40px",
        ...style,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(10, 10, 15, 0.85)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${accentColor}40`,
          borderRadius: 8,
          padding: "16px 32px",
          maxWidth: 900,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 500,
            color: COLORS.textPrimary,
            lineHeight: 1.4,
          }}
        >
          {text}
        </div>
        {subText && (
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 16,
              color: COLORS.textSecondary,
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            {subText}
          </div>
        )}
      </div>
    </div>
  );
};

interface SceneLabelProps {
  text: string;
  subText?: string;
  visible: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  accentColor?: string;
}

export const SceneLabel: React.FC<SceneLabelProps> = ({
  text,
  subText,
  visible,
  position = "top-left",
  accentColor = COLORS.textSecondary,
}) => {
  if (!visible) return null;

  const positionStyles: Record<string, React.CSSProperties> = {
    "top-left": { top: 40, left: 40 },
    "top-right": { top: 40, right: 40 },
    "bottom-left": { bottom: 40, left: 40 },
    "bottom-right": { bottom: 40, right: 40 },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyles[position],
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 14,
          fontWeight: 600,
          color: accentColor,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {text}
      </div>
      {subText && (
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 12,
            color: COLORS.textTertiary,
          }}
        >
          {subText}
        </div>
      )}
    </div>
  );
};
