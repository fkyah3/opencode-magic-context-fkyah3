import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface DreamerPanelProps {
  tasks: string[];
  opacity?: number;
  isActive?: boolean;
}

export const DreamerPanel: React.FC<DreamerPanelProps> = ({
  tasks,
  opacity = 1,
  isActive = false,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 480,
        backgroundColor: COLORS.bgPanel,
        borderRadius: RADIUS.xl,
        border: `1px solid ${isActive ? COLORS.dreamer.primary : COLORS.borderPrimary}`,
        boxShadow: isActive ? `0 0 40px ${COLORS.dreamer.primary}20` : 'none',
        opacity,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: `${SPACING.lg}px ${SPACING.xl}px`,
          backgroundColor: isActive ? `${COLORS.dreamer.primary}10` : COLORS.bgCard,
          borderBottom: `1px solid ${isActive ? `${COLORS.dreamer.primary}30` : COLORS.borderPrimary}`,
          display: 'flex',
            alignItems: 'center',
          gap: SPACING.md,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: isActive ? COLORS.dreamer.primary : COLORS.textMuted,
            boxShadow: isActive ? `0 0 12px ${COLORS.dreamer.primary}` : 'none',
            animation: isActive ? 'pulse 3s infinite' : 'none',
          }}
        />
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.lg,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: isActive ? COLORS.dreamer.primary : COLORS.textSecondary,
            fontFamily: TYPOGRAPHY.fontFamilyMono,
          }}
        >
          Dreamer
        </span>
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.textTertiary,
            marginLeft: 'auto',
          }}
        >
          Off-session maintenance
        </span>
      </div>
      
      {/* Tasks */}
      <div style={{ padding: SPACING.xl }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: SPACING.md,
          }}
        >
          {tasks.map((task, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.md,
                padding: `${SPACING.md}px ${SPACING.lg}px`,
                backgroundColor: `${COLORS.dreamer.primary}08`,
                borderRadius: RADIUS.md,
                border: `1px solid ${COLORS.dreamer.primary}20`,
              }}
            >
              <span
                style={{
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.dreamer.tertiary,
                }}
              >
                ◆
              </span>
              <span
                style={{
                  fontSize: TYPOGRAPHY.sizes.sm,
                  color: COLORS.textSecondary,
                }}
              >
                {task}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};
