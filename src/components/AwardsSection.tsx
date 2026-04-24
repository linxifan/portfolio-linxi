import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const awards = [
  {
    id: 1,
    title: "Global Design Award",
    org: "Design Museum",
    year: "2024",
    desc: "Recognized for excellence in spatial digital interface design.",
    color: "#ff7eb3"
  },
  {
    id: 2,
    title: "Innovation Pioneer",
    org: "Tech Future Lab",
    year: "2023",
    desc: "Awarded for pioneering research in human-machine resonance.",
    color: "#7afcff"
  },
  {
    id: 3,
    title: "Eco-Tech Excellence",
    org: "Green Earth Council",
    year: "2022",
    desc: "Best application of sustainable computing in industrial contexts.",
    color: "#feffb7"
  }
];

function Crystal({ award, index }: { award: typeof awards[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="relative w-32 h-48 cursor-pointer transform-gpu"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Crystal Shape (Monolith) */}
        <div 
          className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden"
          style={{
            clipPath: "polygon(20% 0%, 80% 0%, 100% 15%, 100% 85%, 80% 100%, 20% 100%, 0% 85%, 0% 15%)",
            boxShadow: `0 0 30px ${award.color}33`,
          }}
        >
          {/* Inner Glow */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{ background: `linear-gradient(135deg, ${award.color}, transparent)` }}
          />

          {/* Laser Scan Effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-x-0 h-[2px] z-10"
                style={{ background: award.color, boxShadow: `0 0 15px ${award.color}` }}
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Info labels floating centered below crystal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full mt-10 left-1/2 -translate-x-1/2 w-64 text-center pointer-events-none z-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <span className="text-[10px] tracking-[0.4em] text-primary uppercase font-bold mb-2 block">Archive {award.year}</span>
            <h3 className="text-3xl font-serif italic mb-2 leading-tight">{award.title}</h3>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">{award.org}</p>
            <p className="text-sm text-foreground/70 font-light leading-relaxed">
              {award.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AwardsSection() {
  return (
    <section id="awards" className="min-h-screen py-32 px-12 relative overflow-hidden flex flex-col items-center">
      <motion.div 
        className="text-center mb-32 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-6xl md:text-8xl font-serif italic mb-4">Astral <span className="title-transparent">Honors</span></h2>
        <p className="text-muted-foreground tracking-[0.4em] uppercase text-xs">Monuments of past achievements</p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-24 md:gap-40">
        {awards.map((award, i) => (
          <Crystal key={award.id} award={award} index={i} />
        ))}
      </div>
    </section>
  );
}
