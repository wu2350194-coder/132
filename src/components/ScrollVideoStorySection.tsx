import { ArrowDown, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { siteInfo } from "../data/siteData";
import FinalRevealSection from "./FinalRevealSection";
import FixedRevealCards from "./FixedRevealCards";
import ParticlesCanvas from "./ParticlesCanvas";
import "./ScrollVideoStorySection.css";

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

type UiState = {
  heroOpacity: number;
  cardOpacity: number;
  cardReveal: number;
  finalReveal: number;
};

const initialUi: UiState = {
  heroOpacity: 1,
  cardOpacity: 0,
  cardReveal: 0,
  finalReveal: 0,
};

export default function ScrollVideoStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardsTriggerRef = useRef<HTMLDivElement | null>(null);
  const finalTriggerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);
  const durationRef = useRef(0);
  const framesRef = useRef<ImageBitmap[]>([]);
  const framesReadyRef = useRef(false);
  const lastFrameIndexRef = useRef(-1);
  const lastUiRef = useRef<UiState>(initialUi);
  const [ui, setUi] = useState<UiState>(initialUi);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const cardsTrigger = cardsTriggerRef.current;
    const finalTrigger = finalTriggerRef.current;
    if (!section || !canvas || !video || !cardsTrigger || !finalTrigger) return;

    let disposed = false;
    let extractionAborted = false;
    let lastSeekTime = -1;
    let lastSeekAt = 0;
    let fallbackSeeking = false;
    const context = canvas.getContext("2d");
    const minSeekInterval = window.innerWidth < 768 ? 140 : 100;

    const updateUi = (nextUi: UiState) => {
      const lastUi = lastUiRef.current;
      const changed =
        Math.abs(nextUi.heroOpacity - lastUi.heroOpacity) > 0.012 ||
        Math.abs(nextUi.cardOpacity - lastUi.cardOpacity) > 0.012 ||
        Math.abs(nextUi.cardReveal - lastUi.cardReveal) > 0.012 ||
        Math.abs(nextUi.finalReveal - lastUi.finalReveal) > 0.012;

      if (changed) {
        lastUiRef.current = nextUi;
        setUi(nextUi);
      }
    };

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width * pixelRatio));
      const nextHeight = Math.max(1, Math.round(rect.height * pixelRatio));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        lastFrameIndexRef.current = -1;
      }
    };

    const drawFrame = (frame: ImageBitmap) => {
      if (!context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const scale = Math.max(canvasWidth / frame.width, canvasHeight / frame.height);
      const drawWidth = frame.width * scale;
      const drawHeight = frame.height * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(frame, (canvasWidth - drawWidth) / 2, (canvasHeight - drawHeight) / 2, drawWidth, drawHeight);
    };

    const render = () => {
      rafRef.current = 0;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY < sectionTop - viewportHeight || scrollY > sectionBottom + viewportHeight) return;

      const start = sectionTop + viewportHeight * 0.5;
      const end = sectionBottom - viewportHeight;
      const progress = clamp((scrollY - start) / Math.max(1, end - start));

      const heroOpacity = clamp(1 - (scrollY - sectionTop) / (viewportHeight * 0.3));
      const triggerTop = sectionTop + cardsTrigger.offsetTop;
      const triggerHeight = cardsTrigger.offsetHeight;
      const cardsStart = triggerTop - viewportHeight * 0.5;
      const cardsEnd = triggerTop + triggerHeight - viewportHeight * 0.3;
      const cardReveal = clamp((scrollY - cardsStart) / Math.max(1, cardsEnd - cardsStart));
      const isCardsActive =
        scrollY >= cardsStart - viewportHeight * 0.2 &&
        scrollY <= cardsEnd + viewportHeight * 0.3;
      const fadeIn = clamp((scrollY - (cardsStart - viewportHeight * 0.2)) / (viewportHeight * 0.2));
      const fadeOut = clamp((cardsEnd + viewportHeight * 0.3 - scrollY) / (viewportHeight * 0.3));
      const cardOpacity = isCardsActive ? Math.min(fadeIn, fadeOut) : 0;
      const finalTop = sectionTop + finalTrigger.offsetTop;
      const finalReveal = clamp((scrollY - (finalTop - viewportHeight * 0.85)) / (viewportHeight * 0.5));

      updateUi({ heroOpacity, cardOpacity, cardReveal, finalReveal });

      if (framesReadyRef.current && framesRef.current.length > 0) {
        const frameIndex = Math.round(progress * (framesRef.current.length - 1));
        if (frameIndex !== lastFrameIndexRef.current) {
          lastFrameIndexRef.current = frameIndex;
          const frame = framesRef.current[frameIndex];
          if (frame) drawFrame(frame);
        }
      } else if (durationRef.current > 0 && video.readyState >= 1) {
        const targetTime = progress * Math.max(0.01, durationRef.current - 0.05);
        const now = performance.now();
        if (!fallbackSeeking && now - lastSeekAt >= minSeekInterval && Math.abs(targetTime - lastSeekTime) > 0.075) {
          lastSeekAt = now;
          lastSeekTime = targetTime;
          fallbackSeeking = true;
          try {
            video.currentTime = targetTime;
          } catch {
            fallbackSeeking = false;
            // The next scroll frame retries if the browser is briefly busy decoding.
          }
        }
      }
    };

    const scheduleRender = () => {
      if (rafRef.current || disposed) return;
      rafRef.current = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      resizeCanvas();
      scheduleRender();
    };

    const handleMetadata = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      video.pause();
      scheduleRender();
    };

    const handleLoadedData = () => {
      scheduleRender();
    };

    const handleSeeked = () => {
      fallbackSeeking = false;
    };

    const extractFrames = async () => {
      if (!context) return;

      try {
        const response = await fetch(siteInfo.worksScrollVideo);
        const blob = await response.blob();
        if (extractionAborted || disposed) return;

        const objectUrl = URL.createObjectURL(blob);
        const extractor = document.createElement("video");
        extractor.muted = true;
        extractor.playsInline = true;
        extractor.preload = "auto";
        extractor.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          extractor.onloadedmetadata = () => resolve();
          extractor.onerror = () => reject(new Error("Video metadata failed"));
          window.setTimeout(() => reject(new Error("Video metadata timeout")), 12000);
        });

        const targetFrameWidth = Math.min(
          extractor.videoWidth,
          Math.max(1600, Math.round(window.innerWidth * Math.min(window.devicePixelRatio || 1, 1.5)))
        );
        const scale = Math.min(1, targetFrameWidth / Math.max(1, extractor.videoWidth));
        const scaledWidth = Math.max(1, Math.round(extractor.videoWidth * scale));
        const scaledHeight = Math.max(1, Math.round(extractor.videoHeight * scale));
        const frameCount = Math.max(32, Math.min(72, Math.round(extractor.duration * 14)));
        const nextFrames: ImageBitmap[] = [];

        for (let index = 0; index < frameCount; index += 1) {
          if (extractionAborted || disposed) break;

          const time = (index / Math.max(1, frameCount - 1)) * Math.max(0.01, extractor.duration - 0.05);
          extractor.currentTime = time;

          await new Promise<void>((resolve, reject) => {
            const timeout = window.setTimeout(() => {
              extractor.removeEventListener("seeked", onSeeked);
              reject(new Error("Frame seek timeout"));
            }, 2400);

            const onSeeked = () => {
              window.clearTimeout(timeout);
              extractor.removeEventListener("seeked", onSeeked);
              resolve();
            };

            extractor.addEventListener("seeked", onSeeked);
          });

          const bitmap = await createImageBitmap(extractor, {
            resizeWidth: scaledWidth,
            resizeHeight: scaledHeight,
          });
          nextFrames.push(bitmap);
        }

        if (!extractionAborted && !disposed && nextFrames.length > 0) {
          framesRef.current.forEach((frame) => frame.close());
          framesRef.current = nextFrames;
          framesReadyRef.current = true;
          canvas.style.visibility = "visible";
          video.style.display = "none";
          scheduleRender();
        }

        URL.revokeObjectURL(objectUrl);
      } catch {
        framesReadyRef.current = false;
        canvas.style.visibility = "hidden";
        video.style.display = "block";
      }
    };

    video.src = siteInfo.worksScrollVideo;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    canvas.style.visibility = "hidden";
    video.style.display = "block";
    resizeCanvas();
    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("stalled", handleSeeked);
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", handleResize);
    void extractFrames();
    scheduleRender();

    return () => {
      disposed = true;
      extractionAborted = true;
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      framesRef.current.forEach((frame) => frame.close());
      framesRef.current = [];
      framesReadyRef.current = false;
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("stalled", handleSeeked);
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const heroLift = (1 - ui.heroOpacity) * -36;

  return (
    <section className="scroll-story-section" id="portfolio-story" ref={sectionRef}>
      <div className="scroll-story-sticky">
        <div className="scroll-video-container">
          <canvas className="scroll-video-canvas" ref={canvasRef} aria-hidden="true" />
          <video
            className="scroll-video-fallback"
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="scroll-video-overlay" />
        </div>

        <ParticlesCanvas />

        <div
          className="scroll-story-hero"
          style={
            {
              opacity: ui.heroOpacity,
              transform: `translate3d(0, ${heroLift}px, 0)`,
            } as CSSProperties
          }
        >
          <p className="scroll-story-eyebrow">Portfolio Purpose:</p>
          <h2>
            Turn AI ideas into
            <br />
            <span>visual stories</span>
            <br />
            for digital growth.
          </h2>
          <p className="scroll-story-copy">
            网络与新媒体专业学生，专注 AI 内容生产、短视频策划、UI 设计、数据新闻与文化传播表达。
          </p>
          <div className="scroll-story-actions">
            <div className="scroll-story-code">
              <span>&gt;</span> AI · Media · Culture
            </div>
            <a className="scroll-story-cta" href="#works">
              View Works
              <ArrowRight size={17} />
            </a>
          </div>
        </div>

        <div className="scroll-story-arrow" style={{ opacity: ui.heroOpacity } as CSSProperties}>
          <ArrowDown size={24} />
        </div>

        <FixedRevealCards opacity={ui.cardOpacity} reveal={ui.cardReveal} />
        <FinalRevealSection progress={ui.finalReveal} />
      </div>

      <div className="scroll-story-stage scroll-story-stage-hero" aria-hidden="true" />
      <div className="scroll-story-spacer scroll-story-spacer-one" aria-hidden="true" />
      <div className="scroll-story-trigger" ref={cardsTriggerRef} aria-hidden="true" />
      <div className="scroll-story-spacer scroll-story-spacer-two" aria-hidden="true" />
      <div className="scroll-story-final-trigger" ref={finalTriggerRef} aria-hidden="true" />
    </section>
  );
}
