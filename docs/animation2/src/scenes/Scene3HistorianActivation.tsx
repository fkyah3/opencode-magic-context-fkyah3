import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_3_START, 
  SCENE_3_END, 
  COLORS, 
  LAYOUT, 
  TYPOGRAPHY, 
  interpolate,
  EASINGS 
} from '../constants';
import { 
  AgentCard, 
  ContextMeter, 
  ConversationRail, 
  HistorianPanel, 
  Caption 
} from '../components';

// Scene 3: Historian activation - no blocking (330-599 frames, 9 seconds)
// Shows context pressure rising but Historian wakes up, main agent keeps going

const MAIN_AGENT_STATUSES = [
  'Reading project files',
  'Fixing auth edge case',
  'Updating integration tests',
  'Running focused test set',
  'Analyzing token refresh',
  'Refactoring middleware',
  'Checking type coverage',
  'Optimizing queries',
];

const HISTORIAN_STATUSES = [
  'Standby',
  'Monitoring context pressure',
  'Preparing background compaction',
  'Scanning older messages',
];

const RAIL_MESSAGES = [
  { id: '#001', content: 'Initial project setup', type: 'log' as const },
  { id: '#002', content: 'Analyzing requirements', type: 'thought' as const },
  { id: '#003', content: 'Investigated auth flow', type: 'tool' as const },
  { id: '#004', content: 'Cache strategy review', type: 'decision' as const },
  { id: '#005', content: 'Token validation check', type: 'tool' as const },
  { id: '#006', content: 'Session timeout config', type: 'log' as const },
  { id: '#007', content: 'Retry logic analysis', type: 'thought' as const },
  { id: '#008', content: 'Database schema review', type: 'tool' as const },
  { id: '#009', content: 'API endpoint design', type: 'decision' as const },
  { id: '#010', content: 'Error handling pattern', type: 'thought' as const },
  { id: '#011', content: 'Middleware chain setup', type: 'log' as const },
  { id: '#012', content: 'Rate limiting config', type: 'tool' as const },
  { id: '#013', content: 'Logging strategy', type: 'decision' as const },
  { id: '#014', content: 'Health check endpoint', type: 'log' as const },
  { id: '#015', content: 'Docker configuration', type: 'tool' as const },
  { id: '#016', content: 'Environment variables', type: 'log' as const },
  { id: '#017', content: 'Test suite setup', type: 'tool' as const },
  { id: '#018', content: 'CI/CD pipeline', type: 'decision' as const },
  { id: '#019', content: 'Documentation update', type: 'log' as const },
  { id: '#020', content: 'Code review feedback', type: 'thought' as const },
];

export const Scene3HistorianActivation: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_3_START;
  
  // Context meter animation: 68% -> 91%
  const contextPercent = interpolate(relativeFrame, 0, 269, 68, 91, EASINGS.smooth);
  
  // Main agent status cycling
  const statusIndex = Math.floor(relativeFrame / 35) % MAIN_AGENT_STATUSES.length;
  
  // Historian status progression
  let historianStatusIndex = 0;
  if (relativeFrame > 60) historianStatusIndex = 1;
  if (relativeFrame > 130) historianStatusIndex = 2;
  if (relativeFrame > 200) historianStatusIndex = 3;
  
  const isHistorianActive = relativeFrame > 60;
  
  // Rail animation - messages accumulate
  const visibleMessages = Math.min(
    RAIL_MESSAGES.length,
    Math.floor(relativeFrame / 15) + 10
  );
  
  // Caption visibility
  const captionOpacity = interpolate(relativeFrame, 220, 269, 0, 1, EASINGS.smooth);
  
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
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'auto 1fr auto',
          gap: LAYOUT.gap,
        }}
      >
        {/* Top-left: Main Agent */}
        <AgentCard
          title="Main Agent"
          subtitle="Coding Agent"
          status={MAIN_AGENT_STATUSES[statusIndex]}
          isActive={true}
          accentColor={COLORS.magicContext.primary}
        />
        
        {/* Top-right: Context Meter */}
        <ContextMeter
          percentage={contextPercent}
          frame={relativeFrame}
          isWarning={contextPercent > 85}
        />
        
        {/* Center: Conversation Rail (spans both columns) */}
        <div style={{ gridColumn: '1 / -1' }}>
          <ConversationRail
            messages={RAIL_MESSAGES.slice(0, visibleMessages)}
            style={{ height: 200 }}
          />
        </div>
        
        {/* Bottom-left: Historian Panel */}
        <HistorianPanel
          status={HISTORIAN_STATUSES[historianStatusIndex]}
          isActive={isHistorianActive}
        />
        
        {/* Bottom-right: Structured outputs placeholder */}
        <div
          style={{
            background: COLORS.bgPanel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: '20px 24px',
            opacity: 0.7,
          }}
        >
          <div
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 12,
            }}
          >
            Structured Outputs
          </div>
          <div
            style={{
              display: 'flex',
              gap: 12,
              opacity: 0.3,
            }}
          >
            <div
              style={{
                padding: '12px 20px',
                background: COLORS.bgElevated,
                borderRadius: LAYOUT.borderRadiusSm,
                fontSize: TYPOGRAPHY.sizes.sm,
                color: COLORS.textMuted,
              }}
            >
              Compartments
            </div>
            <div
              style={{
                padding: '12px 20px',
                background: COLORS.bgElevated,
                borderRadius: LAYOUT.borderRadiusSm,
                fontSize: TYPOGRAPHY.sizes.sm,
                color: COLORS.textMuted,
              }}
            >
              Session Facts
            </div>
            <div
              style={{
                padding: '12px 20px',
                background: COLORS.bgElevated,
                borderRadius: LAYOUT.borderRadiusSm,
                fontSize: TYPOGRAPHY.sizes.sm,
                color: COLORS.textMuted,
              }}
            >
              Memory
            </div>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="Magic Context: before the limit blocks the session, a background Historian starts working."
          isVisible={true}
        />
      </div>
    </div>
  );
};
