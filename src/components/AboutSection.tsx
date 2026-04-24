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
          The <span className="title-transparent">Philosophy</span> of <br /> Creation
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
        
        <div className="space-y-8">
          <p className="text-white text-2xl md:text-3xl font-serif italic leading-tight">
            “How do we build systems that stay reliable while everything around them keeps changing?”
            <span className="block text-primary/80 text-lg md:text-xl font-sans not-italic mt-2 tracking-widest uppercase">— That’s the question that keeps me curious.</span>
          </p>
          
          <p className="text-muted-foreground text-xl leading-relaxed font-light">
            I enjoy working at the intersection of <span className="text-white font-medium">logic and building</span>, turning ideas into code, experimenting with new tools, and learning through projects. To me, computer science is both structured and creative: it’s about understanding systems, adapting to change, and solving problems in meaningful ways.
          </p>

          <p className="text-primary/90 text-lg md:text-xl font-serif italic tracking-wide">
            Always exploring, always building—this is me, <span className="text-white">Linxi</span>, a student at the University of Waterloo :)
          </p>
        </div>
      </motion.div>
    </section>
  );
}
