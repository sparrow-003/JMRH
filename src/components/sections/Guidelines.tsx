import { memo } from "react";
import { motion } from "framer-motion";
import { FileEdit, Clock, BookOpen, AlertCircle, Rocket, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Guidelines = memo(() => {
    return (
        <section id="guidelines" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.99 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="space-y-20"
                >
                    {/* Header */}
                    <div className="text-left max-w-3xl space-y-6">
                        <p className="section-label">Submission Standards</p>
                        <h2 className="section-title text-5xl">
                            Author <span className="italic academic-underline py-1">Guidelines</span>
                        </h2>
                        <p className="text-text-muted text-lg leading-[1.8] font-sans">
                            Rigorous scholarship requires meticulous preparation. JMRH expects all submissions to adhere
                            to international academic formatting and ethical clarity.
                        </p>
                    </div>

                    {/* Guidelines Tabs */}
                    <div className="max-w-5xl mx-auto">
                        <Tabs defaultValue="preparation" className="w-full">
                            <TabsList className="w-full justify-center border-b border-border h-auto p-0 bg-transparent flex-wrap gap-12 mb-16">
                                <TabsTrigger value="preparation" className="font-serif italic text-2xl px-0 pb-6 border-b-[3px] border-transparent data-[state=active]:border-gold data-[state=active]:text-oxford transition-all bg-transparent rounded-none shadow-none text-text-subtle">
                                    Manuscript Preparation
                                </TabsTrigger>
                                <TabsTrigger value="formatting" className="font-serif italic text-2xl px-0 pb-6 border-b-[3px] border-transparent data-[state=active]:border-gold data-[state=active]:text-oxford transition-all bg-transparent rounded-none shadow-none text-text-subtle">
                                    Formatting Standards
                                </TabsTrigger>
                                <TabsTrigger value="process" className="font-serif italic text-2xl px-0 pb-6 border-b-[3px] border-transparent data-[state=active]:border-gold data-[state=active]:text-oxford transition-all bg-transparent rounded-none shadow-none text-text-subtle">
                                    Submission Path
                                </TabsTrigger>
                            </TabsList>

                            <div className="min-h-[400px]">
                                <TabsContent value="preparation" className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                    <div className="grid md:grid-cols-2 gap-16">
                                        <div className="space-y-6 p-8 premium-card border-l-4 border-l-teal">
                                            <div className="flex items-center gap-4">
                                                <FileEdit className="w-8 h-8 text-teal" />
                                                <h4 className="font-serif text-2xl text-oxford italic font-bold">Unpublished Originality</h4>
                                            </div>
                                            <p className="text-text-muted font-sans leading-[1.8]">
                                                JMRH prioritizes secondary research and primary inquiry that has never been
                                                published. Every manuscript undergoes verification for its contribution
                                                to global academic discourse.
                                            </p>
                                        </div>
                                        <div className="space-y-6 p-8 premium-card border-l-4 border-l-gold">
                                            <div className="flex items-center gap-4">
                                                <AlertCircle className="w-8 h-8 text-gold" />
                                                <h4 className="font-serif text-2xl text-oxford italic font-bold">Informed Integrity</h4>
                                            </div>
                                            <p className="text-text-muted font-sans leading-[1.8]">
                                                Full transparency regarding data sources and research participants is required.
                                                Authors must provide ethical clearance certificates from their respective
                                                institutional bodies.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-12 bg-oxford text-white rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                                        <div className="absolute inset-y-0 left-0 w-2 bg-gold" />
                                        <p className="font-serif italic text-2xl text-white/90 leading-relaxed flex-1">
                                            " Scholarly language must be firm, transparent, and objective. Manuscripts that lack
                                            methodological depth will be returned for pre-review refinement. "
                                        </p>
                                        <BookOpen className="w-20 h-20 text-white/5 absolute right-4 bottom-4" />
                                    </div>
                                </TabsContent>

                                <TabsContent value="formatting" className="animate-in fade-in duration-700">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                        {[
                                            "APA / MLA Citations (Consistency is mandatory)",
                                            "Line Spacing: 1.5 with 12pt Serif Typography",
                                            "Structured Abstract: 250 Words Maximum",
                                            "Keywords: 5-8 Relevant Academic Terms",
                                            "Tables & Figures: Vector quality with captions",
                                            "Reference List: Alphabetical and verified DOIs"
                                        ].map((style, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-center gap-6 p-6 bg-bg-alt rounded-lg border border-border group hover:border-teal transition-all shadow-sm"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-teal transition-colors">
                                                    <CheckCircle className="w-5 h-5 text-teal group-hover:text-white" />
                                                </div>
                                                <span className="font-ui text-xs uppercase tracking-widest font-bold text-oxford">{style}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="process" className="animate-in fade-in slide-in-from-right-4 duration-700">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                        {[
                                            { step: "01", icon: Rocket, title: "Electronic Submission", text: "Forward your manuscript in .docx format to our institutional editorial desk." },
                                            { step: "02", icon: Clock, title: "Elite Peer-Review", text: "A 4-6 week rigorous review by specialized academicians across the global network." },
                                            { step: "03", icon: BookOpen, title: "Refined Publication", text: "Final polished works are indexed in our prestigious monthly scholarly issue." }
                                        ].map((item, idx) => (
                                            <div key={idx} className="space-y-6 p-10 premium-card text-center relative">
                                                <span className="absolute top-4 left-4 font-serif text-5xl text-oxford/5 font-bold italic">{item.step}</span>
                                                <div className="w-16 h-16 bg-bg-alt rounded-2xl mx-auto flex items-center justify-center">
                                                    <item.icon className="w-8 h-8 text-teal" />
                                                </div>
                                                <h4 className="font-serif italic text-2xl text-oxford font-bold">{item.title}</h4>
                                                <p className="text-sm text-text-muted leading-relaxed font-sans">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-16 text-center">
                                        <p className="section-label mb-4">Official Channel</p>
                                        <p className="font-serif text-3xl text-teal italic underline decoration-gold/40 underline-offset-8">editorial@jmrh.in</p>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Guidelines;
