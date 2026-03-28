import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface CompartmentCardProps {
  title: string;
  tags?: string[];
  density?: 'low' | 'medium' | 'high';
  isMerged?: boolean;
  style?: React.CSSProperties;
}

export const CompartmentCard: React.FC<CompartmentCardProps> = ({
  title,
  tags = [],
  density = 'medium',
  isMerged = false,
  style,
}) => {
  const getDensityColor = () => {
    switch (density) {
      case 'low':
        return COLORS.magicContext.tertiary;
      case 'medium':
        return COLORS.magicContext.primary;
      case 'high':
        return COLORS.magicContext.secondary;
      default:
        return COLORS.magicContext.primary;
    }
  };
  
  return (
    <div
      style={{
        width: 200,
        height: 80,
        backgroundColor: isMerged ? COLORS.backgroundTertiary : COLORS.card,
        borderRadius: LAYOUT.borderRadius.md,
        border: `1px solid ${isMerged ? COLORS.text.muted : COLORS.magicContext.primary}`,
        padding: LAYOUT.padding.md,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: isMerged 
          ? 'none' 
          : `0 2px 12px ${COLORS.magicContext.glow}`,
        ...style,
      }}
    >
      {/* Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '2px',
            backgroundColor: getDensityColor(),
          }}
        />
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.medium,
            color: COLORS.text.primary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>
      </div>
      
      {/* Tags */}
      {tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '4px',
            flexWrap: 'wrap',
          }}
        >
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: TYPOGRAPHY.fontFamilyMono,
                fontSize: '9px',
                color: COLORS.text.tertiary,
                backgroundColor: COLORS.backgroundTertiary,
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Density indicator */}
      <div
        style={{
          display: 'flex',
          gap: '2px',
          marginTop: 'auto',
        }}
      >
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            style={{
              width: 12,
              height: 3,
              borderRadius: '1px',
              backgroundColor: level <= (density === 'low' ? 1 : density === 'medium' ? 2 : 3)
                ? getDensityColor()
                : COLORS.backgroundTertiary,
            }}
          />
        ))}
      </div>
    </div>
  );
};
