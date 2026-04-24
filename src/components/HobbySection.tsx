import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const hobbies = [
  { label: "Art", color: "#ff7eb3", speed: 0.15, y: "10%" },
  { label: "Music", color: "#7afcff", speed: -0.12, y: "28%" },
  { label: "Gaming", color: "#feffb7", speed: 0.2, y: "46%" },
  { label: "Travel", color: "#95e1d3", speed: -0.18, y: "64%" },
  { label: "Reading", color: "#f38181", speed: 0.1, y: "82%" },
  { label: "Coding", color: "#a8e6cf", speed: -0.22, y: "94%" },
];

function MeteorHobby({ hobby, index }: { hobby: typeof hobbies[0]; index: number }) {
  const [pos, setPos] = useState(Math.random() * 100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let frame: number;
    const update = () => {
      setPos(prev => {
        let next = prev + (isHovered ? hobby.speed * 0.2 : hobby.speed);
        if (next > 120) return -20;
        if (next < -20) return 120;
        return next;
      });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isHovered, hobby.speed]);

  const triggerAtmosphere = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600 + index * 100, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);

    if (hobby.label === "Travel" || hobby.label === "Coding") {
      window.dispatchEvent(new CustomEvent("trigger-big-meteor"));
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer flex items-center gap-4 py-4 px-8 z-20 group"
      style={{
        left: `${pos}%`,
        top: hobby.y,
        transform: "translateY(-50%)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerAtmosphere}
    >
      {/* Meteor Head & Trail */}
      <div className="relative">
        <motion.div 
          className="w-2 h-2 rounded-full relative z-10"
          style={{ backgroundColor: hobby.color, boxShadow: `0 0 20px ${hobby.color}` }}
          animate={{ scale: isHovered ? 2 : 1 }}
        />
        {/* Tail Trail */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 right-0 h-[1px] opacity-30"
          style={{ 
            width: isHovered ? "200px" : "150px", 
            background: `linear-gradient(to left, ${hobby.color}, transparent)`,
            transform: hobby.speed > 0 ? "translateX(-100%)" : "translateX(100%) rotate(180deg)",
            transition: "width 0.5s ease"
          }} 
        />
      </div>

      {/* Label */}
      <motion.span
        className="text-lg md:text-2xl font-serif italic tracking-widest uppercase origin-left"
        style={{ 
          color: hobby.color,
          textShadow: isHovered ? `0 0 20px ${hobby.color}` : "none"
        }}
        animate={{ 
          opacity: isHovered ? 1 : 0.4,
          filter: isHovered ? "blur(0px)" : "blur(1px)",
          x: isHovered ? 10 : 0
        }}
      >
        {hobby.label}
      </motion.span>

      {/* Background Glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: hobby.color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HobbySection() {
  return (
    <section id="hobbies" className="min-h-screen flex flex-col items-center justify-center py-32 px-12 relative overflow-hidden">
      <motion.div 
        className="text-center mb-[40vh] z-10 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-6xl md:text-8xl font-serif italic mb-4">Nebula <span className="title-transparent">Passions</span></h2>
        <p className="text-muted-foreground tracking-[0.4em] uppercase text-xs">Interests drifting across my infinity</p>
      </motion.div>

      {/* Drifting Field */}
      <div className="absolute inset-0 z-0">
        {hobbies.map((h, i) => (
          <MeteorHobby key={h.label} hobby={h} index={i} />
        ))}
      </div>

      {/* Ambient Depth Fog */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/5 blur-[150px] rounded-full scale-150" />
      </div>
    </section>
  );
}
