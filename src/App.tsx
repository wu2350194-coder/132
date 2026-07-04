import AboutSection from "./components/AboutSection";
import AwardsSection from "./components/AwardsSection";
import CapabilitiesSection from "./components/CapabilitiesSection";
import ContactSection from "./components/ContactSection";
import CreatorProfileSection from "./components/CreatorProfileSection";
import ExperienceSection from "./components/ExperienceSection";
import MarqueeSection from "./components/MarqueeSection";
import MouseFollower from "./components/MouseFollower";
import PostHeroParticles from "./components/PostHeroParticles";
import ProcessSection from "./components/ProcessSection";
import ProjectsSection from "./components/ProjectsSection";
import SiteInteractions from "./components/SiteInteractions";
import VideoHeroSection from "./components/VideoHeroSection";

export default function App() {
  return (
    <main className="site-shell">
      <MouseFollower />
      <SiteInteractions />
      <VideoHeroSection />
      <PostHeroParticles />
      <MarqueeSection />
      <CreatorProfileSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <ProcessSection />
      <ExperienceSection />
      <AwardsSection />
      <ContactSection />
    </main>
  );
}
