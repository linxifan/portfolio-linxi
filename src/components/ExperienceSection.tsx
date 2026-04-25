import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  tagline: string;
  description: string;
  points: string[];
  year: string;
  skills: string[];
  orbitRadius: number;
  orbitDuration: number;
  size: number;
  color: string;
  hasRing?: boolean;
  texture?: string;
  comingSoon?: boolean;
}

const experiences: Experience[] = [
  {
    id: "a", title: "Software Engineer", company: "Transnode AI, LLC", location: "Remote",
    year: "2026 Feb - Pres",
    tagline: "Building and scaling high-performance, user-focused applications from zero to real users.",
    description: "Building and scaling high-performance, user-focused applications with modern full-stack technologies，Developing and scaling performant cross-platform applications from zero to real users.",
    points: [
      "Led the design and development of Earnie (iOS app) using TypeScript-based architecture, taking ownership of core product implementation and feature delivery from early development to launch.",
      "Shipped Earnie to production with 500+ organic users in the first week of launch, driving initial product traction through rapid iteration and feature stabilization.",
      "Designed and developed a responsive interactive landing page using React 18 and Tailwind CSS, implementing motion-based UI interactions with Framer Motion to create a modern, engaging user experience."
    ],
    skills: ["React", "TypeScript", "Expo", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    orbitRadius: 180, orbitDuration: 30, size: 90, color: "#ff7eb3",
    hasRing: true, texture: "linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)"
  },
  {
    id: "b", title: "AI-Augmented Software Engineer", company: "YAOTU TECHNOLOGIES, LLC", location: "Remote",
    year: "2026 Apr - Pres",
    tagline: "Contributing to cross-border web systems by improving workflow logic, refactoring state handling, and optimizing payment-related flows.",
    description: "Worked on cross-border web systems by resolving workflow issues, refactoring state logic, and decoupling payment-related processes.",
    points: [
      "Leveraged AI-assisted development (Claude/Cursor) to accelerate iteration cycles and support resolution of multiple product and engineering issues in a fast-paced development environment",
      "Contributed to a cross-functional web system using TypeScript and Next.js by supporting feature development, resolving integration issues, and collaborating across frontend and backend components.",
      "	Improved core workflow logic by refining business rules, adjusting state handling, and decoupling Stripe payment processing from deposit flow to improve system reliability and maintainability."
    ],
    skills: ["PyTorch", "Rust", "CUDA"],
    orbitRadius: 280, orbitDuration: 45, size: 55, color: "#7afcff",
    texture: "radial-gradient(circle at 30% 30%, #7afcff 0%, #00d2ff 100%)"
  },
  {
    id: "c", title: "Creative Engineer", company: "Vibe Studios", location: "Toronto",
    year: "2020 - 2021",
    tagline: "Pioneering interactive storytelling through motion-driven experiences.",
    description: "Pioneering interactive storytelling through generative art and motion-driven experiences for high-end luxury brands.",
    points: [
      "Designed immersive installations for 5 global luxury brand launches.",
      "Built a custom Vulkan-based particle system for real-time interactive projection mapping.",
      "Collaborated with digital artists to bridge the gap between creative vision and code."
    ],
    skills: ["C++", "Vulkan", "TouchDesigner"],
    orbitRadius: 130, orbitDuration: 20, size: 45, color: "#feffb7",
    texture: "conic-gradient(from 180deg at 50% 50%, #feffb7 0deg, #ff9a9e 180deg, #feffb7 360deg)"
  },
  {
    id: "d", title: "DevOps Engineer", company: "Cloud Nodes", location: "Remote",
    year: "2019 - 2020",
    tagline: "Scaling distributed database clusters and automating CI/CD pipelines.",
    description: "Scaling distributed database clusters and automating CI/CD pipelines for mission-critical e-commerce infrastructure.",
    points: [
      "Managed infrastructure supporting 1M+ daily active users with 99.99% uptime.",
      "Implemented automated disaster recovery protocols for multi-region clusters.",
      "Reduced deployment times by 60% through optimized Jenkins/K8s pipelines."
    ],
    skills: ["Kubernetes", "AWS", "Terraform"],
    orbitRadius: 360, orbitDuration: 60, size: 75, color: "#95e1d3",
    hasRing: true, texture: "linear-gradient(45deg, #95e1d3 0%, #00b894 100%)"
  },
  {
    id: "e", title: "Future Frontier", company: "Coming Soon", location: "Deep Space",
    year: "2026 - Beyond",
    tagline: "Exploring the unknown boundaries of technology and creativity.",
    description: "A classified venture into the next generation of digital experiences and autonomous systems.",
    points: [
      "Researching next-generation interaction models.",
      "Building the foundations for future orbital projects."
    ],
    skills: ["Quantum Computing", "Neural-Interface", "Space-Logistics"],
    orbitRadius: 440, orbitDuration: 85, size: 35, color: "#a29bfe",
    texture: "radial-gradient(circle at 70% 70%, #a29bfe 0%, #6c5ce7 100%)"
  }
];

function OrbitingText({ text, radius, isHovered }: { text: string; radius: number; isHovered: boolean }) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.2, rotate: 20 }}
          transition={{ duration: 0.5, ease: "circOut" }}
        >
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
            <path
              id={`path-${text}`}
              d={`M 100, 100 m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
              fill="none"
            />
            <text className="text-[6px] fill-white/80 font-bold tracking-[0.2em] uppercase origin-center animate-[spin_20s_linear_infinite]">
              <textPath href={`#path-${text}`} startOffset="0%">
                {text} • {text} • {text} • {text}
              </textPath>
            </text>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ExperienceDetailModal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        layoutId={`capsule-${exp.id}`}
        className="relative w-full max-w-2xl bg-[#121212]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-10"
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all z-50"
        >
          <X className="w-5 h-5 text-white/30" />
        </button>

        <div className="p-10 md:p-14">
          <header className="mb-8">
            <span className="text-xs tracking-[0.4em] text-white/40 uppercase block mb-1">{exp.year}</span>
            <h4 className="text-4xl font-serif italic text-white leading-tight mb-2" style={{ textShadow: `0 0 15px ${exp.color}44` }}>{exp.title}</h4>
            <p className="text-sm text-white/60 tracking-widest uppercase">{exp.company}</p>
          </header>

          <div className="mb-10 space-y-4">
            {exp.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: exp.color }} />
                <p className="text-lg text-white/80 font-light leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>

          <footer className="flex flex-wrap gap-2 pt-8 border-t border-white/5">
            {exp.skills.map(s => (
              <span key={s} className="text-[8px] tracking-widest uppercase px-3 py-1.5 bg-white/5 border border-white/5 rounded-md text-white/50">
                {s}
              </span>
            ))}
          </footer>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ExperienceCapsule({ exp, onClose, onOpenDetail }: { exp: Experience; onClose: () => void; onOpenDetail: () => void }) {
  return (
    <motion.div
      layoutId={`capsule-${exp.id}`}
      className="absolute top-0 left-full ml-12 z-[60] w-[320px] pointer-events-auto origin-left cursor-pointer bg-[#121212]/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
    >
      <div className="p-6 relative">
        <button onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 text-[10px] text-white/30 hover:text-white transition-colors">✕</button>

        <header className="mb-4">
          <span className="text-[8px] tracking-[0.4em] text-white/40 uppercase block mb-1">{exp.year}</span>
          <h4 className="text-xl font-serif italic text-white leading-tight">{exp.title}</h4>
          <p className="text-[10px] text-white/60 uppercase tracking-widest">{exp.company}</p>
        </header>

        <div className="mb-6">
          <p className="text-[13px] leading-relaxed text-white/80 font-light italic">
            {exp.tagline}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDetail(); }}
            className="mt-4 w-full py-2 bg-primary/10 border border-primary/20 rounded-md text-[10px] text-primary font-bold uppercase tracking-widest hover:bg-primary/20 transition-all"
          >
            Expand to view more
          </button>
        </div>

        <footer className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {exp.skills.map(s => (
            <span key={s} className="text-[8px] tracking-widest uppercase px-2 py-1 bg-white/5 border border-white/5 rounded-md text-white/50">
              {s}
            </span>
          ))}
        </footer>
      </div>
    </motion.div>
  );
}

