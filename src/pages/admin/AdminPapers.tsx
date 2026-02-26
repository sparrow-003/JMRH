import { useState, memo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useJMRH, Paper, User } from "@/context/JMRHContext";
import {
    BookOpen,
    CheckCircle,
    Clock,
    User as UserIcon,
    Search,
    Filter,
    GraduationCap,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const AdminPapers = memo(() => {
    const { papers, users, assignPaper, updatePaperStatus } = useJMRH();
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();

    const professors = users.filter(u => u.role === 'PROFESSOR');

    const filteredPapers = papers.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.authorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAssign = (paperId: string, professorId: string) => {
        assignPaper(paperId, professorId);
        const prof = professors.find(p => p.id === professorId);
        toast({ title: "Manuscript Assigned", description: `Review protocol initiated with ${prof?.name}` });
    };

    const handlePublish = (paperId: string) => {
        updatePaperStatus(paperId, 'PUBLISHED', 'Published via Admin Console');
        toast({ title: "Manuscript Published", description: "This paper is now live in the Archives." });
    };

    return (
        <DashboardLayout role="ADMIN">
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                        <p className="section-label">Editorial Vetting Desk</p>
                        <h1 className="text-5xl font-serif font-bold italic text-white leading-tight">Master Repository</h1>
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-80">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                            <Input
                                placeholder="Identify Manuscript / Scholar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 bg-white/5 border-white/10 text-white italic h-14 rounded-none h-14"
                            />
                        </div>
                        <Button variant="ghost" className="h-14 w-14 rounded-none border border-white/10 text-white/40 hover:text-white transition-all p-0">
                            <Filter size={20} />
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    {filteredPapers.map((paper) => (
                        <div key={paper.id} className="p-10 bg-white/5 rounded-[40px] border border-white/10 group hover:border-gold/30 transition-all duration-700 shadow-3xl">
                            <div className="grid lg:grid-cols-12 gap-12 items-center">
                                {/* ID & Type */}
                                <div className="lg:col-span-1 border-r border-white/5 pr-8 space-y-2 hidden lg:block">
                                    <p className="text-[10px] uppercase font-bold text-white/20 tracking-widest">Index</p>
                                    <p className="font-serif italic text-xl text-gold">{paper.id.split('-')[1].toUpperCase()}</p>
                                </div>

                                {/* Title & Author */}
                                <div className="lg:col-span-5 space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition-colors leading-tight">{paper.title}</h3>
                                        <p className="text-[10px] uppercase tracking-widest text-teal-400 font-bold">{paper.discipline}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40 font-ui text-xs italic">
                                        <UserIcon size={14} className="text-gold" />
                                        Submitted by {paper.authorName}
                                    </div>
                                </div>

                                {/* Status Phase */}
                                <div className="lg:col-span-3 space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-white/20 tracking-widest">Current Protocol Phase</p>
                                        <div className="flex items-center gap-2">
                                            {paper.status === 'SUBMITTED' ? <Clock size={16} className="text-orange-400" /> : <CheckCircle size={16} className="text-teal-400" />}
                                            <span className={`text-sm font-bold tracking-widest uppercase ${paper.status === 'SUBMITTED' ? 'text-orange-400' : 'text-teal-400'}`}>
                                                {paper.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    {paper.attachments && paper.attachments.length > 0 && (
                                        <div className="flex items-center gap-2 text-gold/60 text-[10px] uppercase tracking-widest font-bold">
                                            <BookOpen size={12} />
                                            {paper.attachments.length} Attachment{paper.attachments.length > 1 ? 's' : ''}
                                        </div>
                                    )}
                                    {paper.assignedProfessorId && (
                                        <div className="flex items-center gap-3 text-white/40 font-ui text-xs">
                                            <GraduationCap size={14} className="text-teal-400" />
                                            Vetted by {users.find(u => u.id === paper.assignedProfessorId)?.name}
                                        </div>
                                    )}
                                </div>

                                {/* Action */}
                                <div className="lg:col-span-3 flex flex-col items-end gap-3">
                                    {!paper.assignedProfessorId ? (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button className="w-full rounded-none h-12 bg-gold text-oxford font-bold tracking-widest hover:bg-white transition-all shadow-xl group/btn flex items-center justify-center gap-3 text-xs">
                                                    INITIATE VETTING <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-oxford border-white/10 text-white">
                                                <DialogHeader>
                                                    <DialogTitle className="font-serif italic text-2xl text-gold">Assign Lead Reviewer</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4 pt-6">
                                                    {professors.map((prof) => (
                                                        <button
                                                            key={prof.id}
                                                            onClick={() => handleAssign(paper.id, prof.id)}
                                                            className="w-full p-4 bg-white/5 border border-white/5 rounded-xl hover:border-gold hover:bg-white/10 transition-all text-left flex items-center justify-between group/prof"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-lg group-hover/prof:bg-gold transition-colors">
                                                                    <GraduationCap size={20} className="text-teal-400 group-hover/prof:text-oxford" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-serif font-bold group-hover/prof:text-gold transition-colors">{prof.name}</p>
                                                                    <p className="text-[10px] uppercase font-bold text-white/20">{prof.email}</p>
                                                                </div>
                                                            </div>
                                                            <ArrowRight size={16} className="text-white/20 group-hover/prof:text-gold transition-colors" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <div className="w-full space-y-2">
                                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border border-white/10">
                                                <span className="text-[8px] uppercase tracking-widest text-white/40 font-black">Lead Reviewer</span>
                                                <span className="text-[9px] uppercase tracking-widest text-gold font-bold">{users.find(u => u.id === paper.assignedProfessorId)?.name.split(' ')[0]}</span>
                                            </div>
                                            <Button
                                                onClick={() => updatePaperStatus(paper.id, 'ACCEPTED', 'Manual Admin Override')}
                                                className="w-full h-10 bg-teal/10 hover:bg-teal text-teal hover:text-white border border-teal/20 text-[9px] uppercase font-bold tracking-widest transition-all"
                                            >
                                                Fast-Track Acceptance
                                            </Button>
                                        </div>
                                    )}

                                    {/* Publish/Archive Action */}
                                    <div className="flex gap-2 w-full pt-2">
                                        {paper.status === 'ACCEPTED' ? (
                                            <Button
                                                onClick={() => handlePublish(paper.id)}
                                                className="flex-1 h-12 bg-white text-oxford hover:bg-gold hover:text-white font-black tracking-[0.2em] text-[10px] uppercase transition-all shadow-2xl"
                                            >
                                                Commit to Archives
                                            </Button>
                                        ) : paper.status === 'PUBLISHED' ? (
                                            <Button
                                                onClick={() => updatePaperStatus(paper.id, 'ARCHIVED', 'Archived by Admin')}
                                                className="flex-1 h-12 bg-white/5 text-white/40 hover:text-white border border-white/10 font-bold tracking-widest text-[10px] uppercase transition-all"
                                            >
                                                Move to Legacy
                                            </Button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredPapers.length === 0 && (
                        <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center space-y-4">
                            <BookOpen size={48} className="text-white/10" />
                            <p className="font-serif italic text-white/20 text-xl tracking-widest">No manuscripts archived in this directory.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
});

export default AdminPapers;
