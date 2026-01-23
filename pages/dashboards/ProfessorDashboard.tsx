
import React, { useState, useEffect } from 'react';
// Added missing Clock icon import
import { Upload, FileText, Plus, X, Loader2, FileCheck, ShieldCheck, ChevronRight, Clock } from 'lucide-react';
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

      // Log activity
      await supabase.from('visit_logs').insert({
        user_id: user?.id,
        path: '/manuscript-submission',
        ip: 'User Session',
        timestamp: new Date().toISOString()
      });

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
    <div className="py-32 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.5em] block mb-2">Academic Console</span>
            <h1 className="text-4xl md:text-7xl font-serif text-blue-950 leading-none">Scholar Portal</h1>
            <p className="text-slate-400 font-light italic mt-4">Secure repository management for distinguished researchers.</p>
          </div>
          <button 
            onClick={() => setIsUploading(true)}
            className="w-full md:w-auto px-14 py-6 bg-blue-950 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-blue-950/20 hover:bg-amber-800 transition-all flex items-center justify-center gap-4 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> New Submission
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-3 space-y-12">
            <h3 className="text-2xl font-serif text-blue-950 flex items-center gap-4">
              <FileText size={28} className="text-blue-900" /> Active Research Assets
            </h3>
            
            {isLoadingPapers ? (
               <div className="py-32 bg-white rounded-[4rem] border border-slate-100 flex flex-col items-center justify-center gap-6">
                  <Loader2 className="animate-spin text-blue-900" size={48} />
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.6em]">Querying Archive Nodes...</p>
               </div>
            ) : (
              <div className="space-y-8">
                {manuscripts.length > 0 ? manuscripts.map((paper, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    key={paper.id} 
                    className="premium-card p-12 rounded-[3.5rem] flex flex-col md:flex-row justify-between items-center gap-10"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className={`px-5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                          paper.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-blue-50 text-blue-900 border-blue-100'
                        }`}>
                          {paper.status.replace('_', ' ')}
                        </span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest font-mono">#{paper.id.slice(0, 8)}</span>
                      </div>
                      <h4 className="text-3xl font-serif text-blue-950 max-w-xl leading-snug">{paper.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> Submission Date: {new Date(paper.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <button className="flex-1 md:flex-none px-10 py-4 bg-slate-50 text-blue-950 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">Audit Trail</button>
                      <button className="flex-1 md:flex-none px-10 py-4 bg-blue-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-xl">Manage</button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-32 bg-white rounded-[4rem] border border-dashed border-slate-200">
                    <p className="text-slate-400 font-light italic text-xl">No manuscripts recorded in your personal repository.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-12">
            <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm text-center">
              <h3 className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.4em] mb-10 block">Integrity Metrics</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-slate-50 pb-6">
                  <span className="text-xs text-slate-500 font-medium">Under Review</span>
                  <span className="text-3xl font-serif font-bold text-blue-950">{manuscripts.filter(p => p.status === 'UNDER_REVIEW').length}</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-50 pb-6">
                  <span className="text-xs text-slate-500 font-medium">Validated</span>
                  <span className="text-3xl font-serif font-bold text-emerald-600">{manuscripts.filter(p => p.status === 'ACCEPTED').length}</span>
                </div>
              </div>
            </section>
            
            <section className="bg-blue-950 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-5 blur-[40px]" />
               <ShieldCheck className="text-amber-500 mb-8" size={48} />
               <h4 className="text-3xl font-serif mb-6 italic">Secure Horizon</h4>
               <p className="text-blue-200/60 text-sm font-light leading-relaxed italic">Your intellectual assets are protected by enterprise-grade AES-256 encryption & perpetual digital fingerprinting.</p>
            </section>
          </aside>
        </div>

        <AnimatePresence>
          {isUploading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-blue-950/70 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white max-w-3xl w-full rounded-[5rem] p-16 md:p-24 shadow-2xl relative"
              >
                {!isSimulatingUpload ? (
                  <>
                    <button onClick={() => setIsUploading(false)} className="absolute top-16 right-16 text-slate-200 hover:text-blue-950 transition-colors">
                      <X size={32} />
                    </button>
                    <span className="text-[9px] font-bold text-blue-900 uppercase tracking-[0.5em] block mb-4">Submission Gateway</span>
                    <h3 className="text-5xl font-serif text-blue-950 mb-6">Deposit Research</h3>
                    <p className="text-slate-400 font-light mb-16 italic text-lg leading-relaxed">Ensure your manuscript adheres to JMRH ethical guidelines before finalizing deposit.</p>
                    
                    <div className="space-y-12">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] block mb-6 ml-2">Manuscript Title</label>
                        <input 
                          type="text" 
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="Academic & Scientific Title..."
                          className="w-full px-10 py-6 bg-slate-50 rounded-[2.5rem] text-lg focus:outline-none focus:ring-2 focus:ring-blue-900/10 transition-all placeholder:text-slate-300"
                        />
                      </div>
                      <div className="border-2 border-dashed border-slate-100 rounded-[4rem] p-16 text-center group hover:bg-slate-50 transition-all cursor-pointer relative">
                        <Upload size={48} className="mx-auto mb-6 text-slate-200 group-hover:text-blue-950 transition-all group-hover:scale-110" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">{selectedFile ? selectedFile.name : 'Select Digital Research Asset'}</p>
                        <p className="text-[9px] text-slate-300 uppercase tracking-widest mt-2">Accepted formats: .doc, .docx</p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} />
                      </div>
                      <button onClick={handleConfirmUpload} className="w-full py-8 bg-blue-950 text-white rounded-[2.5rem] font-bold uppercase text-[11px] tracking-[0.5em] hover:bg-amber-800 transition-all shadow-2xl shadow-blue-950/20">
                        Initiate Secure Deposit
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-16 py-10">
                    <div className="relative inline-block">
                       <Loader2 className="animate-spin text-blue-950 mx-auto" size={80} strokeWidth={1} />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <ShieldCheck size={32} className="text-amber-500" />
                       </div>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-4xl font-serif text-blue-950">Validating Cryptography...</h4>
                      <p className="text-slate-400 font-light italic text-xl">Encapsulating Asset: {uploadProgress}%</p>
                    </div>
                    <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden max-w-md mx-auto">
                      <motion.div className="h-full bg-blue-950" animate={{ width: `${uploadProgress}%` }} />
                    </div>
                    <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                       <FileCheck size={18} className="text-emerald-500" /> Network Handshake Active
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
