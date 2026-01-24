
import React, { useState } from 'react';
import { CheckCircle2, FileUp, Send, ShieldCheck, Loader2, Info, UploadCloud, LogIn, GraduationCap, Building, ArrowRight, FileCheck } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { PHD_COURSES_INDIA, CONTACT_EMAILS } from '../constants';

const SubmitPaper: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [customDiscipline, setCustomDiscipline] = useState('');
  const [abstract, setAbstract] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAuthenticated) {
      navigate('/login?redirect=/submit');
      return;
    }

    setIsSubmitting(true);
    setProgress(30);

    try {
      // 1. Log the initiation to manuscripts table
      const { error } = await supabase.from('manuscripts').insert({
        title: title,
        abstract: abstract,
        discipline: discipline || 'Multidisciplinary',
        author_id: user.id,
        status: 'SUBMITTED',
        visibility: 'Public'
      });

      if (error) throw error;

      setProgress(100);
      setShowSuccess(true);
      setIsSubmitting(false);
    } catch (err: any) {
      console.error("Submission Failure:", err);
      alert("Scholarly Deposit Failed: " + (err.message || "Unknown variance in network protocol."));
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2.5rem] focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all text-sm";
  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] pl-6 mb-3 block";

  return (
    <div className="py-40 bg-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-accent/10 relative">

          <div className="bg-primary p-20 md:p-28 text-center text-white relative">
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block mb-8">Author Portal</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-none">Manuscript <span className="italic font-normal serif text-accent/50">Submission</span></h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light italic">"Advancing the multidisciplinary research horizon."</p>
          </div>

          <div className="p-12 md:p-24 grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="lg:col-span-2 space-y-16">
              {!isAuthenticated ? (
                <div className="text-center space-y-12 py-10">
                  <LogIn size={48} className="text-accent mx-auto" />
                  <h2 className="text-4xl font-serif text-primary">Identity Required</h2>
                  <p className="text-slate-500 max-w-md mx-auto italic">Authors must authenticate to maintain ISSN compliance and track submission status.</p>
                  <Link to="/login?redirect=/submit" className="btn-premium inline-block">Scholar Login</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-8">
                    <div>
                      <label className={labelClass}>Manuscript Title *</label>
                      <input type="text" required value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} className={inputClass} placeholder="Enter technical title..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className={labelClass}>Discipline</label>
                        <select className={inputClass} value={discipline} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDiscipline(e.target.value)}>
                          {PHD_COURSES_INDIA.map((d: string) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Abstract Preview</label>
                        <textarea className={inputClass} placeholder="Short technical summary..." rows={3} value={abstract} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAbstract(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* Submission Note */}
                  <div className="p-10 bg-accent/5 rounded-[3rem] border border-accent/10 flex gap-6">
                    <Info className="text-accent shrink-0" size={24} />
                    <p className="text-sm text-slate-600 font-light leading-relaxed italic">
                      Once details are logged, you will be redirected to dispatch your full manuscript package via official email for tracking.
                    </p>
                  </div>

                  <button type="submit" className="btn-premium w-full flex items-center justify-center gap-4">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Log Submission Details</>}
                  </button>
                </form>
              )}
            </div>

            <aside className="space-y-12">
              <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 space-y-10">
                <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] flex items-center gap-3">
                  <FileCheck size={20} /> Required Documents
                </h3>
                <div className="space-y-6">
                  {[
                    { label: "Manuscript", desc: "Word format (.doc/.docx)" },
                    { label: "Plagiarism Report", desc: "Less than 10% similarity" },
                    { label: "Declaration", desc: "Statement of originality" }
                  ].map((doc, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-sm font-bold text-primary flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" /> {doc.label}
                      </p>
                      <p className="text-[10px] text-slate-400 italic pl-6">{doc.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-accent/10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Submission Address</p>
                  <p className="text-sm font-serif italic text-accent underline">{CONTACT_EMAILS.SUBMISSION}</p>
                </div>
              </div>

              <div className="p-10 bg-primary text-white rounded-[4rem] shadow-xl space-y-6">
                <ShieldCheck className="text-accent" size={32} />
                <h4 className="text-xl font-serif italic">Publication Ethics</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">By submitting, you agree to JMRH's double-blind peer review process and ₹650 publication fee (post-acceptance).</p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-primary/90 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-16 rounded-[4rem] max-w-xl text-center space-y-8">
              <CheckCircle2 size={80} className="text-emerald-500 mx-auto" />
              <h2 className="text-4xl font-serif text-primary">Submission Initiated</h2>
              <p className="text-slate-500 font-light italic">Your intent has been logged. Please send your full document package to {CONTACT_EMAILS.SUBMISSION} to complete the process.</p>
              <button onClick={() => setShowSuccess(false)} className="btn-premium">Return to Dashboard</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmitPaper;
