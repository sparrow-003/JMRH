import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, BookOpen, Sparkles, ShieldCheck, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = memo(() => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white pt-32 overflow-hidden font-ui">
      {/* Premium Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Deep Field Gradient */}
        <div className="absolute top-0 right-0 w-[70%] h-full bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.03)_0%,transparent_50%)]" />

        {/* Subtle Scholarly Lines */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear - gradient(to right, #102540 1px, transparent 1px), linear - gradient(to bottom, #102540 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }} />
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-8 h-[1px] bg-gold" />
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-gold/60">
            JMRH | Journal of Multidisciplinary Research Horizon
          </span>
          <div className="w-8 h-[1px] bg-gold" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-6xl font-black text-oxford tracking-tighter leading-[0.9] max-w-5xl mx-auto">
            Journal of <br />
            Multidisciplinary <br />
            Research Horizon
          </h1>

          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="font-serif italic text-xl md:text-2xl text-teal/80 leading-relaxed font-normal">
              Advancing Research, Mentoring Scholars, Upholding <br className="hidden md:block" />
              Academic Integrity
            </h2>

            <p className="font-sans text-sm md:text-base text-oxford/40 max-w-2xl mx-auto leading-loose">
              JMRH is committed to improving the quality, integrity, and impact of
              multidisciplinary research with the goal of contemporary towards a grand scholarly
              with excellence.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-col sm:flex-row items-center gap-12 pt-16"
        >
          <Button asChild className="group h-16 px-12 rounded-none bg-oxford text-white hover:bg-gold hover:text-white transition-all duration-700 shadow-2xl relative overflow-hidden">
            <Link to="/submit-paper" className="relative z-10 flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase">
              <span>Create New Manuscript</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </Button>

          <Link to="/guidelines" className="group flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-oxford/40 group-hover:text-gold transition-colors">Publication Manuscript Guidelines</span>
            <ArrowRight size={14} className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" />
          </Link>
        </motion.div>
      </div>

      {/* Cinematic Protocol Bar */}
      <div className="container max-w-[1400px] mx-auto px-6 pt-32 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-black/5">
          {[
            { label: "PUBLICATION", value: "Health Issue" },
            { label: "REPOSITORY", value: "Gentle Mind Review" },
            { label: "ACADEMY", value: "Open Source Board" },
            { label: "SCHOLARSHIP", value: "Council Elite Fellow" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-2 group flex flex-col items-center"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gold/40 group-hover:text-gold transition-colors">{item.label}</p>
              <p className="font-serif italic text-oxford/60 text-sm group-hover:text-oxford transition-colors">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
