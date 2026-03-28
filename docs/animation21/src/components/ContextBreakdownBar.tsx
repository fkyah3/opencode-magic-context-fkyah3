import React from 'react';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../constants';

interface ContextBreakdownBarProps {
  userPercent: number;
  assistantPercent: number;
  toolPercent: number;
  systemPercent?: number;
  opacity?: number;
}

export const ContextBreakdownBar: React.FC<ContextBreakdownBarProps> = ({
  userPercent,
  assistantPercent,
  toolPercent,
  systemPercent = 0,
  opacity = 1,
}) => {
  return (
    <div style={{ opacity }}>
      <div
        style={{
          display: 'flex',
          height: 8,
          backgroundColor: COLORS.bgTertiary,
          borderRadius: RADIUS.sm,
          overflow: 'hidden',
          marginBottom: SPACING.sm,
        }}
      >
        <div
          style={{
            width: `${userPercent}%`,
            backgroundColor: '#3b82f6',
          }}
        />
        <div
          style={{
            width: `${assistantPercent}%`,
            backgroundColor: COLORS.magicContext.primary,
          }}
        />
        <div
          style={{
            width: `${toolPercent}%`,
            backgroundColor: '#8b5cf6',
          }}
        />
        {systemPercent > 0 && (
          <div
            style={{
              width: `${systemPercent}%`,
              backgroundColor: COLORS.textMuted,
            }}
          />
        )}
      </div>
      
      <div
        style={{
          display: 'flex',
          gap: SPACING.lg,
          fontSize: TYPOGRAPHY.sizes.xs,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
          <div style={{ width: 8, height: 8, backgroundColor: '#3b82f6', borderRadius: 2 }} />
          <span style={{ color: COLORS.textTertiary }}>User {userPercent}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
          <div style={{ width: 8, height: 8, backgroundColor: COLORS.magicContext.primary, borderRadius: 2 }} />
          <span style={{ color: COLORS.textTertiary }}>Assistant {assistantPercent}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
          <div style={{ width: 8, height: 8, backgroundColor: '#8b5cf6', borderRadius: 2 }} />
          <span style={{ color: COLORS.textTertiary }}>Tool {toolPercent}%</span>
        </div>
        {systemPercent > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.xs }}>
            <div style={{ width: 8, height: 8, backgroundColor: COLORS.textMuted, borderRadius: 2 }} />
            <span style={{ color: COLORS.textTertiary }}>System {systemPercent}%</span>
          </div>
        )}
      </div>
    </div>
  );
};
