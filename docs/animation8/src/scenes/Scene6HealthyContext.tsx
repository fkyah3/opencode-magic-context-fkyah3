import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, STATUS_MESSAGES, SCENE_CAPTIONS } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  ContextMeter, 
  ConversationRail,
  HistorianPanel,
  StatusChip,
  Caption 
} from '../components';

// Scene 6: Healthy-context payoff (frames 1350-1559)
// Duration: 210 frames / 7.0s

export const Scene6HealthyContext: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_6_START;
  
  // Context drops to healthy level: 91% -> 57%
  const contextPercentage = interpolate(
    sceneFrame,
    [0, 70, 140, 210],
    [91, 70, 57, 54],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Main agent status - showing completion
  const getMainAgentStatus = () => {
    if (sceneFrame < 50) return STATUS_MESSAGES.mainAgent.working[14]; // Finalizing patch
    if (sceneFrame < 100) return STATUS_MESSAGES.mainAgent.working[15]; // Running full suite
    if (sceneFrame < 150) return STATUS_MESSAGES.mainAgent.working[16]; // Creating clean diff
    return 'All tasks complete';
  };
  
  // Generate messages showing healthy state
  const generateMessages = () => {
    const messages = [];
    const messageCount = 12;
    
    for (let i = 40; i < 40 + messageCount; i++) {
      messages.push({
        id: `#${String(i + 1).padStart(3, '0')}`,
        content: 'Active context',
      });
    }
    
    return messages;
  };
  
  // Success indicators
  const showSuccessIndicators = sceneFrame > 100;
  
  // Caption opacity
  const captionOpacity = interpolate(
    sceneFrame,
    [50, 90, 190, 210],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      {/* Success glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, ${COLORS.success}10 0%, transparent 70%)`,
          opacity: showSuccessIndicators ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
      
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
        
        {/* Top-right: Context Meter (healthy!) */}
        <div style={{ gridColumn: '2', gridRow: '1', justifySelf: 'end' }}>
          <ContextMeter
            percentage={contextPercentage}
            variant="magicContext"
          />
        </div>
        
        {/* Center: Conversation Rail (healthy state) */}
        <div 
          style={{ 
            gridColumn: '1 / -1', 
            gridRow: '2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <ConversationRail
            messages={generateMessages()}
            showZoneLabels={true}
          />
          
          {/* Healthy state indicator */}
          {showSuccessIndicators && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                backgroundColor: `${COLORS.success}20`,
                borderRadius: '8px',
                border: `1px solid ${COLORS.success}40`,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: COLORS.success,
                  boxShadow: `0 0 12px ${COLORS.success}`,
                }}
              />
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.base,
                  color: COLORS.success,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Context healthy — flow maintained
              </span>
            </div>
          )}
        </div>
        
        {/* Bottom row */}
        <div 
          style={{ 
            gridColumn: '1 / -1', 
            gridRow: '3',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {/* Bottom-left: Historian (complete, calm) */}
          <HistorianPanel
            status="complete"
            progress={100}
          />
          
          {/* Bottom-right: Success chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            {sceneFrame > 40 && (
              <StatusChip text="Patch finalized" variant="success" />
            )}
            {sceneFrame > 80 && (
              <StatusChip text="All tests passing" variant="success" />
            )}
            {sceneFrame > 120 && (
              <StatusChip text="Diff created" variant="success" />
            )}
            {sceneFrame > 160 && (
              <StatusChip text="Ready for PR" variant="success" />
            )}
          </div>
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
        <Caption text={SCENE_CAPTIONS.scene6} />
      </div>
    </AbsoluteFill>
  );
};
