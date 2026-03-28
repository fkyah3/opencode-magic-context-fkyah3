import React from 'react';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants';

interface ContextStatProps {
  label: string;
  value: string | number;
  subvalue?: string;
  color?: string;
  pulse?: boolean;
  barProgress?: number;
  barColor?: string;
}

export const ContextStat: React.FC<ContextStatProps> = ({
  label,
  value,
  subvalue,
  color = COLORS.textPrimary,
  pulse = false,
  barProgress,
  barColor = COLORS.magicContext.primary,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xs }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.sm,
            color: COLORS.textTertiary,
          }}
        >
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
          <span
            style={{
              fontSize: TYPOGRAPHY.sizes.base,
              fontWeight: TYPOGRAPHY.weights.semibold,
              color,
              fontFamily: TYPOGRAPHY.fontFamilyMono,
            }}
          >
            {value}
          </span>
          {subvalue && (
            <span
              style={{
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.textMuted,
                fontFamily: TYPOGRAPHY.fontFamilyMono,
              }}
            >
              {subvalue}
            </span>
          )}
        </div>
      </div>
      
      {barProgress !== undefined && (
        <div
          style={{
            height: 4,
            backgroundColor: COLORS.bgTertiary,
            borderRadius: 2,
            overflow: 'hidden',
            marginTop: SPACING.xs,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${barProgress}%`,
              backgroundColor: barColor,
              borderRadius: 2,
              transition: 'width 0.3s ease',
              boxShadow: pulse ? `0 0 10px ${barColor}60` : 'none',
            }}
          />
        </div>
      )}
    </div>
  );
};
