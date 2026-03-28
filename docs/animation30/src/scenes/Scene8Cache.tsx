import React from "react";
import {interpolate as remotionInterpolate} from "remotion";
import {CaptionLine, SceneLabel} from "../components/CaptionLine";
import {COLORS} from "../constants";
import {DotMatrix, Eyebrow, FlowLine, FrostCard, MetricPill, SceneBackground} from "./scene-helpers";

const prefixBlocks = [
  "cached prefix",
  "stable transcript",
  "reused tool results",
  "restored decisions",
  "preserved prompt scaffold",
  "active tail",
  "new user turn",
  "queued reduction",
];

export const Scene8Cache: React.FC<{frame: number}> = ({frame}) => {
  const queueProgress = remotionInterpolate(frame, [30, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const applyProgress = remotionInterpolate(frame, [156, 252], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      <SceneBackground accent={COLORS.sidekickAccent} accentSecondary={COLORS.magicAccent} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 54,
          display: "grid",
          gridTemplateRows: "auto auto 1fr",
          gap: 22,
          zIndex: 2,
        }}
      >
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>
            <Eyebrow text="Cache awareness" color={COLORS.sidekickAccent} />
            <div style={{fontSize: 40, fontWeight: 800, color: COLORS.textPrimary, marginTop: 10}}>
              Queue first. Apply when timing helps.
            </div>
          </div>
          <MetricPill label="cache preserved" value="prefix stays hot" color={COLORS.sidekickAccent} />
        </div>

        <FrostCard style={{padding: 22, display: "grid", gap: 16}} accentColor={`${COLORS.sidekickAccent}66`}>
          <Eyebrow text="Prefix + active tail map" color={COLORS.sidekickAccent} />
          <div style={{display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 12}}>
            {prefixBlocks.map((label, index) => {
              const isCached = index < 5;
              const isQueued = index === 7;
              const glow = isQueued ? queueProgress : isCached ? 1 : 0.35;
              return (
                <div
                  key={label}
                  style={{
                    padding: "16px 12px",
                    borderRadius: 14,
                    border: `1px solid ${
                      isCached ? COLORS.sidekickAccent : isQueued ? COLORS.magicAccent : COLORS.border
                    }`,
                    backgroundColor: isCached
                      ? `${COLORS.sidekickAccent}12`
                      : isQueued
                        ? `${COLORS.magicAccent}12`
                        : COLORS.bgCard,
                    boxShadow: isQueued ? `0 0 28px ${COLORS.magicAccent}33` : "none",
                    opacity: glow,
                    minHeight: 88,
                  }}
                >
                  <div style={{fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.textTertiary, marginBottom: 8}}>
                    {isCached ? "cached" : isQueued ? "queued" : "live"}
                  </div>
                  <div style={{fontSize: 13, lineHeight: 1.5, color: COLORS.textPrimary}}>{label}</div>
                </div>
              );
            })}
          </div>
        </FrostCard>

        <div style={{display: "grid", gridTemplateColumns: "1.2fr 140px 1fr", gap: 22}}>
          <FrostCard style={{padding: 24, display: "flex", flexDirection: "column", gap: 18}} accentColor={`${COLORS.magicAccent}66`}>
            <Eyebrow text="Queued reductions" color={COLORS.magicAccent} />
            <div style={{display: "grid", gap: 12}}>
              {[
                "wait for cache-safe breakpoint",
                "avoid invalidating stable prefix",
                "apply after live branch advances",
              ].map((item, index) => {
                const progress = remotionInterpolate(frame, [24 + index * 20, 120 + index * 20], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                return (
                  <div
                    key={item}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      backgroundColor: `${COLORS.magicAccent}10`,
                      border: `1px solid ${COLORS.magicAccent}25`,
                      opacity: progress,
                      transform: `translateX(${(1 - progress) * -26}px)`,
                      color: COLORS.textPrimary,
                      fontSize: 14,
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <DotMatrix count={18} columns={6} activeCount={Math.round(6 + queueProgress * 12)} color={COLORS.magicAccent} />
          </FrostCard>

          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14}}>
            <Eyebrow text="apply" color={COLORS.sidekickAccent} />
            <FlowLine color={COLORS.sidekickAccent} style={{width: 110}} />
            <div style={{fontSize: 42, color: COLORS.sidekickAccent, opacity: 0.35 + applyProgress * 0.65}}>⟶</div>
          </div>

          <FrostCard style={{padding: 24, display: "flex", flexDirection: "column", gap: 18}} accentColor={`${COLORS.sidekickAccent}66`}>
            <Eyebrow text="Apply window" color={COLORS.sidekickAccent} />
            <div style={{fontSize: 20, fontWeight: 700, color: COLORS.textPrimary}}>
              Reduction lands after the cache-safe boundary.
            </div>
            <div style={{fontSize: 14, lineHeight: 1.7, color: COLORS.textSecondary}}>
              Magic Context preserves reusable prefix work, then applies reductions only when the timeline can absorb them without wasting cached context.
            </div>
            <div
              style={{
                padding: 18,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${COLORS.sidekickAccent}14 0%, ${COLORS.magicAccent}10 100%)`,
                border: `1px solid ${COLORS.sidekickAccent}35`,
                boxShadow: `0 0 36px ${COLORS.sidekickAccent}18`,
                opacity: 0.3 + applyProgress * 0.7,
                transform: `scale(${0.96 + applyProgress * 0.04})`,
              }}
            >
              <div style={{fontSize: 12, color: COLORS.sidekickAccent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8}}>
                apply checkpoint
              </div>
              <div style={{fontSize: 15, color: COLORS.textPrimary}}>Queued reductions commit without blowing away cached prefix value.</div>
            </div>
          </FrostCard>
        </div>
      </div>

      <SceneLabel text="Scene 08" subText="Cache awareness" visible position="top-left" accentColor={COLORS.sidekickAccent} />
      <CaptionLine
        visible
        accentColor={COLORS.sidekickAccent}
        text="Cache-aware reductions: queue first, apply when timing actually makes sense."
      />
    </div>
  );
};
