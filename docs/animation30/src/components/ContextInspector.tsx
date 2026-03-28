import React from "react";
import { COLORS, FONT_FAMILY, FONT_FAMILY_MONO, ContextStat } from "../constants";

interface ContextInspectorProps {
  usage: number; // 0-100
  totalTokens: number;
  contextLimit: number;
  cacheTokens: number;
  assistantMessages: number;
  userMessages: number;
  rawMessagesCount: number;
  isMagicContext?: boolean;
  isBlocked?: boolean;
}

export const ContextInspector: React.FC<ContextInspectorProps> = ({
  usage,
  totalTokens,
  contextLimit,
  cacheTokens,
  assistantMessages,
  userMessages,
  rawMessagesCount,
  isMagicContext = false,
  isBlocked = false,
}) => {
  const usageColor = usage >= 90 ? COLORS.contextRed : usage >= 70 ? COLORS.contextYellow : COLORS.contextGreen;
  const accentColor = isMagicContext ? COLORS.magicAccent : COLORS.textSecondary;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.bgPanel,
        borderRadius: 12,
        border: `1px solid ${isBlocked ? COLORS.oldWarning : COLORS.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${COLORS.border}`,
          backgroundColor: COLORS.bgCard,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.textPrimary,
          }}
        >
          Context
        </span>
      </div>

      {/* Stats */}
      <div
        style={{
          flex: 1,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflow: "hidden",
        }}
      >
        {/* Usage bar */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                color: COLORS.textSecondary,
              }}
            >
              Usage
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 14,
                fontWeight: 600,
                color: usageColor,
              }}
            >
              {usage.toFixed(0)}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              backgroundColor: COLORS.contextTrack,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${usage}%`,
                height: "100%",
                backgroundColor: usageColor,
                borderRadius: 3,
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Token stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <StatRow label="Total Tokens" value={totalTokens.toLocaleString()} />
          <StatRow label="Context Limit" value={contextLimit.toLocaleString()} />
          <StatRow 
            label="Cache Tokens" 
            value={cacheTokens.toLocaleString()}
            accent={isMagicContext}
            accentColor={accentColor}
          />
        </div>

        <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <StatRow label="Assistant Messages" value={assistantMessages.toString()} />
            <StatRow label="User Messages" value={userMessages.toString()} />
          </div>
        </div>

        {/* Raw messages section */}
        <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                color: COLORS.textSecondary,
              }}
            >
              Raw Messages
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 12,
                color: COLORS.textTertiary,
              }}
            >
              {rawMessagesCount}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              maxHeight: 120,
              overflow: "hidden",
            }}
          >
            {Array.from({ length: Math.min(rawMessagesCount, 6) }).map((_, i) => (
              <RawMessageRow key={i} index={i} />
            ))}
            {rawMessagesCount > 6 && (
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 11,
                  color: COLORS.textTertiary,
                  textAlign: "center",
                  paddingTop: 4,
                }}
              >
                +{rawMessagesCount - 6} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatRow: React.FC<{
  label: string;
  value: string;
  accent?: boolean;
  accentColor?: string;
}> = ({ label, value, accent = false, accentColor = COLORS.magicAccent }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        color: COLORS.textSecondary,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: FONT_FAMILY_MONO,
        fontSize: 12,
        color: accent ? accentColor : COLORS.textPrimary,
        fontWeight: accent ? 500 : 400,
      }}
    >
      {value}
    </span>
  </div>
);

const RawMessageRow: React.FC<{ index: number }> = ({ index }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "4px 8px",
      backgroundColor: COLORS.bg,
      borderRadius: 4,
    }}
  >
    <div
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: index % 2 === 0 ? COLORS.textSecondary : COLORS.textTertiary,
      }}
    />
    <span
      style={{
        fontFamily: FONT_FAMILY_MONO,
        fontSize: 10,
        color: COLORS.textTertiary,
        flex: 1,
      }}
    >
      {index % 2 === 0 ? "assistant" : "user"}
    </span>
    <span
      style={{
        fontFamily: FONT_FAMILY_MONO,
        fontSize: 10,
        color: COLORS.textTertiary,
      }}
    >
      {(200 + index * 50).toLocaleString()} tok
    </span>
  </div>
);
