import { Composition } from 'remotion';
import { MagicContext } from './MagicContext';
import { FPS, DURATION_IN_FRAMES, WIDTH, HEIGHT } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MagicContext"
        component={MagicContext}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
