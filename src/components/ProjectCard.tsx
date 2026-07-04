import { ArrowUpRight, Images } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import type { ProjectItem } from "../types/portfolio";

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  total: number;
  onOpen: (project: ProjectItem) => void;
  onPreview: (project: ProjectItem, index: number) => void;
};

const isVideoMedia = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src.split("?")[0]);

function ProjectMedia({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  if (isVideoMedia(src)) {
    return (
      <video
        className={className}
        src={src}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  return <img className={className} src={src} alt={alt} loading={eager ? "eager" : "lazy"} />;
}

export default function ProjectCard({ project, index, total, onOpen, onPreview }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mediaItems = project.images.filter(Boolean);
  const [featuredMedia, ...supportingMedia] = mediaItems;
  const isLandscapeShowcase = project.number === "01";
  const isPortraitShowcase = project.number === "03";
  const isDataNewsShowcase = project.number === "03.B";
  const visibleLandscapeMedia = mediaItems.slice(0, 4);
  const visibleSupportingMedia = supportingMedia.slice(0, isLandscapeShowcase ? 4 : 2);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const projectTags = useMemo(() => {
    const tags = project.category
      .split("/")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return tags.length > 0 ? tags.slice(0, 3) : ["Portfolio", "Case Study"];
  }, [project.category]);

  return (
    <div className="project-stack" ref={ref}>
      <motion.article
        className={[
          "project-card",
          isLandscapeShowcase ? "project-card-landscape" : "",
          isPortraitShowcase ? "project-card-portrait" : "",
          isDataNewsShowcase ? "project-card-data-news" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        layoutId={`project-card-${project.number}`}
        style={{ scale, top: `calc(82px + ${index * 24}px)` }}
      >
        <div className="project-card-copy">
          <div className="project-card-meta">
            <span className="project-number">{project.number}</span>
            <span className="project-category">{project.category}</span>
          </div>

          <div className="project-card-body">
            <div className="project-tags" aria-label={`${project.title} tags`}>
              {projectTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>

          <div className="project-card-actions">
            <a
              className="outline-button outline-button-dark"
              href={`#project-${project.number}`}
              onClick={(event) => {
                event.preventDefault();
                onOpen(project);
              }}
            >
              View Details
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>
            {project.link ? (
              <a className="project-link-chip" href={project.link} target="_blank" rel="noreferrer">
                {project.linkLabel ?? "Open Link"}
              </a>
            ) : null}
          </div>
        </div>

        {isLandscapeShowcase && visibleLandscapeMedia.length > 0 ? (
          <div className="project-video-matrix" aria-label={`${project.title} video gallery`}>
            {visibleLandscapeMedia.map((media, mediaIndex) => (
              <button
                type="button"
                className={isVideoMedia(media) ? "project-image-shell project-video-shell" : "project-image-shell"}
                key={media}
                onClick={() => onPreview(project, mediaIndex)}
                aria-label={`Open ${project.title} media ${mediaIndex + 1}`}
              >
                <ProjectMedia
                  src={media}
                  alt={`${project.title} visual ${mediaIndex + 1}`}
                  eager={index === 0 && mediaIndex === 0}
                />
              </button>
            ))}
          </div>
        ) : featuredMedia ? (
          <div
            className={`project-image-grid project-image-count-${Math.min(mediaItems.length, 5)}${
              isLandscapeShowcase ? " project-image-grid-landscape" : ""
            }${isPortraitShowcase ? " project-image-grid-portrait" : ""}${
              isDataNewsShowcase ? " project-image-grid-data-news" : ""
            }`}
          >
            <button
              className="project-image-shell project-image-shell-featured"
              type="button"
              onClick={() => onPreview(project, 0)}
              aria-label={`Open ${project.title} media 1`}
            >
              <ProjectMedia
                className="project-image-tall"
                src={featuredMedia}
                alt={`${project.title} visual 1`}
                eager={index === 0}
              />
            </button>
            {supportingMedia.length > 0 ? (
              <div className="project-image-column">
                {visibleSupportingMedia.map((media, mediaIndex) => (
                  <button
                    type="button"
                    className={isVideoMedia(media) ? "project-image-shell project-video-shell" : "project-image-shell"}
                    key={media}
                    onClick={() => onPreview(project, mediaIndex + 1)}
                    aria-label={`Open ${project.title} media ${mediaIndex + 2}`}
                  >
                    <ProjectMedia src={media} alt={`${project.title} visual ${mediaIndex + 2}`} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="project-image-empty">
            <Images size={28} strokeWidth={1.7} />
            <span>作品图片待添加</span>
          </div>
        )}
      </motion.article>
    </div>
  );
}
