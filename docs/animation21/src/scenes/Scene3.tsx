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
import { CaptionLine } from '../components/CaptionLine';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 3: Historian activation (frames 330-599)
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_3_START;
  const sceneEnd = SCENES.SCENE_3_END;
  
  const sceneProgress = getProgress(frame, sceneStart, sceneEnd);
  
  // Usage rises: 68% -> 81% -> 91%
  const usagePercent = interpolate(sceneProgress, [0, 0.5, 1], [68, 81, 91], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Historian activation phases
  const historianPreparing = frame >= sceneStart + 60 && frame < sceneStart + 130;
  const historianActive = frame >= sceneStart + 130;
  
  let historianStatus = "Monitoring context pressure";
  if (historianPreparing) historianStatus = "Preparing background compaction";
  if (historianActive) historianStatus = "Selecting older session history";
  
  // Scroll offset
  const scrollOffset = interpolate(sceneProgress, [0, 1], [0, 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 200, sceneEnd);
  
  return (
    <SessionShell>
      <SessionHeader sessionName="ATHENA" accentColor={COLORS.magicContext.primary} />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, position: 'relative' }}>
        {/* Transcript Pane */}
        <TranscriptPane scrollOffset={scrollOffset}>
          {/* Older content (head) */}
          <div style={{ opacity: 0.6 }}>
            <UserBubble text="Currently we have a new problem..." />
            <AssistantBlock>
              <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                The user is saying that athena-junior can spawn another athena-junior as a sub-agent...
              </p>
            </AssistantBlock>
            <ActionRow icon="🔍" text="Explored 1 read, 2 searches" />
          </div>
          
          {/* Mid content */}
          <AssistantBlock>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard for athena-junior.
            </p>
          </AssistantBlock>
          <ActionRow icon="✏️" text="Edit subagent-resolver.ts" />
          <ActionRow icon="🔧" text="Called lsp_diagnostics" />
          
          {/* Live content (tail) - continues growing */}
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 30, sceneStart + 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              I detect fix intent. Let me trace where sub-agent spawning is gated.
            </p>
          </AssistantBlock>
          
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 80, sceneStart + 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              The issue is clear. A self-recursion guard is missing. I will verify whether the restriction belongs in subagent-resolver.ts.
            </p>
          </AssistantBlock>
          
          <ActionRow 
            icon="✏️" 
            text="Edit subagent-resolver.ts +8 -0"
            opacity={interpolate(frame, [sceneStart + 140, sceneStart + 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          <ActionRow 
            icon="🔧" 
            text="Called lsp_diagnostics"
            opacity={interpolate(frame, [sceneStart + 170, sceneStart + 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 200, sceneStart + 220], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Fix verified. The self-recursion guard is now in place and diagnostics pass.
            </p>
          </AssistantBlock>
          
          <InputBar />
        </TranscriptPane>
        
        {/* Context Inspector */}
        <ContextInspector>
          <ContextStat label="Session" value="ATHENA-2024" />
          <ContextStat label="Provider" value="OpenCode" />
          <ContextStat label="Model" value="claude-sonnet-4" />
          <ContextStat label="Context Limit" value="128K" />
          <ContextStat 
            label="Total Tokens" 
            value={Math.floor(87000 + sceneProgress * 30000).toLocaleString()}
            subvalue={`${usagePercent.toFixed(0)}%`}
            barProgress={usagePercent}
            barColor={usagePercent > 85 ? COLORS.oldWay.secondary : COLORS.magicContext.primary}
          />
          <ContextStat label="Cache Tokens" value="32,450" />
          <ContextStat label="Assistant Messages" value="14" />
          <ContextStat label="User Messages" value="5" />
          
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Context Breakdown</p>
            <ContextBreakdownBar userPercent={18} assistantPercent={48} toolPercent={26} systemPercent={8} />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Raw Messages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <RawMessageRow type="user" content="Currently we have a new problem..." tokens={245} compact />
              <RawMessageRow type="assistant" content="The user is saying that athena-junior..." tokens={1892} compact />
              <RawMessageRow type="tool" content="Explored 1 read, 2 searches" tokens={156} compact />
              <RawMessageRow type="assistant" content="I see the issue. There are guards..." tokens={1245} compact />
              <RawMessageRow type="tool" content="Edit subagent-resolver.ts" tokens={89} compact />
              <RawMessageRow type="tool" content="Called lsp_diagnostics" tokens={67} compact />
              <RawMessageRow type="assistant" content="I detect fix intent..." tokens={1456} compact opacity={0.8} />
              <RawMessageRow type="assistant" content="The issue is clear..." tokens={1234} compact opacity={0.8} />
            </div>
          </div>
        </ContextInspector>
        
        {/* Historian Panel */}
        <HistorianPanel 
          status={historianStatus}
          isActive={historianPreparing || historianActive}
          opacity={1}
          progress={historianActive ? interpolate(frame, [sceneStart + 130, sceneEnd], [0, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0}
        />
      </div>
      
      {/* Caption */}
      <CaptionLine 
        text="Magic Context: before the session blocks, a background Historian starts working."
        opacity={captionOpacity}
        accentColor={COLORS.historian.primary}
      />
    </SessionShell>
  );
};
