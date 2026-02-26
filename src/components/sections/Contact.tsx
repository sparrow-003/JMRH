import { memo } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, ShieldCheck } from "lucide-react";

const Contact = memo(() => {
    return (
        <section id="contact" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid lg:grid-cols-2 gap-24 items-stretch"
                >
                    {/* Contact Information */}
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <p className="section-label">Institutional Relations</p>
                            <h2 className="section-title text-5xl">
                                Academic <br />
                                <span className="italic academic-underline py-1">Correspondence</span>
                            </h2>
                        </div>

                        <div className="space-y-10">
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 bg-bg-alt flex items-center justify-center shrink-0 rounded-2xl group-hover:bg-oxford transition-all duration-500">
                                    <MapPin className="w-6 h-6 text-teal group-hover:text-gold" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-serif text-2xl text-oxford font-bold">Editorial Office</h4>
                                    <p className="text-text-muted text-lg leading-relaxed font-sans italic opacity-80">
                                        JMRH Publications, Gudalur,<br />
                                        The Nilgiris – 643212, Tamil Nadu, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 bg-bg-alt flex items-center justify-center shrink-0 rounded-2xl group-hover:bg-teal transition-all duration-500">
                                    <Mail className="w-6 h-6 text-teal group-hover:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-serif text-2xl text-oxford font-bold">Inquiry Channels</h4>
                                    <div className="space-y-1 font-ui text-xs uppercase tracking-[0.2em] font-bold">
                                        <p className="text-teal hover:text-gold transition-colors cursor-pointer">editorial@jmrh.in</p>
                                        <p className="text-text-subtle">submissions@jmrh.in</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 bg-bg-alt flex items-center justify-center shrink-0 rounded-2xl group-hover:bg-gold transition-all duration-500">
                                    <Clock className="w-6 h-6 text-teal group-hover:text-oxford" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-serif text-2xl text-oxford font-bold">Institutional Hours</h4>
                                    <p className="text-text-muted text-sm font-sans tracking-wide">Mon - Fri: 09:00 - 17:00 IST</p>
                                    <p className="text-gold text-[9px] uppercase tracking-[0.3em] font-bold italic">Global Operations Unified</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-border flex items-center gap-4 group">
                            <ShieldCheck className="w-6 h-6 text-teal opacity-40" />
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-subtle font-ui italic">
                                Secure Institutional Communications Protocol Verified
                            </p>
                        </div>
                    </div>

                    {/* Inquiry Form Block */}
                    <div className="bg-oxford p-12 lg:p-16 rounded-[40px] relative shadow-2xl flex flex-col justify-center overflow-hidden group">
                        {/* Background noise texture */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

                        <div className="relative z-10 space-y-12">
                            <div className="space-y-4">
                                <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">Portal Access</p>
                                <h3 className="font-serif text-4xl text-white italic leading-tight font-bold">Initiate Scholarly <br />Correspondence</h3>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-2 border-b border-white/10 pb-4 group/field focus-within:border-gold transition-all duration-500">
                                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Full Name</label>
                                    <input type="text" className="w-full bg-transparent border-none text-white focus:ring-0 p-0 font-serif italic text-2xl placeholder:text-white/10" placeholder="Author Full Name" />
                                </div>
                                <div className="space-y-2 border-b border-white/10 pb-4 group/field focus-within:border-gold transition-all duration-500">
                                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Institutional Email</label>
                                    <input type="email" className="w-full bg-transparent border-none text-white focus:ring-0 p-0 font-serif italic text-2xl placeholder:text-white/10" placeholder="your@academic.edu" />
                                </div>
                                <div className="space-y-2 border-b border-white/10 pb-12 group/field focus-within:border-gold transition-all duration-500">
                                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Message / Inquiry</label>
                                    <textarea className="w-full bg-transparent border-none text-white focus:ring-0 p-0 font-serif italic text-2xl placeholder:text-white/10 resize-none h-32" placeholder="Brief statement of inquiry..." />
                                </div>
                            </div>

                            <button className="w-full h-20 bg-white text-oxford rounded-none text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-gold hover:text-white transition-all duration-700 flex items-center justify-center gap-4 shadow-xl">
                                Transmit Correspondence <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Contact;
