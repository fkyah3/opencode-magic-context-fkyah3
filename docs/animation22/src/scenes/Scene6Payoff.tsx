import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, CONTEXT_PANEL_WIDTH, DEFAULT_CONTEXT_STATS, RawMessage } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { SceneCaption } from "../components/SceneCaption";

// Scene 6: Payoff - pressure drops, flow intact (frames 1350-1559, 7s)
// Shows the payoff: usage drops, session never paused

const generateRawMessages = (count: number): RawMessage[] => {
  const roles: ('user' | 'assistant' | 'system' | 'tool')[] = ['user', 'assistant', 'system', 'tool'];
  const previews = ["User request...", "Assistant response...", "Tool call", "System prompt"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `rm-${i}`,
    role: roles[i % roles.length],
    tokens: Math.floor(Math.random() * 300) + 100,
    preview: previews[i % previews.length],
  }));
};

const SCENE6_TRANSCRIPT = [
  { id: 'u1', type: 'user' as const, content: 'Currently we have a new problem, athena-junior is able to spawn another athena-junior inside which normally shouldn\'t happen' },
  { id: 'a1', type: 'assistant' as const, content: 'The user is saying that athena-junior can spawn another athena-junior as a sub-agent, which shouldn\'t be allowed. Let me investigate where task delegation is enforced.' },
  { id: 'act1', type: 'action' as const, content: 'Explored 1 read, 2 searches' },
  { id: 'a2', type: 'assistant' as const, content: 'I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard for athena-junior.' },
  { id: 'act2', type: 'action' as const, content: 'Edit subagent-resolver.ts' },
  { id: 'act3', type: 'action' as const, content: 'Called lsp_diagnostics' },
  { id: 'u2', type: 'user' as const, content: 'Can you also check if there are any other agents that can spawn themselves?' },
  { id: 'a3', type: 'assistant' as const, content: 'I\'ll search for all agent types and their delegation rules.' },
  { id: 'act4', type: 'action' as const, content: 'Explored 3 searches' },
  { id: 'a4', type: 'assistant' as const, content: 'Found that prometheus, atlas, and sisyphus all have proper guards.' },
  { id: 'act5', type: 'action' as const, content: 'Edit subagent-resolver.ts +8 -0' },
  { id: 'a5', type: 'assistant' as const, content: 'The fix is complete. Self-recursion guard added.' },
];

export const Scene6Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const DROP_START = 0;
  const DROP_END = 70; // frames 0-70: usage drops
  const ACTIVE_START = 71;
  const ACTIVE_END = 140; // frames 71-140: transcript remains active
  const HOLD_START = 141;
  const HOLD_END = 210; // frames 141-210: hold healthy state

  // Session position
  const sessionX = (1920 - SESSION_WIDTH) / 2;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Visible entries
  const visibleEntries = Math.floor(interpolate(
    frame,
    [ACTIVE_START, ACTIVE_END],
    [10, 12],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Usage drops from ~91% to ~56%
  const usage = interpolate(
    frame,
    [DROP_START, DROP_END],
    [91, 56],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Total tokens
  const totalTokens = Math.round(interpolate(
    frame,
    [DROP_START, DROP_END],
    [182000, 112000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Raw messages decrease
  const rawMessageCount = Math.floor(interpolate(
    frame,
    [DROP_START, DROP_END],
    [95, 28],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Stats
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage,
    totalTokens,
    assistantMessages: 22,
    userMessages: 14,
    rawMessages: rawMessageCount,
  };

  const rawMessages = generateRawMessages(rawMessageCount);

  // Caption
  const captionText = "The main agent never stopped. Flow stayed intact.";

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
            entries={SCENE6_TRANSCRIPT}
            visibleEntries={visibleEntries}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={15}
          />
        </SessionShell>
      </div>

      {/* Usage delta indicator */}
      {frame >= DROP_START && frame < DROP_END + 30 && (
        <div
          style={{
            position: "absolute",
            right: sessionX + SESSION_WIDTH - CONTEXT_PANEL_WIDTH + 20,
            top: sessionY + 200,
            opacity: interpolate(frame, [DROP_START, DROP_START + 20, DROP_END + 10, DROP_END + 30], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: "rgba(63,185,80,0.15)",
              border: `1px solid ${COLORS.contextGreen}`,
              borderRadius: 8,
              padding: "8px 16px",
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.contextGreen,
            }}
          >
            -35% context
          </div>
        </div>
      )}

      {/* Caption */}
      {frame >= HOLD_START && (
        <SceneCaption
          text={captionText}
          frame={frame - HOLD_START}
          duration={70}
        />
      )}
    </AbsoluteFill>
  );
};