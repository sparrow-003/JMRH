import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Send, Mail } from "lucide-react";

const CTASection = memo(() => {
  return (
    <section className="py-32 bg-oxford relative overflow-hidden font-ui">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-block mb-12 px-6 py-2 border border-white/10 rounded-full"
        >
          <span className="text-[9px] uppercase tracking-[0.6em] text-gold/80 font-bold">RESEARCH IN PROGRESS</span>
        </motion.div>

        <div className="space-y-10 max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight">
            Refining the <span className="italic text-gold">Scientific Frontiers</span> of Knowledge
          </h2>

          <p className="font-sans text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Join an international council of researchers dedicated to upholding
            the absolute integrity of scholarly inquiry.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-10">
            <Button
              asChild
              className="h-16 px-12 bg-gold text-oxford rounded-none font-black tracking-[0.3em] uppercase text-[10px] hover:bg-white hover:text-oxford transition-all duration-500 shadow-2xl group"
            >
              <Link to="/submit-paper" className="flex items-center gap-3">
                <span>Submit Manuscript</span>
              </Link>
            </Button>

            <Link to="/guidelines" className="group flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 group-hover:text-gold transition-colors">Editorial Guidelines</span>
              <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CTASection;
