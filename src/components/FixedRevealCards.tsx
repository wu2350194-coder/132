import type { CSSProperties } from "react";

type FixedRevealCardsProps = {
  opacity: number;
  reveal: number;
};

const cards = [
  {
    title: "AI Content Production",
    text: "AI 选题拆解、脚本优化、AI 视频工作流、ComfyUI 基础流程、Codex 辅助创作，将想法快速转化为可传播的内容方案。",
  },
  {
    title: "Visual & UI Design",
    text: "小程序页面、个人网站、UI 界面、视觉规范、Canva 设计与 IP 视觉延展，形成清晰统一的视觉表达。",
  },
  {
    title: "Cultural Storytelling",
    text: "关注历史文化、文物、古建筑与城市形象议题，将文化内容转译为短视频、数据新闻、视觉设计和数字作品。",
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export default function FixedRevealCards({ opacity, reveal }: FixedRevealCardsProps) {
  const safeReveal = clamp(reveal);

  return (
    <div
      className="scroll-story-cards"
      style={
        {
          "--card-mask": `${Math.round(safeReveal * 130)}%`,
          opacity: clamp(opacity),
          pointerEvents: opacity > 0.1 ? "auto" : "none",
        } as CSSProperties
      }
      aria-label="Core capabilities"
    >
      <div className="scroll-story-cards-grid">
        {cards.map((card, index) => (
          <article className="scroll-story-card" key={card.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
