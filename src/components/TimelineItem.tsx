import FadeIn from "./FadeIn";

type TimelineItemProps = {
  time: string;
  title: string;
  role: string;
  description: string;
  index: number;
};

export default function TimelineItem({
  time,
  title,
  role,
  description,
  index,
}: TimelineItemProps) {
  return (
    <FadeIn delay={index * 0.08} className="timeline-item">
      <div className="timeline-dot" />
      <div className="timeline-card">
        <span className="timeline-time">{time}</span>
        <h3>{title}</h3>
        <strong>{role}</strong>
        <p>{description}</p>
      </div>
    </FadeIn>
  );
}
