import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, STATUS_MESSAGES, SAMPLE_MESSAGES, SCENE_CAPTIONS } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  ContextMeter, 
  ConversationRail,
  HistorianPanel,
  StatusChip,
  Caption 
} from '../components';

// Scene 4: Head-to-tail simultaneous motion (frames 600-959)
// Duration: 360 frames / 12.0s
// This is the HERO SHOT - most important scene

export const Scene4HeadToTail: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_4_START;
  
  // Context stays high but doesn't block
  const contextPercentage = interpolate(
    sceneFrame,
    [0, 360],
    [91, 94],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Head selection range animation
  // Frames 0-60: Select head chunk #001-#036
  // Frames 60-160: Extract/move head chunk
  const headSelectionRange: [number, number] | null = sceneFrame < 60 
    ? null 
    : sceneFrame < 160 
      ? [0, 35] 
      : null;
  
  // Historian processing status
  const getHistorianStatus = () => {
    if (sceneFrame < 60) return 'preparing';
    if (sceneFrame < 160) return 'processing';
    if (sceneFrame < 260) return 'processing';
    return 'complete';
  };
  
  // Historian progress
  const historianProgress = interpolate(
    sceneFrame,
    [60, 300],
    [0, 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Main agent status - continuously cycling
  const getMainAgentStatus = () => {
    const statuses = [
      STATUS_MESSAGES.mainAgent.working[8],   // Patch applied
      STATUS_MESSAGES.mainAgent.working[9],  // Re-running tests
      STATUS_MESSAGES.mainAgent.working[10], // Inspecting timeout behavior
      STATUS_MESSAGES.mainAgent.working[11], // Fixed token refresh path
      STATUS_MESSAGES.mainAgent.working[12], // Updated integration fixtures
      STATUS_MESSAGES.mainAgent.working[13], // Tests passing 18/18
    ];
    const index = Math.floor(sceneFrame / 50) % statuses.length;
    return statuses[index];
  };
  
  // Generate messages - tail keeps growing while head is being processed
  const generateMessages = () => {
    const messages = [];
    // Total messages grow from 36 to 52 over the scene
    const baseCount = 36;
    const growth = Math.floor(sceneFrame / 22); // Add ~1 message every 22 frames
    const messageCount = baseCount + growth;
    
    for (let i = 0; i < messageCount; i++) {
      messages.push({
        id: `#${String(i + 1).padStart(3, '0')}`,
        content: SAMPLE_MESSAGES[i % SAMPLE_MESSAGES.length],
      });
    }
    
    return messages;
  };
  
  // Status chips showing continuous activity
  const statusChips = [
    { text: 'Patch applied', frame: 20, variant: 'success' as const },
    { text: 'Tests running', frame: 80, variant: 'info' as const },
    { text: 'Token fixed', frame: 160, variant: 'success' as const },
    { text: '18/18 passing', frame: 240, variant: 'success' as const },
  ];
  
  // Caption opacity - hold longer for this important scene
  const captionOpacity = interpolate(
    sceneFrame,
    [100, 140, 320, 360],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Head extraction visual offset
  const headExtractionOffset = interpolate(
    sceneFrame,
    [60, 160],
    [0, -200],
    {
      easing: Easing.inOut(Easing.ease),
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
        
        {/* Top-right: Context Meter */}
        <div style={{ gridColumn: '2', gridRow: '1', justifySelf: 'end' }}>
          <ContextMeter
            percentage={contextPercentage}
            variant="magicContext"
          />
        </div>
        
        {/* Center: Conversation Rail with head extraction visual */}
        <div 
          style={{ 
            gridColumn: '1 / -1', 
            gridRow: '2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <ConversationRail
            messages={generateMessages()}
            headSelectionRange={headSelectionRange}
            showZoneLabels={true}
          />
          
          {/* Visual indicator of head extraction */}
          {sceneFrame >= 60 && sceneFrame < 200 && (
            <div
              style={{
                position: 'absolute',
                left: 60,
                top: '50%',
                transform: `translateY(-50%) translateX(${headExtractionOffset}px)`,
                width: 200,
                height: 100,
                backgroundColor: `${COLORS.historian.primary}20`,
                borderRadius: '12px',
                border: `2px solid ${COLORS.historian.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 30px ${COLORS.historian.glow}`,
              }}
            >
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamilyMono,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.historian.primary,
                }}
              >
                #001–#036
              </span>
            </div>
          )}
          
          {/* Arrow showing extraction direction */}
          {sceneFrame >= 60 && sceneFrame < 200 && (
            <div
              style={{
                position: 'absolute',
                left: 280 + headExtractionOffset,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 60,
                height: 2,
                backgroundColor: COLORS.historian.primary,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid ' + COLORS.historian.primary,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                }}
              />
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
          {/* Bottom-left: Historian */}
          <div style={{ position: 'relative' }}>
            <HistorianPanel
              status={getHistorianStatus()}
              progress={historianProgress}
            />
            
            {/* Processing steps */}
            <div
              style={{
                position: 'absolute',
                top: -80,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {sceneFrame >= 160 && (
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.historian.primary,
                    opacity: sceneFrame < 260 ? 1 : 0.5,
                  }}
                >
                  → Compartmentalizing history
                </span>
              )}
              {sceneFrame >= 200 && (
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.historian.secondary,
                    opacity: sceneFrame < 300 ? 1 : 0.5,
                  }}
                >
                  → Extracting durable facts
                </span>
              )}
              {sceneFrame >= 260 && (
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes.xs,
                    color: COLORS.historian.tertiary,
                    opacity: sceneFrame < 340 ? 1 : 0.5,
                  }}
                >
                  → Promoting stable memory
                </span>
              )}
            </div>
          </div>
          
          {/* Bottom-right: Status chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            {statusChips.map((chip, idx) => (
              sceneFrame >= chip.frame && (
                <StatusChip
                  key={idx}
                  text={chip.text}
                  variant={chip.variant}
                />
              )
            ))}
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
        <Caption text={SCENE_CAPTIONS.scene4} />
      </div>
    </AbsoluteFill>
  );
};
