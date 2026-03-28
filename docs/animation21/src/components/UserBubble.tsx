import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface UserBubbleProps {
  text: string;
  opacity?: number;
  scale?: number;
}

export const UserBubble: React.FC<UserBubbleProps> = ({
  text,
  opacity = 1,
  scale = 1,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'right center',
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          padding: `${SPACING.md}px ${SPACING.lg}px`,
          backgroundColor: COLORS.bgTertiary,
          borderRadius: `${RADIUS.lg}px ${RADIUS.lg}px ${RADIUS.sm}px ${RADIUS.lg}px`,
          border: `1px solid ${COLORS.borderSecondary}`,
        }}
      >
        <p
          style={{
            fontSize: TYPOGRAPHY.sizes.base,
            color: COLORS.textPrimary,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
