import { memo } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Fingerprint, Lock, ShieldCheck, FileWarning } from "lucide-react";

const ethicalStandards = [
    { icon: Fingerprint, title: "Plagiarism Control", detail: "Strict threshold filter (<10%) for original discourse." },
    { icon: ShieldCheck, title: "Authorship Ethics", detail: "Accountability protocols for multi-contributor inquiry." },
    { icon: Lock, title: "Reviewer Neutrality", detail: "Protecting anonymity to eliminate academic bias." },
    { icon: ShieldAlert, title: "Intellectual Liberty", detail: "Merit-based selection free from external influence." },
    { icon: FileWarning, title: "Rectification Path", detail: "Transparent protocols for handling scholarly misconduct." },
];

const Ethics = memo(() => {
    return (
        <section id="ethics" className="py-32 bg-oxford relative overflow-hidden">
            {/* Visual Background Element */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="grid lg:grid-cols-2 gap-24 items-center"
                >
                    {/* Header */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <p className="section-label text-gold">Legitimacy & Integrity</p>
                            <h2 className="section-title text-white text-5xl leading-tight">
                                Academic Integrity & <br />
                                <span className="italic academic-underline after:bg-white/20 py-1">Publication Ethics</span>
                            </h2>
                        </div>

                        <p className="text-white/60 text-lg leading-[1.8] font-sans max-w-xl italic">
                            JMRH strictly adheres to COPE and global institutional guidelines to ensure professional publishing practices.
                            Our commitment to research integrity is the foundation of our scholastic ecosystem.
                        </p>

                        <div className="p-10 border-l border-gold/40 bg-white/5 space-y-6 font-serif">
                            <p className="italic text-2xl text-gold/80 leading-relaxed font-bold">" Every manuscript is evaluated fairly, objectively, and confidentially to safeguard the progress of global science. "</p>
                        </div>

                        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-white/40 font-ui">
                            <span>COPE Verified</span>
                            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                            <span>ISSN Compliant</span>
                        </div>
                    </div>

                    {/* Ethics Cards Grid */}
                    <div className="bg-white/5 border border-white/10 p-12 lg:p-16 rounded-[40px] relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 blur-[100px] -mr-32 -mt-32" />

                        <div className="relative z-10 space-y-12">
                            {ethicalStandards.map((std, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-8 group/item"
                                >
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-xl group-hover/item:bg-gold group-hover/item:border-gold transition-all duration-500">
                                        <std.icon className="w-5 h-5 text-gold group-hover/item:text-oxford transition-colors" />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <h4 className="font-serif text-xl tracking-wide text-white group-hover/item:text-gold transition-colors font-bold">{std.title}</h4>
                                        <p className="text-[10px] text-white/30 font-ui uppercase tracking-[0.2em] font-bold">{std.detail}</p>
                                        <div className="h-[1px] w-0 bg-gold/30 mt-2 group-hover/item:w-full transition-all duration-700" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Ethics;
