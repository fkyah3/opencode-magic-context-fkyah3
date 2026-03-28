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
import { CaptionLine } from '../components/CaptionLine';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 6: Payoff - pressure drops, flow stays intact (frames 1350-1559)
export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_6_START;
  const sceneEnd = SCENES.SCENE_6_END;
  
  const sceneProgress = getProgress(frame, sceneStart, sceneEnd);
  
  // Usage drops from 91% to 56%
  const usagePercent = interpolate(sceneProgress, [0, 0.5], [91, 56], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 150, sceneEnd);
  
  return (
    <SessionShell>
      <SessionHeader sessionName="ATHENA" accentColor={COLORS.magicContext.primary} />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, position: 'relative' }}>
        {/* Transcript Pane */}
        <TranscriptPane scrollOffset={200}>
          <div style={{ opacity: 0.4 }}>
            <UserBubble text="Currently we have a new problem..." />
          </div>
          
          <AssistantBlock opacity={0.6}>
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
          
          {/* New content showing session continued */}
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 50, sceneStart + 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Diagnostics pass. The fix is complete and ready for review.
            </p>
          </AssistantBlock>
          
          <ActionRow 
            icon="✅" 
            text="Task completed successfully"
            opacity={interpolate(frame, [sceneStart + 100, sceneStart + 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          <InputBar />
        </TranscriptPane>
        
        {/* Context Inspector */}
        <ContextInspector>
          <ContextStat label="Session" value="ATHENA-2024" />
          <ContextStat label="Context Limit" value="128K" />
          <ContextStat 
            label="Usage" 
            value={`${usagePercent.toFixed(0)}%`}
            color={COLORS.success}
            barProgress={usagePercent}
            barColor={COLORS.success}
          />
          <ContextStat label="Total Tokens" value={Math.floor(116480 - sceneProgress * 45000).toLocaleString()} />
          <ContextStat label="Cache Tokens" value="32,450" />
          
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Context Breakdown</p>
            <ContextBreakdownBar userPercent={20} assistantPercent={42} toolPercent={26} systemPercent={12} />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Raw Messages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <RawMessageRow type="assistant" content="I see the issue..." tokens={1245} compact opacity={0.5} />
              <RawMessageRow type="assistant" content="Fix verified..." tokens={892} compact />
              <RawMessageRow type="tool" content="Edit subagent-resolver.ts +8 -0" tokens={134} compact />
              <RawMessageRow type="tool" content="Called lsp_diagnostics" tokens={67} compact />
            </div>
          </div>
          
          {/* Compartments summary */}
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Compartments</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <CompartmentCard
                title="Recursion investigation"
                summary="Analyzed athena-junior self-spawning issue"
                messageCount={4}
                compact
                opacity={0.8}
                scale={1}
              />
              <CompartmentCard
                title="Self-recursion fix"
                summary="Implemented guard in subagent-resolver.ts"
                messageCount={5}
                compact
                opacity={0.8}
                scale={1}
              />
            </div>
          </div>
        </ContextInspector>
        
        {/* Historian Panel - idle */}
        <HistorianPanel 
          status="Compaction complete"
          isActive={false}
          opacity={0.7}
        />
      </div>
      
      {/* Caption */}
      <CaptionLine 
        text="The main agent never stopped. Flow stayed intact."
        opacity={captionOpacity}
        accentColor={COLORS.success}
      />
    </SessionShell>
  );
};
