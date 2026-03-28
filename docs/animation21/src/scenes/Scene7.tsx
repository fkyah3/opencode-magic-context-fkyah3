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
import { CompartmentCard } from '../components/CompartmentCard';
import { CaptionLine } from '../components/CaptionLine';
import { COLORS, SCENES, getProgress } from '../constants';

// Scene 7: Long-session sustainability - compartment merging (frames 1560-1829)
export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneStart = SCENES.SCENE_7_START;
  const sceneEnd = SCENES.SCENE_7_END;
  
  // Scene progress tracking for animations
  
  // History budget indicator
  const budgetWarningProgress = getProgress(frame, sceneStart + 80, sceneStart + 160);
  
  // Compartment merging
  const mergingProgress = getProgress(frame, sceneStart + 160, sceneStart + 260);
  
  // Caption opacity
  const captionOpacity = getProgress(frame, sceneStart + 220, sceneEnd);
  
  return (
    <SessionShell>
      <SessionHeader sessionName="ATHENA-LONG" accentColor={COLORS.magicContext.primary} />
      
      <div style={{ display: 'flex', gap: 32, flex: 1, position: 'relative' }}>
        {/* Transcript Pane - showing older compartments */}
        <TranscriptPane scrollOffset={50}>
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Historical Compartments
            </p>
            
            {/* Multiple compartment cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <CompartmentCard
                title="Recursion investigation"
                summary="Analyzed athena-junior self-spawning issue"
                messageCount={4}
                compact
                opacity={0.7}
              />
              <CompartmentCard
                title="Delegation analysis"
                summary="Reviewed existing recursion guards"
                messageCount={3}
                compact
                opacity={0.7}
              />
              <CompartmentCard
                title="Fix application"
                summary="Implemented guard in subagent-resolver.ts"
                messageCount={5}
                compact
                opacity={0.7}
              />
              <CompartmentCard
                title="Validation pass"
                summary="Verified fix with diagnostics"
                messageCount={2}
                compact
                opacity={0.7}
              />
            </div>
          </div>
          
          {/* Merged compartment */}
          <div
            style={{
              opacity: mergingProgress,
              transform: `scale(${interpolate(mergingProgress, [0, 1], [0.9, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
            }}
          >
            <p style={{ fontSize: 12, color: COLORS.historian.primary, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Merged Archive
            </p>
            <CompartmentCard
              title="Archive — Recursion + Delegation + Fix + Validation"
              summary="Complete self-recursion issue resolution workflow"
              messageCount={14}
              compact
            />
          </div>
          
          {/* Live session at bottom */}
          <div style={{ marginTop: 32, opacity: 0.6 }}>
            <AssistantBlock>
              <p style={{ margin: 0, fontSize: 15, color: COLORS.textSecondary, lineHeight: 1.5 }}>
                Continuing with new tasks...
              </p>
            </AssistantBlock>
            <ActionRow icon="🔍" text="Explored 2 searches" />
          </div>
          
          <InputBar />
        </TranscriptPane>
        
        {/* Context Inspector */}
        <ContextInspector>
          <ContextStat label="Session" value="ATHENA-LONG-2024" />
          <ContextStat label="Context Limit" value="128K" />
          <ContextStat label="Usage" value="62%" barProgress={62} barColor={COLORS.success} />
          <ContextStat label="Total Tokens" value="79,360" />
          
          {/* History Budget indicator */}
          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: `${COLORS.oldWay.secondary}10`,
              borderRadius: 8,
              border: `1px solid ${budgetWarningProgress > 0 ? COLORS.oldWay.secondary : COLORS.borderPrimary}`,
              opacity: interpolate(frame, [sceneStart + 80, sceneStart + 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: COLORS.textSecondary }}>History Budget</span>
              <span style={{ fontSize: 12, color: budgetWarningProgress > 0 ? COLORS.oldWay.secondary : COLORS.textTertiary, fontWeight: 600 }}>
                {budgetWarningProgress > 0 ? 'Nearing threshold' : 'Healthy'}
              </span>
            </div>
            <div style={{ height: 4, backgroundColor: COLORS.bgTertiary, borderRadius: 2, marginTop: 8 }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${75 + budgetWarningProgress * 10}%`, 
                  backgroundColor: budgetWarningProgress > 0 ? COLORS.oldWay.secondary : COLORS.success,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                }} 
              />
            </div>
          </div>
          
          {/* Compartments count */}
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 12, color: COLORS.textTertiary, margin: '0 0 8px 0' }}>Active Compartments</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: COLORS.textPrimary }}>
                {mergingProgress >= 1 ? 1 : 4}
              </span>
              <span style={{ fontSize: 12, color: COLORS.textTertiary }}>
                {mergingProgress >= 1 ? 'merged archive' : 'individual'}
              </span>
            </div>
          </div>
          
          {/* Space saved indicator */}
          <div
            style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: `${COLORS.success}10`,
              borderRadius: 8,
              border: `1px solid ${COLORS.success}30`,
              opacity: mergingProgress,
            }}
          >
            <span style={{ fontSize: 12, color: COLORS.success, fontWeight: 600 }}>
              ✓ Space optimized: 4 compartments merged into 1 archive
            </span>
          </div>
        </ContextInspector>
      </div>
      
      {/* Caption */}
      <CaptionLine 
        text="As sessions grow, older compartments can be merged again to save even more space."
        opacity={captionOpacity}
        accentColor={COLORS.historian.primary}
      />
    </SessionShell>
  );
};
