import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface ActionRowProps {
  icon: string;
  text: string;
  opacity?: number;
  delay?: number;
}

export const ActionRow: React.FC<ActionRowProps> = ({
  icon,
  text,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.md,
        padding: `${SPACING.sm}px ${SPACING.md}px`,
        backgroundColor: 'rgba(6, 182, 212, 0.08)',
        borderRadius: RADIUS.md,
        border: `1px solid rgba(6, 182, 212, 0.15)`,
        opacity,
        marginLeft: 44, // Align with assistant block content
      }}
    >
      <span
        style={{
          fontSize: TYPOGRAPHY.sizes.sm,
          color: COLORS.magicContext.primary,
          fontFamily: TYPOGRAPHY.fontFamilyMono,
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: TYPOGRAPHY.sizes.sm,
          color: COLORS.textSecondary,
          fontFamily: TYPOGRAPHY.fontFamilyMono,
        }}
      >
        {text}
      </span>
    </div>
  );
};
