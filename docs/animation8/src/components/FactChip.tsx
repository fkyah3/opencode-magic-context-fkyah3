import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface FactChipProps {
  text: string;
  isPromoted?: boolean;
  style?: React.CSSProperties;
}

export const FactChip: React.FC<FactChipProps> = ({
  text,
  isPromoted = false,
  style,
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 12px',
        backgroundColor: isPromoted 
          ? `${COLORS.magicContext.secondary}20`
          : COLORS.backgroundTertiary,
        borderRadius: LAYOUT.borderRadius.full,
        border: `1px solid ${isPromoted 
          ? COLORS.magicContext.secondary 
          : COLORS.borderLight}`,
        boxShadow: isPromoted 
          ? `0 0 8px ${COLORS.magicContext.glow}` 
          : 'none',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: isPromoted ? COLORS.magicContext.secondary : COLORS.text.secondary,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </div>
  );
};
