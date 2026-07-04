import { useEffect } from "react";

export default function MouseFollower() {
  useEffect(() => {
    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        const px = `${event.clientX}px`;
        const py = `${event.clientY}px`;
        document.documentElement.style.setProperty("--mouse-x", x.toFixed(4));
        document.documentElement.style.setProperty("--mouse-y", y.toFixed(4));
        document.documentElement.style.setProperty("--mouse-px", px);
        document.documentElement.style.setProperty("--mouse-py", py);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <div className="mouse-glow" aria-hidden="true" />;
}
