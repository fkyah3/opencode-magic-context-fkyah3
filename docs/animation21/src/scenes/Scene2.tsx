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
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 2: Split comparison bridge (frames 210-329)
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_2_START;
  const sceneEnd = SCENES.SCENE_2_END;
  
  const sceneProgress = getProgress(frame, sceneStart, sceneEnd);
  
  // Left panel (old way) shrinks and fades
  const leftPanelScale = interpolate(sceneProgress, [0, 0.3], [1, 0.85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftPanelOpacity = interpolate(sceneProgress, [0.2, 0.5], [1, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Right panel (Magic Context) grows
  const rightPanelScale = interpolate(sceneProgress, [0, 0.3], [0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightPanelX = interpolate(sceneProgress, [0, 0.5], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Historian appears
  const historianOpacity = getProgress(frame, sceneStart + 80, sceneEnd);
  
  // Usage for right panel
  const usagePercent = interpolate(sceneProgress, [0, 1], [72, 90], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  return (
    <SessionShell>
      <div style={{ display: 'flex', gap: 24, flex: 1, position: 'relative' }}>
        {/* Left panel - Old Way (frozen) */}
        <div
          style={{
            flex: 1,
            transform: `scale(${leftPanelScale})`,
            opacity: leftPanelOpacity,
            transformOrigin: 'left center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              padding: '4px 12px',
              backgroundColor: `${COLORS.oldWay.secondary}30`,
              borderRadius: 6,
              border: `1px solid ${COLORS.oldWay.secondary}50`,
            }}
          >
            <span style={{ fontSize: 12, color: COLORS.oldWay.secondary, fontWeight: 600 }}>Old Way</span>
          </div>
          
          <SessionHeader sessionName="ATHENA" accentColor={COLORS.oldWay.tertiary} />
          
          <div style={{ display: 'flex', gap: 24, flex: 1 }}>
            <TranscriptPane>
              <UserBubble text="Currently we have a new problem..." opacity={0.5} />
              <AssistantBlock opacity={0.5}>
                <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                  The user is saying that athena-junior can spawn another athena-junior...
                </p>
              </AssistantBlock>
              
              {/* Blocking overlay */}
              <div
                style={{
                  marginTop: 32,
                  padding: 20,
                  backgroundColor: `${COLORS.oldWay.tertiary}15`,
                  borderRadius: 12,
                  border: `1px solid ${COLORS.oldWay.tertiary}40`,
                }}
              >
                <p style={{ margin: 0, fontSize: 14, color: COLORS.oldWay.tertiary }}>⚠️ Context limit reached</p>
                <p style={{ margin: '8px 0 0 0', fontSize: 12, color: COLORS.textTertiary }}>Compacting history...</p>
              </div>
              
              <InputBar disabled opacity={0.5} />
            </TranscriptPane>
            
            <ContextInspector opacity={0.5}>
              <ContextStat label="Usage" value="100%" color={COLORS.oldWay.tertiary} barProgress={100} barColor={COLORS.oldWay.tertiary} />
            </ContextInspector>
          </div>
        </div>
        
        {/* Right panel - Magic Context (active) */}
        <div
          style={{
            flex: 1.2,
            transform: `scale(${rightPanelScale}) translateX(${rightPanelX}px)`,
            transformOrigin: 'right center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '4px 12px',
              backgroundColor: `${COLORS.magicContext.primary}20`,
              borderRadius: 6,
              border: `1px solid ${COLORS.magicContext.primary}40`,
            }}
          >
            <span style={{ fontSize: 12, color: COLORS.magicContext.primary, fontWeight: 600 }}>Magic Context</span>
          </div>
          
          <SessionHeader sessionName="ATHENA" accentColor={COLORS.magicContext.primary} />
          
          <div style={{ display: 'flex', gap: 24, flex: 1, position: 'relative' }}>
            <TranscriptPane>
              <UserBubble text="Currently we have a new problem..." />
              <AssistantBlock>
                <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                  The user is saying that athena-junior can spawn another athena-junior as a sub-agent, which shouldn't be allowed.
                </p>
              </AssistantBlock>
              <ActionRow icon="🔍" text="Explored 1 read, 2 searches" />
              <AssistantBlock>
                <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                  I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard.
                </p>
              </AssistantBlock>
              <ActionRow icon="✏️" text="Edit subagent-resolver.ts" />
              <ActionRow icon="🔧" text="Called lsp_diagnostics" />
              
              {/* New content appearing */}
              <AssistantBlock opacity={interpolate(frame, [sceneStart + 60, sceneStart + 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
                <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                  The fix is clear. A self-recursion guard belongs in subagent-resolver.ts.
                </p>
              </AssistantBlock>
              
              <InputBar />
            </TranscriptPane>
            
            <ContextInspector>
              <ContextStat label="Session" value="ATHENA-2024" />
              <ContextStat label="Context Limit" value="128K" />
              <ContextStat 
                label="Usage" 
                value={`${usagePercent.toFixed(0)}%`}
                barProgress={usagePercent}
                barColor={COLORS.magicContext.primary}
              />
              <ContextStat label="Total Tokens" value="98,432" />
              <ContextStat label="Cache Tokens" value="29,530" />
              
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Context Breakdown</p>
                <ContextBreakdownBar userPercent={20} assistantPercent={45} toolPercent={25} systemPercent={10} />
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
                </div>
              </div>
            </ContextInspector>
            
            {/* Historian panel */}
            <HistorianPanel 
              status="Monitoring context pressure"
              isActive={false}
              opacity={historianOpacity}
            />
          </div>
        </div>
      </div>
    </SessionShell>
  );
};
