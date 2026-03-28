import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface TerminalProps {
  lines: string[];
  style?: React.CSSProperties;
  isFrozen?: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  style,
  isFrozen = false,
}) => {
  return (
    <div
      style={{
        width: 400,
        height: 200,
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: LAYOUT.borderRadius.lg,
        border: `1px solid ${COLORS.border}`,
        padding: LAYOUT.padding.md,
        fontFamily: TYPOGRAPHY.fontFamilyMono,
        fontSize: TYPOGRAPHY.sizes.xs,
        overflow: 'hidden',
        opacity: isFrozen ? 0.5 : 1,
        ...style,
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#ff5f56',
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#ffbd2e',
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#27c93f',
          }}
        />
        <span
          style={{
            marginLeft: 'auto',
            color: COLORS.text.muted,
            fontSize: '10px',
          }}
        >
          terminal
        </span>
      </div>
      
      {/* Terminal content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {lines.slice(-8).map((line, idx) => (
          <div
            key={idx}
            style={{
              color: line.startsWith('✓') 
                ? COLORS.success 
                : line.startsWith('✗') 
                  ? COLORS.error 
                  : line.startsWith('→') 
                    ? COLORS.magicContext.primary 
                    : COLORS.text.secondary,
              opacity: idx === lines.slice(-8).length - 1 ? 1 : 0.7,
            }}
          >
            {line}
          </div>
        ))}
        
        {/* Cursor */}
        {!isFrozen && (
          <span
            style={{
              color: COLORS.magicContext.primary,
              animation: 'blink 1s step-end infinite',
            }}
          >
            ▊
          </span>
        )}
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
