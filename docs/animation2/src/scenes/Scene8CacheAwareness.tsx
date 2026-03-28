import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_8_START, 
  SCENE_8_END, 
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
  QueueBadge,
  Caption,
  MessageCard,
} from '../components';

// Scene 8: Cache awareness (1830-2099 frames, 9 seconds)
// Shows that reductions are queued first, then applied when timing makes sense

const MAIN_AGENT_STATUSES = [
  'Processing requests',
  'Handling batch jobs',
  'Optimizing queries',
  'Cache operations',
];

const QUEUED_ITEMS = [
  { id: '#041–#052', label: 'Queued reduction', type: 'range' },
  { id: 'scratchpad', label: 'Queued reduction', type: 'scratchpad' },
  { id: 'trace', label: 'Queued reduction', type: 'trace' },
];

export const Scene8CacheAwareness: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_8_START;
  
  // Main agent status
  const statusIndex = Math.floor(relativeFrame / 67) % MAIN_AGENT_STATUSES.length;
  
  // Context stays healthy
  const contextPercent = 55 + Math.sin(relativeFrame / 50) * 3;
  
  // Phase 1: Queue reductions (frames 0-70)
  const queueProgress = interpolate(relativeFrame, 0, 70, 0, 1, EASINGS.smooth);
  const queuedVisible = Math.min(QUEUED_ITEMS.length, Math.floor(relativeFrame / 25) + 1);
  
  // Phase 2: Show cache preservation (frames 71-150)
  const cachePhase = relativeFrame > 71 && relativeFrame < 150;
  
  // Phase 3: Trigger condition (frames 151-220)
  const triggerProgress = interpolate(relativeFrame, 151, 220, 0, 1, EASINGS.smooth);
  const isTriggering = relativeFrame >= 151 && relativeFrame < 220;
  
  // Phase 4: Apply reductions (frames 221-269)
  const applyProgress = interpolate(relativeFrame, 221, 269, 0, 1, EASINGS.smooth);
  const isApplying = relativeFrame >= 221;
  
  // Caption visibility
  const captionOpacity = interpolate(relativeFrame, 220, 269, 0, 1, EASINGS.smooth);
  
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
          gridTemplateRows: 'auto 1fr auto',
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
        
        {/* Center: Queue and Cache visualization */}
        <div
          style={{
            gridColumn: '1 / -1',
            background: COLORS.bgElevated,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          {/* Queued reductions section */}
          <div>
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.warning,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>⏳</span>
              <span>Queued Reductions</span>
              {isApplying && (
                <span style={{ color: COLORS.success, marginLeft: 'auto' }}>
                  ✓ Applied
                </span>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {QUEUED_ITEMS.slice(0, queuedVisible).map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    opacity: isApplying 
                      ? interpolate(relativeFrame - 221 - i * 15, 0, 20, 1, 0.3, EASINGS.smooth)
                      : 1,
                    transform: isApplying
                      ? `translateY(${interpolate(relativeFrame - 221 - i * 15, 0, 20, 0, -10, EASINGS.smooth)}px)`
                      : 'none',
                  }}
                >
                  <QueueBadge
                    label={`${item.label}: ${item.id}`}
                    isQueued={!isApplying}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Cache preservation indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '20px 24px',
              background: cachePhase || isTriggering ? 'rgba(6, 182, 212, 0.1)' : COLORS.bgPanel,
              border: `1px solid ${cachePhase || isTriggering ? COLORS.magicContext.primary : COLORS.border}`,
              borderRadius: LAYOUT.borderRadius,
              opacity: relativeFrame > 71 ? 1 : 0.5,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: cachePhase || isTriggering ? 'rgba(6, 182, 212, 0.2)' : COLORS.bgElevated,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
              }}
            >
              🛡️
            </div>
            <div>
              <div
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: cachePhase || isTriggering ? COLORS.magicContext.primary : COLORS.textSecondary,
                  fontWeight: TYPOGRAPHY.weights.medium,
                  marginBottom: 4,
                }}
              >
                {cachePhase ? 'Preserving cache efficiency' : 
                 isTriggering ? 'Cache TTL expired — applying queued reductions' :
                 'Cache-aware processing active'}
              </div>
              <div
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  color: COLORS.textMuted,
                }}
              >
                {cachePhase ? 'Waiting for optimal apply point...' :
                 isTriggering ? 'Smart timing triggered' :
                 'Reductions queued for efficient application'}
              </div>
            </div>
            
            {/* Trigger indicator */}
            {isTriggering && (
              <div
                style={{
                  marginLeft: 'auto',
                  padding: '8px 16px',
                  background: 'rgba(6, 182, 212, 0.2)',
                  borderRadius: LAYOUT.borderRadiusSm,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              >
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.magicContext.primary,
                    fontWeight: TYPOGRAPHY.weights.medium,
                  }}
                >
                  Trigger: Cache TTL
                </span>
              </div>
            )}
          </div>
          
          {/* Result indicator */}
          {isApplying && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '16px 24px',
                background: 'rgba(34, 197, 94, 0.1)',
                border: `1px solid ${COLORS.success}`,
                borderRadius: LAYOUT.borderRadius,
                opacity: applyProgress,
              }}
            >
              <span style={{ fontSize: 20 }}>✓</span>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.base,
                  color: COLORS.success,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Cache respected — reductions applied efficiently
              </span>
            </div>
          )}
        </div>
        
        {/* Bottom: Mini rail showing preserved context */}
        <div style={{ gridColumn: '1 / -1' }}>
          <ConversationRail
            messages={[
              { id: '#033', content: 'Cache prefix preserved', type: 'decision' },
              { id: '#034', content: 'Queued items processed', type: 'log' },
              { id: '#035', content: 'Efficient reduction applied', type: 'tool' },
              { id: '#036', content: 'Context optimized', type: 'thought' },
            ]}
            style={{ height: 120 }}
          />
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="Cache-aware reductions: queue first, apply when timing actually makes sense."
          isVisible={true}
        />
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
