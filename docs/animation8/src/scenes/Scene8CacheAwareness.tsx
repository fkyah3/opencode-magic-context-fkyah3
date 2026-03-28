import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, SCENE_CAPTIONS } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  ContextMeter, 
  ConversationRail,
  QueueBadge,
  Caption 
} from '../components';

// Scene 8: Cache awareness (frames 1830-2099)
// Duration: 270 frames / 9.0s

export const Scene8CacheAwareness: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_8_START;
  
  // Context stays stable
  const contextPercentage = interpolate(
    sceneFrame,
    [0, 270],
    [58, 55],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Queue animation phases
  // 0-70: Queue reductions
  // 70-130: Show preserved cache
  // 130-180: Trigger condition
  // 180-220: Apply reductions
  // 220+: Show result
  
  const queueCount = Math.min(3, Math.floor(sceneFrame / 25));
  
  // Ghosted messages (queued for reduction)
  const showGhostedMessages = sceneFrame > 30 && sceneFrame < 180;
  const ghostedOpacity = interpolate(
    sceneFrame,
    [30, 70, 130, 180],
    [0, 0.5, 0.5, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Cache preserved indicator
  const showCachePreserved = sceneFrame > 70 && sceneFrame < 180;
  
  // Trigger condition
  const showTrigger = sceneFrame > 130 && sceneFrame < 220;
  
  // Applied state
  const showApplied = sceneFrame > 180;
  const appliedOpacity = interpolate(
    sceneFrame,
    [180, 220],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Main agent status
  const getMainAgentStatus = () => {
    if (sceneFrame < 70) return 'Queueing reductions';
    if (sceneFrame < 130) return 'Preserving cache efficiency';
    if (sceneFrame < 180) return 'Waiting for optimal timing';
    return 'Cache-aware compaction applied';
  };
  
  // Generate messages
  const generateMessages = () => {
    const messages = [];
    const messageCount = showApplied ? 10 : 14;
    
    for (let i = 50; i < 50 + messageCount; i++) {
      messages.push({
        id: `#${String(i + 1).padStart(3, '0')}`,
        content: showApplied ? 'Optimized context' : 'Active + queued',
      });
    }
    
    return messages;
  };
  
  // Caption opacity
  const captionOpacity = interpolate(
    sceneFrame,
    [100, 140, 250, 270],
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
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto 1fr auto',
          gap: '32px',
          padding: '48px',
        }}
      >
        {/* Top-left: Main Agent */}
        <div style={{ gridColumn: '1', gridRow: '1' }}>
          <AgentCard
            title="Main Agent"
            subtitle={getMainAgentStatus()}
            status="active"
            variant="main"
          />
        </div>
        
        {/* Top-right: Context Meter + Queue */}
        <div style={{ gridColumn: '2', gridRow: '1', justifySelf: 'end', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
          <ContextMeter
            percentage={contextPercentage}
            variant="magicContext"
          />
          
          {/* Queue badge */}
          {queueCount > 0 && sceneFrame < 180 && (
            <QueueBadge count={queueCount} />
          )}
        </div>
        
        {/* Center: Conversation Rail with cache visualization */}
        <div 
          style={{ 
            gridColumn: '1 / -1', 
            gridRow: '2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '24px',
            position: 'relative',
          }}
        >
          <ConversationRail
            messages={generateMessages()}
            showZoneLabels={true}
          />
          
          {/* Cache preserved indicator */}
          {showCachePreserved && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                backgroundColor: `${COLORS.info}15`,
                borderRadius: '8px',
                border: `1px solid ${COLORS.info}40`,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={COLORS.info}
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.info,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Preserving cached prefix — waiting for optimal apply point
              </span>
            </div>
          )}
          
          {/* Trigger condition */}
          {showTrigger && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                backgroundColor: `${COLORS.warning}15`,
                borderRadius: '8px',
                border: `1px solid ${COLORS.warning}40`,
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={COLORS.warning}
                strokeWidth="2"
              >
                <path d="M12 8v4M12 16h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.warning,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Cache TTL expired — applying queued reductions
              </span>
            </div>
          )}
          
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.7; }
            }
          `}</style>
          
          {/* Applied result */}
          {showApplied && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                backgroundColor: `${COLORS.success}15`,
                borderRadius: '8px',
                border: `1px solid ${COLORS.success}40`,
                opacity: appliedOpacity,
              }}
            >
              <svg
                width="18"
                height="18"
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
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.success,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Cache-aware reductions applied — context optimized
              </span>
            </div>
          )}
        </div>
        
        {/* Bottom: Queue visualization */}
        <div 
          style={{ 
            gridColumn: '1 / -1', 
            gridRow: '3',
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {/* Queued items */}
          {sceneFrame < 180 && (
            <>
              {sceneFrame > 30 && (
                <div
                  style={{
                    padding: '8px 16px',
                    backgroundColor: `${COLORS.warning}10`,
                    borderRadius: '6px',
                    border: `1px dashed ${COLORS.warning}50`,
                    opacity: ghostedOpacity,
                  }}
                >
                  <span
                    style={{
                      fontFamily: TYPOGRAPHY.fontFamilyMono,
                      fontSize: TYPOGRAPHY.sizes.xs,
                      color: COLORS.warning,
                    }}
                  >
                    Queued: #041–#052
                  </span>
                </div>
              )}
              {sceneFrame > 55 && (
                <div
                  style={{
                    padding: '8px 16px',
                    backgroundColor: `${COLORS.warning}10`,
                    borderRadius: '6px',
                    border: `1px dashed ${COLORS.warning}50`,
                    opacity: ghostedOpacity,
                  }}
                >
                  <span
                    style={{
                      fontFamily: TYPOGRAPHY.fontFamilyMono,
                      fontSize: TYPOGRAPHY.sizes.xs,
                      color: COLORS.warning,
                    }}
                  >
                    Queued: stale scratchpad
                  </span>
                </div>
              )}
              {sceneFrame > 80 && (
                <div
                  style={{
                    padding: '8px 16px',
                    backgroundColor: `${COLORS.warning}10`,
                    borderRadius: '6px',
                    border: `1px dashed ${COLORS.warning}50`,
                    opacity: ghostedOpacity,
                  }}
                >
                  <span
                    style={{
                      fontFamily: TYPOGRAPHY.fontFamilyMono,
                      fontSize: TYPOGRAPHY.sizes.xs,
                      color: COLORS.warning,
                    }}
                  >
                    Queued: temporary trace
                  </span>
                </div>
              )}
            </>
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
        <Caption text={SCENE_CAPTIONS.scene8} />
      </div>
    </AbsoluteFill>
  );
};
