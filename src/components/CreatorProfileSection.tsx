import { motion } from "motion/react";
import { profileStats, siteInfo } from "../data/siteData";
import ContactButton from "./ContactButton";
import FadeIn from "./FadeIn";

const creatorOrbitAssets = Array.from({ length: 10 }, (_, index) => ({
  src: `/images/hero-assets/creator-orbit-${String(index + 1).padStart(2, "0")}.png`,
}));

export default function CreatorProfileSection() {
  return (
    <section className="creator-profile-section" aria-label="Creator profile">
      <FadeIn y={40}>
        <div className="creator-heading-wrap">
          <h2 className="creator-heading">Hi, I&apos;m Chen Ze</h2>
        </div>
      </FadeIn>

      <div className="creator-orbit-assets" aria-hidden="true">
        {creatorOrbitAssets.map((asset, index) => (
          <motion.img
            key={asset.src}
            className={`creator-orbit-asset creator-orbit-asset-${index + 1}`}
            src={asset.src}
            alt=""
            loading="lazy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "80px" }}
            transition={{
              delay: 0.08 * index,
              duration: 0.75,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}
      </div>

      <motion.div
        className="creator-portrait-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "80px" }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="creator-portrait-magnet">
          <div className="creator-character-stage" aria-hidden="true">
            <div className="creator-character-glow" />
            <img src="/images/chen-ze-3d-character.png" alt="" />
            <div className="creator-character-shadow" />
          </div>
        </div>
      </motion.div>

      <div className="creator-bottom">
        <FadeIn delay={0.35} className="creator-bottom-copy">
          <p>
            A new media creator driven by AI workflows, cultural storytelling, UI systems,
            documentary shooting and digital growth.
          </p>
          <span>{siteInfo.subtitle}</span>
        </FadeIn>
        <FadeIn delay={0.5}>
          <ContactButton href="#contact">Contact Me</ContactButton>
        </FadeIn>
      </div>

      <motion.div
        className="creator-stats"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {profileStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
