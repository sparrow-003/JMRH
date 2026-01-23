
import React, { useState } from 'react';
import { CheckCircle2, FileUp, Send, ShieldCheck, Loader2, Info, UploadCloud, LogIn, GraduationCap, Building, ArrowRight } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { PHD_COURSES_INDIA } from '../constants';

const SubmitPaper: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Form State
  const [title, setTitle] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [customDiscipline, setCustomDiscipline] = useState('');
  const [abstract, setAbstract] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [scholarRank, setScholarRank] = useState('PhD Scholar');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 15 * 1024 * 1024) { // Increased to 15MB for thesis chapters
        alert("File size exceeds 15MB. Please optimize the manuscript.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
       navigate('/login?redirect=/submit');
       return;
    }
    
    const finalDiscipline = discipline === 'Other' ? customDiscipline : discipline;

    if (!title || !selectedFile || !finalDiscipline) {
      alert("Please complete all mandatory scholarly fields.");
      return;
    }

    setIsSubmitting(true);
    setProgress(10);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `manuscripts/${user?.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('manuscripts')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;
      setProgress(60);

      const { data: { publicUrl } } = supabase.storage
        .from('manuscripts')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase.from('manuscripts').insert({
        title,
        author_id: user?.id,
        status: 'SUBMITTED',
        file_url: publicUrl,
        visibility: 'Restricted',
        discipline: finalDiscipline,
        abstract: abstract,
        metadata: {
          supervisor: supervisor,
          scholarRank: scholarRank,
          university: user?.institutionName
        }
      });

      if (dbError) throw dbError;
      
      setProgress(100);
      setShowSuccess(true);
      
      setTitle('');
      setDiscipline('');
      setCustomDiscipline('');
      setAbstract('');
      setSupervisor('');
      setSelectedFile(null);

    } catch (err: any) {
      console.error("Submission error:", err);
      alert(err.message || "An error occurred during submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2.5rem] focus:outline-none focus:ring-2 focus:ring-blue-900/10 transition-all text-sm";
  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] pl-6 mb-3 block";

  return (
    <div className="py-40 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-[4rem] shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-100 relative">
          
          <AnimatePresence>
            {showSuccess && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-[60] bg-white flex flex-col items-center justify-center p-12 text-center"
              >
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="w-32 h-32 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-xl"
                >
                  <CheckCircle2 size={64} />
                </motion.div>
                <h2 className="text-5xl font-serif text-blue-950 mb-4">Manuscript Logged</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-12 text-lg font-light leading-relaxed italic">
                  Excellent contribution, Scholar. Your work is now in the initial screening queue.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setShowSuccess(false)} className="px-12 py-5 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200">Submit Another</button>
                  <button onClick={() => navigate(`/user/${user?.id}`)} className="px-12 py-5 bg-blue-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 shadow-xl">Back to Workspace</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-blue-950 p-20 md:p-28 text-center text-white relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="grid grid-cols-12 h-full gap-4 rotate-12 scale-150">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-white/20 rounded-full h-full w-px" />
                  ))}
                </div>
            </div>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] block mb-8 relative z-10">Academic Excellence Platform</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 relative z-10 leading-none">Manuscript <span className="italic font-normal serif text-blue-200/50">Deposit</span></h1>
            <p className="text-blue-200/60 max-w-2xl mx-auto text-xl font-light relative z-10 italic">"Advancing the frontiers of multidisciplinary knowledge."</p>
          </div>

          <div className="p-12 md:p-24">
            {!isAuthenticated ? (
              <div className="text-center space-y-12 py-10">
                <div className="w-24 h-24 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <LogIn size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-5xl font-serif text-blue-950">Identity Required</h2>
                  <p className="text-slate-500 max-w-md mx-auto font-light leading-relaxed italic text-lg">
                    To maintain ISSN compliance and citation accuracy, authors must authenticate their profile.
                    <span className="block mt-6 text-blue-950 font-bold uppercase text-[11px] tracking-[0.4em] bg-blue-50 py-4 rounded-full border border-blue-100">Portal Login is 100% Mandatory</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                  <Link to="/login?redirect=/submit" className="w-full sm:w-auto px-16 py-7 bg-blue-950 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.4em] shadow-2xl hover:bg-amber-800 transition-all flex items-center gap-3">
                    Scholar Login <ArrowRight size={16} />
                  </Link>
                  <Link to="/login?redirect=/submit&mode=register" className="w-full sm:w-auto px-16 py-7 bg-white border border-slate-200 text-slate-900 rounded-full text-[11px] font-bold uppercase tracking-[0.4em] hover:border-blue-900 transition-all">
                    New Registration
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                <div className="lg:col-span-2 space-y-14">
                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className={labelClass}>Manuscript Research Title *</label>
                      <input 
                        type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="Complete scholarly title of your research..."
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className={labelClass}>Research Discipline *</label>
                        <select 
                          required value={discipline} onChange={(e) => setDiscipline(e.target.value)}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="">Select Domain</option>
                          {PHD_COURSES_INDIA.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {discipline === 'Other' && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                            <input type="text" placeholder="Type Research Discipline..." value={customDiscipline} onChange={(e) => setCustomDiscipline(e.target.value)} className={inputClass} required />
                          </motion.div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <label className={labelClass}>Academic Rank</label>
                        <select value={scholarRank} onChange={(e) => setScholarRank(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                          <option>PhD Scholar</option>
                          <option>Senior Research Fellow</option>
                          <option>Junior Research Fellow</option>
                          <option>Post-Doctoral Fellow</option>
                          <option>Assistant Professor</option>
                          <option>Independent Researcher</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                       <label className={labelClass}>Research Supervisor / Guide Name</label>
                       <input 
                         type="text" value={supervisor} onChange={(e) => setSupervisor(e.target.value)}
                         placeholder="e.g. Dr. A. Muralidharan"
                         className={inputClass}
                       />
                    </div>

                    <div className="space-y-3">
                      <label className={labelClass}>Scholarly Abstract *</label>
                      <textarea 
                        required rows={8} value={abstract} onChange={(e) => setAbstract(e.target.value)}
                        placeholder="Provide a technical summary including methodology and findings..."
                        className={`${inputClass} resize-none rounded-[3rem] p-10`}
                      />
                    </div>
                  </div>

                  <div className="space-y-10">
                    <h3 className="text-3xl font-serif text-blue-950 flex items-center gap-4">
                      <UploadCloud size={32} className="text-blue-900" /> Digital Manuscript Upload
                    </h3>
                    <div className={`relative border-2 border-dashed rounded-[4rem] p-24 text-center transition-all group ${
                      selectedFile ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200'
                    }`}>
                      <input type="file" accept=".doc,.docx" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      {selectedFile ? (
                        <div className="space-y-6">
                           <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                             <CheckCircle2 size={48} className="text-emerald-500" />
                           </div>
                           <div>
                              <p className="text-2xl font-serif text-blue-950 mb-1">{selectedFile.name}</p>
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                           </div>
                           <button onClick={(e) => { e.preventDefault(); setSelectedFile(null); }} className="text-[10px] font-bold text-red-500 uppercase tracking-[0.4em] hover:underline">Change File</button>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                            <FileUp size={48} className="text-slate-300 group-hover:text-blue-900" />
                          </div>
                          <div className="space-y-2">
                             <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.5em]">Select Word Manuscript</p>
                             <p className="text-[10px] text-slate-300 uppercase tracking-widest italic">Supports .doc and .docx (Max 15MB)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <aside className="space-y-12">
                  <div className="p-12 bg-blue-50/50 rounded-[4rem] border border-blue-100 space-y-10">
                    <h4 className="text-[11px] font-bold text-blue-900 uppercase tracking-[0.6em] flex items-center gap-3">
                      <ShieldCheck size={20} /> Integrity Vetting
                    </h4>
                    <div className="space-y-8">
                      {[
                        "Plagiarism level is strictly below 10%",
                        "Manuscript follows APA 7th Edition style",
                        "No identifying author data in main file",
                        "Originality and Ethics clearance"
                      ].map((text, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                           <input type="checkbox" required className="w-6 h-6 rounded-lg border-blue-200 text-blue-900 focus:ring-blue-900/10 cursor-pointer" />
                           <span className="text-sm font-medium text-slate-600 leading-tight group-hover:text-blue-950 transition-colors">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-10">
                    <button 
                      type="submit" disabled={isSubmitting}
                      className="w-full py-10 bg-blue-950 text-white rounded-[3rem] font-bold uppercase text-[12px] tracking-[0.7em] hover:bg-amber-800 transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={24} className="animate-spin" /> {progress < 100 ? `Processing ${progress}%` : 'Finalizing...'}
                        </>
                      ) : (
                        <>
                          <Send size={24} /> Dispatch Paper
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 font-bold leading-relaxed italic px-8">
                      Decision: Submission implies acceptance of JMRH Editorial Board finality and Peer-Review outcomes.
                    </p>
                  </div>

                  <div className="p-12 bg-slate-50 rounded-[3.5rem] flex gap-6 items-start border border-slate-100">
                    <Info size={28} className="text-amber-700 shrink-0 mt-1" />
                    <div>
                       <h5 className="text-[11px] font-bold text-blue-900 uppercase tracking-widest mb-3">Timeline Note</h5>
                       <p className="text-sm text-slate-500 font-light leading-relaxed italic">The initial technical screening takes 7-10 working days. Full peer-review takes 3-4 weeks.</p>
                    </div>
                  </div>
                </aside>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPaper;
