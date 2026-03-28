import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface StatusChipProps {
  label: string;
  isActive?: boolean;
  accentColor?: string;
  style?: React.CSSProperties;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  label,
  isActive = true,
  accentColor = COLORS.magicContext.primary,
  style,
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        background: isActive ? `${accentColor}15` : COLORS.bgElevated,
        border: `1px solid ${isActive ? accentColor : COLORS.border}`,
        borderRadius: 6,
        ...style,
      }}
    >
      {isActive && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: accentColor,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      )}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: isActive ? accentColor : COLORS.textMuted,
          fontWeight: TYPOGRAPHY.weights.medium,
        }}
      >
        {label}
      </span>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
