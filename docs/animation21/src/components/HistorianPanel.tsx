import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, SHADOWS } from '../constants';

interface HistorianPanelProps {
  status: string;
  isActive: boolean;
  opacity?: number;
  progress?: number;
}

export const HistorianPanel: React.FC<HistorianPanelProps> = ({
  status,
  isActive,
  opacity = 1,
  progress = 0,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: 40,
        width: 320,
        backgroundColor: COLORS.bgPanel,
        borderRadius: RADIUS.xl,
        border: `1px solid ${isActive ? COLORS.historian.primary : COLORS.borderPrimary}`,
        boxShadow: isActive ? SHADOWS.glowIndigo : SHADOWS.md,
        opacity,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: `${SPACING.md}px ${SPACING.lg}px`,
          backgroundColor: isActive ? `${COLORS.historian.primary}15` : COLORS.bgCard,
          borderBottom: `1px solid ${isActive ? `${COLORS.historian.primary}30` : COLORS.borderPrimary}`,
          display: 'flex',
          alignItems: 'center',
          gap: SPACING.sm,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: isActive ? COLORS.historian.primary : COLORS.textMuted,
            boxShadow: isActive ? `0 0 8px ${COLORS.historian.primary}` : 'none',
            animation: isActive ? 'pulse 2s infinite' : 'none',
          }}
        />
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: isActive ? COLORS.historian.primary : COLORS.textSecondary,
            fontFamily: TYPOGRAPHY.fontFamilyMono,
          }}
        >
          Historian
        </span>
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.textTertiary,
            marginLeft: 'auto',
          }}
        >
          background
        </span>
      </div>
      
      {/* Status */}
      <div style={{ padding: SPACING.lg }}>
        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.textSecondary,
            margin: 0,
            marginBottom: SPACING.md,
          }}
        >
          {status}
        </p>
        
        {progress > 0 && (
          <div
            style={{
              height: 3,
              backgroundColor: COLORS.bgTertiary,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: COLORS.historian.primary,
                borderRadius: 2,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
