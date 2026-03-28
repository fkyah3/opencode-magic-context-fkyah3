import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface RawMessageRowProps {
  type: 'user' | 'assistant' | 'tool';
  content: string;
  tokens: number;
  opacity?: number;
  highlighted?: boolean;
  highlightColor?: string;
  compact?: boolean;
}

export const RawMessageRow: React.FC<RawMessageRowProps> = ({
  type,
  content,
  tokens,
  opacity = 1,
  highlighted = false,
  highlightColor = COLORS.historian.primary,
  compact = false,
}) => {
  const typeColors = {
    user: COLORS.textSecondary,
    assistant: COLORS.magicContext.primary,
    tool: COLORS.textTertiary,
  };
  
  const typeLabels = {
    user: 'USR',
    assistant: 'AST',
    tool: 'TOOL',
  };
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.sm,
        padding: `${compact ? SPACING.xs : SPACING.sm}px ${SPACING.md}px`,
        backgroundColor: highlighted ? `${highlightColor}15` : COLORS.bgCard,
        borderRadius: RADIUS.md,
        border: highlighted ? `1px solid ${highlightColor}40` : `1px solid ${COLORS.borderSecondary}`,
        opacity,
      }}
    >
      <span
        style={{
          fontSize: TYPOGRAPHY.sizes.xs,
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          color: typeColors[type],
          fontWeight: TYPOGRAPHY.weights.semibold,
          minWidth: 36,
        }}
      >
        {typeLabels[type]}
      </span>
      <span
        style={{
          flex: 1,
          fontSize: TYPOGRAPHY.sizes.xs,
          color: COLORS.textSecondary,
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {content}
      </span>
      <span
        style={{
          fontSize: TYPOGRAPHY.sizes.xs,
          color: COLORS.textMuted,
          fontFamily: TYPOGRAPHY.fontFamilyMono,
        }}
      >
        {tokens.toLocaleString()}t
      </span>
    </div>
  );
};
