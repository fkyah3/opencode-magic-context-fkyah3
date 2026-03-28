import React from "react";
import { COLORS, FONT_FAMILY } from "../constants";

interface CompartmentCardProps {
  title: string;
  summary: string;
  index?: number;
}

export const CompartmentCard: React.FC<CompartmentCardProps> = ({
  title,
  summary,
  index = 0,
}) => (
  <div
    style={{
      backgroundColor: `${COLORS.compartmentAccent}10`,
      border: `1px solid ${COLORS.compartmentAccent}40`,
      borderRadius: 8,
      padding: "12px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      animationDelay: `${index * 100}ms`,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 12,
          color: COLORS.compartmentAccent,
        }}
      >
        📦
      </span>
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 12,
          fontWeight: 600,
          color: COLORS.compartmentAccent,
        }}
      >
        Compartment
      </span>
    </div>
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 13,
        fontWeight: 500,
        color: COLORS.textPrimary,
      }}
    >
      {title}
    </span>
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 11,
        color: COLORS.textSecondary,
        lineHeight: 1.4,
      }}
    >
      {summary}
    </span>
  </div>
);

interface FactChipProps {
  text: string;
  index?: number;
}

export const FactChip: React.FC<FactChipProps> = ({ text, index = 0 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 12px",
      backgroundColor: `${COLORS.factAccent}15`,
      border: `1px solid ${COLORS.factAccent}40`,
      borderRadius: 20,
      animationDelay: `${index * 50}ms`,
    }}
  >
    <span
      style={{
        fontSize: 10,
        color: COLORS.factAccent,
      }}
    >
      ✓
    </span>
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        color: COLORS.textPrimary,
      }}
    >
      {text}
    </span>
  </div>
);

interface MemoryCardProps {
  text: string;
  index?: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ text, index = 0 }) => (
  <div
    style={{
      backgroundColor: `${COLORS.memoryAccent}10`,
      border: `1px solid ${COLORS.memoryAccent}40`,
      borderLeftWidth: 3,
      borderRadius: 6,
      padding: "10px 14px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      animationDelay: `${index * 100}ms`,
    }}
  >
    <span
      style={{
        fontSize: 14,
        color: COLORS.memoryAccent,
      }}
    >
      🧠
    </span>
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        color: COLORS.textPrimary,
      }}
    >
      {text}
    </span>
  </div>
);
