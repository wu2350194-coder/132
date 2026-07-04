import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
};

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const withinX = event.clientX >= rect.left - padding && event.clientX <= rect.right + padding;
    const withinY = event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding;

    if (withinX && withinY) {
      node.style.transition = "transform 0.3s ease-out";
      node.style.transform = `translate3d(${x / strength}px, ${y / strength}px, 0)`;
    }
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transition = "transform 0.6s ease-in-out";
    node.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
