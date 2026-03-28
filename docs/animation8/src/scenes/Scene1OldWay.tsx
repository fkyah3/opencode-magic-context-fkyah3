import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing, Sequence } from 'remotion';
import { SCENES, COLORS, TYPOGRAPHY, STATUS_MESSAGES, SAMPLE_MESSAGES, SCENE_CAPTIONS } from '../constants';
import { 
  BackgroundGrid, 
  AgentCard, 
  ContextMeter, 
  StatusChip, 
  Terminal, 
  CodeEditor,
  Caption 
} from '../components';

// Scene 1: Old way - full-screen pain (frames 0-209)
// Duration: 210 frames / 7.0s

export const Scene1OldWay: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - SCENES.SCENE_1_START;
  
  // Context pressure animation: 34% -> 58% -> 76% -> 89% -> 94% -> 97% -> 99% -> 100%
  const contextPercentage = interpolate(
    sceneFrame,
    [0, 50, 110, 145, 160],
    [34, 58, 76, 94, 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Determine which status message to show
  const getStatusMessage = () => {
    if (sceneFrame < 50) return STATUS_MESSAGES.mainAgent.working[0];
    if (sceneFrame < 110) return STATUS_MESSAGES.mainAgent.working[1];
    if (sceneFrame < 145) return STATUS_MESSAGES.mainAgent.working[2];
    if (sceneFrame < 160) return STATUS_MESSAGES.mainAgent.working[3];
    return STATUS_MESSAGES.mainAgent.blocked[1]; // "Compacting history..."
  };
  
  // Determine agent status
  const getAgentStatus = () => {
    if (sceneFrame < 160) return 'active';
    return 'blocked';
  };
  
  // Terminal lines that appear over time
  const terminalLines = [
    '→ Starting build...',
    '✓ Type checking passed',
    '✓ Lint checks passed',
    '→ Running tests...',
    '✓ 18 tests passed',
    '✓ Build successful',
    '→ Searching auth.ts...',
    '→ Tracing cache path...',
  ];
  
  const visibleTerminalLines = terminalLines.slice(
    0, 
    Math.min(terminalLines.length, Math.floor(sceneFrame / 15) + 3)
  );
  
  // Code editor content
  const codeContent = `export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};`;
  
  // Status chips that appear
  const statusChips = [
    { text: 'Searching auth.ts', frame: 10 },
    { text: 'Tracing cache path', frame: 30 },
    { text: 'Updating tests', frame: 50 },
    { text: 'Running build', frame: 70 },
    { text: 'Inspecting retry logic', frame: 90 },
  ];
  
  // Blocking overlay opacity
  const blockingOverlayOpacity = interpolate(
    sceneFrame,
    [145, 160, 209],
    [0, 0.7, 0.85],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  // Caption opacity
  const captionOpacity = interpolate(
    sceneFrame,
    [160, 180, 200],
    [0, 1, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  
  return (
    <AbsoluteFill>
      <BackgroundGrid />
      
      {/* Main content container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          gap: '40px',
        }}
      >
        {/* Top row: Agent card and Context meter */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <AgentCard
            title="Main Agent"
            subtitle={getStatusMessage()}
            status={getAgentStatus()}
            variant="main"
          />
          
          <ContextMeter
            percentage={contextPercentage}
            variant="oldWay"
          />
        </div>
        
        {/* Middle section: Code editor and Terminal */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'flex-start',
          }}
        >
          <CodeEditor
            filename="auth.ts"
            code={codeContent}
            isFrozen={sceneFrame >= 160}
          />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Terminal
              lines={visibleTerminalLines}
              isFrozen={sceneFrame >= 160}
            />
            
            {/* Status chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {statusChips.map((chip, idx) => (
                sceneFrame >= chip.frame && (
                  <StatusChip
                    key={idx}
                    text={chip.text}
                    variant={sceneFrame >= 160 ? 'warning' : 'default'}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Blocking overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: `${COLORS.background}90`,
          opacity: blockingOverlayOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        {sceneFrame >= 160 && (
          <>
            {/* Blocking spinner */}
            <div
              style={{
                width: 60,
                height: 60,
                border: `3px solid ${COLORS.oldWay.primary}30`,
                borderTopColor: COLORS.oldWay.primary,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
            
            {/* Blocking text */}
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.xl,
                color: COLORS.oldWay.primary,
                fontWeight: TYPOGRAPHY.weights.semibold,
              }}
            >
              Context limit reached
            </div>
            
            {/* Progress labels */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {sceneFrame >= 170 && (
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    color: COLORS.text.secondary,
                  }}
                >
                  Summarizing previous steps...
                </span>
              )}
              {sceneFrame >= 185 && (
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    color: COLORS.text.secondary,
                  }}
                >
                  Rebuilding working context...
                </span>
              )}
              {sceneFrame >= 195 && (
                <span
                  style={{
                    fontFamily: TYPOGRAPHY.fontFamilyMono,
                    fontSize: TYPOGRAPHY.sizes.sm,
                    color: COLORS.text.secondary,
                  }}
                >
                  Compressing 2,143 messages...
                </span>
              )}
            </div>
          </>
        )}
      </AbsoluteFill>
      
      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: captionOpacity,
        }}
      >
        <Caption text={SCENE_CAPTIONS.scene1} />
      </div>
    </AbsoluteFill>
  );
};
