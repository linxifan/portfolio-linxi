import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "rain" | "sakura" | "bubbles" | "snow";

const THEMES: Theme[] = ["rain", "sakura", "bubbles", "snow"];

const themeColors: Record<Theme, string> = {
  rain: "linear-gradient(180deg, hsl(220 30% 15%), hsl(210 40% 10%))",
  sakura: "linear-gradient(180deg, hsl(340 40% 18%), hsl(330 30% 12%))",
  bubbles: "linear-gradient(180deg, hsl(200 50% 18%), hsl(190 40% 12%))",
  snow: "linear-gradient(180deg, hsl(210 30% 20%), hsl(220 25% 14%))",
};

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation?: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100 - 20,
    size: Math.random() * 12 + 4,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.6 + 0.3,
    rotation: Math.random() * 360,
  }));
}

const RainDrop = ({ p }: { p: Particle }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${p.x}%`,
      top: `-5%`,
      width: 2,
      height: p.size * 2,
      background: "linear-gradient(180deg, transparent, hsl(200 80% 80%))",
      opacity: p.opacity,
    }}
    animate={{
      y: ["0vh", "110vh"],
      opacity: [p.opacity, p.opacity, 0],
    }}
    transition={{
      duration: p.duration * 0.4,
      delay: p.delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const SakuraPetal = ({ p }: { p: Particle }) => (
  <motion.div
    className="absolute"
    style={{
      left: `${p.x}%`,
      top: `-5%`,
      width: p.size,
      height: p.size * 0.6,
      borderRadius: "50% 0 50% 0",
      background: `hsl(${340 + Math.random() * 20} ${60 + Math.random() * 20}% ${75 + Math.random() * 15}%)`,
      opacity: p.opacity,
      filter: "drop-shadow(0 0 2px hsl(340 60% 80% / 0.5))",
    }}
    animate={{
      y: ["0vh", "110vh"],
      x: [0, Math.sin(p.id) * 100, Math.sin(p.id + 1) * -80, 0],
      rotate: [0, 360, 720],
      opacity: [p.opacity, p.opacity, 0],
    }}
    transition={{
      duration: p.duration,
      delay: p.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const Bubble = ({ p }: { p: Particle }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${p.x}%`,
      bottom: `-5%`,
      width: p.size * 1.5,
      height: p.size * 1.5,
      background: `radial-gradient(circle at 30% 30%, hsl(0 0% 100% / 0.4), hsl(200 80% 80% / 0.1))`,
      border: "1px solid hsl(0 0% 100% / 0.3)",
      opacity: p.opacity,
    }}
    animate={{
      y: ["0vh", "-110vh"],
      x: [0, Math.sin(p.id) * 50, Math.sin(p.id + 2) * -30],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration: p.duration * 1.5,
      delay: p.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const Snowflake = ({ p }: { p: Particle }) => (
  <motion.div
    className="absolute"
    style={{
      left: `${p.x}%`,
      top: `-5%`,
      width: p.size,
      height: p.size,
      borderRadius: "50%",
      background: "radial-gradient(circle, hsl(0 0% 100% / 0.9), hsl(200 50% 90% / 0.3))",
      boxShadow: "0 0 6px hsl(200 50% 90% / 0.5)",
      opacity: p.opacity,
    }}
    animate={{
      y: ["0vh", "110vh"],
      x: [0, Math.sin(p.id) * 60, Math.cos(p.id) * -40, 0],
      rotate: [0, 180, 360],
      opacity: [p.opacity, p.opacity, 0],
    }}
    transition={{
      duration: p.duration * 1.2,
      delay: p.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const ParticleComponent: Record<Theme, React.FC<{ p: Particle }>> = {
  rain: RainDrop,
  sakura: SakuraPetal,
  bubbles: Bubble,
  snow: Snowflake,
};

const particleCounts: Record<Theme, number> = {
  rain: 60,
  sakura: 30,
  bubbles: 20,
  snow: 40,
};

export default function ParticleBackground() {
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = THEMES[themeIndex];
  const particles = useRef<Record<Theme, Particle[]>>({
    rain: generateParticles(particleCounts.rain),
    sakura: generateParticles(particleCounts.sakura),
    bubbles: generateParticles(particleCounts.bubbles),
    snow: generateParticles(particleCounts.snow),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setThemeIndex((i) => (i + 1) % THEMES.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const Comp = ParticleComponent[theme];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          className="absolute inset-0"
          style={{ background: themeColors[theme] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px]" />
          {/* Particles */}
          {particles.current[theme].map((p) => (
            <Comp key={p.id} p={p} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
