import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface SidekickPanelProps {
  isActive: boolean;
  briefingItems: string[];
  opacity?: number;
}

export const SidekickPanel: React.FC<SidekickPanelProps> = ({
  isActive,
  briefingItems,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 120,
        right: 60,
        width: 400,
        backgroundColor: COLORS.bgPanel,
        borderRadius: RADIUS.xl,
        border: `1px solid ${isActive ? COLORS.sidekick.primary : COLORS.borderPrimary}`,
        boxShadow: isActive ? `0 0 30px ${COLORS.sidekick.primary}20` : 'none',
        opacity,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: `${SPACING.lg}px ${SPACING.xl}px`,
          backgroundColor: isActive ? `${COLORS.sidekick.primary}10` : COLORS.bgCard,
          borderBottom: `1px solid ${isActive ? `${COLORS.sidekick.primary}30` : COLORS.borderPrimary}`,
          display: 'flex',
          alignItems: 'center',
          gap: SPACING.md,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: isActive ? COLORS.sidekick.primary : COLORS.textMuted,
            boxShadow: isActive ? `0 0 10px ${COLORS.sidekick.primary}` : 'none',
          }}
        />
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.base,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: isActive ? COLORS.sidekick.primary : COLORS.textSecondary,
            fontFamily: TYPOGRAPHY.fontFamilyMono,
          }}
        >
          Sidekick
        </span>
      </div>
      
      {/* Content */}
      <div style={{ padding: SPACING.xl }}>
        {isActive ? (
          <>
            <p
              style={{
                fontSize: TYPOGRAPHY.sizes.sm,
                color: COLORS.textSecondary,
                margin: 0,
                marginBottom: SPACING.lg,
              }}
            >
              Preparing session briefing from memory...
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.sm,
              }}
            >
              {briefingItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: SPACING.sm,
                    padding: `${SPACING.sm}px ${SPACING.md}px`,
                    backgroundColor: `${COLORS.sidekick.primary}10`,
                    borderRadius: RADIUS.md,
                    border: `1px solid ${COLORS.sidekick.primary}30`,
                  }}
                >
                  <span style={{ color: COLORS.sidekick.primary }}>✓</span>
                  <span
                    style={{
                      fontSize: TYPOGRAPHY.sizes.sm,
                      color: COLORS.textSecondary,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p
            style={{
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.textTertiary,
              margin: 0,
            }}
          >
            Waiting for new session...
          </p>
        )}
      </div>
    </div>
  );
};
