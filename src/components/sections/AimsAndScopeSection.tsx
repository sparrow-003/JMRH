import { memo } from "react";
import { motion } from "framer-motion";
import { Target, BookOpen, BookCopy, Info, CheckCircle2, ArrowRight } from "lucide-react";

const aims = [
  "Mentor scholars to produce high-quality academic research.",
  "Moderate the rigorous peer-review and ethical publishing standards.",
  "Form social multidisciplinary and socially relevant research.",
  "Support emerging researchers through structural guidance.",
  "Ensure transparent and equitable scholarly collaboration.",
];

const disciplines = [
  "COMMERCE & MANAGEMENT",
  "ECONOMICS & FINANCE",
  "EDUCATION & PSYCHOLOGY",
  "SCIENCE & TECHNOLOGY",
  "ENVIRONMENTAL & SUSTAINABILITY",
  "DIGITAL TRANSFORMATION & INNOVATION",
  "SOCIAL SCIENCES & HUMANITIES",
];

const AimsAndScopeSection = memo(() => {
  return (
    <section id="scope" className="py-32 bg-white relative overflow-hidden font-ui">
      <div className="container max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto space-y-6">
          <div className="section-label justify-center">
            <span className="w-12 h-[1px] bg-gold" />
            SCHOLARLY SCOPE
            <span className="w-12 h-[1px] bg-gold" />
          </div>
          <h2 className="section-title text-5xl md:text-6xl">
            Aims and <span className="italic font-light">Research Scope</span>
          </h2>
          <p className="text-oxford/40 font-sans text-base leading-relaxed max-w-2xl mx-auto">
            JMRH is committed to improving the quality, integrity, and impact of
            multidisciplinary research with the goal of contemporary towards a grand scholarly
            with excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* Strategic Aims (Left) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-oxford flex items-center justify-center rotate-45 shadow-lg">
                <Target className="w-4 h-4 text-gold -rotate-45" />
              </div>
              <h3 className="font-serif text-2xl font-black text-oxford">The Strategic Aims</h3>
            </div>

            <div className="space-y-4">
              {aims.map((aim, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-blue-50/20 border border-blue-100/50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-6 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 group-hover:text-white" />
                  </div>
                  <p className="font-sans text-sm text-oxford/70 group-hover:text-oxford transition-colors">
                    {aim}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call for Disciplines (Right) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-blue-100 bg-blue-50/50 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">T</span>
              </div>
              <h3 className="font-serif text-2xl font-black text-oxford">Call for Disciplines</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {disciplines.map((discipline, index) => (
                <motion.div
                  key={index}
                  className="p-5 border border-black/5 flex items-center justify-between hover:border-gold/30 hover:shadow-lg transition-all"
                >
                  <span className="text-[10px] font-black tracking-widest text-oxford/70">{discipline}</span>
                  <ArrowRight size={12} className="text-gold" />
                </motion.div>
              ))}
            </div>

            {/* Institutional Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-12 bg-oxford p-10 rounded-3xl relative overflow-hidden"
            >
              <div className="flex items-start gap-6 relative z-10">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <Info className="w-5 h-5 text-gold" />
                </div>
                <div className="space-y-3">
                  <h4 className="font-serif italic text-xl text-gold">Institutional Note</h4>
                  <p className="text-xs font-sans leading-relaxed text-white/50 max-w-xl">
                    JMRH follows ISSN India compliance standards, prioritizing verifiable, high-impact interdisciplinary research
                    that undergoes rigorous scholarly vetting and quality enhancement with absolute integrity.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AimsAndScopeSection;
