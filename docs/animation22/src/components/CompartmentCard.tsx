import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, FONT_FAMILY_MONO, Compartment } from "../constants";

interface CompartmentCardProps {
  compartment: Compartment;
  enterProgress: number;
  opacity?: number;
}

export const CompartmentCard: React.FC<CompartmentCardProps> = ({
  compartment,
  enterProgress,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entered = spring({
    frame: Math.round(enterProgress * 30),
    fps,
    config: { damping: 18, stiffness: 220 },
  });

  const cardOpacity = interpolate(enterProgress, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entered, [0, 1], [12, 0]);

  return (
    <div
      style={{
        background: COLORS.compartmentBg,
        border: `1.5px solid ${COLORS.compartmentBorder}`,
        borderLeft: `4px solid ${COLORS.compartmentAccent}`,
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 10,
        opacity: cardOpacity * opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📦</span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 600,
              fontSize: 13,
              color: COLORS.compartmentAccent,
            }}
          >
            Compartment
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 10,
            color: COLORS.compartmentAccent,
            background: "rgba(16,185,129,0.15)",
            padding: "3px 8px",
            borderRadius: 999,
          }}
        >
          {compartment.messageRange}
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 12,
          color: COLORS.textPrimary,
          marginBottom: 6,
        }}
      >
        {compartment.title}
      </div>

      {/* Summary lines */}
      {[80, 55].map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}%`,
            height: 5,
            borderRadius: 999,
            background: `rgba(16,185,129,${0.4 - i * 0.1})`,
            marginBottom: i < 1 ? 5 : 0,
          }}
        />
      ))}

      <div
        style={{
          marginTop: 8,
          fontFamily: FONT_FAMILY,
          fontSize: 10,
          color: COLORS.textMuted,
        }}
      >
        {compartment.summary}
      </div>
    </div>
  );
};

// Merged compartment card for Scene 7
interface MergedCompartmentCardProps {
  compartments: Compartment[];
  enterProgress: number;
}

export const MergedCompartmentCard: React.FC<MergedCompartmentCardProps> = ({
  compartments,
  enterProgress,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entered = spring({
    frame: Math.round(enterProgress * 30),
    fps,
    config: { damping: 18, stiffness: 220 },
  });

  const cardOpacity = interpolate(enterProgress, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entered, [0, 1], [12, 0]);

  const mergedRange = `${compartments[0]?.messageRange?.split('–')[0]}–${compartments[compartments.length - 1]?.messageRange?.split('–')[1]}`;

  return (
    <div
      style={{
        background: COLORS.compartmentBg,
        border: `1.5px solid ${COLORS.compartmentBorder}`,
        borderLeft: `4px solid ${COLORS.compartmentAccent}`,
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 10,
        opacity: cardOpacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📦</span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontWeight: 600,
              fontSize: 13,
              color: COLORS.compartmentAccent,
            }}
          >
            Merged Compartment
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 10,
            color: COLORS.compartmentAccent,
            background: "rgba(16,185,129,0.15)",
            padding: "3px 8px",
            borderRadius: 999,
          }}
        >
          {mergedRange}
        </span>
      </div>

      {/* Merged titles */}
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 11,
          color: COLORS.textSecondary,
          marginBottom: 6,
        }}
      >
        {compartments.map(c => c.title).join(' + ')}
      </div>

      {/* Summary lines */}
      {[70, 45].map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}%`,
            height: 5,
            borderRadius: 999,
            background: `rgba(16,185,129,${0.35 - i * 0.1})`,
            marginBottom: i < 1 ? 5 : 0,
          }}
        />
      ))}

      <div
        style={{
          marginTop: 8,
          fontFamily: FONT_FAMILY,
          fontSize: 10,
          color: COLORS.textMuted,
        }}
      >
        {compartments.length} compartments merged · archive
      </div>
    </div>
  );
};