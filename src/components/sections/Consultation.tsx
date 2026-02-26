import { memo } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, ShieldCheck, Zap } from "lucide-react";

const Consultation = memo(() => {
    return (
        <section id="consultation" className="py-32 bg-bg-alt relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-oxford rounded-[60px] p-16 lg:p-24 relative overflow-hidden shadow-2xl"
                >
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

                    {/* Accent Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] -mr-[250px] -mt-[250px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px] -ml-[200px] -mb-[200px]" />

                    <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <p className="section-label text-gold">Institutional Access</p>
                                <h2 className="section-title text-white text-5xl lg:text-6xl font-bold leading-tight">
                                    Scholarly <br />
                                    <span className="italic academic-underline after:bg-white/20 py-1">Consultation Desk</span>
                                </h2>
                                <p className="text-white/60 text-xl leading-relaxed font-sans italic">
                                    Engage with our editorial board for guidance on indexing standards, research quality improvement, and publication-ready formatting.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {[
                                    { icon: Clock, label: "Response Window", value: "48 Academic Hours" },
                                    { icon: ShieldCheck, label: "Security", value: "Verified institutional comms" },
                                    { icon: Mail, label: "Correspondence", value: "editorial@jmrh.in" },
                                    { icon: Zap, label: "Efficiency", value: "Direct scholar support" }
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-3 group">
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5 text-gold group-hover:scale-125 transition-transform" />
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">{item.label}</p>
                                        </div>
                                        <p className="font-serif italic text-2xl text-white group-hover:text-gold transition-colors">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-12 rounded-[40px] space-y-10 group hover:border-gold/30 transition-all duration-700">
                            <h4 className="font-serif italic text-3xl text-white font-bold leading-snug">" Advancing research from local insight to global impact. "</h4>
                            <div className="space-y-6">
                                <div className="h-[1.5px] w-20 bg-gold/50" />
                                <p className="text-sm text-white/40 leading-[1.8] font-sans">
                                    Our consultation framework is designed specifically for PhD scholars and university researchers
                                    aiming to uphold the highest metrics of international scholarly excellence.
                                </p>
                            </div>
                            <button className="w-full h-16 bg-white text-oxford rounded-none text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold hover:text-white transition-all shadow-xl">
                                Initiate Consultation
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Consultation;
