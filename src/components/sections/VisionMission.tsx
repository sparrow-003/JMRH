import { memo } from "react";
import { motion } from "framer-motion";
import { Eye, GraduationCap, Globe, BookOpen } from "lucide-react";

const VisionMission = memo(() => {
    return (
        <section id="vision" className="py-32 bg-oxford text-white relative overflow-hidden">
            {/* Premium Background Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-gold/40 rounded-full -mr-[300px] -mt-[300px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] border border-gold/40 rounded-full -ml-[200px] -mb-[200px]" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.99 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="grid lg:grid-cols-2 gap-24 items-start"
                >
                    {/* Vision Content */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/5 border border-gold/30 flex items-center justify-center rounded-2xl rotate-45">
                                <Eye className="w-8 h-8 text-gold -rotate-45" />
                            </div>
                            <h2 className="section-label text-gold tracking-[0.5em]">Academic Vision</h2>
                        </div>

                        <h3 className="section-title text-white text-5xl lg:text-6xl leading-[1.1] font-bold">
                            Establishing a trusted <br />
                            <span className="italic academic-underline after:bg-white/30 py-1">Scholarly Platform</span> <br />
                            for global evolution.
                        </h3>

                        <p className="text-white/60 font-sans leading-[1.8] text-xl max-w-xl italic">
                            We envision a global scholarly community where multidisciplinary research is
                            not just published, but utilized to solve contemporary societal challenges
                            through ethical and methodologically sound inquiry.
                        </p>

                        <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10">
                            <div className="space-y-2">
                                <p className="text-gold font-serif text-3xl font-bold italic underline decoration-gold/20">Global Impact</p>
                                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Mission Metric 01</p>
                            </div>
                            <div className="space-y-2 border-l border-white/10 pl-8">
                                <p className="text-gold font-serif text-3xl font-bold italic underline decoration-gold/20">Open Access</p>
                                <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Mission Metric 02</p>
                            </div>
                        </div>
                    </div>

                    {/* Mission List Block */}
                    <div className="bg-white/5 p-12 lg:p-16 border border-white/10 rounded-[40px] relative overflow-hidden group shadow-2xl">
                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms]" />
                        <h4 className="font-serif italic text-3xl text-gold pb-10 border-b border-white/10 font-bold mb-12 flex items-center gap-4">
                            <BookOpen className="w-8 h-8 opacity-40" />
                            The Mission Path
                        </h4>

                        <div className="space-y-12">
                            {[
                                { icon: GraduationCap, title: "Scholar Mentorship", text: "To mentor scholars in producing high-quality academic research that meets international standards." },
                                { icon: Globe, title: "Rigorous Standards", text: "To maintain absolute peer-review and ethical publishing standards as per COPE guidelines." },
                                { icon: Eye, title: "Interdisciplinary Impact", text: "To encourage research that addresses socially relevant and complex global challenges." },
                                { icon: BookOpen, title: "Academic Guidance", text: "To support emerging researchers through structured and transparent academic mentoring." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-8 group/item">
                                    <span className="text-gold/40 font-serif text-4xl italic group-hover/item:text-gold transition-colors duration-500">{String(idx + 1).padStart(2, '0')}</span>
                                    <div className="space-y-2">
                                        <h5 className="font-serif text-2xl text-white group-hover/item:text-gold transition-colors font-bold">{item.title}</h5>
                                        <p className="text-sm text-white/40 font-sans leading-relaxed group-hover/item:text-white/70 transition-colors">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default VisionMission;
