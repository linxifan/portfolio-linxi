import ParticleBackground from "@/components/ParticleBackground";
import Sidebar from "@/components/Sidebar";
import ProfileSection from "@/components/ProfileSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AwardsSection from "@/components/AwardsSection";
import HobbySection from "@/components/HobbySection";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Sidebar />
      <main className="ml-16 md:ml-20">
        <ProfileSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsSection />
        <HobbySection />
      </main>
    </div>
  );
};

export default Index;
