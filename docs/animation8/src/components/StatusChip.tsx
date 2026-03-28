import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface StatusChipProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  style?: React.CSSProperties;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  text,
  variant = 'default',
  style,
}) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      case 'error':
        return COLORS.error;
      case 'info':
        return COLORS.info;
      default:
        return COLORS.text.secondary;
    }
  };
  
  const color = getVariantColor();
  
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        backgroundColor: `${color}15`,
        borderRadius: LAYOUT.borderRadius.full,
        border: `1px solid ${color}30`,
        ...style,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: color,
          fontWeight: TYPOGRAPHY.weights.medium,
        }}
      >
        {text}
      </span>
    </div>
  );
};
