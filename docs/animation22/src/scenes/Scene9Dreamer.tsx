import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, DEFAULT_CONTEXT_STATS, RawMessage } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { DreamerPanel } from "../components/SceneCaption";
import { SceneCaption } from "../components/SceneCaption";

// Scene 9: Dreamer (frames 2100-2369, 9s)
// Off-session / overnight maintenance for the knowledge layer

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

export const Scene9Dreamer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const TRANSITION_START = 0;
  const TRANSITION_END = 60; // frames 0-60: Transition to dormant mode
  const DREAMER_START = 61;
  const DREAMER_END = 145; // frames 61-145: Dreamer activates
  const EFFECTS_START = 146;
  const EFFECTS_END = 225; // frames 146-225: Show effects
  const HOLD_START = 226;
  const HOLD_END = 270; // frames 226-270: Hold clean state

  // Session position (dormant, dimmed)
  const sessionX = (1920 - SESSION_WIDTH) / 2;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Session opacity (dims during dormant mode)
  const sessionOpacity = interpolate(
    frame,
    [TRANSITION_START, TRANSITION_END],
    [1, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Stats (dormant session)
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage: 42,
    totalTokens: 84000,
    cacheTokens: 8000,
    assistantMessages: 30,
    userMessages: 22,
    rawMessages: 20,
  };

  const rawMessages = generateRawMessages(20);

  // Dreamer status
  const dreamerStatus = frame < DREAMER_START + 30 
    ? 'consolidating' 
    : frame < DREAMER_START + 80 
    ? 'verifying' 
    : frame < EFFECTS_END 
    ? 'archiving' 
    : 'complete';

  // Caption
  const captionText = "Dreamer keeps the knowledge layer healthy between active sessions.";

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Dormant session (dimmed) */}
      <div
        style={{
          position: "absolute",
          left: sessionX,
          top: sessionY,
          opacity: sessionOpacity,
        }}
      >
        <SessionShell sessionName="ATHENA" showInputBar={false}>
          <TranscriptPane
            entries={[
              { id: 'u1', type: 'user', content: 'Continue with the auth refactor' },
              { id: 'a1', type: 'assistant', content: 'I\'ll continue from where we left off.' },
            ]}
            visibleEntries={2}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={8}
          />
        </SessionShell>
      </div>

      {/* Memory/Facts artifacts (remain visible) */}
      {frame >= TRANSITION_END && (
        <div
          style={{
            position: "absolute",
            right: sessionX + 50,
            top: sessionY + 50,
            opacity: interpolate(frame, [TRANSITION_END, TRANSITION_END + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.panelBorder}`,
              borderRadius: 12,
              padding: "14px 18px",
              width: 280,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.textPrimary,
                marginBottom: 12,
              }}
            >
              Knowledge Artifacts
            </div>
            
            {/* Memory entries */}
            {[
              { type: "Agent constraint", content: "Prevent self-recursion for athena-junior" },
              { type: "Delegation policy", content: "Category-based alternative for agent spawning" },
              { type: "Architecture note", content: "Guard at subagent resolver layer" },
            ].map((mem, i) => (
              <div
                key={i}
                style={{
                  background: COLORS.memoryBg,
                  border: `1px solid ${COLORS.memoryAccent}40`,
                  borderRadius: 6,
                  padding: "8px 12px",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 10,
                    color: COLORS.memoryAccent,
                    marginBottom: 4,
                  }}
                >
                  {mem.type}
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 11,
                    color: COLORS.textPrimary,
                  }}
                >
                  {mem.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dreamer panel */}
      {frame >= DREAMER_START && (
        <div
          style={{
            position: "absolute",
            left: sessionX - 340,
            top: sessionY + 100,
            opacity: interpolate(frame, [DREAMER_START, DREAMER_START + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <DreamerPanel status={dreamerStatus} />
        </div>
      )}

      {/* Caption */}
      {frame >= HOLD_START && (
        <SceneCaption
          text={captionText}
          frame={frame - HOLD_START}
          duration={45}
        />
      )}
    </AbsoluteFill>
  );
};