import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface CompartmentCardProps {
  title: string;
  tags?: string[];
  density?: 'high' | 'medium' | 'low';
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
  const densityColors = {
    high: COLORS.historian.primary,
    medium: COLORS.historian.secondary,
    low: COLORS.textMuted,
  };
  
  return (
    <div
      style={{
        background: isMerged ? 'rgba(99, 102, 241, 0.15)' : COLORS.bgCard,
        border: `1px solid ${isMerged ? COLORS.dreamer.primary : COLORS.historian.primary}`,
        borderRadius: LAYOUT.borderRadius,
        padding: '16px 20px',
        minWidth: 200,
        maxWidth: 280,
        position: 'relative',
        ...style,
      }}
    >
      {/* Density indicator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: densityColors[density],
          borderRadius: `${LAYOUT.borderRadius}px ${LAYOUT.borderRadius}px 0 0`,
        }}
      />
      
      {isMerged && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '2px 8px',
            background: 'rgba(99, 102, 241, 0.2)',
            borderRadius: 4,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.dreamer.primary,
              fontWeight: TYPOGRAPHY.weights.medium,
            }}
          >
            Merged
          </span>
        </div>
      )}
      
      <div
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.sm,
          fontWeight: TYPOGRAPHY.weights.semibold,
          color: COLORS.textPrimary,
          marginTop: 8,
          marginBottom: tags.length > 0 ? 12 : 0,
        }}
      >
        {title}
      </div>
      
      {tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: TYPOGRAPHY.sizes.xs,
                color: COLORS.textSecondary,
                background: COLORS.bgElevated,
                padding: '3px 8px',
                borderRadius: 4,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
