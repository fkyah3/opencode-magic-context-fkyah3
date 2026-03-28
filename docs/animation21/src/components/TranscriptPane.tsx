import React from 'react';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants';

interface TranscriptPaneProps {
  children: React.ReactNode;
  scrollOffset?: number;
  opacity?: number;
}

export const TranscriptPane: React.FC<TranscriptPaneProps> = ({
  children,
  scrollOffset = 0,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.bgPanel,
        borderRadius: RADIUS.xl,
        border: `1px solid ${COLORS.borderPrimary}`,
        overflow: 'hidden',
        opacity,
        boxShadow: SHADOWS.md,
      }}
    >
      {/* Transcript content area */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -scrollOffset,
            left: 0,
            right: 0,
            padding: SPACING.xl,
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.lg,
          }}
        >
          {children}
        </div>
        
        {/* Top fade gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 40,
            background: `linear-gradient(to bottom, ${COLORS.bgPanel}, transparent)`,
            pointerEvents: 'none',
          }}
        />
        
        {/* Bottom fade gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: `linear-gradient(to top, ${COLORS.bgPanel}, transparent)`,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};
