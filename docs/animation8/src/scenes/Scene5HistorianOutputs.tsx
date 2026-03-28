import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, COMPARTMENT_LABELS, FACT_CHIPS, MEMORY_ENTRIES, SCENE_CAPTIONS } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  ContextMeter, 
  ConversationRail,
  HistorianPanel,
  CompartmentCard,
  FactChip,
  MemoryCard,
  StatusChip,
  Caption 
} from '../components';

// Scene 5: Historian outputs - compartments, facts, memory (frames 960-1349)
// Duration: 390 frames / 13.0s

export const Scene5HistorianOutputs: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_5_START;
  
  // Context drops as compaction happens
  const contextPercentage = interpolate(
    sceneFrame,
    [0, 200, 390],
    [94, 75, 65],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Compartments appear (frames 0-70)
  const compartmentCount = Math.min(3, Math.floor(sceneFrame / 25));
  
  // Facts appear (frames 70-130)
  const factCount = sceneFrame > 70 
    ? Math.min(4, Math.floor((sceneFrame - 70) / 15))
    : 0;
  
  // Memory entries appear (frames 130-200)
  const memoryCount = sceneFrame > 130
    ? Math.min(2, Math.floor((sceneFrame - 130) / 35))
    : 0;
  
  // Main agent continues working
  const getMainAgentStatus = () => {
    if (sceneFrame < 100) return 'Processing complete';
    if (sceneFrame < 200) return 'Continuing workflow';
    if (sceneFrame < 300) return 'Applying structured context';
    return 'Workflow optimized';
  };
  
  // Generate reduced message set (compacted)
  const generateMessages = () => {
    const messages = [];
    // Fewer messages now - head has been compacted
    const messageCount = 16;
    
    for (let i = 20; i < 20 + messageCount; i++) {
      messages.push({
        id: `#${String(i + 1).padStart(3, '0')}`,
        content: 'Compacted context available',
      });
    }
    
    return messages;
  };
  
  // Caption opacity
  const captionOpacity = interpolate(
    sceneFrame,
    [200, 240, 370, 390],
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
        
        {/* Center: Conversation Rail (now with compacted head) */}
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
        
        {/* Bottom row: Historian + Structured Outputs */}
        <div 
          style={{ 
            gridColumn: '1 / -1', 
            gridRow: '3',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '32px',
          }}
        >
          {/* Bottom-left: Historian (complete) */}
          <HistorianPanel
            status="complete"
            progress={100}
          />
          
          {/* Bottom-right: Structured Outputs */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-end',
            }}
          >
            {/* Compartments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  color: COLORS.magicContext.primary,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Compartments
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {COMPARTMENT_LABELS.slice(0, compartmentCount).map((label, idx) => (
                  <CompartmentCard
                    key={idx}
                    title={label}
                    tags={['compressed']}
                    density={idx === 0 ? 'high' : 'medium'}
                  />
                ))}
              </div>
            </div>
            
            {/* Facts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  color: COLORS.magicContext.secondary,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Session Facts
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxWidth: 300 }}>
                {FACT_CHIPS.slice(0, factCount).map((fact, idx) => (
                  <FactChip
                    key={idx}
                    text={fact}
                    isPromoted={idx < memoryCount}
                  />
                ))}
              </div>
            </div>
            
            {/* Memory */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  color: COLORS.magicContext.tertiary,
                  fontWeight: TYPOGRAPHY.weights.medium,
                }}
              >
                Memory
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {MEMORY_ENTRIES.slice(0, memoryCount).map((mem, idx) => (
                  <MemoryCard
                    key={idx}
                    content={mem}
                  />
                ))}
              </div>
            </div>
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
        <Caption text={SCENE_CAPTIONS.scene5} />
      </div>
    </AbsoluteFill>
  );
};
