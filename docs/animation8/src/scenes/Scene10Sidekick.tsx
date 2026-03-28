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

// Scene 10: Sidekick (frames 2370-2579)
// Duration: 210 frames / 7.0s
// New session warm-start

export const Scene10Sidekick: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_10_START;
  
  // New session transition
  const sessionOpacity = interpolate(
    sceneFrame,
    [0, 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Sidekick activation
  const sidekickActive = sceneFrame > 60;
  
  // Context loading animation
  const loadingProgress = interpolate(
    sceneFrame,
    [60, 150],
    [0, 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Main agent warm-start
  const mainAgentActive = sceneFrame > 150;
  
  // Caption opacity
  const captionOpacity = interpolate(
    sceneFrame,
    [100, 140, 190, 210],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '48px',
          gap: '32px',
          opacity: sessionOpacity,
        }}
      >
        {/* Header: New session */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes['4xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.sidekick.primary,
              textShadow: `0 0 40px ${COLORS.sidekick.glow}`,
            }}
          >
            Sidekick
          </span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.lg,
              color: COLORS.sidekick.secondary,
            }}
          >
            Warm-start for new sessions
          </span>
        </div>
        
        {/* Center: Session start visualization */}
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
          {/* User prompt */}
          <div
            style={{
              padding: '20px 32px',
              backgroundColor: COLORS.card,
              borderRadius: '12px',
              border: `1px solid ${COLORS.borderLight}`,
              maxWidth: 600,
              opacity: interpolate(
                sceneFrame,
                [0, 30],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.lg,
                color: COLORS.text.primary,
              }}
            >
              "Continue the auth refactor and preserve the retry behavior."
            </span>
          </div>
          
          {/* Sidekick loading context */}
          {sidekickActive && !mainAgentActive && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <AgentCard
                title="Sidekick"
                subtitle="Loading prior context..."
                status="background"
                variant="sidekick"
              />
              
              {/* Loading progress */}
              <div
                style={{
                  width: 300,
                  height: 4,
                  backgroundColor: COLORS.backgroundTertiary,
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${loadingProgress}%`,
                    height: '100%',
                    backgroundColor: COLORS.sidekick.primary,
                    borderRadius: '2px',
                    transition: 'width 0.1s linear',
                    boxShadow: `0 0 8px ${COLORS.sidekick.primary}`,
                  }}
                />
              </div>
              
              {/* Loading steps */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                {sceneFrame > 80 && (
                  <span
                    style={{
                      fontFamily: TYPOGRAPHY.fontFamilyMono,
                      fontSize: TYPOGRAPHY.sizes.sm,
                      color: COLORS.sidekick.primary,
                    }}
                  >
                    ✓ Relevant memory found
                  </span>
                )}
                {sceneFrame > 100 && (
                  <span
                    style={{
                      fontFamily: TYPOGRAPHY.fontFamilyMono,
                      fontSize: TYPOGRAPHY.sizes.sm,
                      color: COLORS.sidekick.primary,
                    }}
                  >
                    ✓ Constraint restored
                  </span>
                )}
                {sceneFrame > 120 && (
                  <span
                    style={{
                      fontFamily: TYPOGRAPHY.fontFamilyMono,
                      fontSize: TYPOGRAPHY.sizes.sm,
                      color: COLORS.sidekick.primary,
                    }}
                  >
                    ✓ Previous decisions loaded
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Briefing card */}
          {sceneFrame > 100 && sceneFrame < 200 && (
            <div
              style={{
                padding: '24px',
                backgroundColor: `${COLORS.sidekick.primary}10`,
                borderRadius: '12px',
                border: `1px solid ${COLORS.sidekick.primary}40`,
                maxWidth: 500,
                opacity: interpolate(
                  sceneFrame,
                  [100, 130],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  fontWeight: TYPOGRAPHY.weights.semibold,
                  color: COLORS.sidekick.primary,
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                Briefing assembled
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FactChip text="Retry behavior must be preserved" isPromoted={true} />
                <FactChip text="Auth uses Redis-backed session cache" isPromoted={true} />
                <FactChip text="Previous refactor in progress" isPromoted={true} />
              </div>
            </div>
          )}
          
          {/* Main agent warm-started */}
          {mainAgentActive && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                opacity: interpolate(
                  sceneFrame,
                  [150, 180],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              <AgentCard
                title="Main Agent"
                subtitle="Continuing with loaded context"
                status="active"
                variant="main"
              />
              
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  backgroundColor: `${COLORS.success}15`,
                  borderRadius: '8px',
                  border: `1px solid ${COLORS.success}40`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.success}
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.base,
                    color: COLORS.success,
                    fontWeight: TYPOGRAPHY.weights.medium,
                  }}
                >
                  Warm-start complete — no context rebuilding needed
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
        <Caption text={SCENE_CAPTIONS.scene10} />
      </div>
    </AbsoluteFill>
  );
};
