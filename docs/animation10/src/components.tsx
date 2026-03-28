import type {CSSProperties, ReactNode} from 'react';
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  CODE_LINES,
  COLORS,
  COMPARTMENTS,
  FACTS,
  FONT_FAMILY,
  FONT_MONO,
  HISTORIAN_STATUSES,
  MEMORIES,
  RAIL_MESSAGES,
  SIDEKICK_SOURCES,
  TAIL_MESSAGES,
  TERMINAL_LINES,
  clamp,
  cycle,
  ping,
  progress,
  springProgress,
} from './constants';

const cardRoleColor = {
  user: COLORS.violet,
  assistant: COLORS.magic,
  tool: COLORS.teal,
  system: COLORS.warning,
} as const;

export const Background: React.FC<{mode?: 'default' | 'dreamer'}> = ({mode = 'default'}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 160) * 30;
  const driftY = Math.cos(frame / 220) * 20;
  const accentA = mode === 'dreamer' ? COLORS.dreamer : COLORS.magic;
  const accentB = mode === 'dreamer' ? COLORS.violet : COLORS.teal;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${20 + drift / 12}% ${18 + driftY / 18}%, ${accentA}20 0%, transparent 38%), radial-gradient(circle at ${78 - drift / 20}% ${82 - driftY / 20}%, ${accentB}18 0%, transparent 34%), linear-gradient(180deg, ${COLORS.bg2} 0%, ${COLORS.bg} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.3,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          transform: `translate3d(${drift * 0.2}px, ${driftY * 0.15}px, 0)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.12,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.4) 0.7px, transparent 0.7px)',
          backgroundSize: '7px 7px',
          mixBlendMode: 'soft-light',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.02), transparent 14%, transparent 82%, rgba(255,255,255,0.03))',
        }}
      />
    </AbsoluteFill>
  );
};

export const GlassCard: React.FC<{
  children: ReactNode;
  style?: CSSProperties;
  accent?: string;
  glow?: number;
}> = ({children, style, accent = COLORS.magic, glow = 0.24}) => {
  return (
    <div
      style={{
        background: `linear-gradient(180deg, rgba(18, 24, 38, 0.94), ${COLORS.surfaceElevated})`,
        border: `1px solid ${COLORS.lineStrong}`,
        boxShadow: `0 30px 80px ${COLORS.shadow}, inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px ${accent}${Math.round(
          glow * 255,
        )
          .toString(16)
          .padStart(2, '0')}`,
        borderRadius: 28,
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Eyebrow: React.FC<{text: string; accent?: string; style?: CSSProperties}> = ({
  text,
  accent = COLORS.textMuted,
  style,
}) => {
  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: accent,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export const SceneHeader: React.FC<{
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  opacity?: number;
  accent?: string;
}> = ({eyebrow, title, subtitle, align = 'left', opacity = 1, accent = COLORS.magic}) => {
  const base: CSSProperties = {
    position: 'absolute',
    top: 40,
    left: align === 'left' ? 52 : 0,
    right: align === 'center' ? 0 : undefined,
    display: 'flex',
    flexDirection: 'column',
    alignItems: align === 'center' ? 'center' : 'flex-start',
    gap: 10,
    opacity,
  };

  return (
    <div style={base}>
      {eyebrow ? <Eyebrow text={eyebrow} accent={accent} /> : null}
      {title ? (
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.text,
            lineHeight: 1,
          }}
        >
          {title}
        </div>
      ) : null}
      {subtitle ? (
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 17,
            fontWeight: 500,
            color: COLORS.textDim,
            lineHeight: 1.35,
            maxWidth: 760,
            textAlign: align === 'center' ? 'center' : 'left',
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

export const StatusChip: React.FC<{
  text: string;
  accent: string;
  style?: CSSProperties;
}> = ({text, accent, style}) => {
  return (
    <div
      style={{
        padding: '8px 12px',
        borderRadius: 999,
        border: `1px solid ${accent}55`,
        background: `${accent}14`,
        color: COLORS.text,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: 13,
        boxShadow: `0 0 28px ${accent}18 inset`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export const CaptionLine: React.FC<{text: string; opacity?: number; accent?: string}> = ({
  text,
  opacity = 1,
  accent = COLORS.magic,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 34,
        display: 'flex',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          maxWidth: 980,
          padding: '14px 20px',
          borderRadius: 999,
          border: `1px solid ${accent}44`,
          background: 'rgba(7, 12, 24, 0.82)',
          boxShadow: `0 16px 40px ${COLORS.shadow}`,
          fontFamily: FONT_FAMILY,
          fontSize: 22,
          fontWeight: 600,
          color: COLORS.text,
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const ContextMeter: React.FC<{
  percent: number;
  mode?: 'old' | 'magic';
  subtitle?: string;
}> = ({percent, mode = 'magic', subtitle = 'Context pressure'}) => {
  const color =
    percent >= 96
      ? mode === 'old'
        ? COLORS.oldHot
        : COLORS.danger
      : percent >= 86
        ? mode === 'old'
          ? COLORS.old
          : COLORS.warning
        : mode === 'old'
          ? COLORS.old
          : COLORS.magic;

  return (
    <GlassCard accent={color} glow={0.18} style={{padding: 20, width: 250, height: 142}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <Eyebrow text={subtitle} accent={COLORS.textMuted} />
          <div
            style={{
              marginTop: 8,
              fontFamily: FONT_FAMILY,
              fontSize: 38,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            {Math.round(percent)}%
          </div>
        </div>
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: `conic-gradient(${color} 0deg ${percent * 3.6}deg, rgba(255,255,255,0.08) ${percent * 3.6}deg 360deg)`,
            padding: 7,
            boxShadow: `0 0 28px ${color}22`,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: COLORS.bg2,
              border: `1px solid ${COLORS.line}`,
            }}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: 16,
          height: 10,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '88%',
            top: -3,
            bottom: -3,
            width: 2,
            background: COLORS.warning,
            opacity: 0.8,
          }}
        />
        <div
          style={{
            height: '100%',
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            boxShadow: `0 0 24px ${color}88`,
          }}
        />
      </div>
    </GlassCard>
  );
};

export const MessageCard: React.FC<{
  id: string;
  text: string;
  role: keyof typeof cardRoleColor;
  x: number;
  y: number;
  width: number;
  opacity?: number;
  scale?: number;
  selected?: boolean;
  ghosted?: boolean;
  queued?: boolean;
  compact?: boolean;
}> = ({
  id,
  text,
  role,
  x,
  y,
  width,
  opacity = 1,
  scale = 1,
  selected = false,
  ghosted = false,
  queued = false,
  compact = false,
}) => {
  const accent = cardRoleColor[role];
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        padding: compact ? '10px 12px' : '12px 14px',
        borderRadius: 18,
        border: `1px solid ${selected ? accent : COLORS.lineStrong}`,
        background: compact
          ? 'linear-gradient(180deg, rgba(18, 29, 46, 0.92), rgba(12, 19, 31, 0.88))'
          : 'linear-gradient(180deg, rgba(13, 20, 33, 0.94), rgba(9, 14, 24, 0.9))',
        boxShadow: selected ? `0 0 30px ${accent}30` : '0 10px 22px rgba(0,0,0,0.22)',
        transform: `translate3d(0,0,0) scale(${scale})`,
        opacity,
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: accent,
            fontWeight: 700,
          }}
        >
          {id}
        </div>
        {queued ? <QueueBadge text="Queued" /> : null}
      </div>
      <div
        style={{
          marginTop: 8,
          fontFamily: FONT_FAMILY,
          fontSize: compact ? 12 : 13,
          lineHeight: 1.25,
          fontWeight: 550,
          color: ghosted ? COLORS.textMuted : COLORS.text,
          filter: ghosted ? 'grayscale(0.15)' : 'none',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const QueueBadge: React.FC<{text: string}> = ({text}) => {
  return (
    <div
      style={{
        padding: '4px 8px',
        borderRadius: 999,
        border: `1px solid ${COLORS.warning}55`,
        background: COLORS.oldSoft,
        color: COLORS.warning,
        fontFamily: FONT_FAMILY,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}
    >
      {text}
    </div>
  );
};

export const CompartmentCard: React.FC<{
  title: string;
  width?: number;
  opacity?: number;
  scale?: number;
  x?: number;
  y?: number;
  compact?: boolean;
}> = ({title, width = 240, opacity = 1, scale = 1, x = 0, y = 0, compact = false}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        padding: compact ? '12px 14px' : '16px 18px',
        borderRadius: 22,
        background:
          'linear-gradient(180deg, rgba(17, 32, 45, 0.96), rgba(10, 20, 31, 0.9))',
        border: `1px solid ${COLORS.teal}55`,
        boxShadow: `0 12px 26px rgba(0,0,0,0.24), 0 0 24px ${COLORS.teal}18`,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <Eyebrow text="Compartment" accent={COLORS.teal} />
      <div
        style={{
          marginTop: 8,
          fontFamily: FONT_FAMILY,
          fontSize: compact ? 13 : 15,
          fontWeight: 650,
          lineHeight: 1.2,
          color: COLORS.text,
        }}
      >
        {title}
      </div>
      <div style={{display: 'flex', gap: 8, marginTop: 12}}>
        {['trace', 'decision', 'durable'].map((tag) => (
          <div
            key={tag}
            style={{
              padding: '5px 8px',
              borderRadius: 999,
              background: COLORS.tealSoft,
              color: COLORS.teal,
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export const FactChip: React.FC<{text: string; opacity?: number; x?: number; y?: number}> = ({
  text,
  opacity = 1,
  x = 0,
  y = 0,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        padding: '9px 12px',
        borderRadius: 999,
        background: COLORS.violetSoft,
        border: `1px solid ${COLORS.violet}50`,
        color: COLORS.text,
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: 600,
        opacity,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

export const MemoryCard: React.FC<{
  text: string;
  opacity?: number;
  x?: number;
  y?: number;
  width?: number;
}> = ({text, opacity = 1, x = 0, y = 0, width = 262}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        padding: '14px 16px',
        borderRadius: 20,
        background:
          'linear-gradient(180deg, rgba(18, 24, 42, 0.96), rgba(12, 17, 30, 0.94))',
        border: `1px solid ${COLORS.magic}55`,
        boxShadow: `0 14px 28px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.05)`,
        opacity,
      }}
    >
      <Eyebrow text="Memory" accent={COLORS.magic} />
      <div
        style={{
          marginTop: 7,
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          lineHeight: 1.28,
          fontWeight: 600,
          color: COLORS.text,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const panelHeader = (title: string, subtitle: string, accent: string) => (
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
    <div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.text,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: FONT_FAMILY,
          fontSize: 13,
          color: COLORS.textMuted,
        }}
      >
        {subtitle}
      </div>
    </div>
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: accent,
        boxShadow: `0 0 18px ${accent}`,
      }}
    />
  </div>
);

export const AgentCard: React.FC<{
  frame: number;
  status: string;
  mode: 'old-working' | 'old-blocked' | 'magic-working' | 'healthy' | 'warm-start';
  title?: string;
}> = ({frame, status, mode, title = 'Main Agent'}) => {
  const accent = mode === 'old-working' || mode === 'old-blocked' ? COLORS.old : COLORS.magic;
  const blocked = mode === 'old-blocked';
  const warm = mode === 'warm-start';
  const healthy = mode === 'healthy';
  const activeLine = Math.floor(frame / 12) % CODE_LINES.length;
  const cursorOpacity = blocked ? 0.4 : ping(frame, 6) * 0.85 + 0.15;
  const overlay = blocked ? progress(frame, 0, 18) : 0;

  return (
    <GlassCard accent={accent} glow={0.18} style={{padding: 22, width: 470, height: 250, position: 'relative'}}>
      {panelHeader(title, warm ? 'Briefed and ready to continue' : 'Coding session', accent)}
      <div style={{display: 'flex', gap: 10, marginBottom: 14}}>
        <StatusChip
          text={blocked ? 'Context limit reached' : status}
          accent={blocked ? COLORS.oldHot : healthy ? COLORS.success : accent}
        />
        {(healthy || warm) && <StatusChip text={healthy ? 'Healthy context' : 'Warm started'} accent={healthy ? COLORS.success : COLORS.teal} />}
      </div>
      <div
        style={{
          borderRadius: 18,
          overflow: 'hidden',
          border: `1px solid ${COLORS.line}`,
          background: 'rgba(5, 9, 16, 0.7)',
        }}
      >
        <div style={{display: 'flex', gap: 8, padding: '10px 12px', borderBottom: `1px solid ${COLORS.line}`}}>
          {['auth.ts', 'cache.ts', 'session.spec.ts'].map((tab, index) => (
            <div
              key={tab}
              style={{
                padding: '6px 10px',
                borderRadius: 10,
                background: index === activeLine % 3 ? `${accent}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${index === activeLine % 3 ? accent + '44' : COLORS.line}`,
                color: index === activeLine % 3 ? COLORS.text : COLORS.textMuted,
                fontFamily: FONT_FAMILY,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        <div style={{padding: '12px 14px 10px 14px'}}>
          {CODE_LINES.map((line, index) => {
            const active = index === activeLine && !blocked;
            return (
              <div
                key={line}
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  color: active ? COLORS.text : COLORS.textDim,
                  background: active ? `${accent}16` : 'transparent',
                  borderLeft: `2px solid ${active ? accent : 'transparent'}`,
                  padding: '5px 8px',
                  borderRadius: 8,
                  whiteSpace: 'pre',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {line}
                {index === activeLine ? <span style={{opacity: cursorOpacity}}>▍</span> : null}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap'}}>
        {TERMINAL_LINES.slice(0, blocked ? 3 : 4).map((line, index) => (
          <div
            key={line}
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: index === 0 ? COLORS.textDim : healthy ? COLORS.success : COLORS.textMuted,
            }}
          >
            {line}
          </div>
        ))}
      </div>
      {blocked ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, rgba(10,12,20,${0.18 + overlay * 0.34}), rgba(8,10,16,${0.58 + overlay * 0.18}))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 280,
              padding: 20,
              borderRadius: 24,
              border: `1px solid ${COLORS.old}55`,
              background: 'rgba(12, 14, 21, 0.9)',
              boxShadow: `0 22px 40px rgba(0,0,0,0.35), 0 0 28px ${COLORS.old}22`,
            }}
          >
            <Eyebrow text="Blocking compaction" accent={COLORS.old} />
            <div
              style={{
                marginTop: 10,
                fontFamily: FONT_FAMILY,
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.text,
              }}
            >
              Compacting history…
            </div>
            <div style={{marginTop: 10, fontFamily: FONT_FAMILY, fontSize: 14, color: COLORS.textDim}}>
              Compressing 2,143 messages. Rebuilding working context.
            </div>
            <div style={{marginTop: 16, height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.08)'}}>
              <div
                style={{
                  width: `${12 + Math.min(26, frame * 0.22)}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${COLORS.old}, ${COLORS.oldHot})`,
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </GlassCard>
  );
};

export const HistorianPanel: React.FC<{
  frame: number;
  mode: 'standby' | 'arming' | 'processing' | 'complete';
}> = ({frame, mode}) => {
  const accent = mode === 'complete' ? COLORS.teal : COLORS.violet;
  const status =
    mode === 'standby'
      ? HISTORIAN_STATUSES[0]
      : mode === 'arming'
        ? HISTORIAN_STATUSES[1]
        : mode === 'complete'
          ? HISTORIAN_STATUSES[5]
          : cycle(HISTORIAN_STATUSES.slice(2, 5), frame, 32);
  return (
    <GlassCard accent={accent} glow={0.16} style={{padding: 18, width: 320, height: 174}}>
      {panelHeader('Historian', 'background worker', accent)}
      <StatusChip text={status} accent={accent} />
      <div style={{marginTop: 14, display: 'grid', gap: 10}}>
        {[0, 1, 2].map((index) => {
          const fill =
            mode === 'standby'
              ? 0.18
              : mode === 'arming'
                ? 0.3 + index * 0.12
                : mode === 'complete'
                  ? 1
                  : ping(frame, 11, index * 8) * 0.4 + 0.48;
          return (
            <div
              key={index}
              style={{
                height: 9,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.round(fill * 100)}%`,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${accent}, ${mode === 'complete' ? COLORS.teal : COLORS.magic})`,
                }}
              />
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export const ConversationRail: React.FC<{
  frame: number;
  tailProgress: number;
  selectionProgress?: number;
  extractProgress?: number;
  replacementProgress?: number;
  showLabels?: boolean;
  queueMode?: 'none' | 'mark' | 'wait' | 'apply';
}> = ({
  frame,
  tailProgress,
  selectionProgress = 0,
  extractProgress = 0,
  replacementProgress = 0,
  showLabels = false,
  queueMode = 'none',
}) => {
  const tailCount = Math.min(TAIL_MESSAGES.length, Math.floor(tailProgress * TAIL_MESSAGES.length) + 1);
  const queueOpacity = queueMode === 'none' ? 0 : queueMode === 'apply' ? 0.35 : 1;
  const cachedPrefix = queueMode === 'wait' || queueMode === 'mark';

  return (
    <GlassCard accent={COLORS.magic} glow={0.1} style={{padding: 18, width: 1160, height: 204, position: 'relative'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
        <div>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 24, fontWeight: 700, color: COLORS.text}}>Conversation rail</div>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.textMuted, marginTop: 4}}>
            Left = older head • Right = active tail
          </div>
        </div>
        {cachedPrefix ? <QueueBadge text="Preserving cache prefix" /> : null}
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 138,
          borderRadius: 20,
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(8, 12, 20, 0.78), rgba(6, 10, 16, 0.88))',
          border: `1px solid ${COLORS.line}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(255,154,82,0.08) 0%, rgba(255,154,82,0.02) 34%, rgba(98,217,255,0.02) 58%, rgba(98,217,255,0.1) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 28,
            right: 28,
            top: 62,
            height: 12,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 28,
            width: 220,
            top: 58,
            height: 20,
            borderRadius: 999,
            border: `1px solid ${COLORS.old}44`,
            background: COLORS.oldSoft,
            opacity: showLabels ? 1 : 0.38,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 24,
            width: 236,
            top: 58,
            height: 20,
            borderRadius: 999,
            border: `1px solid ${COLORS.magic}44`,
            background: COLORS.magicSoft,
            opacity: showLabels ? 1 : 0.38,
          }}
        />
        {showLabels ? (
          <>
            <Eyebrow text="Head / older history" accent={COLORS.old} style={{position: 'absolute', left: 28, top: 16}} />
            <Eyebrow text="Tail / live activity" accent={COLORS.magic} style={{position: 'absolute', right: 28, top: 16}} />
          </>
        ) : null}
        {replacementProgress > 0 ? (
          <>
            <CompartmentCard
              title="Compartment — Auth debugging"
              compact
              width={220}
              x={24}
              y={84 - replacementProgress * 40}
              opacity={replacementProgress}
              scale={0.92 + replacementProgress * 0.08}
            />
            <CompartmentCard
              title="Compartment — Cache decision trail"
              compact
              width={220}
              x={250}
              y={84 - replacementProgress * 34}
              opacity={replacementProgress * 0.92}
              scale={0.92 + replacementProgress * 0.08}
            />
          </>
        ) : null}
        {RAIL_MESSAGES.map((card, index) => {
          const baseX = 36 + index * 118;
          const baseY = 84 + (index % 2) * 18;
          const inHead = index < 4;
          const queued = queueMode !== 'none' && index >= 4 && index <= 5;
          const ghosted = queueMode === 'mark' || queueMode === 'wait';
          const applyFade = queueMode === 'apply' && index >= 4 && index <= 5;
          const x = inHead ? baseX - extractProgress * 118 : baseX - replacementProgress * 74;
          const y = inHead ? baseY + extractProgress * 60 : baseY;
          const opacity = applyFade ? 1 - progress(frame, 170, 220) : replacementProgress > 0 && index < 2 ? 1 - replacementProgress : 1;
          const scale = inHead ? 1 - extractProgress * 0.18 : 1;

          return (
            <MessageCard
              key={card.id}
              id={card.id}
              text={card.text}
              role={card.role}
              x={x}
              y={y}
              width={card.width}
              opacity={opacity * (queued ? queueOpacity : 1)}
              scale={scale}
              selected={inHead && selectionProgress > 0.25}
              queued={queued && queueMode !== 'apply'}
              ghosted={queued && ghosted}
            />
          );
        })}
        {selectionProgress > 0 ? (
          <div
            style={{
              position: 'absolute',
              left: 22 - extractProgress * 48,
              top: 26 + extractProgress * 32,
              width: 470,
              height: 102,
              borderRadius: 28,
              border: `2px solid ${COLORS.old}`,
              boxShadow: `0 0 30px ${COLORS.old}28`,
              opacity: selectionProgress * (1 - replacementProgress * 0.5),
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 14,
                top: -18,
                padding: '6px 10px',
                borderRadius: 999,
                background: 'rgba(12,16,24,0.94)',
                border: `1px solid ${COLORS.old}66`,
                fontFamily: FONT_MONO,
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.old,
              }}
            >
              #001–#036
            </div>
          </div>
        ) : null}
        {Array.from({length: tailCount}).map((_, index) => {
          const appear = clamp((tailProgress * TAIL_MESSAGES.length - index) * 1.2);
          const x = 730 + index * 74 + (1 - appear) * 70;
          const y = 24 + (index % 2) * 28;
          return (
            <MessageCard
              key={`${TAIL_MESSAGES[index]}-${index}`}
              id={`#${124 + index}`}
              text={TAIL_MESSAGES[index]}
              role={index % 2 === 0 ? 'assistant' : 'tool'}
              x={x}
              y={y}
              width={148}
              opacity={appear}
              scale={0.92 + appear * 0.08}
            />
          );
        })}
      </div>
    </GlassCard>
  );
};

