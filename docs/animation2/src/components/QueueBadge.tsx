import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface QueueBadgeProps {
  label: string;
  isQueued?: boolean;
  style?: React.CSSProperties;
}

export const QueueBadge: React.FC<QueueBadgeProps> = ({
  label,
  isQueued = true,
  style,
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        background: isQueued ? 'rgba(245, 158, 11, 0.15)' : COLORS.bgElevated,
        border: `1px solid ${isQueued ? COLORS.warning : COLORS.border}`,
        borderRadius: 4,
        ...style,
      }}
    >
      {isQueued && (
        <span
          style={{
            fontSize: 10,
          }}
        >
          ⏳
        </span>
      )}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: isQueued ? COLORS.warning : COLORS.textMuted,
          fontWeight: TYPOGRAPHY.weights.medium,
        }}
      >
        {label}
      </span>
    </div>
  );
};
