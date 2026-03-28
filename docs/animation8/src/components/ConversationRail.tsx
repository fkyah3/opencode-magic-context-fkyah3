import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, TYPOGRAPHY, LAYOUT, COMPONENTS } from '../constants';
import { MessageCard } from './MessageCard';

interface ConversationRailProps {
  messages: Array<{ id: string; content: string }>;
  headSelectionRange?: [number, number] | null;
  showZoneLabels?: boolean;
  style?: React.CSSProperties;
}

export const ConversationRail: React.FC<ConversationRailProps> = ({
  messages,
  headSelectionRange = null,
  showZoneLabels = true,
  style,
}) => {
  const railWidth = 1000;
  const cardWidth = COMPONENTS.conversationRail.messageCardWidth;
  const cardGap = COMPONENTS.conversationRail.gap;
  
  // Calculate visible range based on message count
  const visibleCount = Math.min(messages.length, 12);
  const startIndex = Math.max(0, messages.length - visibleCount);
  const visibleMessages = messages.slice(startIndex);
  
  return (
    <div
      style={{
        width: railWidth,
        height: COMPONENTS.conversationRail.height,
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: LAYOUT.borderRadius.lg,
        border: `1px solid ${COLORS.border}`,
        padding: LAYOUT.padding.md,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Zone labels */}
      {showZoneLabels && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 16px',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: '10px',
              color: COLORS.text.muted,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Head (Older History)
          </span>
          <span
            style={{
              fontFamily: TYPOGRAPHY.fontFamily,
              fontSize: '10px',
              color: COLORS.magicContext.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Tail (Active)
          </span>
        </div>
      )}
      
      {/* Zone divider line */}
      <div
        style={{
          position: 'absolute',
          left: `${COMPONENTS.conversationRail.headZoneWidth * 100}%`,
          top: 24,
          bottom: 16,
          width: '2px',
          backgroundColor: `${COLORS.borderLight}60`,
        }}
      />
      
      {/* Messages container */}
      <div
        style={{
          display: 'flex',
          gap: cardGap,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          overflow: 'hidden',
        }}
      >
        {visibleMessages.map((msg, idx) => {
          const actualIdx = startIndex + idx;
          const isInHeadSelection = headSelectionRange !== null && 
            actualIdx >= headSelectionRange[0] && 
            actualIdx <= headSelectionRange[1];
          
          return (
            <MessageCard
              key={msg.id}
              id={msg.id}
              content={msg.content}
              isHighlighted={isInHeadSelection}
            />
          );
        })}
      </div>
      
      {/* Selection bracket overlay */}
      {headSelectionRange && (
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            height: 76,
            border: `2px solid ${COLORS.historian.primary}`,
            borderRadius: LAYOUT.borderRadius.md,
            boxShadow: `0 0 20px ${COLORS.historian.glow}`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
