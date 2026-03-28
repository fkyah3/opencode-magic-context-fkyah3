import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface CompartmentCardProps {
  title: string;
  summary: string;
  messageCount: number;
  opacity?: number;
  scale?: number;
  compact?: boolean;
}

export const CompartmentCard: React.FC<CompartmentCardProps> = ({
  title,
  summary,
  messageCount,
  opacity = 1,
  scale = 1,
  compact = false,
}) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.bgCard,
        borderRadius: RADIUS.lg,
        border: `1px solid ${COLORS.historian.primary}40`,
        padding: compact ? `${SPACING.md}px ${SPACING.lg}px` : `${SPACING.lg}px ${SPACING.xl}px`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        boxShadow: `0 0 15px ${COLORS.historian.primary}15`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: SPACING.sm,
          marginBottom: compact ? SPACING.xs : SPACING.sm,
        }}
      >
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.historian.primary,
            fontWeight: TYPOGRAPHY.weights.semibold,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Compartment
        </span>
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.textMuted,
            fontFamily: TYPOGRAPHY.fontFamilyMono,
          }}
        >
          {messageCount} msgs
        </span>
      </div>
      
      <h4
        style={{
          fontSize: compact ? TYPOGRAPHY.sizes.sm : TYPOGRAPHY.sizes.base,
          fontWeight: TYPOGRAPHY.weights.semibold,
          color: COLORS.textPrimary,
          margin: 0,
          marginBottom: compact ? SPACING.xs : SPACING.sm,
        }}
      >
        {title}
      </h4>
      
      {!compact && (
        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.textSecondary,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {summary}
        </p>
      )}
    </div>
  );
};
