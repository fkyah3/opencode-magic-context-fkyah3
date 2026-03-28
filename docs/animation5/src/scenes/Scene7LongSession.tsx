import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { CompartmentCard } from "../components/CompartmentCard";
import { CaptionLine } from "../components/CaptionLine";
import { ProgressBar } from "../components/ProgressBar";
import { C, FONT, LAYOUT } from "../constants";
import { eased, lerp, fadeIn, fadeOut } from "../utils";

/**
 * Scene 7 — Long-session compression: compartments merge
 * Frames 0–269 (270 frames / 9.0s)
 *
 * Beat breakdown:
 *   0–80:    Show 4 compartments in archive lane, budget indicator
 *   81–180:  Older compartments slide together and merge
 *   181–269: Archive area compressed, sustainable feel
 */
export const Scene7LongSession: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const compartments = [
    { title: "Auth debugging", tags: ["auth"], density: 0.7 },
    { title: "Cache fixes", tags: ["cache"], density: 0.6 },
    { title: "Refactor notes", tags: ["refactor"], density: 0.5 },
    { title: "Test stabilization", tags: ["tests"], density: 0.4 },
  ];

  // ── History budget indicator ──
  const budgetPct = frame < 81
    ? lerp(frame, [0, 80], [82, 92])
    : eased(frame, [120, 180], [92, 45]);

  const budgetGlowing = budgetPct > 85;

  // ── Merge animation ──
  const mergeProgress = eased(frame, [100, 170], [0, 1]);
  const showMerged = mergeProgress > 0.9;

  // ── Individual card positions ──
  const getCardX = (i: number) => {
    const baseX = i * 220;
    if (mergeProgress <= 0 || i >= 3) return baseX;
    // First 3 cards slide together
    if (i < 3) {
      const targetX = 110; // merge to center position
      return baseX + (targetX - baseX) * mergeProgress;
    }
    return baseX;
  };

  const getCardOpacity = (i: number) => {
    if (i < 3 && mergeProgress > 0.6) {
      return 1 - (mergeProgress - 0.6) / 0.4;
    }
    return 1;
  };

  // ── Merged card ──
  const mergedOpacity = showMerged ? fadeIn(frame, 170, 12) : 0;
  const mergedScale = showMerged
    ? spring({ frame: frame - 170, fps, config: { damping: 200 } })
    : 0;

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 210, 15);
  const captionY = eased(frame, [210, 225], [12, 0]);

  return (
    <AbsoluteFill>
      <GridBackground />

      <div
        style={{
          position: "absolute",
          inset: LAYOUT.padding,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 22,
              fontWeight: 700,
              color: C.textPrimary,
              letterSpacing: "-0.02em",
            }}
          >
            Long Session — History Management
          </div>

          {/* History budget */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 13,
                color: budgetGlowing ? C.meterWarn : C.textSecondary,
              }}
            >
              History Budget
            </div>
            <ProgressBar
              progress={budgetPct / 100}
              width={200}
              height={8}
              color={budgetGlowing ? C.meterWarn : C.meterSafe}
              glow={budgetGlowing}
            />
          </div>
        </div>

        {/* Compartment archive lane */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Archive label */}
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 14,
              fontWeight: 600,
              color: C.compGreen,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Historical Compartments
          </div>

          {/* Compartment cards */}
          <div
            style={{
              position: "relative",
              height: 140,
            }}
          >
            {/* Individual compartments */}
            {compartments.map((comp, i) => (
              <div
                key={comp.title}
                style={{
                  position: "absolute",
                  left: getCardX(i),
                  top: 0,
                  opacity: getCardOpacity(i),
                  transform: `scale(${1 - mergeProgress * 0.05 * (i < 3 ? 1 : 0)})`,
                }}
              >
                <CompartmentCard
                  title={comp.title}
                  tags={comp.tags}
                  density={comp.density}
                  merging={i < 3 && mergeProgress > 0.2 && mergeProgress < 0.9}
                />
              </div>
            ))}

            {/* Merged compartment */}
            {showMerged && (
              <div
                style={{
                  position: "absolute",
                  left: 60,
                  top: 0,
                  opacity: mergedOpacity,
                  transform: `scale(${mergedScale})`,
                }}
              >
                <CompartmentCard
                  title="Merged: Auth + Cache + Tests"
                  tags={["auth", "cache", "tests", "archive"]}
                  density={0.85}
                />
              </div>
            )}
          </div>

          {/* Merge explanation */}
          {mergeProgress > 0.3 && (
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 13,
                color: C.textSecondary,
                opacity: fadeIn(frame, 120, 15),
              }}
            >
              {showMerged
                ? "Older compartments merged → less detail, still structured, more space"
                : "Merging older compartments..."}
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <CaptionLine
        text="As sessions grow, older compartments can be merged again to save even more space."
        opacity={captionOpacity}
        y={captionY}
      />
    </AbsoluteFill>
  );
};
