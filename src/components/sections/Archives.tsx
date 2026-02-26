import { memo } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Calendar, ExternalLink, Library } from "lucide-react";

const issues = [
    { volume: "Volume 01", issue: "Issue 01", date: "JAN 2025", articles: 0 },
    { volume: "Volume 01", issue: "Issue 02", date: "FEB 2025", articles: 0 },
    { volume: "Volume 01", issue: "Issue 03", date: "MAR 2025", articles: 0 },
];

const Archives = memo(() => {
    return (
        <section id="archives" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.99 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-24"
                >
                    {/* Header */}
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center gap-4">
                            <Library className="w-6 h-6 text-teal" />
                            <p className="section-label">Digital Repository</p>
                        </div>
                        <h2 className="section-title text-6xl leading-[1.1]">
                            Permanent <span className="italic academic-underline py-1">Open Access</span> <br />
                            & Research Repository
                        </h2>
                        <p className="text-text-muted text-xl leading-relaxed font-sans max-w-2xl">
                            Explore the chronological record of multidisciplinary inquiry. JMRH ensures that every discovery
                            remains accessible to the global scholarly community in perpetuity.
                        </p>
                    </div>

                    {/* Archive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {issues.map((issue, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="premium-card p-12 space-y-10 group bg-bg-alt border-none"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <p className="section-label text-teal">{issue.date}</p>
                                        <h3 className="font-serif text-3xl text-oxford font-bold">{issue.volume}</h3>
                                        <p className="font-serif italic text-teal text-xl">{issue.issue}</p>
                                    </div>
                                    <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-oxford group-hover:rotate-12 transition-all duration-700">
                                        <FileText className="w-7 h-7 text-gold group-hover:text-gold" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 py-6 border-y border-border">
                                    <div className="space-y-1">
                                        <p className="text-[9px] uppercase tracking-widest font-bold text-text-subtle font-ui">Release</p>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-teal" />
                                            <span className="text-xs text-oxford font-bold font-ui">{issue.date}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1 border-l border-border pl-6">
                                        <p className="text-[9px] uppercase tracking-widest font-bold text-text-subtle font-ui">Inventory</p>
                                        <div className="flex items-center gap-2">
                                            <Download className="w-4 h-4 text-teal" />
                                            <span className="text-xs text-oxford font-bold font-ui">Coming Soon</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-between font-ui">
                                    <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-oxford hover:text-teal transition-all flex items-center gap-2">
                                        Open Index <ExternalLink className="w-3 h-3" />
                                    </button>
                                    <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold opacity-40 group-hover:opacity-100 transition-all italic">
                                        Digital Preservation
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {/* Upcoming / Call for Participation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="p-12 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center space-y-8 text-center bg-transparent group hover:border-gold transition-colors duration-700 shadow-sm"
                        >
                            <div className="w-20 h-20 bg-bg-alt rounded-full flex items-center justify-center animate-pulse">
                                <Library className="w-8 h-8 text-text-subtle" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-serif italic text-3xl text-oxford">Upcoming Repositories</h4>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-teal">Quarterly Projections 2025</p>
                            </div>
                            <p className="text-sm font-sans text-text-muted leading-relaxed italic">
                                " Capturing the horizon of human knowledge, one issue at a time. "
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Archives;
