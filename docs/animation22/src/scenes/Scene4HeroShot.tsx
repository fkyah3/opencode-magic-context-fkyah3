import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, CONTEXT_PANEL_WIDTH, TRANSCRIPT_WIDTH, SCENE1_TRANSCRIPT, DEFAULT_CONTEXT_STATS, RawMessage, SAMPLE_COMPARTMENTS } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { HistorianPanel } from "../components/HistorianPanel";
import { CompartmentCard } from "../components/CompartmentCard";
import { SceneCaption } from "../components/SceneCaption";

// Scene 4: Hero shot - Historian takes from head while tail grows (frames 600-959, 12s)
// THE MOST IMPORTANT SCENE - shows simultaneity of head processing and tail growth

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

// Extended transcript for this scene
const SCENE4_TRANSCRIPT = [
  ...SCENE1_TRANSCRIPT,
  { id: 'u3', type: 'user' as const, content: 'Can you also check if there are any other agents that can spawn themselves?' },
  { id: 'a5', type: 'assistant' as const, content: 'I detect fix intent. Let me trace where sub-agent spawning is gated.' },
  { id: 'act5', type: 'action' as const, content: 'Explored 1 read, 2 searches' },
  { id: 'a6', type: 'assistant' as const, content: 'The issue is clear. A self-recursion guard is missing.' },
  { id: 'act6', type: 'action' as const, content: 'Edit subagent-resolver.ts' },
  { id: 'act7', type: 'action' as const, content: 'Called lsp_diagnostics' },
  { id: 'a7', type: 'assistant' as const, content: 'I will verify whether the restriction belongs in subagent-resolver.ts.' },
];

export const Scene4HeroShot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const SELECT_START = 0;
  const SELECT_END = 60; // frames 0-60: Historian selects older region
  const PULL_START = 61;
  const PULL_END = 160; // frames 61-160: Historian pulls old material out
  const PROCESS_START = 161;
  const PROCESS_END = 260; // frames 161-260: Historian processes
  const HOLD_START = 261;
  const HOLD_END = 360; // frames 261-360: hold on architecture

  // Session position
  const sessionX = (1920 - SESSION_WIDTH) / 2;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Highlight range for head selection
  const highlightRange = { start: 0, end: 4 };
  const highlightOpacity = interpolate(
    frame,
    [SELECT_START, SELECT_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Head opacity (fades as it's pulled)
  const headOpacity = interpolate(
    frame,
    [PULL_START, PULL_END],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Tail opacity (stays active)
  const tailOpacity = 1;

  // Visible entries - tail keeps growing
  const visibleEntries = Math.floor(interpolate(
    frame,
    [0, 360],
    [8, 14],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Usage stays stable (doesn't hit hard stop)
  const usage = interpolate(
    frame,
    [0, 360],
    [91, 88],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Total tokens
  const totalTokens = Math.round(interpolate(
    frame,
    [0, 360],
    [182000, 176000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Raw messages - some are being pulled
  const rawMessageCount = Math.floor(interpolate(
    frame,
    [0, 360],
    [95, 75],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Historian status
  const historianStatus = frame < PULL_START 
    ? 'selecting' 
    : frame < PROCESS_END 
    ? 'processing' 
    : 'complete';

  // Historian progress
  const historianProgress = interpolate(
    frame,
    [SELECT_START, PROCESS_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Historian position
  const historianX = sessionX + SESSION_WIDTH + 40;
  const historianY = sessionY + 80;

  // Stats
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage,
    totalTokens,
    assistantMessages: 18 + Math.floor(frame * 0.01),
    userMessages: 12 + Math.floor(frame * 0.005),
    rawMessages: rawMessageCount,
  };

  const rawMessages = generateRawMessages(rawMessageCount);

  // Flying chunk animation
  const chunkFlyProgress = interpolate(
    frame,
    [PULL_START, PULL_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );

  // Caption
  const captionText = "Historian rewrites the head. The live session keeps moving on the tail.";

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Main session */}
      <div
        style={{
          position: "absolute",
          left: sessionX,
          top: sessionY,
        }}
      >
        <SessionShell sessionName="ATHENA">
          <TranscriptPane
            entries={SCENE4_TRANSCRIPT}
            visibleEntries={visibleEntries}
            highlightRange={frame >= SELECT_START && frame < PULL_END ? highlightRange : undefined}
            highlightOpacity={highlightOpacity}
            headOpacity={headOpacity}
            tailOpacity={tailOpacity}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={15}
            usageWarning={usage > 85}
          />
        </SessionShell>
      </div>

      {/* Flying chunk ghost (old transcript blocks being pulled) */}
      {frame >= PULL_START && frame < PULL_END + 20 && (
        <div
          style={{
            position: "absolute",
            left: interpolate(chunkFlyProgress, [0, 1], [sessionX + TRANSCRIPT_WIDTH - 50, historianX + 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            top: interpolate(chunkFlyProgress, [0, 1], [sessionY + 80, historianY + 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            opacity: interpolate(chunkFlyProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(chunkFlyProgress, [0, 0.5, 1], [1, 0.8, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: COLORS.historianAccent + "30",
              border: `1px solid ${COLORS.historianAccent}`,
              borderRadius: 8,
              padding: "8px 12px",
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              color: COLORS.textSecondary,
            }}
          >
            §1§–§5§
          </div>
        </div>
      )}

      {/* Historian panel */}
      {frame >= SELECT_START && (
        <HistorianPanel
          status={historianStatus}
          progress={historianProgress}
          opacity={1}
          position={{ x: historianX, y: historianY }}
        />
      )}

      {/* Caption */}
      {frame >= PROCESS_START && (
        <SceneCaption
          text={captionText}
          frame={frame - PROCESS_START}
          duration={100}
        />
      )}
    </AbsoluteFill>
  );
};