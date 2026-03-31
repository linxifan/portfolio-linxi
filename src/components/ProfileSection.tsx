import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileDown } from "lucide-react";

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:your@email.com" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: FileDown, label: "Resume", href: "#" },
];

export default function ProfileSection() {
  return (
    <section id="profile" className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        className="glass-card p-8 md:p-12 max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Avatar placeholder */}
        <motion.div
          className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-primary/40 overflow-hidden bg-muted flex items-center justify-center"
          whileHover={{ scale: 1.05, borderColor: "hsl(330 70% 72%)" }}
        >
          <span className="text-4xl">📷</span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Your Name
        </h1>
        <p className="text-muted-foreground text-lg mb-6">Your Title / Tagline</p>

        {/* Social links */}
        <div className="flex justify-center gap-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 transition-colors group"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              title={link.label}
            >
              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
