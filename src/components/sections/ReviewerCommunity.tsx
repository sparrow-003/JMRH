import { memo } from "react";
import { motion } from "framer-motion";
import { UserCheck, ShieldCheck, Microscope, Award } from "lucide-react";

const criteria = [
    { icon: Award, title: "Academic Expertise", text: "Specialized knowledge in specific disciplinary fields." },
    { icon: Microscope, title: "Research Experience", text: "A proven track record of scholarly publications and inquiry." },
    { icon: ShieldCheck, title: "Ethical Commitment", text: "Strict adherence to fairness, objectivity, and confidentiality." },
];

const ReviewerCommunity = memo(() => {
    return (
        <section id="reviewers" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid lg:grid-cols-2 gap-24 items-center"
                >
                    {/* Content Side */}
                    <div className="space-y-12 order-2 lg:order-1">
                        <div className="space-y-6">
                            <p className="section-label">Scholarly Council</p>
                            <h2 className="section-title text-5xl font-bold">
                                Reviewer Community & <br />
                                <span className="italic academic-underline py-1">Academic Integrity</span>
                            </h2>
                            <p className="text-text-muted text-lg leading-[1.8] font-sans">
                                JMRH is supported by a diverse reviewer community of specialized experts who play
                                a vital role in safeguarding research quality and academic transparency.
                            </p>
                        </div>

                        <div className="space-y-10">
                            {criteria.map((item, idx) => (
                                <div key={idx} className="flex gap-8 group">
                                    <div className="w-16 h-16 bg-bg-alt border border-border flex items-center justify-center shrink-0 rounded-2xl group-hover:bg-teal transition-all duration-500 shadow-sm group-hover:shadow-teal/20">
                                        <item.icon className="w-8 h-8 text-teal group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-serif text-2xl text-oxford font-bold group-hover:text-teal transition-colors leading-tight">{item.title}</h4>
                                        <p className="text-sm text-text-muted font-sans italic opacity-80 leading-relaxed font-bold">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Institutional Side */}
                    <div className="order-1 lg:order-2 bg-oxford p-16 lg:p-24 rounded-[60px] relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-[3000ms]">
                            <UserCheck className="w-full h-full scale-150 rotate-12 text-white" />
                        </div>

                        <div className="relative z-10 space-y-12">
                            <div className="space-y-4">
                                <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold">Protocol</p>
                                <h3 className="font-serif text-5xl text-white italic font-bold">Double-Blind <br />Standard</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="h-[2px] w-16 bg-gold/50" />
                                <p className="font-serif italic text-2xl text-white/80 leading-relaxed">" Safeguarding research quality through absolute objective evaluation and anonymity. "</p>
                            </div>

                            <div className="pt-8">
                                <button className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold hover:text-white transition-all underline decoration-gold/30 underline-offset-[12px] hover:decoration-white font-ui">
                                    Enlist as Reviewer
                                </button>
                            </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gold/20 m-12 group-hover:m-8 transition-all duration-1000" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default ReviewerCommunity;
