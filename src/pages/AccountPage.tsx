import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJMRH } from "@/context/JMRHContext";
import {
    BookOpen,
    Send,
    Clock,
    CheckCircle,
    LogOut,
    Plus,
    ArrowRight,
    ShieldCheck,
    MessageCircle,
    Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AccountPage = memo(() => {
    const { papers, currentUser, logout } = useJMRH();
    const navigate = useNavigate();

    const myPapers = papers.filter(p => p.authorId === currentUser?.id);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 p-6 pt-32 pb-24 relative overflow-hidden">
                <div className="container mx-auto max-w-6xl space-y-16 animate-academic-reveal">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-border pb-12">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <p className="section-label">Researcher Identity</p>
                                <h1 className="text-6xl font-serif font-bold italic text-oxford leading-tight">My Submissions</h1>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-xs font-bold font-ui text-teal">
                                    <ShieldCheck size={16} className="text-gold" /> {currentUser?.email}
                                </div>
                                <button onClick={handleLogout} className="text-xs uppercase tracking-widest font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-2">
                                    <LogOut size={14} /> End Session
                                </button>
                            </div>
                        </div>

                        <Button asChild className="rounded-none h-20 bg-oxford text-white px-12 font-bold tracking-[0.3em] hover:bg-gold transition-all shadow-2xl group border-none">
                            <Link to="/submit-paper" className="flex items-center gap-4">
                                <Plus size={20} /> SUBMIT NEW MANUSCRIPT
                            </Link>
                        </Button>
                    </div>

                    {/* Submission List */}
                    <div className="space-y-8">
                        {myPapers.map((paper) => (
                            <div key={paper.id} className="p-10 premium-card space-y-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -mr-16 -mt-16 group-hover:bg-gold/10 transition-all duration-1000" />

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-teal">{paper.id.toUpperCase()}</p>
                                        <h3 className="font-serif text-3xl font-bold text-oxford group-hover:text-teal transition-colors leading-tight">{paper.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {paper.status === 'SUBMITTED' || paper.status === 'UNDER_REVIEW' ? (
                                            <div className="flex items-center gap-3 px-6 py-2 border border-orange-200 bg-orange-50/30 rounded-full">
                                                <Clock className="text-orange-500" size={16} />
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-orange-600">Pending Evaluation</span>
                                            </div>
                                        ) : paper.status === 'ACCEPTED' ? (
                                            <div className="flex items-center gap-3 px-6 py-2 border border-teal-200 bg-teal-50/30 rounded-full">
                                                <CheckCircle className="text-teal-500" size={16} />
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-teal-600">Vetted & Accepted</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3 px-6 py-2 border border-red-200 bg-red-50/30 rounded-full">
                                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-red-600">Revision / Rejected</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-12">
                                    <div className="space-y-4">
                                        <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-subtle">Metadata</p>
                                        <div className="space-y-3 font-serif italic text-lg text-oxford opacity-80">
                                            <p>{paper.discipline}</p>
                                            <p className="text-sm font-sans italic opacity-60">Filed on {paper.submissionDate}</p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-4">
                                        <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-text-subtle">Institutional Comments</p>
                                        {paper.revisionComments ? (
                                            <div className="p-6 bg-bg-alt rounded-2xl italic font-serif text-oxford leading-relaxed border-l-4 border-gold shadow-sm">
                                                "{paper.revisionComments}"
                                            </div>
                                        ) : (
                                            <p className="text-sm font-sans text-text-subtle italic">No public comments have been recorded for this protocol yet. The scholarly review phase is currently active.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-8 flex flex-wrap justify-end gap-6 items-center border-t border-border">
                                    <button className="text-[10px] uppercase tracking-widest font-bold text-text-muted hover:text-teal transition-colors flex items-center gap-2">
                                        <MessageCircle size={14} /> Correspondence
                                    </button>

                                    {/* Edit button - only for SUBMITTED papers */}
                                    {paper.status === 'SUBMITTED' && (
                                        <Link
                                            to={`/submit-paper/${paper.id}`}
                                            className="text-[10px] uppercase tracking-widest font-bold text-gold hover:text-oxford transition-colors flex items-center gap-2"
                                        >
                                            <Edit3 size={14} /> Edit Submission
                                        </Link>
                                    )}

                                    <Button variant="ghost" className="rounded-none border-b-2 border-gold text-oxford px-0 hover:bg-transparent group/link flex items-center gap-3 font-bold tracking-widest text-[10px] uppercase h-10">
                                        View Details <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {myPapers.length === 0 && (
                            <div className="py-32 text-center border-2 border-dashed border-border rounded-[40px] space-y-8 flex flex-col items-center justify-center p-12">
                                <BookOpen size={64} className="text-gold/20" />
                                <div className="space-y-4">
                                    <h2 className="font-serif italic text-3xl font-bold text-oxford">Your Academic Record is Empty</h2>
                                    <p className="text-text-muted max-w-lg mx-auto italic font-serif">
                                        " The journey of a thousand discoveries begins with the first submission. Share your inquiry with the global research community. "
                                    </p>
                                </div>
                                <Button asChild className="rounded-none h-16 bg-oxford text-white px-10 font-bold tracking-widest hover:bg-gold transition-all shadow-xl">
                                    <Link to="/submit-paper">INITIATE FIRST SUBMISSION</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
});

export default AccountPage;
