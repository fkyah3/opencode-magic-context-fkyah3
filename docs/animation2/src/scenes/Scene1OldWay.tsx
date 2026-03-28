import React from 'react';
import { useCurrentFrame } from 'remotion';
import { 
  SCENE_1_START, 
  SCENE_1_END, 
  COLORS, 
  LAYOUT, 
  TYPOGRAPHY, 
  interpolate,
  EASINGS 
} from '../constants';
import { AgentCard, ContextMeter, StatusChip, Terminal, Caption } from '../components';

// Scene 1: Old way - full-screen pain (0-209 frames, 7 seconds)
// Shows the main agent working, hitting context limit, and freezing

const STATUS_CHIPS = [
  'Searching auth.ts',
  'Tracing cache path',
  'Updating tests',
  'Running build',
  'Inspecting retry logic',
  'Analyzing dependencies',
  'Refactoring utils',
  'Checking types',
];

const TERMINAL_LINES = [
  '$ npm run build',
  '→ Compiling...',
  '→ 47 modules transformed',
  '✓ Build completed in 2.3s',
  '$ npm test',
  '→ Running 18 tests...',
  '✓ 18 passing',
];

export const Scene1OldWay: React.FC = () => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - SCENE_1_START;
  
  // Animation phases
  const isWorkingPhase = relativeFrame < 110;
  const isWarningPhase = relativeFrame >= 111 && relativeFrame < 145;
  const isBlockedPhase = relativeFrame >= 146;
  
  // Context meter animation
  const contextPercent = interpolate(
    relativeFrame,
    0, 110,
    34, 89,
    EASINGS.smooth
  );
  
  // Warning phase context rise
  const warningContext = isWarningPhase 
    ? interpolate(relativeFrame, 111, 145, 89, 99, EASINGS.snappy)
    : isBlockedPhase ? 100 : contextPercent;
  
  // Status chip cycling
  const activeChipIndex = Math.floor(relativeFrame / 15) % STATUS_CHIPS.length;
  
  // Terminal line animation
  const visibleTerminalLines = Math.min(
    TERMINAL_LINES.length,
    Math.floor(relativeFrame / 12) + 1
  );
  
  // Blocked overlay opacity
  const blockedOverlayOpacity = isBlockedPhase
    ? interpolate(relativeFrame, 146, 160, 0, 0.7, EASINGS.smooth)
    : 0;
  
  // Caption visibility
  const captionOpacity = relativeFrame > 160
    ? interpolate(relativeFrame, 161, 180, 0, 1, EASINGS.smooth)
    : 0;
  
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
      
      {/* Main content container */}
      <div
        style={{
          padding: LAYOUT.margin,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: LAYOUT.gap,
        }}
      >
        {/* Top row: Agent and Context Meter */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <AgentCard
            title="Main Agent"
            subtitle="Coding Agent"
            status={isBlockedPhase ? 'Compacting history...' : STATUS_CHIPS[activeChipIndex]}
            isActive={!isBlockedPhase}
            accentColor={isBlockedPhase ? COLORS.oldWay.secondary : COLORS.oldWay.primary}
          />
          
          <ContextMeter
            percentage={warningContext}
            frame={relativeFrame}
            isWarning={warningContext > 90}
          />
        </div>
        
        {/* Center: Code editor area */}
        <div
          style={{
            flex: 1,
            background: COLORS.bgElevated,
            border: `1px solid ${COLORS.border}`,
            borderRadius: LAYOUT.borderRadius,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            opacity: isBlockedPhase ? 0.5 : 1,
            filter: isBlockedPhase ? 'grayscale(0.5)' : 'none',
          }}
        >
          {/* File tabs */}
          <div style={{ display: 'flex', gap: 8 }}>
            {['auth.ts', 'cache.ts', 'test.spec.ts'].map((file, i) => (
              <div
                key={file}
                style={{
                  padding: '8px 16px',
                  background: i === 0 ? COLORS.bgCard : COLORS.bgElevated,
                  border: `1px solid ${i === 0 ? COLORS.borderHighlight : COLORS.border}`,
                  borderRadius: LAYOUT.borderRadiusSm,
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: i === 0 ? COLORS.textPrimary : COLORS.textSecondary,
                }}
              >
                {file}
              </div>
            ))}
          </div>
          
          {/* Code area */}
          <div
            style={{
              flex: 1,
              background: COLORS.bg,
              borderRadius: LAYOUT.borderRadiusSm,
              padding: 20,
              fontFamily: 'monospace',
              fontSize: 14,
              color: COLORS.textSecondary,
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: COLORS.historian.primary }}>// Authentication middleware</div>
            <div>
              <span style={{ color: COLORS.info }}>export const</span>
              <span style={{ color: COLORS.textPrimary }}> handleAuth = </span>
              <span style={{ color: COLORS.info }}>async</span>
              <span style={{ color: COLORS.textPrimary }}> (req, res) =&gt; {'{'}</span>
            </div>
            <div style={{ paddingLeft: 20 }}>
              <span style={{ color: COLORS.info }}>const</span>
              <span style={{ color: COLORS.textPrimary }}> token = req.headers.authorization;</span>
            </div>
            <div style={{ paddingLeft: 20 }}>
              <span style={{ color: COLORS.oldWay.primary }}>if</span>
              <span style={{ color: COLORS.textPrimary }}> (!token) {'{'}</span>
            </div>
            <div style={{ paddingLeft: 40, display: 'flex', alignItems: 'center' }}>
              <span style={{ color: COLORS.info }}>return</span>
              <span style={{ color: COLORS.textPrimary }}> res.status(401).json(...)</span>
              {isWorkingPhase && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 2,
                    height: 16,
                    background: COLORS.oldWay.primary,
                    marginLeft: 4,
                    animation: 'blink 1s step-end infinite',
                  }}
                />
              )}
            </div>
            <div style={{ paddingLeft: 20, color: COLORS.textPrimary }}>{'}'}</div>
            <div style={{ color: COLORS.textPrimary }}>{'}'}</div>
          </div>
        </div>
        
        {/* Bottom row: Status chips and Terminal */}
        <div
          style={{
            display: 'flex',
            gap: LAYOUT.gap,
            opacity: isBlockedPhase ? 0.3 : 1,
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              alignContent: 'flex-start',
            }}
          >
            {STATUS_CHIPS.slice(0, 4).map((chip, i) => (
              <StatusChip
                key={chip}
                label={chip}
                isActive={i === activeChipIndex % 4 && !isBlockedPhase}
                accentColor={COLORS.oldWay.primary}
              />
            ))}
          </div>
          
          <Terminal
            lines={TERMINAL_LINES.slice(0, visibleTerminalLines)}
            isActive={!isBlockedPhase}
            style={{ width: 400 }}
          />
        </div>
      </div>
      
      {/* Blocked overlay */}
      {isBlockedPhase && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(10, 10, 15, ${blockedOverlayOpacity})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: COLORS.bgPanel,
              border: `1px solid ${COLORS.danger}`,
              borderRadius: LAYOUT.borderRadius,
              padding: '40px 60px',
              textAlign: 'center',
              boxShadow: `0 0 60px rgba(239, 68, 68, 0.3)`,
            }}
          >
            <div
              style={{
                fontSize: 48,
                marginBottom: 16,
              }}
            >
              ⏸
            </div>
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes['2xl'],
                fontWeight: TYPOGRAPHY.weights.semibold,
                color: COLORS.danger,
                marginBottom: 12,
              }}
            >
              Context limit reached
            </div>
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.base,
                color: COLORS.textSecondary,
                marginBottom: 24,
              }}
            >
              Compact and summarize to continue...
            </div>
            
            {/* Progress bar */}
            <div
              style={{
                width: 300,
                height: 4,
                background: COLORS.bgElevated,
                borderRadius: 2,
                overflow: 'hidden',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${interpolate(relativeFrame, 160, 209, 10, 45, EASINGS.smooth)}%`,
                  background: COLORS.danger,
                  borderRadius: 2,
                }}
              />
            </div>
            
            <div
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.textMuted,
                marginTop: 12,
              }}
            >
              Compressing 2,143 messages...
            </div>
          </div>
        </div>
      )}
      
      {/* Caption */}
      <div style={{ opacity: captionOpacity }}>
        <Caption
          text="Old way: the main agent hits the limit and stops to compact itself."
          isVisible={true}
        />
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
