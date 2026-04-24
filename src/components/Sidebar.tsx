import { motion } from "framer-motion";
import { User, FileText, Briefcase, BookOpen, Award, Heart } from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "about", label: "About", icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: BookOpen },
  { id: "awards", label: "Awards", icon: Award },
  { id: "hobbies", label: "Hobbies", icon: Heart },
];

export default function Sidebar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed left-6 top-1/2 -translate-y-1/2 h-auto z-50 flex flex-col items-center justify-center gap-1"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", damping: 20 }}
    >
      <div className="glass-panel py-8 px-2 flex flex-col gap-6 rounded-full border-white/5 bg-white/2 shadow-2xl">
        {sections.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            
            {/* Tooltip */}
            <div className="absolute left-16 px-4 py-2 rounded-xl bg-background/80 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground">
                {s.label}
              </span>
            </div>
            
            {/* Indicators */}
            <div className="absolute -left-1 w-1 h-0 bg-primary group-hover:h-4 rounded-full transition-all duration-300" />
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
