import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants';

interface TerminalProps {
  lines: string[];
  isActive?: boolean;
  style?: React.CSSProperties;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  isActive = true,
  style,
}) => {
  return (
    <div
      style={{
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: LAYOUT.borderRadiusSm,
        padding: '16px',
        fontFamily: 'monospace',
        fontSize: TYPOGRAPHY.sizes.xs,
        minHeight: 120,
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            color: line.startsWith('✓') ? COLORS.success : 
                   line.startsWith('✗') ? COLORS.danger :
                   line.startsWith('→') ? COLORS.info :
                   line.startsWith('$') ? COLORS.historian.primary :
                   COLORS.textSecondary,
            marginBottom: 4,
            opacity: isActive ? 1 : 0.5,
          }}
        >
          {line}
        </div>
      ))}
      {isActive && (
        <div
          style={{
            display: 'inline-block',
            width: 8,
            height: 14,
            background: COLORS.magicContext.primary,
            animation: 'blink 1s step-end infinite',
            marginLeft: 2,
          }}
        />
      )}
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
