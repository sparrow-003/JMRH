
import { memo, useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useJMRH, PaperStatus, Paper } from "@/context/JMRHContext";
import {
    BookOpen,
    CheckCircle,
    Clock,
    FileText,
    Send,
    ArrowRight,
    AlertCircle,
    MessageSquare,
    Search,
    Filter,
    Download,
    Eye,
    BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProfessorDashboard = memo(() => {
    const { papers, currentUser, updatePaperStatus } = useJMRH();
    const [reviewComments, setReviewComments] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const { toast } = useToast();

    const assignedPapers = useMemo(() =>
        papers.filter(p => p.assignedProfessorId === currentUser?.id),
        [papers, currentUser]);

    const filteredPapers = useMemo(() => {
        return assignedPapers.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.discipline.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [assignedPapers, searchTerm]);

    const pendingReviews = filteredPapers.filter(p => p.status === 'UNDER_REVIEW');
    const completedReviews = filteredPapers.filter(p => p.status !== 'UNDER_REVIEW' && p.status !== 'SUBMITTED');

    const handleSubmitReview = (paperId: string, decision: PaperStatus) => {
        if (!reviewComments.trim()) {
            toast({
                title: "Feedback Required",
                description: "Please provide academic commentary before submitting your decision.",
                variant: "destructive"
            });
            return;
        }
        updatePaperStatus(paperId, decision, reviewComments);
        setReviewComments("");
        toast({
            title: "Review Transmitted",
            description: `Institutional decision of ${decision.replace('_', ' ')} recorded.`
        });
    };

    const handleDownload = (paper: Paper) => {
        toast({
            title: "Accessing Archive",
            description: `Downloading manuscript: ${paper.title}`
        });
    };

    return (
        <DashboardLayout role="PROFESSOR">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Executive Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-gold" />
                            <p className="section-label text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Editorial Workspace</p>
                        </div>
                        <h1 className="text-6xl font-serif font-bold italic text-white leading-tight tracking-tight">Peer Review Console</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-8 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="space-y-1">
                            <p className="text-[9px] uppercase font-bold text-white/40 tracking-widest">Active Queue</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                                <p className="text-2xl font-serif italic font-bold text-white">{pendingReviews.length}</p>
                            </div>
                        </div>
                        <div className="space-y-1 border-l border-white/10 pl-8">
                            <p className="text-[9px] uppercase font-bold text-white/40 tracking-widest">Completed</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-teal-400" />
                                <p className="text-2xl font-serif italic font-bold text-white">{completedReviews.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <Input
                        placeholder="Search by title, author, or discipline..."
                        className="h-16 pl-16 bg-white/5 border-white/10 text-white font-serif italic text-lg focus:ring-gold/20 focus:border-gold/50 rounded-2xl transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Tabs defaultValue="pending" className="space-y-8">
                    <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl h-14">
                        <TabsTrigger value="pending" className="rounded-lg px-8 font-bold tracking-widest text-[10px] uppercase data-[state=active]:bg-gold data-[state=active]:text-oxford">
                            Pending Evaluations ({pendingReviews.length})
                        </TabsTrigger>
                        <TabsTrigger value="history" className="rounded-lg px-8 font-bold tracking-widest text-[10px] uppercase data-[state=active]:bg-gold data-[state=active]:text-oxford">
                            Scholarly Record ({completedReviews.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pending" className="space-y-6 outline-none">
                        {pendingReviews.length > 0 ? (
                            pendingReviews.map((paper) => (
                                <div key={paper.id} className="p-8 bg-white/5 rounded-[32px] border border-white/10 hover:border-gold/40 transition-all duration-500 group">
                                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                                        <div className="space-y-6 flex-1">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Protocol {paper.id.slice(0, 8)}</span>
                                                    <span className="h-1 w-1 rounded-full bg-white/20" />
                                                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{paper.discipline}</span>
                                                </div>
                                                <h4 className="font-serif text-3xl font-bold text-white group-hover:text-gold transition-colors leading-snug">{paper.title}</h4>
                                                <p className="text-white/40 font-ui text-sm italic flex items-center gap-2">
                                                    <FileText size={14} className="text-gold/50" /> Submitted by {paper.authorName}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="h-14 rounded-xl border-white/10 text-white/60 hover:text-white hover:bg-white/5 px-6 text-[10px] uppercase font-bold tracking-widest">
                                                        <Eye size={16} className="mr-2" /> Preview
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-oxford border-white/10 text-white max-w-4xl h-[80vh] flex flex-col">
                                                    <DialogHeader>
                                                        <DialogTitle className="font-serif italic text-3xl text-gold">{paper.title}</DialogTitle>
                                                        <DialogDescription className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Manuscript Preview Mode</DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex-1 bg-white/5 rounded-xl p-8 overflow-y-auto font-serif italic text-lg leading-relaxed text-white/80 border border-white/5">
                                                        {paper.abstract || "The full manuscript content is currently being processed for secure viewing. Please refer to the downloaded PDF for complete technical details and citations."}
                                                    </div>
                                                    <DialogFooter className="pt-4 border-t border-white/5">
                                                        <Button onClick={() => handleDownload(paper)} className="bg-white/10 hover:bg-white/20 text-white border-none rounded-lg">
                                                            <Download size={16} className="mr-2" /> Download Full PDF
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="h-14 rounded-xl bg-gold text-oxford px-8 font-bold tracking-widest hover:bg-white transition-all shadow-xl group border-none text-[10px] uppercase">
                                                        Submit Decision <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-oxford border-white/10 text-white max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle className="font-serif italic text-3xl text-gold mb-2">Reviewer's Transmittal</DialogTitle>
                                                        <p className="text-white/40 text-xs font-ui">Final evaluation for: <span className="text-white italic">{paper.title}</span></p>
                                                    </DialogHeader>
                                                    <div className="space-y-8 pt-6">
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] uppercase tracking-widest font-bold text-teal-400 flex items-center gap-3">
                                                                <MessageSquare size={14} /> Academic Commentary
                                                            </label>
                                                            <Textarea
                                                                placeholder="Provide rigorous feedback for the author..."
                                                                className="bg-white/5 border-white/10 text-white font-serif italic h-48 focus:border-gold rounded-xl resize-none"
                                                                value={reviewComments}
                                                                onChange={(e) => setReviewComments(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-4 pb-2">
                                                            {[
                                                                { label: "Accept", status: 'ACCEPTED', color: 'bg-teal-500' },
                                                                { label: "Revision", status: 'REVISION_REQUIRED', color: 'bg-orange-500' },
                                                                { label: "Reject", status: 'REJECTED', color: 'bg-red-500' }
                                                            ].map((opt) => (
                                                                <Button
                                                                    key={opt.status}
                                                                    onClick={() => handleSubmitReview(paper.id, opt.status as PaperStatus)}
                                                                    className={`h-14 rounded-xl font-bold tracking-widest text-[10px] uppercase shadow-lg border-none ${opt.color} text-white hover:opacity-80 transition-all`}
                                                                >
                                                                    {opt.label}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center space-y-6">
                                <div className="p-6 bg-white/5 rounded-full">
                                    <CheckCircle size={40} className="text-teal-400/40" />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-serif italic text-white/40 text-2xl">Queue Cleared</p>
                                    <p className="text-white/20 text-xs uppercase tracking-[0.2em] font-bold">No manuscripts currently awaiting your command.</p>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="history" className="outline-none">
                        <div className="bg-white/5 rounded-[32px] border border-white/5 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 text-left">
                                            <th className="p-8 font-bold">Manuscript Details</th>
                                            <th className="p-8 font-bold">Status</th>
                                            <th className="p-8 font-bold text-right">Archive Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {completedReviews.map((paper) => (
                                            <tr key={paper.id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="p-8">
                                                    <div className="space-y-1">
                                                        <p className="font-serif italic text-xl text-white font-bold group-hover:text-gold transition-colors">{paper.title}</p>

                                                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/20 font-bold">
                                                            <span>{paper.authorName}</span>
                                                            <span className="w-1 h-1 rounded-full bg-white/10" />
                                                            <span>{paper.discipline}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-8">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${paper.status === 'ACCEPTED' ? 'bg-teal-500/10 text-teal-400' :
                                                            paper.status === 'REJECTED' ? 'bg-red-500/10 text-red-400' :
                                                                'bg-orange-500/10 text-orange-400'
                                                        }`}>
                                                        {paper.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="p-8 text-right">
                                                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                                                        {new Date(paper.submissionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
});

export default ProfessorDashboard;

