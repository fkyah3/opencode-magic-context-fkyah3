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

// Scene 4: Hero shot - Historian takes from head while tail keeps growing (frames 600-959)
export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_4_START;
  const sceneEnd = SCENES.SCENE_4_END;
  
  const sceneProgress = getProgress(frame, sceneStart, sceneEnd);
  
  // Phase 1: Selecting older region (frames 600-660)
  const selectingProgress = getProgress(frame, sceneStart, sceneStart + 60);
  
  // Phase 2: Pulling material out (frames 661-760)
  const pullingProgress = getProgress(frame, sceneStart + 61, sceneStart + 160);
  
  // Phase 3: Processing (frames 761-860)
  const processingProgress = getProgress(frame, sceneStart + 161, sceneStart + 260);
  
  // Phase 4: Hold on architecture (frames 861-959)
  const holdProgress = getProgress(frame, sceneStart + 261, sceneEnd);
  
  // Historian status
  let historianStatus = "Selecting older session history";
  let historianProgress = 0;
  if (pullingProgress > 0) {
    historianStatus = "Tracing related raw messages";
    historianProgress = pullingProgress * 40;
  }
  if (processingProgress > 0) {
    historianStatus = "Compartmentalizing session history";
    historianProgress = 40 + processingProgress * 40;
  }
  if (holdProgress > 0) {
    historianStatus = "Extracting durable facts";
    historianProgress = 80 + holdProgress * 20;
  }
  
  // Highlight opacity for older transcript region
  const headHighlightOpacity = selectingProgress > 0 && pullingProgress < 1 
    ? 0.3 + Math.sin(frame * 0.1) * 0.1 
    : pullingProgress >= 1 ? 0.1 : 0;
  
  // Raw message highlight
  const rawMessageHighlight = selectingProgress > 0;
  
  // Scroll offset - continues scrolling as new content arrives
  const scrollOffset = interpolate(sceneProgress, [0, 1], [100, 300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 300, sceneEnd);
  
  return (
    <SessionShell>
      <SessionHeader sessionName="ATHENA" accentColor={COLORS.magicContext.primary} />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, position: 'relative' }}>
        {/* Transcript Pane */}
        <TranscriptPane scrollOffset={scrollOffset}>
          {/* HEAD - Older content being selected by Historian */}
          <div 
            style={{ 
              position: 'relative',
              padding: 12,
              backgroundColor: `rgba(99, 102, 241, ${headHighlightOpacity})`,
              borderRadius: 12,
              border: `2px solid rgba(99, 102, 241, ${headHighlightOpacity * 2})`,
              transform: pullingProgress > 0 ? `translateY(-${pullingProgress * 20}px) scale(${1 - pullingProgress * 0.05})` : 'none',
              opacity: pullingProgress > 0 ? 1 - pullingProgress * 0.3 : 1,
            }}
          >
            {selectingProgress > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: -24,
                  left: 0,
                  padding: '4px 12px',
                  backgroundColor: COLORS.historian.primary,
                  borderRadius: 6,
                  fontSize: 11,
                  color: 'white',
                  fontWeight: 600,
                  opacity: selectingProgress,
                }}
              >
                Selected history range
              </div>
            )}
            
            <UserBubble text="Currently we have a new problem..." opacity={0.7} />
            <AssistantBlock opacity={0.7}>
              <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                The user is saying that athena-junior can spawn another athena-junior as a sub-agent...
              </p>
            </AssistantBlock>
            <ActionRow icon="🔍" text="Explored 1 read, 2 searches" opacity={0.7} />
          </div>
          
          {/* MID content */}
          <AssistantBlock>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard.
            </p>
          </AssistantBlock>
          <ActionRow icon="✏️" text="Edit subagent-resolver.ts" />
          
          {/* TAIL - Live content continuing to grow */}
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 50, sceneStart + 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              I detect fix intent. Let me trace where sub-agent spawning is gated.
            </p>
          </AssistantBlock>
          
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 100, sceneStart + 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              The issue is clear. A self-recursion guard is missing.
            </p>
          </AssistantBlock>
          
          <ActionRow 
            icon="✏️" 
            text="Edit subagent-resolver.ts +8 -0"
            opacity={interpolate(frame, [sceneStart + 150, sceneStart + 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 200, sceneStart + 220], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Fix verified. The self-recursion guard is now in place.
            </p>
          </AssistantBlock>
          
          <ActionRow 
            icon="🔧" 
            text="Called lsp_diagnostics"
            opacity={interpolate(frame, [sceneStart + 240, sceneStart + 260], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          {/* New content appearing while Historian works */}
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 280, sceneStart + 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Diagnostics pass. The fix is complete and ready for review.
            </p>
          </AssistantBlock>
          
          <InputBar />
        </TranscriptPane>
        
        {/* Context Inspector */}
        <ContextInspector>
          <ContextStat label="Session" value="ATHENA-2024" />
          <ContextStat label="Context Limit" value="128K" />
          <ContextStat 
            label="Usage" 
            value="91%"
            barProgress={91}
            barColor={COLORS.oldWay.secondary}
          />
          <ContextStat label="Total Tokens" value="116,480" />
          
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Context Breakdown</p>
            <ContextBreakdownBar userPercent={16} assistantPercent={50} toolPercent={28} systemPercent={6} />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Raw Messages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <RawMessageRow 
                type="user" 
                content="Currently we have a new problem..." 
                tokens={245} 
                compact 
                highlighted={rawMessageHighlight}
                opacity={pullingProgress > 0 ? 0.5 : 1}
              />
              <RawMessageRow 
                type="assistant" 
                content="The user is saying that athena-junior..." 
                tokens={1892} 
                compact 
                highlighted={rawMessageHighlight}
                opacity={pullingProgress > 0 ? 0.5 : 1}
              />
              <RawMessageRow type="tool" content="Explored 1 read, 2 searches" tokens={156} compact />
              <RawMessageRow type="assistant" content="I see the issue. There are guards..." tokens={1245} compact />
              <RawMessageRow type="tool" content="Edit subagent-resolver.ts" tokens={89} compact />
            </div>
          </div>
        </ContextInspector>
        
        {/* Historian Panel */}
        <HistorianPanel 
          status={historianStatus}
          isActive={true}
          progress={historianProgress}
        />
      </div>
      
      {/* Caption */}
      <CaptionLine 
        text="Historian rewrites the head. The live session keeps moving on the tail."
        opacity={captionOpacity}
        accentColor={COLORS.historian.primary}
      />
    </SessionShell>
  );
};
