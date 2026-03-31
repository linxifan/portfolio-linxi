import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const languageIcons: Record<string, string> = {
  JavaScript: "🟨 JS",
  Python: "🐍 Py",
  C: "⚙️ C",
  Rocq: "🔷 Rq",
  HTML: "🌐 HTML",
  TypeScript: "🔷 TS",
  React: "⚛️ React",
};

interface ProjectPage {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

const projects: ProjectPage[] = [
  {
    title: "Project 1",
    description: "Describe your project here. What problem did it solve? What did you learn?",
    tech: ["React", "TypeScript"],
  },
  {
    title: "Project 2",
    description: "Describe your project here. What problem did it solve? What did you learn?",
    tech: ["Python", "JavaScript"],
  },
  {
    title: "Project 3",
    description: "Describe your project here. What problem did it solve? What did you learn?",
    tech: ["C", "HTML"],
  },
  {
    title: "Project 4",
    description: "Describe your project here. What problem did it solve? What did you learn?",
    tech: ["Rocq", "Python"],
  },
  {
    title: "Project 5",
    description: "Describe your project here. What problem did it solve? What did you learn?",
    tech: ["TypeScript", "React", "JavaScript"],
  },
];

// Simple page turn sound using Web Audio API
function playPageTurnSound() {
  try {
    const ctx = new AudioContext();
    const duration = 0.15;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + duration);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // silent fail
  }
}

export default function ProjectsSection() {
  const [page, setPage] = useState(-1); // -1 = cover
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    if (page < projects.length - 1) {
      setDirection(1);
      setPage((p) => p + 1);
      playPageTurnSound();
    }
  }, [page]);

  const goPrev = useCallback(() => {
    if (page > -1) {
      setDirection(-1);
      setPage((p) => p - 1);
      playPageTurnSound();
    }
  }, [page]);

  const variants = {
    enter: (d: number) => ({
      rotateY: d > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: { rotateY: 0, opacity: 1 },
    exit: (d: number) => ({
      rotateY: d > 0 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        📚 My Projects
      </motion.h2>

      {/* Book */}
      <motion.div
        className="relative w-full max-w-md"
        style={{ perspective: 1200 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="relative aspect-[3/4] w-full">
          <AnimatePresence mode="wait" custom={direction}>
            {page === -1 ? (
              /* Cover */
              <motion.div
                key="cover"
                className="absolute inset-0 rounded-lg flex flex-col items-center justify-center p-8"
                style={{
                  background: "linear-gradient(145deg, hsl(var(--card)), hsl(var(--muted)))",
                  border: "3px solid hsl(var(--border))",
                  boxShadow: "4px 4px 20px hsl(0 0% 0% / 0.4), inset 0 0 30px hsl(0 0% 100% / 0.05)",
                }}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <span className="text-5xl mb-4">📖</span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  Projects I Did
                </h3>
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  {Object.entries(languageIcons).map(([lang, icon]) => (
                    <motion.span
                      key={lang}
                      className="text-xs px-3 py-1 rounded-full glass-card text-foreground/80"
                      whileHover={{ scale: 1.1 }}
                    >
                      {icon}
                    </motion.span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">Click → to read</p>
              </motion.div>
            ) : (
              /* Project page */
              <motion.div
                key={page}
                className="absolute inset-0 book-page rounded-lg flex flex-col p-8"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                {/* Page lines decoration */}
                <div className="absolute inset-4 pointer-events-none opacity-10">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="border-b border-gray-400 mb-4" />
                  ))}
                </div>

                <div className="relative z-10">
                  <p className="text-xs text-gray-400 mb-4 text-right">
                    Page {page + 1} / {projects.length}
                  </p>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "hsl(220 30% 20%)" }}>
                    {projects[page].title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(220 20% 30%)" }}>
                    {projects[page].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projects[page].tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800"
                      >
                        {languageIcons[t] || t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          <motion.button
            onClick={goPrev}
            disabled={page === -1}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center disabled:opacity-30 hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <motion.button
            onClick={goNext}
            disabled={page === projects.length - 1}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center disabled:opacity-30 hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