export const StructuredOutputs: React.FC<{
  frame: number;
  compartmentProgress: number;
  factsProgress: number;
  memoryProgress: number;
  mergeProgress?: number;
}> = ({frame, compartmentProgress, factsProgress, memoryProgress, mergeProgress = 0}) => {
  return (
    <GlassCard accent={COLORS.teal} glow={0.12} style={{padding: 20, width: 408, height: 296, position: 'relative'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14}}>
        <div>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 700, color: COLORS.text}}>
            Structured outputs
          </div>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.textMuted, marginTop: 5}}>
            Compartments • Session Facts • Memory
          </div>
        </div>
        {mergeProgress > 0.15 ? <QueueBadge text="Merging older compartments" /> : null}
      </div>
      <div style={{position: 'relative', height: 236}}>
        <Eyebrow text="Compartments" accent={COLORS.teal} style={{position: 'absolute', left: 0, top: 0}} />
        {COMPARTMENTS.map((title, index) => {
          const appear = clamp(compartmentProgress * 1.3 - index * 0.22);
          return (
            <CompartmentCard
              key={title}
              title={title}
              width={184}
              compact
              x={index % 2 === 0 ? 0 : 194}
              y={28 + Math.floor(index / 2) * 72}
              opacity={appear}
              scale={0.92 + appear * 0.08}
            />
          );
        })}
        <Eyebrow text="Session facts" accent={COLORS.violet} style={{position: 'absolute', left: 0, top: 154}} />
        {FACTS.slice(0, 4).map((text, index) => {
          const appear = clamp(factsProgress * 1.32 - index * 0.18);
          return (
            <FactChip key={text} text={text} x={(index % 2) * 192} y={182 + Math.floor(index / 2) * 34} opacity={appear} />
          );
        })}
        {MEMORIES.slice(0, 2).map((text, index) => {
          const appear = clamp(memoryProgress * 1.25 - index * 0.24);
          return <MemoryCard key={text} text={text} x={232} y={24 + index * 98} width={156} opacity={appear} />;
        })}
        {mergeProgress > 0 ? (
          <div style={{position: 'absolute', left: 0, right: 0, top: 4, height: 100, pointerEvents: 'none'}}>
            {['Auth debugging', 'Cache fixes', 'Test stabilization'].map((text, index) => {
              const x = interpolate(mergeProgress, [0, 1], [index * 100, 126], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const y = interpolate(mergeProgress, [0, 1], [0, 14], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const opacity = 1 - mergeProgress * 0.9;
              return <CompartmentCard key={text} title={text} compact width={110} x={x} y={y} opacity={opacity} scale={0.82} />;
            })}
            <CompartmentCard
              title="Archive — Auth + Cache + Tests"
              compact
              width={250}
              x={112}
              y={20}
              opacity={mergeProgress}
              scale={0.9 + mergeProgress * 0.1}
            />
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
};

export const MagicContextShell: React.FC<{
  frame: number;
  contextPercent: number;
  mainStatus: string;
  mainMode: 'magic-working' | 'healthy' | 'warm-start';
  historianMode: 'standby' | 'arming' | 'processing' | 'complete';
  tailProgress: number;
  selectionProgress?: number;
  extractProgress?: number;
  replacementProgress?: number;
  compartmentProgress?: number;
  factsProgress?: number;
  memoryProgress?: number;
  showLabels?: boolean;
  queueMode?: 'none' | 'mark' | 'wait' | 'apply';
  mergeProgress?: number;
}> = ({
  frame,
  contextPercent,
  mainStatus,
  mainMode,
  historianMode,
  tailProgress,
  selectionProgress = 0,
  extractProgress = 0,
  replacementProgress = 0,
  compartmentProgress = 0,
  factsProgress = 0,
  memoryProgress = 0,
  showLabels = false,
  queueMode = 'none',
  mergeProgress = 0,
}) => {
  const connectorOpacity = historianMode === 'standby' ? 0.18 : 0.7;
  const connectorPulse = ping(frame, 10) * 0.2;

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', left: 54, top: 78}}>
        <AgentCard frame={frame} status={mainStatus} mode={mainMode} />
      </div>
      <div style={{position: 'absolute', right: 54, top: 78}}>
        <ContextMeter percent={contextPercent} subtitle="Context pressure" />
      </div>
      <div style={{position: 'absolute', left: 60, top: 352}}>
        <ConversationRail
          frame={frame}
          tailProgress={tailProgress}
          selectionProgress={selectionProgress}
          extractProgress={extractProgress}
          replacementProgress={replacementProgress}
          showLabels={showLabels}
          queueMode={queueMode}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 274,
          top: 542,
          width: 2,
          height: 56,
          background: `linear-gradient(180deg, rgba(125,140,255,${connectorOpacity}), rgba(89,243,195,${connectorOpacity + connectorPulse}))`,
          boxShadow: `0 0 24px ${COLORS.violet}33`,
        }}
      />
      <div style={{position: 'absolute', left: 54, bottom: 50}}>
        <HistorianPanel frame={frame} mode={historianMode} />
      </div>
      <div style={{position: 'absolute', right: 54, bottom: 50}}>
        <StructuredOutputs
          frame={frame}
          compartmentProgress={compartmentProgress}
          factsProgress={factsProgress}
          memoryProgress={memoryProgress}
          mergeProgress={mergeProgress}
        />
      </div>
    </div>
  );
};

