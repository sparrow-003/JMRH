import { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Library, ShieldCheck, Globe } from "lucide-react";

const commitments = [
  {
    icon: Sparkles,
    title: "High-Quality Publishing",
    description: "Committed to publishing original, high-quality research that contributes to global knowledge.",
  },
  {
    icon: Library,
    title: "Scholarly Support",
    description: "Providing structured guidance to researchers, PhD scholars, and academicians at every stage.",
  },
  {
    icon: ShieldCheck,
    title: "Research Integrity",
    description: "Strict adherence to UGC and COPE guidelines, ensuring the highest ethical standards.",
  },
  {
    icon: Globe,
    title: "Multidisciplinary Bridge",
    description: "Connecting research theory and academic practice with real-world application across disciplines.",
  },
];

const AboutSection = memo(() => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden font-ui">
      <div className="container max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">

          {/* Content (Left) */}
          <div className="lg:col-span-7 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-8"
            >
              <div className="section-label">
                <span className="w-12 h-[1px] bg-gold" />
                GET THE FUTURE START
              </div>
              <h2 className="section-title text-5xl md:text-6xl font-black text-oxford leading-tight">
                Strengthening the <br />
                Quality & Impact of Research
              </h2>
              <p className="text-oxford/60 font-sans text-base leading-relaxed max-w-2xl">
                JMRH is committed to improving the quality, integrity, and impact of
                multidisciplinary research with the goal of contemporary towards a grand scholarly
                with excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {commitments.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="p-8 bg-blue-50/30 rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-blue-100"
                >
                  <div className="w-12 h-12 bg-blue-100/50 flex items-center justify-center rounded-xl mb-6 group-hover:bg-gold/10 transition-colors">
                    <item.icon className="w-5 h-5 text-blue-600 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-oxford">{item.title}</h3>
                    <p className="font-sans text-xs text-oxford/50 leading-loose">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Card (Monolith) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] bg-oxford rounded-[2rem] overflow-hidden flex items-center justify-center shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 grayscale opacity-40 bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-oxford/40" />

              <div className="relative z-10 p-12 text-center flex flex-col items-center gap-12">
                {/* Gold Diamond Icon */}
                <div className="w-16 h-16 border border-gold/40 rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  <span className="text-gold font-serif text-xl -rotate-45 font-bold">id.</span>
                </div>

                <div className="space-y-8">
                  <h3 className="font-serif italic text-2xl md:text-3xl text-white leading-relaxed">
                    " Empowering scholars to cross the frontiers of knowledge "
                  </h3>
                  <div className="space-y-2 pt-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">FOUNDATION EXCELLENCE</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">ACADEMIC PROTOCOL</p>
                  </div>
                </div>
              </div>

              {/* Borders */}
              <div className="absolute inset-8 border border-white/5 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default AboutSection;
