import React, { useState, memo, FormEvent, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useJMRH } from "@/context/JMRHContext";
import { supabase } from "@/integrations/supabase/client";
import {
    Send,
    FileText,
    ShieldCheck,
    ArrowLeft,
    Upload,
    Camera,
    X,
    CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/seo/SEOHead";
import { pageSEO } from "@/lib/seo-data";

const SubmitPaperPage = memo(() => {
    const { submitPaper, updatePaper, currentUser, papers } = useJMRH();
    const navigate = useNavigate();
    const { id } = useParams();
    const { toast } = useToast();

    // Find existing paper when editing
    const existingPaper = useMemo(() => papers.find(p => p.id === id), [papers, id]);
    const isEditMode = Boolean(existingPaper);

    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [authorName, setAuthorName] = useState(currentUser?.name || "");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attachments, setAttachments] = useState<string[]>([]); // Now stores storage paths, not base64
    const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
    const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([]);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Populate form when editing
    useEffect(() => {
        if (existingPaper) {
            setTitle(existingPaper.title);
            setAbstract(existingPaper.abstract);
            setDiscipline(existingPaper.discipline);
            setAuthorName(existingPaper.authorName);
            setAttachments(existingPaper.attachments || []);
            // For existing papers, attachments are storage paths - generate previews via signed URLs
            setAttachmentPreviews((existingPaper.attachments || []).map(() => ''));
        }
    }, [existingPaper]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setAttachmentFiles(prev => [...prev, ...files]);
            // Create preview URLs for display only
            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    const url = URL.createObjectURL(file);
                    setAttachmentPreviews(prev => [...prev, url]);
                } else {
                    setAttachmentPreviews(prev => [...prev, 'file']);
                }
            });
        }
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            setIsCameraOpen(true);
            setTimeout(() => {
                if (videoRef.current) videoRef.current.srcObject = mediaStream;
            }, 100);
        } catch (err) {
            toast({ title: "Camera Error", description: "Could not access camera.", variant: "destructive" });
        }
    };

    const stopCamera = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
                        setAttachmentFiles(prev => [...prev, file]);
                        setAttachmentPreviews(prev => [...prev, URL.createObjectURL(file)]);
                    }
                }, 'image/jpeg');
            }
        }
    };

    const uploadFilesToStorage = async (): Promise<string[]> => {
        if (!currentUser) return [];
        const paths: string[] = [];
        for (const file of attachmentFiles) {
            const filePath = `${currentUser.id}/${Date.now()}_${file.name}`;
            const { error } = await supabase.storage.from('papers').upload(filePath, file);
            if (error) throw error;
            paths.push(filePath);
        }
        // Include any existing attachment paths (from edit mode)
        return [...attachments, ...paths];
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            toast({ title: "Login Required", description: "Please log in to submit your manuscript.", variant: "destructive" });
            return;
        }
        if (attachmentFiles.length === 0 && attachments.length === 0) {
            toast({ title: "Attachments Required", description: "Please upload your manuscript file.", variant: "destructive" });
            return;
        }
        if (!discipline) {
            toast({ title: "Field Required", description: "Please select a discipline.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1200));

        try {
            // Upload files to Supabase Storage instead of storing base64 in DB
            const storagePaths = await uploadFilesToStorage();

            if (isEditMode && existingPaper) {
                updatePaper(existingPaper.id, { title, abstract, discipline, attachments: storagePaths });
                toast({ title: "Manuscript Updated!", description: "Your changes have been saved." });
            } else {
                submitPaper(title, abstract, discipline, authorName, storagePaths);
                toast({ title: "Manuscript Submitted!", description: "Your paper has been received for review." });
            }
            navigate('/account');
        } catch (error: any) {
            toast({ title: "Upload Error", description: error?.message || "Failed to upload files.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const disciplines = ["Commerce", "Science", "Technology", "Management", "Others"];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEOHead {...pageSEO.submitPaper} canonical="/submit-paper" />
            <Header />
            <canvas ref={canvasRef} className="hidden" />

            <main className="flex-1 pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Page Header */}
                    <div className="mb-8 space-y-4">
                        <Link to="/account" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-teal hover:text-gold transition-colors">
                            <ArrowLeft size={14} /> Back to Account
                        </Link>
                        <div className="border-l-4 border-gold pl-6">
                            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-oxford">
                                {isEditMode ? "Edit Manuscript" : "Submit Manuscript"}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                {isEditMode
                                    ? "Update your paper details and resubmit"
                                    : "Share your research with the academic community"}
                            </p>
                        </div>
                    </div>

                    {/* Trial Mode / Access Control */}
                    {!currentUser ? (
                        <div className="mb-12 relative group overflow-hidden bg-[#111418] border border-gold/20 p-8 sm:p-12 shadow-2xl">
                            {/* Cinematic Accents */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -mr-16 -mt-16" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal/5 blur-2xl -ml-12 -mb-12" />
                            <div className="absolute top-0 right-0 w-1 h-20 bg-gold" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="space-y-4 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
                                        <ShieldCheck className="text-gold" size={14} />
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">Nexus Trial Mode</span>
                                    </div>
                                    <h2 className="text-3xl font-serif italic font-bold text-white tracking-tight">Experience our Submission Node</h2>
                                    <p className="text-sm text-white/40 max-w-lg leading-relaxed">
                                        You are currently in <span className="text-gold font-bold">Observer Mode</span>. You may explore the interface, but manuscript transmission requires verified scholar status.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4 min-w-[200px]">
                                    <Link to="/auth">
                                        <Button className="w-full h-14 bg-gold text-[#0A0C10] hover:bg-white hover:text-black transition-all duration-500 font-black tracking-[0.2em] uppercase text-[10px] shadow-[0_10px_30px_rgba(212,175,55,0.1)]">
                                            Authorize Identity
                                        </Button>
                                    </Link>
                                    <p className="text-[9px] uppercase tracking-widest text-center text-white/20">Secure Encryption Enabled</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-8 p-6 bg-[#111418] border border-white/5 flex items-start gap-4 shadow-xl">
                            <ShieldCheck className="text-teal shrink-0 mt-0.5" size={24} />
                            <div>
                                <h3 className="font-semibold text-white/80 text-sm italic">Double-Blind Peer Review Status</h3>
                                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Identity Encryption Protocol: Active</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Author & Discipline Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Author Name</label>
                                <Input
                                    required
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    placeholder="Your full name"
                                    className="h-12 border-border bg-background focus:border-gold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Discipline</label>
                                <Select required onValueChange={setDiscipline} value={discipline}>
                                    <SelectTrigger className="h-12 border-border bg-background focus:border-gold">
                                        <SelectValue placeholder="Select field of study" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {disciplines.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Paper Title</label>
                            <Input
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the full title of your manuscript"
                                className="h-12 border-border bg-background focus:border-gold text-lg"
                            />
                        </div>

                        {/* Abstract */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Abstract</label>
                            <Textarea
                                required
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                                placeholder="Provide a concise summary of your research (250-300 words recommended)"
                                className="min-h-[180px] border-border bg-background focus:border-gold resize-y"
                            />
                        </div>

                        {/* File Upload Section */}
                        <div className="border-2 border-dashed border-border bg-muted/50 p-6 sm:p-8 space-y-6">
                            <div className="text-center">
                                <Upload className="mx-auto text-gold mb-3" size={32} />
                                <h4 className="font-semibold text-oxford">Upload Manuscript Files</h4>
                                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX formats accepted</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-12 px-6 gap-2"
                                >
                                    <Upload size={16} /> Choose Files
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={startCamera}
                                    className="h-12 px-6 gap-2"
                                >
                                    <Camera size={16} /> Take Photo
                                </Button>
                            </div>

                            {/* Camera Preview */}
                            <AnimatePresence>
                                {isCameraOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="relative aspect-video bg-foreground/5 overflow-hidden mx-auto max-w-md rounded-lg"
                                    >
                                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={capturePhoto}
                                                className="w-14 h-14 bg-white rounded-full shadow-lg border-4 border-gold hover:scale-105 transition-transform"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={stopCamera}
                                            className="absolute top-3 right-3 p-2 bg-foreground/80 text-background rounded-full hover:bg-foreground transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Attachments Preview */}
                            {(attachmentPreviews.length > 0 || attachments.length > 0) && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {/* Existing attachments (storage paths from edit mode) */}
                                    {attachments.map((att, i) => (
                                        <div key={`existing-${i}`} className="relative aspect-square border border-border bg-background overflow-hidden group">
                                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                                <FileText size={24} />
                                                <span className="text-[10px] mt-1">Existing File {i + 1}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))}
                                                className="absolute top-1 right-1 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                            <div className="absolute bottom-1 left-1 p-1 bg-background/80 rounded">
                                                <CheckCircle size={14} className="text-teal" />
                                            </div>
                                        </div>
                                    ))}
                                    {/* New file attachments */}
                                    {attachmentPreviews.map((preview, i) => (
                                        <div key={`new-${i}`} className="relative aspect-square border border-border bg-background overflow-hidden group">
                                            {preview !== 'file' ? (
                                                <img src={preview} alt={`Attachment ${i + 1}`} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                                    <FileText size={24} />
                                                    <span className="text-[10px] mt-1">{attachmentFiles[i]?.name || `File ${i + 1}`}</span>
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setAttachmentFiles(prev => prev.filter((_, idx) => idx !== i));
                                                    setAttachmentPreviews(prev => prev.filter((_, idx) => idx !== i));
                                                }}
                                                className="absolute top-1 right-1 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                            <div className="absolute bottom-1 left-1 p-1 bg-background/80 rounded">
                                                <CheckCircle size={14} className="text-teal" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting || !currentUser}
                            className="w-full h-14 bg-oxford text-primary-foreground hover:bg-gold transition-colors text-sm font-bold tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                    />
                                    {isEditMode ? "Updating..." : "Submitting..."}
                                </span>
                            ) : !currentUser ? (
                                <span className="flex items-center gap-2">
                                    <ShieldCheck size={16} /> Login to Submit
                                </span>
                            ) : isEditMode ? (
                                <span className="flex items-center gap-2">
                                    <Send size={16} /> Save Changes
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send size={16} /> Submit Manuscript
                                </span>
                            )}
                        </Button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
});

export default SubmitPaperPage;
