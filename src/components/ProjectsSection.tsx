import { useMemo, useState } from "react";
import { projects } from "../data/siteData";
import type { DetailRecord, ProjectItem } from "../types/portfolio";
import DetailLightbox from "./DetailLightbox";
import FadeIn from "./FadeIn";
import MediaFullscreenViewer from "./MediaFullscreenViewer";
import ProjectCard from "./ProjectCard";
import ScrollVideoStorySection from "./ScrollVideoStorySection";

function createProjectDetail(project: ProjectItem): DetailRecord {
  return {
    kind: "project",
    number: project.number,
    title: project.title,
    category: project.category,
    description: project.description,
    images: project.images,
    layoutId: `project-card-${project.number}`,
    outcome: project.outcome ?? "可在此补充项目成果、播放量、阅读量、获奖结果、页面数量或路演反馈。",
    process: project.process ?? [
      "Project brief: 补充项目背景、目标用户和核心问题。",
      "Research: 放入调研资料、关键词、竞品或文化素材来源。",
      "Creation: 展示脚本、分镜、UI 迭代、拍摄或设计过程。",
      "Outcome: 补充链接、数据指标、证书截图或最终交付物。",
    ],
    evidence: project.evidence ?? [
      "作品链接 / 视频链接",
      "过程截图 / 设计稿",
      "证书 / 发表证明",
      "数据指标 / 复盘结论",
    ],
    links: project.link
      ? [
          {
            label: project.linkLabel ?? "Open project link",
            href: project.link,
          },
        ]
      : [],
    details: [
      { label: "Case No.", value: project.number },
      { label: "Category", value: project.category },
      { label: "Proof Slots", value: `${project.images.length} image slots` },
    ],
  };
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [mediaPreview, setMediaPreview] = useState<{ project: ProjectItem; index: number } | null>(null);
  const detail = useMemo(
    () => (selectedProject ? createProjectDetail(selectedProject) : null),
    [selectedProject],
  );

  return (
    <>
      <ScrollVideoStorySection />
      <section className="projects-section" id="works">
        <FadeIn>
          <h2>Selected Works</h2>
        </FadeIn>
        <div className="projects-list">
          {(projects as ProjectItem[]).map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              total={projects.length}
              onOpen={setSelectedProject}
              onPreview={(project, mediaIndex) => setMediaPreview({ project, index: mediaIndex })}
            />
          ))}
        </div>
      </section>
      <DetailLightbox
        item={detail}
        onClose={() => setSelectedProject(null)}
        onMediaPreview={(mediaIndex) => {
          if (selectedProject) setMediaPreview({ project: selectedProject, index: mediaIndex });
        }}
      />
      <MediaFullscreenViewer preview={mediaPreview} onClose={() => setMediaPreview(null)} />
    </>
  );
}
