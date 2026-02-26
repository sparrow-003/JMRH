import { memo } from "react";
import { motion } from "framer-motion";
import { Search, EyeOff, CheckSquare, Calendar, HelpCircle } from "lucide-react";

const steps = [
    { icon: Search, title: "Initial Screen", text: "Scope, quality, and plagiarism compliance." },
    { icon: EyeOff, title: "Blind Review", text: "Anonymous author and reviewer identities." },
    { icon: CheckSquare, title: "Refined Review", text: "Detailed editorial feedback and revision." },
    { icon: Calendar, title: "Timeline Gate", text: "Initial decision within 4-6 weeks." },
];

const ReviewPolicy = memo(() => {
    return (
        <section id="policy" className="py-32 bg-white relative">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.99 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-24"
                >
                    {/* Header */}
                    <div className="max-w-4xl space-y-6">
                        <p className="section-label">Transparency Protocol</p>
                        <h2 className="section-title text-5xl">
                            Double-Blind <br />
                            <span className="italic academic-underline py-1">Peer Review Standards</span>
                        </h2>
                        <p className="text-text-muted text-lg leading-[1.8] font-sans italic opacity-80">
                            JMRH ensures that every manuscript is evaluated fairly, objectively, and
                            confidentially through a structured review ecosystem governed by global ethics.
                        </p>
                    </div>

                    {/* Timeline / Process Steps */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-8 group p-8 bg-bg-alt rounded-2xl hover:bg-white border border-transparent hover:border-gold hover:shadow-xl transition-all duration-700"
                            >
                                <div className="w-16 h-16 bg-white border border-border flex items-center justify-center rounded-xl group-hover:bg-oxford transition-all duration-700 shadow-sm">
                                    <step.icon className="w-6 h-6 text-teal group-hover:text-gold transition-colors" />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-serif text-2xl text-oxford font-bold leading-tight">{step.title}</h4>
                                    <p className="text-sm text-text-muted leading-relaxed font-sans opacity-80">{step.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Appeal Policy Callout */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="p-12 bg-white border-2 border-oxford/5 rounded-3xl flex flex-col md:flex-row gap-12 items-center justify-between shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-gold" />
                        <div className="space-y-4 relative z-10 flex-1">
                            <div className="flex items-center gap-4">
                                <HelpCircle className="w-8 h-8 text-gold" />
                                <h4 className="font-serif text-3xl text-oxford italic font-bold">Formal Appeal Policy</h4>
                            </div>
                            <p className="text-text-muted font-sans text-lg max-w-2xl italic">
                                Authors have the unconditional right to appeal editorial decisions based on sound
                                academic grounds and methodological integrity.
                            </p>
                        </div>
                        <button className="whitespace-nowrap bg-oxford text-white px-10 py-5 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-teal transition-all duration-500 shadow-lg font-ui">
                            Review Guidelines
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
});

export default ReviewPolicy;
