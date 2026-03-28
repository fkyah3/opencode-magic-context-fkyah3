import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS } from '../constants';

interface BackgroundGridProps {
  style?: React.CSSProperties;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({ style }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        ...style,
      }}
    >
      {/* Subtle grid pattern */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          opacity: 0.03,
        }}
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={COLORS.text.primary}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Subtle noise texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.02,
          pointerEvents: 'none',
        }}
      />
      
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, ${COLORS.background} 100%)`,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
