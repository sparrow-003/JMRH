import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useJMRH } from "@/context/JMRHContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Download, Search, Filter, Calendar, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/seo/SEOHead";
import { pageSEO } from "@/lib/seo-data";

const ArchivesPage = memo(() => {
    const { papers } = useJMRH();
    const [searchTerm, setSearchTerm] = useState("");

    const publishedPapers = useMemo(() => {
        return papers.filter(p =>
            (p.status === 'PUBLISHED' || p.status === 'ARCHIVED') &&
            (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.discipline.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [papers, searchTerm]);

    const handleDownload = (attachments?: string[]) => {
        if (!attachments || attachments.length === 0) return;
        const link = document.createElement("a");
        link.href = attachments[0];
        link.download = "jmrh_manuscript_download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex flex-col font-sans selection:bg-gold selection:text-white">
            <SEOHead {...pageSEO.archives} canonical="/archives" />
            <Header />
            <main className="flex-1">
                {/* Cinematic Editorial Hero */}
                <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-oxford">
                    {/* Subtle Texture Overlay */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-oxford/40 via-transparent to-oxford/80" />

                    {/* Floating Academic Accents */}
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gold/5 blur-[100px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal/5 blur-[100px] rounded-full animate-pulse" />

                    <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full">
                            <Shield className="text-gold" size={14} />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Peer-Reviewed Repository</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-serif font-black text-white tracking-tighter leading-none">
                            The Digital <br />
                            <span className="italic text-gold">Archives</span>
                        </h1>

                        <p className="max-w-xl mx-auto text-white/40 font-serif italic text-lg md:text-xl leading-relaxed">
                            "A curated collection of contemporary multidisciplinary thought, preserved for the global scholarly community."
                        </p>
                    </div>
                </div>

                {/* Filter & Toolbar */}
                <div className="relative -mt-16 z-20 container mx-auto px-6 max-w-6xl">
                    <div className="bg-white p-8 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-black/5 flex flex-col md:flex-row gap-8 items-center justify-between">
                        <div className="relative w-full md:w-2/3">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-oxford/20 w-5 h-5" />
                            <input
                                placeholder="Search by Manuscript Title, Area of Study, or Scholar Identity..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-16 pr-8 h-20 bg-black/5 border-none focus:ring-1 focus:ring-gold text-oxford font-serif italic text-xl transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-oxford/20">Discovery Results</p>
                                <p className="text-3xl font-serif font-bold italic text-gold">{publishedPapers.length}</p>
                            </div>
                            <div className="h-12 w-[1px] bg-black/5" />
                            <Button variant="ghost" className="h-16 w-16 p-0 hover:bg-black/5 rounded-none border border-black/5">
                                <Filter size={20} className="text-oxford/40" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Results List */}
                <div className="container mx-auto px-6 py-24 max-w-6xl space-y-16">
                    {publishedPapers.length > 0 ? (
                        publishedPapers.map((paper, idx) => (
                            <div key={paper.id} className="group grid md:grid-cols-4 gap-12 items-start pb-16 border-b border-black/5 last:border-0 hover:translate-x-4 transition-all duration-700">
                                {/* Metadata Column */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-[1px] bg-gold" />
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">{paper.discipline}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-oxford/40">
                                        <p className="text-[9px] uppercase font-bold tracking-widest flex items-center gap-2">
                                            <Calendar size={12} className="text-teal" /> Filed: {paper.submissionDate}
                                        </p>
                                        <p className="text-[9px] uppercase font-bold tracking-widest flex items-center gap-2">
                                            <BookOpen size={12} className="text-teal" /> Status: {paper.status}
                                        </p>
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div className="md:col-span-2 space-y-6">
                                    <h3 className="text-4xl font-serif font-bold text-oxford group-hover:text-gold transition-colors leading-tight">
                                        {paper.title}
                                    </h3>
                                    <p className="text-oxford/50 leading-loose text-lg font-serif italic">
                                        {paper.abstract}
                                    </p>
                                    <div className="flex items-center gap-4 pt-4 border-t border-black/5">
                                        <div className="w-12 h-12 rounded-full bg-oxford/5 flex items-center justify-center font-serif italic text-xl text-gold">
                                            {paper.authorName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-oxford/20">Lead Scholar</p>
                                            <p className="text-lg font-serif font-bold text-oxford">{paper.authorName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Column */}
                                <div className="flex flex-col gap-4 items-end">
                                    <Button
                                        onClick={() => handleDownload(paper.attachments)}
                                        disabled={!paper.attachments || paper.attachments.length === 0}
                                        className="w-full md:w-48 h-16 bg-oxford text-white hover:bg-gold transition-all duration-500 rounded-none font-bold tracking-[0.3em] text-[10px] uppercase group/btn shadow-[0_20px_40px_rgba(10,37,64,0.1)]"
                                    >
                                        <Download size={14} className="mr-3 group-hover/btn:translate-y-1 transition-transform" />
                                        Access File
                                    </Button>
                                    <Button variant="ghost" className="w-full md:w-48 h-16 border border-black/5 hover:bg-black/5 rounded-none font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-2">
                                        Full View <ExternalLink size={14} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-48 space-y-8 bg-black/5 border-2 border-dashed border-black/5">
                            <BookOpen size={64} className="mx-auto text-oxford/10" />
                            <div className="space-y-2">
                                <h3 className="text-3xl font-serif italic text-oxford/40 tracking-widest uppercase">Void Database</h3>
                                <p className="text-oxford/20 font-bold uppercase tracking-widest text-xs">No records align with the provided scholarly parameters.</p>
                            </div>
                            <Button variant="outline" onClick={() => setSearchTerm("")} className="rounded-none h-14 px-10 font-bold tracking-widest text-[10px] uppercase">
                                Reset Search Directive
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
});

export default ArchivesPage;
