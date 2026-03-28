import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface MemoryCardProps {
  title: string;
  description?: string;
  isArchived?: boolean;
  style?: React.CSSProperties;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  title,
  description,
  isArchived = false,
  style,
}) => {
  return (
    <div
      style={{
        background: isArchived ? 'rgba(100, 116, 139, 0.1)' : 'rgba(34, 197, 94, 0.1)',
        border: `1px solid ${isArchived ? COLORS.textMuted : COLORS.success}`,
        borderRadius: LAYOUT.borderRadius,
        padding: '14px 18px',
        minWidth: 220,
        maxWidth: 300,
        position: 'relative',
        ...style,
      }}
    >
      {/* Vault indicator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: isArchived ? COLORS.textMuted : COLORS.success,
          boxShadow: isArchived ? 'none' : `0 0 10px ${COLORS.success}`,
        }}
      />
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: description ? 8 : 0,
        }}
      >
        <span
          style={{
            fontSize: TYPOGRAPHY.sizes.base,
          }}
        >
          {isArchived ? '📦' : '🔒'}
        </span>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: isArchived ? COLORS.textMuted : COLORS.textPrimary,
          }}
        >
          {title}
        </span>
      </div>
      
      {description && (
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.textSecondary,
            lineHeight: 1.4,
          }}
        >
          {description}
        </span>
      )}
    </div>
  );
};
