export const siteInfo = {
  name: "CHEN ZE",
  chineseName: "陈泽",
  brand: "C.Z Visual Lab",
  title: "AI Media Creator & Visual Storyteller",
  subtitle: "AI 新媒体内容策划 / 视觉设计 / 文化传播创作者",
  description:
    "网络与新媒体专业本科生，专注 AI 内容生产、短视频策划、UI 设计、数据新闻、历史文化传播、文化 IP 设计、摄影拍摄、PR/AE 后期与数字叙事表达。",
  about:
    "我是陈泽，一名网络与新媒体专业本科生，关注 AI 内容生产、影像表达、视觉设计与文化传播。我擅长将选题策划、脚本写作、摄影摄像、PR/AE 后期、UI 设计和数据新闻表达整合到完整的新媒体项目中。长期关注历史文化、文物、古建筑与城市形象相关议题，具备较扎实的人文素养、文化解读能力和审美积累；希望用 AI 工具和新媒体语言，把复杂的文化内容转化为更适合传播的视觉作品、短视频、IP 设计和数字化内容。",
  email: "3599246953@qq.com",
  phone: "18006670958",
  heroVideo:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4",
  // Temporary scroll video from the reference prototype.
  // Later replace with ancient architecture video:
  // "/videos/ancient-architecture-scroll.mp4"
  scrollVideo: "/videos/second-page-bg.mp4",
  worksScrollVideo: "/videos/works-scroll-bg.mp4",
  sectionVideos: {
    capabilities: "/videos/capabilities-bg.mp4",
    projects: "/videos/works-scroll-bg.mp4",
    process: "/videos/process-bg.mp4",
    experience: "/videos/experience-bg.mp4",
    awards: "/videos/experience-bg.mp4",
    contact: "/videos/process-bg.mp4",
  },
  futureVideoNote: "Later replace this with /videos/ancient-architecture-scroll.mp4",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Works", href: "#works" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const heroKeywords = [
  "AI Video",
  "UI Design",
  "Cultural IP",
  "Data News",
  "Motion Design",
  "Content Planning",
];

export const capabilities = [
  {
    number: "01",
    title: "AI Content Production",
    description:
      "AI 选题拆解、脚本优化、AI 视频工作流、ComfyUI 基础流程、Codex 辅助创作与内容效率提升。",
  },
  {
    number: "02",
    title: "Video & Motion Design",
    description:
      "摄影拍摄、非遗纪录片拍摄、短视频脚本、PR 剪辑、AE 基础动效、字幕包装、发布复盘。",
  },
  {
    number: "03",
    title: "Visual & UI Design",
    description:
      "小程序页面、个人网站、UI 界面、视觉规范、Canva 设计、文化 IP 视觉延展与城市形象表达。",
  },
  {
    number: "04",
    title: "Cultural Storytelling",
    description:
      "历史文化、文物、古建筑、非遗影像、城市形象议题转译，适合文旅、校园、城市传播内容。",
  },
  {
    number: "05",
    title: "Business & New Media Operation",
    description:
      "跨境电商方案、产品卖点提炼、用户分析、内容传播、账号运营复盘、外贸资料整理。",
  },
];

