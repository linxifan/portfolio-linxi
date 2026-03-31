import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bgRain from "@/assets/bg-rain.jpg";
import bgSakura from "@/assets/bg-sakura.jpg";
import bgBubbles from "@/assets/bg-bubbles.jpg";
import bgSnow from "@/assets/bg-snow.jpg";

type Theme = "rain" | "sakura" | "bubbles" | "snow";
const THEMES: Theme[] = ["rain", "sakura", "bubbles", "snow"];

const bgImages: Record<Theme, string> = {
  rain: bgRain,
  sakura: bgSakura,
  bubbles: bgBubbles,
  snow: bgSnow,
};

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  swayAmount: number;
}

function genParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 10 + 4,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.5 + 0.4,
    swayAmount: (Math.random() - 0.5) * 120,
  }));
}

/* ── Individual particle renderers ── */

const RainDrop = ({ p }: { p: Particle }) => (
  <motion.div
    className="absolute"
    style={{
      left: `${p.x}%`,
      top: -20,
      width: 2,
      height: p.size * 3,
      borderRadius: 2,
      background: "linear-gradient(180deg, transparent 0%, hsl(200 90% 85% / 0.8) 100%)",
      filter: "drop-shadow(0 0 3px hsl(200 80% 80% / 0.6))",
    }}
    animate={{ y: [0, window.innerHeight + 40] }}
    transition={{
      duration: p.duration * 0.3,
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
      top: -30,
      width: p.size * 1.2,
      height: p.size * 0.7,
      borderRadius: "50% 0 50% 0",
      background: `linear-gradient(135deg, hsl(${340 + p.id % 20} 70% 82%), hsl(${350 + p.id % 15} 60% 90%))`,
      boxShadow: "0 0 6px hsl(340 60% 85% / 0.4)",
    }}
    animate={{
      y: [0, window.innerHeight + 40],
      x: [0, p.swayAmount, -p.swayAmount * 0.6, p.swayAmount * 0.3],
      rotate: [0, 180, 360, 540],
    }}
    transition={{
      duration: p.duration * 1.2,
      delay: p.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const Bubble = ({ p }: { p: Particle }) => {
  const sz = p.size * 2;
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${p.x}%`,
        bottom: -40,
        width: sz,
        height: sz,
        background:
          "radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.5) 0%, hsl(0 0% 100% / 0.05) 60%, transparent 100%)",
        border: "1px solid hsl(0 0% 100% / 0.35)",
        boxShadow:
          "inset 0 -4px 8px hsl(280 60% 80% / 0.15), 0 0 12px hsl(200 60% 80% / 0.2)",
      }}
      animate={{
        y: [0, -(window.innerHeight + 60)],
        x: [0, p.swayAmount * 0.5, -p.swayAmount * 0.3],
        scale: [1, 1.1, 0.95, 1.05],
      }}
      transition={{
        duration: p.duration * 1.8,
        delay: p.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const Snowflake = ({ p }: { p: Particle }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${p.x}%`,
      top: -20,
      width: p.size,
      height: p.size,
      background: "radial-gradient(circle, hsl(0 0% 100% / 0.95) 30%, hsl(210 50% 95% / 0.4) 100%)",
      boxShadow: "0 0 8px hsl(210 60% 92% / 0.6)",
    }}
    animate={{
      y: [0, window.innerHeight + 40],
      x: [0, p.swayAmount * 0.7, -p.swayAmount * 0.5, p.swayAmount * 0.2],
      rotate: [0, 120, 240, 360],
    }}
    transition={{
      duration: p.duration * 1.4,
      delay: p.delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const ParticleRenderer: Record<Theme, React.FC<{ p: Particle }>> = {
  rain: RainDrop,
  sakura: SakuraPetal,
  bubbles: Bubble,
  snow: Snowflake,
};

const particleCounts: Record<Theme, number> = {
  rain: 50,
  sakura: 25,
  bubbles: 18,
  snow: 35,
};

export default function ParticleBackground() {
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = THEMES[themeIndex];

  const particles = useRef<Record<Theme, Particle[]>>({
    rain: genParticles(particleCounts.rain),
    sakura: genParticles(particleCounts.sakura),
    bubbles: genParticles(particleCounts.bubbles),
    snow: genParticles(particleCounts.snow),
  });

  useEffect(() => {
    const iv = setInterval(() => {
      setThemeIndex((i) => (i + 1) % THEMES.length);
    }, 15000);
    return () => clearInterval(iv);
  }, []);

  const Comp = ParticleRenderer[theme];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
        >
          {/* Real background image with blur */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgImages[theme]})`,
              filter: "blur(6px) brightness(0.55)",
              transform: "scale(1.1)",
            }}
          />

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-background/40" />

          {/* Animated particles on top — sharp, not blurred */}
          <div className="absolute inset-0">
            {particles.current[theme].map((p) => (
              <Comp key={p.id} p={p} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
