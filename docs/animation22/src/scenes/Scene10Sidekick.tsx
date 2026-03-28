import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, DEFAULT_CONTEXT_STATS, RawMessage } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { SidekickPanel } from "../components/SceneCaption";
import { SceneCaption } from "../components/SceneCaption";

// Scene 10: Sidekick (frames 2370-2579, 7s)
// Shows how a new session can start already informed

const generateRawMessages = (count: number): RawMessage[] => {
  const roles: ('user' | 'assistant' | 'system' | 'tool')[] = ['user', 'assistant', 'system', 'tool'];
  const previews = ["User request...", "Assistant response...", "Tool call", "System prompt"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `rm-${i}`,
    role: roles[i % roles.length],
    tokens: Math.floor(Math.random() * 200) + 100,
    preview: previews[i % previews.length],
  }));
};

export const Scene10Sidekick: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const NEW_SESSION_START = 0;
  const NEW_SESSION_END = 60; // frames 0-60: New session starts
  const SIDEKICK_START = 61;
  const SIDEKICK_END = 120; // frames 61-120: Sidekick activates
  const BRIEFING_START = 121;
  const BRIEFING_END = 175; // frames 121-175: Briefing assembled
  const HOLD_START = 176;
  const HOLD_END = 210; // frames 176-210: Hold warm-start payoff

  // Session position (fresh, clean)
  const sessionX = (1920 - SESSION_WIDTH) / 2;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Session scale (slightly smaller for fresh feel)
  const sessionScale = 0.9;

  // Stats (fresh session)
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage: 15,
    totalTokens: 30000,
    cacheTokens: 5000,
    assistantMessages: 2,
    userMessages: 1,
    rawMessages: 8,
  };

  const rawMessages = generateRawMessages(8);

  // User prompt appears
  const userPromptOpacity = interpolate(
    frame,
    [NEW_SESSION_START, NEW_SESSION_START + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Sidekick briefing
  const showBriefing = frame >= BRIEFING_START;

  // Caption
  const captionText = "Sidekick helps new sessions start with the right context already in place.";

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Fresh session */}
      <div
        style={{
          position: "absolute",
          left: sessionX,
          top: sessionY,
          transform: `scale(${sessionScale})`,
          transformOrigin: "center center",
        }}
      >
        <SessionShell
          sessionName="ATHENA"
          inputText={frame >= NEW_SESSION_START + 30 ? "Continue the auth refactor and preserve the retry behavior." : ""}
        >
          <TranscriptPane
            entries={[
              { id: 'u1', type: 'user', content: 'Continue the auth refactor and preserve the retry behavior.' },
            ]}
            visibleEntries={frame >= NEW_SESSION_START + 30 ? 1 : 0}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={8}
          />
        </SessionShell>
      </div>

      {/* Sidekick panel */}
      {frame >= SIDEKICK_START && (
        <div
          style={{
            position: "absolute",
            right: sessionX + 50,
            top: sessionY + 80,
            opacity: interpolate(frame, [SIDEKICK_START, SIDEKICK_START + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <SidekickPanel
            opacity={1}
            showBriefing={showBriefing}
          />
        </div>
      )}

      {/* Caption */}
      {frame >= HOLD_START && (
        <SceneCaption
          text={captionText}
          frame={frame - HOLD_START}
          duration={35}
        />
      )}
    </AbsoluteFill>
  );
};