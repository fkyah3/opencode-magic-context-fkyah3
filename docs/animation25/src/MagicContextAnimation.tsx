import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";
import { Scene9 } from "./scenes/Scene9";
import { Scene10 } from "./scenes/Scene10";
import { Scene11 } from "./scenes/Scene11";

export const MagicContextAnimation: React.FC = () => {
  return (
    <AbsoluteFill className="bg-darkBg bg-grid flex items-center justify-center">
      {/* 
        Total frames: 2730
        Scene 1: 0–209
        Scene 2: 210–329
        Scene 3: 330–599
        Scene 4: 600–959
        Scene 5: 960–1349
        Scene 6: 1350–1559
        Scene 7: 1560–1829
        Scene 8: 1830–2099
        Scene 9: 2100–2369
        Scene 10: 2370–2579
        Scene 11: 2580–2729 
      */}

      <Sequence from={0} durationInFrames={210}>
        <Scene1 />
      </Sequence>
      
      <Sequence from={210} durationInFrames={120}>
        <Scene2 />
      </Sequence>

      <Sequence from={330} durationInFrames={270}>
        <Scene3 />
      </Sequence>

      <Sequence from={600} durationInFrames={360}>
        <Scene4 />
      </Sequence>

      <Sequence from={960} durationInFrames={390}>
        <Scene5 />
      </Sequence>

      <Sequence from={1350} durationInFrames={210}>
        <Scene6 />
      </Sequence>

      <Sequence from={1560} durationInFrames={270}>
        <Scene7 />
      </Sequence>

      <Sequence from={1830} durationInFrames={270}>
        <Scene8 />
      </Sequence>

      <Sequence from={2100} durationInFrames={270}>
        <Scene9 />
      </Sequence>

      <Sequence from={2370} durationInFrames={210}>
        <Scene10 />
      </Sequence>

      <Sequence from={2580} durationInFrames={150}>
        <Scene11 />
      </Sequence>
    </AbsoluteFill>
  );
};
