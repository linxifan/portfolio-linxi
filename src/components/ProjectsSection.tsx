import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tagline: string;
  tech: string[];
  image: string;
  color: string;
  details?: string;
  videoUrl?: string;
}

const projects: Project[] = [
  {
    title: "Quantum Neural Link",
    description: "A revolutionary brain-computer interface protocol that synchronizes human thought patterns with quantum computing architectures.",
    tagline: "Bridging the gap between neurons and qubits.",
    tech: ["Python", "Rust", "C++"],
    image: `${import.meta.env.BASE_URL}robot-project.png`,
    color: "#ff7eb3",
    details: "The Quantum Neural Link project explores the frontier of neural-silicon integration. By leveraging quantum entanglement principles, we've developed a non-invasive telemetry system capable of mapping sub-millisecond neural fluctuations into a high-dimensional quantum state space. This allows for unprecedented data throughput between biological and synthetic processors.",
  },
  {
    title: "Elysium UI Kit",
    description: "A design system built for the next generation of spatial computing interfaces, focusing on organic glassmorphism and depth.",
    tagline: "Design that breathes and reacts.",
    tech: ["React", "Three.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    color: "#7afcff",
    details: "Elysium is not just a UI kit; it's a philosophy of interaction. Designed specifically for mixed-reality environments, it utilizes ray-marching shaders to create glass surfaces that refract light based on the user's focal point. Every component is physically based, reacting to virtual wind and gravity to create an interface that feels alive.",
  },
  {
    title: "Nebula OS",
    description: "The first decentralized operating system designed to run entirely on distributed mesh networks without central authorities.",
    tagline: "The internet, reimagined as an OS.",
    tech: ["Go", "K8s", "Wasm"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    color: "#feffb7",
    details: "Nebula OS treats the global network as a single multicore computer. By utilizing WebAssembly for sandboxing and a novel P2P gossip protocol for state synchronization, it allows applications to run without servers. User data is fragmented, encrypted, and stored across the mesh, ensuring total privacy and censorship resistance.",
  },
  {
    title: "Aura Analytics",
    description: "Predictive emotional intelligence platform for remote teams, visualizing team synergy through real-time biometric feedback.",
    tagline: "Feel the pulse of your remote team.",
    tech: ["TypeScript", "PyTorch", "GraphQL"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    color: "#95e1d3",
    details: "Aura uses multimodal AI to analyze team dynamics beyond just Slack messages. By integrating optional biometric data (heart rate variability, sleep patterns) and natural language processing, it provides managers with a 'Team Resonance' score, highlighting burnout risks before they manifest and suggesting optimal collaboration windows.",
  },
];

function ProjectFrame({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div 
      className="flex-shrink-0 w-[400px] h-[300px] mx-4 relative group cursor-pointer overflow-hidden border-x-[12px] border-[#121212]"
      onClick={onClick}
    >
      {/* Film Perforations (Top) */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[#1A1A1A] flex justify-around items-center px-4 z-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-4 h-5 bg-[#0D0D0D] rounded-sm shadow-inner" />
        ))}
      </div>

      {/* Film Content Container */}
      <div className="absolute inset-0 py-8 bg-[#1A1A1A]">
        <div className="w-full h-full relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
          
          {/* Edge Markings */}
          <div className="absolute top-10 left-2 text-[8px] font-mono text-red-500/60 font-bold uppercase tracking-widest z-30 pointer-events-none">
            KODAK 400
          </div>
          <div className="absolute bottom-10 right-2 text-[8px] font-mono text-yellow-500/60 font-bold uppercase tracking-widest z-30 pointer-events-none">
            24A • {project.title.substring(0, 3)}
          </div>

          <div className="absolute bottom-0 left-0 p-6 z-20">
            <h3 className="text-xl font-serif italic text-white mb-1">{project.title}</h3>
            <p className="text-[10px] text-white/60 uppercase tracking-widest">{project.tagline}</p>
          </div>
        </div>
      </div>

      {/* Film Perforations (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-[#1A1A1A] flex justify-around items-center px-4 z-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-4 h-5 bg-[#0D0D0D] rounded-sm shadow-inner" />
        ))}
      </div>

      {/* Grainy Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Clone projects for seamless marquee
  const doubledProjects = [...projects, ...projects];

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-black/20 backdrop-blur-3xl">
      <div className="px-12 md:px-20 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Chapter 03</span>
          <h2 className="text-6xl md:text-8xl font-serif italic mb-4 leading-[0.9] tracking-tighter">
            Curated <br />
            <span className="title-transparent">Manifesto</span>
          </h2>
          <p className="text-muted-foreground tracking-[0.4em] uppercase text-[10px] md:text-xs">
            A deep dive into digital craftsmanship & problem solving
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        className="flex py-12 relative overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex whitespace-nowrap marquee-track"
          style={{ 
            animationPlayState: isPaused ? 'paused' : 'running',
            animation: 'marquee 40s linear infinite'
          }}
        >
          {doubledProjects.map((project, i) => (
            <ProjectFrame 
              key={`${project.title}-${i}`} 
              project={project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              layoutId={`project-${selectedProject.title}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors z-50 group"
              >
                <X className="w-5 h-5 text-white/60 group-hover:text-white" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent md:bg-gradient-to-r" />
                </div>
                
                <div className="p-8 md:p-12">
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
                    {selectedProject.tagline}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif italic mb-6">{selectedProject.title}</h3>
                  
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {selectedProject.details || selectedProject.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-4">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="text-[10px] px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-8">
                      <button className="px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                        Launch Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decor */}
              <div 
                className="absolute -bottom-20 -right-20 w-64 h-64 blur-[120px] opacity-20 pointer-events-none"
                style={{ background: selectedProject.color }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -10%) }
          20% { transform: translate(-15%, 5%) }
          30% { transform: translate(7%, -25%) }
          40% { transform: translate(-5%, 25%) }
          50% { transform: translate(-15%, 10%) }
          60% { transform: translate(15%, 0%) }
          70% { transform: translate(0%, 15%) }
          80% { transform: translate(3%, 35%) }
          90% { transform: translate(-10%, 10%) }
        }
      `}} />
    </section>
  );
}
