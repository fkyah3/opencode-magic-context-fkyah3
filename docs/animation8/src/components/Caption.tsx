import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface CaptionProps {
  text: string | string[];
  style?: React.CSSProperties;
}

export const Caption: React.FC<CaptionProps> = ({
  text,
  style,
}) => {
  const lines = Array.isArray(text) ? text : [text];
  
  return (
    <div
      style={{
        maxWidth: 800,
        padding: `${LAYOUT.padding.xl} ${LAYOUT.padding['2xl']}`,
        backgroundColor: `${COLORS.background}80`,
        borderRadius: LAYOUT.borderRadius.xl,
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {lines.map((line, idx) => (
        <p
          key={idx}
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes['2xl'],
            fontWeight: TYPOGRAPHY.weights.medium,
            color: COLORS.text.primary,
            textAlign: 'center',
            lineHeight: TYPOGRAPHY.lineHeights.relaxed,
            margin: 0,
            marginBottom: idx < lines.length - 1 ? '8px' : 0,
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
};
