import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {
  SCENE_10_DURATION,
  SCENE_10_START,
  SCENE_11_DURATION,
  SCENE_11_START,
  SCENE_1_DURATION,
  SCENE_1_START,
  SCENE_2_DURATION,
  SCENE_2_START,
  SCENE_3_DURATION,
  SCENE_3_START,
  SCENE_4_DURATION,
  SCENE_4_START,
  SCENE_5_DURATION,
  SCENE_5_START,
  SCENE_6_DURATION,
  SCENE_6_START,
  SCENE_7_DURATION,
  SCENE_7_START,
  SCENE_8_DURATION,
  SCENE_8_START,
  SCENE_9_DURATION,
  SCENE_9_START,
} from './constants';
import {
  Scene10Sidekick,
  Scene11Finale,
  Scene1OldWay,
  Scene2SplitBridge,
  Scene3HistorianActivation,
  Scene4HeadTail,
  Scene5HistorianOutputs,
  Scene6HealthyPayoff,
  Scene7LongSession,
  Scene8CacheAwareness,
  Scene9Dreamer,
} from './scenes';

export const OpenCodeMagicContext: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_DURATION}>
        <Scene1OldWay />
      </Sequence>
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_DURATION}>
        <Scene2SplitBridge />
      </Sequence>
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_DURATION}>
        <Scene3HistorianActivation />
      </Sequence>
      <Sequence from={SCENE_4_START} durationInFrames={SCENE_4_DURATION}>
        <Scene4HeadTail />
      </Sequence>
      <Sequence from={SCENE_5_START} durationInFrames={SCENE_5_DURATION}>
        <Scene5HistorianOutputs />
      </Sequence>
      <Sequence from={SCENE_6_START} durationInFrames={SCENE_6_DURATION}>
        <Scene6HealthyPayoff />
      </Sequence>
      <Sequence from={SCENE_7_START} durationInFrames={SCENE_7_DURATION}>
        <Scene7LongSession />
      </Sequence>
      <Sequence from={SCENE_8_START} durationInFrames={SCENE_8_DURATION}>
        <Scene8CacheAwareness />
      </Sequence>
      <Sequence from={SCENE_9_START} durationInFrames={SCENE_9_DURATION}>
        <Scene9Dreamer />
      </Sequence>
      <Sequence from={SCENE_10_START} durationInFrames={SCENE_10_DURATION}>
        <Scene10Sidekick />
      </Sequence>
      <Sequence from={SCENE_11_START} durationInFrames={SCENE_11_DURATION}>
        <Scene11Finale />
      </Sequence>
    </AbsoluteFill>
  );
};
