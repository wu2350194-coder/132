import { ArrowUpRight, ExternalLink, Sparkle } from "lucide-react";
import { motion } from "motion/react";
import type { AwardItem } from "../types/portfolio";
import FadeIn from "./FadeIn";

type AwardCardProps = {
  award: AwardItem;
  index: number;
  onOpen: (award: AwardItem) => void;
};

export default function AwardCard({ award, index, onOpen }: AwardCardProps) {
  return (
    <FadeIn delay={index * 0.06} className="award-card-wrap">
      <motion.article className="award-card" layoutId={`award-card-${award.number}`}>
        <div className="award-card-top">
          <span className="award-number">{award.number}</span>
          <div className="award-icon">
            <Sparkle size={16} />
          </div>
        </div>

        <div className="award-card-main">
          <span className="award-category">{award.category}</span>
          <p>{award.title}</p>
          {award.year ? <small>{award.year}</small> : null}
        </div>

        <div className="award-card-actions">
          <a
            href={`#award-${award.number}`}
            onClick={(event) => {
              event.preventDefault();
              onOpen(award);
            }}
          >
            View Proof
            <ArrowUpRight size={15} />
          </a>
          {award.link ? (
            <a className="award-external-link" href={award.link} target="_blank" rel="noreferrer" aria-label={`${award.title} link`}>
              <ExternalLink size={15} />
            </a>
          ) : null}
        </div>
      </motion.article>
    </FadeIn>
  );
}
