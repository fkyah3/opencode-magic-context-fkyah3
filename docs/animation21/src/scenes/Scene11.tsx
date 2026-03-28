import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { SessionShell } from '../components/SessionShell';
import { SessionHeader } from '../components/SessionHeader';
import { TranscriptPane } from '../components/TranscriptPane';
import { UserBubble } from '../components/UserBubble';
import { AssistantBlock } from '../components/AssistantBlock';
import { ActionRow } from '../components/ActionRow';
import { InputBar } from '../components/InputBar';
import { ContextInspector } from '../components/ContextInspector';
import { ContextStat } from '../components/ContextStat';
import { ContextBreakdownBar } from '../components/ContextBreakdownBar';
import { HistorianPanel } from '../components/HistorianPanel';
import { CompartmentCard } from '../components/CompartmentCard';
import { MemoryCard } from '../components/MemoryCard';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 11: Final payoff / end card (frames 2580-2729)
export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_11_START;
  const sceneEnd = SCENES.SCENE_11_END;
  
  // Scene progress tracking
  
  // Assembly animation
  const assemblyProgress = getProgress(frame, sceneStart, sceneStart + 60);
  
  // Text reveal
  const textProgress = getProgress(frame, sceneStart + 80, sceneEnd);
  
  return (
    <SessionShell>
      <SessionHeader sessionName="ATHENA" accentColor={COLORS.magicContext.primary} />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, position: 'relative', opacity: 0.7 + assemblyProgress * 0.3 }}>
        {/* Transcript Pane */}
        <TranscriptPane scrollOffset={100}>
          <UserBubble text="Currently we have a new problem..." opacity={0.5} />
          
          <AssistantBlock opacity={0.7}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              I see the issue. There are guards for plan-family recursion...
            </p>
          </AssistantBlock>
          
          <ActionRow icon="✏️" text="Edit subagent-resolver.ts +8 -0" />
          
          <AssistantBlock>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Fix verified. The self-recursion guard is now in place.
            </p>
          </AssistantBlock>
          
          <InputBar />
        </TranscriptPane>
        
        {/* Context Inspector */}
        <ContextInspector>
          <ContextStat label="Session" value="ATHENA-2024" />
          <ContextStat label="Usage" value="56%" barProgress={56} barColor={COLORS.success} />
          <ContextStat label="Total Tokens" value="71,680" />
          
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Context Breakdown</p>
            <ContextBreakdownBar userPercent={20} assistantPercent={45} toolPercent={25} systemPercent={10} />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Compartments</p>
            <CompartmentCard
              title="Self-recursion fix"
              summary="Complete resolution workflow"
              messageCount={14}
              compact
              opacity={0.8}
            />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Memory</p>
            <MemoryCard
              title="Agent constraint: prevent self-recursion"
              content="athena-junior must not spawn itself"
              opacity={0.8}
            />
          </div>
        </ContextInspector>
        
        {/* Historian Panel - subtle presence */}
        <HistorianPanel 
          status="Monitoring"
          isActive={false}
          opacity={0.5}
        />
      </div>
      
      {/* Final text overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `rgba(10, 10, 15, ${interpolate(textProgress, [0, 0.3], [0, 0.85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
          opacity: textProgress,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: 42,
              fontWeight: 600,
              color: COLORS.textPrimary,
              margin: '0 0 16px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Keep the main agent in flow.
          </p>
          <p
            style={{
              fontSize: 42,
              fontWeight: 600,
              color: COLORS.magicContext.primary,
              margin: '0 0 48px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Let Magic Context handle the past.
          </p>
          
          <div
            style={{
              display: 'flex',
              gap: 32,
              justifyContent: 'center',
              marginBottom: 48,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: COLORS.textTertiary, margin: '0 0 4px 0' }}>Background compaction</p>
              <p style={{ fontSize: 14, color: COLORS.historian.primary, margin: 0, fontWeight: 600 }}>Historian</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: COLORS.textTertiary, margin: '0 0 4px 0' }}>Structured memory</p>
              <p style={{ fontSize: 14, color: COLORS.sidekick.primary, margin: 0, fontWeight: 600 }}>Compartments + Facts</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: COLORS.textTertiary, margin: '0 0 4px 0' }}>Better continuity</p>
              <p style={{ fontSize: 14, color: COLORS.dreamer.primary, margin: 0, fontWeight: 600 }}>Dreamer + Sidekick</p>
            </div>
          </div>
          
          {/* Product wordmark */}
          <div
            style={{
              padding: '16px 32px',
              backgroundColor: `${COLORS.magicContext.primary}15`,
              borderRadius: 8,
              border: `1px solid ${COLORS.magicContext.primary}30`,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: COLORS.magicContext.primary,
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
              }}
            >
              opencode-magic-context
            </span>
          </div>
        </div>
      </div>
    </SessionShell>
  );
};
