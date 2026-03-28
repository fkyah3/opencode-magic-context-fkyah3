import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface QueueBadgeProps {
  count: number;
  label: string;
  opacity?: number;
}

export const QueueBadge: React.FC<QueueBadgeProps> = ({
  count,
  label,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: SPACING.sm,
        padding: `${SPACING.xs}px ${SPACING.md}px`,
        backgroundColor: `${COLORS.oldWay.primary}15`,
        borderRadius: RADIUS.md,
        border: `1px solid ${COLORS.oldWay.primary}30`,
        opacity,
      }}
    >
      <span
        style={{
          fontSize: TYPOGRAPHY.sizes.xs,
          color: COLORS.oldWay.primary,
          fontWeight: TYPOGRAPHY.weights.semibold,
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          minWidth: 20,
          textAlign: 'center',
        }}
      >
        {count}
      </span>
      <span
        style={{
          fontSize: TYPOGRAPHY.sizes.xs,
          color: COLORS.textSecondary,
        }}
      >
        {label}
      </span>
    </div>
  );
};
