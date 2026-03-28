import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, DEFAULT_CONTEXT_STATS, RawMessage } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { HistorianPanel } from "../components/HistorianPanel";

// Scene 11: Final payoff / end card (frames 2580-2729, 5s)
// Clean final composite showing the healthy system

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

const SCENE11_TRANSCRIPT = [
  { id: 'u1', type: 'user' as const, content: 'Continue the auth refactor and preserve the retry behavior.' },
  { id: 'a1', type: 'assistant' as const, content: 'I\'ll continue from where we left off. Based on the previous session, I need to preserve the retry logic while refactoring the auth module.' },
  { id: 'act1', type: 'action' as const, content: 'Explored 2 reads' },
  { id: 'a2', type: 'assistant' as const, content: 'The self-recursion guard is in place. Proceeding with the refactor.' },
];

export const Scene11FinalPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const ASSEMBLE_START = 0;
  const ASSEMBLE_END = 60; // frames 0-60: Assemble final tableau
  const RESOLVE_START = 61;
  const RESOLVE_END = 150; // frames 61-150: Resolve final text

  // Session position (centered)
  const sessionX = (1920 - SESSION_WIDTH) / 2;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Session scale
  const sessionScale = interpolate(
    frame,
    [ASSEMBLE_START, ASSEMBLE_END],
    [0.85, 0.95],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Stats (healthy)
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage: 38,
    totalTokens: 76000,
    cacheTokens: 15000,
    assistantMessages: 35,
    userMessages: 24,
    rawMessages: 18,
  };

  const rawMessages = generateRawMessages(18);

  // Historian opacity (subtle presence)
  const historianOpacity = interpolate(
    frame,
    [ASSEMBLE_START, ASSEMBLE_END],
    [0, 0.7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Final text opacity
  const textOpacity = interpolate(
    frame,
    [RESOLVE_START, RESOLVE_START + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Main session */}
      <div
        style={{
          position: "absolute",
          left: sessionX,
          top: sessionY,
          transform: `scale(${sessionScale})`,
          transformOrigin: "center center",
        }}
      >
        <SessionShell sessionName="ATHENA">
          <TranscriptPane
            entries={SCENE11_TRANSCRIPT}
            visibleEntries={4}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={10}
          />
        </SessionShell>
      </div>

      {/* Historian (background presence) */}
      {frame >= ASSEMBLE_END - 20 && (
        <div
          style={{
            position: "absolute",
            left: sessionX - 300,
            top: sessionY + 150,
            opacity: historianOpacity,
          }}
        >
          <HistorianPanel
            status="idle"
            opacity={historianOpacity}
            position={{ x: 0, y: 0 }}
          />
        </div>
      )}

      {/* Memory artifacts (subtle) */}
      {frame >= ASSEMBLE_END - 10 && (
        <div
          style={{
            position: "absolute",
            right: sessionX - 280,
            top: sessionY + 100,
            opacity: historianOpacity,
          }}
        >
          <div
            style={{
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.panelBorder}`,
              borderRadius: 12,
              padding: "14px 18px",
              width: 260,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.memoryAccent,
                marginBottom: 10,
              }}
            >
              Memory
            </div>
            {[
              "Agent constraint: Prevent self-recursion",
              "Delegation policy: Category-based",
              "Architecture: Guard at resolver layer",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 10,
                  color: COLORS.textSecondary,
                  marginBottom: 6,
                  paddingLeft: 12,
                  borderLeft: `2px solid ${COLORS.memoryAccent}40`,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final text */}
      {frame >= RESOLVE_START && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: textOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              fontWeight: 600,
              color: COLORS.textPrimary,
              textAlign: "center",
            }}
          >
            Keep the main agent in flow.
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              fontWeight: 600,
              color: COLORS.magicAccent,
              textAlign: "center",
            }}
          >
            Let Magic Context handle the past.
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: FONT_FAMILY,
              fontSize: 16,
              color: COLORS.textMuted,
              letterSpacing: "0.05em",
            }}
          >
            opencode-magic-context
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};