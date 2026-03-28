import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface CaptionLineProps {
  text: string;
  subtext?: string;
  opacity?: number;
  y?: number;
  accentColor?: string;
}

export const CaptionLine: React.FC<CaptionLineProps> = ({
  text,
  subtext,
  opacity = 1,
  y = 980,
  accentColor = COLORS.magicContext.primary,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: y,
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.sm,
          padding: `${SPACING.md}px ${SPACING.xl}px`,
          backgroundColor: `${COLORS.bgPanel}90`,
          borderRadius: RADIUS.lg,
          border: `1px solid ${accentColor}40`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.xl,
            fontWeight: TYPOGRAPHY.weights.medium,
            color: COLORS.textPrimary,
            letterSpacing: '0.02em',
          }}
        >
          {text}
        </span>
        {subtext && (
          <span
            style={{
              fontSize: TYPOGRAPHY.sizes.base,
              color: COLORS.textSecondary,
            }}
          >
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
