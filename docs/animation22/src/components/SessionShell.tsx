import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY, SESSION_WIDTH, SESSION_HEIGHT } from "../constants";

interface SessionShellProps {
  sessionName?: string;
  opacity?: number;
  scale?: number;
  children?: React.ReactNode;
  showInputBar?: boolean;
  inputText?: string;
  inputOpacity?: number;
  freezeOverlay?: boolean;
  freezeText?: string;
}

export const SessionShell: React.FC<SessionShellProps> = ({
  sessionName = "ATHENA",
  opacity = 1,
  scale = 1,
  children,
  showInputBar = true,
  inputText = "",
  inputOpacity = 1,
  freezeOverlay = false,
  freezeText = "Context limit reached",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: SESSION_WIDTH,
        height: SESSION_HEIGHT,
        background: COLORS.panelBg,
        border: `1.5px solid ${COLORS.panelBorder}`,
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        overflow: "hidden",
        opacity,
        transform: `scale(${scale})`,
        position: "relative",
      }}
    >
      {/* Session header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: COLORS.sessionHeader,
          borderBottom: `1px solid ${COLORS.panelBorder}`,
          opacity: headerOpacity,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Chrome buttons */}
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
              <div
                key={c}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          {/* Session name */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.textPrimary,
              letterSpacing: "0.02em",
            }}
          >
            {sessionName}
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 11,
            color: COLORS.textMuted,
          }}
        >
          OpenCode Session
        </div>
      </div>

      {/* Main content area */}
      <div
        style={{
          display: "flex",
          height: SESSION_HEIGHT - 52 - (showInputBar ? 48 : 0),
        }}
      >
        {children}
      </div>

      {/* Input bar */}
      {showInputBar && (
        <div
          style={{
            height: 48,
            background: COLORS.inputBar,
            borderTop: `1px solid ${COLORS.panelBorder}`,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 12,
            opacity: inputOpacity,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 32,
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.cardBorder}`,
              borderRadius: 8,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                color: inputText ? COLORS.textPrimary : COLORS.textMuted,
              }}
            >
              {inputText || "Type a message..."}
            </span>
          </div>
        </div>
      )}

      {/* Freeze overlay */}
      {freezeOverlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.oldWayAccent,
            }}
          >
            {freezeText}
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 13,
              color: COLORS.textSecondary,
            }}
          >
            Compacting history...
          </div>
        </div>
      )}
    </div>
  );
};