import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface QueueBadgeProps {
  count: number;
  style?: React.CSSProperties;
}

export const QueueBadge: React.FC<QueueBadgeProps> = ({
  count,
  style,
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        backgroundColor: `${COLORS.warning}15`,
        borderRadius: LAYOUT.borderRadius.full,
        border: `1px solid ${COLORS.warning}40`,
        ...style,
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={COLORS.warning}
        strokeWidth="2"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: COLORS.warning,
          fontWeight: TYPOGRAPHY.weights.semibold,
        }}
      >
        {count} queued
      </span>
    </div>
  );
};
