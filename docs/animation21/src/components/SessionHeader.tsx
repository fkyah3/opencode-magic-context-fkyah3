import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface SessionHeaderProps {
  sessionName: string;
  provider?: string;
  model?: string;
  accentColor?: string;
}

export const SessionHeader: React.FC<SessionHeaderProps> = ({
  sessionName,
  provider = 'OpenCode',
  model = 'claude-sonnet-4',
  accentColor = COLORS.magicContext.primary,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${SPACING.lg}px ${SPACING.xl}px`,
        backgroundColor: COLORS.bgCard,
        borderRadius: RADIUS.lg,
        border: `1px solid ${COLORS.borderPrimary}`,
        marginBottom: SPACING.xl,
      }}
    >
      {/* Left: Session name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.md }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}40`,
          }}
        />
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamilyMono,
            fontSize: TYPOGRAPHY.sizes.lg,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: COLORS.textPrimary,
            letterSpacing: '0.05em',
          }}
        >
          {sessionName}
        </span>
      </div>
      
      {/* Right: Provider/Model */}
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xl }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
          <span
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.textTertiary,
            }}
          >
            Provider
          </span>
          <span
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.textSecondary,
              fontWeight: TYPOGRAPHY.weights.medium,
            }}
          >
            {provider}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
          <span
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.textTertiary,
            }}
          >
            Model
          </span>
          <span
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.textSecondary,
              fontWeight: TYPOGRAPHY.weights.medium,
            }}
          >
            {model}
          </span>
        </div>
      </div>
    </div>
  );
};
