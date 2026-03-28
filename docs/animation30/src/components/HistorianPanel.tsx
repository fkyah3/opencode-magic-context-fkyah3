import React from "react";
import { COLORS, FONT_FAMILY } from "../constants";

interface HistorianPanelProps {
  status: "idle" | "monitoring" | "selecting" | "processing" | "complete";
  progress?: number;
  message?: string;
}

export const HistorianPanel: React.FC<HistorianPanelProps> = ({
  status,
  progress = 0,
  message,
}) => {
  const statusMessages: Record<string, string> = {
    idle: "Historian (background)",
    monitoring: "Monitoring context pressure",
    selecting: "Selecting older session history",
    processing: "Compartmentalizing session history",
    complete: "Compaction complete",
  };

  const isActive = status !== "idle";

  return (
    <div
      style={{
        backgroundColor: COLORS.bgPanel,
        border: `1px solid ${isActive ? COLORS.historianAccent : COLORS.border}`,
        borderRadius: 10,
        padding: "16px 20px",
        minWidth: 280,
        boxShadow: isActive ? `0 0 30px ${COLORS.historianAccent}20` : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: isActive ? 12 : 0,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: isActive ? COLORS.historianAccent : COLORS.textTertiary,
            animation: isActive ? "pulse 1.5s ease-in-out infinite" : "none",
          }}
        />
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 13,
            fontWeight: 600,
            color: isActive ? COLORS.historianAccent : COLORS.textSecondary,
          }}
        >
          {statusMessages[status]}
        </span>
      </div>

      {isActive && (
        <>
          {progress > 0 && (
            <div
              style={{
                height: 4,
                backgroundColor: COLORS.bg,
                borderRadius: 2,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: COLORS.historianAccent,
                  borderRadius: 2,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          )}
          {message && (
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                color: COLORS.textSecondary,
              }}
            >
              {message}
            </span>
          )}
        </>
      )}
    </div>
  );
};
