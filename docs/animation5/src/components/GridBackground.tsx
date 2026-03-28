import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../constants";

type Props = {
  variant?: "default" | "nocturnal" | "fresh";
  opacity?: number;
  noiseOpacity?: number;
};

export const GridBackground: React.FC<Props> = ({
  variant = "default",
  opacity = 1,
  noiseOpacity = 0.4,
}) => {
  const frame = useCurrentFrame();

  const bgColor =
    variant === "nocturnal"
      ? "#060A14"
      : variant === "fresh"
        ? "#0A1018"
        : C.bg;

  // Subtle drift for noise pattern
  const drift = Math.sin(frame * 0.008) * 2;

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Base gradient */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${bgColor} 0%, #000000 100%)`,
        }}
      />

      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(${C.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${C.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: `${drift}px ${drift * 0.5}px`,
        }}
      />

      {/* Subtle noise overlay */}
      <AbsoluteFill
        style={{
          opacity: noiseOpacity,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
