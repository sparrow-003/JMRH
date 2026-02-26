import { memo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, Lightbulb } from "lucide-react";

const Mentorship = memo(() => {
    return (
        <section id="mentorship" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid lg:grid-cols-2 gap-24 items-center"
                >
                    {/* Visual Side */}
                    <div className="relative group">
                        <div className="relative aspect-square bg-oxford rounded-[60px] overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-30 group-hover:scale-110 transition-transform duration-[2000ms]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-oxford to-transparent opacity-80" />
                            <div className="absolute inset-0 flex flex-col justify-end p-16 space-y-4">
                                <p className="section-label text-gold">Guidance Protocol</p>
                                <h3 className="font-serif text-4xl text-white font-bold italic">Building the future of <br />global scholarship.</h3>
                            </div>
                        </div>
                        {/* Decorative Floating Element */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold flex flex-col items-center justify-center rounded-[40px] shadow-2xl border-8 border-white group-hover:rotate-12 transition-transform duration-700">
                            <GraduationCap className="w-12 h-12 text-oxford" />
                            <p className="text-[10px] uppercase font-bold text-oxford tracking-widest mt-2">Expert Council</p>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <p className="section-label">PhD Support Initiative</p>
                            <h2 className="section-title text-5xl font-bold">
                                Scholarly <span className="italic academic-underline py-1">Mentorship</span> <br />
                                & Guidance
                            </h2>
                            <p className="text-text-muted text-lg leading-[1.8] font-sans">
                                JMRH provides structured guidance to early-career researchers and PhD scholars,
                                bridging the gap between raw research and high-impact international publication.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: Users, title: "Specialized Peer Advice", text: "Direct insights from seasoned editors to refine methodology and discourse." },
                                { icon: Lightbulb, title: "Innovative Vetting", text: "Propelling research towards contemporary interdisciplinary relevance." },
                                { icon: BookOpen, title: "Manuscript Refinement", text: "Iterative feedback loops designed to meet elite international standards." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-8 group">
                                    <div className="w-14 h-14 bg-bg-alt flex items-center justify-center shrink-0 rounded-2xl group-hover:bg-teal transition-all duration-500">
                                        <item.icon className="w-6 h-6 text-teal group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-serif text-2xl text-oxford font-bold group-hover:text-teal transition-colors leading-tight">{item.title}</h4>
                                        <p className="text-sm text-text-muted font-sans italic opacity-80 leading-relaxed font-bold">{item.text}</p>
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

export default Mentorship;
