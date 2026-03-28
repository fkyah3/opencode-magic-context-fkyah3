import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface AssistantBlockProps {
  children: React.ReactNode;
  opacity?: number;
  scale?: number;
  highlighted?: boolean;
  highlightColor?: string;
}

export const AssistantBlock: React.FC<AssistantBlockProps> = ({
  children,
  opacity = 1,
  scale = 1,
  highlighted = false,
  highlightColor = COLORS.historian.primary,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: SPACING.md,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: COLORS.magicContext.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: 12,
          fontWeight: TYPOGRAPHY.weights.bold,
          color: COLORS.bgPrimary,
        }}
      >
        A
      </div>
      
      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: SPACING.lg,
          backgroundColor: COLORS.bgCard,
          borderRadius: RADIUS.lg,
          border: highlighted
            ? `2px solid ${highlightColor}`
            : `1px solid ${COLORS.borderPrimary}`,
          boxShadow: highlighted
            ? `0 0 20px ${highlightColor}30`
            : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};
