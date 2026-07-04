import { Mail, Phone } from "lucide-react";
import { siteInfo } from "../data/siteData";
import ContactButton from "./ContactButton";
import FadeIn from "./FadeIn";
import OutlineButton from "./OutlineButton";
import SectionVideoBackground from "./SectionVideoBackground";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <SectionVideoBackground src={siteInfo.sectionVideos.contact} tone="dark" opacity={0.48} />
      <FadeIn>
        <h2>Let&apos;s Create Something</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p>
          欢迎联系我，讨论 AI 内容、新媒体运营、视觉设计、短视频策划、UI 设计与文化传播相关机会。
        </p>
      </FadeIn>
      <FadeIn delay={0.2} className="contact-details">
        <a href={`mailto:${siteInfo.email}`}>
          <Mail size={18} />
          {siteInfo.email}
        </a>
        <a href={`tel:${siteInfo.phone}`}>
          <Phone size={18} />
          {siteInfo.phone}
        </a>
      </FadeIn>
      <FadeIn delay={0.3} className="contact-actions">
        <ContactButton href={`mailto:${siteInfo.email}`}>Send Email</ContactButton>
        <OutlineButton href="/resume.pdf" dark>
          Download Resume
        </OutlineButton>
      </FadeIn>
      <footer>© 2026 {siteInfo.brand}. AI New Media · Cultural Communication · Visual Design</footer>
    </section>
  );
}
