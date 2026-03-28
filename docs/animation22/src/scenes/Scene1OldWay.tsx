import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, CONTEXT_PANEL_WIDTH, TRANSCRIPT_WIDTH, SCENE1_TRANSCRIPT, DEFAULT_CONTEXT_STATS, RawMessage } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { SceneCaption } from "../components/SceneCaption";

// Scene 1: Old way - full-screen OpenCode session pain (frames 0-209, 7s)
// Shows the session growing, context pressure rising, and eventually blocking

// Generate raw messages for context inspector
const generateRawMessages = (count: number): RawMessage[] => {
  const roles: ('user' | 'assistant' | 'system' | 'tool')[] = ['user', 'assistant', 'system', 'tool'];
  const previews = [
    "User request...",
    "Assistant response...",
    "Tool call: read",
    "Tool result: file...",
    "System prompt",
    "Context injection",
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `rm-${i}`,
    role: roles[i % roles.length],
    tokens: Math.floor(Math.random() * 800) + 200,
    preview: previews[i % previews.length],
  }));
};

export const Scene1OldWay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges for this scene
  const GROWTH_START = 0;
  const GROWTH_END = 110; // frames 0-110: active session growth
  const PRESSURE_START = 111;
  const PRESSURE_END = 145; // frames 111-145: pressure rises hard
  const BLOCK_START = 146;
  const BLOCK_END = 160; // frames 146-160: hard blocking moment
  const STALL_START = 161;
  const STALL_END = 209; // frames 161-209: hold blocked state

  // Calculate visible entries based on frame
  const visibleEntries = Math.min(
    SCENE1_TRANSCRIPT.length,
    Math.floor(interpolate(frame, [0, 110], [1, 10], { extrapolateRight: "clamp" }))
  );

  // Calculate usage based on frame
  const usage = interpolate(
    frame,
    [0, 50, 110, 145, 160],
    [34, 55, 88, 99, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Calculate total tokens
  const totalTokens = Math.round(interpolate(
    frame,
    [0, 50, 110, 145],
    [68000, 110000, 176000, 198000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Raw messages count
  const rawMessageCount = Math.floor(interpolate(
    frame,
    [0, 110],
    [45, 120],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Freeze overlay
  const showFreeze = frame >= BLOCK_START;
  const freezeOpacity = interpolate(
    frame,
    [BLOCK_START, BLOCK_START + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Caption
  const captionOpacity = interpolate(
    frame,
    [STALL_START, STALL_START + 15, STALL_END - 15, STALL_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Session position (centered)
  const sessionX = (1920 - SESSION_WIDTH) / 2;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Stats for context inspector
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    totalTokens,
    usage,
    assistantMessages: Math.floor(12 + frame * 0.05),
    userMessages: Math.floor(8 + frame * 0.03),
    rawMessages: rawMessageCount,
  };

  const rawMessages = generateRawMessages(rawMessageCount);

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
        <SessionShell
          sessionName="ATHENA"
          showInputBar={!showFreeze}
          inputOpacity={showFreeze ? 0.3 : 1}
          freezeOverlay={showFreeze}
          freezeText="Context limit reached"
        >
          <TranscriptPane
            entries={SCENE1_TRANSCRIPT}
            visibleEntries={visibleEntries}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={Math.min(15, rawMessageCount)}
            usageWarning={usage > 90}
          />
        </SessionShell>
      </div>

      {/* Caption during stall phase */}
      {frame >= STALL_START && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: captionOpacity,
          }}
        >
          <div
            style={{
              background: "rgba(248,81,73,0.15)",
              border: `1px solid ${COLORS.oldWayAccent}`,
              borderRadius: 12,
              padding: "16px 32px",
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              color: COLORS.textPrimary,
              textAlign: "center",
            }}
          >
            Old way: the main agent hits the limit and stops to compact itself.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};