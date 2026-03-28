import { Composition } from "remotion";
import { MagicContextAnimation } from "./MagicContextAnimation";
import {
  COMP_WIDTH,
  COMP_HEIGHT,
  FPS,
  TOTAL_FRAMES,
  SCENE_1_DURATION,
  SCENE_2_DURATION,
  SCENE_3_DURATION,
  SCENE_4_DURATION,
  SCENE_5_DURATION,
  SCENE_6_DURATION,
  SCENE_7_DURATION,
  SCENE_8_DURATION,
  SCENE_9_DURATION,
  SCENE_10_DURATION,
  SCENE_11_DURATION,
} from "./constants";

// Import individual scenes for Studio testing
import { Scene1OldWay } from "./scenes/Scene1OldWay";
import { Scene2SplitBridge } from "./scenes/Scene2SplitBridge";
import { Scene3HistorianActivation } from "./scenes/Scene3HistorianActivation";
import { Scene4HeadToTail } from "./scenes/Scene4HeadToTail";
import { Scene5HistorianOutputs } from "./scenes/Scene5HistorianOutputs";
import { Scene6HealthyPayoff } from "./scenes/Scene6HealthyPayoff";
import { Scene7LongSession } from "./scenes/Scene7LongSession";
import { Scene8CacheAwareness } from "./scenes/Scene8CacheAwareness";
import { Scene9Dreamer } from "./scenes/Scene9Dreamer";
import { Scene10Sidekick } from "./scenes/Scene10Sidekick";
import { Scene11EndCard } from "./scenes/Scene11EndCard";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full animation — 91s / 2730 frames */}
      <Composition
        id="MagicContextAnimation"
        component={MagicContextAnimation}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      {/* ── Individual scene compositions for Studio testing ── */}
      <Composition
        id="Scene1-OldWay"
        component={Scene1OldWay}
        durationInFrames={SCENE_1_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene2-SplitBridge"
        component={Scene2SplitBridge}
        durationInFrames={SCENE_2_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene3-HistorianActivation"
        component={Scene3HistorianActivation}
        durationInFrames={SCENE_3_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene4-HeadToTail"
        component={Scene4HeadToTail}
        durationInFrames={SCENE_4_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene5-HistorianOutputs"
        component={Scene5HistorianOutputs}
        durationInFrames={SCENE_5_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene6-HealthyPayoff"
        component={Scene6HealthyPayoff}
        durationInFrames={SCENE_6_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene7-LongSession"
        component={Scene7LongSession}
        durationInFrames={SCENE_7_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene8-CacheAwareness"
        component={Scene8CacheAwareness}
        durationInFrames={SCENE_8_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene9-Dreamer"
        component={Scene9Dreamer}
        durationInFrames={SCENE_9_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene10-Sidekick"
        component={Scene10Sidekick}
        durationInFrames={SCENE_10_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
      <Composition
        id="Scene11-EndCard"
        component={Scene11EndCard}
        durationInFrames={SCENE_11_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
    </>
  );
};
