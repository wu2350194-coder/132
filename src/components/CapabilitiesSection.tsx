import { capabilities, siteInfo } from "../data/siteData";
import FadeIn from "./FadeIn";
import SectionVideoBackground from "./SectionVideoBackground";

export default function CapabilitiesSection() {
  return (
    <section className="capabilities-section" id="skills">
      <SectionVideoBackground src={siteInfo.sectionVideos.capabilities} opacity={0.56} />
      <FadeIn>
        <h2>Capabilities</h2>
      </FadeIn>
      <div className="capability-list">
        {capabilities.map((item, index) => (
          <FadeIn key={item.number} delay={index * 0.1} className="capability-item">
            <span>{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
