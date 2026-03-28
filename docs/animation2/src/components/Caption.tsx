import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface CaptionProps {
  text: string;
  subtext?: string;
  isVisible?: boolean;
  style?: React.CSSProperties;
}

export const Caption: React.FC<CaptionProps> = ({
  text,
  subtext,
  isVisible = true,
  style,
}) => {
  if (!isVisible) return null;
  
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        maxWidth: 800,
        ...style,
      }}
    >
      <div
        style={{
          background: 'rgba(10, 10, 15, 0.9)',
          border: `1px solid ${COLORS.borderHighlight}`,
          borderRadius: LAYOUT.borderRadius,
          padding: '16px 32px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <p
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.lg,
            fontWeight: TYPOGRAPHY.weights.medium,
            color: COLORS.textPrimary,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {text}
        </p>
        {subtext && (
          <p
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.sm,
              color: COLORS.textSecondary,
              margin: '8px 0 0 0',
              lineHeight: 1.4,
            }}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};
