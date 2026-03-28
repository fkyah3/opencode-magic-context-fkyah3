import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, COMP_WIDTH, COMP_HEIGHT, FPS, TOTAL_FRAMES } from "./constants";

// Import all scenes
import { Scene1OldWay } from "./scenes/Scene1OldWay";
import { Scene2Split } from "./scenes/Scene2Split";
import { Scene3HistorianActivation } from "./scenes/Scene3HistorianActivation";
import { Scene4Hero } from "./scenes/Scene4Hero";
import { Scene5Outputs } from "./scenes/Scene5Outputs";
import { Scene6Payoff } from "./scenes/Scene6Payoff";
import { Scene7Merging } from "./scenes/Scene7Merging";
import { Scene8Cache } from "./scenes/Scene8Cache";
import { Scene9Dreamer } from "./scenes/Scene9Dreamer";
import { Scene10Sidekick } from "./scenes/Scene10Sidekick";
import { Scene11Final } from "./scenes/Scene11Final";

import {
  SCENE_1_START,
  SCENE_2_START,
  SCENE_3_START,
  SCENE_4_START,
  SCENE_5_START,
  SCENE_6_START,
  SCENE_7_START,
  SCENE_8_START,
  SCENE_9_START,
  SCENE_10_START,
  SCENE_11_START,
} from "./constants";

// Main animation composition
export const MagicContextAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  // Calculate which scene we're in and local frame
  const getSceneInfo = () => {
    if (frame < SCENE_2_START) return { scene: 1, localFrame: frame - SCENE_1_START };
    if (frame < SCENE_3_START) return { scene: 2, localFrame: frame - SCENE_2_START };
    if (frame < SCENE_4_START) return { scene: 3, localFrame: frame - SCENE_3_START };
    if (frame < SCENE_5_START) return { scene: 4, localFrame: frame - SCENE_4_START };
    if (frame < SCENE_6_START) return { scene: 5, localFrame: frame - SCENE_5_START };
    if (frame < SCENE_7_START) return { scene: 6, localFrame: frame - SCENE_6_START };
    if (frame < SCENE_8_START) return { scene: 7, localFrame: frame - SCENE_7_START };
    if (frame < SCENE_9_START) return { scene: 8, localFrame: frame - SCENE_8_START };
    if (frame < SCENE_10_START) return { scene: 9, localFrame: frame - SCENE_9_START };
    if (frame < SCENE_11_START) return { scene: 10, localFrame: frame - SCENE_10_START };
    return { scene: 11, localFrame: frame - SCENE_11_START };
  };

  const { scene, localFrame } = getSceneInfo();

  // Render current scene
  const renderScene = () => {
    switch (scene) {
      case 1:
        return <Scene1OldWay frame={localFrame} />;
      case 2:
        return <Scene2Split frame={localFrame} />;
      case 3:
        return <Scene3HistorianActivation frame={localFrame} />;
      case 4:
        return <Scene4Hero frame={localFrame} />;
      case 5:
        return <Scene5Outputs frame={localFrame} />;
      case 6:
        return <Scene6Payoff frame={localFrame} />;
      case 7:
        return <Scene7Merging frame={localFrame} />;
      case 8:
        return <Scene8Cache frame={localFrame} />;
      case 9:
        return <Scene9Dreamer frame={localFrame} />;
      case 10:
        return <Scene10Sidekick frame={localFrame} />;
      case 11:
        return <Scene11Final frame={localFrame} />;
      default:
        return <Scene1OldWay frame={localFrame} />;
    }
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        width: COMP_WIDTH,
        height: COMP_HEIGHT,
      }}
    >
      {renderScene()}
    </AbsoluteFill>
  );
};

// Root component for Remotion
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MagicContextAnimation"
        component={MagicContextAnimation}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
    </>
  );
};

// Import Composition at the top
import { Composition } from "remotion";
