import { siteInfo } from "../data/siteData";
import ContactButton from "./ContactButton";
import FadeIn from "./FadeIn";

const aboutLines = [
  {
    lead: "我是陈泽，",
    body: "一名网络与新媒体专业本科生，关注",
    highlight: "AI 内容生产、影像表达、视觉设计与文化传播",
    tail: "。",
  },
  {
    lead: "我擅长",
    body: "将选题策划、脚本写作、摄影摄像、PR/AE 后期、UI 设计和数据新闻表达，整合到完整的新媒体项目中。",
    highlight: "从内容策略到视觉落地",
    tail: "",
  },
  {
    lead: "长期关注",
    body: "历史文化、文物、古建筑与城市形象相关议题，具备扎实的人文素养、文化解读能力和审美积累。",
    highlight: "文化转译与数字叙事",
    tail: "",
  },
  {
    lead: "希望用",
    body: "AI 工具和新媒体语言，把复杂的文化内容转化为更适合传播的视觉作品、短视频、IP 设计和数字化内容。",
    highlight: "AI × 文化传播",
    tail: "",
  },
];

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <video
        className="about-video-bg"
        src={siteInfo.scrollVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="about-video-overlay" />
      <FadeIn className="blob blob-a" delay={0.1} />
      <FadeIn className="blob blob-b" delay={0.2} />
      <FadeIn className="blob-card blob-c" delay={0.3} />
      <FadeIn className="blob-card blob-d" delay={0.4} />
      <div className="about-inner">
        <FadeIn>
          <h2>About Me</h2>
        </FadeIn>
        <div className="about-text about-art-text">
          {aboutLines.map((line) => (
            <p key={line.highlight}>
              <strong>{line.lead}</strong>
              {line.body}
              <span>{line.highlight}</span>
              {line.tail}
            </p>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <ContactButton href="#contact">Contact Chen Ze</ContactButton>
        </FadeIn>
      </div>
    </section>
  );
}
