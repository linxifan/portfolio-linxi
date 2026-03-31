import { motion } from "framer-motion";

const hobbies = [
  { emoji: "🎨", label: "Art" },
  { emoji: "🎵", label: "Music" },
  { emoji: "📚", label: "Reading" },
  { emoji: "🌱", label: "Gardening" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "✈️", label: "Travel" },
];

export default function HobbySection() {
  return (
    <section id="hobbies" className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 pb-32">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        💖 My Hobbies
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-lg">
        {hobbies.map((h, i) => (
          <motion.div
            key={h.label}
            className="glass-card w-24 h-24 flex flex-col items-center justify-center gap-2 cursor-default"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring" }}
            whileHover={{
              scale: 1.15,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 },
            }}
          >
            <span className="text-3xl">{h.emoji}</span>
            <span className="text-xs text-muted-foreground">{h.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
