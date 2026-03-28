import React from "react";
import { Sequence } from "remotion";
import {
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
  FPS,
} from "./constants";

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

/**
 * Main composition: all 11 scenes sequenced at frame-accurate boundaries.
 * Total: 2730 frames / 91 seconds @ 30fps
 */
export const MagicContextAnimation: React.FC = () => {
  return (
    <>
      <Sequence
        from={SCENE_1_START}
        durationInFrames={SCENE_1_DURATION}
        premountFor={FPS}
      >
        <Scene1OldWay />
      </Sequence>

      <Sequence
        from={SCENE_2_START}
        durationInFrames={SCENE_2_DURATION}
        premountFor={FPS}
      >
        <Scene2SplitBridge />
      </Sequence>

      <Sequence
        from={SCENE_3_START}
        durationInFrames={SCENE_3_DURATION}
        premountFor={FPS}
      >
        <Scene3HistorianActivation />
      </Sequence>

      <Sequence
        from={SCENE_4_START}
        durationInFrames={SCENE_4_DURATION}
        premountFor={FPS}
      >
        <Scene4HeadToTail />
      </Sequence>

      <Sequence
        from={SCENE_5_START}
        durationInFrames={SCENE_5_DURATION}
        premountFor={FPS}
      >
        <Scene5HistorianOutputs />
      </Sequence>

      <Sequence
        from={SCENE_6_START}
        durationInFrames={SCENE_6_DURATION}
        premountFor={FPS}
      >
        <Scene6HealthyPayoff />
      </Sequence>

      <Sequence
        from={SCENE_7_START}
        durationInFrames={SCENE_7_DURATION}
        premountFor={FPS}
      >
        <Scene7LongSession />
      </Sequence>

      <Sequence
        from={SCENE_8_START}
        durationInFrames={SCENE_8_DURATION}
        premountFor={FPS}
      >
        <Scene8CacheAwareness />
      </Sequence>

      <Sequence
        from={SCENE_9_START}
        durationInFrames={SCENE_9_DURATION}
        premountFor={FPS}
      >
        <Scene9Dreamer />
      </Sequence>

      <Sequence
        from={SCENE_10_START}
        durationInFrames={SCENE_10_DURATION}
        premountFor={FPS}
      >
        <Scene10Sidekick />
      </Sequence>

      <Sequence
        from={SCENE_11_START}
        durationInFrames={SCENE_11_DURATION}
        premountFor={FPS}
      >
        <Scene11EndCard />
      </Sequence>
    </>
  );
};