// Projects support optional portfolio fields:
// link, linkLabel, evidence, outcome, process
export const projects = [
  {
    number: "01",
    title: "AI 新媒体内容与视频创作",
    category: "AI Content / Video Production",
    description:
      "使用 Codex、ComfyUI 与 AI 视频工具进行选题拆解、脚本创作、分镜设计、视频制作与发布复盘，形成从内容策略到影像落地的完整流程。",
    images: [
      "/videos/ai-video-showcase.mp4",
      "/videos/ai-newmedia-main-02.mp4",
      "/videos/ai-newmedia-main-03.mp4",
      "/videos/ai-newmedia-main-04.mp4",
    ],
  },
  {
    number: "01.B",
    title: "AI 新媒体内容与视频创作 · 扩展",
    category: "AI Video / Motion Showcase",
    description:
      "延展 AI 视频创作展示页，用于收纳更多动态影像作品，可持续补充不同风格的 AI 视频、短片实验、视觉叙事与发布素材。",
    images: [
      "/videos/ai-newmedia-extension-01.mp4",
      "/videos/ai-newmedia-extension-02.mp4",
      "/videos/ai-newmedia-extension-03.mp4",
    ],
  },
  {
    number: "02",
    title: "文物与城市形象 IP 设计项目",
    category: "Cultural IP / Visual Design",
    description:
      "围绕文物主题和城市形象进行调研梳理、视觉元素提炼、角色符号延展与传播应用设计，探索历史文化内容的新媒体表达。",
    images: [
      "/images/project-02-a.svg",
      "/images/project-02-b.svg",
      "/images/project-02-c.svg",
    ],
  },
  {
    number: "03",
    title: "小程序与 UI 设计 / 数据新闻作品",
    category: "UI Design / Data Storytelling",
    description:
      "完成小程序页面设计、信息架构、基础交互、数据新闻写作、资料收集、数据分析与可视化表达，曾获得数据新闻相关奖项。",
    images: [
      "/images/ui-design-hbn-ai-skin.png",
      "/images/ui-design-hbn-product.png",
      "/images/ui-design-hbn-login.png",
    ],
  },
  {
    number: "03.B",
    title: "数据新闻可视化作品",
    category: "Data Journalism / Interactive Report",
    description:
      "围绕文物失踪、盗墓犯罪与文化遗产保护议题进行资料整理、数据提炼、视觉叙事和 H5 首屏视觉设计，强化数据新闻的情绪氛围、信息层级与传播记忆点。",
    images: ["/images/data-news-underground-current.png"],
  },
  {
    number: "04",
    title: "跨境电商商业方案",
    category: "E-commerce / Business Plan",
    description:
      "围绕跨境电商项目进行产品定位、用户分析、内容传播、渠道设计和运营转化路径设计，形成成熟商业方案并获得挑战杯项目金奖。",
    images: [
      "/images/project-04-a.svg",
      "/images/project-04-b.svg",
      "/images/project-04-c.svg",
    ],
  },
  {
    number: "05",
    title: "AI 转译古建筑研究",
    category: "Research / Cultural Communication",
    description:
      "围绕 AI 转译古建筑、文化传播、城市 IP 和数字文旅表达进行研究与视觉化探索，相关论文发表于《人文与社会科学学刊》。",
    images: [
      "/videos/architecture-translation-01.mp4",
      "/videos/architecture-translation-02.mp4",
      "/videos/architecture-translation-03.mp4",
    ],
  },
];

export const experiences = [
  {
    time: "2025.09 - Present",
    title: "AI 新媒体内容与视频创作",
    role: "策划 / 制作",
    description:
      "围绕 AI 视频、短视频脚本、PR/AE 后期与账号内容复盘进行内容生产。",
  },
  {
    time: "2025.03 - 2025.07",
    title: "文物与城市形象 IP 设计项目",
    role: "视觉 / IP 设计",
    description:
      "参与文化符号提炼、视觉元素延展、传播场景构思与城市形象表达。",
  },
  {
    time: "2024.10 - 2025.01",
    title: "小程序与 UI 设计 / 数据新闻作品",
    role: "UI / 数据表达",
    description:
      "完成页面设计、信息架构、数据新闻写作与可视化表达。",
  },
  {
    time: "2024.07 - 2024.09",
    title: "洪亚商贸公司",
    role: "外贸 / 跨境电商实习",
    description:
      "协助整理产品资料、商品卖点和基础文案，参与客户需求、订单信息和产品资料整理。",
  },
  {
    time: "2025.07 - 2025.09",
    title: "潮人针织厂",
    role: "外贸业务 / 跟单实习",
    description:
      "了解针织服装外贸流程，参与样品、款式、面料、尺码等产品资料整理与跟进。",
  },
  {
    time: "Project",
    title: "非遗纪录片拍摄",
    role: "摄影 / 文化传播",
    description:
      "参与非遗纪录片拍摄，具备历史文化与非遗主题影像传播的实操经历。",
  },
];

// Awards can stay as simple strings, or be upgraded to objects:
// { number, title, category, description, year, link, linkLabel, evidence, outcome }
export const awards = [
  "中国大学生“挑战杯”竞赛跨境电商项目金奖",
  "大学生创新创业训练计划项目国家级立项",
  "数据新闻作品获奖",
  "校园奖学金",
  "优秀学生干部",
  "全国计算机等级考试二级证书",
  "AI 转译古建筑相关论文发表于《人文与社会科学学刊》",
];

