type SectionVideoBackgroundProps = {
  src: string;
  tone?: "light" | "dark";
  opacity?: number;
};

export default function SectionVideoBackground({
  src,
  tone = "light",
  opacity = 0.28,
}: SectionVideoBackgroundProps) {
  return (
    <div className={`section-video-bg section-video-bg-${tone}`} aria-hidden="true">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ opacity }}
      />
      <div className="section-video-wash" />
    </div>
  );
}
