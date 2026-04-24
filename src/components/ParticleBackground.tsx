import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

import bgRain from "@/assets/bg-rain.jpg";
import bgSakura from "@/assets/bg-sakura.jpg";
import bgBubbles from "@/assets/bg-bubbles.jpg";
import bgSnow from "@/assets/bg-snow.jpg";

type Theme = "rain" | "sakura" | "bubbles" | "snow" | "galaxy";
const THEMES: Theme[] = ["rain", "sakura", "bubbles", "snow", "galaxy"];

const bgImages: Record<Theme, string> = {
  rain: bgRain,
  sakura: bgSakura,
  bubbles: bgBubbles,
  snow: bgSnow,
  galaxy: "none",
};

interface Particle {
  id: number;
  x: number;
  y?: number;
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

function useMousePosition() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
}

const ParticleWrapper = ({ p, children, mouseX, mouseY }: { p: Particle; children: React.ReactNode; mouseX: any; mouseY: any }) => {
  const x = useTransform(mouseX, (v) => {
    const screenX = (p.x / 100) * window.innerWidth;
    const dist = v - screenX;
    if (Math.abs(dist) < 200) {
      return (dist / 200) * -30;
    }
    return 0;
  });
  
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  return <motion.div style={{ x: springX }} className="absolute">{children}</motion.div>;
};

const BigMeteor = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setActive(true);
      setTimeout(() => setActive(false), 2500);
    };
    window.addEventListener("trigger-big-meteor", trigger);
    return () => window.removeEventListener("trigger-big-meteor", trigger);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-[1000]"
          style={{
            top: "20%",
            left: "-500px",
            width: "1200px",
            rotate: "155deg",
            filter: "blur(4px)",
          }}
          initial={{ x: -1000, opacity: 0 }}
          animate={{ x: 3000, opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, ease: "circIn" }}
        />
      )}
    </AnimatePresence>
  );
};

const Meteor = () => {
  const [meteor, setMeteor] = useState<{ id: number; top: number; left: number } | null>(null);

  useEffect(() => {
    const triggerMeteor = () => {
      setMeteor({
        id: Date.now(),
        top: Math.random() * 40,
        left: Math.random() * 80 + 10,
      });
      setTimeout(() => setMeteor(null), 2000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) triggerMeteor();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {meteor && (
        <motion.div
          key={meteor.id}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            width: "300px",
            rotate: "135deg",
            filter: "blur(1px)",
            zIndex: 0,
          }}
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 1000, opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, ease: "linear" }}
        />
      )}
    </AnimatePresence>
  );
};

