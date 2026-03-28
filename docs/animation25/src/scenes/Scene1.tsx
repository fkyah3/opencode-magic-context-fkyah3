import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { SessionShell } from "../components/session/SessionShell";
import { TranscriptPane } from "../components/session/TranscriptPane";
import { ContextInspector } from "../components/session/ContextInspector";
import { UserBubble, AssistantBlock, ActionRow } from "../components/session/TranscriptItems";
import { ContextStat, UsageMeter, RawMessageList } from "../components/session/ContextStats";
import { Search, Edit3, Activity } from "lucide-react";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-50: active growth
  // 51-110: more growth
  // 111-145: pressure rises to 100%
  // 146-209: blocked

  const usage = interpolate(
    frame,
    [0, 50, 110, 145],
    [34, 55, 88, 100],
    { extrapolateRight: "clamp" }
  );

  const rawMessagesCount = Math.floor(interpolate(frame, [0, 145], [42, 115], { extrapolateRight: "clamp" }));

  const showMsg2 = frame > 15;
  const showAction1 = frame > 30;
  const showMsg3 = frame > 45;
  const showAction2 = frame > 60;
  const showAction3 = frame > 75;

  const isBlocked = frame >= 146;

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div style={{ transform: "scale(1)" }}>
        <SessionShell>
          <TranscriptPane>
            <div className="flex flex-col gap-6" style={{ transform: `translateY(-${Math.max(0, (frame - 80) * 1.5)}px)` }}>
              <UserBubble text="Currently we have a new problem, athena-junior is able to spawn another athena-junior inside which normally shouldn't happen" />
              
              {showMsg2 && (
                <AssistantBlock text="The user is saying that athena-junior can spawn another athena-junior as a sub-agent, which shouldn't be allowed. Let me investigate where task delegation is enforced." />
              )}

              {showAction1 && (
                <ActionRow icon={<Search size={14} />} text="Explored 1 read, 2 searches" />
              )}

              {showMsg3 && (
                <AssistantBlock text="I see the issue. There are guards for plan-family recursion and direct invocation, but no self-recursion guard for athena-junior." />
              )}

              {showAction2 && (
                <ActionRow icon={<Edit3 size={14} />} text="Edit subagent-resolver.ts" />
              )}

              {showAction3 && (
                <ActionRow icon={<Activity size={14} />} text="Called lsp_diagnostics" />
              )}
            </div>

            {isBlocked && (
              <div className="absolute inset-0 bg-darkBg/60 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="bg-panelBg border border-accentRed/50 shadow-2xl rounded-xl p-8 flex flex-col items-center gap-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-accentRed/20 flex items-center justify-center mb-2">
                    <Activity className="text-accentRed" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-100">Context Limit Reached</h2>
                  <p className="text-slate-400">Compacting history...</p>
                  <div className="w-64 h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-accentRed animate-pulse" style={{ width: "40%" }} />
                  </div>
                </div>
              </div>
            )}
          </TranscriptPane>
          <ContextInspector>
            <div className="flex flex-col gap-2 mb-4">
              <ContextStat label="Session" value="ATHENA_8f2a" />
              <ContextStat label="Provider" value="Anthropic" />
              <ContextStat label="Model" value="claude-3-5-sonnet" />
              <ContextStat label="Context Limit" value="200,000" />
            </div>

            <UsageMeter percentage={usage} color={isBlocked ? "#f87171" : "#2dd4bf"} />

            <div className="flex flex-col gap-2 mt-4">
              <ContextStat label="Assistant Messages" value={Math.floor(usage * 1.5)} />
              <ContextStat label="User Messages" value={Math.floor(usage * 0.3)} />
            </div>

            <RawMessageList count={rawMessagesCount} items={12} />
          </ContextInspector>
        </SessionShell>
      </div>

      {isBlocked && (
        <div className="absolute bottom-12 text-2xl font-medium text-slate-300 bg-panelBg/80 backdrop-blur px-8 py-4 rounded-full border border-borderDark">
          Old way: the main agent hits the limit and stops to compact itself.
        </div>
      )}
    </AbsoluteFill>
  );
};
