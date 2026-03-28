import React from "react";
import { C, FONT, LAYOUT } from "../constants";

type Props = {
  lines: string[];
  visibleLines?: number;
  highlightLine?: number;
  activeTab?: string;
  tabs?: string[];
  opacity?: number;
  cursorVisible?: boolean;
  cursorLine?: number;
  width?: number;
  height?: number;
  frozen?: boolean;
};

const SYNTAX_COLORS: Record<string, string> = {
  keyword: "#C792EA",
  function: "#82AAFF",
  string: "#C3E88D",
  type: "#FFCB6B",
  comment: "#546E7A",
  operator: "#89DDFF",
  plain: "#A6ACCD",
};

function colorize(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const keywords =
    /\b(async|function|const|let|var|if|return|await|export|throw|new)\b/g;
  const strings = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
  const types = /\b(Session|Request|AuthError)\b/g;

  // Simple colorization — just color keywords and strings
  let remaining = line;
  let key = 0;

  // Keywords
  remaining = line;
  const segments: { text: string; color: string }[] = [];
  let lastIdx = 0;

  const matches = [
    ...line.matchAll(keywords),
    ...line.matchAll(strings),
    ...line.matchAll(types),
  ].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  for (const m of matches) {
    const idx = m.index ?? 0;
    if (idx > lastIdx) {
      segments.push({ text: line.slice(lastIdx, idx), color: SYNTAX_COLORS.plain });
    }
    const color = keywords.test(m[0])
      ? SYNTAX_COLORS.keyword
      : strings.test(m[0])
        ? SYNTAX_COLORS.string
        : SYNTAX_COLORS.type;
    // Reset regex lastIndex
    keywords.lastIndex = 0;
    strings.lastIndex = 0;
    segments.push({ text: m[0], color });
    lastIdx = idx + m[0].length;
  }
  if (lastIdx < line.length) {
    segments.push({ text: line.slice(lastIdx), color: SYNTAX_COLORS.plain });
  }

  return segments.length > 0
    ? segments.map((s, i) => (
        <span key={i} style={{ color: s.color }}>
          {s.text}
        </span>
      ))
    : [<span key={0} style={{ color: SYNTAX_COLORS.plain }}>{line}</span>];
}

export const CodeEditor: React.FC<Props> = ({
  lines,
  visibleLines = 12,
  highlightLine,
  activeTab = "auth.ts",
  tabs = [],
  opacity = 1,
  cursorVisible = true,
  cursorLine,
  width,
  height,
  frozen = false,
}) => {
  const shownLines = lines.slice(0, visibleLines);

  return (
    <div
      style={{
        width: width || "100%",
        height: height || "auto",
        borderRadius: LAYOUT.panelRadius,
        background: "#1a1b26",
        border: `1px solid ${C.border}`,
        overflow: "hidden",
        opacity,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: `1px solid ${C.border}`,
          background: "#13141e",
        }}
      >
        {(tabs.length > 0 ? tabs : [activeTab]).map((tab) => (
          <div
            key={tab}
            style={{
              padding: "8px 16px",
              fontFamily: FONT.mono,
              fontSize: 12,
              color: tab === activeTab ? C.textPrimary : C.textMuted,
              borderBottom:
                tab === activeTab ? `2px solid ${C.mcCyan}` : "2px solid transparent",
              background: tab === activeTab ? "rgba(34, 211, 238, 0.04)" : "transparent",
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Code area */}
      <div
        style={{
          flex: 1,
          padding: "12px 0",
          fontFamily: FONT.mono,
          fontSize: 13,
          lineHeight: 1.65,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {shownLines.map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              padding: "0 16px",
              background:
                highlightLine === i
                  ? "rgba(34, 211, 238, 0.06)"
                  : "transparent",
              position: "relative",
            }}
          >
            {/* Line number */}
            <span
              style={{
                width: 36,
                textAlign: "right",
                color: C.textDim,
                marginRight: 16,
                userSelect: "none",
                fontSize: 12,
              }}
            >
              {i + 1}
            </span>
            {/* Code content */}
            <span style={{ color: SYNTAX_COLORS.plain }}>
              {colorize(line)}
            </span>
            {/* Cursor */}
            {cursorVisible && cursorLine === i && !frozen && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: 16,
                  background: C.mcCyan,
                  marginLeft: 2,
                  opacity: 0.8,
                }}
              />
            )}
          </div>
        ))}

        {/* Frozen overlay */}
        {frozen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.15)",
            }}
          />
        )}
      </div>
    </div>
  );
};
