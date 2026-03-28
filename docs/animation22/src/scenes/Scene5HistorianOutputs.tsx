import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT, DEFAULT_CONTEXT_STATS, RawMessage, SAMPLE_COMPARTMENTS, SAMPLE_FACTS, SAMPLE_MEMORIES } from "../constants";
import { SessionShell } from "../components/SessionShell";
import { TranscriptPane } from "../components/TranscriptPane";
import { ContextInspector } from "../components/ContextInspector";
import { HistorianPanel } from "../components/HistorianPanel";
import { CompartmentCard } from "../components/CompartmentCard";
import { FactChip, MemoryCard } from "../components/FactChip";
import { SceneCaption } from "../components/SceneCaption";

// Scene 5: Historian outputs - compartments, facts, memory (frames 960-1349, 13s)
// Shows structured outputs from Historian

const generateRawMessages = (count: number): RawMessage[] => {
  const roles: ('user' | 'assistant' | 'system' | 'tool')[] = ['user', 'assistant', 'system', 'tool'];
  const previews = ["User request...", "Assistant response...", "Tool call", "System prompt"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `rm-${i}`,
    role: roles[i % roles.length],
    tokens: Math.floor(Math.random() * 400) + 100,
    preview: previews[i % previews.length],
  }));
};

const SCENE5_TRANSCRIPT = [
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
];

export const Scene5HistorianOutputs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame ranges
  const COMPARTMENT_START = 0;
  const COMPARTMENT_END = 70; // frames 0-70: Compartments appear
  const FACTS_START = 71;
  const FACTS_END = 170; // frames 71-170: Facts peel off
  const MEMORY_START = 171;
  const MEMORY_END = 275; // frames 171-275: Memory promotion
  const HOLD_START = 276;
  const HOLD_END = 390; // frames 276-390: Hold all outputs

  // Session position (shifted left to make room for outputs)
  const sessionX = 60;
  const sessionY = (1080 - SESSION_HEIGHT) / 2;

  // Session scale (slightly smaller)
  const sessionScale = 0.85;

  // Visible entries
  const visibleEntries = 10;

  // Usage drops as compartments form
  const usage = interpolate(
    frame,
    [0, COMPARTMENT_END, FACTS_END, MEMORY_END],
    [88, 72, 65, 58],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Total tokens
  const totalTokens = Math.round(interpolate(
    frame,
    [0, COMPARTMENT_END, FACTS_END, MEMORY_END],
    [176000, 144000, 130000, 116000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Raw messages decrease
  const rawMessageCount = Math.floor(interpolate(
    frame,
    [0, COMPARTMENT_END, FACTS_END, MEMORY_END],
    [75, 45, 35, 28],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ));

  // Stats
  const stats = {
    ...DEFAULT_CONTEXT_STATS,
    usage,
    totalTokens,
    assistantMessages: 20,
    userMessages: 12,
    rawMessages: rawMessageCount,
  };

  const rawMessages = generateRawMessages(rawMessageCount);

  // Outputs panel position
  const outputsX = sessionX + SESSION_WIDTH * sessionScale + 40;
  const outputsY = sessionY;

  // Compartment cards
  const compartments = SAMPLE_COMPARTMENTS;

  // Facts
  const facts = SAMPLE_FACTS;

  // Memories
  const memories = SAMPLE_MEMORIES;

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
            entries={SCENE5_TRANSCRIPT}
            visibleEntries={visibleEntries}
          />
          <ContextInspector
            stats={stats}
            rawMessages={rawMessages}
            visibleRawMessages={12}
          />
        </SessionShell>
      </div>

      {/* Outputs panel */}
      <div
        style={{
          position: "absolute",
          left: outputsX,
          top: outputsY,
          width: 380,
        }}
      >
        {/* Compartments */}
        {frame >= COMPARTMENT_START && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.compartmentAccent,
                marginBottom: 12,
                opacity: interpolate(frame, [COMPARTMENT_START, COMPARTMENT_START + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              Compartments
            </div>
            {compartments.map((comp, i) => {
              const enterProgress = interpolate(
                frame,
                [COMPARTMENT_START + i * 15, COMPARTMENT_START + i * 15 + 30],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <CompartmentCard
                  key={comp.id}
                  compartment={comp}
                  enterProgress={enterProgress}
                />
              );
            })}
          </div>
        )}

        {/* Facts */}
        {frame >= FACTS_START && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.factAccent,
                marginBottom: 12,
                opacity: interpolate(frame, [FACTS_START, FACTS_START + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              Session Facts
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {facts.map((fact, i) => {
                const enterProgress = interpolate(
                  frame,
                  [FACTS_START + i * 12, FACTS_START + i * 12 + 25],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <FactChip
                    key={fact.id}
                    fact={fact}
                    enterProgress={enterProgress}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Memory */}
        {frame >= MEMORY_START && (
          <div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.memoryAccent,
                marginBottom: 12,
                opacity: interpolate(frame, [MEMORY_START, MEMORY_START + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            >
              Memory
            </div>
            {memories.map((mem, i) => {
              const enterProgress = interpolate(
                frame,
                [MEMORY_START + i * 20, MEMORY_START + i * 20 + 30],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <MemoryCard
                  key={mem.id}
                  type={mem.type}
                  content={mem.content}
                  enterProgress={enterProgress}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Caption */}
      {frame >= HOLD_START && (
        <SceneCaption
          text="Old session weight becomes structured context: compartments, facts, and memory."
          frame={frame - HOLD_START}
          duration={80}
        />
      )}
    </AbsoluteFill>
  );
};