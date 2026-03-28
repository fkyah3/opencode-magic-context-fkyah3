import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_6_START, 
  SCENE_6_END, 
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
  StatusChip,
} from '../components';

// Scene 6: Healthy-context payoff (1350-1559 frames, 7 seconds)
// Shows context pressure dropping to healthy level, main agent never paused

const MAIN_AGENT_STATUSES = [
  'Finalizing patch',
  'Running full suite',
  'Creating clean diff',
  'All tests passing',
  'Ready to commit',
];

export const Scene6HealthyContext: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_6_START;
  
  // Main agent status
  const statusIndex = Math.floor(relativeFrame / 42) % MAIN_AGENT_STATUSES.length;
  
  // Context drops from 91% to 54% (frames 0-70)
  const contextPercent = interpolate(relativeFrame, 0, 70, 91, 54, EASINGS.smooth);
  
  // Success indicators appear
  const successOpacity = interpolate(relativeFrame, 50, 100, 0, 1, EASINGS.smooth);
  
  // Caption visibility
  const captionOpacity = interpolate(relativeFrame, 140, 180, 0, 1, EASINGS.smooth);
  
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
      
      {/* Success glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)`,
          opacity: successOpacity,
          pointerEvents: 'none',
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
          accentColor={COLORS.success}
        />
        
        {/* Top-right: Context Meter */}
        <div style={{ position: 'relative' }}>
          <ContextMeter
            percentage={contextPercent}
            frame={relativeFrame}
            isWarning={false}
          />
          
          {/* Success badge */}
          <div
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              background: COLORS.success,
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              opacity: successOpacity,
              transform: `scale(${successOpacity})`,
              boxShadow: `0 0 20px ${COLORS.success}`,
            }}
          >
            ✓
          </div>
        </div>
        
        {/* Second row: Status chips */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, justifyContent: 'center' }}>
          <StatusChip label="Tests passing 18/18" isActive={true} accentColor={COLORS.success} />
          <StatusChip label="Build successful" isActive={true} accentColor={COLORS.success} />
          <StatusChip label="Types valid" isActive={true} accentColor={COLORS.success} />
          <StatusChip label="Flow maintained" isActive={true} accentColor={COLORS.success} />
        </div>
        
        {/* Third row: Rail and outputs */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: LAYOUT.gap }}>
          {/* Left: Conversation Rail */}
          <div style={{ flex: 1 }}>
            <ConversationRail
              messages={[
                { id: '#029', content: 'Recent work continues', type: 'log' },
                { id: '#030', content: 'No interruption occurred', type: 'decision' },
                { id: '#031', content: 'Context healthy', type: 'thought' },
                { id: '#032', content: 'Agent in flow', type: 'tool' },
              ]}
              style={{ height: 180 }}
            />
          </div>
          
          {/* Right: Structured outputs summary */}
          <div
            style={{
              width: 400,
              background: COLORS.bgPanel,
              border: `1px solid ${COLORS.border}`,
              borderRadius: LAYOUT.borderRadius,
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
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
              Context System Status
            </div>
            
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <CompartmentCard
                title="3 Compartments"
                tags={['compressed']}
                density="high"
              />
              <FactChip content="6 Facts extracted" isPromoted={true} />
              <MemoryCard
                title="4 Memory entries"
                description="Durable knowledge preserved"
              />
            </div>
            
            <div
              style={{
                marginTop: 'auto',
                padding: '12px 16px',
                background: 'rgba(34, 197, 94, 0.1)',
                border: `1px solid ${COLORS.success}`,
                borderRadius: LAYOUT.borderRadiusSm,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.success,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                ✓ System operating optimally
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="The main agent never stopped. Flow stayed intact."
          isVisible={true}
        />
      </div>
    </div>
  );
};
