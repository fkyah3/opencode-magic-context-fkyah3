import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_FAMILY, FONT_FAMILY_MONO, CONTEXT_PANEL_WIDTH, ContextStats, RawMessage } from "../constants";

interface ContextInspectorProps {
  stats: ContextStats;
  rawMessages?: RawMessage[];
  visibleRawMessages?: number;
  showBreakdown?: boolean;
  usageWarning?: boolean;
  queuedReductions?: { id: string; label: string; tokens: number }[];
}

export const ContextInspector: React.FC<ContextInspectorProps> = ({
  stats,
  rawMessages = [],
  visibleRawMessages,
  showBreakdown = true,
  usageWarning = false,
  queuedReductions = [],
}) => {
  const frame = useCurrentFrame();

  // Determine usage color
  const usageColor = stats.usage < 50
    ? COLORS.contextGreen
    : stats.usage < 75
    ? COLORS.contextAmber
    : COLORS.contextRed;

  // Pulse effect for high usage
  const pulse = usageWarning && stats.usage > 90
    ? Math.sin(frame * 0.15) * 0.3 + 0.7
    : 1;

  const visibleRawCount = visibleRawMessages ?? rawMessages.length;

  return (
    <div
      style={{
        width: CONTEXT_PANEL_WIDTH,
        height: "100%",
        background: COLORS.cardBg,
        borderLeft: `1px solid ${COLORS.panelBorder}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: `1px solid ${COLORS.panelBorder}`,
          background: COLORS.sessionHeader,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textPrimary,
          }}
        >
          Context Inspector
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Session info */}
        <StatRow label="Session" value={stats.session} />
        <StatRow label="Provider" value={stats.provider} />
        <StatRow label="Model" value={stats.model} />

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: COLORS.panelBorder,
            margin: "4px 0",
          }}
        />

        {/* Token stats */}
        <StatRow
          label="Context Limit"
          value={stats.contextLimit.toLocaleString()}
          mono
        />
        <StatRow
          label="Total Tokens"
          value={stats.totalTokens.toLocaleString()}
          mono
        />

        {/* Usage bar */}
        <div style={{ marginTop: 4 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 11,
                color: COLORS.textMuted,
              }}
            >
              Usage
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 12,
                fontWeight: 600,
                color: usageColor,
              }}
            >
              {Math.round(stats.usage)}%
            </span>
          </div>
          <div
            style={{
              height: 8,
              background: COLORS.contextTrack,
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, stats.usage)}%`,
                background: usageColor,
                borderRadius: 999,
                opacity: pulse,
                transition: "width 0.3s ease-out",
              }}
            />
          </div>
          {/* Threshold marker */}
          <div
            style={{
              position: "relative",
              marginTop: 4,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "75%",
                top: -12,
                width: 1,
                height: 16,
                background: "rgba(248,81,73,0.4)",
              }}
            />
          </div>
        </div>

        {/* Cache tokens */}
        <StatRow
          label="Cache Tokens"
          value={stats.cacheTokens.toLocaleString()}
          mono
        />

        {/* Message counts */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 4,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 10,
                color: COLORS.textMuted,
              }}
            >
              Assistant
            </span>
            <div
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 13,
                color: COLORS.textPrimary,
              }}
            >
              {stats.assistantMessages}
            </div>
          </div>
          <div>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 10,
                color: COLORS.textMuted,
              }}
            >
              User
            </span>
            <div
              style={{
                fontFamily: FONT_FAMILY_MONO,
                fontSize: 13,
                color: COLORS.textPrimary,
              }}
            >
              {stats.userMessages}
            </div>
          </div>
        </div>

        {/* Context breakdown */}
        {showBreakdown && (
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 11,
                color: COLORS.textMuted,
                marginBottom: 6,
              }}
            >
              Context Breakdown
            </div>
            <ContextBreakdownBar
              systemPct={15}
              historyPct={45}
              rawPct={25}
              remainingPct={15}
            />
          </div>
        )}
      </div>

      {/* Raw Messages */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          borderTop: `1px solid ${COLORS.panelBorder}`,
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            background: COLORS.sessionHeader,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 11,
              color: COLORS.textMuted,
            }}
          >
            Raw Messages ({rawMessages.length})
          </span>
        </div>
        <div
          style={{
            padding: "8px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            maxHeight: 200,
            overflow: "hidden",
          }}
        >
          {rawMessages.slice(0, visibleRawCount).map((msg, index) => (
            <RawMessageRow
              key={msg.id}
              message={msg}
              index={index}
              isQueued={queuedReductions.some(q => q.id === msg.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Stat row component
interface StatRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

const StatRow: React.FC<StatRowProps> = ({ label, value, mono = false }) => {
  return (
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
          fontSize: 11,
          color: COLORS.textMuted,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: mono ? FONT_FAMILY_MONO : FONT_FAMILY,
          fontSize: mono ? 11 : 12,
          color: COLORS.textPrimary,
        }}
      >
        {value}
      </span>
    </div>
  );
};

// Context breakdown bar
interface ContextBreakdownBarProps {
  systemPct: number;
  historyPct: number;
  rawPct: number;
  remainingPct: number;
}

const ContextBreakdownBar: React.FC<ContextBreakdownBarProps> = ({
  systemPct,
  historyPct,
  rawPct,
  remainingPct,
}) => {
  return (
    <div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: COLORS.contextTrack,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${systemPct}%`,
            background: "#8b949e",
          }}
          title="System"
        />
        <div
          style={{
            width: `${historyPct}%`,
            background: COLORS.historianAccent,
          }}
          title="History"
        />
        <div
          style={{
            width: `${rawPct}%`,
            background: COLORS.magicAccent,
          }}
          title="Raw Messages"
        />
        <div
          style={{
            width: `${remainingPct}%`,
            background: COLORS.contextGreen,
          }}
          title="Remaining"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        {[
          { label: "Sys", pct: systemPct },
          { label: "Hist", pct: historyPct },
          { label: "Raw", pct: rawPct },
          { label: "Free", pct: remainingPct },
        ].map(({ label, pct }) => (
          <span
            key={label}
            style={{
              fontFamily: FONT_FAMILY_MONO,
              fontSize: 9,
              color: COLORS.textMuted,
            }}
          >
            {label} {pct}%
          </span>
        ))}
      </div>
    </div>
  );
};

// Raw message row
interface RawMessageRowProps {
  message: RawMessage;
  index: number;
  isQueued?: boolean;
}

const RawMessageRow: React.FC<RawMessageRowProps> = ({
  message,
  index,
  isQueued = false,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [index * 3, index * 3 + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const roleColor = message.role === "user"
    ? COLORS.userBubble
    : message.role === "assistant"
    ? COLORS.magicAccent
    : message.role === "tool"
    ? COLORS.contextAmber
    : COLORS.textMuted;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 8px",
        background: isQueued ? COLORS.queueBg : "transparent",
        borderRadius: 4,
        opacity,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: roleColor,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 9,
            color: isQueued ? COLORS.queueAccent : COLORS.textSecondary,
          }}
        >
          {message.preview}
        </span>
      </div>
      <span
        style={{
          fontFamily: FONT_FAMILY_MONO,
          fontSize: 9,
          color: COLORS.textMuted,
        }}
      >
        {message.tokens}t
      </span>
    </div>
  );
};