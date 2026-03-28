import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT, COMPONENTS } from '../constants';

interface HistorianPanelProps {
  status: 'idle' | 'monitoring' | 'preparing' | 'processing' | 'complete';
  progress?: number;
  style?: React.CSSProperties;
}

export const HistorianPanel: React.FC<HistorianPanelProps> = ({
  status,
  progress = 0,
  style,
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'idle':
        return 'Standby';
      case 'monitoring':
        return 'Monitoring context pressure';
      case 'preparing':
        return 'Preparing background compaction';
      case 'processing':
        return 'Processing history...';
      case 'complete':
        return 'Compaction complete';
      default:
        return 'Standby';
    }
  };
  
  const isActive = status !== 'idle';
  
  return (
    <div
      style={{
        width: COMPONENTS.historianPanel.width,
        height: COMPONENTS.historianPanel.height,
        backgroundColor: COLORS.card,
        borderRadius: LAYOUT.borderRadius.lg,
        border: `1px solid ${isActive ? COLORS.historian.primary : COLORS.border}`,
        padding: LAYOUT.padding.lg,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: isActive 
          ? `0 4px 24px ${COLORS.historian.glow}` 
          : '0 4px 12px rgba(0,0,0,0.2)',
        ...style,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: isActive ? COLORS.historian.primary : COLORS.text.muted,
            boxShadow: isActive ? `0 0 8px ${COLORS.historian.primary}` : 'none',
          }}
        />
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.base,
            fontWeight: TYPOGRAPHY.weights.semibold,
            color: isActive ? COLORS.historian.primary : COLORS.text.secondary,
          }}
        >
          Historian
        </span>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.text.muted,
            marginLeft: 'auto',
          }}
        >
          (background)
        </span>
      </div>
      
      {/* Status text */}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          fontSize: TYPOGRAPHY.sizes.sm,
          color: COLORS.text.secondary,
        }}
      >
        {getStatusText()}
      </span>
      
      {/* Progress bar (only when processing) */}
      {status === 'processing' && (
        <div
          style={{
            width: '100%',
            height: 4,
            backgroundColor: COLORS.backgroundTertiary,
            borderRadius: LAYOUT.borderRadius.full,
            overflow: 'hidden',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: COLORS.historian.primary,
              borderRadius: LAYOUT.borderRadius.full,
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      )}
    </div>
  );
};
