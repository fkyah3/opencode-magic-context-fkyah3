import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface FactChipProps {
  text: string;
  opacity?: number;
  scale?: number;
  promoted?: boolean;
}

export const FactChip: React.FC<FactChipProps> = ({
  text,
  opacity = 1,
  scale = 1,
  promoted = false,
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${SPACING.sm}px ${SPACING.md}px`,
        backgroundColor: promoted ? `${COLORS.sidekick.primary}15` : `${COLORS.historian.secondary}15`,
        borderRadius: RADIUS.full,
        border: `1px solid ${promoted ? `${COLORS.sidekick.primary}40` : `${COLORS.historian.secondary}40`}`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      <span
        style={{
          fontSize: TYPOGRAPHY.sizes.sm,
          color: promoted ? COLORS.sidekick.primary : COLORS.historian.secondary,
          fontWeight: TYPOGRAPHY.weights.medium,
        }}
      >
        {text}
      </span>
    </div>
  );
};
