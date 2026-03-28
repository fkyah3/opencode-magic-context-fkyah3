import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { SessionShell } from '../components/SessionShell';
import { SessionHeader } from '../components/SessionHeader';
import { TranscriptPane } from '../components/TranscriptPane';
import { UserBubble } from '../components/UserBubble';
import { AssistantBlock } from '../components/AssistantBlock';
import { InputBar } from '../components/InputBar';
import { SidekickPanel } from '../components/SidekickPanel';
import { CaptionLine } from '../components/CaptionLine';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 10: Sidekick (frames 2370-2579)
export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_10_START;
  const sceneEnd = SCENES.SCENE_10_END;
  
  // Phase 1: New session starts (frames 2370-2430)
  const sessionStartProgress = getProgress(frame, sceneStart, sceneStart + 60);
  
  // Phase 2: Sidekick activates (frames 2431-2490)
  const sidekickProgress = getProgress(frame, sceneStart + 61, sceneStart + 120);
  
  // Phase 3: Briefing injected (frames 2491-2545)
  const briefingProgress = getProgress(frame, sceneStart + 121, sceneStart + 175);
  
  // Phase 4: Warm start payoff (frames 2546-2579)
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 150, sceneEnd);
  
  const briefingItems = [
    'Relevant memory found',
    'Prior constraint restored',
    'Previous decisions loaded',
  ];
  
  return (
    <SessionShell>
      <SessionHeader sessionName="ATHENA-NEW" accentColor={COLORS.sidekick.primary} />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, position: 'relative' }}>
        {/* Transcript Pane */}
        <TranscriptPane>
          {/* Empty at first */}
          <div
            style={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1 - sessionStartProgress,
            }}
          >
            <span style={{ fontSize: 14, color: COLORS.textTertiary }}>New session ready</span>
          </div>
          
          {/* User prompt appears */}
          <UserBubble
            text="Continue the auth refactor and preserve the retry behavior."
            opacity={interpolate(frame, [sceneStart + 30, sceneStart + 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          {/* Sidekick briefing card */}
          <div
            style={{
              marginTop: 16,
              marginLeft: 44,
              padding: 16,
              backgroundColor: `${COLORS.sidekick.primary}10`,
              borderRadius: 12,
              border: `1px solid ${COLORS.sidekick.primary}30`,
              opacity: briefingProgress,
              transform: `translateY(${interpolate(briefingProgress, [0, 1], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: COLORS.sidekick.primary, fontWeight: 600 }}>Sidekick Briefing</span>
              <span style={{ fontSize: 11, color: COLORS.textTertiary }}>injected into context</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: COLORS.sidekick.primary }}>✓</span>
                <span style={{ fontSize: 13, color: COLORS.textSecondary }}>Auth refactor in progress</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: COLORS.sidekick.primary }}>✓</span>
                <span style={{ fontSize: 13, color: COLORS.textSecondary }}>Retry behavior: exponential backoff, 3 max</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: COLORS.sidekick.primary }}>✓</span>
                <span style={{ fontSize: 13, color: COLORS.textSecondary }}>Last edited: auth-middleware.ts</span>
              </div>
            </div>
          </div>
          
          {/* Assistant starts with awareness */}
          <AssistantBlock
            opacity={interpolate(frame, [sceneStart + 140, sceneStart + 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          >
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              I'll continue the auth refactor. Based on the previous session, I know we're using exponential backoff with 3 max retries in auth-middleware.ts. Let me verify the current state and continue.
            </p>
          </AssistantBlock>
          
          <InputBar />
        </TranscriptPane>
        
        {/* Sidekick Panel */}
        <SidekickPanel
          isActive={sidekickProgress > 0}
          briefingItems={briefingItems}
          opacity={interpolate(frame, [sceneStart + 80, sceneStart + 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
        />
      </div>
      
      {/* Caption */}
      <CaptionLine 
        text="Sidekick helps new sessions start with the right context already in place."
        opacity={captionOpacity}
        accentColor={COLORS.sidekick.primary}
      />
    </SessionShell>
  );
};
