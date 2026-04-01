import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import planet1 from "@/assets/planet-1.png";
import planet2 from "@/assets/planet-2.png";
import planet3 from "@/assets/planet-3.png";
import planet4 from "@/assets/planet-4.png";
import planet5 from "@/assets/planet-5.png";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  planetImg: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Job Title 1",
    company: "Company A",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Python", "React", "SQL"],
    planetImg: planet1,
  },
  {
    id: 2,
    title: "Job Title 2",
    company: "Company B",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["JavaScript", "Node.js", "MongoDB"],
    planetImg: planet2,
  },
  {
    id: 3,
    title: "Job Title 3",
    company: "Company C",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["C++", "Java", "AWS"],
    planetImg: planet3,
  },
  {
    id: 4,
    title: "Job Title 4",
    company: "Company D",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["TypeScript", "GraphQL", "Docker"],
    planetImg: planet4,
  },
  {
    id: 5,
    title: "Job Title 5",
    company: "Company E",
    location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Rust", "Go", "Kubernetes"],
    planetImg: planet5,
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
        className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex flex-col items-center justify-center text-center p-10 cursor-pointer overflow-hidden"
        initial={{ scale: 0, rotate: -60 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 60 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Planet image as background */}
        <img
          src={exp.planetImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-full"
          style={{ filter: "brightness(0.5) blur(1px)" }}
        />
        <div className="relative z-10">
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
        </div>
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card text-foreground flex items-center justify-center text-sm hover:bg-destructive transition-colors z-20"
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
      <div className="relative flex flex-col items-center gap-0 w-full max-w-xl">
        {experiences.map((exp, i) => (
          <div key={exp.id} className="relative flex items-center w-full mb-6">
            {/* Connecting line */}
            {i < experiences.length - 1 && (
              <motion.div
                className="absolute left-[calc(50%+40px)] md:left-[calc(50%+50px)] top-full w-0.5 h-6"
                style={{ background: "hsl(var(--border))" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              />
            )}

            {/* Left side: title text */}
            <div className="flex-1 text-right pr-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="inline-block"
              >
                <p
                  className="font-semibold text-sm md:text-base transition-colors duration-300"
                  style={{
                    color: hoveredId === exp.id ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {exp.title}
                </p>
                <p className="text-xs text-muted-foreground">{exp.company}</p>
              </motion.div>
            </div>

            {/* Right side: planet */}
            <motion.button
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex-shrink-0 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(exp)}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <img
                src={exp.planetImg}
                alt={exp.title}
                className="w-full h-full object-cover rounded-full transition-all duration-300"
                style={{
                  filter: hoveredId === exp.id
                    ? "brightness(1.2) drop-shadow(0 0 20px hsl(var(--primary) / 0.6))"
                    : "brightness(0.7) grayscale(0.3)",
                }}
                loading="lazy"
                width={512}
                height={512}
              />
            </motion.button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && <PlanetDetail exp={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