function Planet({ exp, onSelect, isHovered, setHoveredId, mouseX, mouseY, isSelected, onOpenDetail }: {
  exp: Experience;
  onSelect: (id: string | null) => void;
  isHovered: boolean;
  setHoveredId: (id: string | null) => void;
  mouseX: any;
  mouseY: any;
  isSelected: boolean;
  onOpenDetail: () => void;
}) {
  const planetRef = useRef<HTMLButtonElement>(null);
  const planetX = useMotionValue(0);
  const planetY = useMotionValue(0);
  const springX = useSpring(planetX, { stiffness: 50, damping: 15 });
  const springY = useSpring(planetY, { stiffness: 50, damping: 15 });

  useEffect(() => {
    const unsubX = mouseX.on("change", (v: number) => {
      if (!planetRef.current) return;
      const rect = planetRef.current.getBoundingClientRect();
      const dist = v - (rect.left + rect.width / 2);
      if (Math.abs(dist) < 150) planetX.set(dist * 0.15);
      else planetX.set(0);
    });
    const unsubY = mouseY.on("change", (v: number) => {
      if (!planetRef.current) return;
      const rect = planetRef.current.getBoundingClientRect();
      const dist = v - (rect.top + rect.height / 2);
      if (Math.abs(dist) < 150) planetY.set(dist * 0.15);
      else planetY.set(0);
    });
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, planetX, planetY]);

  const playHum = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(40 + Math.random() * 20, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 1.5);
  };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      animate={{ rotate: 360 }}
      transition={{ duration: exp.orbitDuration, repeat: Infinity, ease: "linear" }}
      style={{ width: exp.orbitRadius * 2, height: exp.orbitRadius * 2, marginLeft: -exp.orbitRadius, marginTop: -exp.orbitRadius }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: exp.orbitDuration, repeat: Infinity, ease: "linear" }}
          className="relative flex items-center justify-center pointer-events-none"
        >
          <OrbitingText text={exp.title} radius={exp.size / 2 + 10} isHovered={isHovered} />

          <motion.button
            ref={planetRef}
            className="relative rounded-full cursor-pointer z-20 group pointer-events-auto"
            style={{
              width: exp.size, height: exp.size,
              x: springX, y: springY,
              background: exp.texture || `radial-gradient(circle at 30% 30%, ${exp.color}, #000)`,
              boxShadow: `0 0 30px ${exp.color}44, inset -5px -5px 15px rgba(0,0,0,0.5), inset 5px 5px 15px rgba(255,255,255,0.2)`,
            }}
            whileHover={{ scale: 1.25 }}
            onMouseEnter={() => { setHoveredId(exp.id); playHum(); }}
            onMouseLeave={() => setHoveredId(null)}
            onClick={(e) => { e.stopPropagation(); onSelect(isSelected ? null : exp.id); }}
          >
            {exp.hasRing && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[30%] border border-white/20 rounded-[100%] rotate-x-60 -rotate-12 pointer-events-none"
                style={{ boxShadow: `0 0 15px ${exp.color}22` }} />
            )}
            <motion.div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 50px ${exp.color}66` }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          </motion.button>

          <AnimatePresence>
            {isSelected && <ExperienceCapsule exp={exp} onClose={() => onSelect(null)} onOpenDetail={onOpenDetail} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const selectedExp = useMemo(() => experiences.find(e => e.id === selectedId), [selectedId]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section id="experience" className="py-32 px-4 relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onClick={() => { setSelectedId(null); setIsDetailOpen(false); }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-full -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 translate-x-0 translate-y-0 w-[500px] h-[500px] bg-blue-900/20 blur-[150px] rounded-full animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <motion.div className="text-center mb-20 z-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
        <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Chapter 02</span>
        <h2 className="text-6xl md:text-8xl font-serif italic mb-4">Experience <span className="title-transparent">Galaxy</span></h2>
        <p className="text-muted-foreground tracking-[0.4em] uppercase text-xs">Navigating through my professional universe</p>
      </motion.div>

      <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          {[130, 180, 280, 360, 420].map((radius) => (
            <div key={radius} className="absolute border border-white/10 rounded-full" style={{ width: radius * 2, height: radius * 2 }} />
          ))}
        </div>

        <motion.div className="w-28 h-28 rounded-full relative z-0 flex items-center justify-center"
          style={{ background: "radial-gradient(circle, #fff, #ffcc33, #ff6600)", boxShadow: "0 0 120px #ff660088, 0 0 300px #ff660033" }}>
          <div className="absolute inset-0 blur-3xl bg-orange-500/20 animate-pulse" />
        </motion.div>

        {experiences.map((exp) => (
          <Planet key={exp.id} exp={exp} onSelect={setSelectedId} isHovered={hoveredId === exp.id} setHoveredId={setHoveredId}
            mouseX={mouseX} mouseY={mouseY} isSelected={selectedId === exp.id} onOpenDetail={() => setIsDetailOpen(true)} />
        ))}
      </div>

      <AnimatePresence>
        {isDetailOpen && selectedExp && (
          <ExperienceDetailModal exp={selectedExp} onClose={() => setIsDetailOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
