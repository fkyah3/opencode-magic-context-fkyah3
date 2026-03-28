import React from 'react';
import { Composition, AbsoluteFill } from 'remotion';
import { 
  Scene1OldWay,
  Scene2SplitComparison,
  Scene3HistorianActivation,
  Scene4HeadToTail,
  Scene5HistorianOutputs,
  Scene6HealthyContext,
  Scene7LongSession,
  Scene8CacheAwareness,
  Scene9Dreamer,
  Scene10Sidekick,
  Scene11FinalPayoff,
} from './scenes';
import { SCENES, FPS, TOTAL_FRAMES, VIDEO_WIDTH, VIDEO_HEIGHT } from './constants';

// Main composition that sequences all scenes
const MagicContextDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1: Old way - 0-209 */}
      {SCENES.SCENE_1_START >= 0 && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <Scene1OldWay />
        </div>
      )}
      
      {/* Scene 2: Split comparison - 210-329 */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0,
          opacity: 0, // Handled by scene component internally
        }} 
      >
        <Scene2SplitComparison />
      </div>
      
      {/* Scene 3: Historian activation - 330-599 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene3HistorianActivation />
      </div>
      
      {/* Scene 4: Head-to-tail - 600-959 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene4HeadToTail />
      </div>
      
      {/* Scene 5: Historian outputs - 960-1349 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene5HistorianOutputs />
      </div>
      
      {/* Scene 6: Healthy context - 1350-1559 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene6HealthyContext />
      </div>
      
      {/* Scene 7: Long session - 1560-1829 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene7LongSession />
      </div>
      
      {/* Scene 8: Cache awareness - 1830-2099 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene8CacheAwareness />
      </div>
      
      {/* Scene 9: Dreamer - 2100-2369 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene9Dreamer />
      </div>
      
      {/* Scene 10: Sidekick - 2370-2579 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene10Sidekick />
      </div>
      
      {/* Scene 11: Final payoff - 2580-2729 */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Scene11FinalPayoff />
      </div>
    </AbsoluteFill>
  );
};

// Export compositions for Remotion
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MagicContextDemo"
        component={MagicContextDemo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      {/* Individual scene compositions for testing */}
      <Composition
        id="Scene1OldWay"
        component={Scene1OldWay}
        durationInFrames={SCENES.SCENE_1_END - SCENES.SCENE_1_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene2SplitComparison"
        component={Scene2SplitComparison}
        durationInFrames={SCENES.SCENE_2_END - SCENES.SCENE_2_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene3HistorianActivation"
        component={Scene3HistorianActivation}
        durationInFrames={SCENES.SCENE_3_END - SCENES.SCENE_3_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene4HeadToTail"
        component={Scene4HeadToTail}
        durationInFrames={SCENES.SCENE_4_END - SCENES.SCENE_4_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene5HistorianOutputs"
        component={Scene5HistorianOutputs}
        durationInFrames={SCENES.SCENE_5_END - SCENES.SCENE_5_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene6HealthyContext"
        component={Scene6HealthyContext}
        durationInFrames={SCENES.SCENE_6_END - SCENES.SCENE_6_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene7LongSession"
        component={Scene7LongSession}
        durationInFrames={SCENES.SCENE_7_END - SCENES.SCENE_7_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene8CacheAwareness"
        component={Scene8CacheAwareness}
        durationInFrames={SCENES.SCENE_8_END - SCENES.SCENE_8_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene9Dreamer"
        component={Scene9Dreamer}
        durationInFrames={SCENES.SCENE_9_END - SCENES.SCENE_9_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene10Sidekick"
        component={Scene10Sidekick}
        durationInFrames={SCENES.SCENE_10_END - SCENES.SCENE_10_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      
      <Composition
        id="Scene11FinalPayoff"
        component={Scene11FinalPayoff}
        durationInFrames={SCENES.SCENE_11_END - SCENES.SCENE_11_START + 1}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
