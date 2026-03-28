import React from "react";
import { COLORS, FONT_FAMILY } from "../constants";

interface SessionShellProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const SessionShell: React.FC<SessionShellProps> = ({ children, style = {} }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: COLORS.bg,
      display: "flex",
      flexDirection: "column",
      padding: 40,
      gap: 20,
      ...style,
    }}
  >
    {children}
  </div>
);

interface SessionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
}

export const SessionHeader: React.FC<SessionHeaderProps> = ({
  title,
  subtitle,
  badge,
  badgeColor = COLORS.success,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 16,
      borderBottom: `1px solid ${COLORS.border}`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.textPrimary,
        }}
      >
        {title}
      </span>
      {badge && (
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 11,
            fontWeight: 600,
            color: badgeColor,
            padding: "2px 8px",
            backgroundColor: `${badgeColor}20`,
            borderRadius: 4,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {badge}
        </span>
      )}
    </div>
    {subtitle && (
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          color: COLORS.textSecondary,
        }}
      >
        {subtitle}
      </span>
    )}
  </div>
);
