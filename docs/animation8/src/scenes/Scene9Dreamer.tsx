import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, MEMORY_ENTRIES, SCENE_CAPTIONS } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  MemoryCard,
  FactChip,
  Caption 
} from '../components';

// Scene 9: Dreamer (frames 2100-2369)
// Duration: 270 frames / 9.0s
// Off-session / overnight maintenance

export const Scene9Dreamer: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_9_START;
  
  // Night mode transition
  const nightModeOpacity = interpolate(
    sceneFrame,
    [0, 60],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Dreamer activation
  const dreamerActive = sceneFrame > 60;
  
  // Maintenance tasks cycling
  const maintenanceTasks = [
    'Consolidating memory',
    'Verifying retained facts',
    'Archiving stale knowledge',
    'Improving summaries',
  ];
  const currentTask = maintenanceTasks[Math.floor((sceneFrame - 60) / 50) % maintenanceTasks.length];
  
  // Memory consolidation animation
  const consolidationProgress = interpolate(
    sceneFrame,
    [100, 200],
    [0, 1],
    {
      easing: Easing.inOut(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
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
      {/* Base background */}
      <BackgroundGrid />
      
      {/* Night mode overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${COLORS.dreamer.tertiary}80 0%, ${COLORS.background} 100%)`,
          opacity: nightModeOpacity,
          pointerEvents: 'none',
        }}
      />
      
      {/* Stars/particles effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: nightModeOpacity * 0.5,
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, ${COLORS.dreamer.primary}, transparent),
                           radial-gradient(2px 2px at 40px 70px, ${COLORS.dreamer.secondary}, transparent),
                           radial-gradient(1px 1px at 90px 40px, ${COLORS.text.secondary}, transparent),
                           radial-gradient(2px 2px at 160px 120px, ${COLORS.dreamer.primary}, transparent),
                           radial-gradient(1px 1px at 230px 80px, ${COLORS.dreamer.secondary}, transparent),
                           radial-gradient(2px 2px at 300px 150px, ${COLORS.text.secondary}, transparent)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '350px 200px',
        }}
      />
      
      {/* Main content */}
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
        {/* Header: Dreamer title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            opacity: nightModeOpacity,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes['4xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.dreamer.primary,
              textShadow: `0 0 40px ${COLORS.dreamer.glow}`,
            }}
          >
            Dreamer
          </span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.lg,
              color: COLORS.dreamer.secondary,
            }}
          >
            Off-session maintenance
          </span>
        </div>
        
        {/* Center: Maintenance visualization */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          {/* Dreamer agent card */}
          {dreamerActive && (
            <AgentCard
              title="Dreamer"
              subtitle={currentTask}
              status="background"
              variant="dreamer"
              style={{
                opacity: interpolate(
                  sceneFrame,
                  [60, 100],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            />
          )}
          
          {/* Memory structures being maintained */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
              opacity: consolidationProgress,
            }}
          >
            {/* Before consolidation */}
            {sceneFrame < 200 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  opacity: 1 - consolidationProgress,
                }}
              >
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.text.muted,
                  }}
                >
                  Before
                </span>
                <MemoryCard content="Redis cache config (duplicate)" />
                <MemoryCard content="Auth retry logic (outdated)" />
                <MemoryCard content="Session timeout (stale)" />
              </div>
            )}
            
            {/* Consolidation arrow */}
            {sceneFrame > 150 && sceneFrame < 220 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '24px',
                }}
              >
                <svg
                  width="60"
                  height="24"
                  viewBox="0 0 60 24"
                >
                  <path
                    d="M0 12h50M40 6l10 6-10 6"
                    fill="none"
                    stroke={COLORS.dreamer.primary}
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
            
            {/* After consolidation */}
            {sceneFrame > 180 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  opacity: consolidationProgress,
                }}
              >
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.dreamer.primary,
                  }}
                >
                  After
                </span>
                <MemoryCard content="Redis-backed session cache (verified)" />
                <MemoryCard content="Auth retry semantics (current)" />
              </div>
            )}
          </div>
          
          {/* Maintenance stats */}
          {sceneFrame > 220 && (
            <div
              style={{
                display: 'flex',
                gap: '32px',
                padding: '16px 32px',
                backgroundColor: `${COLORS.dreamer.primary}15`,
                borderRadius: '12px',
                border: `1px solid ${COLORS.dreamer.primary}30`,
                opacity: interpolate(
                  sceneFrame,
                  [220, 240],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes['2xl'],
                    color: COLORS.dreamer.primary,
                    fontWeight: TYPOGRAPHY.weights.bold,
                  }}
                >
                  12
                </span>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.text.tertiary,
                    display: 'block',
                  }}
                >
                  Facts verified
                </span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes['2xl'],
                    color: COLORS.dreamer.primary,
                    fontWeight: TYPOGRAPHY.weights.bold,
                  }}
                >
                  4
                </span>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.text.tertiary,
                    display: 'block',
                  }}
                >
                  Duplicates merged
                </span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes['2xl'],
                    color: COLORS.dreamer.primary,
                    fontWeight: TYPOGRAPHY.weights.bold,
                  }}
                >
                  3
                </span>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.text.tertiary,
                    display: 'block',
                  }}
                >
                  Stale items archived
                </span>
              </div>
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
        <Caption text={SCENE_CAPTIONS.scene9} />
      </div>
    </AbsoluteFill>
  );
};
