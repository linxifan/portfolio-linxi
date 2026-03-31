import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  color: string;
  emoji: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Job Title 1",
    company: "Company A",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Python", "React", "SQL"],
    color: "hsl(30 80% 65%)",
    emoji: "🪐",
  },
  {
    id: 2,
    title: "Job Title 2",
    company: "Company B",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["JavaScript", "Node.js", "MongoDB"],
    color: "hsl(200 70% 65%)",
    emoji: "🌍",
  },
  {
    id: 3,
    title: "Job Title 3",
    company: "Company C",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["C++", "Java", "AWS"],
    color: "hsl(340 60% 65%)",
    emoji: "🌸",
  },
  {
    id: 4,
    title: "Job Title 4",
    company: "Company D",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["TypeScript", "GraphQL", "Docker"],
    color: "hsl(160 50% 55%)",
    emoji: "🌿",
  },
  {
    id: 5,
    title: "Job Title 5",
    company: "Company E",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Rust", "Go", "Kubernetes"],
    color: "hsl(270 60% 65%)",
    emoji: "💜",
  },
];

function PlanetDetail({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex flex-col items-center justify-center text-center p-8 cursor-pointer"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${exp.color}, hsl(var(--card)))`,
          boxShadow: `0 0 60px ${exp.color}40, inset 0 0 30px hsl(0 0% 100% / 0.1)`,
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-3xl mb-2">{exp.emoji}</span>
        <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>
          {exp.title}
        </h3>
        <p className="text-sm text-foreground/80 mb-1">{exp.company}</p>
        <p className="text-xs text-foreground/60 mb-3">📍 {exp.location}</p>
        <p className="text-xs text-foreground/70 mb-3 leading-relaxed">{exp.description}</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {exp.skills.map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-background/30 text-foreground/80">
              {s}
            </span>
          ))}
        </div>
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card text-foreground flex items-center justify-center text-sm hover:bg-destructive transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const [selected, setSelected] = useState<Experience | null>(null);

  return (
    <section id="experience" className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-16 text-center"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🪐 My Experience Galaxy
      </motion.h2>

      {/* Planet timeline */}
      <div className="relative flex flex-col items-center gap-0">
        {experiences.map((exp, i) => (
          <div key={exp.id} className="flex items-center gap-6">
            {/* Connecting line */}
            {i > 0 && (
              <motion.div
                className="absolute w-0.5 bg-muted-foreground/20"
                style={{ height: 60, marginTop: -60 }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              />
            )}
            <div className="flex items-center gap-4 mb-8">
              {/* Planet */}
              <motion.button
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer transition-all"
                style={{
                  background: `radial-gradient(circle at 35% 35%, hsl(var(--muted)), hsl(var(--card)))`,
                  border: "2px solid hsl(var(--border))",
                }}
                whileHover={{
                  scale: 1.2,
                  background: `radial-gradient(circle at 35% 35%, ${exp.color}, hsl(var(--card)))`,
                  boxShadow: `0 0 30px ${exp.color}50`,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(exp)}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <span className="text-2xl">{exp.emoji}</span>
              </motion.button>

              {/* Title */}
              <motion.div
                className="text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.1 }}
              >
                <p className="font-semibold text-foreground text-sm md:text-base">{exp.title}</p>
                <p className="text-xs text-muted-foreground">{exp.company}</p>
              </motion.div>
            </div>

            {/* Line connector between planets */}
            {i < experiences.length - 1 && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ width: 2, height: 32, background: "hsl(var(--border))" }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && <PlanetDetail exp={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
