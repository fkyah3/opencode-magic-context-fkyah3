import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, SCENE_CAPTIONS } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  ContextMeter, 
  HistorianPanel,
  Caption 
} from '../components';

// Scene 11: Final payoff / end card (frames 2580-2729)
// Duration: 150 frames / 5.0s

export const Scene11FinalPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_11_START;
  
  // Hero elements fade in
  const heroOpacity = interpolate(
    sceneFrame,
    [0, 40],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Text lines appear sequentially
  const line1Opacity = interpolate(
    sceneFrame,
    [40, 60],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  const line2Opacity = interpolate(
    sceneFrame,
    [70, 90],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Logo appears at end
  const logoOpacity = interpolate(
    sceneFrame,
    [100, 120],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      {/* Hero glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${COLORS.magicContext.primary}15 0%, transparent 60%)`,
          opacity: heroOpacity,
        }}
      />
      
      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '48px',
          padding: '48px',
        }}
      >
        {/* Hero tableau - system overview */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            opacity: heroOpacity,
          }}
        >
          {/* Main Agent */}
          <AgentCard
            title="Main Agent"
            subtitle="In flow"
            status="active"
            variant="main"
          />
          
          {/* Context Meter */}
          <ContextMeter
            percentage={65}
            variant="magicContext"
          />
          
          {/* Historian */}
          <HistorianPanel
            status="complete"
            progress={100}
          />
        </div>
        
        {/* Final message lines */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes['5xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.text.primary,
              opacity: line1Opacity,
              textShadow: `0 0 60px ${COLORS.magicContext.glow}`,
            }}
          >
            Keep the main agent in flow.
          </span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes['5xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.magicContext.primary,
              opacity: line2Opacity,
              textShadow: `0 0 60px ${COLORS.magicContext.glow}`,
            }}
          >
            Let Magic Context handle the past.
          </span>
        </div>
        
        {/* Product logo/wordmark */}
        <div
          style={{
            marginTop: '48px',
            opacity: logoOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Logo icon */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${COLORS.magicContext.primary}, ${COLORS.magicContext.secondary})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 30px ${COLORS.magicContext.glow}`,
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={COLORS.background}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            
            {/* Wordmark */}
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes['3xl'],
                fontWeight: TYPOGRAPHY.weights.bold,
                color: COLORS.text.primary,
                letterSpacing: '-0.02em',
              }}
            >
              opencode-magic-context
            </span>
          </div>
          
          {/* Tagline */}
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.base,
              color: COLORS.text.secondary,
            }}
          >
            Async history compaction and memory for uninterrupted agents
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
