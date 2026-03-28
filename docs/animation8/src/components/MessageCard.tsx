import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface MessageCardProps {
  id: string;
  content: string;
  isCompact?: boolean;
  isHighlighted?: boolean;
  isGhosted?: boolean;
  style?: React.CSSProperties;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  id,
  content,
  isCompact = false,
  isHighlighted = false,
  isGhosted = false,
  style,
}) => {
  return (
    <div
      style={{
        minWidth: isCompact ? 80 : 100,
        maxWidth: isCompact ? 100 : 140,
        height: isCompact ? 50 : 60,
        backgroundColor: isHighlighted 
          ? `${COLORS.historian.primary}20`
          : isGhosted
            ? `${COLORS.card}60`
            : COLORS.card,
        borderRadius: LAYOUT.borderRadius.md,
        border: `1px solid ${isHighlighted 
          ? COLORS.historian.primary 
          : isGhosted 
            ? `${COLORS.border}60`
            : COLORS.border}`,
        padding: LAYOUT.padding.sm,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        opacity: isGhosted ? 0.5 : 1,
        boxShadow: isHighlighted 
          ? `0 0 16px ${COLORS.historian.glow}` 
          : 'none',
        ...style,
      }}
    >
      {/* Message ID */}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          fontSize: '10px',
          color: isHighlighted ? COLORS.historian.primary : COLORS.text.muted,
          fontWeight: TYPOGRAPHY.weights.medium,
        }}
      >
        {id}
      </span>
      
      {/* Message content */}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: isGhosted ? COLORS.text.tertiary : COLORS.text.secondary,
          lineHeight: TYPOGRAPHY.lineHeights.tight,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {content}
      </span>
    </div>
  );
};
