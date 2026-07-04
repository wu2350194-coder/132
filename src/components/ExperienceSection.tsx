import { experiences, siteInfo } from "../data/siteData";
import FadeIn from "./FadeIn";
import SectionVideoBackground from "./SectionVideoBackground";
import TimelineItem from "./TimelineItem";

export default function ExperienceSection() {
  return (
    <section className="experience-section" id="experience">
      <SectionVideoBackground src={siteInfo.sectionVideos.experience} opacity={0.54} />
      <FadeIn>
        <h2>Experience</h2>
      </FadeIn>
      <div className="timeline">
        {experiences.map((experience, index) => (
          <TimelineItem key={`${experience.time}-${experience.title}`} {...experience} index={index} />
        ))}
      </div>
    </section>
  );
}
