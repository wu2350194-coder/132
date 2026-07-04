import { useEffect, useState } from "react";

type CountUpOptions = {
  target: number;
  duration?: number;
  delay?: number;
};

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export default function useCountUp({
  target,
  duration = 1800,
  delay = 0,
}: CountUpOptions) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    let startTime = 0;
    let timeout = 0;

    const tick = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.round(easeOutCubic(progress) * target));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [delay, duration, target]);

  return count;
}
