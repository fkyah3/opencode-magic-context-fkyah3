import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { SessionShell } from '../components/SessionShell';
import { DreamerPanel } from '../components/DreamerPanel';
import { CompartmentCard } from '../components/CompartmentCard';
import { FactChip } from '../components/FactChip';
import { MemoryCard } from '../components/MemoryCard';
import { CaptionLine } from '../components/CaptionLine';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 9: Dreamer (frames 2100-2369)
export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_9_START;
  const sceneEnd = SCENES.SCENE_9_END;
  
  // Phase 1: Transition to dormant mode (frames 2100-2160)
  const transitionProgress = getProgress(frame, sceneStart, sceneStart + 60);
  
  // Phase 2: Dreamer activates (frames 2161-2245)
  const activationProgress = getProgress(frame, sceneStart + 61, sceneStart + 145);
  
  // Phase 3: Maintenance effects (frames 2246-2325)
  const maintenanceProgress = getProgress(frame, sceneStart + 146, sceneStart + 225);
  
  // Phase 4: Clean state (frames 2326-2369)
  const cleanProgress = getProgress(frame, sceneStart + 226, sceneEnd);
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 200, sceneEnd);
  
  const dreamerTasks = [
    'Consolidating memory',
    'Verifying retained facts',
    'Archiving stale knowledge',
    'Improving summaries',
  ];
  
  return (
    <SessionShell>
      {/* Background knowledge layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: 48,
          opacity: 1 - transitionProgress * 0.7,
        }}
      >
        <div style={{ display: 'flex', gap: 32, flex: 1 }}>
          {/* Left: Compartments and Facts */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ opacity: 0.5 }}>
              <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Compartments</p>
              <CompartmentCard
                title="Recursion investigation"
                summary="Analyzed athena-junior self-spawning issue"
                messageCount={4}
                compact
                opacity={0.6}
              />
            </div>
            
            <div style={{ opacity: 0.5 }}>
              <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Session Facts</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <FactChip text="athena-junior should not spawn itself" opacity={0.6} />
                <FactChip text="guard belongs in subagent-resolver.ts" opacity={0.6} />
              </div>
            </div>
          </div>
          
          {/* Right: Memory */}
          <div style={{ width: 400, opacity: 0.5 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Memory</p>
            <MemoryCard
              title="Agent constraint: prevent self-recursion"
              content="athena-junior must not spawn itself as a sub-agent"
              opacity={0.6}
            />
          </div>
        </div>
      </div>
      
      {/* Dreamer Panel */}
      <DreamerPanel
        tasks={dreamerTasks}
        isActive={activationProgress > 0}
        opacity={interpolate(frame, [sceneStart + 40, sceneStart + 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
      />
      
      {/* Maintenance effects overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: maintenanceProgress,
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          {/* Visual indicators of maintenance */}
          <div style={{ display: 'flex', gap: 24 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: `${COLORS.dreamer.primary}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite',
              }}
            >
              <span style={{ fontSize: 24, color: COLORS.dreamer.primary }}>🧹</span>
            </div>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: `${COLORS.dreamer.primary}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite 0.5s',
              }}
            >
              <span style={{ fontSize: 24, color: COLORS.dreamer.primary }}>📚</span>
            </div>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: `${COLORS.dreamer.primary}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite 1s',
              }}
            >
              <span style={{ fontSize: 24, color: COLORS.dreamer.primary }}>✨</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Clean state indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          backgroundColor: `${COLORS.success}15`,
          borderRadius: 8,
          border: `1px solid ${COLORS.success}30`,
          opacity: cleanProgress,
        }}
      >
        <span style={{ fontSize: 14, color: COLORS.success, fontWeight: 600 }}>
          ✓ Knowledge layer maintained and optimized
        </span>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
      
      {/* Caption */}
      <CaptionLine 
        text="Dreamer keeps the knowledge layer healthy between active sessions."
        opacity={captionOpacity}
        accentColor={COLORS.dreamer.primary}
      />
    </SessionShell>
  );
};
