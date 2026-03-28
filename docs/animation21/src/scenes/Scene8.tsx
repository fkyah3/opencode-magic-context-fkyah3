import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { SessionShell } from '../components/SessionShell';
import { SessionHeader } from '../components/SessionHeader';
import { TranscriptPane } from '../components/TranscriptPane';
import { AssistantBlock } from '../components/AssistantBlock';
import { ActionRow } from '../components/ActionRow';
import { InputBar } from '../components/InputBar';
import { ContextInspector } from '../components/ContextInspector';
import { ContextStat } from '../components/ContextStat';
import { RawMessageRow } from '../components/RawMessageRow';
import { ContextBreakdownBar } from '../components/ContextBreakdownBar';
import { QueueBadge } from '../components/QueueBadge';
import { CaptionLine } from '../components/CaptionLine';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 8: Cache awareness (frames 1830-2099)
export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_8_START;
  const sceneEnd = SCENES.SCENE_8_END;
  
  // Phase 1: Queued reductions (frames 1830-1900)
  const queuedProgress = getProgress(frame, sceneStart, sceneStart + 70);
  
  // Phase 2: Preserving cache (frames 1901-1980)
  const preservingProgress = getProgress(frame, sceneStart + 71, sceneStart + 150);
  
  // Phase 3: Trigger and apply (frames 1981-2050)
  const applyProgress = getProgress(frame, sceneStart + 151, sceneStart + 220);
  
  // Phase 4: Result (frames 2051-2099)
  const resultProgress = getProgress(frame, sceneStart + 221, sceneEnd);
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 200, sceneEnd);
  
  return (
    <SessionShell>
      <SessionHeader sessionName="ATHENA" accentColor={COLORS.magicContext.primary} />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, position: 'relative' }}>
        {/* Transcript Pane */}
        <TranscriptPane scrollOffset={100}>
          <AssistantBlock>
            <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Working on the authentication refactor...
            </p>
          </AssistantBlock>
          
          <ActionRow icon="🔍" text="Explored 3 reads, 4 searches" />
          
          {/* Queued items appearing */}
          <div
            style={{
              marginTop: 16,
              padding: 16,
              backgroundColor: `${COLORS.oldWay.primary}08`,
              borderRadius: 12,
              border: `1px dashed ${COLORS.oldWay.primary}40`,
              opacity: queuedProgress,
            }}
          >
            <p style={{ fontSize: 12, color: COLORS.oldWay.primary, margin: '0 0 12px 0', fontWeight: 600 }}>
              Queued Reductions
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 8,
                  backgroundColor: applyProgress > 0 ? 'transparent' : `${COLORS.bgCard}`,
                  borderRadius: 6,
                  opacity: applyProgress > 0 ? 0.3 : 1,
                  transform: applyProgress > 0 ? 'translateX(-20px)' : 'none',
                  transition: 'all 0.5s ease',
                }}
              >
                <span style={{ fontSize: 13, color: COLORS.textSecondary }}>old investigation trace</span>
                <QueueBadge count={1} label="queued" />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 8,
                  backgroundColor: applyProgress > 0 ? 'transparent' : `${COLORS.bgCard}`,
                  borderRadius: 6,
                  opacity: applyProgress > 0 ? 0.3 : 1,
                  transform: applyProgress > 0 ? 'translateX(-20px)' : 'none',
                  transition: 'all 0.5s ease 0.1s',
                }}
              >
                <span style={{ fontSize: 13, color: COLORS.textSecondary }}>stale scratch context</span>
                <QueueBadge count={2} label="queued" />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 8,
                  backgroundColor: applyProgress > 0 ? 'transparent' : `${COLORS.bgCard}`,
                  borderRadius: 6,
                  opacity: applyProgress > 0 ? 0.3 : 1,
                  transform: applyProgress > 0 ? 'translateX(-20px)' : 'none',
                  transition: 'all 0.5s ease 0.2s',
                }}
              >
                <span style={{ fontSize: 13, color: COLORS.textSecondary }}>temporary diagnostics</span>
                <QueueBadge count={3} label="queued" />
              </div>
            </div>
          </div>
          
          {/* Cache preservation notice */}
          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: `${COLORS.magicContext.primary}10`,
              borderRadius: 8,
              border: `1px solid ${COLORS.magicContext.primary}30`,
              opacity: preservingProgress,
            }}
          >
            <p style={{ fontSize: 12, color: COLORS.magicContext.primary, margin: 0 }}>
              ✓ Preserving cache efficiency — waiting for optimal apply point
            </p>
          </div>
          
          {/* Trigger condition */}
          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: `${COLORS.success}15`,
              borderRadius: 8,
              border: `1px solid ${COLORS.success}40`,
              opacity: applyProgress,
            }}
          >
            <p style={{ fontSize: 12, color: COLORS.success, margin: 0, fontWeight: 600 }}>
              ✓ Cache TTL expired — applying queued reductions
            </p>
          </div>
          
          <ActionRow 
            icon="✏️" 
            text="Edit auth-middleware.ts +24 -8"
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
            value={`${interpolate(resultProgress, [0, 1], [78, 65], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }).toFixed(0)}%`}
            barProgress={interpolate(resultProgress, [0, 1], [78, 65], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            barColor={COLORS.success}
          />
          <ContextStat label="Total Tokens" value="99,840" />
          <ContextStat label="Cache Tokens" value={interpolate(resultProgress, [0, 1], [42000, 35000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }).toLocaleString()} />
          
          <div style={{ marginTop: 8 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Context Breakdown</p>
            <ContextBreakdownBar userPercent={22} assistantPercent={44} toolPercent={24} systemPercent={10} />
          </div>
          
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Raw Messages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <RawMessageRow type="assistant" content="Working on the authentication refactor..." tokens={1456} compact />
              <RawMessageRow type="tool" content="Explored 3 reads, 4 searches" tokens={234} compact />
              <RawMessageRow 
                type="tool" 
                content="Edit auth-middleware.ts +24 -8" 
                tokens={189} 
                compact 
                opacity={interpolate(frame, [sceneStart + 100, sceneStart + 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
              />
            </div>
          </div>
          
          {/* Cache status */}
          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: preservingProgress > 0 ? `${COLORS.magicContext.primary}10` : 'transparent',
              borderRadius: 8,
              border: preservingProgress > 0 ? `1px solid ${COLORS.magicContext.primary}30` : 'none',
              opacity: preservingProgress,
            }}
          >
            <p style={{ fontSize: 11, color: COLORS.textTertiary, margin: '0 0 4px 0' }}>Cache Status</p>
            <p style={{ fontSize: 12, color: COLORS.magicContext.primary, margin: 0, fontWeight: 600 }}>
              Active — deferring reductions
            </p>
          </div>
        </ContextInspector>
      </div>
      
      {/* Caption */}
      <CaptionLine 
        text="Cache-aware reductions: queue first, apply when timing actually makes sense."
        opacity={captionOpacity}
        accentColor={COLORS.magicContext.primary}
      />
    </SessionShell>
  );
};
