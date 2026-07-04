import { ArrowUp, CircleDot } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "portfolio-story", label: "Story" },
  { id: "works", label: "Works" },
  { id: "process", label: "Process" },
  { id: "experience", label: "Experience" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

const interactiveSelector = [
  ".about-art-text",
  ".capability-item",
  ".project-card",
  ".process-card",
  ".timeline-card",
  ".award-card",
  ".contact-details a",
  ".contact-button",
  ".outline-button",
].join(",");

export default function SiteInteractions() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const sectionIds = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(Math.min(Math.max(nextProgress, 0), 1));
      setShowTop(window.scrollY > window.innerHeight * 0.75);

      const viewportAnchor = window.scrollY + window.innerHeight * 0.38;
      let current = sectionIds[0];
      sectionIds.forEach((id) => {
        const node = document.getElementById(id);
        if (node && node.offsetTop <= viewportAnchor) current = id;
      });
      setActiveId(current);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionIds]);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = event.target as Element | null;
      const card = target?.closest<HTMLElement>(interactiveSelector);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const localX = ((event.clientX - rect.left) / rect.width) * 100;
      const localY = ((event.clientY - rect.top) / rect.height) * 100;
      const rotateX = (0.5 - (event.clientY - rect.top) / rect.height) * 4;
      const rotateY = (((event.clientX - rect.left) / rect.width) - 0.5) * 5;

      card.style.setProperty("--local-x", `${localX}%`);
      card.style.setProperty("--local-y", `${localY}%`);
      card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      card.dataset.interactive = "true";
    };

    const handleLeave = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const card = target?.closest<HTMLElement>(interactiveSelector);
      if (!card) return;
      if (event.relatedTarget instanceof Node && card.contains(event.relatedTarget)) return;
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      delete card.dataset.interactive;
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerout", handleLeave);

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerout", handleLeave);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div className="site-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <nav
        className={`section-rail ${activeId === "home" ? "is-home-hidden" : ""}`}
        aria-label="Page sections"
      >
        {sections.map((section) => (
          <a
            className={activeId === section.id ? "is-active" : ""}
            href={`#${section.id}`}
            key={section.id}
            aria-label={section.label}
            title={section.label}
          >
            <CircleDot size={14} />
            <span>{section.label}</span>
          </a>
        ))}
      </nav>

      <button
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
