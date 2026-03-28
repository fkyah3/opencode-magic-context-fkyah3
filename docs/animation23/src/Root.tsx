import { Composition, Folder } from "remotion";
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

// Individual scene imports for Studio testing
import { Scene1OldWay } from "./scenes/Scene1OldWay";
import { Scene2SplitComparison } from "./scenes/Scene2SplitComparison";
import { Scene3HistorianActivation } from "./scenes/Scene3HistorianActivation";
import { Scene4HeroShot } from "./scenes/Scene4HeroShot";
import { Scene5HistorianOutputs } from "./scenes/Scene5HistorianOutputs";
import { Scene6Payoff } from "./scenes/Scene6Payoff";
import { Scene7CompartmentMerge } from "./scenes/Scene7CompartmentMerge";
import { Scene8CacheAwareness } from "./scenes/Scene8CacheAwareness";
import { Scene9Dreamer } from "./scenes/Scene9Dreamer";
import { Scene10Sidekick } from "./scenes/Scene10Sidekick";
import { Scene11FinalCard } from "./scenes/Scene11FinalCard";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main full animation (91s) */}
      <Composition
        id="MagicContextAnimation"
        component={MagicContextAnimation}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />

      {/* Individual scene compositions for Studio testing */}
      <Folder name="Scenes">
        <Composition
          id="Scene1-OldWay"
          component={Scene1OldWay}
          durationInFrames={SCENE_1_DURATION}
          fps={FPS}
          width={COMP_WIDTH}
          height={COMP_HEIGHT}
        />
        <Composition
          id="Scene2-SplitComparison"
          component={Scene2SplitComparison}
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
          id="Scene4-HeroShot"
          component={Scene4HeroShot}
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
          id="Scene6-Payoff"
          component={Scene6Payoff}
          durationInFrames={SCENE_6_DURATION}
          fps={FPS}
          width={COMP_WIDTH}
          height={COMP_HEIGHT}
        />
        <Composition
          id="Scene7-CompartmentMerge"
          component={Scene7CompartmentMerge}
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
          id="Scene11-FinalCard"
          component={Scene11FinalCard}
          durationInFrames={SCENE_11_DURATION}
          fps={FPS}
          width={COMP_WIDTH}
          height={COMP_HEIGHT}
        />
      </Folder>
    </>
  );
};
