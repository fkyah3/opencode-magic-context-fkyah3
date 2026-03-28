import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, Fact } from "../constants";

interface FactChipProps {
  fact: Fact;
  enterProgress: number;
  isMemory?: boolean;
}

export const FactChip: React.FC<FactChipProps> = ({
  fact,
  enterProgress,
  isMemory = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entered = spring({
    frame: Math.round(enterProgress * 25),
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const opacity = interpolate(enterProgress, [0, 0.25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(entered, [0, 1], [-20, 0]);
  const translateY = interpolate(entered, [0, 1], [8, 0]);

  const accentColor = isMemory ? COLORS.memoryAccent : COLORS.factAccent;
  const bgColor = isMemory ? COLORS.memoryBg : COLORS.factBg;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: bgColor,
        border: `1px solid ${accentColor}40`,
        borderRadius: 999,
        padding: "6px 12px",
        marginBottom: 8,
        marginRight: 8,
        opacity,
        transform: `translateX(${translateX}px) translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: accentColor,
        }}
      />
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 11,
          color: COLORS.textPrimary,
        }}
      >
        {fact.content}
      </span>
    </div>
  );
};

// Memory card for promoted facts
interface MemoryCardProps {
  type: string;
  content: string;
  enterProgress: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  type,
  content,
  enterProgress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entered = spring({
    frame: Math.round(enterProgress * 30),
    fps,
    config: { damping: 18, stiffness: 220 },
  });

  const opacity = interpolate(enterProgress, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entered, [0, 1], [10, 0]);

  return (
    <div
      style={{
        background: COLORS.memoryBg,
        border: `1.5px solid ${COLORS.memoryAccent}40`,
        borderRadius: 8,
        padding: "10px 14px",
        marginBottom: 8,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 12 }}>🧠</span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 10,
            color: COLORS.memoryAccent,
            fontWeight: 600,
          }}
        >
          {type}
        </span>
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 12,
          color: COLORS.textPrimary,
        }}
      >
        {content}
      </div>
    </div>
  );
};