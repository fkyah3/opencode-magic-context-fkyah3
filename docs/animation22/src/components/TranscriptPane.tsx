import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, FONT_FAMILY_MONO, TRANSCRIPT_WIDTH, TranscriptEntry } from "../constants";

interface TranscriptPaneProps {
  entries: TranscriptEntry[];
  visibleEntries?: number;
  scrollProgress?: number;
  highlightRange?: { start: number; end: number };
  highlightOpacity?: number;
  headOpacity?: number;
  tailOpacity?: number;
}

export const TranscriptPane: React.FC<TranscriptPaneProps> = ({
  entries,
  visibleEntries,
  scrollProgress = 0,
  highlightRange,
  highlightOpacity = 0,
  headOpacity = 1,
  tailOpacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const visibleCount = visibleEntries ?? entries.length;

  return (
    <div
      style={{
        width: TRANSCRIPT_WIDTH,
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Age indicator */}
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          opacity: 0.6,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 9,
            color: COLORS.textMuted,
            textAlign: "right",
          }}
        >
          HEAD
        </div>
        <div
          style={{
            width: 40,
            height: 80,
            background: `linear-gradient(to bottom, ${COLORS.historianAccent}40, ${COLORS.textMuted}20)`,
            borderRadius: 4,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background: COLORS.magicAccent,
              borderRadius: "0 0 4px 4px",
              opacity: 0.5,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 9,
            color: COLORS.textMuted,
            textAlign: "right",
          }}
        >
          TAIL
        </div>
      </div>

      {/* Transcript entries */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          transform: `translateY(${-scrollProgress * 100}px)`,
        }}
      >
        {entries.slice(0, visibleCount).map((entry, index) => {
          const isHighlighted = highlightRange &&
            index >= highlightRange.start &&
            index <= highlightRange.end;

          const entryOpacity = spring({
            frame: frame - index * 8,
            fps,
            config: { damping: 200 },
          });

          const clampedOpacity = Math.max(0, Math.min(1, entryOpacity));

          // Determine if this is in the "head" (older) or "tail" (newer) region
          const isHead = index < entries.length / 2;
          const regionOpacity = isHead ? headOpacity : tailOpacity;

          return (
            <div
              key={entry.id}
              style={{
                opacity: clampedOpacity * regionOpacity,
                transform: `translateY(${interpolate(clampedOpacity, [0, 1], [10, 0])}px)`,
              }}
            >
              {entry.type === "user" && (
                <UserBubble
                  content={entry.content}
                  isHighlighted={isHighlighted}
                  highlightOpacity={highlightOpacity}
                />
              )}
              {entry.type === "assistant" && (
                <AssistantBlock
                  content={entry.content}
                  isHighlighted={isHighlighted}
                  highlightOpacity={highlightOpacity}
                />
              )}
              {entry.type === "action" && (
                <ActionRow
                  content={entry.content}
                  isHighlighted={isHighlighted}
                  highlightOpacity={highlightOpacity}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// User message bubble
interface UserBubbleProps {
  content: string;
  isHighlighted?: boolean;
  highlightOpacity?: number;
}

const UserBubble: React.FC<UserBubbleProps> = ({
  content,
  isHighlighted = false,
  highlightOpacity = 0,
}) => {
  const glowIntensity = isHighlighted ? highlightOpacity : 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          background: COLORS.userBubbleBg,
          border: `1px solid ${COLORS.userBubble}`,
          borderRadius: 12,
          padding: "10px 14px",
          boxShadow: glowIntensity > 0.1
            ? `0 0 0 2px rgba(88,166,255,${glowIntensity * 0.3})`
            : "none",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 13,
            color: COLORS.textPrimary,
            lineHeight: 1.5,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

// Assistant reasoning/work block
interface AssistantBlockProps {
  content: string;
  isHighlighted?: boolean;
  highlightOpacity?: number;
}

const AssistantBlock: React.FC<AssistantBlockProps> = ({
  content,
  isHighlighted = false,
  highlightOpacity = 0,
}) => {
  const glowIntensity = isHighlighted ? highlightOpacity : 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "90%",
          background: COLORS.assistantBlock,
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: 12,
          padding: "12px 16px",
          boxShadow: glowIntensity > 0.1
            ? `0 0 0 2px rgba(88,166,255,${glowIntensity * 0.3})`
            : "none",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 12,
            color: COLORS.textSecondary,
            lineHeight: 1.6,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

// Action row (tool calls, edits, etc.)
interface ActionRowProps {
  content: string;
  isHighlighted?: boolean;
  highlightOpacity?: number;
}

const ActionRow: React.FC<ActionRowProps> = ({
  content,
  isHighlighted = false,
  highlightOpacity = 0,
}) => {
  const glowIntensity = isHighlighted ? highlightOpacity : 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: COLORS.actionRow,
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: 6,
          padding: "6px 12px",
          boxShadow: glowIntensity > 0.1
            ? `0 0 0 2px rgba(88,166,255,${glowIntensity * 0.3})`
            : "none",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: COLORS.magicAccent,
          }}
        />
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 11,
            color: COLORS.textSecondary,
          }}
        >
          {content}
        </span>
      </div>
    </div>
  );
};