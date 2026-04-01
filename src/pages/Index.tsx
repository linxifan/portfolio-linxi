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
      <main className="ml-16 md:ml-20 flex justify-center">
        <div
          className="w-full max-w-4xl min-h-screen"
          style={{
            background: "hsl(var(--card) / 0.45)",
            backdropFilter: "blur(24px)",
            borderLeft: "1px solid hsl(var(--border) / 0.3)",
            borderRight: "1px solid hsl(var(--border) / 0.3)",
            boxShadow: "0 0 80px hsl(0 0% 0% / 0.3)",
          }}
        >
          <ProfileSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <AwardsSection />
          <HobbySection />
        </div>
      </main>
    </div>
  );
};

export default Index;
