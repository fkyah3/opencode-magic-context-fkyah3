import { Composition } from "remotion";
import { MagicContextAnimation } from "./MagicContextAnimation";
import {
  TOTAL_FRAMES,
  FPS,
  COMP_WIDTH,
  COMP_HEIGHT,
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
import { Scene2SplitComparison } from "./scenes/Scene2SplitComparison";
import { Scene3HistorianActivation } from "./scenes/Scene3HistorianActivation";
import { Scene4HeroShot } from "./scenes/Scene4HeroShot";
import { Scene5HistorianOutputs } from "./scenes/Scene5HistorianOutputs";
import { Scene6Payoff } from "./scenes/Scene6Payoff";
import { Scene7CompartmentMerging } from "./scenes/Scene7CompartmentMerging";
import { Scene8CacheAwareness } from "./scenes/Scene8CacheAwareness";
import { Scene9Dreamer } from "./scenes/Scene9Dreamer";
import { Scene10Sidekick } from "./scenes/Scene10Sidekick";
import { Scene11FinalPayoff } from "./scenes/Scene11FinalPayoff";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main full animation (91 seconds) */}
      <Composition
        id="MagicContextAnimation"
        component={MagicContextAnimation}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      {/* Individual scene compositions for Studio testing */}
      <Composition
        id="Scene1OldWay"
        component={Scene1OldWay}
        durationInFrames={SCENE_1_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene2SplitComparison"
        component={Scene2SplitComparison}
        durationInFrames={SCENE_2_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene3HistorianActivation"
        component={Scene3HistorianActivation}
        durationInFrames={SCENE_3_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene4HeroShot"
        component={Scene4HeroShot}
        durationInFrames={SCENE_4_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene5HistorianOutputs"
        component={Scene5HistorianOutputs}
        durationInFrames={SCENE_5_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene6Payoff"
        component={Scene6Payoff}
        durationInFrames={SCENE_6_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene7CompartmentMerging"
        component={Scene7CompartmentMerging}
        durationInFrames={SCENE_7_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene8CacheAwareness"
        component={Scene8CacheAwareness}
        durationInFrames={SCENE_8_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene9Dreamer"
        component={Scene9Dreamer}
        durationInFrames={SCENE_9_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene10Sidekick"
        component={Scene10Sidekick}
        durationInFrames={SCENE_10_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      <Composition
        id="Scene11FinalPayoff"
        component={Scene11FinalPayoff}
        durationInFrames={SCENE_11_DURATION}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
    </>
  );
};