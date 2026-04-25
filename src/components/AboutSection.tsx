import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="min-h-[60vh] flex flex-col md:flex-row items-center py-32 px-12 gap-16 overflow-hidden">
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Chapter 01</span>
        <h2 className="text-5xl md:text-7xl font-serif mb-8 italic">
          The <span className="title-transparent">Architecture</span> of <br /> Logic
        </h2>
      </motion.div>

      <motion.div
        className="flex-1 glass-card p-12 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/30 rounded-tr-3xl" />

        <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light italic mb-8">
          "How do we build systems that stay reliable while everything around them keeps changing?"
        </p>
        
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light mb-8">
          That’s the question that keeps me curious. 
          I enjoy working at the intersection of <span className="text-white">logic</span> and <span className="text-white">building</span>—turning ideas into code, 
          experimenting with new tools, and learning through projects.
        </p>

        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light mb-8">
          To me, computer science is both structured and creative: it’s about understanding systems, 
          adapting to change, and solving problems in meaningful ways.
        </p>

        <p className="text-primary text-xl font-medium tracking-wide">
          Always exploring, always building—this is me, Linxi, a student at the University of Waterloo :)
        </p>
      </motion.div>
    </section>
  );
}

