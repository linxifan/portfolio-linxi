import { motion } from "framer-motion";

export default function AwardsSection() {
  return (
    <section id="awards" className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🏆 Awards
      </motion.h2>

      <motion.div
        className="glass-card p-8 md:p-12 max-w-2xl w-full space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-2xl">🌟</span>
            <div>
              <h3 className="font-semibold text-foreground">Award Title {i}</h3>
              <p className="text-sm text-muted-foreground">Organization • Year</p>
              <p className="text-sm text-muted-foreground mt-1">
                Brief description of the award and what it meant to you.
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
