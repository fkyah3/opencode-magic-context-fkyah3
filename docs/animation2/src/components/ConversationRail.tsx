import React from 'react';
import { COLORS, LAYOUT } from '../constants';
import { MessageCard } from './MessageCard';

interface ConversationRailProps {
  messages: Array<{
    id: string;
    content: string;
    type?: 'tool' | 'thought' | 'decision' | 'log';
  }>;
  highlightedRange?: { start: number; end: number };
  ghostedRange?: { start: number; end: number };
  headPosition?: number;
  style?: React.CSSProperties;
}

export const ConversationRail: React.FC<ConversationRailProps> = ({
  messages,
  highlightedRange,
  ghostedRange,
  headPosition = 0,
  style,
}) => {
  return (
    <div
      style={{
        background: COLORS.bgElevated,
        border: `1px solid ${COLORS.border}`,
        borderRadius: LAYOUT.borderRadius,
        padding: '20px',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {/* Zone labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 12,
          padding: '0 8px',
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          ← Older History (Head)
        </span>
        <span
          style={{
            fontSize: 11,
            color: COLORS.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Newest Activity (Tail) →
        </span>
      </div>
      
      {/* Rail track */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          padding: '12px 8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {messages.map((msg, index) => {
          const isHighlighted = highlightedRange && 
            index >= highlightedRange.start && 
            index <= highlightedRange.end;
          const isGhosted = ghostedRange && 
            index >= ghostedRange.start && 
            index <= ghostedRange.end;
          
          return (
            <MessageCard
              key={msg.id}
              id={msg.id}
              content={msg.content}
              type={msg.type}
              isCompact={true}
              isHighlighted={!!isHighlighted}
              isGhosted={!!isGhosted}
            />
          );
        })}
      </div>
      
      {/* Head/Tail divider indicator */}
      <div
        style={{
          position: 'absolute',
          left: `calc(33% + ${headPosition}px)`,
          top: 40,
          bottom: 20,
          width: 2,
          background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.5), transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
