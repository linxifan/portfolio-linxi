import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import spaceBg from "@/assets/space-bg.jpeg";
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
  // position as percentage [x, y] within the container
  pos: [number, number];
  size: number; // planet size in px
}

const experiences: Experience[] = [
  {
    id: 1, title: "Job Title 1", company: "Company A", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Python", "React", "SQL"],
    planetImg: planet1, pos: [68, 12], size: 72,
  },
  {
    id: 2, title: "Job Title 2", company: "Company B", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["JavaScript", "Node.js", "MongoDB"],
    planetImg: planet2, pos: [55, 32], size: 90,
  },
  {
    id: 3, title: "Job Title 3", company: "Company C", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["C++", "Java", "AWS"],
    planetImg: planet3, pos: [72, 52], size: 64,
  },
  {
    id: 4, title: "Job Title 4", company: "Company D", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["TypeScript", "GraphQL", "Docker"],
    planetImg: planet4, pos: [50, 70], size: 80,
  },
  {
    id: 5, title: "Job Title 5", company: "Company E", location: "City, Country",
    description: "Describe your work responsibilities and achievements here.",
    skills: ["Rust", "Go", "Kubernetes"],
    planetImg: planet5, pos: [65, 88], size: 68,
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
        className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex flex-col items-center justify-center text-center p-10 overflow-hidden"
        initial={{ scale: 0, rotate: -60 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 60 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={exp.planetImg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-full" style={{ filter: "brightness(0.45) blur(1px)" }} />
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-display)" }}>{exp.title}</h3>
          <p className="text-sm text-foreground/80 mb-1">{exp.company}</p>
          <p className="text-xs text-foreground/60 mb-3">📍 {exp.location}</p>
          <p className="text-xs text-foreground/70 mb-3 leading-relaxed">{exp.description}</p>
          <div className="flex flex-wrap gap-1 justify-center">
            {exp.skills.map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-background/30 text-foreground/80">{s}</span>
            ))}
          </div>
        </div>
        <button onClick={onClose} className="absolute top-1 right-1 w-8 h-8 rounded-full bg-card/80 text-foreground flex items-center justify-center text-sm hover:bg-destructive transition-colors z-20">✕</button>
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

      {/* Space scene container */}
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden mx-auto"
        style={{ maxWidth: 448, aspectRatio: "3 / 4" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Background image — the exact uploaded space scene */}
        <img
          src={spaceBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={1024}
          height={1024}
        />

        {/* Connecting lines between planets (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {experiences.slice(0, -1).map((exp, i) => {
            const next = experiences[i + 1];
            return (
              <motion.line
                key={exp.id}
                x1={exp.pos[0]}
                y1={exp.pos[1]}
                x2={next.pos[0]}
                y2={next.pos[1]}
                stroke="hsl(210 60% 80% / 0.35)"
                strokeWidth="0.3"
                strokeDasharray="1 0.8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.3, duration: 0.8 }}
              />
            );
          })}
        </svg>

        {/* Planets */}
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            className="absolute z-20 flex items-center gap-2"
            style={{
              left: `${exp.pos[0]}%`,
              top: `${exp.pos[1]}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, type: "spring" }}
          >
            {/* Title label — positioned to the left */}
            <motion.div
              className="text-right mr-1 pointer-events-none select-none"
              style={{ minWidth: 80 }}
              animate={{ opacity: hoveredId === exp.id ? 1 : 0.7 }}
            >
              <p
                className="text-xs md:text-sm font-semibold leading-tight drop-shadow-lg transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-display)",
                  color: hoveredId === exp.id ? "hsl(var(--primary))" : "hsl(0 0% 95%)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                }}
              >
                {exp.title}
              </p>
              <p className="text-[10px] leading-tight" style={{ color: "hsl(0 0% 80%)", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                {exp.company}
              </p>
            </motion.div>

            {/* Planet orb */}
            <motion.button
              className="relative rounded-full flex-shrink-0 cursor-pointer overflow-hidden"
              style={{ width: exp.size, height: exp.size }}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(exp)}
            >
              <img
                src={exp.planetImg}
                alt={exp.title}
                className="w-full h-full object-cover rounded-full transition-all duration-300"
                style={{
                  filter: hoveredId === exp.id
                    ? "brightness(1.3) drop-shadow(0 0 15px hsl(var(--primary) / 0.7))"
                    : "brightness(0.85)",
                }}
                loading="lazy"
                width={512}
                height={512}
              />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && <PlanetDetail exp={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
