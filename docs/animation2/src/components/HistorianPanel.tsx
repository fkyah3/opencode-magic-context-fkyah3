import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface HistorianPanelProps {
  status: string;
  isActive?: boolean;
  progress?: number;
  style?: React.CSSProperties;
}

export const HistorianPanel: React.FC<HistorianPanelProps> = ({
  status,
  isActive = false,
  progress,
  style,
}) => {
  return (
    <div
      style={{
        background: isActive ? 'rgba(139, 92, 246, 0.1)' : COLORS.bgPanel,
        border: `1px solid ${isActive ? COLORS.historian.primary : COLORS.border}`,
        borderRadius: LAYOUT.borderRadius,
        padding: '20px 24px',
        minWidth: 280,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Accent glow when active */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: COLORS.historian.primary,
            boxShadow: `0 0 20px ${COLORS.historian.primary}`,
          }}
        />
      )}
      
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
          Background Worker
        </span>
      </div>
      
      <div
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.xl,
          fontWeight: TYPOGRAPHY.weights.semibold,
          color: isActive ? COLORS.historian.primary : COLORS.textPrimary,
          marginBottom: 12,
        }}
      >
        Historian
      </div>
      
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
              border: `2px solid ${COLORS.historian.primary}`,
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite',
            }}
          />
        )}
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.sm,
            color: isActive ? COLORS.historian.primary : COLORS.textSecondary,
          }}
        >
          {status}
        </span>
      </div>
      
      {progress !== undefined && (
        <div
          style={{
            marginTop: 12,
            height: 4,
            background: COLORS.bgElevated,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: COLORS.historian.primary,
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      )}
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
