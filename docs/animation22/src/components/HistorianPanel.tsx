import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, FONT_FAMILY_MONO } from "../constants";

interface HistorianPanelProps {
  status: 'idle' | 'monitoring' | 'selecting' | 'processing' | 'complete';
  progress?: number;
  opacity?: number;
  position?: { x: number; y: number };
}

export const HistorianPanel: React.FC<HistorianPanelProps> = ({
  status,
  progress = 0,
  opacity = 1,
  position = { x: 0, y: 0 },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const statusText = {
    idle: "Monitoring context pressure",
    monitoring: "Monitoring context pressure",
    selecting: "Selecting older session history",
    processing: "Compartmentalizing session history",
    complete: "Compaction complete",
  };

  const subStatusText = {
    idle: "Waiting for threshold",
    monitoring: "Preparing background compaction",
    selecting: "Tracing related raw messages",
    processing: "Extracting durable facts",
    complete: "Context pressure reduced",
  };

  const spinDeg = (frame * 7) % 360;

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: 280,
        background: COLORS.historianBg,
        border: `1.5px solid ${COLORS.historianBorder}`,
        borderRadius: 14,
        padding: "14px 16px",
        opacity: opacity * enterProgress,
        boxShadow: `0 4px 24px ${COLORS.historianAccent}20`,
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
            background: COLORS.historianAccent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              border: `2px solid ${COLORS.historianBorder}`,
              borderTop: `2px solid ${COLORS.historianAccent}`,
              borderRadius: "50%",
              transform: `rotate(${spinDeg}deg)`,
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 700,
              fontSize: 13,
              color: COLORS.historianAccent,
            }}
          >
            Historian
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              color: COLORS.textMuted,
            }}
          >
            background agent
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: COLORS.historianBorder,
          marginBottom: 12,
        }}
      />

      {/* Status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            border: `2px solid ${COLORS.historianBorder}`,
            borderTop: `2px solid ${COLORS.historianAccent}`,
            borderRadius: "50%",
            transform: `rotate(${spinDeg}deg)`,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 12,
            color: COLORS.textSecondary,
          }}
        >
          {statusText[status]}
        </span>
      </div>

      {/* Progress lines */}
      {[0.85, 0.55, 0.35].map((w, i) => (
        <div
          key={i}
          style={{
            height: 5,
            width: "100%",
            background: COLORS.historianBorder,
            borderRadius: 999,
            marginBottom: i < 2 ? 6 : 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${w * 100 * Math.min(1, progress)}%`,
              background: `${COLORS.historianAccent}60`,
              borderRadius: 999,
            }}
          />
        </div>
      ))}

      {/* Sub-status */}
      <div
        style={{
          marginTop: 10,
          fontFamily: FONT_FAMILY_MONO,
          fontSize: 10,
          color: status === 'complete' ? COLORS.contextGreen : COLORS.textMuted,
          background: `${COLORS.historianAccent}12`,
          padding: "4px 8px",
          borderRadius: 6,
        }}
      >
        {subStatusText[status]}
      </div>
    </div>
  );
};