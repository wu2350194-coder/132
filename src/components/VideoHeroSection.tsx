import { ArrowRight, ArrowUpRight, ChevronRight, Mail, Menu, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import "./VideoHeroSection.css";

const navItems = [
  { label: "Works", href: "#works" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const studioStats = [
  { value: "AI", label: "Content Workflow" },
  { value: "UI", label: "Visual Systems" },
  { value: "Culture", label: "Storytelling" },
];

export default function VideoHeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <section className="video-hero-section" id="home">
      <div className="video-hero-frame">
        <video
          className="video-hero-bg"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/home-hero.mp4"
        />
        <div className="video-hero-overlay" />
        <div className="video-hero-glow" />

        <header className="video-hero-nav">
          <a className="video-hero-logo" href="#home" onClick={closeMenu}>
            <span className="video-logo-mark">CZ</span>
            <span>C.Z Visual Lab</span>
          </a>

          <nav className="video-hero-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
                {item.label === "Works" || item.label === "Process" ? <ChevronRight size={14} /> : null}
              </a>
            ))}
          </nav>

          <a className="video-hero-talk" href="#contact">
            <span>
              <ArrowUpRight size={16} />
            </span>
            Let&apos;s Talk
          </a>

          <button
            className="video-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu className={mobileMenuOpen ? "is-hidden" : ""} size={20} />
            <X className={mobileMenuOpen ? "" : "is-hidden"} size={20} />
          </button>
        </header>

        <div className={mobileMenuOpen ? "video-mobile-menu is-open" : "video-mobile-menu"}>
          <div className="video-mobile-menu-inner">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a className="video-mobile-talk" href="#contact" onClick={closeMenu}>
              Let&apos;s Talk
            </a>
          </div>
        </div>

        <div className="video-hero-content">
          <div className="video-hero-top">
            <motion.div
              className="video-hero-badge"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sparkles size={14} />
              AI New Media · Visual Design · Cultural Storytelling
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero-line hero-line-soft">Turning AI Ideas</span>
              <span className="hero-line hero-line-focus">Into Visual Stories</span>
              <span className="hero-line hero-line-soft">For Digital Growth</span>
            </motion.h1>

            <motion.p
              className="video-hero-subcopy"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35 }}
            >
              我是陈泽，专注 AI 内容生产、短视频策划、UI 设计、数据新闻与文化传播表达，
              用视觉和技术把复杂议题转化为更适合传播的数字作品。
            </motion.p>
          </div>

          <div className="video-hero-bottom">
            <motion.aside
              className="video-metric-card"
              initial={{ opacity: 0, x: -22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.45 }}
            >
              <p>Portfolio System</p>
              <strong>5+</strong>
              <span>Creative directions across AI, UI, video, culture and data storytelling.</span>
              <a href="#works">
                <span>
                  <ArrowUpRight size={15} />
                </span>
                View Works
              </a>
            </motion.aside>

            <motion.div
              className="video-hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.55 }}
            >
              <a className="video-primary-btn" href="#works">
                Explore Work
                <ArrowRight size={17} />
              </a>
              <a className="video-secondary-btn" href="#contact">
                <Mail size={16} />
                Contact Me
              </a>
            </motion.div>

            <motion.aside
              className="video-corner-card"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              aria-label="Studio directions"
            >
              <div className="video-corner-mask video-corner-mask-top" />
              <div className="video-corner-mask video-corner-mask-left" />
              <div className="video-corner-icon">
                <ArrowUpRight size={22} />
              </div>
              <div>
                <h2>C.Z Studio Map</h2>
                <div className="video-studio-stats">
                  {studioStats.map((item) => (
                    <span key={item.value}>
                      <strong>{item.value}</strong>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
