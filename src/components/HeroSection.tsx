import { Grid2X2, Plus } from "lucide-react";
import { motion } from "motion/react";
import { heroKeywords, navLinks, siteInfo } from "../data/siteData";
import ContactButton from "./ContactButton";
import OutlineButton from "./OutlineButton";

const ease = [0.16, 1, 0.3, 1] as const;

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 28 28">
        <rect x="4" y="7" width="17" height="6" rx="3" transform="rotate(-35 4 7)" />
        <rect x="7" y="17" width="17" height="6" rx="3" transform="rotate(-35 7 17)" />
      </svg>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <motion.nav
        className="hero-nav"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="nav-left">
          <a className="brand-pill" href="#top" aria-label="C.Z Visual Lab home">
            <LogoMark />
            <span>{siteInfo.brand}</span>
          </a>
          <button className="menu-pill" type="button" aria-label="Open navigation">
            <span>
              <Plus size={12} strokeWidth={3} />
            </span>
            Menu
          </button>
          <div className="nav-tags">
            <span>AI New Media</span>
            <span>Visual Design</span>
          </div>
        </div>
        <div className="nav-right">
          <div className="story-pill">
            <span className="grid-icon">
              <Grid2X2 size={14} />
            </span>
            Cultural Storytelling
          </div>
          <div className="nav-link-strip">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="hero-video-wrap"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <video autoPlay muted loop playsInline src={siteInfo.heroVideo} />
        <div className="hero-overlay" />
      </motion.div>

      <motion.div
        className="hero-footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease }}
      >
        <div className="hero-copy">
          <motion.div
            className="hero-subtitle"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
          >
            <span />
            AI New Media · Visual Design · Cultural Communication
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease }}
          >
            AI Content, Visual
            <br />
            Stories & Digital Growth.
          </motion.h1>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8, ease }}
          >
            {siteInfo.description}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8, ease }}
          >
            <ContactButton href="#works">View Works</ContactButton>
            <OutlineButton href="#contact">Contact Me</OutlineButton>
          </motion.div>
        </div>

        <motion.div
          className="hero-keywords"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.8, ease }}
        >
          {heroKeywords.slice(0, 3).map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
