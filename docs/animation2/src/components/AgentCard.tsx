import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface AgentCardProps {
  title: string;
  subtitle?: string;
  status?: string;
  isActive?: boolean;
  accentColor?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  title,
  subtitle,
  status,
  isActive = true,
  accentColor = COLORS.magicContext.primary,
  style,
  children,
}) => {
  return (
    <div
      style={{
        background: COLORS.bgPanel,
        border: `1px solid ${COLORS.border}`,
        borderRadius: LAYOUT.borderRadius,
        padding: '20px 24px',
        minWidth: 280,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: isActive ? accentColor : COLORS.textMuted,
          boxShadow: isActive ? `0 0 20px ${accentColor}` : 'none',
          opacity: isActive ? 1 : 0.5,
        }}
      />
      
      {/* Status LED */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isActive ? COLORS.success : COLORS.textMuted,
          boxShadow: isActive ? `0 0 10px ${COLORS.success}` : 'none',
        }}
      />
      
      <div style={{ marginBottom: 8 }}>
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
          {subtitle || 'Agent'}
        </span>
      </div>
      
      <div
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.xl,
          fontWeight: TYPOGRAPHY.weights.semibold,
          color: COLORS.textPrimary,
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      
      {status && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {isActive && (
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: `2px solid ${accentColor}`,
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
              }}
            />
          )}
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: TYPOGRAPHY.sizes.sm,
              color: isActive ? accentColor : COLORS.textSecondary,
            }}
          >
            {status}
          </span>
        </div>
      )}
      
      {children}
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
