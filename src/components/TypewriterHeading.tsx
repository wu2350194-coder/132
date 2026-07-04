import { useEffect, useMemo, useState } from "react";

type TypewriterHeadingProps = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
};

const highlightWords = ["AI Ideas", "Visual Stories", "Interfaces"];

function renderStyledText(value: string) {
  const pattern = new RegExp(`(${highlightWords.join("|")})`, "g");
  return value.split(pattern).map((part, index) => {
    if (highlightWords.includes(part)) {
      return (
        <span className="typewriter-accent" key={`${part}-${index}`}>
          {part}
        </span>
      );
    }

    return part;
  });
}

export default function TypewriterHeading({
  text,
  speed = 32,
  delay = 400,
  className,
  onComplete,
}: TypewriterHeadingProps) {
  const [visibleLength, setVisibleLength] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout = 0;
    let interval = 0;

    timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setVisibleLength((current) => {
          if (current >= text.length) {
            window.clearInterval(interval);
            setIsComplete(true);
            onComplete?.();
            return current;
          }

          return current + 1;
        });
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [delay, onComplete, speed, text]);

  const typedText = useMemo(() => text.slice(0, visibleLength), [text, visibleLength]);

  return (
    <h1 className={className}>
      {renderStyledText(typedText)}
      <span className={isComplete ? "typewriter-cursor is-complete" : "typewriter-cursor"} />
    </h1>
  );
}
