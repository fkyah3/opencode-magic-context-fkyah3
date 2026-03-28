import React from 'react';
import { Sequence } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';
import { Scene9 } from './scenes/Scene9';
import { Scene10 } from './scenes/Scene10';
import { Scene11 } from './scenes/Scene11';
import { SCENES } from './constants';

// Main composition that sequences all scenes
export const MagicContextAnimation: React.FC = () => {
  
  return (
    <>
      {/* Scene 1: Old way - full-screen session pain (frames 0-209) */}
      <Sequence from={SCENES.SCENE_1_START} durationInFrames={SCENES.SCENE_1_END - SCENES.SCENE_1_START + 1}>
        <Scene1 />
      </Sequence>
      
      {/* Scene 2: Split comparison bridge (frames 210-329) */}
      <Sequence from={SCENES.SCENE_2_START} durationInFrames={SCENES.SCENE_2_END - SCENES.SCENE_2_START + 1}>
        <Scene2 />
      </Sequence>
      
      {/* Scene 3: Historian activation (frames 330-599) */}
      <Sequence from={SCENES.SCENE_3_START} durationInFrames={SCENES.SCENE_3_END - SCENES.SCENE_3_START + 1}>
        <Scene3 />
      </Sequence>
      
      {/* Scene 4: Hero shot - Historian takes from head while tail grows (frames 600-959) */}
      <Sequence from={SCENES.SCENE_4_START} durationInFrames={SCENES.SCENE_4_END - SCENES.SCENE_4_START + 1}>
        <Scene4 />
      </Sequence>
      
      {/* Scene 5: Historian outputs - compartments, facts, memory (frames 960-1349) */}
      <Sequence from={SCENES.SCENE_5_START} durationInFrames={SCENES.SCENE_5_END - SCENES.SCENE_5_START + 1}>
        <Scene5 />
      </Sequence>
      
      {/* Scene 6: Payoff - pressure drops, flow intact (frames 1350-1559) */}
      <Sequence from={SCENES.SCENE_6_START} durationInFrames={SCENES.SCENE_6_END - SCENES.SCENE_6_START + 1}>
        <Scene6 />
      </Sequence>
      
      {/* Scene 7: Long-session sustainability - compartment merging (frames 1560-1829) */}
      <Sequence from={SCENES.SCENE_7_START} durationInFrames={SCENES.SCENE_7_END - SCENES.SCENE_7_START + 1}>
        <Scene7 />
      </Sequence>
      
      {/* Scene 8: Cache awareness (frames 1830-2099) */}
      <Sequence from={SCENES.SCENE_8_START} durationInFrames={SCENES.SCENE_8_END - SCENES.SCENE_8_START + 1}>
        <Scene8 />
      </Sequence>
      
      {/* Scene 9: Dreamer (frames 2100-2369) */}
      <Sequence from={SCENES.SCENE_9_START} durationInFrames={SCENES.SCENE_9_END - SCENES.SCENE_9_START + 1}>
        <Scene9 />
      </Sequence>
      
      {/* Scene 10: Sidekick (frames 2370-2579) */}
      <Sequence from={SCENES.SCENE_10_START} durationInFrames={SCENES.SCENE_10_END - SCENES.SCENE_10_START + 1}>
        <Scene10 />
      </Sequence>
      
      {/* Scene 11: Final payoff / end card (frames 2580-2729) */}
      <Sequence from={SCENES.SCENE_11_START} durationInFrames={SCENES.SCENE_11_END - SCENES.SCENE_11_START + 1}>
        <Scene11 />
      </Sequence>
    </>
  );
};
