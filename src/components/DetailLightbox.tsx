import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, FileCheck2, Link2, X } from "lucide-react";
import { useEffect } from "react";
import type { DetailRecord } from "../types/portfolio";

type DetailLightboxProps = {
  item: DetailRecord | null;
  onClose: () => void;
  onMediaPreview?: (index: number) => void;
};

const isVideoMedia = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src.split("?")[0]);

function DetailMedia({ src, label }: { src: string; label: string }) {
  if (isVideoMedia(src)) {
    return (
      <video
        src={src}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
      />
    );
  }

  return <img src={src} alt={label} />;
}

export default function DetailLightbox({ item, onClose, onMediaPreview }: DetailLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="detail-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} details`}
        >
          <motion.button
            className="detail-lightbox-backdrop"
            aria-label="Close detail view"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.article
            className={`detail-panel detail-panel-${item.kind}`}
            layoutId={item.layoutId}
            initial={{ borderRadius: 40 }}
            animate={{ borderRadius: 38 }}
            exit={{ borderRadius: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <button className="detail-close-button" type="button" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>

            <motion.div
              className="detail-panel-header"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="detail-panel-number">{item.number}</span>
              <div>
                <p>{item.category}</p>
                <h3>{item.title}</h3>
              </div>
            </motion.div>

            <motion.div
              className="detail-panel-grid"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="detail-panel-copy">
                <p className="detail-description">{item.description}</p>

                {item.details?.length ? (
                  <div className="detail-facts">
                    {item.details.map((detail) => (
                      <div key={`${detail.label}-${detail.value}`}>
                        <span>{detail.label}</span>
                        <strong>{detail.value}</strong>
                      </div>
                    ))}
                  </div>
                ) : null}

                {item.process?.length ? (
                  <div className="detail-process">
                    <p className="detail-section-title">Process Flow</p>
                    {item.process.map((step, index) => (
                      <motion.div
                        className="detail-process-step"
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.08, duration: 0.38 }}
                        key={step}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{step}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="detail-panel-proof">
                {item.images?.length ? (
                  <div className="detail-image-preview">
                    {item.images.slice(0, 3).map((image, index) => (
                      <button
                        className="detail-media-button"
                        type="button"
                        onClick={() => onMediaPreview?.(index)}
                        key={image}
                        aria-label={`Open ${item.title} proof ${index + 1}`}
                      >
                        <DetailMedia src={image} label={`${item.title} proof ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="detail-proof-placeholder">
                    <FileCheck2 size={34} />
                    <span>Proof image / certificate / screenshot</span>
                  </div>
                )}

                {item.outcome ? (
                  <div className="detail-outcome">
                    <span>Outcome</span>
                    <p>{item.outcome}</p>
                  </div>
                ) : null}

                {item.evidence?.length ? (
                  <div className="detail-evidence-list">
                    <p className="detail-section-title">Evidence To Add</p>
                    {item.evidence.map((evidence) => (
                      <span key={evidence}>{evidence}</span>
                    ))}
                  </div>
                ) : null}

                {item.links?.length ? (
                  <div className="detail-link-list">
                    {item.links.map((link) => (
                      <a href={link.href} target="_blank" rel="noreferrer" key={`${link.label}-${link.href}`}>
                        <Link2 size={15} />
                        {link.label}
                        <ExternalLink size={14} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
