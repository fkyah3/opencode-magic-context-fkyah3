import React from 'react';
import { Composition, Sequence } from 'remotion';
import {
  FPS,
  TOTAL_FRAMES,
  SCENE_1_START,
  SCENE_1_END,
  SCENE_2_START,
  SCENE_2_END,
  SCENE_3_START,
  SCENE_3_END,
  SCENE_4_START,
  SCENE_4_END,
  SCENE_5_START,
  SCENE_5_END,
  SCENE_6_START,
  SCENE_6_END,
  SCENE_7_START,
  SCENE_7_END,
  SCENE_8_START,
  SCENE_8_END,
  SCENE_9_START,
  SCENE_9_END,
  SCENE_10_START,
  SCENE_10_END,
  SCENE_11_START,
  SCENE_11_END,
} from './constants';
import {
  Scene1OldWay,
  Scene2SplitComparison,
  Scene3HistorianActivation,
  Scene4HeadToTail,
  Scene5HistorianOutputs,
  Scene6HealthyContext,
  Scene7LongSessionCompression,
  Scene8CacheAwareness,
  Scene9Dreamer,
  Scene10Sidekick,
  Scene11FinalPayoff,
} from './scenes';

// Main composition that sequences all scenes
const MagicContextAnimation: React.FC = () => {
  return (
    <>
      {/* Scene 1: Old way - full-screen pain (0-209 frames) */}
      <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_END - SCENE_1_START + 1}>
        <Scene1OldWay />
      </Sequence>
      
      {/* Scene 2: Split comparison bridge (210-329 frames) */}
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_END - SCENE_2_START + 1}>
        <Scene2SplitComparison />
      </Sequence>
      
      {/* Scene 3: Historian activation (330-599 frames) */}
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_END - SCENE_3_START + 1}>
        <Scene3HistorianActivation />
      </Sequence>
      
      {/* Scene 4: Head-to-tail simultaneous motion (600-959 frames) */}
      <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_END - SCENE_4_START + 1}>
        <Scene4HeadToTail />
      </Sequence>
      
      {/* Scene 5: Historian outputs (960-1349 frames) */}
      <Sequence from={SCENE_5_START} durationInFrames={SCENE_5_END - SCENE_5_START + 1}>
        <Scene5HistorianOutputs />
      </Sequence>
      
      {/* Scene 6: Healthy-context payoff (1350-1559 frames) */}
      <Sequence from={SCENE_6_START} durationInFrames={SCENE_6_END - SCENE_6_START + 1}>
        <Scene6HealthyContext />
      </Sequence>
      
      {/* Scene 7: Long-session compression (1560-1829 frames) */}
      <Sequence from={SCENE_7_START} durationInFrames={SCENE_7_END - SCENE_7_START + 1}>
        <Scene7LongSessionCompression />
      </Sequence>
      
      {/* Scene 8: Cache awareness (1830-2099 frames) */}
      <Sequence from={SCENE_8_START} durationInFrames={SCENE_8_END - SCENE_8_START + 1}>
        <Scene8CacheAwareness />
      </Sequence>
      
      {/* Scene 9: Dreamer (2100-2369 frames) */}
      <Sequence from={SCENE_9_START} durationInFrames={SCENE_9_END - SCENE_9_START + 1}>
        <Scene9Dreamer />
      </Sequence>
      
      {/* Scene 10: Sidekick (2370-2579 frames) */}
      <Sequence from={SCENE_10_START} durationInFrames={SCENE_10_END - SCENE_10_START + 1}>
        <Scene10Sidekick />
      </Sequence>
      
      {/* Scene 11: Final payoff (2580-2729 frames) */}
      <Sequence from={SCENE_11_START} durationInFrames={SCENE_11_END - SCENE_11_START + 1}>
        <Scene11FinalPayoff />
      </Sequence>
    </>
  );
};

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MagicContextAnimation"
        component={MagicContextAnimation}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
