import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
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
    id: "a", title: "Lead Architect", company: "Metaverse Corp", location: "Global",
    year: "2023 - Pres",
    description: "Orchestrating the core infrastructure of decentralized spatial environments, focusing on low-latency synchronization and high-fidelity rendering.",
    skills: ["WebXR", "Next.js", "Three.js"],
    orbitRadius: 180, orbitDuration: 30, size: 90, color: "#ff7eb3",
    hasRing: true, texture: "linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)"
  },
  {
    id: "b", title: "AI Researcher", company: "Neural-X", location: "San Francisco",
    year: "2021 - 2023",
    description: "Developing large language models tailored for specialized creative drafting, reducing friction in conceptual artistic workflows.",
    skills: ["PyTorch", "Rust", "CUDA"],
    orbitRadius: 280, orbitDuration: 45, size: 55, color: "#7afcff",
    texture: "radial-gradient(circle at 30% 30%, #7afcff 0%, #00d2ff 100%)"
  },
  {
    id: "c", title: "Creative Engineer", company: "Vibe Studios", location: "Toronto",
    year: "2020 - 2021",
    description: "Pioneering interactive storytelling through generative art and motion-driven experiences for high-end luxury brands.",
    skills: ["C++", "Vulkan", "TouchDesigner"],
    orbitRadius: 130, orbitDuration: 20, size: 45, color: "#feffb7",
    texture: "conic-gradient(from 180deg at 50% 50%, #feffb7 0deg, #ff9a9e 180deg, #feffb7 360deg)"
  },
  {
    id: "d", title: "DevOps Engineer", company: "Cloud Nodes", location: "Remote",
    year: "2019 - 2020",
    description: "Scaling distributed database clusters and automating CI/CD pipelines for mission-critical e-commerce infrastructure.",
    skills: ["Kubernetes", "AWS", "Terraform"],
    orbitRadius: 360, orbitDuration: 60, size: 75, color: "#95e1d3",
    hasRing: true, texture: "linear-gradient(45deg, #95e1d3 0%, #00b894 100%)"
  },
  {
    id: "e", title: "System Overlord", company: "Secret Lab", location: "Underground",
    year: "2025 - Future",
    description: "Classified project involving autonomous planetary defense and orbital logistics optimization.",
    skills: ["AI", "Robotics", "Fusion"],
    orbitRadius: 420, orbitDuration: 80, size: 40, color: "#a29bfe",
    comingSoon: true
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
      {/* Dimmer Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      />
      
      {/* Main Content Card */}
      <motion.div 
        className="relative w-full max-w-2xl bg-[#121212]/95 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)` }} />

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all z-50 group"
        >
          <X className="w-5 h-5 text-white/30 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
        </button>

        <div className="p-10 md:p-16 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] py-1 px-3 border border-primary/20 rounded-md">
              Mission Report
            </span>
            <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase font-mono">{exp.id.padStart(2, '0')} // DEP-SEC</span>
          </div>

          <header className="mb-12">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-sm tracking-[0.5em] text-white/30 uppercase font-light">{exp.year}</span>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <h4 className="text-5xl md:text-7xl font-serif italic text-white leading-none mb-6 tracking-tight">
              {exp.title}
            </h4>
            <div className="flex items-center gap-6">
              <p className="text-xl text-white/70 font-light tracking-widest uppercase">{exp.company}</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <p className="text-sm text-white/40 tracking-[0.2em] uppercase">{exp.location}</p>
            </div>
          </header>

          <div className="mb-14 relative">
             {/* Large quotation mark decor */}
            <span className="absolute -left-8 -top-8 text-8xl text-white/5 font-serif select-none">“</span>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light italic relative z-10">
              {exp.comingSoon ? "Planetary data restricted. System briefing coming soon from the edge of the galaxy..." : exp.description}
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold">Integrated Technologies</p>
            <footer className="flex flex-wrap gap-3">
              {exp.skills.map(s => (
                <span key={s} className="text-[10px] tracking-widest uppercase px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-primary hover:border-primary/30 transition-colors">
                  {s}
                </span>
              ))}
            </footer>
          </div>
        </div>

        {/* Dynamic Background Aura */}
        <div 
          className="absolute -bottom-32 -left-32 w-96 h-96 blur-[150px] opacity-30 pointer-events-none"
          style={{ background: exp.color }}
        />
        <div 
          className="absolute -top-32 -right-32 w-64 h-64 blur-[120px] opacity-10 pointer-events-none"
          style={{ background: exp.color }}
        />
      </motion.div>
    </motion.div>
  );
}

function ExperienceCapsule({ exp, onClose, onOpenDetail }: { exp: Experience; onClose: () => void; onOpenDetail: () => void }) {
  return (
    <motion.div
      className="absolute top-0 left-full ml-12 z-[60] w-[320px] pointer-events-auto origin-left cursor-pointer"
      initial={{ scale: 0, opacity: 0, x: -20 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      exit={{ scale: 0, opacity: 0, x: -20 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      onClick={(e) => { e.stopPropagation(); onOpenDetail(); }}
    >
      {/* Tether Line */}
      <svg className="absolute top-1/2 right-full -translate-y-1/2 w-12 h-4 overflow-visible pointer-events-none">
        <motion.path 
          d="M 48 2 L 0 2" 
          stroke={exp.color} 
          strokeWidth="1" 
          fill="none" 
          strokeDasharray="4 2"
          animate={{ strokeDashoffset: [-10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="0" cy="2" r="2" fill={exp.color} />
      </svg>

      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden backdrop-blur-[40px] bg-black/60 border-white/10 group hover:border-white/30 transition-all"
           style={{ boxShadow: `0 0 40px ${exp.color}22, inset 0 0 20px ${exp.color}11` }}>
        
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} 
                className="absolute top-4 right-4 text-[10px] text-white/30 hover:text-white transition-colors">✕</button>

        <div className="relative z-10">
          <header className="mb-4">
            <span className="text-[8px] tracking-[0.4em] text-white/40 uppercase block mb-1">{exp.year}</span>
            <h4 className="text-xl font-serif italic text-white leading-tight group-hover:text-primary transition-colors" style={{ textShadow: `0 0 10px ${exp.color}88` }}>{exp.title}</h4>
            <p className="text-xs text-white/60">{exp.company}</p>
          </header>

          <div className="mb-6">
             <p className="text-[13px] leading-relaxed text-white/80 font-light italic">
              {exp.comingSoon ? "Planetary data restricted. Mission briefing coming soon..." : `"${exp.description}"`}
             </p>
          </div>

          <footer className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {exp.skills.map(s => (
              <span key={s} className="text-[8px] tracking-widest uppercase px-2 py-1 bg-white/5 border border-white/5 rounded-md text-white/50">
                {s}
              </span>
            ))}
          </footer>

          <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[7px] text-primary font-bold tracking-[0.2em] uppercase">Click to expand detailed briefing</span>
          </div>
        </div>
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
