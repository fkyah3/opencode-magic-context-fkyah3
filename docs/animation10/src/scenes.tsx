import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  CaptionLine,
  DreamerPanel,
  MagicContextShell,
  OldWayWorkspace,
  SceneHeader,
  SidekickPanel,
  Background,
  GlassCard,
  StatusChip,
  Wordmark,
  AgentCard,
  ContextMeter,
  MemoryShelf,
} from './components';
import {
  COLORS,
  FONT_FAMILY,
  MAGIC_MAIN_STATUSES,
  HEALTHY_STATUSES,
  OLD_WAY_STATUSES,
  WIDTH,
  clamp,
  cycle,
  progress,
  springProgress,
} from './constants';

export const Scene1OldWay: React.FC = () => {
  const frame = useCurrentFrame();
  const contextPercent =
    frame < 50
      ? interpolate(frame, [0, 50], [34, 58], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      : frame < 110
        ? interpolate(frame, [50, 110], [58, 89], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
        : frame < 145
          ? interpolate(frame, [110, 145], [89, 99], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
          : 100;
  const blocked = frame >= 146;
  const captionOpacity = progress(frame, 150, 176);

  return (
    <AbsoluteFill>
      <Background />
      <SceneHeader
        eyebrow="Architecture failure mode"
        title="Old way"
        subtitle="The same coding agent does the work, hits the context ceiling, then stops to compact itself."
        accent={COLORS.old}
      />
      <div style={{position: 'absolute', left: 54, top: 112}}>
        <OldWayWorkspace frame={frame} contextPercent={contextPercent} blocked={blocked} />
      </div>
      <CaptionLine
        text="Old way: the main agent hits the limit and stops to compact itself."
        accent={COLORS.old}
        opacity={captionOpacity}
      />
    </AbsoluteFill>
  );
};

export const Scene2SplitBridge: React.FC = () => {
  const frame = useCurrentFrame();
  const splitProgress = progress(frame, 0, 36);
  const commitProgress = progress(frame, 76, 119);
  const oldScale = interpolate(splitProgress, [0, 1], [1, 0.44], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const oldX = interpolate(splitProgress, [0, 1], [54, 22], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const oldY = interpolate(splitProgress, [0, 1], [112, 110], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rightX = interpolate(splitProgress, [0, 1], [WIDTH, 574], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const rightScale = 0.53 + commitProgress * 0.07;

  return (
    <AbsoluteFill>
      <Background />
      <div style={{position: 'absolute', left: 0, right: 0, top: 28, display: 'flex', justifyContent: 'space-between', padding: '0 36px'}}>
        <StatusChip text="Old Way" accent={COLORS.old} />
        <StatusChip text="Magic Context" accent={COLORS.magic} />
      </div>
      <div style={{position: 'absolute', left: oldX, top: oldY, transform: `scale(${oldScale})`, transformOrigin: 'top left', opacity: 1 - commitProgress * 0.24}}>
        <OldWayWorkspace frame={220} contextPercent={100} blocked />
      </div>
      <div style={{position: 'absolute', left: rightX, top: 76, transform: `scale(${rightScale})`, transformOrigin: 'top left', opacity: splitProgress}}>
        <MagicContextShell
          frame={frame}
          contextPercent={interpolate(frame, [0, 75], [72, 90], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
          mainStatus={cycle(MAGIC_MAIN_STATUSES, frame, 16)}
          mainMode="magic-working"
          historianMode={frame < 36 ? 'standby' : 'arming'}
          tailProgress={0.34 + progress(frame, 20, 96) * 0.3}
          selectionProgress={progress(frame, 52, 108)}
          extractProgress={0}
          replacementProgress={0}
          compartmentProgress={0}
          factsProgress={0}
          memoryProgress={0}
          showLabels={false}
        />
      </div>
    </AbsoluteFill>
  );
};

export const Scene3HistorianActivation: React.FC = () => {
  const frame = useCurrentFrame();
  const contextPercent =
    frame < 60
      ? interpolate(frame, [0, 60], [68, 81], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      : interpolate(frame, [60, 130], [81, 91], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill>
      <Background />
      <SceneHeader
        eyebrow="Magic Context"
        title="Pressure rises. Flow stays intact."
        subtitle="Before the limit blocks the session, a separate Historian starts working in the background."
        accent={COLORS.magic}
      />
      <MagicContextShell
        frame={frame}
        contextPercent={contextPercent}
        mainStatus={cycle(MAGIC_MAIN_STATUSES, frame, 24)}
        mainMode="magic-working"
        historianMode={frame < 96 ? 'standby' : 'arming'}
        tailProgress={0.32 + progress(frame, 0, 260) * 0.42}
        selectionProgress={progress(frame, 154, 220)}
      />
      <CaptionLine
        text="Magic Context: before the limit blocks the session, a background Historian starts working."
        opacity={progress(frame, 96, 138)}
      />
    </AbsoluteFill>
  );
};

export const Scene4HeadTail: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background />
      <SceneHeader
        eyebrow="Hero shot"
        title="Historian on the head. Main agent on the tail."
        subtitle="This is the defining behavior: older history peels off to the Historian while fresh work keeps landing on the newest tail."
        accent={COLORS.teal}
      />
      <MagicContextShell
        frame={frame}
        contextPercent={interpolate(frame, [0, 360], [91, 88], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        mainStatus={cycle(MAGIC_MAIN_STATUSES.slice(4), frame, 22)}
        mainMode="magic-working"
        historianMode="processing"
        tailProgress={0.55 + progress(frame, 0, 360) * 0.42}
        selectionProgress={1}
        extractProgress={progress(frame, 52, 208)}
        replacementProgress={progress(frame, 230, 340)}
        compartmentProgress={0.12}
        showLabels
      />
      <CaptionLine
        text="Historian rewrites the head. The main agent keeps moving on the tail."
        opacity={progress(frame, 90, 130)}
      />
    </AbsoluteFill>
  );
};

export const Scene5HistorianOutputs: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background />
      <SceneHeader
        eyebrow="Structured outputs"
        title="Not one summary. Multiple durable artifacts."
        subtitle="Historian produces compartments, session facts, and promoted memory — each with a different job."
        accent={COLORS.violet}
      />
      <MagicContextShell
        frame={frame}
        contextPercent={interpolate(frame, [0, 390], [88, 82], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        mainStatus={cycle(MAGIC_MAIN_STATUSES.slice(3), frame, 26)}
        mainMode="magic-working"
        historianMode="processing"
        tailProgress={0.74 + progress(frame, 0, 390) * 0.18}
        selectionProgress={0.7}
        extractProgress={1}
        replacementProgress={1}
        compartmentProgress={springProgress(frame, 10, 46)}
        factsProgress={springProgress(frame, 92, 54)}
        memoryProgress={springProgress(frame, 182, 56)}
        showLabels
      />
      <CaptionLine
        text="Old history becomes structured context: compartments, facts, and memory."
        opacity={progress(frame, 210, 248)}
      />
    </AbsoluteFill>
  );
};

export const Scene6HealthyPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background />
      <SceneHeader
        eyebrow="Payoff"
        title="Healthy context. No interruption."
        subtitle="The pressure drops because raw history got replaced with compact structure — not because the main agent paused."
        accent={COLORS.success}
      />
      <MagicContextShell
        frame={frame}
        contextPercent={interpolate(frame, [0, 90], [91, 54], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        mainStatus={cycle(HEALTHY_STATUSES, frame, 28)}
        mainMode="healthy"
        historianMode="complete"
        tailProgress={0.92}
        selectionProgress={0.2}
        extractProgress={1}
        replacementProgress={1}
        compartmentProgress={1}
        factsProgress={1}
        memoryProgress={1}
        showLabels
      />
      <CaptionLine text="The main agent never stopped. Flow stayed intact." opacity={progress(frame, 76, 110)} accent={COLORS.success} />
    </AbsoluteFill>
  );
};

export const Scene7LongSession: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background />
      <SceneHeader
        eyebrow="Long sessions"
        title="Older compartments can merge again."
        subtitle="As the history budget tightens, the oldest structured compartments merge into an even denser archive."
        accent={COLORS.teal}
      />
      <MagicContextShell
        frame={frame}
        contextPercent={58}
        mainStatus={cycle(['Continuing implementation', 'Running targeted checks', 'Sustaining context budget'], frame, 36)}
        mainMode="healthy"
        historianMode="processing"
        tailProgress={0.95}
        selectionProgress={0.15}
        extractProgress={1}
        replacementProgress={1}
        compartmentProgress={1}
        factsProgress={1}
        memoryProgress={1}
        mergeProgress={progress(frame, 82, 180)}
        showLabels
      />
      <div style={{position: 'absolute', right: 74, top: 132}}>
        <StatusChip text="History budget nearing threshold" accent={COLORS.warning} />
      </div>
      <CaptionLine
        text="As sessions grow, older compartments can be merged again to save even more space."
        opacity={progress(frame, 150, 188)}
      />
    </AbsoluteFill>
  );
};

export const Scene8CacheAwareness: React.FC = () => {
  const frame = useCurrentFrame();
  const queueMode = frame < 76 ? 'mark' : frame < 170 ? 'wait' : 'apply';
  return (
    <AbsoluteFill>
      <Background />
      <SceneHeader
        eyebrow="Cache awareness"
        title="Queue reductions first. Apply them later."
        subtitle="Magic Context can hold reductions in a pending state so cached prefixes remain useful until expiry or threshold makes the apply point worthwhile."
        accent={COLORS.warning}
      />
      <MagicContextShell
        frame={frame}
        contextPercent={frame < 160 ? 64 : interpolate(frame, [160, 230], [64, 56], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        mainStatus={cycle(['Queued reduction candidate', 'Preserving cache prefix', 'Applying queued compaction'], frame, 40)}
        mainMode="healthy"
        historianMode="complete"
        tailProgress={0.96}
        selectionProgress={0.14}
        extractProgress={1}
        replacementProgress={1}
        compartmentProgress={1}
        factsProgress={1}
        memoryProgress={1}
        queueMode={queueMode}
        showLabels
      />
      <div style={{position: 'absolute', right: 74, top: 128, display: 'grid', gap: 10}}>
        <StatusChip text="Queued reduction: #041–#052" accent={COLORS.warning} />
        <StatusChip text="Queued reduction: stale scratchpad" accent={COLORS.warning} />
      </div>
      <CaptionLine
        text="Cache-aware reductions: queue first, apply when timing actually makes sense."
        opacity={progress(frame, 180, 220)}
        accent={COLORS.warning}
      />
    </AbsoluteFill>
  );
};

export const Scene9Dreamer: React.FC = () => {
  const frame = useCurrentFrame();
  const ambientOpacity = 1 - progress(frame, 0, 54) * 0.2;
  return (
    <AbsoluteFill>
      <Background mode="dreamer" />
      <SceneHeader
        eyebrow="Dreamer"
        title="Off-session maintenance"
        subtitle="Between active sessions, Dreamer consolidates, verifies, archives, and improves the knowledge layer."
        accent={COLORS.dreamer}
      />
      <div style={{position: 'absolute', inset: 0, opacity: ambientOpacity * 0.24, transform: 'scale(0.94)'}}>
        <MagicContextShell
          frame={180}
          contextPercent={52}
          mainStatus="Session idle"
          mainMode="healthy"
          historianMode="complete"
          tailProgress={0.85}
          selectionProgress={0}
          extractProgress={1}
          replacementProgress={1}
          compartmentProgress={1}
          factsProgress={1}
          memoryProgress={1}
        />
      </div>
      <div style={{position: 'absolute', left: 54, top: 170}}>
        <DreamerPanel frame={frame} />
      </div>
      <div style={{position: 'absolute', right: 54, top: 170}}>
        <MemoryShelf opacity={progress(frame, 24, 72)} />
      </div>
      <CaptionLine
        text="Dreamer keeps the knowledge layer healthy between active sessions."
        opacity={progress(frame, 150, 188)}
        accent={COLORS.dreamer}
      />
    </AbsoluteFill>
  );
};

export const Scene10Sidekick: React.FC = () => {
  const frame = useCurrentFrame();
  const briefingProgress = progress(frame, 122, 166);
  return (
    <AbsoluteFill>
      <Background />
      <SceneHeader
        eyebrow="Sidekick"
        title="New sessions start informed."
        subtitle="Before the main agent responds, Sidekick pulls the most relevant memory, facts, and compartments into a concise briefing."
        accent={COLORS.mint}
      />
      <div style={{position: 'absolute', left: 54, top: 150}}>
        <GlassCard accent={COLORS.mint} glow={0.14} style={{padding: 24, width: 470, height: 194}}>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 24, fontWeight: 700, color: COLORS.text}}>Fresh session</div>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.textMuted, marginTop: 6}}>Incoming user prompt</div>
          <div
            style={{
              marginTop: 18,
              padding: 18,
              borderRadius: 20,
              border: `1px solid ${COLORS.line}`,
              background: 'rgba(10, 15, 25, 0.8)',
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              lineHeight: 1.35,
              color: COLORS.text,
            }}
          >
            Continue the auth refactor and preserve the retry behavior.
          </div>
        </GlassCard>
      </div>
      <div style={{position: 'absolute', left: 54, top: 370}}>
        <AgentCard
          frame={frame + 30}
          status={briefingProgress > 0.65 ? 'Loaded prior constraints' : 'Waiting for context restore'}
          mode={briefingProgress > 0.65 ? 'warm-start' : 'magic-working'}
        />
      </div>
      <div style={{position: 'absolute', right: 54, top: 150}}>
        <SidekickPanel frame={frame} />
      </div>
      {briefingProgress > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: 572,
            top: 416,
            width: 160 + briefingProgress * 150,
            height: 2,
            background: `linear-gradient(90deg, rgba(137,255,212,0.1), ${COLORS.mint})`,
            boxShadow: `0 0 18px ${COLORS.mint}`,
            opacity: briefingProgress,
          }}
        />
      ) : null}
      <CaptionLine
        text="Sidekick helps new sessions start with the right context already in place."
        opacity={progress(frame, 134, 172)}
        accent={COLORS.mint}
      />
    </AbsoluteFill>
  );
};

export const Scene11Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = progress(frame, 10, 40);
  const line2 = progress(frame, 48, 82);
  const line3 = progress(frame, 88, 118);
  return (
    <AbsoluteFill>
      <Background />
      <div style={{position: 'absolute', inset: 0, opacity: 0.9}}>
        <MagicContextShell
          frame={200}
          contextPercent={52}
          mainStatus="Shipping work without interruption"
          mainMode="healthy"
          historianMode="complete"
          tailProgress={0.9}
          selectionProgress={0.08}
          extractProgress={1}
          replacementProgress={1}
          compartmentProgress={1}
          factsProgress={1}
          memoryProgress={1}
          showLabels
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 14,
          background: 'linear-gradient(180deg, rgba(6,9,18,0.12), rgba(6,9,18,0.46), rgba(6,9,18,0.78))',
        }}
      >
        <div style={{fontFamily: FONT_FAMILY, fontSize: 20, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: COLORS.magic, opacity: 0.92}}>
          OpenCode Magic Context
        </div>
        <div style={{fontFamily: FONT_FAMILY, fontSize: 56, fontWeight: 750, color: COLORS.text, opacity: line1, transform: `translateY(${(1 - line1) * 12}px)`}}>
          Keep the main agent in flow.
        </div>
        <div style={{fontFamily: FONT_FAMILY, fontSize: 44, fontWeight: 700, color: COLORS.textDim, opacity: line2, transform: `translateY(${(1 - line2) * 12}px)`}}>
          Let Magic Context handle the past.
        </div>
        <div style={{fontFamily: FONT_FAMILY, fontSize: 24, fontWeight: 600, color: COLORS.textMuted, opacity: line3}}>
          Async history compaction and memory for uninterrupted coding agents.
        </div>
        <div style={{marginTop: 16, opacity: line3}}>
          <Wordmark opacity={line3} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
