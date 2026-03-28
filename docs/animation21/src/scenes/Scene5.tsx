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
import { RawMessageRow } from '../components/RawMessageRow';
import { ContextBreakdownBar } from '../components/ContextBreakdownBar';
import { HistorianPanel } from '../components/HistorianPanel';
import { CompartmentCard } from '../components/CompartmentCard';
import { FactChip } from '../components/FactChip';
import { MemoryCard } from '../components/MemoryCard';
import { CaptionLine } from '../components/CaptionLine';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 5: Historian outputs - compartments, facts, memory (frames 960-1349)
export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_5_START;
  const sceneEnd = SCENES.SCENE_5_END;
  
  // Scene progress tracking for animations
  
  // Phase 1: Compartments (frames 960-1030)
  const compartmentsProgress = getProgress(frame, sceneStart, sceneStart + 70);
  
  // Phase 2: Facts (frames 1031-1130)
  const factsProgress = getProgress(frame, sceneStart + 71, sceneStart + 170);
  
  // Phase 3: Memory (frames 1131-1235)
  const memoryProgress = getProgress(frame, sceneStart + 171, sceneStart + 275);
  
  // Phase 4: Hold all three (frames 1236-1349)
  const holdProgress = getProgress(frame, sceneStart + 276, sceneEnd);
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 300, sceneEnd);
  
  return (
    <SessionShell>
      <SessionHeader sessionName="ATHENA" accentColor={COLORS.magicContext.primary} />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, position: 'relative' }}>
        {/* Transcript Pane - showing live session */}
        <TranscriptPane scrollOffset={150}>
          <div style={{ opacity: 0.5 }}>
            <UserBubble text="Currently we have a new problem..." />
            <AssistantBlock>
              <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                The user is saying that athena-junior can spawn another athena-junior...
              </p>
            </AssistantBlock>
          </div>
          
          <AssistantBlock>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              I see the issue. There are guards for plan-family recursion...
            </p>
          </AssistantBlock>
          
          <AssistantBlock>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Fix verified. The self-recursion guard is now in place.
            </p>
          </AssistantBlock>
          
          <ActionRow icon="✏️" text="Edit subagent-resolver.ts +8 -0" />
          <ActionRow icon="🔧" text="Called lsp_diagnostics" />
          
          <InputBar />
        </TranscriptPane>
        
        {/* Context Inspector */}
        <ContextInspector>
          <ContextStat label="Session" value="ATHENA-2024" />
          <ContextStat label="Context Limit" value="128K" />
          <ContextStat label="Usage" value="91%" barProgress={91} barColor={COLORS.magicContext.primary} />
          <ContextStat label="Total Tokens" value="116,480" />
          
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Context Breakdown</p>
            <ContextBreakdownBar userPercent={16} assistantPercent={50} toolPercent={28} systemPercent={6} />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Raw Messages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <RawMessageRow type="assistant" content="I see the issue..." tokens={1245} compact opacity={0.5} />
              <RawMessageRow type="tool" content="Edit subagent-resolver.ts" tokens={89} compact />
              <RawMessageRow type="assistant" content="Fix verified..." tokens={892} compact />
            </div>
          </div>
        </ContextInspector>
        
        {/* Historian outputs overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 560,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Compartments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              style={{
                fontSize: 11,
                color: COLORS.historian.primary,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                opacity: compartmentsProgress,
              }}
            >
              Compartments
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <CompartmentCard
                title="Recursion investigation"
                summary="Analyzed athena-junior self-spawning issue and identified missing guard"
                messageCount={4}
                opacity={interpolate(frame, [sceneStart, sceneStart + 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart, sceneStart + 30], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                compact
              />
              <CompartmentCard
                title="Delegation guard analysis"
                summary="Reviewed existing recursion guards and determined correct placement"
                messageCount={3}
                opacity={interpolate(frame, [sceneStart + 20, sceneStart + 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 20, sceneStart + 50], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                compact
              />
              <CompartmentCard
                title="Self-recursion fix"
                summary="Implemented guard in subagent-resolver.ts and verified with diagnostics"
                messageCount={5}
                opacity={interpolate(frame, [sceneStart + 40, sceneStart + 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 40, sceneStart + 70], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                compact
              />
            </div>
          </div>
          
          {/* Facts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <div
              style={{
                fontSize: 11,
                color: COLORS.historian.secondary,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                opacity: factsProgress,
              }}
            >
              Session Facts
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <FactChip
                text="athena-junior should not spawn itself"
                opacity={interpolate(frame, [sceneStart + 71, sceneStart + 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 71, sceneStart + 100], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
              <FactChip
                text="guard belongs in subagent-resolver.ts"
                opacity={interpolate(frame, [sceneStart + 90, sceneStart + 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 90, sceneStart + 120], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
              <FactChip
                text="plan-family recursion already blocked"
                opacity={interpolate(frame, [sceneStart + 110, sceneStart + 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 110, sceneStart + 140], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
              <FactChip
                text="suggest category-based delegation"
                opacity={interpolate(frame, [sceneStart + 130, sceneStart + 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 130, sceneStart + 160], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
            </div>
          </div>
          
          {/* Memory */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <div
              style={{
                fontSize: 11,
                color: COLORS.sidekick.primary,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                opacity: memoryProgress,
              }}
            >
              Memory
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <MemoryCard
                title="Agent constraint: prevent self-recursion"
                content="athena-junior must not spawn itself as a sub-agent"
                opacity={interpolate(frame, [sceneStart + 171, sceneStart + 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 171, sceneStart + 210], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
              <MemoryCard
                title="Delegation rule: category-based alternative"
                content="Use category-based delegation instead of self-recursion"
                opacity={interpolate(frame, [sceneStart + 200, sceneStart + 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 200, sceneStart + 240], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
              <MemoryCard
                title="Architecture note: guard at subagent resolver"
                content="Self-recursion guards belong in subagent-resolver.ts"
                opacity={interpolate(frame, [sceneStart + 230, sceneStart + 275], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
                scale={interpolate(frame, [sceneStart + 230, sceneStart + 275], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
            </div>
          </div>
        </div>
        
        {/* Historian Panel */}
        <HistorianPanel 
          status="Extracting durable facts"
          isActive={true}
          progress={80 + holdProgress * 20}
        />
      </div>
      
      {/* Caption */}
      <CaptionLine 
        text="Old session weight becomes structured context: compartments, facts, and memory."
        opacity={captionOpacity}
        accentColor={COLORS.historian.primary}
      />
    </SessionShell>
  );
};
