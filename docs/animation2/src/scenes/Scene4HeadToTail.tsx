import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_4_START, 
  SCENE_4_END, 
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
  Caption,
  MessageCard,
} from '../components';

// Scene 4: Head-to-tail simultaneous motion (600-959 frames, 12 seconds)
// THE HERO SHOT - Most important scene in the animation
// Shows Historian taking older messages from head while main agent adds new work on tail

const MAIN_AGENT_STATUSES = [
  'Patch applied',
  'Re-running tests',
  'Inspecting timeout behavior',
  'Fixed token refresh path',
  'Updated integration fixtures',
  'Tests passing 18/18',
  'Analyzing edge cases',
  'Optimizing queries',
  'Refactoring handlers',
  'Validating schemas',
];

const HISTORIAN_STATUSES = [
  'Extracting older messages',
  'Compartmentalizing history',
  'Extracting durable facts',
  'Promoting stable memory',
  'Processing complete',
];

const OLD_MESSAGES = [
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

const NEW_MESSAGES = [
  { id: '#021', content: 'Auth middleware fix', type: 'tool' as const },
  { id: '#022', content: 'Token refresh logic', type: 'decision' as const },
  { id: '#023', content: 'Cache invalidation', type: 'thought' as const },
  { id: '#024', content: 'Retry backoff config', type: 'log' as const },
  { id: '#025', content: 'Session store update', type: 'tool' as const },
  { id: '#026', content: 'Rate limit tuning', type: 'decision' as const },
  { id: '#027', content: 'Error boundary fix', type: 'tool' as const },
  { id: '#028', content: 'Test coverage check', type: 'log' as const },
];

export const Scene4HeadToTail: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_4_START;
  
  // Main agent status cycling
  const statusIndex = Math.floor(relativeFrame / 36) % MAIN_AGENT_STATUSES.length;
  
  // Historian status progression
  let historianStatusIndex = 0;
  if (relativeFrame > 60) historianStatusIndex = 1;
  if (relativeFrame > 160) historianStatusIndex = 2;
  if (relativeFrame > 260) historianStatusIndex = 3;
  if (relativeFrame > 320) historianStatusIndex = 4;
  
  // Context meter - stays high but stable
  const contextPercent = 88 + Math.sin(relativeFrame / 50) * 3;
  
  // Phase 1: Historian selects chunk from head (frames 0-60)
  const selectionProgress = interpolate(relativeFrame, 0, 60, 0, 1, EASINGS.smooth);
  const isSelecting = relativeFrame < 60;
  
  // Phase 2: Extract head chunk (frames 61-160)
  const extractionProgress = interpolate(relativeFrame, 61, 160, 0, 1, EASINGS.smooth);
  const isExtracting = relativeFrame >= 61 && relativeFrame < 160;
  
  // Phase 3: Process in Historian (frames 161-260)
  const processingProgress = interpolate(relativeFrame, 161, 260, 0, 1, EASINGS.smooth);
  const isProcessing = relativeFrame >= 161 && relativeFrame < 260;
  
  // Phase 4: Show simultaneous action (frames 261-359)
  const simultaneousProgress = interpolate(relativeFrame, 261, 359, 0, 1, EASINGS.smooth);
  
  // New messages appearing on tail
  const newMessagesCount = Math.min(
    NEW_MESSAGES.length,
    Math.floor((relativeFrame - 60) / 37) + 1
  );
  const visibleNewMessages = relativeFrame > 60 ? NEW_MESSAGES.slice(0, newMessagesCount) : [];
  
  // Caption visibility
  const captionOpacity = interpolate(relativeFrame, 300, 359, 0, 1, EASINGS.smooth);
  
  // Determine which old messages are highlighted/extracted
  const highlightedRange = isSelecting || isExtracting 
    ? { start: 0, end: 5 } 
    : undefined;
  
  // After extraction, those messages are gone
  const remainingOldMessages = isExtracting || isProcessing || relativeFrame > 260
    ? OLD_MESSAGES.slice(6)
    : OLD_MESSAGES;
  
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
          isWarning={true}
        />
        
        {/* Center: Conversation Rail (spans both columns) */}
        <div style={{ gridColumn: '1 / -1', position: 'relative' }}>
          {/* Head zone label */}
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: -25,
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: isExtracting ? COLORS.historian.primary : COLORS.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              transition: 'color 0.3s ease',
            }}
          >
            ← Head (Older History)
          </div>
          
          {/* Tail zone label */}
          <div
            style={{
              position: 'absolute',
              right: 20,
              top: -25,
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.magicContext.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Tail (Newest Activity) →
          </div>
          
          {/* Extraction animation overlay */}
          {isExtracting && (
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 20,
                zIndex: 10,
                transform: `translateX(${extractionProgress * 200}px) translateY(${extractionProgress * 300}px) scale(${1 - extractionProgress * 0.3})`,
                opacity: 1 - extractionProgress * 0.5,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  padding: 12,
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: `2px solid ${COLORS.historian.primary}`,
                  borderRadius: LAYOUT.borderRadius,
                  boxShadow: `0 0 30px ${COLORS.historian.glow}`,
                }}
              >
                {OLD_MESSAGES.slice(0, 6).map((msg) => (
                  <MessageCard
                    key={msg.id}
                    id={msg.id}
                    content={msg.content}
                    type={msg.type}
                    isCompact={true}
                    isHighlighted={true}
                  />
                ))}
              </div>
            </div>
          )}
          
          <ConversationRail
            messages={[...remainingOldMessages, ...visibleNewMessages]}
            highlightedRange={highlightedRange}
            style={{ height: 220 }}
          />
          
          {/* Selection bracket */}
          {(isSelecting || isExtracting) && (
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 20,
                height: 180,
                width: Math.min(400, 60 + selectionProgress * 340),
                border: `2px dashed ${COLORS.historian.primary}`,
                borderRadius: LAYOUT.borderRadiusSm,
                opacity: isExtracting ? 1 - extractionProgress : selectionProgress,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -24,
                  left: 0,
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  color: COLORS.historian.primary,
                  background: COLORS.bgPanel,
                  padding: '2px 8px',
                  borderRadius: 4,
                }}
              >
                Selected: #001–#006
              </div>
            </div>
          )}
          
          {/* Connector line to Historian */}
          {(isExtracting || isProcessing) && (
            <svg
              style={{
                position: 'absolute',
                left: 100,
                bottom: -60,
                width: 200,
                height: 80,
                pointerEvents: 'none',
                opacity: isProcessing ? processingProgress : extractionProgress,
              }}
            >
              <path
                d="M 0,0 Q 100,40 200,80"
                stroke={COLORS.historian.primary}
                strokeWidth={2}
                strokeDasharray="5,5"
                fill="none"
                style={{
                  animation: 'dash 1s linear infinite',
                }}
              />
              <defs>
                <style>{`
                  @keyframes dash {
                    to { stroke-dashoffset: -10; }
                  }
                `}</style>
              </defs>
            </svg>
          )}
        </div>
        
        {/* Bottom-left: Historian Panel */}
        <HistorianPanel
          status={HISTORIAN_STATUSES[historianStatusIndex]}
          isActive={true}
          progress={isProcessing ? processingProgress * 100 : undefined}
        />
        
        {/* Bottom-right: Processing indicator */}
        <div
          style={{
            background: COLORS.bgPanel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          {isProcessing && (
            <>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: LAYOUT.borderRadiusSm,
                    background: 'rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  📦
                </div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: LAYOUT.borderRadiusSm,
                    background: 'rgba(6, 182, 212, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  💡
                </div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: LAYOUT.borderRadiusSm,
                    background: 'rgba(34, 197, 94, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  🔒
                </div>
              </div>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.textSecondary,
                }}
              >
                Creating structured outputs...
              </span>
            </>
          )}
          
          {relativeFrame > 260 && (
            <span
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.sm,
                color: COLORS.success,
              }}
            >
              ✓ Processing complete
            </span>
          )}
        </div>
      </div>
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="Historian rewrites the head. The main agent keeps moving on the tail."
          isVisible={true}
        />
      </div>
    </div>
  );
};
