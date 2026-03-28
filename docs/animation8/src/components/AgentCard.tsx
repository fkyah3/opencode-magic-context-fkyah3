import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { COLORS, TYPOGRAPHY, LAYOUT, COMPONENTS } from '../constants';

interface AgentCardProps {
  title: string;
  subtitle: string;
  status: 'active' | 'blocked' | 'idle' | 'background';
  variant?: 'main' | 'historian' | 'dreamer' | 'sidekick';
  style?: React.CSSProperties;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  title,
  subtitle,
  status,
  variant = 'main',
  style,
}) => {
  const frame = useCurrentFrame();
  
  // Subtle pulse animation for active status
  const pulseOpacity = status === 'active' 
    ? interpolate(frame % 60, [0, 30, 60], [1, 0.6, 1], {
        easing: Easing.inOut(Easing.ease),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;
  
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return variant === 'main' ? COLORS.magicContext.primary : 
               variant === 'historian' ? COLORS.historian.primary :
               variant === 'dreamer' ? COLORS.dreamer.primary :
               COLORS.sidekick.primary;
      case 'blocked':
        return COLORS.oldWay.primary;
      case 'background':
        return COLORS.text.tertiary;
      default:
        return COLORS.text.muted;
    }
  };
  
  const getBorderColor = () => {
    switch (variant) {
      case 'main':
        return status === 'blocked' ? COLORS.oldWay.primary : COLORS.magicContext.primary;
      case 'historian':
        return COLORS.historian.primary;
      case 'dreamer':
        return COLORS.dreamer.primary;
      case 'sidekick':
        return COLORS.sidekick.primary;
      default:
        return COLORS.borderLight;
    }
  };
  
  return (
    <div
      style={{
        width: COMPONENTS.agentCard.width,
        height: COMPONENTS.agentCard.height,
        backgroundColor: COLORS.card,
        borderRadius: LAYOUT.borderRadius.lg,
        border: `1px solid ${getBorderColor()}`,
        padding: LAYOUT.padding.lg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: `0 4px 24px ${getBorderColor()}20`,
        ...style,
      }}
    >
      {/* Header with title and status dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: COMPONENTS.agentCard.statusDotSize,
            height: COMPONENTS.agentCard.statusDotSize,
            borderRadius: '50%',
            backgroundColor: getStatusColor(),
            opacity: pulseOpacity,
            boxShadow: `0 0 8px ${getStatusColor()}`,
          }}
        />
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.lg,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: COLORS.text.primary,
          }}
        >
          {title}
        </span>
      </div>
      
      {/* Subtitle / Status */}
      <div
        style={{
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          fontSize: TYPOGRAPHY.sizes.sm,
          color: status === 'blocked' ? COLORS.oldWay.primary : COLORS.text.secondary,
          letterSpacing: '0.02em',
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};
