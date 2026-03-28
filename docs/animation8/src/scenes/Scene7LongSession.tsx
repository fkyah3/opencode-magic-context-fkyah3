import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, COMPARTMENT_LABELS, SCENE_CAPTIONS } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  ContextMeter, 
  CompartmentCard,
  Caption 
} from '../components';

// Scene 7: Long-session compression (frames 1560-1829)
// Duration: 270 frames / 9.0s

export const Scene7LongSession: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_7_START;
  
  // Context stays healthy even with long session
  const contextPercentage = interpolate(
    sceneFrame,
    [0, 270],
    [55, 62],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // History budget indicator
  const showBudgetWarning = sceneFrame > 80 && sceneFrame < 180;
  
  // Compartment merge animation
  // Frames 80-180: Show multiple compartments
  // Frames 180-240: Merge animation
  // Frames 240+: Show merged compartment
  const mergeProgress = interpolate(
    sceneFrame,
    [180, 240],
    [0, 1],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Main agent status
  const getMainAgentStatus = () => {
    if (sceneFrame < 100) return 'Long session active';
    if (sceneFrame < 200) return 'History budget managed';
    return 'Session sustainable';
  };
  
  // Caption opacity
  const captionOpacity = interpolate(
    sceneFrame,
    [80, 120, 250, 270],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      {/* Main layout */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '48px',
          gap: '32px',
        }}
      >
        {/* Top row: Agent and Context */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <AgentCard
            title="Main Agent"
            subtitle={getMainAgentStatus()}
            status="active"
            variant="main"
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
            <ContextMeter
              percentage={contextPercentage}
              variant="magicContext"
            />
            
            {/* History Budget indicator */}
            {showBudgetWarning && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: `${COLORS.warning}15`,
                  borderRadius: '8px',
                  border: `1px solid ${COLORS.warning}40`,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.warning}
                  strokeWidth="2"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.warning,
                  }}
                >
                  History budget: merging older compartments
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Center: Compartment archive visualization */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Archive lane label */}
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Historical Archive
          </span>
          
          {/* Compartments container */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              height: 120,
            }}
          >
            {/* Before merge: Multiple compartments */}
            {sceneFrame < 240 && (
              <>
                <div
                  style={{
                    transform: `translateX(${-mergeProgress * 100}px) scale(${1 - mergeProgress * 0.2})`,
                    opacity: 1 - mergeProgress,
                  }}
                >
                  <CompartmentCard
                    title="Auth debugging"
                    tags={['session']}
                    density="high"
                  />
                </div>
                <div
                  style={{
                    transform: `translateX(${-mergeProgress * 50}px) scale(${1 - mergeProgress * 0.2})`,
                    opacity: 1 - mergeProgress,
                  }}
                >
                  <CompartmentCard
                    title="Cache fixes"
                    tags={['redis']}
                    density="medium"
                  />
                </div>
                <div
                  style={{
                    transform: `scale(${1 - mergeProgress * 0.2})`,
                    opacity: 1 - mergeProgress,
                  }}
                >
                  <CompartmentCard
                    title="Refactor notes"
                    tags={['code']}
                    density="medium"
                  />
                </div>
                <div
                  style={{
                    transform: `translateX(${mergeProgress * 50}px) scale(${1 - mergeProgress * 0.2})`,
                    opacity: 1 - mergeProgress,
                  }}
                >
                  <CompartmentCard
                    title="Test stabilization"
                    tags={['tests']}
                    density="low"
                  />
                </div>
              </>
            )}
            
            {/* Merge arrow */}
            {sceneFrame >= 180 && sceneFrame < 240 && (
              <div
                style={{
                  position: 'absolute',
                  opacity: mergeProgress < 0.5 ? 1 : 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <svg
                  width="60"
                  height="40"
                  viewBox="0 0 60 40"
                >
                  <path
                    d="M10 20 Q30 5 50 20"
                    fill="none"
                    stroke={COLORS.historian.primary}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="8"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M10 20 Q30 35 50 20"
                    fill="none"
                    stroke={COLORS.historian.primary}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="8"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
            )}
            
            {/* After merge: Single merged compartment */}
            {sceneFrame >= 200 && (
              <div
                style={{
                  position: 'absolute',
                  opacity: mergeProgress,
                  transform: `scale(${0.8 + mergeProgress * 0.2})`,
                }}
              >
                <CompartmentCard
                  title="Merged Historical Archive"
                  tags={['auth', 'cache', 'tests', 'refactor']}
                  density="high"
                  isMerged={true}
                />
              </div>
            )}
          </div>
          
          {/* Space saved indicator */}
          {sceneFrame >= 240 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px 24px',
                backgroundColor: `${COLORS.magicContext.primary}15`,
                borderRadius: '8px',
                border: `1px solid ${COLORS.magicContext.primary}30`,
                alignSelf: 'center',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={COLORS.magicContext.primary}
                strokeWidth="2"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.base,
                  color: COLORS.magicContext.primary,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Space saved: 4 compartments → 1 archive
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: captionOpacity,
        }}
      >
        <Caption text={SCENE_CAPTIONS.scene7} />
      </div>
    </AbsoluteFill>
  );
};
