import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tagline: string;
  tech: string[];
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    title: "Quantum Neural Link",
    description: "A revolutionary brain-computer interface protocol that synchronization human thought patterns with quantum computing architectures.",
    tagline: "Bridging the gap between neurons and qubits.",
    tech: ["Python", "Rust", "C++"],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    color: "#ff7eb3",
  },
  {
    title: "Elysium UI Kit",
    description: "A design system built for the next generation of spatial computing interfaces, focusing on organic glassmorphism and depth.",
    tagline: "Design that breathes and reacts.",
    tech: ["React", "Three.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    color: "#7afcff",
  },
  {
    title: "Nebula OS",
    description: "The first decentralized operating system designed to run entirely on distributed mesh networks without central authorities.",
    tagline: "The internet, reimagined as an OS.",
    tech: ["Go", "K8s", "Wasm"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    color: "#feffb7",
  },
  {
    title: "Aura Analytics",
    description: "Predictive emotional intelligence platform for remote teams, visualizing team synergy through real-time biometric feedback.",
    tagline: "Feel the pulse of your remote team.",
    tech: ["TypeScript", "PyTorch", "GraphQL"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    color: "#95e1d3",
  },
];

function ProjectCard({ project, scrollYProgress, index }: { project: Project; scrollYProgress: any; index: number }) {
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-300%"]);
  
  return (
    <motion.div
      style={{ x, willChange: "transform" }}
      className="flex-shrink-0 w-[85vw] md:w-[45vw] h-[60vh] relative group cursor-pointer"
    >
      <div className="absolute inset-0 glass-card overflow-hidden translate-z-0">
        {/* Parallax Image Overlay */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 origin-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">
              {project.tagline}
            </span>
            <h3 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">{project.title}</h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-[10px] px-3 py-1 rounded-full border border-white/10 glass-panel">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Corner Decor */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 pointer-events-none"
          style={{ background: project.color }}
        />
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="projects" ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen flex flex-col items-start justify-start overflow-hidden pt-32 pb-20 px-12 md:px-20">
        <div className="mb-16 relative z-10">
          <h2 className="text-7xl md:text-9xl font-serif italic mb-4 leading-[0.9] tracking-tighter">
            Curated <br />
            <span className="title-transparent">Manifesto</span>
          </h2>
          <p className="text-muted-foreground tracking-[0.4em] uppercase text-[10px] md:text-xs">
            A deep dive into digital craftsmanship & problem solving
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-12 w-full relative z-0">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              scrollYProgress={scrollYProgress}
              index={i}
            />
          ))}
          
          {/* Ending Spacer */}
          <div className="flex-shrink-0 w-[50vw]" />
        </div>

        {/* Progress Bar */}
        <div className="mt-auto w-full max-w-md h-[1px] bg-white/5 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>
      </div>
    </section>
  );
}
