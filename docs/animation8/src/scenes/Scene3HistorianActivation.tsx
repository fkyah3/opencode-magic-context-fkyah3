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

// Scene 3: Historian activation - no blocking (frames 330-599)
// Duration: 270 frames / 9.0s

export const Scene3HistorianActivation: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_3_START;
  
  // Context pressure: 68% -> 81% -> 88% -> 91%
  const contextPercentage = interpolate(
    sceneFrame,
    [0, 60, 130, 270],
    [68, 81, 88, 91],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Historian status progression
  const getHistorianStatus = () => {
    if (sceneFrame < 60) return 'idle';
    if (sceneFrame < 130) return 'monitoring';
    if (sceneFrame < 200) return 'preparing';
    return 'processing';
  };
  
  // Main agent status cycling
  const getMainAgentStatus = () => {
    const statuses = [
      STATUS_MESSAGES.mainAgent.working[0],  // Reading project files
      STATUS_MESSAGES.mainAgent.working[5],  // Fixing auth edge case
      STATUS_MESSAGES.mainAgent.working[6],  // Updating integration tests
      STATUS_MESSAGES.mainAgent.working[7],  // Running focused test set
    ];
    const index = Math.floor(sceneFrame / 60) % statuses.length;
    return statuses[index];
  };
  
  // Generate conversation messages that grow over time
  const generateMessages = () => {
    const messages = [];
    const messageCount = Math.min(20, Math.floor(sceneFrame / 10) + 8);
    
    for (let i = 0; i < messageCount; i++) {
      messages.push({
        id: `#${String(i + 1).padStart(3, '0')}`,
        content: SAMPLE_MESSAGES[i % SAMPLE_MESSAGES.length],
      });
    }
    
    return messages;
  };
  
  // Status chips
  const statusChips = [
    { text: 'Reading files', frame: 20 },
    { text: 'Tracing paths', frame: 80 },
    { text: 'Updating tests', frame: 140 },
    { text: 'Running build', frame: 200 },
  ];
  
  // Caption opacity
  const captionOpacity = interpolate(
    sceneFrame,
    [60, 90, 240, 270],
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
        
        {/* Top-right: Context Meter */}
        <div style={{ gridColumn: '2', gridRow: '1', justifySelf: 'end' }}>
          <ContextMeter
            percentage={contextPercentage}
            variant="magicContext"
          />
        </div>
        
        {/* Center: Conversation Rail */}
        <div 
          style={{ 
            gridColumn: '1 / -1', 
            gridRow: '2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ConversationRail
            messages={generateMessages()}
            showZoneLabels={true}
          />
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
          <HistorianPanel
            status={getHistorianStatus()}
            progress={sceneFrame > 200 ? (sceneFrame - 200) / 70 * 100 : 0}
          />
          
          {/* Bottom-right: Status chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            {statusChips.map((chip, idx) => (
              sceneFrame >= chip.frame && (
                <StatusChip
                  key={idx}
                  text={chip.text}
                  variant="info"
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
        <Caption text={SCENE_CAPTIONS.scene3} />
      </div>
    </AbsoluteFill>
  );
};
