import { useEffect, useRef, useState } from "react";
import { marqueeItems } from "../data/siteData";

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const splitIndex = Math.ceil(marqueeItems.length / 2);
  const firstRow = marqueeItems.slice(0, splitIndex);
  const secondRow = marqueeItems.slice(splitIndex);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const nextOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(nextOffset);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderRow = (items: typeof marqueeItems, direction: "right" | "left") => {
    const tiled = [...items, ...items, ...items];
    const signedOffset = direction === "right" ? offset : -offset;
    return (
      <div className="marquee-row" style={{ transform: `translate3d(${signedOffset}px, 0, 0)` }}>
        {tiled.map((item, index) => (
          <figure className="marquee-tile" key={`${item.title}-${index}`}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>
    );
  };

  return (
    <section className="marquee-section" ref={sectionRef}>
      <div className="marquee-track">
        {renderRow(firstRow, "right")}
        {renderRow(secondRow, "left")}
      </div>
    </section>
  );
}
