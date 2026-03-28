import React from "react";
import { Composition } from "remotion";
import { MagicContextAnimation } from "./MagicContextAnimation";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MagicContextAnimation"
        component={MagicContextAnimation}
        durationInFrames={2730}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
