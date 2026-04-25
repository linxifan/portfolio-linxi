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

        <p className="text-muted-foreground text-xl leading-relaxed font-light">
          I believe that every pixel tells a story and every interaction creates an emotion.
          My journey started in the intersection of <span className="text-white">Design</span> and <span className="text-white">Technology</span>,
          where I found my voice in building immersive digital experiences.
        </p>
        <br />
        <p className="text-muted-foreground text-xl leading-relaxed font-light">
          Today, I focus on crafting interfaces that feel as natural as physical objects while
          harnessing the limitless potential of the digital medium. ✨
        </p>
      </motion.div>
    </section>
  );
}

