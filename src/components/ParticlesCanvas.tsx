import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
};

const colors = [
  "rgba(255,255,255,0.45)",
  "rgba(143,216,168,0.42)",
  "rgba(94,211,194,0.32)",
];

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let particles: Particle[] = [];

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 34 : 58;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.06 - Math.random() * 0.1,
        radius: 0.8 + Math.random() * 1.8,
        alpha: 0.28 + Math.random() * 0.42,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = () => {
      if (!isVisible) {
        frame = requestAnimationFrame(draw);
        return;
      }

      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y < -12) {
          particle.y = height + 12;
          particle.x = Math.random() * width;
        }
        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;

        context.beginPath();
        context.globalAlpha = particle.alpha;
        context.fillStyle = particle.color;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return <canvas className="particles-canvas" ref={canvasRef} aria-hidden="true" />;
}
