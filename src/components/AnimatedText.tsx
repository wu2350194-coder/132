import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type AnimatedCharacterProps = {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function AnimatedCharacter({ char, index, total, progress }: AnimatedCharacterProps) {
  const start = index / total;
  const end = Math.min(start + 0.08, 1);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }}>
      {char === " " ? "\u00A0" : char === "\n" ? <br /> : char}
    </motion.span>
  );
}

export default function AnimatedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = Array.from(text);

  return (
    <p ref={ref} className={className}>
      {chars.map((char, index) => (
        <AnimatedCharacter
          key={`${char}-${index}`}
          char={char}
          index={index}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
