import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface FactChipProps {
  content: string;
  isPromoted?: boolean;
  style?: React.CSSProperties;
}

export const FactChip: React.FC<FactChipProps> = ({
  content,
  isPromoted = false,
  style,
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        background: isPromoted ? 'rgba(34, 197, 94, 0.15)' : COLORS.bgElevated,
        border: `1px solid ${isPromoted ? COLORS.success : COLORS.border}`,
        borderRadius: 20,
        ...style,
      }}
    >
      {isPromoted && (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: COLORS.success,
          }}
        />
      )}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: isPromoted ? COLORS.success : COLORS.textSecondary,
          fontWeight: isPromoted ? TYPOGRAPHY.weights.medium : TYPOGRAPHY.weights.normal,
        }}
      >
        {content}
      </span>
    </div>
  );
};
