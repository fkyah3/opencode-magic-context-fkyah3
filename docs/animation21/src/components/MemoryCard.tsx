import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface MemoryCardProps {
  title: string;
  content: string;
  opacity?: number;
  scale?: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  title,
  content,
  opacity = 1,
  scale = 1,
}) => {
  return (
    <div
      style={{
        backgroundColor: `${COLORS.sidekick.primary}08`,
        borderRadius: RADIUS.lg,
        border: `1px solid ${COLORS.sidekick.primary}30`,
        padding: `${SPACING.lg}px ${SPACING.xl}px`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        boxShadow: `0 0 20px ${COLORS.sidekick.primary}10`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: SPACING.sm,
          marginBottom: SPACING.sm,
        }}
      >
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.sidekick.primary,
            fontWeight: TYPOGRAPHY.weights.semibold,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Memory
        </span>
      </div>
      
      <h4
        style={{
          fontSize: TYPOGRAPHY.sizes.base,
          fontWeight: TYPOGRAPHY.weights.semibold,
          color: COLORS.textPrimary,
          margin: 0,
          marginBottom: SPACING.sm,
        }}
      >
        {title}
      </h4>
      
      <p
        style={{
          fontSize: TYPOGRAPHY.sizes.sm,
          color: COLORS.textSecondary,
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {content}
      </p>
    </div>
  );
};
