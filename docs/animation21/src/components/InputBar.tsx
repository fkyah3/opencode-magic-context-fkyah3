import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface InputBarProps {
  placeholder?: string;
  opacity?: number;
  disabled?: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({
  placeholder = 'Type a message...',
  opacity = 1,
  disabled = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: `${SPACING.md}px ${SPACING.lg}px`,
        backgroundColor: disabled ? COLORS.bgSecondary : COLORS.bgTertiary,
        borderRadius: RADIUS.lg,
        border: `1px solid ${disabled ? COLORS.borderSecondary : COLORS.borderPrimary}`,
        opacity,
        marginTop: SPACING.lg,
      }}
    >
      <span
        style={{
          fontSize: TYPOGRAPHY.sizes.base,
          color: disabled ? COLORS.textMuted : COLORS.textSecondary,
          flex: 1,
        }}
      >
        {disabled ? 'Context limit reached' : placeholder}
      </span>
      
      {!disabled && (
        <div
          style={{
            width: 8,
            height: 16,
            backgroundColor: COLORS.magicContext.primary,
            borderRadius: 2,
            animation: 'blink 1s infinite',
          }}
        />
      )}
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
