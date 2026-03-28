import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_7_START, 
  SCENE_7_END, 
  COLORS, 
  LAYOUT, 
  TYPOGRAPHY, 
  interpolate,
  EASINGS 
} from '../constants';
import { 
  AgentCard, 
  ContextMeter, 
  CompartmentCard,
  Caption,
} from '../components';

// Scene 7: Long-session compression - older compartments merge (1560-1829 frames, 9 seconds)
// Shows that long-running sessions can compress further by merging older compartments

const MAIN_AGENT_STATUSES = [
  'Continuing work',
  'Adding features',
  'Refactoring modules',
  'Long session active',
];

const INITIAL_COMPARTMENTS = [
  { title: 'Auth debugging', tags: ['v1'], density: 'high' as const },
  { title: 'Cache fixes', tags: ['v1'], density: 'medium' as const },
  { title: 'Refactor notes', tags: ['v1'], density: 'medium' as const },
  { title: 'Test stabilization', tags: ['v1'], density: 'high' as const },
];

export const Scene7LongSessionCompression: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_7_START;
  
  // Main agent status
  const statusIndex = Math.floor(relativeFrame / 67) % MAIN_AGENT_STATUSES.length;
  
  // Context stays healthy
  const contextPercent = 52 + Math.sin(relativeFrame / 50) * 3;
  
  // History budget indicator appears (frames 80-140)
  const budgetIndicatorOpacity = interpolate(relativeFrame, 80, 140, 0, 1, EASINGS.smooth);
  
  // Merge animation (frames 140-240)
  const mergeProgress = interpolate(relativeFrame, 140, 240, 0, 1, EASINGS.smooth);
  const isMerging = relativeFrame >= 140 && relativeFrame < 240;
  const hasMerged = relativeFrame >= 240;
  
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
          display: 'flex',
          flexDirection: 'column',
          gap: LAYOUT.gap,
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AgentCard
            title="Main Agent"
            subtitle="Coding Agent"
            status={MAIN_AGENT_STATUSES[statusIndex]}
            isActive={true}
            accentColor={COLORS.magicContext.primary}
          />
          
          <ContextMeter
            percentage={contextPercent}
            frame={relativeFrame}
            isWarning={false}
          />
        </div>
        
        {/* History budget indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 20px',
            background: 'rgba(245, 158, 11, 0.1)',
            border: `1px solid rgba(245, 158, 11, 0.3)`,
            borderRadius: LAYOUT.borderRadius,
            opacity: budgetIndicatorOpacity,
            alignSelf: 'flex-start',
          }}
        >
          <span style={{ fontSize: 16 }}>📊</span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.warning,
              fontWeight: TYPOGRAPHY.weights.medium,
            }}
          >
            History budget nearing threshold
          </span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.textMuted,
            }}
          >
            Merging older compartments...
          </span>
        </div>
        
        {/* Compartments area */}
        <div
          style={{
            flex: 1,
            background: COLORS.bgElevated,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.base,
              color: COLORS.textSecondary,
              marginBottom: 8,
            }}
          >
            Historical Archive
          </div>
          
          {/* Before merge: individual compartments */}
          {!hasMerged && (
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {INITIAL_COMPARTMENTS.map((comp, i) => (
                <div
                  key={comp.title}
                  style={{
                    transform: isMerging 
                      ? `translateX(${mergeProgress * (150 - i * 40)}px) scale(${1 - mergeProgress * 0.2})`
                      : 'none',
                    opacity: isMerging ? 1 - mergeProgress * 0.7 : 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CompartmentCard
                    title={comp.title}
                    tags={comp.tags}
                    density={comp.density}
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Merge animation arrow */}
          {isMerging && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                opacity: mergeProgress,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  color: COLORS.dreamer.primary,
                  transform: `translateX(${mergeProgress * 20}px)`,
                }}
              >
                →
              </div>
            </div>
          )}
          
          {/* After merge: merged compartment */}
          {hasMerged && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 20,
              }}
            >
              <CompartmentCard
                title="Merged Historical Compartment"
                tags={['Auth', 'Cache', 'Refactor', 'Tests', 'compressed']}
                density="high"
                isMerged={true}
                style={{
                  transform: `scale(${interpolate(relativeFrame, 240, 270, 0.8, 1, EASINGS.smooth)})`,
                  opacity: interpolate(relativeFrame, 240, 270, 0, 1, EASINGS.smooth),
                }}
              />
            </div>
          )}
          
          {/* Space saved indicator */}
          {hasMerged && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '16px 24px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: `1px solid ${COLORS.dreamer.primary}`,
                borderRadius: LAYOUT.borderRadius,
                opacity: interpolate(relativeFrame, 260, 269, 0, 1, EASINGS.smooth),
              }}
            >
              <span style={{ fontSize: 20 }}>💾</span>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.base,
                  color: COLORS.dreamer.primary,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Space saved: 67% — Archive sustainable for long sessions
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="As sessions grow, older compartments can be merged again to save even more space."
          isVisible={true}
        />
      </div>
    </div>
  );
};
