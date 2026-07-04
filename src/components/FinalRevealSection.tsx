import type { CSSProperties } from "react";

type FinalRevealSectionProps = {
  progress: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export default function FinalRevealSection({ progress }: FinalRevealSectionProps) {
  const reveal = clamp(progress);

  return (
    <div
      className="scroll-story-final"
      style={
        {
          opacity: reveal,
          transform: `translate3d(0, ${32 - reveal * 32}px, 0)`,
          filter: `blur(${8 - reveal * 8}px)`,
        } as CSSProperties
      }
    >
      <p>C.Z Visual Lab</p>
      <h2>Selected Works</h2>
      <span>Scroll forward to explore projects, experiments and creative practice.</span>
    </div>
  );
}
