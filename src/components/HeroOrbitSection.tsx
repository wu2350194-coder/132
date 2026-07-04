import { ArrowUpRight, ChevronRight, Grid3X3, Mail } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import { heroOrbitAssets, heroTickerItems, navLinks } from "../data/siteData";
import useCountUp from "../hooks/useCountUp";
import TypewriterHeading from "./TypewriterHeading";
import "./HeroOrbitSection.css";

const heroTitle =
  "Turning AI Ideas\nInto Visual Stories,\nInterfaces & Digital Growth.";

const repeatedTickerItems = Array.from({ length: 4 }, () => heroTickerItems).flat();

const orbitLines = [
  { className: "orbit-line orbit-line-1", label: "AI workflow orbit" },
  { className: "orbit-line orbit-line-2", label: "visual design orbit" },
  { className: "orbit-line orbit-line-3", label: "content planning orbit" },
  { className: "orbit-line orbit-line-4", label: "culture orbit" },
];

const simplifiedNavLinks = navLinks.filter((link) =>
  ["About", "Skills", "Works", "Contact"].includes(link.label),
);

export default function HeroOrbitSection() {
  const [typingDone, setTypingDone] = useState(false);
  const count = useCountUp({ target: 5, duration: 1800, delay: 1200 });

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
  }, []);

  return (
    <section className="hero-visual-section" id="home">
      <motion.header
        className="hero-orbit-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-orbit-header-inner">
          <div className="hero-orbit-brand-group">
            <a className="hero-orbit-brand" href="#home" aria-label="C.Z Visual Lab home">
              <svg viewBox="0 0 46 46" aria-hidden="true">
                <rect x="6" y="8" width="18" height="30" rx="5" />
                <rect x="22" y="8" width="18" height="30" rx="5" />
                <path d="M15 17h9l-9 12h10" />
                <path d="M30 17h8l-8 12h9" />
              </svg>
              <span>C.Z Visual Lab</span>
            </a>
            <nav className="hero-orbit-nav" aria-label="Primary navigation">
              {simplifiedNavLinks.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hero-orbit-actions">
            <span className="btn-border-wrap">
              <a className="hero-orbit-contact" href="#contact">
                Contact Me
              </a>
            </span>
          </div>
        </div>
      </motion.header>

      <div className="hero-orbit-content">
        <motion.div
          className="hero-orbit-copy"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-orbit-eyebrow">
            <span />
            AI New Media · Visual Design · Cultural Storytelling
          </p>

          <TypewriterHeading
            className="hero-orbit-title"
            text={heroTitle}
            speed={32}
            delay={400}
            onComplete={handleTypingComplete}
          />

          <p className="hero-orbit-description">
            我是陈泽，一名网络与新媒体专业学生，专注 AI 内容生产、短视频策划、
            UI 设计、数据新闻与文化传播表达，尝试把复杂议题转化为更适合传播的视觉作品。
          </p>

          <motion.div
            className="hero-orbit-cta-row"
            initial={{ opacity: 0, y: 18 }}
            animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="btn-border-wrap">
              <a className="hero-primary-cta" href="#works">
                View Works
                <ChevronRight size={17} strokeWidth={2.2} />
              </a>
            </span>
            <a className="hero-secondary-cta" href="#contact">
              <Mail size={17} strokeWidth={2} />
              Contact Me
            </a>
          </motion.div>

          <motion.div
            className="hero-cursor-badge"
            initial={{ opacity: 0, scale: 0.9, y: 14 }}
            animate={typingDone ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 14 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 30 34" aria-hidden="true">
              <path d="M2 2l25 14.5-12.4 2.4-5.7 11.6L2 2z" />
            </svg>
            <span>Chen</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-orbit-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Chen Ze creative ability orbit visualization"
        >
          {orbitLines.map((orbit) => (
            <div className={orbit.className} aria-label={orbit.label} key={orbit.className} />
          ))}

          <div className="hero-orbit-center">
            <div className="hero-portrait-aura" />
            <img src="/assets/voxel-portrait.png" alt="Chen Ze voxel portrait" />
            <div className="hero-count-pill">
              <strong>{count}+</strong>
              <span>Creative Directions</span>
            </div>
          </div>

          {heroOrbitAssets.map((asset, index) => {
            const assetStyle = {
              "--asset-angle": `${asset.angle}deg`,
              "--asset-radius": `${asset.radius}px`,
              "--asset-size": `${asset.size}px`,
              "--asset-delay": `${0.6 + index * 0.21}s`,
            } as CSSProperties;

            return (
              <motion.div
                className={`hero-orbit-asset orbit-${asset.orbit}`}
                style={assetStyle}
                key={asset.title}
                initial={{ opacity: 0, scale: 0.3, rotate: -180, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.85,
                  delay: 0.6 + index * 0.21,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img src={asset.image} alt={asset.title} loading="lazy" />
              </motion.div>
            );
          })}

          <div className="hero-orbit-chip chip-ai">
            <Grid3X3 size={15} />
            AI + Culture
          </div>
          <div className="hero-orbit-chip chip-growth">
            <ArrowUpRight size={15} />
            Digital Growth
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-skill-ticker"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-skill-track">
          {repeatedTickerItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
