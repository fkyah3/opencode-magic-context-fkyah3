import React from "react";
import {AbsoluteFill} from "remotion";
import {
  COLORS,
  FONT_FAMILY,
  FONT_FAMILY_MONO,
  TranscriptEntry,
} from "../constants";

const generatedTranscriptTemplates: Omit<TranscriptEntry, "id">[] = [
  {
    type: "assistant",
    content:
      "I found the delegation branch. I’m checking whether the resolver can recurse through a category fallback.",
  },
  {
    type: "action",
    content: "Explored",
    subContent: "2 reads, 1 search",
  },
  {
    type: "assistant",
    content:
      "That path is real. I’ll patch the guard and keep the other resolver files aligned so behavior stays consistent.",
  },
  {
    type: "action",
    content: "Edit",
    subContent: "resolver-guards.ts",
  },
  {
    type: "user",
    content:
      "Make sure the fix doesn’t change how category-based delegation works for the normal agent flow.",
  },
  {
    type: "assistant",
    content:
      "Understood. I’m preserving the normal path and only blocking the self-recursive edge case.",
  },
  {
    type: "action",
    content: "Called",
    subContent: "lsp_diagnostics",
  },
  {
    type: "assistant",
    content:
      "Diagnostics are clean. I’m checking one more adjacent resolver before wrapping this change.",
  },
];

export const extendTranscript = (
  base: TranscriptEntry[],
  targetLength: number,
): TranscriptEntry[] => {
  if (targetLength <= base.length) {
    return base.slice(0, targetLength);
  }

  const result = [...base];
  let index = 0;

  while (result.length < targetLength) {
    const template = generatedTranscriptTemplates[index % generatedTranscriptTemplates.length];
    result.push({
      ...template,
      id: `generated-${index + 1}`,
    });
    index += 1;
  }

  return result;
};

export const SceneBackground: React.FC<{
  accent?: string;
  accentSecondary?: string;
  gridOpacity?: number;
}> = ({
  accent = COLORS.magicAccent,
  accentSecondary = COLORS.historianDeep,
  gridOpacity = 0.12,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            `radial-gradient(circle at 18% 20%, ${accent}18 0%, transparent 28%), ` +
            `radial-gradient(circle at 82% 18%, ${accentSecondary}14 0%, transparent 24%), ` +
            `radial-gradient(circle at 70% 82%, ${COLORS.memoryAccent}12 0%, transparent 26%), ` +
            `linear-gradient(180deg, ${COLORS.bg} 0%, #07090e 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,246,252,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,246,252,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: gridOpacity,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.18) 58%, rgba(10,10,15,0.72) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const FrostCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  accentColor?: string;
}> = ({children, style, accentColor = COLORS.border}) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(13,17,23,0.86)",
        border: `1px solid ${accentColor}`,
        borderRadius: 16,
        boxShadow: "0 20px 80px rgba(0,0,0,0.28)",
        backdropFilter: "blur(18px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Eyebrow: React.FC<{
  text: string;
  color?: string;
  style?: React.CSSProperties;
}> = ({text, color = COLORS.textSecondary, style}) => {
  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color,
        fontWeight: 700,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export const MetricPill: React.FC<{
  label: string;
  value: string;
  color?: string;
  style?: React.CSSProperties;
}> = ({label, value, color = COLORS.magicAccent, style}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 999,
        backgroundColor: `${color}12`,
        border: `1px solid ${color}35`,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT_FAMILY_MONO,
          fontSize: 12,
          color: COLORS.textPrimary,
        }}
      >
        {value}
      </span>
    </div>
  );
};

export const FlowLine: React.FC<{
  color?: string;
  style?: React.CSSProperties;
}> = ({color = COLORS.magicAccent, style}) => {
  return (
    <div
      style={{
        height: 2,
        borderRadius: 999,
        background: `linear-gradient(90deg, transparent 0%, ${color} 18%, ${color} 82%, transparent 100%)`,
        boxShadow: `0 0 24px ${color}55`,
        ...style,
      }}
    />
  );
};

export const BudgetBar: React.FC<{
  label: string;
  value: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({label, value, color = COLORS.magicAccent, style}) => {
  return (
    <div style={{display: "flex", flexDirection: "column", gap: 8, ...style}}>
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
            fontSize: 13,
            color,
            fontWeight: 700,
          }}
        >
          {value.toFixed(0)}%
        </span>
      </div>
      <div
        style={{
          height: 8,
          backgroundColor: COLORS.contextTrack,
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color} 0%, ${COLORS.textPrimary} 100%)`,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
};

export const DotMatrix: React.FC<{
  count: number;
  color?: string;
  columns?: number;
  activeCount?: number;
  style?: React.CSSProperties;
}> = ({count, color = COLORS.magicAccent, columns = 6, activeCount = count, style}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 12px)`,
        gap: 10,
        ...style,
      }}
    >
      {Array.from({length: count}).map((_, index) => {
        const active = index < activeCount;
        return (
          <div
            key={index}
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: active ? color : `${COLORS.border}`,
              boxShadow: active ? `0 0 18px ${color}66` : "none",
              opacity: active ? 1 : 0.45,
            }}
          />
        );
      })}
    </div>
  );
};
