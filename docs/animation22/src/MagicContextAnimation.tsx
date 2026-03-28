import { AbsoluteFill, Sequence } from "remotion";
import {
  TOTAL_FRAMES,
  FPS,
  COMP_WIDTH,
  COMP_HEIGHT,
  SCENE_1_START,
  SCENE_1_DURATION,
  SCENE_2_START,
  SCENE_2_DURATION,
  SCENE_3_START,
  SCENE_3_DURATION,
  SCENE_4_START,
  SCENE_4_DURATION,
  SCENE_5_START,
  SCENE_5_DURATION,
  SCENE_6_START,
  SCENE_6_DURATION,
  SCENE_7_START,
  SCENE_7_DURATION,
  SCENE_8_START,
  SCENE_8_DURATION,
  SCENE_9_START,
  SCENE_9_DURATION,
  SCENE_10_START,
  SCENE_10_DURATION,
  SCENE_11_START,
  SCENE_11_DURATION,
} from "./constants";

// Import all scenes
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

export const MagicContextAnimation: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0e17" }}>
      {/* Scene 1: Old way - full-screen OpenCode session pain (frames 0-209) */}
      <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_DURATION}>
        <Scene1OldWay />
      </Sequence>

      {/* Scene 2: Split comparison bridge (frames 210-329) */}
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_DURATION}>
        <Scene2SplitComparison />
      </Sequence>

      {/* Scene 3: Historian activation (frames 330-599) */}
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_DURATION}>
        <Scene3HistorianActivation />
      </Sequence>

      {/* Scene 4: Hero shot - Historian takes from head while tail grows (frames 600-959) */}
      <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_DURATION}>
        <Scene4HeroShot />
      </Sequence>

      {/* Scene 5: Historian outputs - compartments, facts, memory (frames 960-1349) */}
      <Sequence from={SCENE_5_START} durationInFrames={SCENE_5_DURATION}>
        <Scene5HistorianOutputs />
      </Sequence>

      {/* Scene 6: Payoff - pressure drops, flow intact (frames 1350-1559) */}
      <Sequence from={SCENE_6_START} durationInFrames={SCENE_6_DURATION}>
        <Scene6Payoff />
      </Sequence>

      {/* Scene 7: Long-session sustainability - compartment merging (frames 1560-1829) */}
      <Sequence from={SCENE_7_START} durationInFrames={SCENE_7_DURATION}>
        <Scene7CompartmentMerging />
      </Sequence>

      {/* Scene 8: Cache awareness (frames 1830-2099) */}
      <Sequence from={SCENE_8_START} durationInFrames={SCENE_8_DURATION}>
        <Scene8CacheAwareness />
      </Sequence>

      {/* Scene 9: Dreamer (frames 2100-2369) */}
      <Sequence from={SCENE_9_START} durationInFrames={SCENE_9_DURATION}>
        <Scene9Dreamer />
      </Sequence>

      {/* Scene 10: Sidekick (frames 2370-2579) */}
      <Sequence from={SCENE_10_START} durationInFrames={SCENE_10_DURATION}>
        <Scene10Sidekick />
      </Sequence>

      {/* Scene 11: Final payoff / end card (frames 2580-2729) */}
      <Sequence from={SCENE_11_START} durationInFrames={SCENE_11_DURATION}>
        <Scene11FinalPayoff />
      </Sequence>
    </AbsoluteFill>
  );
};