import React from 'react';
import { COLORS, TYPOGRAPHY, LAYOUT } from '../constants';

interface StructuredOutputsProps {
  compartments: Array<{ title: string; tags?: string[] }>;
  facts: string[];
  memories: string[];
  style?: React.CSSProperties;
}

export const StructuredOutputs: React.FC<StructuredOutputsProps> = ({
  compartments,
  facts,
  memories,
  style,
}) => {
  return (
    <div
      style={{
        width: 320,
        backgroundColor: COLORS.card,
        borderRadius: LAYOUT.borderRadius.lg,
        border: `1px solid ${COLORS.border}`,
        padding: LAYOUT.padding.lg,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...style,
      }}
    >
      {/* Header */}
      <span
        style={{
          fontFamily: TYPOGRAPHY.fontFamily,
          fontSize: TYPOGRAPHY.sizes.sm,
          fontWeight: TYPOGRAPHY.weights.semibold,
          color: COLORS.text.secondary,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Structured Outputs
      </span>
      
      {/* Compartments section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.magicContext.primary,
            fontWeight: TYPOGRAPHY.weights.medium,
          }}
        >
          Compartments
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {compartments.slice(0, 3).map((comp, idx) => (
            <div
              key={idx}
              style={{
                padding: '8px 12px',
                backgroundColor: `${COLORS.magicContext.primary}10`,
                borderRadius: LAYOUT.borderRadius.md,
                border: `1px solid ${COLORS.magicContext.primary}30`,
              }}
            >
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: TYPOGRAPHY.sizes.xs,
                  color: COLORS.text.secondary,
                }}
              >
                {comp.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Facts section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.magicContext.secondary,
            fontWeight: TYPOGRAPHY.weights.medium,
          }}
        >
          Session Facts
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {facts.slice(0, 4).map((fact, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: TYPOGRAPHY.fontFamily,
                fontSize: '10px',
                color: COLORS.text.tertiary,
                backgroundColor: COLORS.backgroundTertiary,
                padding: '4px 8px',
                borderRadius: LAYOUT.borderRadius.full,
              }}
            >
              {fact}
            </span>
          ))}
        </div>
      </div>
      
      {/* Memory section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span
          style={{
            fontFamily: TYPOGRAPHY.fontFamily,
            fontSize: TYPOGRAPHY.sizes.xs,
            color: COLORS.magicContext.tertiary,
            fontWeight: TYPOGRAPHY.weights.medium,
          }}
        >
          Memory
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {memories.slice(0, 2).map((mem, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                backgroundColor: `${COLORS.magicContext.tertiary}10`,
                borderRadius: LAYOUT.borderRadius.md,
                border: `1px solid ${COLORS.magicContext.tertiary}30`,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '3px',
                  backgroundColor: COLORS.magicContext.tertiary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.background}
                  strokeWidth="3"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontSize: '10px',
                  color: COLORS.text.tertiary,
                }}
              >
                {mem.length > 35 ? mem.slice(0, 35) + '...' : mem}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
