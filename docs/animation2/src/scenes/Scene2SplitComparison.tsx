import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_2_START, 
  SCENE_2_END, 
  COLORS, 
  LAYOUT, 
  TYPOGRAPHY, 
  interpolate,
  EASINGS 
} from '../constants';
import { AgentCard, ContextMeter, Caption } from '../components';

// Scene 2: Split comparison bridge (210-329 frames, 4 seconds)
// Shows old way frozen vs Magic Context active side by side

export const Scene2SplitComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_2_START;
  
  // Split animation
  const splitProgress = interpolate(relativeFrame, 0, 35, 0, 1, EASINGS.smooth);
  
  // Left panel (Old Way) - frozen
  const leftPanelWidth = 50; // percentage
  
  // Right panel (Magic Context) - active
  const rightContextPercent = interpolate(relativeFrame, 36, 75, 72, 90, EASINGS.smooth);
  
  // Historian appearance
  const historianOpacity = interpolate(relativeFrame, 40, 75, 0, 1, EASINGS.smooth);
  
  // Caption visibility
  const captionOpacity = interpolate(relativeFrame, 80, 100, 0, 1, EASINGS.smooth);
  
  return (
    <div
      style={{
        width: LAYOUT.width,
        height: LAYOUT.height,
        background: COLORS.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
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
      
      {/* Left panel - Old Way (frozen) */}
      <div
        style={{
          width: `${leftPanelWidth}%`,
          height: '100%',
          padding: LAYOUT.margin,
          borderRight: `1px solid ${COLORS.border}`,
          opacity: 1 - splitProgress * 0.3,
          filter: `grayscale(${splitProgress * 0.5})`,
          display: 'flex',
          flexDirection: 'column',
          gap: LAYOUT.gap,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}
        >
          Old Way
        </div>
        
        <AgentCard
          title="Main Agent"
          subtitle="Coding Agent"
          status="Compacting history..."
          isActive={false}
          accentColor={COLORS.oldWay.secondary}
        />
        
        <ContextMeter
          percentage={100}
          frame={relativeFrame}
          isWarning={true}
        />
        
        {/* Frozen code area */}
        <div
          style={{
            flex: 1,
            background: COLORS.bgElevated,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: 24,
            opacity: 0.5,
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              color: COLORS.textMuted,
              textAlign: 'center',
              marginTop: 100,
            }}
          >
            ⏸ Session frozen
            <br />
            <span style={{ fontSize: 12 }}>Waiting for compaction...</span>
          </div>
        </div>
      </div>
      
      {/* Right panel - Magic Context (active) */}
      <div
        style={{
          width: `${100 - leftPanelWidth}%`,
          height: '100%',
          padding: LAYOUT.margin,
          display: 'flex',
          flexDirection: 'column',
          gap: LAYOUT.gap,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.magicContext.primary,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}
        >
          Magic Context
        </div>
        
        <AgentCard
          title="Main Agent"
          subtitle="Coding Agent"
          status="Reading project files"
          isActive={true}
          accentColor={COLORS.magicContext.primary}
        />
        
        <ContextMeter
          percentage={rightContextPercent}
          frame={relativeFrame}
          isWarning={rightContextPercent > 85}
        />
        
        {/* Active code area */}
        <div
          style={{
            flex: 1,
            background: COLORS.bgElevated,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['auth.ts', 'cache.ts'].map((file, i) => (
              <div
                key={file}
                style={{
                  padding: '8px 16px',
                  background: i === 0 ? COLORS.bgCard : COLORS.bgElevated,
                  border: `1px solid ${i === 0 ? COLORS.magicContext.primary : COLORS.border}`,
                  borderRadius: LAYOUT.borderRadiusSm,
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: i === 0 ? COLORS.textPrimary : COLORS.textSecondary,
                }}
              >
                {file}
              </div>
            ))}
          </div>
          
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              color: COLORS.textSecondary,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: COLORS.info }}>export const</span>
            <span style={{ color: COLORS.textPrimary }}> validateToken = </span>
            <span style={{ color: COLORS.info }}>async</span>
            <span style={{ color: COLORS.textPrimary }}> (token) =&gt; {'{'}</span>
            <br />
            <span style={{ color: COLORS.textPrimary, paddingLeft: 20 }}>
              // Active processing...
            </span>
            <span
              style={{
                display: 'inline-block',
                width: 2,
                height: 16,
                background: COLORS.magicContext.primary,
                marginLeft: 4,
                animation: 'blink 1s step-end infinite',
              }}
            />
          </div>
        </div>
        
        {/* Historian panel */}
        <div
          style={{
            opacity: historianOpacity,
            transform: `translateY(${(1 - historianOpacity) * 20}px)`,
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: `1px solid ${COLORS.historian.primary}`,
              borderRadius: LAYOUT.borderRadius,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: COLORS.historian.primary,
                boxShadow: `0 0 10px ${COLORS.historian.primary}`,
              }}
            />
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.sm,
                color: COLORS.historian.primary,
                fontWeight: TYPOGRAPHY.weights.medium,
              }}
            >
              Historian (background)
            </span>
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.textMuted,
              }}
            >
              Monitoring context pressure
            </span>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="Two approaches: one blocks, one flows."
          isVisible={true}
        />
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
