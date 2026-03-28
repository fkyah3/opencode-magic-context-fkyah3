import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, SCENE1_TRANSCRIPT, DEFAULT_CONTEXT_STATS, RawMessage } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { SplitLabel } from "../components/SceneCaption";

// Scene 2: Split comparison bridge (frames 210-329, 4s)
// Shows old way (blocked) vs Magic Context (active)

const generateRawMessages = (count: number): RawMessage[] => {
  const roles: ('user' | 'assistant' | 'system' | 'tool')[] = ['user', 'assistant', 'system', 'tool'];
  const previews = ["User request...", "Assistant response...", "Tool call", "System prompt"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `rm-${i}`,
    role: roles[i % roles.length],
    tokens: Math.floor(Math.random() * 600) + 200,
    preview: previews[i % previews.length],
  }));
};

export const Scene2SplitComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const SPLIT_START = 0;
  const SPLIT_END = 35; // frames 0-35: transform to split
  const CONTRAST_START = 36;
  const CONTRAST_END = 75; // frames 36-75: contrast becomes clear
  const ZOOM_START = 76;
  const ZOOM_END = 120; // frames 76-120: zoom into Magic Context

  // Split screen positions
  const leftPanelX = interpolate(
    frame,
    [SPLIT_START, SPLIT_END],
    [(1920 - SESSION_WIDTH) / 2, 40],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const leftPanelScale = interpolate(
    frame,
    [SPLIT_START, SPLIT_END],
    [1, 0.55],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const leftPanelOpacity = interpolate(
    frame,
    [ZOOM_START, ZOOM_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rightPanelX = interpolate(
    frame,
    [SPLIT_START, SPLIT_END],
    [1920, 1920 - SESSION_WIDTH * 0.55 - 60],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rightPanelScale = interpolate(
    frame,
    [SPLIT_START, SPLIT_END],
    [0, 0.55],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rightPanelOpacity = interpolate(
    frame,
    [SPLIT_START + 10, SPLIT_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Right panel zoom
  const rightPanelFinalScale = interpolate(
    frame,
    [ZOOM_START, ZOOM_END],
    [0.55, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rightPanelFinalX = interpolate(
    frame,
    [ZOOM_START, ZOOM_END],
    [1920 - SESSION_WIDTH * 0.55 - 60, (1920 - SESSION_WIDTH) / 2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Label opacity
  const labelOpacity = interpolate(
    frame,
    [SPLIT_END, CONTRAST_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Old way stats (frozen at 100%)
  const oldStats = {
    ...DEFAULT_CONTEXT_STATS,
    usage: 100,
    totalTokens: 200000,
    assistantMessages: 24,
    userMessages: 16,
    rawMessages: 150,
  };

  // Magic Context stats (active, rising)
  const magicUsage = interpolate(
    frame,
    [CONTRAST_START, CONTRAST_END],
    [72, 90],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const magicStats = {
    ...DEFAULT_CONTEXT_STATS,
    usage: magicUsage,
    totalTokens: Math.round(144000 + (magicUsage - 72) * 2000),
    assistantMessages: 18 + Math.floor(frame * 0.02),
    userMessages: 12 + Math.floor(frame * 0.01),
    rawMessages: 80 + Math.floor(frame * 0.1),
  };

  // Historian appears
  const historianOpacity = interpolate(
    frame,
    [CONTRAST_END - 20, CONTRAST_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Left panel - Old Way (blocked) */}
      {frame < ZOOM_END && (
        <div
          style={{
            position: "absolute",
            left: leftPanelX,
            top: (1080 - SESSION_HEIGHT * leftPanelScale) / 2,
            transform: `scale(${leftPanelScale})`,
            transformOrigin: "top left",
            opacity: leftPanelOpacity,
          }}
        >
          <SessionShell
            sessionName="ATHENA"
            showInputBar={false}
            freezeOverlay={true}
            freezeText="Context limit reached"
          >
            <TranscriptPane
              entries={SCENE1_TRANSCRIPT.slice(0, 6)}
              visibleEntries={6}
            />
            <ContextInspector
              stats={oldStats}
              rawMessages={generateRawMessages(150)}
              visibleRawMessages={15}
              usageWarning={true}
            />
          </SessionShell>
        </div>
      )}

      {/* Left label */}
      {frame >= SPLIT_END && frame < ZOOM_END && (
        <SplitLabel text="Old Way" side="left" opacity={labelOpacity} />
      )}

      {/* Right panel - Magic Context (active) */}
      {frame >= SPLIT_START + 10 && (
        <div
          style={{
            position: "absolute",
            left: frame >= ZOOM_START ? rightPanelFinalX : rightPanelX,
            top: (1080 - SESSION_HEIGHT * (frame >= ZOOM_START ? rightPanelFinalScale : rightPanelScale)) / 2,
            transform: `scale(${frame >= ZOOM_START ? rightPanelFinalScale : rightPanelScale})`,
            transformOrigin: "top left",
            opacity: rightPanelOpacity,
          }}
        >
          <SessionShell sessionName="ATHENA">
            <TranscriptPane
              entries={SCENE1_TRANSCRIPT}
              visibleEntries={Math.min(8, Math.floor(3 + frame * 0.05))}
            />
            <ContextInspector
              stats={magicStats}
              rawMessages={generateRawMessages(magicStats.rawMessages)}
              visibleRawMessages={15}
              usageWarning={magicUsage > 85}
            />
          </SessionShell>
        </div>
      )}

      {/* Right label */}
      {frame >= SPLIT_END && frame < ZOOM_END && (
        <SplitLabel text="Magic Context" side="right" opacity={labelOpacity} />
      )}

      {/* Historian indicator */}
      {frame >= CONTRAST_END - 20 && frame < ZOOM_END && (
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: 200,
            opacity: historianOpacity,
          }}
        >
          <div
            style={{
              background: COLORS.historianBg,
              border: `1px solid ${COLORS.historianAccent}`,
              borderRadius: 8,
              padding: "8px 16px",
              fontFamily: FONT_FAMILY,
              fontSize: 12,
              color: COLORS.historianAccent,
            }}
          >
            ◈ Historian (background)
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};