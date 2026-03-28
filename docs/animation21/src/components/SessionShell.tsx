import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, SPACING } from '../constants';

interface SessionShellProps {
  children: React.ReactNode;
  opacity?: number;
  scale?: number;
  dimmed?: boolean;
}

export const SessionShell: React.FC<SessionShellProps> = ({
  children,
  opacity = 1,
  scale = 1,
  dimmed = false,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgPrimary,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />
      
      {/* Noise texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />
      
      {/* Dimming overlay */}
      {dimmed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 100,
          }}
        />
      )}
      
      {/* Main content container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: SPACING['4xl'],
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
