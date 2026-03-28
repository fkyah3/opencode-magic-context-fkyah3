import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_10_START, 
  SCENE_10_END, 
  COLORS, 
  LAYOUT, 
  TYPOGRAPHY, 
  interpolate,
  EASINGS 
} from '../constants';
import { 
  AgentCard,
  MemoryCard,
  FactChip,
  Caption,
} from '../components';

// Scene 10: Sidekick (2370-2579 frames, 7 seconds)
// Shows how a new session starts informed, with Sidekick retrieving context

const PROMPT_TEXT = 'Continue the auth refactor and preserve the retry behavior.';

const SIDECICK_STEPS = [
  { label: 'Scanning memory...', icon: '🔍' },
  { label: 'Relevant memory found', icon: '💡' },
  { label: 'Constraint restored', icon: '🔒' },
  { label: 'Previous decisions loaded', icon: '📚' },
];

const LOADED_MEMORY = [
  { title: 'Auth refactor in progress', description: 'Token validation pending' },
  { title: 'Retry behavior: preserve', description: 'Critical constraint' },
  { title: 'Architecture: Redis cache', description: 'Session storage' },
];

const MAIN_AGENT_READY_STATUSES = [
  'Loaded prior constraints',
  'Continuing from previous context',
  'Applying known architecture decisions',
  'Ready to proceed',
];

export const Scene10Sidekick: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_10_START;
  
  // Phase 1: New session begins (frames 0-60)
  const promptOpacity = interpolate(relativeFrame, 0, 40, 0, 1, EASINGS.smooth);
  
  // Phase 2: Sidekick activates (frames 61-120)
  const sidekickProgress = interpolate(relativeFrame, 61, 120, 0, 1, EASINGS.smooth);
  const isSidekickActive = relativeFrame > 61;
  
  // Phase 3: Memory loading (frames 121-175)
  const memoryProgress = interpolate(relativeFrame, 121, 175, 0, 1, EASINGS.smooth);
  const isLoadingMemory = relativeFrame > 121;
  const loadedMemoryCount = isLoadingMemory 
    ? Math.min(LOADED_MEMORY.length, Math.floor((relativeFrame - 121) / 18) + 1)
    : 0;
  
  // Phase 4: Main agent starts (frames 176-209)
  const agentReadyProgress = interpolate(relativeFrame, 176, 209, 0, 1, EASINGS.smooth);
  const isAgentReady = relativeFrame > 176;
  
  // Main agent status
  const statusIndex = isAgentReady
    ? Math.min(Math.floor((relativeFrame - 176) / 15), MAIN_AGENT_READY_STATUSES.length - 1)
    : 0;
  
  // Caption visibility
  const captionOpacity = interpolate(relativeFrame, 160, 209, 0, 1, EASINGS.smooth);
  
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
        {/* Header: New Session */}
        <div
          style={{
            textAlign: 'center',
            opacity: promptOpacity,
          }}
        >
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}
          >
            New Session
          </div>
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes['2xl'],
              color: COLORS.textPrimary,
              fontWeight: TYPOGRAPHY.weights.medium,
            }}
          >
            {PROMPT_TEXT}
          </div>
        </div>
        
        {/* Sidekick activation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            opacity: sidekickProgress,
          }}
        >
          {SIDECICK_STEPS.map((step, i) => (
            <div
              key={step.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                background: isLoadingMemory && i < loadedMemoryCount + 1
                  ? 'rgba(20, 184, 166, 0.1)'
                  : COLORS.bgPanel,
                border: `1px solid ${isLoadingMemory && i < loadedMemoryCount + 1
                  ? COLORS.sidekick.primary
                  : COLORS.border}`,
                borderRadius: LAYOUT.borderRadius,
                opacity: relativeFrame > 61 + i * 15
                  ? interpolate(relativeFrame - (61 + i * 15), 0, 15, 0, 1, EASINGS.smooth)
                  : 0,
                transform: `translateY(${relativeFrame > 61 + i * 15
                  ? interpolate(relativeFrame - (61 + i * 15), 0, 15, 10, 0, EASINGS.smooth)
                  : 10}px)`,
              }}
            >
              <span style={{ fontSize: 16 }}>{step.icon}</span>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: isLoadingMemory && i < loadedMemoryCount + 1
                    ? COLORS.sidekick.primary
                    : COLORS.textSecondary,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                {step.label}
              </span>
              {isLoadingMemory && i < loadedMemoryCount + 1 && (
                <span style={{ color: COLORS.success }}>✓</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Sidekick panel */}
        <div
          style={{
            display: 'flex',
            gap: LAYOUT.gap,
            alignItems: 'flex-start',
          }}
        >
          {/* Sidekick info */}
          <div
            style={{
              width: 300,
              background: 'rgba(20, 184, 166, 0.1)',
              border: `1px solid ${COLORS.sidekick.primary}`,
              borderRadius: LAYOUT.borderRadius,
              padding: '24px',
              opacity: sidekickProgress,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: `${COLORS.sidekick.primary}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                🎒
              </div>
              <div>
                <div
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.lg,
                    color: COLORS.sidekick.primary,
                    fontWeight: TYPOGRAPHY.weights.semibold,
                  }}
                >
                  Sidekick
                </div>
                <div
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.textMuted,
                  }}
                >
                  Warm-start assistant
                </div>
              </div>
            </div>
            
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.sm,
                color: COLORS.textSecondary,
                lineHeight: 1.5,
              }}
            >
              Retrieves relevant context and memory before the main agent responds, enabling seamless session continuity.
            </div>
          </div>
          
          {/* Loaded memory */}
          <div
            style={{
              flex: 1,
              background: COLORS.bgElevated,
              border: `1px solid ${COLORS.border}`,
              borderRadius: LAYOUT.borderRadius,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
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
              Retrieved Context
            </div>
            
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {LOADED_MEMORY.slice(0, loadedMemoryCount).map((mem, i) => (
                <MemoryCard
                  key={mem.title}
                  title={mem.title}
                  description={mem.description}
                  style={{
                    opacity: interpolate(relativeFrame - (121 + i * 18), 0, 15, 0, 1, EASINGS.smooth),
                    transform: `translateX(${interpolate(relativeFrame - (121 + i * 18), 0, 15, -20, 0, EASINGS.smooth)}px)`,
                  }}
                />
              ))}
            </div>
            
            {/* Briefing complete */}
            {isAgentReady && (
              <div
                style={{
                  marginTop: 'auto',
                  padding: '12px 16px',
                  background: 'rgba(20, 184, 166, 0.1)',
                  border: `1px solid ${COLORS.sidekick.primary}`,
                  borderRadius: LAYOUT.borderRadiusSm,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  opacity: agentReadyProgress,
                }}
              >
                <span style={{ color: COLORS.sidekick.primary }}>✓</span>
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamily,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    color: COLORS.sidekick.primary,
                    fontWeight: TYPOGRAPHY.weights.medium,
                  }}
                >
                  Briefing passed to Main Agent
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Agent ready */}
        <div
          style={{
            opacity: agentReadyProgress,
            transform: `translateY(${interpolate(agentReadyProgress, 0, 1, 30, 0, EASINGS.smooth)}px)`,
          }}
        >
          <AgentCard
            title="Main Agent"
            subtitle="Coding Agent"
            status={MAIN_AGENT_READY_STATUSES[statusIndex]}
            isActive={true}
            accentColor={COLORS.sidekick.primary}
          />
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="Sidekick helps new sessions start with the right context already in place."
          isVisible={true}
        />
      </div>
    </div>
  );
};