export const marqueeItems = [
  { title: "AI Character Visual 011", image: "/images/carousel-case-011.jpg" },
  { title: "AI Character Visual 158", image: "/images/carousel-case-158.png" },
  { title: "AI Character Visual 180", image: "/images/carousel-case-180.png" },
  { title: "AI Character Visual 045", image: "/images/carousel-case-045.png" },
  { title: "AI Character Visual 048", image: "/images/carousel-case-048.png" },
  { title: "AI Character Visual 067", image: "/images/carousel-case-067.png" },
  { title: "AI Character Visual 074", image: "/images/carousel-case-074.png" },
  { title: "AI Character Visual 012", image: "/images/carousel-case-012.jpg" },
  { title: "AI Character Visual 056", image: "/images/carousel-case-056.png" },
  { title: "AI Character Visual 072", image: "/images/carousel-case-072.png" },
  { title: "AI Character Visual 018", image: "/images/carousel-case-018.png" },
  { title: "AI Character Visual 066", image: "/images/carousel-case-066.png" },
  { title: "AI Character Visual 076", image: "/images/carousel-case-076.png" },
];

export const profileStats = [
  { value: "AI + Culture", label: "内容方向" },
  { value: "PR / AE", label: "影像后期" },
  { value: "UI / Web", label: "设计开发" },
  { value: "Data News", label: "数据叙事" },
];

export const processSteps = [
  {
    number: "01",
    title: "Cultural Research",
    description:
      "从历史文化、文物、古建筑、非遗与城市形象中提炼内容母题，建立清晰的文化叙事角度。",
  },
  {
    number: "02",
    title: "AI Workflow",
    description:
      "使用 Codex、ComfyUI 与 AI 视频工具进行选题拆解、脚本优化、分镜构思和视觉风格探索。",
  },
  {
    number: "03",
    title: "Shoot & Edit",
    description:
      "完成摄影拍摄、纪录片素材采集、PR 剪辑、AE 基础动效、字幕包装与节奏控制。",
  },
  {
    number: "04",
    title: "Design & Publish",
    description:
      "将内容落地为 UI 页面、个人网站、短视频、数据新闻、IP 视觉和跨平台传播素材。",
  },
];

export const heroOrbitAssets = [
  {
    title: "AI Video",
    image: "/assets/voxel-ai-badge.png",
    orbit: 3,
    angle: 125,
    radius: 320,
    size: 82,
  },
  {
    title: "UI Design",
    image: "/assets/voxel-ui-badge.png",
    orbit: 3,
    angle: 25,
    radius: 320,
    size: 82,
  },
  {
    title: "Camera",
    image: "/assets/voxel-camera.png",
    orbit: 2,
    angle: 50,
    radius: 250,
    size: 88,
  },
  {
    title: "Plant",
    image: "/assets/voxel-plant.png",
    orbit: 2,
    angle: 180,
    radius: 250,
    size: 78,
  },
  {
    title: "Clapperboard",
    image: "/assets/voxel-clapperboard.png",
    orbit: 2,
    angle: 305,
    radius: 250,
    size: 92,
  },
  {
    title: "Laptop",
    image: "/assets/voxel-laptop.png",
    orbit: 1,
    angle: 270,
    radius: 170,
    size: 86,
  },
  {
    title: "Dashboard",
    image: "/assets/voxel-dashboard.png",
    orbit: 4,
    angle: 215,
    radius: 390,
    size: 110,
  },
  {
    title: "Speech Bubble",
    image: "/assets/voxel-speech-bubble.png",
    orbit: 4,
    angle: 315,
    radius: 390,
    size: 110,
  },
  {
    title: "C.Z Logo",
    image: "/assets/voxel-cz-logo.png",
    orbit: 4,
    angle: 85,
    radius: 390,
    size: 110,
  },
];

export const heroTickerItems = [
  "AI Video",
  "Content Planning",
  "UI Design",
  "Data Journalism",
  "Cultural IP",
  "Motion Design",
  "Photography",
  "PR Editing",
  "AE Motion",
  "ComfyUI",
  "Codex",
  "New Media Operation",
];
