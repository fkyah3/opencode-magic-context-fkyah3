import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";

interface SceneCaptionProps {
  text: string;
  subtitle?: string;
  frame: number;
  duration?: number;
}

export const SceneCaption: React.FC<SceneCaptionProps> = ({
  text,
  subtitle,
  frame,
  duration = 75,
}) => {
  // Fade in 0-15, Hold 15-duration+15, Fade out duration-15-duration
  const opacity = interpolate(
    frame,
    [0, 15, duration - 15, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Once it fades out, it should disappear entirely
  if (frame > duration) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          textAlign: "center",
          maxWidth: 1200,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.textPrimary,
            letterSpacing: "0.02em",
            lineHeight: 1.4,
          }}
        >
          {text}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 20,
              color: COLORS.textSecondary,
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

// Split screen label
interface SplitLabelProps {
  text: string;
  side: 'left' | 'right';
  opacity?: number;
}

export const SplitLabel: React.FC<SplitLabelProps> = ({
  text,
  side,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        [side === 'left' ? 'left' : 'right']: 40,
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        fontWeight: 600,
        color: side === 'left' ? COLORS.oldWayAccent : COLORS.magicAccent,
        background: side === 'left' ? COLORS.oldWayBg : COLORS.magicBg,
        padding: "8px 16px",
        borderRadius: 8,
        opacity,
        zIndex: 50,
      }}
    >
      {text}
    </div>
  );
};

// Queue badge for cache-aware reductions
interface QueueBadgeProps {
  label: string;
  tokens: number;
  opacity?: number;
  isGhosted?: boolean;
}

export const QueueBadge: React.FC<QueueBadgeProps> = ({
  label,
  tokens,
  opacity = 1,
  isGhosted = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: isGhosted ? `${COLORS.queueBg}80` : COLORS.queueBg,
        border: `1px solid ${COLORS.queueAccent}${isGhosted ? '40' : '80'}`,
        borderRadius: 6,
        padding: "6px 10px",
        opacity,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: COLORS.queueAccent,
          opacity: isGhosted ? 0.5 : 1,
        }}
      />
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 10,
          color: isGhosted ? COLORS.textMuted : COLORS.textSecondary,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 9,
          color: COLORS.textMuted,
        }}
      >
        {tokens}t
      </span>
    </div>
  );
};

// Dreamer panel
interface DreamerPanelProps {
  status: 'idle' | 'consolidating' | 'verifying' | 'archiving' | 'complete';
  opacity?: number;
}

export const DreamerPanel: React.FC<DreamerPanelProps> = ({
  status,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  const statusText = {
    idle: "Off-session maintenance",
    consolidating: "Consolidating memory",
    verifying: "Verifying retained facts",
    archiving: "Archiving stale knowledge",
    complete: "Maintenance complete",
  };

  const taskList = [
    { icon: "🗜️", text: "Consolidate: merge similar memories", done: status !== 'idle' },
    { icon: "✓", text: "Verify: check memories against codebase", done: status === 'verifying' || status === 'archiving' || status === 'complete' },
    { icon: "⊘", text: "Archive stale: retire removed features", done: status === 'archiving' || status === 'complete' },
    { icon: "✍️", text: "Improve: rewrite into terse facts", done: status === 'complete' },
  ];

  return (
    <div
      style={{
        width: 320,
        background: COLORS.dreamerBg,
        border: `1.5px solid ${COLORS.dreamerAccent}30`,
        borderRadius: 14,
        padding: "14px 16px",
        opacity,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: COLORS.dreamerAccent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          🌙
        </div>
        <div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 700,
              fontSize: 13,
              color: COLORS.dreamerAccent,
            }}
          >
            Dreamer
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              color: COLORS.textMuted,
            }}
          >
            night maintenance
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: `${COLORS.dreamerAccent}20`,
          marginBottom: 12,
        }}
      />

      {/* Status */}
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 12,
          color: COLORS.textSecondary,
          marginBottom: 12,
        }}
      >
        {statusText[status]}
      </div>

      {/* Task list */}
      {taskList.map((task, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
            opacity: task.done ? 1 : 0.5,
          }}
        >
          <span style={{ fontSize: 12 }}>{task.icon}</span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              color: task.done ? COLORS.textPrimary : COLORS.textMuted,
            }}
          >
            {task.text}
          </span>
        </div>
      ))}
    </div>
  );
};

// Sidekick panel
interface SidekickPanelProps {
  opacity?: number;
  showBriefing?: boolean;
}

export const SidekickPanel: React.FC<SidekickPanelProps> = ({
  opacity = 1,
  showBriefing = false,
}) => {
  const frame = useCurrentFrame();

  const briefingOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 300,
        background: COLORS.sidekickBg,
        border: `1.5px solid ${COLORS.sidekickAccent}40`,
        borderRadius: 14,
        padding: "14px 16px",
        opacity,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: COLORS.sidekickAccent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          ⚡
        </div>
        <div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 700,
              fontSize: 13,
              color: COLORS.sidekickAccent,
            }}
          >
            Sidekick
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              color: COLORS.textMuted,
            }}
          >
            session warm-start
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: `${COLORS.sidekickAccent}20`,
          marginBottom: 12,
        }}
      />

      {/* Briefing */}
      {showBriefing && (
        <div
          style={{
            opacity: briefingOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 11,
              color: COLORS.textSecondary,
              marginBottom: 8,
            }}
          >
            Assembling briefing...
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 10,
                color: COLORS.contextGreen,
                background: "rgba(63,185,80,0.1)",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              ✓ Relevant memory found
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 10,
                color: COLORS.contextGreen,
                background: "rgba(63,185,80,0.1)",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              ✓ Prior constraint restored
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 10,
                color: COLORS.contextGreen,
                background: "rgba(63,185,80,0.1)",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              ✓ Previous decisions loaded
            </div>
          </div>
        </div>
      )}
    </div>
  );
};