export const OldWayWorkspace: React.FC<{frame: number; contextPercent: number; blocked: boolean}> = ({
  frame,
  contextPercent,
  blocked,
}) => {
  const status = cycle([
    'Searching auth.ts',
    'Tracing cache path',
    'Updating tests',
    'Running build',
    'Inspecting retry logic',
  ], frame, 18);

  return (
    <GlassCard accent={COLORS.old} glow={0.16} style={{padding: 26, width: 1170, height: 578}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <Eyebrow text="Single-agent workflow" accent={COLORS.old} />
          <div style={{fontFamily: FONT_FAMILY, fontSize: 42, fontWeight: 700, color: COLORS.text, marginTop: 12}}>
            Old way
          </div>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 17, color: COLORS.textDim, marginTop: 10}}>
            The same agent codes, reaches the limit, then has to compact itself.
          </div>
        </div>
        <ContextMeter percent={contextPercent} mode="old" subtitle="Context meter" />
      </div>
      <div style={{display: 'flex', gap: 22, marginTop: 24}}>
        <AgentCard frame={frame} status={status} mode={blocked ? 'old-blocked' : 'old-working'} title="Main Agent" />
        <GlassCard accent={COLORS.old} glow={0.08} style={{padding: 22, width: 626, height: 250}}>
          {panelHeader('Activity feed', blocked ? 'Flow breaks on compaction' : 'Fast but fragile', COLORS.old)}
          <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
            {[
              'Searching auth.ts',
              'Tracing cache path',
              'Updating tests',
              'Running build',
              'Inspecting retry logic',
            ].map((chip, index) => (
              <StatusChip
                key={chip}
                text={chip}
                accent={blocked && index > 1 ? COLORS.oldHot : COLORS.old}
                style={{opacity: blocked && index > 2 ? 0.5 : 1}}
              />
            ))}
          </div>
          <div style={{marginTop: 24, fontFamily: FONT_MONO, fontSize: 13, color: COLORS.textDim}}>
            {blocked ? 'Summarizing previous steps…\nRebuilding working context…\nCompressing 2,143 messages…' : '> running focused suite\n> tracing retry logic\n> updating session cache assertions'}
          </div>
        </GlassCard>
      </div>
    </GlassCard>
  );
};

