import { processSteps, siteInfo } from "../data/siteData";
import FadeIn from "./FadeIn";
import SectionVideoBackground from "./SectionVideoBackground";

export default function ProcessSection() {
  return (
    <section className="process-section" id="process">
      <SectionVideoBackground src={siteInfo.sectionVideos.process} opacity={0.58} />
      <FadeIn>
        <p className="section-eyebrow">Creator Workflow</p>
        <h2>Process</h2>
      </FadeIn>
      <div className="process-grid">
        {processSteps.map((step, index) => (
          <FadeIn key={step.number} delay={index * 0.08} className="process-card">
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
