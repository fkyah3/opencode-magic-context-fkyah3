import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, DEFAULT_CONTEXT_STATS, RawMessage, SAMPLE_COMPARTMENTS } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { MergedCompartmentCard } from "../components/CompartmentCard";
import { SceneCaption } from "../components/SceneCaption";

// Scene 7: Long-session sustainability - compartment merging (frames 1560-1829, 9s)
// Shows older compartments merging for very long sessions

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

const SCENE7_TRANSCRIPT = [
  { id: 'u1', type: 'user' as const, content: 'Continue with the auth refactor' },
  { id: 'a1', type: 'assistant' as const, content: 'I\'ll continue from where we left off with the authentication module.' },
  { id: 'act1', type: 'action' as const, content: 'Explored 2 reads' },
  { id: 'a2', type: 'assistant' as const, content: 'The session has been running for a while. Let me check the history budget.' },
];

export const Scene7CompartmentMerging: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const BUDGET_START = 0;
  const BUDGET_END = 80; // frames 0-80: History Budget indicator glows
  const MERGE_START = 81;
  const MERGE_END = 180; // frames 81-180: Compartments merge
  const HOLD_START = 181;
  const HOLD_END = 270; // frames 181-270: Hold merged state

  // Session position (shifted left)
  const sessionX = 60;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;
  const sessionScale = 0.8;

  // Usage
  const usage = interpolate(
    frame,
    [BUDGET_START, MERGE_END],
    [56, 48],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Total tokens
  const totalTokens = Math.round(interpolate(
    frame,
    [BUDGET_START, MERGE_END],
    [112000, 96000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Stats
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage,
    totalTokens,
    assistantMessages: 25,
    userMessages: 18,
    rawMessages: 30,
  };

  const rawMessages = generateRawMessages(30);

  // Compartments to merge
  const compartmentsToMerge = SAMPLE_COMPARTMENTS;

  // Budget glow
  const budgetGlow = frame >= BUDGET_START && frame < BUDGET_END
    ? Math.sin(frame * 0.15) * 0.3 + 0.7
    : 1;

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Main session */}
      <div
        style={{
          position: "absolute",
          left: sessionX,
          top: sessionY,
          transform: `scale(${sessionScale})`,
          transformOrigin: "top left",
        }}
      >
        <SessionShell sessionName="ATHENA">
          <TranscriptPane
            entries={SCENE7_TRANSCRIPT}
            visibleEntries={4}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={10}
          />
        </SessionShell>
      </div>

      {/* History Budget indicator */}
      {frame >= BUDGET_START && (
        <div
          style={{
            position: "absolute",
            left: sessionX + SESSION_WIDTH * sessionScale + 40,
            top: sessionY + 50,
            opacity: interpolate(frame, [BUDGET_START, BUDGET_START + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.contextAmber}`,
              borderRadius: 10,
              padding: "12px 16px",
              boxShadow: `0 0 20px rgba(210,153,34,${budgetGlow * 0.3})`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                color: COLORS.contextAmber,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              History Budget
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 10,
                color: COLORS.textMuted,
              }}
            >
              nearing threshold
            </div>
          </div>
        </div>
      )}

      {/* Compartment cards */}
      <div
        style={{
          position: "absolute",
          left: sessionX + SESSION_WIDTH * sessionScale + 40,
          top: sessionY + 150,
          width: 320,
        }}
      >
        {/* Individual compartments (before merge) */}
        {frame < MERGE_START && (
          <div>
            {compartmentsToMerge.map((comp, i) => {
              const enterProgress = interpolate(
                frame,
                [BUDGET_START + i * 10, BUDGET_START + i * 10 + 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div key={comp.id} style={{ opacity: budgetGlow }}>
                  <div
                    style={{
                      background: COLORS.compartmentBg,
                      border: `1px solid ${COLORS.compartmentBorder}`,
                      borderRadius: 8,
                      padding: "8px 12px",
                      marginBottom: 8,
                      fontFamily: FONT_FAMILY,
                      fontSize: 11,
                      color: COLORS.textSecondary,
                    }}
                  >
                    📦 {comp.title}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Merged compartment (after merge) */}
        {frame >= MERGE_START && (
          <MergedCompartmentCard
            compartments={compartmentsToMerge}
            enterProgress={interpolate(
              frame,
              [MERGE_START, MERGE_START + 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          />
        )}
      </div>

      {/* Caption */}
      {frame >= HOLD_START && (
        <SceneCaption
          text="As sessions grow, older compartments can be merged again to save even more space."
          frame={frame - HOLD_START}
          duration={90}
        />
      )}
    </AbsoluteFill>
  );
};