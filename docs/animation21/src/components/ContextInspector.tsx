import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface ContextInspectorProps {
  children: React.ReactNode;
  opacity?: number;
}

export const ContextInspector: React.FC<ContextInspectorProps> = ({
  children,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        width: 520,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.bgPanel,
        borderRadius: RADIUS.xl,
        border: `1px solid ${COLORS.borderPrimary}`,
        overflow: 'hidden',
        opacity,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: `${SPACING.lg}px ${SPACING.xl}px`,
          borderBottom: `1px solid ${COLORS.borderPrimary}`,
          backgroundColor: COLORS.bgCard,
        }}
      >
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: COLORS.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Context Inspector
        </span>
      </div>
      
      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: SPACING.xl,
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.lg,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};
