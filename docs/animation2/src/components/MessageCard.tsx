import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface MessageCardProps {
  id?: string;
  content: string;
  type?: 'tool' | 'thought' | 'decision' | 'log';
  isCompact?: boolean;
  isHighlighted?: boolean;
  isGhosted?: boolean;
  style?: React.CSSProperties;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  id,
  content,
  type = 'log',
  isCompact = false,
  isHighlighted = false,
  isGhosted = false,
  style,
}) => {
  const typeColors: Record<string, string> = {
    tool: COLORS.info,
    thought: COLORS.historian.primary,
    decision: COLORS.success,
    log: COLORS.textSecondary,
  };
  
  return (
    <div
      style={{
        background: isHighlighted ? 'rgba(6, 182, 212, 0.1)' : COLORS.bgCard,
        border: `1px solid ${isHighlighted ? COLORS.magicContext.primary : isGhosted ? 'rgba(100, 116, 139, 0.3)' : COLORS.border}`,
        borderRadius: LAYOUT.borderRadiusSm,
        padding: isCompact ? '8px 12px' : '12px 16px',
        minWidth: isCompact ? 180 : 220,
        maxWidth: isCompact ? 220 : 280,
        opacity: isGhosted ? 0.5 : 1,
        transform: isGhosted ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.3s ease',
        ...style,
      }}
    >
      {id && (
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.textMuted,
            marginBottom: 4,
          }}
        >
          {id}
        </div>
      )}
      
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: typeColors[type],
            marginTop: 6,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: isCompact ? TYPOGRAPHY.sizes.xs : TYPOGRAPHY.sizes.sm,
            color: isGhosted ? COLORS.textMuted : COLORS.textPrimary,
            lineHeight: 1.4,
          }}
        >
          {content}
        </span>
      </div>
    </div>
  );
};
