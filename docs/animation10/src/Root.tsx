import React from 'react';
import {Composition} from 'remotion';
import {
  FPS,
  HEIGHT,
  SCENE_10_DURATION,
  SCENE_11_DURATION,
  SCENE_1_DURATION,
  SCENE_2_DURATION,
  SCENE_3_DURATION,
  SCENE_4_DURATION,
  SCENE_5_DURATION,
  SCENE_6_DURATION,
  SCENE_7_DURATION,
  SCENE_8_DURATION,
  SCENE_9_DURATION,
  TOTAL_FRAMES,
  WIDTH,
} from './constants';
import {OpenCodeMagicContext} from './OpenCodeMagicContext';
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

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OpenCodeMagicContext"
        component={OpenCodeMagicContext}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition id="Scene1OldWay" component={Scene1OldWay} durationInFrames={SCENE_1_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene2SplitBridge" component={Scene2SplitBridge} durationInFrames={SCENE_2_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene3HistorianActivation" component={Scene3HistorianActivation} durationInFrames={SCENE_3_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene4HeadTail" component={Scene4HeadTail} durationInFrames={SCENE_4_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene5HistorianOutputs" component={Scene5HistorianOutputs} durationInFrames={SCENE_5_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene6HealthyPayoff" component={Scene6HealthyPayoff} durationInFrames={SCENE_6_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene7LongSession" component={Scene7LongSession} durationInFrames={SCENE_7_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene8CacheAwareness" component={Scene8CacheAwareness} durationInFrames={SCENE_8_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene9Dreamer" component={Scene9Dreamer} durationInFrames={SCENE_9_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene10Sidekick" component={Scene10Sidekick} durationInFrames={SCENE_10_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Composition id="Scene11Finale" component={Scene11Finale} durationInFrames={SCENE_11_DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
    </>
  );
};
