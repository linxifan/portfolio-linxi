import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import spaceBg from "@/assets/space-bg.jpeg";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  // hotspot position [x%, y%] mapped to the planets in the original image
  pos: [number, number];
  hitSize: number; // clickable area size in px
}

const experiences: Experience[] = [
  {
    id: 1, title: "Job Title 1", company: "Company A", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Python", "React", "SQL"],
    pos: [72, 13], hitSize: 50,
  },
  {
    id: 2, title: "Job Title 2", company: "Company B", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["JavaScript", "Node.js", "MongoDB"],
    pos: [52, 35], hitSize: 70,
  },
  {
    id: 3, title: "Job Title 3", company: "Company C", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["C++", "Java", "AWS"],
    pos: [75, 27], hitSize: 40,
  },
  {
    id: 4, title: "Job Title 4", company: "Company D", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["TypeScript", "GraphQL", "Docker"],
    pos: [30, 65], hitSize: 45,
  },
  {
    id: 5, title: "Job Title 5", company: "Company E", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Rust", "Go", "Kubernetes"],
    pos: [62, 75], hitSize: 55,
  },
];

/* Round notebook popup */
function NotebookDetail({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm"
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
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 30 }}
        transition={{ type: "spring", damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notebook lines decoration */}
        <div className="absolute inset-8 pointer-events-none opacity-[0.08]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-b border-gray-500 mb-3" />
          ))}
        </div>

        <div className="relative z-10 px-10">
          <h3
            className="text-lg md:text-xl font-bold mb-1"
            style={{ fontFamily: "var(--font-display)", color: "hsl(220 30% 20%)" }}
          >
            {exp.title}
          </h3>
          <p className="text-sm mb-0.5" style={{ color: "hsl(220 20% 35%)" }}>{exp.company}</p>
          <p className="text-xs mb-2" style={{ color: "hsl(220 15% 50%)" }}>📍 {exp.location}</p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "hsl(220 15% 40%)" }}>
            {exp.description}
          </p>
          <div className="flex flex-wrap gap-1 justify-center">
            {exp.skills.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: "hsl(220 20% 82% / 0.6)", color: "hsl(220 25% 30%)" }}
              >
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
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

      {/* Space scene — uses the original image directly */}
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden mx-auto"
        style={{ maxWidth: 448, aspectRatio: "3 / 4" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <img
          src={spaceBg}
          alt="Experience galaxy"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={1024}
          height={1024}
        />

        {/* Invisible clickable hotspots over the existing planets in the image */}
        {experiences.map((exp, i) => (
          <motion.button
            key={exp.id}
            className="absolute z-20 rounded-full cursor-pointer"
            style={{
              left: `${exp.pos[0]}%`,
              top: `${exp.pos[1]}%`,
              width: exp.hitSize,
              height: exp.hitSize,
              transform: "translate(-50%, -50%)",
              background: hoveredId === exp.id
                ? "radial-gradient(circle, hsl(210 80% 80% / 0.3) 0%, transparent 70%)"
                : "transparent",
              boxShadow: hoveredId === exp.id
                ? "0 0 25px hsl(210 80% 80% / 0.4)"
                : "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={() => setHoveredId(exp.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelected(exp)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}

        {/* Hover labels */}
        {experiences.map((exp) => (
          <AnimatePresence key={exp.id}>
            {hoveredId === exp.id && (
              <motion.div
                className="absolute z-30 pointer-events-none"
                style={{
                  left: `${exp.pos[0]}%`,
                  top: `${exp.pos[1] - 8}%`,
                  transform: "translate(-50%, -100%)",
                }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                <div
                  className="px-3 py-1.5 rounded-lg text-center"
                  style={{
                    background: "hsl(0 0% 10% / 0.75)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p className="text-xs font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    {exp.title}
                  </p>
                  <p className="text-[10px] text-foreground/70">{exp.company}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* Hint text */}
        <div className="absolute bottom-3 left-0 right-0 text-center z-10">
          <p className="text-[10px] text-foreground/50" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
            Click on a planet to see details ✨
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && <NotebookDetail exp={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
