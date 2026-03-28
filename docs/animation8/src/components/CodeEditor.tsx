import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface CodeEditorProps {
  filename: string;
  code: string;
  highlightLines?: number[];
  isFrozen?: boolean;
  style?: React.CSSProperties;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  filename,
  code,
  highlightLines = [],
  isFrozen = false,
  style,
}) => {
  const lines = code.split('\n');
  
  return (
    <div
      style={{
        width: 480,
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: LAYOUT.borderRadius.lg,
        border: `1px solid ${COLORS.border}`,
        overflow: 'hidden',
        opacity: isFrozen ? 0.5 : 1,
        ...style,
      }}
    >
      {/* Editor header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
          backgroundColor: COLORS.backgroundTertiary,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '6px',
            marginRight: '16px',
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
        </div>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.text.secondary,
          }}
        >
          {filename}
        </span>
      </div>
      
      {/* Code content */}
      <div
        style={{
          padding: '12px 0',
          fontFamily: TYPOGRAPHY.fontFamilyMono,
          fontSize: '13px',
          lineHeight: '20px',
        }}
      >
        {lines.slice(0, 12).map((line, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              padding: '0 16px',
              backgroundColor: highlightLines.includes(idx + 1) 
                ? `${COLORS.magicContext.primary}20` 
                : 'transparent',
            }}
          >
            <span
              style={{
                width: 30,
                color: COLORS.text.muted,
                textAlign: 'right',
                marginRight: '16px',
                userSelect: 'none',
              }}
            >
              {idx + 1}
            </span>
            <span
              style={{
                color: COLORS.text.secondary,
                whiteSpace: 'pre',
              }}
            >
              {line || ' '}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
