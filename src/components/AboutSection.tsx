import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <motion.div
        className="glass-card p-8 md:p-12 max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ fontFamily: "var(--font-display)" }}>
          ✨ About Me
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed text-center">
          Write a short summary about yourself here. Talk about your passions, what drives you, 
          your academic background, and what you're looking for. This is your elevator pitch — 
          make it memorable! 🌸
        </p>
      </motion.div>
    </section>
  );
}
