import React from 'react';
import { Composition } from 'remotion';
import { MagicContextAnimation } from './MagicContextAnimation';
import { TOTAL_FRAMES, FPS, LAYOUT } from './constants';

// Root component that registers the composition
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MagicContext"
        component={MagicContextAnimation}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={LAYOUT.width}
        height={LAYOUT.height}
        defaultProps={{}}
      />
    </>
  );
};
