import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_5_START, 
  SCENE_5_END, 
  COLORS, 
  LAYOUT, 
  TYPOGRAPHY, 
  interpolate,
  EASINGS 
} from '../constants';
import { 
  AgentCard, 
  ContextMeter, 
  ConversationRail, 
  HistorianPanel, 
  CompartmentCard,
  FactChip,
  MemoryCard,
  Caption,
} from '../components';

// Scene 5: Historian outputs - compartments, facts, memory (960-1349 frames, 13 seconds)
// Shows that Historian creates structured outputs, not just one summary

const MAIN_AGENT_STATUSES = [
  'Finalizing patch',
  'Running full suite',
  'Creating clean diff',
  'Reviewing changes',
  'Preparing commit',
];

const COMPARTMENTS = [
  { title: 'Compartment A — Auth debugging', tags: ['token', 'session', 'middleware'], density: 'high' as const },
  { title: 'Compartment B — Cache decision trail', tags: ['redis', 'invalidation'], density: 'medium' as const },
  { title: 'Compartment C — Test repair session', tags: ['integration', 'fixtures'], density: 'medium' as const },
];

const FACTS = [
  'Uses Redis for cache',
  'Retry behavior must remain',
  'Auth bug caused by stale token branch',
  'Integration tests updated',
  'Preserve timeout backoff',
  'Session store uses JWT',
];

const MEMORY_ENTRIES = [
  { title: 'Project constraint: preserve retry semantics', description: 'Critical for API stability' },
  { title: 'Architecture decision: Redis-backed session cache', description: 'Chosen for performance' },
  { title: 'Naming pattern: auth/session/token split', description: 'Consistent across codebase' },
  { title: 'Preference: keep integration tests explicit', description: 'Avoid over-mocking' },
];

export const Scene5HistorianOutputs: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_5_START;
  
  // Main agent status
  const statusIndex = Math.floor(relativeFrame / 78) % MAIN_AGENT_STATUSES.length;
  
  // Context stays healthy
  const contextPercent = 58 + Math.sin(relativeFrame / 60) * 5;
  
  // Compartments appear (frames 0-70)
  const compartmentsVisible = Math.min(
    COMPARTMENTS.length,
    Math.floor(relativeFrame / 25) + 1
  );
  
  // Facts appear (frames 71-170)
  const factsVisible = relativeFrame > 71 
    ? Math.min(FACTS.length, Math.floor((relativeFrame - 71) / 20) + 1)
    : 0;
  
  // Memory entries appear (frames 171-275)
  const memoryVisible = relativeFrame > 171
    ? Math.min(MEMORY_ENTRIES.length, Math.floor((relativeFrame - 171) / 26) + 1)
    : 0;
  
  // Caption visibility
  const captionOpacity = interpolate(relativeFrame, 300, 349, 0, 1, EASINGS.smooth);
  
  return (
    <div
      style={{
        width: LAYOUT.width,
        height: LAYOUT.height,
        background: COLORS.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5,
        }}
      />
      
      {/* Main content */}
      <div
        style={{
          padding: LAYOUT.margin,
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto auto 1fr',
          gap: LAYOUT.gap,
        }}
      >
        {/* Top-left: Main Agent */}
        <AgentCard
          title="Main Agent"
          subtitle="Coding Agent"
          status={MAIN_AGENT_STATUSES[statusIndex]}
          isActive={true}
          accentColor={COLORS.magicContext.primary}
        />
        
        {/* Top-right: Context Meter */}
        <ContextMeter
          percentage={contextPercent}
          frame={relativeFrame}
          isWarning={false}
        />
        
        {/* Second row: Conversation Rail */}
        <div style={{ gridColumn: '1 / -1' }}>
          <ConversationRail
            messages={[
              { id: '#025', content: 'Recent activity continues', type: 'log' },
              { id: '#026', content: 'New messages arriving', type: 'tool' },
              { id: '#027', content: 'Agent still working', type: 'decision' },
              { id: '#028', content: 'Flow maintained', type: 'thought' },
            ]}
            style={{ height: 140 }}
          />
        </div>
        
        {/* Bottom-left: Historian Panel */}
        <HistorianPanel
          status="Processing complete"
          isActive={false}
        />
        
        {/* Bottom-right: Structured Outputs */}
        <div
          style={{
            background: COLORS.bgPanel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Structured Outputs
          </div>
          
          {/* Compartments section */}
          <div>
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.historian.primary,
                marginBottom: 8,
                fontWeight: TYPOGRAPHY.weights.medium,
              }}
            >
              📦 Compartments
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {COMPARTMENTS.slice(0, compartmentsVisible).map((comp, i) => (
                <CompartmentCard
                  key={comp.title}
                  title={comp.title}
                  tags={comp.tags}
                  density={comp.density}
                  style={{
                    opacity: interpolate(relativeFrame - i * 25, 0, 20, 0, 1, EASINGS.smooth),
                    transform: `translateY(${interpolate(relativeFrame - i * 25, 0, 20, 20, 0, EASINGS.smooth)}px)`,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Facts section */}
          <div>
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.info,
                marginBottom: 8,
                fontWeight: TYPOGRAPHY.weights.medium,
              }}
            >
              💡 Session Facts
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {FACTS.slice(0, factsVisible).map((fact, i) => (
                <FactChip
                  key={fact}
                  content={fact}
                  style={{
                    opacity: relativeFrame > 71 + i * 20 
                      ? interpolate(relativeFrame - (71 + i * 20), 0, 15, 0, 1, EASINGS.smooth)
                      : 0,
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Memory section */}
          <div>
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.success,
                marginBottom: 8,
                fontWeight: TYPOGRAPHY.weights.medium,
              }}
            >
              🔒 Memory
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {MEMORY_ENTRIES.slice(0, memoryVisible).map((mem, i) => (
                <MemoryCard
                  key={mem.title}
                  title={mem.title}
                  description={mem.description}
                  style={{
                    opacity: relativeFrame > 171 + i * 26
                      ? interpolate(relativeFrame - (171 + i * 26), 0, 20, 0, 1, EASINGS.smooth)
                      : 0,
                    transform: `scale(${relativeFrame > 171 + i * 26
                      ? interpolate(relativeFrame - (171 + i * 26), 0, 20, 0.9, 1, EASINGS.smooth)
                      : 0.9})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="Old history becomes structured context: compartments, facts, and memory."
          isVisible={true}
        />
      </div>
    </div>
  );
};
