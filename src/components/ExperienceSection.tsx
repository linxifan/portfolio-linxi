import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import spaceBg from "@/assets/space-bg.jpeg";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  // Position relative to 800x1540 background
  right: number;
  top: number;
  size: number;
}

const experiences: Experience[] = [
  {
    id: "a", title: "Job Title 1", company: "Company A", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Python", "React", "SQL"],
    right: 620, top: 585, size: 280,
  },
  {
    id: "b", title: "Job Title 2", company: "Company B", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["JavaScript", "Node.js"],
    right: 400, top: 550, size: 100,
  },
  {
    id: "c", title: "Job Title 3", company: "Company C", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["C++", "Java", "AWS"],
    right: 760, top: 375, size: 80,
  },
  {
    id: "d", title: "Job Title 4", company: "Company D", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["TypeScript", "GraphQL"],
    right: 610, top: 160, size: 120,
  },
  {
    id: "e", title: "Job Title 5", company: "Company E", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Rust", "Go", "Kubernetes"],
    right: 490, top: 870, size: 100,
  },
  {
    id: "f", title: "Job Title 6", company: "Company F", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Docker", "Terraform"],
    right: 590, top: 1060, size: 200,
  },
  {
    id: "g", title: "Job Title 7", company: "Company G", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Swift", "Kotlin"],
    right: 210, top: 1180, size: 180,
  },
  {
    id: "h", title: "Job Title 8", company: "Company H", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["ML", "TensorFlow"],
    right: 260, top: 980, size: 100,
  },
];

const BG_W = 800;
const BG_H = 1540;

/* Floating keyframes for each planet */
const floatAnimation = (i: number) => ({
  y: [0, -6 - (i % 3) * 2, 0],
  transition: {
    duration: 3 + (i % 3),
    repeat: Infinity,
    ease: "easeInOut",
  },
});

/* Glassmorphism tooltip */
function PlanetTooltip({ exp, containerRef }: { exp: Experience; containerRef: React.RefObject<HTMLDivElement> }) {
  // Position tooltip above the planet center
  const leftPct = ((BG_W - exp.right) / BG_W) * 100;
  const topPct = (exp.top / BG_H) * 100;

  return (
    <motion.div
      className="absolute z-40 pointer-events-none"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(-50%, calc(-100% - ${exp.size * 0.5 * 0.6}px - 12px))`,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="px-4 py-2.5 rounded-xl text-center min-w-[120px]"
        style={{
          background: "hsl(220 30% 15% / 0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid hsl(210 60% 70% / 0.2)",
          boxShadow: "0 8px 32px hsl(210 80% 60% / 0.15)",
        }}
      >
        <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
          {exp.title}
        </p>
        <p className="text-[11px] text-foreground/60">{exp.company}</p>
      </div>
    </motion.div>
  );
}

/* Detail modal – circular notebook */
function NotebookDetail({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "hsl(0 0% 0% / 0.5)", backdropFilter: "blur(6px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-72 h-72 md:w-80 md:h-80 rounded-full flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          background: "linear-gradient(145deg, hsl(40 25% 93%), hsl(40 20% 87%))",
          boxShadow: "0 8px 40px hsl(0 0% 0% / 0.4), inset 0 0 20px hsl(0 0% 100% / 0.15)",
          border: "3px solid hsl(220 15% 75% / 0.5)",
        }}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 20 }}
        transition={{ type: "spring", damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notebook lines */}
        <div className="absolute inset-8 pointer-events-none opacity-[0.08]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-b border-gray-500 mb-3" />
          ))}
        </div>

        <div className="relative z-10 px-10">
          <h3 className="text-lg md:text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "hsl(220 30% 20%)" }}>
            {exp.title}
          </h3>
          <p className="text-sm mb-0.5" style={{ color: "hsl(220 20% 35%)" }}>{exp.company}</p>
          <p className="text-xs mb-2" style={{ color: "hsl(220 15% 50%)" }}>📍 {exp.location}</p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "hsl(220 15% 40%)" }}>{exp.description}</p>
          <div className="flex flex-wrap gap-1 justify-center">
            {exp.skills.map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "hsl(220 20% 82% / 0.6)", color: "hsl(220 25% 30%)" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs z-20 transition-colors"
          style={{ background: "hsl(220 15% 80%)", color: "hsl(220 25% 30%)" }}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const [selected, setSelected] = useState<Experience | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="py-20 px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🪐 My Experience Galaxy
      </motion.h2>

      {/* Container preserving 800:1540 aspect ratio */}
      <motion.div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden mx-auto"
        style={{ maxWidth: 448, aspectRatio: `${BG_W} / ${BG_H}` }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Background image */}
        <img
          src={spaceBg}
          alt="Experience galaxy"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Planets as interactive hotspots */}
        {experiences.map((exp, i) => {
          const leftPct = ((BG_W - exp.right) / BG_W) * 100;
          const topPct = (exp.top / BG_H) * 100;
          // Scale size proportionally (container maxWidth 448 vs BG_W 800)
          const sizePct = (exp.size / BG_W) * 100;
          const isHovered = hoveredId === exp.id;

          return (
            <motion.button
              key={exp.id}
              className="absolute z-20 rounded-full cursor-pointer"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                width: `${sizePct}%`,
                aspectRatio: "1",
                transform: "translate(-50%, -50%)",
                background: isHovered
                  ? "radial-gradient(circle, hsl(210 80% 80% / 0.25) 0%, transparent 70%)"
                  : "transparent",
                boxShadow: isHovered
                  ? "0 0 30px 10px hsl(210 80% 75% / 0.35), 0 0 60px 20px hsl(210 70% 60% / 0.15)"
                  : "none",
                transition: "box-shadow 0.3s, background 0.3s",
              }}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelected(exp)}
              animate={floatAnimation(i)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
            />
          );
        })}

        {/* Tooltips */}
        {experiences.map((exp) => (
          <AnimatePresence key={exp.id}>
            {hoveredId === exp.id && <PlanetTooltip exp={exp} containerRef={containerRef} />}
          </AnimatePresence>
        ))}

        {/* Hint */}
        <div className="absolute bottom-3 left-0 right-0 text-center z-10">
          <p className="text-[10px] text-foreground/50" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
            Hover over a planet · Click for details ✨
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && <NotebookDetail exp={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
