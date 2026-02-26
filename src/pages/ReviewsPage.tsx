import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useJMRH, Review } from "@/context/JMRHContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Plus, User, Trash2, Edit3, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/seo/SEOHead";
import { pageSEO } from "@/lib/seo-data";

const ReviewsPage = memo(() => {
    const { reviews, currentUser, addReview, updateReview, deleteReview } = useJMRH();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const { toast } = useToast();

    const handleAddReview = () => {
        const trimmed = content.trim();
        if (!trimmed) {
            toast({ title: "Empty Review", description: "Please write your feedback.", variant: "destructive" });
            return;
        }
        if (trimmed.length < 10) {
            toast({ title: "Too Short", description: "Review must be at least 10 characters.", variant: "destructive" });
            return;
        }
        if (trimmed.length > 2000) {
            toast({ title: "Too Long", description: "Review must be under 2000 characters.", variant: "destructive" });
            return;
        }
        addReview(trimmed, rating);
        setContent("");
        setRating(5);
        setIsAddOpen(false);
        toast({
            title: "Review Transmitted",
            description: "Your scholarly feedback has been recorded."
        });
    };

    const handleUpdateReview = () => {
        const trimmed = content.trim();
        if (!editingReview || !trimmed) return;
        if (trimmed.length < 10) {
            toast({ title: "Too Short", description: "Review must be at least 10 characters.", variant: "destructive" });
            return;
        }
        if (trimmed.length > 2000) {
            toast({ title: "Too Long", description: "Review must be under 2000 characters.", variant: "destructive" });
            return;
        }
        updateReview(editingReview.id, trimmed, rating);
        setEditingReview(null);
        setContent("");
        setRating(5);
        setIsEditOpen(false);
        toast({
            title: "Review Updated",
            description: "The archive has been updated with your changes."
        });
    };

    const handleDeleteReview = (id: string) => {
        deleteReview(id);
        toast({
            title: "Review Removed",
            description: "The record has been purged from the console.",
            variant: "destructive"
        });
    };

    const startEdit = (review: Review) => {
        setEditingReview(review);
        setContent(review.content);
        setRating(review.rating);
        setIsEditOpen(true);
    };

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-gold selection:text-white">
            <SEOHead {...pageSEO.reviews} canonical="/reviews" />
            <Header />
            <main className="pt-32 pb-24">
                <div className="container max-w-[1800px] mx-auto px-6 lg:px-10">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 border-b border-black/5 pb-12"
                    >
                        <div className="space-y-4 max-w-3xl">
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="text-gold w-5 h-5" />
                                <p className="section-label text-gold">Scholarly Feedback</p>
                            </div>
                            <h1 className="text-6xl font-serif font-black text-oxford tracking-tighter leading-none">
                                Community <br />
                                <span className="italic text-gold perspective-1000 inline-block hover:rotate-x-6 transition-transform">Reviews.</span>
                            </h1>
                            <p className="text-text-muted text-lg font-serif italic max-w-xl">
                                "The integrity of academic discourse is maintained through the collective oversight of the research community."
                            </p>
                        </div>

                        {currentUser ? (
                            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                                <DialogTrigger asChild>
                                    <Button className="h-16 px-10 rounded-none bg-oxford text-white hover:bg-gold transition-all duration-500 shadow-2xl group border-none">
                                        <Plus size={18} className="mr-3 group-hover:rotate-90 transition-transform" />
                                        RECORD FEEDBACK
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white border-black/5 max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="font-serif italic text-3xl text-oxford">Scholarly Contribution</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-8 pt-6">
                                        <div className="flex gap-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setRating(star)}
                                                    className={`transition-all ${rating >= star ? 'text-gold' : 'text-black/10'}`}
                                                >
                                                    <Star fill={rating >= star ? 'currentColor' : 'none'} size={32} />
                                                </button>
                                            ))}
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-teal flex items-center gap-3">
                                                <MessageSquare size={14} /> Academic Commentary
                                            </label>
                                            <Textarea
                                                placeholder="Share your experience with JMRH... (10-2000 characters)"
                                                maxLength={2000}
                                                className="bg-black/5 border-none h-40 focus:ring-1 focus:ring-gold text-oxford font-serif italic text-lg"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                            <p className="text-xs text-muted-foreground text-right">{content.length}/2000</p>
                                        </div>
                                    </div>
                                    <DialogFooter className="pt-6">
                                        <Button onClick={handleAddReview} className="w-full h-14 bg-oxford text-white hover:bg-gold rounded-none font-bold tracking-widest text-xs uppercase transition-all shadow-xl">
                                            SUBMIT TO ARCHIVE
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        ) : (
                            <div className="relative group overflow-hidden bg-[#111418] border border-gold/20 p-6 shadow-2xl">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 blur-2xl -mr-8 -mt-8" />
                                <div className="relative z-10 flex items-center gap-8">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="text-gold" size={12} />
                                            <span className="text-[9px] uppercase tracking-[0.3em] font-black text-gold">Nexus Trial Mode</span>
                                        </div>
                                        <p className="text-white font-serif italic text-sm">Trial Access to Community Feedback</p>
                                    </div>
                                    <Link to="/auth">
                                        <Button className="h-10 px-6 bg-gold text-[#0A0C10] hover:bg-white hover:text-black transition-all duration-500 font-bold tracking-widest uppercase text-[9px]">
                                            Authorize
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {reviews.map((review, idx) => (
                                <motion.div
                                    key={review.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-10 bg-white border border-black/5 shadow-sm hover:shadow-2xl hover:border-gold/20 transition-all duration-700 relative group flex flex-col justify-between h-[450px]"
                                >
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < review.rating ? 'text-gold' : 'text-black/5'}
                                                        fill={i < review.rating ? 'currentColor' : 'none'}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-[9px] uppercase tracking-widest font-bold text-black/20">
                                                {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>

                                        <p className="font-serif italic text-xl text-oxford leading-relaxed line-clamp-6">
                                            "{review.content}"
                                        </p>
                                    </div>

                                    <div className="pt-8 border-t border-black/5 flex justify-between items-center mt-auto">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-oxford/5 flex items-center justify-center rounded-lg">
                                                <User className="text-teal" size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-oxford tracking-[0.2em]">{review.userName}</p>
                                                <p className="text-[8px] uppercase tracking-widest text-black/30 font-bold">Verified Scholar</p>
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        {(currentUser?.role === 'ADMIN' || currentUser?.id === review.userId) && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => startEdit(review)}
                                                    className="w-8 h-8 flex items-center justify-center text-black/20 hover:text-gold transition-colors"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteReview(review.id)}
                                                    className="w-8 h-8 flex items-center justify-center text-black/20 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Edit Modal */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="bg-white border-black/5 max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="font-serif italic text-3xl text-oxford">Refine Record</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-8 pt-6">
                            <div className="flex gap-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`transition-all ${rating >= star ? 'text-gold' : 'text-black/10'}`}
                                    >
                                        <Star fill={rating >= star ? 'currentColor' : 'none'} size={32} />
                                    </button>
                                ))}
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-teal flex items-center gap-3">
                                    <MessageSquare size={14} /> Refined Commentary
                                </label>
                                <Textarea
                                    placeholder="Update your feedback... (10-2000 characters)"
                                    maxLength={2000}
                                    className="bg-black/5 border-none h-40 focus:ring-1 focus:ring-gold text-oxford font-serif italic text-lg"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground text-right">{content.length}/2000</p>
                            </div>
                        </div>
                        <DialogFooter className="pt-6">
                            <Button onClick={handleUpdateReview} className="w-full h-14 bg-oxford text-white hover:bg-gold rounded-none font-bold tracking-widest text-xs uppercase transition-all shadow-xl">
                                UPDATE ARCHIVE
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
            <Footer />
        </div>
    );
});

export default ReviewsPage;
