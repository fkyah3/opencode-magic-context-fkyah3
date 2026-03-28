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
import { CaptionLine } from '../components/CaptionLine';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 1: Old way - full-screen session pain (frames 0-209)
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_1_START;
  const sceneEnd = SCENES.SCENE_1_END;
  
  // Calculate progress through scene
  const sceneProgress = getProgress(frame, sceneStart, sceneEnd);
  
  // Scene phases for reference:
  // Phase 1: Active session growth (frames 0-50)
  // Phase 2: Pressure rises (frames 51-110)
  // Phase 3: Hard pressure (frames 111-145)
  // Phase 4: Blocking moment (frames 146-160)
  // Phase 5: Compaction (frames 161-209)
  
  // Usage percentage animation: 34% -> 55% -> 76% -> 88% -> 94% -> 97% -> 99% -> 100%
  let usagePercent = 34;
  if (frame <= sceneStart + 50) {
    usagePercent = interpolate(frame, [sceneStart, sceneStart + 50], [34, 55], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame <= sceneStart + 110) {
    usagePercent = interpolate(frame, [sceneStart + 51, sceneStart + 110], [55, 88], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame <= sceneStart + 145) {
    usagePercent = interpolate(frame, [sceneStart + 111, sceneStart + 145], [88, 99], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else {
    usagePercent = 100;
  }
  
  // Total tokens animation
  const totalTokens = Math.floor(interpolate(sceneProgress, [0, 1], [8500, 128000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));
  
  // Scroll offset for transcript
  const scrollOffset = interpolate(sceneProgress, [0, 1], [0, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 180, sceneEnd);
  
  // Blocking overlay opacity
  const blockingOpacity = getProgress(frame, sceneStart + 146, sceneStart + 160);
  
  // Compaction progress
  const compactionProgress = getProgress(frame, sceneStart + 161, sceneEnd);
  
  return (
    <SessionShell dimmed={blockingOpacity > 0}>
      <SessionHeader 
        sessionName="ATHENA" 
        accentColor={usagePercent >= 100 ? COLORS.oldWay.tertiary : COLORS.magicContext.primary}
      />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, overflow: 'hidden' }}>
        {/* Transcript Pane */}
        <TranscriptPane scrollOffset={scrollOffset}>
          {/* User prompt - visible from start */}
          <UserBubble 
            text="Currently we have a new problem, athena-junior is able to spawn another athena-junior inside which normally shouldn't happen"
            opacity={1}
          />
          
          {/* Assistant reasoning - fades in at frame 10 */}
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 10, sceneStart + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              The user is saying that athena-junior can spawn another athena-junior as a sub-agent, which shouldn't be allowed. Let me investigate where task delegation is enforced.
            </p>
          </AssistantBlock>
          
          {/* Action row - fades in at frame 25 */}
          <ActionRow 
            icon="🔍" 
            text="Explored 1 read, 2 searches"
            opacity={interpolate(frame, [sceneStart + 25, sceneStart + 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          {/* Assistant block - fades in at frame 40 */}
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 40, sceneStart + 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard for athena-junior.
            </p>
          </AssistantBlock>
          
          {/* Action rows - fade in during phase 2 */}
          <ActionRow 
            icon="✏️" 
            text="Edit subagent-resolver.ts"
            opacity={interpolate(frame, [sceneStart + 60, sceneStart + 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          <ActionRow 
            icon="🔧" 
            text="Called lsp_diagnostics"
            opacity={interpolate(frame, [sceneStart + 75, sceneStart + 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          {/* More content during phase 2 */}
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 90, sceneStart + 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              The fix is clear. A self-recursion guard belongs in subagent-resolver.ts. I'll add a check to prevent athena-junior from spawning itself.
            </p>
          </AssistantBlock>
          
          {/* Additional content */}
          <ActionRow 
            icon="✏️" 
            text="Edit subagent-resolver.ts +12 -0"
            opacity={interpolate(frame, [sceneStart + 105, sceneStart + 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
          
          <AssistantBlock opacity={interpolate(frame, [sceneStart + 120, sceneStart + 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Guard added. Now verifying the fix with diagnostics and testing the delegation flow.
            </p>
          </AssistantBlock>
          
          {/* Blocking state content */}
          {frame >= sceneStart + 146 && (
            <div
              style={{
                marginTop: 32,
                padding: 24,
                backgroundColor: `${COLORS.oldWay.tertiary}15`,
                borderRadius: 12,
                border: `1px solid ${COLORS.oldWay.tertiary}40`,
                opacity: blockingOpacity,
              }}
            >
              <p style={{ margin: 0, fontSize: 16, color: COLORS.oldWay.tertiary, fontWeight: 600 }}>
                ⚠️ Context limit reached
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: 14, color: COLORS.textSecondary }}>
                Compacting history...
              </p>
              
              {/* Compaction progress */}
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: COLORS.textTertiary }}>Summarizing previous steps</span>
                  <span style={{ fontSize: 12, color: COLORS.textTertiary }}>{Math.floor(compactionProgress * 33)}%</span>
                </div>
                <div style={{ height: 3, backgroundColor: COLORS.bgTertiary, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${compactionProgress * 33}%`, backgroundColor: COLORS.oldWay.secondary, borderRadius: 2 }} />
                </div>
              </div>
              
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: COLORS.textTertiary }}>Rebuilding session context</span>
                  <span style={{ fontSize: 12, color: COLORS.textTertiary }}>{Math.floor(compactionProgress * 20)}%</span>
                </div>
                <div style={{ height: 3, backgroundColor: COLORS.bgTertiary, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${compactionProgress * 20}%`, backgroundColor: COLORS.oldWay.secondary, borderRadius: 2 }} />
                </div>
              </div>
              
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: COLORS.textTertiary }}>Compressing raw history</span>
                  <span style={{ fontSize: 12, color: COLORS.textTertiary }}>{Math.floor(compactionProgress * 15)}%</span>
                </div>
                <div style={{ height: 3, backgroundColor: COLORS.bgTertiary, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${compactionProgress * 15}%`, backgroundColor: COLORS.oldWay.secondary, borderRadius: 2 }} />
                </div>
              </div>
            </div>
          )}
          
          <InputBar disabled={frame >= sceneStart + 146} opacity={0.7} />
        </TranscriptPane>
        
        {/* Context Inspector */}
        <ContextInspector>
          <ContextStat 
            label="Session" 
            value="ATHENA-2024" 
          />
          <ContextStat 
            label="Provider" 
            value="OpenCode" 
          />
          <ContextStat 
            label="Model" 
            value="claude-sonnet-4" 
          />
          <ContextStat 
            label="Context Limit" 
            value="128K" 
          />
          <ContextStat 
            label="Total Tokens" 
            value={totalTokens.toLocaleString()} 
            subvalue={`${usagePercent.toFixed(0)}%`}
            color={usagePercent >= 90 ? COLORS.oldWay.tertiary : usagePercent >= 70 ? COLORS.oldWay.secondary : COLORS.textPrimary}
            pulse={usagePercent >= 95}
            barProgress={usagePercent}
            barColor={usagePercent >= 90 ? COLORS.oldWay.tertiary : usagePercent >= 70 ? COLORS.oldWay.secondary : COLORS.magicContext.primary}
          />
          <ContextStat 
            label="Cache Tokens" 
            value={Math.floor(totalTokens * 0.3).toLocaleString()} 
          />
          <ContextStat 
            label="Assistant Messages" 
            value={Math.floor(8 + sceneProgress * 12)} 
          />
          <ContextStat 
            label="User Messages" 
            value={Math.floor(3 + sceneProgress * 4)} 
          />
          
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Context Breakdown</p>
            <ContextBreakdownBar 
              userPercent={20}
              assistantPercent={45}
              toolPercent={25}
              systemPercent={10}
            />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Raw Messages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <RawMessageRow type="user" content="Currently we have a new problem..." tokens={245} compact />
              <RawMessageRow type="assistant" content="The user is saying that athena-junior..." tokens={1892} compact />
              <RawMessageRow type="tool" content="Explored 1 read, 2 searches" tokens={156} compact />
              <RawMessageRow type="assistant" content="I see the issue. There are guards..." tokens={1245} compact />
              <RawMessageRow type="tool" content="Edit subagent-resolver.ts" tokens={89} compact opacity={frame >= sceneStart + 60 ? 1 : 0.3} />
              <RawMessageRow type="tool" content="Called lsp_diagnostics" tokens={67} compact opacity={frame >= sceneStart + 75 ? 1 : 0.3} />
              {frame >= sceneStart + 90 && (
                <RawMessageRow type="assistant" content="The fix is clear. A self-recursion guard..." tokens={1456} compact />
              )}
              {frame >= sceneStart + 105 && (
                <RawMessageRow type="tool" content="Edit subagent-resolver.ts +12 -0" tokens={134} compact />
              )}
            </div>
          </div>
        </ContextInspector>
      </div>
      
      {/* Caption */}
      <CaptionLine 
        text="Old way: the main agent hits the limit and stops to compact itself."
        opacity={captionOpacity}
        accentColor={COLORS.oldWay.secondary}
      />
    </SessionShell>
  );
};