const StarDust = ({ count = 40 }: { count?: number }) => {
  const stars = useRef(genParticles(count));
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      {stars.current.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${Math.random() * 100}%`,
            width: 1,
            height: 1,
            boxShadow: "0 0 4px #fff",
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 100, 100, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 40 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const RainDrop = (props: any) => (
  <ParticleWrapper {...props}>
    <motion.div
      style={{ left: `${props.p.x}vw`, top: -20, width: 2, height: props.p.size * 3, borderRadius: 2, background: "linear-gradient(180deg, transparent 0%, hsl(200 90% 85% / 0.8) 100%)", filter: "drop-shadow(0 0 3px hsl(200 80% 80% / 0.6))" }}
      animate={{ y: [0, window.innerHeight + 40] }}
      transition={{ duration: props.p.duration * 0.3, delay: props.p.delay, repeat: Infinity, ease: "linear" }}
    />
  </ParticleWrapper>
);

const SakuraPetal = (props: any) => (
  <ParticleWrapper {...props}>
    <motion.div
      style={{ left: `${props.p.x}vw`, top: -30, width: props.p.size * 1.2, height: props.p.size * 0.7, borderRadius: "50% 0 50% 0", background: `linear-gradient(135deg, hsl(${340 + props.p.id % 20} 70% 82%), hsl(${350 + props.p.id % 15} 60% 90%))`, boxShadow: "0 0 6px hsl(340 60% 85% / 0.4)" }}
      animate={{ y: [0, window.innerHeight + 40], x: [0, props.p.swayAmount, -props.p.swayAmount * 0.6, props.p.swayAmount * 0.3], rotate: [0, 180, 360, 540] }}
      transition={{ duration: props.p.duration * 1.2, delay: props.p.delay, repeat: Infinity, ease: "easeInOut" }}
    />
  </ParticleWrapper>
);

const Bubble = (props: any) => (
  <ParticleWrapper {...props}>
    <motion.div
      className="absolute rounded-full"
      style={{ left: `${props.p.x}vw`, bottom: -40, width: props.p.size * 2, height: props.p.size * 2, background: "radial-gradient(circle at 30% 25%, hsl(0 0% 100% / 0.5) 0%, hsl(0 0% 100% / 0.05) 60%, transparent 100%)", border: "1px solid hsl(0 0% 100% / 0.35)", boxShadow: "inset 0 -4px 8px hsl(280 60% 80% / 0.15), 0 0 12px hsl(200 60% 80% / 0.2)" }}
      animate={{ y: [0, -(window.innerHeight + 60)], x: [0, props.p.swayAmount * 0.5, -props.p.swayAmount * 0.3], scale: [1, 1.1, 0.95, 1.05] }}
      transition={{ duration: props.p.duration * 1.8, delay: props.p.delay, repeat: Infinity, ease: "easeInOut" }}
    />
  </ParticleWrapper>
);

const Snowflake = (props: any) => (
  <ParticleWrapper {...props}>
    <motion.div
      style={{ left: `${props.p.x}vw`, top: -30, width: props.p.size * 1.8 + 6, height: props.p.size * 1.8 + 6, opacity: props.p.opacity }}
      animate={{ y: [0, window.innerHeight + 60], x: [0, props.p.swayAmount * 0.8, -props.p.swayAmount * 0.6, props.p.swayAmount * 0.3], rotate: [0, 180, 360] }}
      transition={{ duration: props.p.duration * 1.6, delay: props.p.delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {props.p.id % 3 === 0 ? (
        <svg viewBox="0 0 100 100" width={props.p.size * 1.8 + 6} height={props.p.size * 1.8 + 6}>
          <text x="50" y="65" textAnchor="middle" fontSize="70" fill="white" style={{ filter: "drop-shadow(0 0 4px hsl(210 80% 90% / 0.8))" }}>❄</text>
        </svg>
      ) : (
        <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, hsl(0 0% 100% / 0.95) 20%, hsl(210 60% 95% / 0.5) 70%, transparent 100%)", boxShadow: "0 0 10px hsl(210 60% 95% / 0.7)" }} />
      )}
    </motion.div>
  </ParticleWrapper>
);

export default function ParticleBackground() {
  const [themeIndex, setThemeIndex] = useState(4);
  const theme = THEMES[themeIndex];
  const { mouseX, mouseY } = useMousePosition();

  const particles = useRef<Record<Theme | "galaxy", Particle[]>>({
    rain: genParticles(30),
    sakura: genParticles(15),
    bubbles: genParticles(12),
    snow: genParticles(20),
    galaxy: [],
  });

  useEffect(() => {
    const iv = setInterval(() => {
      setThemeIndex((i) => (i + 1) % THEMES.length);
    }, 20000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050510]">
      <StarDust />
      <Meteor />
      <BigMeteor />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
        >
          {theme !== "galaxy" && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${bgImages[theme as Theme]})`, filter: "blur(2px) brightness(0.4)", transform: "scale(1.1)" }}
            />
          )}

          <div className="absolute inset-0 bg-background/40" />

          <div className="absolute inset-0">
            {theme === "rain" && particles.current.rain.map(p => <RainDrop key={p.id} p={p} mouseX={mouseX} mouseY={mouseY} />)}
            {theme === "sakura" && particles.current.sakura.map(p => <SakuraPetal key={p.id} p={p} mouseX={mouseX} mouseY={mouseY} />)}
            {theme === "bubbles" && particles.current.bubbles.map(p => <Bubble key={p.id} p={p} mouseX={mouseX} mouseY={mouseY} />)}
            {theme === "snow" && particles.current.snow.map(p => <Snowflake key={p.id} p={p} mouseX={mouseX} mouseY={mouseY} />)}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
