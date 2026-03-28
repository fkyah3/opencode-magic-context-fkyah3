import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface MemoryCardProps {
  content: string;
  isArchived?: boolean;
  style?: React.CSSProperties;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  content,
  isArchived = false,
  style,
}) => {
  return (
    <div
      style={{
        width: 240,
        padding: LAYOUT.padding.md,
        backgroundColor: isArchived 
          ? COLORS.backgroundSecondary 
          : `${COLORS.magicContext.secondary}10`,
        borderRadius: LAYOUT.borderRadius.md,
        border: `1px solid ${isArchived 
          ? COLORS.border 
          : COLORS.magicContext.secondary}`,
        boxShadow: isArchived 
          ? 'none' 
          : `0 2px 8px ${COLORS.magicContext.glow}`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        ...style,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '4px',
          backgroundColor: isArchived 
            ? COLORS.text.muted 
            : COLORS.magicContext.secondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.background}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      
      {/* Content */}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: isArchived ? COLORS.text.tertiary : COLORS.text.secondary,
          lineHeight: TYPOGRAPHY.lineHeights.normal,
        }}
      >
        {content}
      </span>
    </div>
  );
};
