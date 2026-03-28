import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS, TYPOGRAPHY, LAYOUT, COMPONENTS } from '../constants';

interface ContextMeterProps {
  percentage: number;
  style?: React.CSSProperties;
  showThreshold?: boolean;
  variant?: 'oldWay' | 'magicContext';
}

export const ContextMeter: React.FC<ContextMeterProps> = ({
  percentage,
  style,
  showThreshold = true,
  variant = 'magicContext',
}) => {
  const frame = useCurrentFrame();
  
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  
  // Determine color based on percentage and variant
  const getBarColor = () => {
    if (variant === 'oldWay') {
      if (clampedPercentage >= 100) return COLORS.oldWay.tertiary;
      if (clampedPercentage >= 90) return COLORS.oldWay.secondary;
      if (clampedPercentage >= 75) return COLORS.oldWay.primary;
      return COLORS.magicContext.primary;
    } else {
      if (clampedPercentage >= 100) return COLORS.error;
      if (clampedPercentage >= 90) return COLORS.warning;
      if (clampedPercentage >= 75) return COLORS.magicContext.primary;
      return COLORS.magicContext.tertiary;
    }
  };
  
  // Warning pulse when near threshold
  const warningPulse = clampedPercentage >= 90 && clampedPercentage < 100
    ? interpolate(frame % 30, [0, 15, 30], [0, 0.3, 0], {
        easing: Easing.inOut(Easing.ease),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  
  const barColor = getBarColor();
  
  return (
    <div
      style={{
        width: COMPONENTS.contextMeter.width,
        ...style,
      }}
    >
      {/* Label row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            fontWeight: TYPOGRAPHY.weights.medium,
            color: COLORS.text.secondary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Context Pressure
        </span>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamilyMono,
            fontSize: TYPOGRAPHY.sizes.sm,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: clampedPercentage >= 90 ? barColor : COLORS.text.primary,
          }}
        >
          {Math.round(clampedPercentage)}%
        </span>
      </div>
      
      {/* Meter bar container */}
      <div
        style={{
          width: '100%',
          height: COMPONENTS.contextMeter.height,
          backgroundColor: COLORS.backgroundTertiary,
          borderRadius: LAYOUT.borderRadius.full,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: warningPulse > 0 
            ? `0 0 ${20 * warningPulse}px ${barColor}` 
            : 'none',
        }}
      >
        {/* Threshold markers */}
        {showThreshold && (
          <>
            <div
              style={{
                position: 'absolute',
                left: '75%',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: `${COLORS.text.muted}40`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '90%',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: `${COLORS.warning}60`,
              }}
            />
          </>
        )}
        
        {/* Fill bar */}
        <div
          style={{
            width: `${clampedPercentage}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: LAYOUT.borderRadius.full,
            transition: 'width 0.1s linear',
            boxShadow: `0 0 12px ${barColor}60`,
          }}
        />
      </div>
      
      {/* Threshold labels */}
      {showThreshold && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px',
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: '10px',
              color: COLORS.text.muted,
            }}
          >
            0%
          </span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: '10px',
              color: clampedPercentage >= 75 ? COLORS.text.secondary : COLORS.text.muted,
            }}
          >
            75%
          </span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: '10px',
              color: clampedPercentage >= 90 ? COLORS.warning : COLORS.text.muted,
            }}
          >
            90%
          </span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: '10px',
              color: clampedPercentage >= 100 ? COLORS.error : COLORS.text.muted,
            }}
          >
            100%
          </span>
        </div>
      )}
    </div>
  );
};
