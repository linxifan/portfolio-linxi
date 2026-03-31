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
      className="fixed left-0 top-0 h-full z-50 flex flex-col items-center justify-center gap-2 px-2"
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <div className="glass-card py-4 px-2 flex flex-col gap-3">
        {sections.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-primary/20"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            title={s.label}
          >
            <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="absolute left-14 whitespace-nowrap text-xs font-medium bg-card/90 backdrop-blur px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-foreground">
              {s.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
