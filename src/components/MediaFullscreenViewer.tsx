import { ChevronLeft, ChevronRight, Maximize2, Volume2, VolumeX, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectItem } from "../types/portfolio";

type MediaPreviewState = {
  project: ProjectItem;
  index: number;
} | null;

type MediaFullscreenViewerProps = {
  preview: MediaPreviewState;
  onClose: () => void;
};

const isVideoMedia = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src.split("?")[0]);

export default function MediaFullscreenViewer({ preview, onClose }: MediaFullscreenViewerProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const mediaItems = useMemo(() => preview?.project.images.filter(Boolean) ?? [], [preview]);
  const activeMedia = mediaItems[activeIndex];
  const isVideo = activeMedia ? isVideoMedia(activeMedia) : false;

  useEffect(() => {
    if (!preview) return;
    setActiveIndex(preview.index);
    setMuted(true);
  }, [preview]);

  useEffect(() => {
    if (!preview) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + mediaItems.length) % mediaItems.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % mediaItems.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mediaItems.length, onClose, preview]);

  const goTo = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + mediaItems.length) % mediaItems.length);
  };

  const requestFullscreen = () => {
    void frameRef.current?.requestFullscreen?.();
  };

  return (
    <AnimatePresence>
      {preview && activeMedia ? (
        <motion.div
          className="media-viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.project.title} fullscreen preview`}
        >
          <button className="media-viewer-backdrop" type="button" onClick={onClose} aria-label="Close preview" />

          <motion.div
            className="media-viewer-frame"
            ref={frameRef}
            initial={{ opacity: 0, scale: 0.94, y: 20, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, y: 12, filter: "blur(10px)" }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="media-viewer-topbar">
              <div>
                <span>{preview.project.number}</span>
                <strong>{preview.project.title}</strong>
              </div>
              <div className="media-viewer-controls">
                {isVideo ? (
                  <button type="button" onClick={() => setMuted((value) => !value)}>
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    {muted ? "Muted" : "Sound"}
                  </button>
                ) : null}
                <button type="button" onClick={requestFullscreen}>
                  <Maximize2 size={18} />
                  Fullscreen
                </button>
                <button type="button" onClick={onClose} aria-label="Close preview">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="media-viewer-stage">
              {isVideo ? (
                <video
                  key={activeMedia}
                  src={activeMedia}
                  autoPlay
                  loop
                  playsInline
                  controls
                  muted={muted}
                  preload="metadata"
                />
              ) : (
                <img src={activeMedia} alt={`${preview.project.title} preview ${activeIndex + 1}`} />
              )}
            </div>

            {mediaItems.length > 1 ? (
              <>
                <button
                  className="media-viewer-arrow media-viewer-arrow-left"
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Previous media"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="media-viewer-arrow media-viewer-arrow-right"
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Next media"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            ) : null}

            <div className="media-viewer-footer">
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {String(mediaItems.length).padStart(2, "0")}
              </span>
              <p>Click arrows or use keyboard to review the full project media.</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
