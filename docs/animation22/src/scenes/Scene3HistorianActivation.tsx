import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, SCENE1_TRANSCRIPT, DEFAULT_CONTEXT_STATS, RawMessage } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { HistorianPanel } from "../components/HistorianPanel";
import { SceneCaption } from "../components/SceneCaption";

// Scene 3: Historian activation (frames 330-599, 9s)
// Shows that when context pressure rises, Magic Context does not block

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

// Additional transcript entries for this scene
const SCENE3_TRANSCRIPT = [
  ...SCENE1_TRANSCRIPT,
  { id: 'u3', type: 'user' as const, content: 'Can you also check if there are any other agents that can spawn themselves?' },
  { id: 'a5', type: 'assistant' as const, content: 'I detect fix intent. Let me trace where sub-agent spawning is gated.' },
  { id: 'act5', type: 'action' as const, content: 'Explored 1 read, 2 searches' },
  { id: 'a6', type: 'assistant' as const, content: 'The issue is clear. A self-recursion guard is missing.' },
  { id: 'act6', type: 'action' as const, content: 'Edit subagent-resolver.ts' },
];

export const Scene3HistorianActivation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const ACTIVE_START = 0;
  const ACTIVE_END = 60; // frames 0-60: main session active
  const PRESSURE_START = 61;
  const PRESSURE_END = 130; // frames 61-130: usage rises, no stall
  const HISTORIAN_START = 131;
  const HISTORIAN_END = 270; // frames 131-270: Historian wakes up

  // Session position
  const sessionX = (1920 - SESSION_WIDTH) / 2;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Visible entries
  const visibleEntries = Math.floor(interpolate(
    frame,
    [0, 270],
    [1, 12],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Usage rises but doesn't hit hard stop
  const usage = interpolate(
    frame,
    [0, 60, 130, 270],
    [68, 81, 91, 91],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Total tokens
  const totalTokens = Math.round(interpolate(
    frame,
    [0, 60, 130, 270],
    [136000, 162000, 182000, 182000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Raw messages
  const rawMessageCount = Math.floor(interpolate(
    frame,
    [0, 270],
    [60, 95],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Historian panel
  const historianOpacity = interpolate(
    frame,
    [HISTORIAN_START, HISTORIAN_START + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Historian status
  const historianStatus = frame < PRESSURE_END 
    ? 'idle' 
    : frame < HISTORIAN_START + 60 
    ? 'monitoring' 
    : 'selecting';

  // Historian progress
  const historianProgress = interpolate(
    frame,
    [HISTORIAN_START, HISTORIAN_END],
    [0, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Stats
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage,
    totalTokens,
    assistantMessages: 15 + Math.floor(frame * 0.02),
    userMessages: 10 + Math.floor(frame * 0.01),
    rawMessages: rawMessageCount,
  };

  const rawMessages = generateRawMessages(rawMessageCount);

  // Caption
  const captionText = "Magic Context: before the session blocks, a background Historian starts working.";

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
            entries={SCENE3_TRANSCRIPT}
            visibleEntries={visibleEntries}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={15}
            usageWarning={usage > 85}
          />
        </SessionShell>
      </div>

      {/* Historian panel */}
      {frame >= HISTORIAN_START && (
        <HistorianPanel
          status={historianStatus}
          progress={historianProgress}
          opacity={historianOpacity}
          position={{ x: sessionX + SESSION_WIDTH + 40, y: sessionY + 100 }}
        />
      )}

      {/* Caption */}
      {frame >= HISTORIAN_START + 30 && (
        <SceneCaption
          text={captionText}
          frame={frame - HISTORIAN_START - 30}
          duration={90}
        />
      )}
    </AbsoluteFill>
  );
};