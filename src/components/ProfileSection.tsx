import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Mail, Linkedin, Github, FileDown } from "lucide-react";
import React, { useRef, useState } from "react";

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:linxifan24@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/linxi-fan" },
  { icon: Github, label: "GitHub", href: "https://github.com/linxifan" },
];

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function ProfileSection() {
  return (
    <section id="profile" className="min-h-screen flex flex-col md:flex-row items-center justify-between pt-48 pb-32 px-12 gap-12 relative">
      {/* Background large text decorative */}
      <div className="absolute -left-20 top-1/4 title-transparent text-[15rem] font-serif select-none pointer-events-none opacity-10 -rotate-12">
        Creative
      </div>

      {/* Avatar on the Left */}
      <motion.div
        className="relative z-10 w-full md:w-1/3 flex justify-start"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative group">
          <motion.div
            className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden glass-card p-2 relative z-10"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-full h-full rounded-xl bg-muted overflow-hidden flex items-center justify-center">
              <img 
                src={`${import.meta.env.BASE_URL}avatar.jpg`} 
                alt="Linxi Fan" 
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
          </motion.div>
          {/* Decorative frame */}
          <div className="absolute -inset-4 border border-white/5 rounded-3xl -z-0 group-hover:scale-105 transition-transform duration-500" />
        </div>
      </motion.div>

      {/* Content in the Middle/Right */}
      <div className="flex-1 flex flex-col items-start md:pl-12 md:pt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-7xl md:text-9xl font-serif mb-4 leading-none tracking-tight">
            <span className="flex items-center gap-4 italic text-primary/80 text-4xl md:text-5xl border-primary mb-4">
              <span className="w-1 h-12 bg-primary cursor-blink" />
              Hello, I'm
            </span>
            Linxi <br />
            <span className="title-transparent hover:text-white/10">Fan</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light tracking-[0.2em] uppercase mb-12 max-w-xl">
            University of Waterloo 2A Bachelor of Computer Science
          </p>
        </motion.div>

        {/* Social links - Asymmetric placement */}
        <div className="flex flex-wrap gap-8 items-center">
          {socialLinks.map((link, i) => (
            <Magnetic key={link.label}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <link.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-xs uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0 font-bold">
                  {link.label}
                </span>
              </motion.a>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* Side decorative element */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 vertical-text text-[10px] tracking-[0.5em] text-muted-foreground/30 uppercase [writing-mode:vertical-rl]">
        Scroll to discover the universe — 2026 Portfolio
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}} />
    </section>
  );
}
