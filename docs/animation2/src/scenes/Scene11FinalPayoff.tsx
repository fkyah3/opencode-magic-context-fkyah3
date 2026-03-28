import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_11_START, 
  SCENE_11_END, 
  COLORS, 
  LAYOUT, 
  TYPOGRAPHY, 
  interpolate,
  EASINGS 
} from '../constants';
import { 
  AgentCard,
  ContextMeter,
  HistorianPanel,
  CompartmentCard,
  MemoryCard,
} from '../components';

// Scene 11: Final payoff / end card (2580-2729 frames, 5 seconds)
// Clean hero tableau with final product message

export const Scene11FinalPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_11_START;
  
  // Assembly animation
  const assemblyProgress = interpolate(relativeFrame, 0, 60, 0, 1, EASINGS.smooth);
  
  // Text resolve
  const textProgress = interpolate(relativeFrame, 61, 100, 0, 1, EASINGS.smooth);
  
  // Logo appearance
  const logoProgress = interpolate(relativeFrame, 100, 140, 0, 1, EASINGS.smooth);
  
  return (
    <div
      style={{
        width: LAYOUT.width,
        height: LAYOUT.height,
        background: COLORS.bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Hero tableau */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 48,
          zIndex: 1,
        }}
      >
        {/* System visualization */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'center',
            opacity: assemblyProgress,
            transform: `scale(${interpolate(assemblyProgress, 0, 1, 0.9, 1, EASINGS.smooth)})`,
          }}
        >
          {/* Main Agent */}
          <div
            style={{
              opacity: interpolate(assemblyProgress, 0, 0.3, 0, 1, EASINGS.smooth),
            }}
          >
            <AgentCard
              title="Main Agent"
              subtitle="In Flow"
              status="Active coding"
              isActive={true}
              accentColor={COLORS.magicContext.primary}
              style={{ minWidth: 240 }}
            />
          </div>
          
          {/* Connection line */}
          <div
            style={{
              width: 60,
              height: 2,
              background: `linear-gradient(to right, ${COLORS.magicContext.primary}, ${COLORS.historian.primary})`,
              opacity: interpolate(assemblyProgress, 0.2, 0.5, 0, 1, EASINGS.smooth),
            }}
          />
          
          {/* Historian */}
          <div
            style={{
              opacity: interpolate(assemblyProgress, 0.3, 0.6, 0, 1, EASINGS.smooth),
            }}
          >
            <HistorianPanel
              status="Background support"
              isActive={true}
              style={{ minWidth: 240 }}
            />
          </div>
          
          {/* Connection line */}
          <div
            style={{
              width: 60,
              height: 2,
              background: `linear-gradient(to right, ${COLORS.historian.primary}, ${COLORS.success})`,
              opacity: interpolate(assemblyProgress, 0.5, 0.8, 0, 1, EASINGS.smooth),
            }}
          />
          
          {/* Memory */}
          <div
            style={{
              opacity: interpolate(assemblyProgress, 0.6, 1, 0, 1, EASINGS.smooth),
            }}
          >
            <MemoryCard
              title="Structured Memory"
              description="Durable knowledge layer"
              style={{ minWidth: 240 }}
            />
          </div>
        </div>
        
        {/* Final text */}
        <div
          style={{
            textAlign: 'center',
            opacity: textProgress,
            transform: `translateY(${interpolate(textProgress, 0, 1, 20, 0, EASINGS.smooth)}px)`,
          }}
        >
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes['4xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.textPrimary,
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Keep the main agent in flow.
          </div>
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes['2xl'],
              color: COLORS.magicContext.primary,
              fontWeight: TYPOGRAPHY.weights.medium,
              marginBottom: 24,
            }}
          >
            Let Magic Context handle the past.
          </div>
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.base,
              color: COLORS.textSecondary,
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            Background compaction. Structured memory. Better continuity for coding agents.
          </div>
        </div>
        
        {/* Product logo/wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: logoProgress,
            transform: `scale(${interpolate(logoProgress, 0, 1, 0.9, 1, EASINGS.smooth)})`,
            padding: '20px 40px',
            background: 'rgba(6, 182, 212, 0.1)',
            border: `1px solid ${COLORS.magicContext.primary}`,
            borderRadius: LAYOUT.borderRadius,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.magicContext.primary}, ${COLORS.historian.primary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              boxShadow: `0 0 30px ${COLORS.magicContext.glow}`,
            }}
          >
            ✨
          </div>
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xl,
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.textPrimary,
              letterSpacing: '-0.02em',
            }}
          >
            opencode-magic-context
          </div>
        </div>
      </div>
      
      {/* Corner hints */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          display: 'flex',
          gap: 24,
          opacity: assemblyProgress,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: COLORS.dreamer.primary,
            }}
          />
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.textMuted,
            }}
          >
            Dreamer
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: COLORS.sidekick.primary,
            }}
          />
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.textMuted,
            }}
          >
            Sidekick
          </span>
        </div>
      </div>
      
      {/* Version tag */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          opacity: logoProgress,
        }}
      >
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.textMuted,
          }}
        >
          Async history compaction for uninterrupted agents
        </span>
      </div>
    </div>
  );
};
