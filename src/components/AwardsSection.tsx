import { useMemo, useState } from "react";
import { awards } from "../data/siteData";
import type { AwardItem, DetailRecord } from "../types/portfolio";
import AwardCard from "./AwardCard";
import DetailLightbox from "./DetailLightbox";
import FadeIn from "./FadeIn";
import SectionVideoBackground from "./SectionVideoBackground";

function normalizeAward(award: AwardItem | string, index: number): AwardItem {
  if (typeof award !== "string") return award;

  return {
    number: `A${String(index + 1).padStart(2, "0")}`,
    title: award,
    category: "Honor / Certificate",
    description: "可在此补充奖项级别、获奖时间、主办单位、证明材料链接和项目关联说明。",
    evidence: ["证书扫描件", "获奖页面链接", "项目作品截图"],
  };
}

function createAwardDetail(award: AwardItem): DetailRecord {
  return {
    kind: "award",
    number: award.number,
    title: award.title,
    category: award.category,
    description: award.description,
    layoutId: `award-card-${award.number}`,
    outcome: award.outcome ?? "可在此补充该奖项对申请、求职或项目成果的证明价值。",
    evidence: award.evidence ?? ["证书图片", "官方链接", "项目材料", "补充说明"],
    links: award.link
      ? [
          {
            label: award.linkLabel ?? "View proof",
            href: award.link,
          },
        ]
      : [],
    details: [
      { label: "Award No.", value: award.number },
      { label: "Type", value: award.category },
      { label: "Year", value: award.year ?? "待补充" },
    ],
    process: [
      "Proof: 上传证书、截图或官方页面链接。",
      "Context: 补充该奖项对应的项目、课程或比赛背景。",
      "Value: 写清它能证明的能力，例如商业策划、数据新闻、AI 研究或学生领导力。",
    ],
  };
}

export default function AwardsSection() {
  const awardItems = useMemo(
    () => (awards as Array<AwardItem | string>).map((award, index) => normalizeAward(award, index)),
    [],
  );
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const detail = useMemo(
    () => (selectedAward ? createAwardDetail(selectedAward) : null),
    [selectedAward],
  );

  return (
    <>
      <section className="awards-section" id="awards">
        <SectionVideoBackground src="/videos/awards-bg-new.mp4" opacity={0.42} />
        <FadeIn>
          <h2>Awards & Honors</h2>
        </FadeIn>
        <div className="awards-grid">
          {awardItems.map((award, index) => (
            <AwardCard key={award.number} award={award} index={index} onOpen={setSelectedAward} />
          ))}
        </div>
      </section>
      <DetailLightbox item={detail} onClose={() => setSelectedAward(null)} />
    </>
  );
}
