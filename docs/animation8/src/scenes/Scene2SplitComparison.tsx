import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, STATUS_MESSAGES } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  ContextMeter, 
  HistorianPanel,
  Caption 
} from '../components';

// Scene 2: Split comparison bridge (frames 210-329)
// Duration: 120 frames / 4.0s

export const Scene2SplitComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_2_START;
  
  // Split transition: 0 -> 1 over first 35 frames
  const splitProgress = interpolate(
    sceneFrame,
    [0, 35],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Right panel scale: starts at 0.8, grows to 1
  const rightPanelScale = interpolate(
    sceneFrame,
    [0, 35],
    [0.8, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Right panel opacity
  const rightPanelOpacity = interpolate(
    sceneFrame,
    [0, 20],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Historian appearance
  const historianOpacity = interpolate(
    sceneFrame,
    [36, 76],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Context meter for right panel (rising)
  const rightContextPercentage = interpolate(
    sceneFrame,
    [0, 120],
    [72, 90],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      {/* Split screen container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          padding: '40px',
          gap: `${20 + splitProgress * 20}px`,
        }}
      >
        {/* Left panel: Old Way (frozen) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            opacity: 1 - splitProgress * 0.3,
            transform: `scale(${1 - splitProgress * 0.05})`,
          }}
        >
          {/* Label */}
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.lg,
              fontWeight: TYPOGRAPHY.weights.semibold,
              color: COLORS.oldWay.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Old Way
          </span>
          
          {/* Frozen old way content */}
          <div
            style={{
              flex: 1,
              backgroundColor: `${COLORS.card}80`,
              borderRadius: '16px',
              border: `2px solid ${COLORS.oldWay.primary}40`,
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              opacity: 0.6,
            }}
          >
            <AgentCard
              title="Main Agent"
              subtitle="Compacting history..."
              status="blocked"
              variant="main"
            />
            
            <ContextMeter
              percentage={100}
              variant="oldWay"
            />
            
            {/* Frozen spinner */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: `3px solid ${COLORS.oldWay.primary}30`,
                  borderTopColor: COLORS.oldWay.primary,
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Right panel: Magic Context (active) */}
        <div
          style={{
            flex: 1 + splitProgress * 0.2,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            opacity: rightPanelOpacity,
            transform: `scale(${rightPanelScale})`,
          }}
        >
          {/* Label */}
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.lg,
              fontWeight: TYPOGRAPHY.weights.semibold,
              color: COLORS.magicContext.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Magic Context
          </span>
          
          {/* Active Magic Context content */}
          <div
            style={{
              flex: 1,
              backgroundColor: COLORS.card,
              borderRadius: '16px',
              border: `2px solid ${COLORS.magicContext.primary}`,
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxShadow: `0 0 40px ${COLORS.magicContext.glow}`,
            }}
          >
            <AgentCard
              title="Main Agent"
              subtitle={STATUS_MESSAGES.mainAgent.working[5]}
              status="active"
              variant="main"
            />
            
            <ContextMeter
              percentage={rightContextPercentage}
              variant="magicContext"
            />
            
            {/* Historian panel appears */}
            <div style={{ opacity: historianOpacity }}>
              <HistorianPanel
                status="monitoring"
              />
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AbsoluteFill>
  );
};
