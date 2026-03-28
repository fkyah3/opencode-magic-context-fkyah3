import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY, interpolate } from '../constants';

interface ContextMeterProps {
  percentage: number;
  frame: number;
  startFrame?: number;
  endFrame?: number;
  startValue?: number;
  endValue?: number;
  isWarning?: boolean;
  style?: React.CSSProperties;
}

export const ContextMeter: React.FC<ContextMeterProps> = ({
  percentage,
  frame,
  startFrame,
  endFrame,
  startValue,
  endValue,
  isWarning = false,
  style,
}) => {
  // Animate the percentage if start/end frames provided
  const animatedPercentage = startFrame !== undefined && endFrame !== undefined && startValue !== undefined && endValue !== undefined
    ? interpolate(frame, startFrame, endFrame, startValue, endValue)
    : percentage;
  
  const clampedPercentage = Math.min(100, Math.max(0, animatedPercentage));
  
  // Determine color based on percentage
  let barColor = COLORS.magicContext.primary;
  if (clampedPercentage > 90) {
    barColor = COLORS.danger;
  } else if (clampedPercentage > 75) {
    barColor = COLORS.warning;
  }
  
  const showWarning = isWarning || clampedPercentage > 95;
  
  return (
    <div
      style={{
        background: COLORS.bgPanel,
        border: `1px solid ${showWarning ? COLORS.danger : COLORS.border}`,
        borderRadius: LAYOUT.borderRadius,
        padding: '20px 24px',
        minWidth: 240,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            fontWeight: TYPOGRAPHY.weights.medium,
            color: COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Context Pressure
        </span>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.lg,
            fontWeight: TYPOGRAPHY.weights.bold,
            color: showWarning ? COLORS.danger : COLORS.textPrimary,
          }}
        >
          {Math.round(clampedPercentage)}%
        </span>
      </div>
      
      {/* Progress bar background */}
      <div
        style={{
          height: 8,
          background: COLORS.bgElevated,
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Threshold markers */}
        <div
          style={{
            position: 'absolute',
            left: '75%',
            top: 0,
            bottom: 0,
            width: 2,
            background: 'rgba(245, 158, 11, 0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '90%',
            top: 0,
            bottom: 0,
            width: 2,
            background: 'rgba(239, 68, 68, 0.3)',
          }}
        />
        
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width: `${clampedPercentage}%`,
            background: barColor,
            borderRadius: 4,
            transition: 'width 0.1s linear',
            boxShadow: showWarning ? `0 0 20px ${barColor}` : 'none',
          }}
        />
      </div>
      
      {/* Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 8,
        }}
      >
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.textMuted,
          }}
        >
          0%
        </span>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.textMuted,
          }}
        >
          100%
        </span>
      </div>
      
      {showWarning && (
        <div
          style={{
            marginTop: 12,
            padding: '8px 12px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: LAYOUT.borderRadiusSm,
            border: `1px solid rgba(239, 68, 68, 0.3)`,
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.xs,
              color: COLORS.danger,
              fontWeight: TYPOGRAPHY.weights.medium,
            }}
          >
            ⚠ Context limit approaching
          </span>
        </div>
      )}
    </div>
  );
};
