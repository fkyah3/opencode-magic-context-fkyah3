import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_9_START, 
  SCENE_9_END, 
  COLORS, 
  LAYOUT, 
  TYPOGRAPHY, 
  interpolate,
  EASINGS 
} from '../constants';
import { 
  MemoryCard,
  FactChip,
  Caption,
} from '../components';

// Scene 9: Dreamer (2100-2369 frames, 9 seconds)
// Off-session / overnight maintenance of the knowledge layer

const MAINTENANCE_TASKS = [
  { icon: '📚', label: 'Consolidating memory', color: COLORS.dreamer.primary },
  { icon: '✓', label: 'Verifying retained facts', color: COLORS.success },
  { icon: '📦', label: 'Archiving stale knowledge', color: COLORS.textMuted },
  { icon: '✨', label: 'Improving summaries', color: COLORS.info },
];

const MEMORY_ITEMS = [
  { title: 'Auth system architecture', description: 'Consolidated from 12 sessions', isArchived: false },
  { title: 'Cache layer decisions', description: 'Verified and strengthened', isArchived: false },
  { title: 'Legacy retry logic', description: 'Moved to archive', isArchived: true },
  { title: 'Deprecated patterns', description: 'Cleaned up', isArchived: true },
];

export const Scene9Dreamer: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_9_START;
  
  // Transition to night mode (frames 0-60)
  const nightModeProgress = interpolate(relativeFrame, 0, 60, 0, 1, EASINGS.smooth);
  
  // Dreamer activation (frames 61-160)
  const dreamerProgress = interpolate(relativeFrame, 61, 160, 0, 1, EASINGS.smooth);
  const isDreamerActive = relativeFrame > 61;
  
  // Maintenance effects (frames 161-260)
  const effectsProgress = interpolate(relativeFrame, 161, 260, 0, 1, EASINGS.smooth);
  const isProcessing = relativeFrame > 161;
  
  // Stable state (frames 261-269)
  const stableProgress = interpolate(relativeFrame, 261, 269, 0, 1, EASINGS.smooth);
  
  // Caption visibility
  const captionOpacity = interpolate(relativeFrame, 220, 269, 0, 1, EASINGS.smooth);
  
  // Background color transition
  const bgColor = `rgb(${10 + nightModeProgress * 5}, ${10 + nightModeProgress * 5}, ${15 + nightModeProgress * 10})`;
  
  return (
    <div
      style={{
        width: LAYOUT.width,
        height: LAYOUT.height,
        background: bgColor,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Night sky effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at top, rgba(99, 102, 241, ${0.05 * nightModeProgress}) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />
      
      {/* Stars */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: nightModeProgress * 0.5,
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 160px 20px, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 200px 60px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 250px 90px, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 300px 30px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 350px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 400px 50px, rgba(255,255,255,0.6), transparent)
          `,
          backgroundSize: '400px 100px',
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
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            opacity: nightModeProgress,
          }}
        >
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes['3xl'],
              fontWeight: TYPOGRAPHY.weights.bold,
              color: COLORS.dreamer.primary,
              marginBottom: 8,
              textShadow: `0 0 40px ${COLORS.dreamer.glow}`,
            }}
          >
            🌙 Dreamer
          </div>
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.base,
              color: COLORS.textSecondary,
            }}
          >
            Off-session maintenance
          </div>
        </div>
        
        {/* Maintenance tasks */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            opacity: dreamerProgress,
          }}
        >
          {MAINTENANCE_TASKS.map((task, i) => (
            <div
              key={task.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: '16px 24px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: `1px solid ${isProcessing ? task.color : COLORS.border}`,
                borderRadius: LAYOUT.borderRadius,
                opacity: relativeFrame > 61 + i * 25 
                  ? interpolate(relativeFrame - (61 + i * 25), 0, 20, 0, 1, EASINGS.smooth)
                  : 0,
                transform: `translateY(${relativeFrame > 61 + i * 25
                  ? interpolate(relativeFrame - (61 + i * 25), 0, 20, 20, 0, EASINGS.smooth)
                  : 20}px)`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `${task.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  border: `2px solid ${task.color}`,
                  animation: isProcessing ? 'pulse 2s ease-in-out infinite' : 'none',
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {task.icon}
              </div>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  color: task.color,
                  fontWeight: TYPOGRAPHY.weights.medium,
                  textAlign: 'center',
                }}
              >
                {task.label}
              </span>
            </div>
          ))}
        </div>
        
        {/* Knowledge layer visualization */}
        <div
          style={{
            flex: 1,
            background: `rgba(15, 15, 25, ${0.8 * nightModeProgress})`,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            opacity: effectsProgress,
          }}
        >
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.base,
              color: COLORS.textSecondary,
              textAlign: 'center',
            }}
          >
            Knowledge Layer Maintenance
          </div>
          
          {/* Memory items */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {MEMORY_ITEMS.map((mem, i) => (
              <div
                key={mem.title}
                style={{
                  opacity: relativeFrame > 161 + i * 25
                    ? interpolate(relativeFrame - (161 + i * 25), 0, 20, 0, 1, EASINGS.smooth)
                    : 0,
                  transform: `scale(${relativeFrame > 161 + i * 25
                    ? interpolate(relativeFrame - (161 + i * 25), 0, 20, 0.9, 1, EASINGS.smooth)
                    : 0.9})`,
                }}
              >
                <MemoryCard
                  title={mem.title}
                  description={mem.description}
                  isArchived={mem.isArchived}
                />
              </div>
            ))}
          </div>
          
          {/* Maintenance complete indicator */}
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '16px 24px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: `1px solid ${COLORS.dreamer.primary}`,
              borderRadius: LAYOUT.borderRadius,
              opacity: stableProgress,
            }}
          >
            <span style={{ fontSize: 20 }}>✨</span>
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.base,
                color: COLORS.dreamer.primary,
                fontWeight: TYPOGRAPHY.weights.medium,
              }}
            >
              Knowledge layer optimized — ready for next session
            </span>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="Dreamer keeps the knowledge layer healthy between active sessions."
          isVisible={true}
        />
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
