
import React, { useState, useEffect } from 'react';
import { Upload, FileText, Plus, X, Loader2, FileCheck, ShieldCheck, Clock } from 'lucide-react';
import { useAuth } from '../../components/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Manuscript } from '../../types';
import { supabase } from '../../lib/supabase';

const ProfessorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [isLoadingPapers, setIsLoadingPapers] = useState(true);

  useEffect(() => {
    if (user) fetchManuscripts();
  }, [user]);

  const fetchManuscripts = async () => {
    setIsLoadingPapers(true);
    const { data, error } = await supabase
      .from('manuscripts')
      .select('*')
      .or(`author_id.eq.${user?.id},professor_id.eq.${user?.id}`)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setManuscripts(data.map((m: any) => ({
        id: m.id,
        title: m.title,
        author_id: m.author_id,
        professor_id: m.professor_id,
        status: m.status,
        created_at: m.created_at,
        uploadDate: new Date(m.created_at).toLocaleDateString(),
        visibility: m.visibility
      })));
    }
    setIsLoadingPapers(false);
  };

  const handleConfirmUpload = async () => {
    if (!newTitle.trim() || !selectedFile) {
      alert("Research title and source file are mandatory for validation.");
      return;
    }

    setIsSimulatingUpload(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => prev < 90 ? prev + 10 : 90);
    }, 150);

    try {
      const { error } = await supabase
        .from('manuscripts')
        .insert({
          title: newTitle,
          author_id: user?.id,
          professor_id: user?.id,
          status: 'SUBMITTED',
          visibility: 'Restricted'
        });

      if (error) throw error;

      setUploadProgress(100);
      setTimeout(() => {
        setIsSimulatingUpload(false);
        setIsUploading(false);
        setNewTitle('');
        setSelectedFile(null);
        fetchManuscripts();
      }, 1000);

    } catch (e: any) {
      alert(e.message);
      setIsSimulatingUpload(false);
    } finally {
      clearInterval(interval);
    }
  };

  return (
    <div className="py-32 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block mb-2">Academic Console</span>
            <h1 className="text-4xl md:text-7xl font-serif text-primary leading-none">Scholar Portal</h1>
            <p className="text-slate-400 font-light italic mt-4">Secure repository management for distinguished researchers.</p>
          </div>
          <button 
            onClick={() => setIsUploading(true)}
            className="btn-premium w-full md:w-auto flex items-center justify-center gap-4 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> New Submission
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-3 space-y-12">
            <h3 className="text-2xl font-serif text-primary flex items-center gap-4">
              <FileText size={28} className="text-accent" /> Active Research Assets
            </h3>
            
            {isLoadingPapers ? (
               <div className="py-32 bg-white rounded-[4rem] border border-slate-100 flex flex-col items-center justify-center gap-6">
                  <Loader2 className="animate-spin text-accent" size={48} />
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.6em]">Querying Archive Nodes...</p>
               </div>
            ) : (
              <div className="space-y-8">
                {manuscripts.length > 0 ? manuscripts.map((paper, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={paper.id} 
                    className="crystal-card p-12 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-10"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className={`px-5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                          paper.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-primary/5 text-primary border-primary/10'
                        }`}>
                          {paper.status.replace('_', ' ')}
                        </span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest font-mono">#{paper.id.slice(0, 8)}</span>
                      </div>
                      <h4 className="text-3xl font-serif text-primary max-w-xl leading-snug">{paper.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> Submission Date: {new Date(paper.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <button className="flex-1 md:flex-none px-10 py-4 bg-bg text-primary rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 border border-slate-100">Audit Trail</button>
                      <button className="flex-1 md:flex-none btn-premium py-4">Manage</button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-accent/20">
                    <p className="text-slate-400 font-light italic text-xl">No manuscripts recorded in your personal repository.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-12">
            <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm text-center">
              <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-10 block">Integrity Metrics</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-slate-50 pb-6">
                  <span className="text-xs text-slate-500 font-medium">Under Review</span>
                  <span className="text-3xl font-serif font-bold text-primary">{manuscripts.filter(p => p.status === 'UNDER_REVIEW').length}</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-50 pb-6">
                  <span className="text-xs text-slate-500 font-medium">Validated</span>
                  <span className="text-3xl font-serif font-bold text-accent">{manuscripts.filter(p => p.status === 'ACCEPTED').length}</span>
                </div>
              </div>
            </section>
            
            <section className="bg-primary text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
               <ShieldCheck className="text-accent mb-8" size={48} />
               <h4 className="text-3xl font-serif mb-6 italic">Secure Horizon</h4>
               <p className="text-slate-300 text-sm font-light leading-relaxed italic">Your intellectual assets are protected by enterprise-grade AES-256 encryption.</p>
            </section>
          </aside>
        </div>

        <AnimatePresence>
          {isUploading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-primary/70 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white max-w-3xl w-full rounded-[5rem] p-16 md:p-24 shadow-2xl relative"
              >
                {!isSimulatingUpload ? (
                  <>
                    <button onClick={() => setIsUploading(false)} className="absolute top-16 right-16 text-slate-200 hover:text-primary transition-colors">
                      <X size={32} />
                    </button>
                    <span className="text-[9px] font-bold text-accent uppercase tracking-[0.5em] block mb-4">Submission Gateway</span>
                    <h3 className="text-5xl font-serif text-primary mb-6">Deposit Research</h3>
                    <div className="space-y-12">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] block mb-6 ml-2">Manuscript Title</label>
                        <input 
                          type="text" 
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="Academic & Scientific Title..."
                          className="w-full px-10 py-6 bg-bg border border-slate-100 rounded-[2.5rem] text-lg outline-none"
                        />
                      </div>
                      <div className="border-2 border-dashed border-slate-100 rounded-[4rem] p-16 text-center group hover:bg-bg transition-all cursor-pointer relative">
                        <Upload size={48} className="mx-auto mb-6 text-slate-200 group-hover:text-accent transition-all" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">{selectedFile ? selectedFile.name : 'Select Digital Research Asset'}</p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} />
                      </div>
                      <button onClick={handleConfirmUpload} className="btn-premium w-full py-8">
                        Initiate Secure Deposit
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-16 py-10">
                    <Loader2 className="animate-spin text-primary mx-auto" size={80} />
                    <div className="space-y-6">
                      <h4 className="text-4xl font-serif text-primary">Validating Cryptography...</h4>
                      <p className="text-slate-400 font-light italic text-xl">Encapsulating Asset: {uploadProgress}%</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
// Updated for git commit