export const DreamerPanel: React.FC<{frame: number}> = ({frame}) => {
  return (
    <GlassCard accent={COLORS.dreamer} glow={0.16} style={{padding: 24, width: 440, height: 310}}>
      {panelHeader('Dreamer', 'off-session maintenance', COLORS.dreamer)}
      <div style={{display: 'grid', gap: 12}}>
        {['Consolidating memory', 'Verifying retained facts', 'Archiving stale knowledge', 'Improving summaries'].map((task, index) => (
          <div
            key={task}
            style={{
              padding: '14px 16px',
              borderRadius: 18,
              border: `1px solid ${COLORS.line}`,
              background: 'rgba(14, 18, 36, 0.8)',
              boxShadow: `0 0 0 1px ${COLORS.dreamer}22 inset`,
              opacity: clamp((frame - index * 18) / 26),
            }}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontFamily: FONT_FAMILY, fontSize: 14, fontWeight: 650, color: COLORS.text}}>{task}</div>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: COLORS.dreamer,
                  boxShadow: `0 0 18px ${COLORS.dreamer}`,
                }}
              />
            </div>
            <div style={{marginTop: 10, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.05)'}}>
              <div
                style={{
                  height: '100%',
                  width: `${40 + ping(frame, 10, index * 11) * 50}%`,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${COLORS.dreamer}, ${COLORS.violet})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export const SidekickPanel: React.FC<{frame: number}> = ({frame}) => {
  return (
    <GlassCard accent={COLORS.mint} glow={0.16} style={{padding: 24, width: 470, height: 348}}>
      {panelHeader('Sidekick', 'new-session retrieval', COLORS.mint)}
      <div style={{display: 'grid', gap: 8}}>
        {SIDEKICK_SOURCES.map((item, index) => {
          const appear = clamp((frame - index * 18) / 24);
          return (
            <div
              key={item}
              style={{
                padding: '10px 12px',
                borderRadius: 14,
                border: `1px solid ${COLORS.line}`,
                background: 'rgba(11, 20, 28, 0.82)',
                opacity: appear,
                transform: `translateY(${(1 - appear) * 18}px)`,
              }}
            >
              <div style={{fontFamily: FONT_FAMILY, fontSize: 13, fontWeight: 650, color: COLORS.text}}>{item}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 10,
          width: '100%',
          boxSizing: 'border-box',
          padding: 14,
          borderRadius: 16,
          border: `1px solid ${COLORS.mint}55`,
          background: 'rgba(8, 18, 22, 0.95)',
          boxShadow: `0 0 26px ${COLORS.mint}18`,
          opacity: clamp((frame - 66) / 26),
        }}
      >
        <Eyebrow text="Briefing" accent={COLORS.mint} />
        <div
          style={{
            marginTop: 8,
            fontFamily: FONT_FAMILY,
            fontSize: 11,
            lineHeight: 1.35,
            color: COLORS.text,
            maxWidth: '100%',
            overflowWrap: 'anywhere',
          }}
        >
          Preserve retry behavior. Continue auth refactor. Use Redis session cache.
        </div>
      </div>
    </GlassCard>
  );
};

export const Wordmark: React.FC<{opacity?: number}> = ({opacity = 1}) => {
  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: COLORS.text,
        opacity,
      }}
    >
      opencode-magic-context
    </div>
  );
};

export const MemoryShelf: React.FC<{opacity?: number}> = ({opacity = 1}) => {
  return (
    <GlassCard accent={COLORS.dreamer} glow={0.1} style={{padding: 22, width: 642, height: 310, opacity}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 700, color: COLORS.text}}>Knowledge layer</div>
          <div style={{fontFamily: FONT_FAMILY, fontSize: 13, color: COLORS.textMuted, marginTop: 6}}>
            Memory, facts, compartments, archive
          </div>
        </div>
        <QueueBadge text="Overnight maintenance" />
      </div>
      <div style={{position: 'relative', marginTop: 18, height: 214}}>
        {MEMORIES.slice(0, 3).map((text, index) => (
          <MemoryCard key={text} text={text} x={index * 206} y={0} width={190} opacity={1} />
        ))}
        {FACTS.slice(0, 4).map((fact, index) => (
          <FactChip key={fact} text={fact} x={(index % 2) * 204} y={118 + Math.floor(index / 2) * 38} opacity={1} />
        ))}
        <CompartmentCard title="Archive — verified historical context" width={246} x={390} y={118} compact opacity={1} />
      </div>
    </GlassCard>
  );
};
