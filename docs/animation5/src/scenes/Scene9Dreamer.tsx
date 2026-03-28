import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { spring } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { DreamerPanel } from "../components/DreamerPanel";
import { MemoryCard } from "../components/MemoryCard";
import { CaptionLine } from "../components/CaptionLine";
import { C, FONT, LAYOUT, DREAMER_TASKS, MEMORIES } from "../constants";
import { eased, lerp, fadeIn, fadeOut, stagger } from "../utils";

/**
 * Scene 9 — Dreamer
 * Frames 0–269 (270 frames / 9.0s)
 *
 * Beat breakdown:
 *   0–60:    Transition to nocturnal mode
 *   61–145:  Dreamer becomes active, maintenance tasks
 *   146–225: Show maintenance effects on memory
 *   226–269: Clean stable state
 */
export const Scene9Dreamer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Nocturnal transition ──
  const nocturnalOpacity = fadeIn(frame, 0, 30);

  // ── Dreamer panel entrance ──
  const panelEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });

  // ── Active task index ──
  const activeIndex =
    frame < 80
      ? -1
      : frame < 120
        ? 0
        : frame < 160
          ? 1
          : frame < 200
            ? 2
            : frame < 230
              ? 3
              : 4; // all done

  // ── Memory cards state ──
  const memoryVisible = frame > 60;
  const memoryImproved = frame > 200;

  // ── Improved memories (after dreamer pass) ──
  const improvedMemories = [
    "Preserve retry semantics (verified against codebase)",
    "Redis-backed session cache (confirmed active)",
    "Auth/session/token module split pattern",
  ];

  // ── Stars / particles ──
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: 100 + (i * 157) % 1720,
    y: 80 + (i * 89) % 920,
    size: 2 + (i % 3),
    delay: i * 8,
    speed: 0.02 + (i % 4) * 0.008,
  }));

  // ── Caption ──
  const captionOpacity = fadeIn(frame, 235, 15);
  const captionY = eased(frame, [235, 250], [12, 0]);

  return (
    <AbsoluteFill>
      <GridBackground variant="nocturnal" opacity={nocturnalOpacity} />

      {/* Ambient particles */}
      {particles.map((p, i) => {
        const py =
          p.y + Math.sin((frame + p.delay) * p.speed) * 15;
        const pOpacity =
          0.15 + Math.sin((frame + p.delay) * 0.03) * 0.15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: py,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: C.dreamMoon,
              opacity: pOpacity * nocturnalOpacity,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: LAYOUT.padding,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          opacity: panelEntrance,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
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
            Off-Session Maintenance
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 13,
              color: C.dreamMoon,
              opacity: 0.6,
            }}
          >
            overnight · between sessions
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 40,
            alignItems: "flex-start",
          }}
        >
          {/* Left: Dreamer panel */}
          <DreamerPanel
            tasks={DREAMER_TASKS}
            activeIndex={activeIndex}
            pulseFrame={frame}
          />

          {/* Right: Memory state */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 14,
                fontWeight: 600,
                color: C.memBlue,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                opacity: memoryVisible ? 1 : 0,
              }}
            >
              {memoryImproved ? "Memory — After Dreamer Pass" : "Memory — Current State"}
            </div>

            {memoryVisible && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {(memoryImproved ? improvedMemories : MEMORIES.slice(0, 3)).map(
                  (mem, i) => (
                    <div
                      key={`${memoryImproved}-${i}`}
                      style={{
                        opacity: stagger(frame, memoryImproved ? 205 : 70, i, 12, 10),
                        transform: `translateX(${
                          (1 - stagger(frame, memoryImproved ? 205 : 70, i, 12, 10)) * 15
                        }px)`,
                      }}
                    >
                      <MemoryCard
                        text={mem}
                        promoted={memoryImproved}
                        pulseFrame={frame}
                      />
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      <CaptionLine
        text="Dreamer keeps the knowledge layer healthy between active sessions."
        opacity={captionOpacity}
        y={captionY}
      />
    </AbsoluteFill>
  );
};
