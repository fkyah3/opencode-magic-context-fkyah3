import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { SCENES, COLORS } from './constants';
import { Scene1OldWay } from './scenes/Scene1OldWay';
import { Scene2Split } from './scenes/Scene2Split';
import { Scene3HistorianWake } from './scenes/Scene3HistorianWake';
import { Scene4Simultaneous } from './scenes/Scene4Simultaneous';
import { Scene5Outputs } from './scenes/Scene5Outputs';
import { Scene6Healthy } from './scenes/Scene6Healthy';
import { Scene7LongSession } from './scenes/Scene7LongSession';
import { Scene8Cache } from './scenes/Scene8Cache';
import { Scene9Dreamer } from './scenes/Scene9Dreamer';
import { Scene10Sidekick } from './scenes/Scene10Sidekick';
import { Scene11Payoff } from './scenes/Scene11Payoff';

export const MagicContext: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgBase, overflow: 'hidden' }}>
      <Sequence from={SCENES.SCENE_1_START} durationInFrames={SCENES.SCENE_2_START - SCENES.SCENE_1_START}>
        <Scene1OldWay />
      </Sequence>
      <Sequence from={SCENES.SCENE_2_START} durationInFrames={SCENES.SCENE_3_START - SCENES.SCENE_2_START}>
        <Scene2Split />
      </Sequence>
      <Sequence from={SCENES.SCENE_3_START} durationInFrames={SCENES.SCENE_4_START - SCENES.SCENE_3_START}>
        <Scene3HistorianWake />
      </Sequence>
      <Sequence from={SCENES.SCENE_4_START} durationInFrames={SCENES.SCENE_5_START - SCENES.SCENE_4_START}>
        <Scene4Simultaneous />
      </Sequence>
      <Sequence from={SCENES.SCENE_5_START} durationInFrames={SCENES.SCENE_6_START - SCENES.SCENE_5_START}>
        <Scene5Outputs />
      </Sequence>
      <Sequence from={SCENES.SCENE_6_START} durationInFrames={SCENES.SCENE_7_START - SCENES.SCENE_6_START}>
        <Scene6Healthy />
      </Sequence>
      <Sequence from={SCENES.SCENE_7_START} durationInFrames={SCENES.SCENE_8_START - SCENES.SCENE_7_START}>
        <Scene7LongSession />
      </Sequence>
      <Sequence from={SCENES.SCENE_8_START} durationInFrames={SCENES.SCENE_9_START - SCENES.SCENE_8_START}>
        <Scene8Cache />
      </Sequence>
      <Sequence from={SCENES.SCENE_9_START} durationInFrames={SCENES.SCENE_10_START - SCENES.SCENE_9_START}>
        <Scene9Dreamer />
      </Sequence>
      <Sequence from={SCENES.SCENE_10_START} durationInFrames={SCENES.SCENE_11_START - SCENES.SCENE_10_START}>
        <Scene10Sidekick />
      </Sequence>
      <Sequence from={SCENES.SCENE_11_START} durationInFrames={2730 - SCENES.SCENE_11_START}>
        <Scene11Payoff />
      </Sequence>
    </AbsoluteFill>
  );
};
