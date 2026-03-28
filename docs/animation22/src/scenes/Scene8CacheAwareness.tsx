import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, DEFAULT_CONTEXT_STATS, RawMessage, SAMPLE_QUEUED_REDUCTIONS } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { QueueBadge } from "../components/SceneCaption";
import { SceneCaption } from "../components/SceneCaption";

// Scene 8: Cache awareness (frames 1830-2099, 9s)
// Shows queued reductions and cache-aware timing

const generateRawMessages = (count: number, queuedIds: string[]): RawMessage[] => {
  const roles: ('user' | 'assistant' | 'system' | 'tool')[] = ['user', 'assistant', 'system', 'tool'];
  const previews = ["User request...", "Assistant response...", "Tool call", "System prompt"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `rm-${i}`,
    role: roles[i % roles.length],
    tokens: Math.floor(Math.random() * 300) + 100,
    preview: previews[i % previews.length],
  }));
};

const SCENE8_TRANSCRIPT = [
  { id: 'u1', type: 'user' as const, content: 'Continue with the auth refactor' },
  { id: 'a1', type: 'assistant' as const, content: 'I\'ll continue from where we left off.' },
  { id: 'act1', type: 'action' as const, content: 'Explored 2 reads' },
  { id: 'a2', type: 'assistant' as const, content: 'The cache is still warm. I\'ll defer some reductions.' },
];

export const Scene8CacheAwareness: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const QUEUE_START = 0;
  const QUEUE_END = 70; // frames 0-70: Mark old ranges as queued
  const PRESERVE_START = 71;
  const PRESERVE_END = 150; // frames 71-150: Show why deferred
  const TRIGGER_START = 151;
  const TRIGGER_END = 220; // frames 151-220: Trigger and apply
  const HOLD_START = 221;
  const HOLD_END = 270; // frames 221-270: Hold result

  // Session position
  const sessionX = (1920 - SESSION_WIDTH) / 2;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Usage
  const usage = interpolate(
    frame,
    [QUEUE_START, TRIGGER_END],
    [58, 42],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Total tokens
  const totalTokens = Math.round(interpolate(
    frame,
    [QUEUE_START, TRIGGER_END],
    [116000, 84000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Stats
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage,
    totalTokens,
    cacheTokens: Math.round(interpolate(frame, [QUEUE_START, TRIGGER_END], [12000, 8000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
    assistantMessages: 28,
    userMessages: 20,
    rawMessages: Math.floor(interpolate(frame, [QUEUE_START, TRIGGER_END], [35, 22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
  };

  const rawMessages = generateRawMessages(35, []);

  // Queued reductions
  const queuedReductions = SAMPLE_QUEUED_REDUCTIONS;

  // Caption
  const captionText = "Cache-aware reductions: queue first, apply when timing actually makes sense.";

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
            entries={SCENE8_TRANSCRIPT}
            visibleEntries={4}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={12}
          />
        </SessionShell>
      </div>

      {/* Queued reductions panel */}
      {frame >= QUEUE_START && (
        <div
          style={{
            position: "absolute",
            right: sessionX + 50,
            top: sessionY + 100,
            opacity: interpolate(frame, [QUEUE_START, QUEUE_START + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.queueAccent}`,
              borderRadius: 12,
              padding: "14px 18px",
              width: 280,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.queueAccent,
                marginBottom: 12,
              }}
            >
              Queued Reductions
            </div>

            {queuedReductions.map((qr, i) => {
              const isGhosted = frame >= TRIGGER_START;
              const opacity = interpolate(
                frame,
                [QUEUE_START + i * 10, QUEUE_START + i * 10 + 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              
              return (
                <div key={qr.id} style={{ marginBottom: 8, opacity: opacity * (isGhosted ? 0.5 : 1) }}>
                  <QueueBadge
                    label={qr.label}
                    tokens={qr.tokens}
                    isGhosted={isGhosted}
                  />
                </div>
              );
            })}

            {/* Preserve cache message */}
            {frame >= PRESERVE_START && frame < TRIGGER_START && (
              <div
                style={{
                  marginTop: 12,
                  fontFamily: FONT_FAMILY,
                  fontSize: 10,
                  color: COLORS.contextGreen,
                  background: "rgba(63,185,80,0.1)",
                  padding: "8px 12px",
                  borderRadius: 6,
                }}
              >
                Preserving cache efficiency
              </div>
            )}

            {/* Trigger message */}
            {frame >= TRIGGER_START && (
              <div
                style={{
                  marginTop: 12,
                  fontFamily: FONT_FAMILY,
                  fontSize: 10,
                  color: COLORS.contextGreen,
                  background: "rgba(63,185,80,0.1)",
                  padding: "8px 12px",
                  borderRadius: 6,
                }}
              >
                ✓ Applied on cache expiry
              </div>
            )}
          </div>
        </div>
      )}

      {/* Caption */}
      {frame >= HOLD_START && (
        <SceneCaption
          text={captionText}
          frame={frame - HOLD_START}
          duration={50}
        />
      )}
    </AbsoluteFill>
  );
};