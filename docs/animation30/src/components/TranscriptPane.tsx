import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONT_FAMILY, TranscriptEntry } from "../constants";

interface TranscriptPaneProps {
  entries: TranscriptEntry[];
  visibleEntries: number;
  scrollOffset?: number;
  showHeader?: boolean;
  sessionName?: string;
  dimmed?: boolean;
  highlightRange?: { start: number; end: number } | null;
}

export const TranscriptPane: React.FC<TranscriptPaneProps> = ({
  entries,
  visibleEntries,
  scrollOffset = 0,
  showHeader = true,
  sessionName = "ATHENA",
  dimmed = false,
  highlightRange = null,
}) => {
  const visibleEntriesList = entries.slice(0, visibleEntries);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.bgPanel,
        borderRadius: 12,
        border: `1px solid ${COLORS.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: dimmed ? 0.5 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      {showHeader && (
        <div
          style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: COLORS.bgCard,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: COLORS.success,
            }}
          />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.textPrimary,
            }}
          >
            {sessionName}
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 12,
              color: COLORS.textTertiary,
              marginLeft: "auto",
            }}
          >
            Session
          </span>
        </div>
      )}

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          transform: `translateY(-${scrollOffset}px)`,
        }}
      >
        {visibleEntriesList.map((entry, index) => {
          const isHighlighted = Boolean(
            highlightRange &&
              index >= highlightRange.start &&
              index <= highlightRange.end,
          );

          if (entry.type === "user") {
            return (
              <UserBubble
                key={entry.id}
                content={entry.content}
                isHighlighted={isHighlighted}
              />
            );
          }

          if (entry.type === "assistant") {
            return (
              <AssistantBlock
                key={entry.id}
                content={entry.content}
                isHighlighted={isHighlighted}
              />
            );
          }

          if (entry.type === "action") {
            return (
              <ActionRow
                key={entry.id}
                action={entry.content}
                detail={entry.subContent}
                isHighlighted={isHighlighted}
              />
            );
          }

          return null;
        })}
      </div>

      {/* Input bar at bottom */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: COLORS.bgCard,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 36,
            backgroundColor: COLORS.bg,
            borderRadius: 6,
            border: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 13,
              color: COLORS.textTertiary,
            }}
          >
            Message...
          </span>
        </div>
      </div>
    </div>
  );
};

const UserBubble: React.FC<{ content: string; isHighlighted?: boolean }> = ({
  content,
  isHighlighted = false,
}) => (
  <div
    style={{
      alignSelf: "flex-end",
      maxWidth: "80%",
      backgroundColor: isHighlighted ? `${COLORS.historianAccent}20` : COLORS.bgElevated,
      border: `1px solid ${isHighlighted ? COLORS.historianAccent : COLORS.border}`,
      borderRadius: 12,
      padding: "12px 16px",
      boxShadow: isHighlighted ? `0 0 20px ${COLORS.historianAccent}30` : "none",
    }}
  >
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 13,
        color: COLORS.textPrimary,
        lineHeight: 1.5,
      }}
    >
      {content}
    </span>
  </div>
);

const AssistantBlock: React.FC<{ content: string; isHighlighted?: boolean }> = ({
  content,
  isHighlighted = false,
}) => (
  <div
    style={{
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
    }}
  >
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: isHighlighted ? COLORS.historianAccent : COLORS.textSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 12, color: COLORS.bg }}>AI</span>
    </div>
    <div
      style={{
        flex: 1,
        backgroundColor: isHighlighted ? `${COLORS.historianAccent}10` : "transparent",
        border: isHighlighted ? `1px solid ${COLORS.historianAccent}40` : "none",
        borderRadius: 8,
        padding: isHighlighted ? "8px 12px" : 0,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          color: COLORS.textSecondary,
          lineHeight: 1.6,
        }}
      >
        {content}
      </span>
    </div>
  </div>
);

const ActionRow: React.FC<{ action: string; detail?: string; isHighlighted?: boolean }> = ({
  action,
  detail,
  isHighlighted = false,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 12px",
      backgroundColor: isHighlighted ? `${COLORS.historianAccent}15` : COLORS.bg,
      borderRadius: 6,
      border: isHighlighted ? `1px solid ${COLORS.historianAccent}30` : "none",
      marginLeft: 40,
    }}
  >
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: 500,
        color: isHighlighted ? COLORS.historianAccent : COLORS.textSecondary,
      }}
    >
      {action}
    </span>
    {detail && (
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 12,
          color: COLORS.textTertiary,
        }}
      >
        {detail}
      </span>
    )}
  </div>
);

export const BlockedOverlay: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "rgba(10, 10, 15, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.bgPanel,
          border: `1px solid ${COLORS.oldWarning}`,
          borderRadius: 12,
          padding: "32px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: `3px solid ${COLORS.oldWarning}`,
            borderTopColor: "transparent",
            animation: "spin 1s linear infinite",
          }}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.oldWarning,
          }}
        >
          Context limit reached
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            color: COLORS.textSecondary,
          }}
        >
          Compacting history...
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 12,
            color: COLORS.textTertiary,
            marginTop: 8,
          }}
        >
          Summarizing previous steps • Rebuilding session context • Compressing raw history
        </div>
      </div>
    </AbsoluteFill>
  );
};
