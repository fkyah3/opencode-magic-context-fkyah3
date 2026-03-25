import { interpolate } from "remotion";
import { COLORS, FONT_FAMILY, INTRO_DURATION } from "../constants";

interface SceneCaptionProps {
  text: string;
  frame: number;
}

export const SceneCaption: React.FC<SceneCaptionProps> = ({
  text,
  frame,
}) => {
  // Fade in 0-15, Hold 15-60, Fade out 60-75 (assuming INTRO_DURATION = 75)
  const opacity = interpolate(
    frame,
    [0, 15, INTRO_DURATION - 15, INTRO_DURATION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Once it fades out, it should disappear entirely to not block interaction
  if (frame > INTRO_DURATION) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        zIndex: 100, // Float on top of everything
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 36,
          fontWeight: 600,
          color: COLORS.textPrimary,
          letterSpacing: "0.02em",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        {text}
      </div>
    </div>
  );
};
