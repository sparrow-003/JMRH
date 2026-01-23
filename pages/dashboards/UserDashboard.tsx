
import React, { useState, useEffect } from 'react';
// Added missing Link import from react-router-dom
import { Link } from 'react-router-dom';
import { History, User, Clock, FileCheck, MapPin, Building, GraduationCap, Download, Loader2, RefreshCw } from 'lucide-react';
import { useAuth } from '../../components/AuthContext';
import { motion } from 'framer-motion';
import { Manuscript } from '../../types';
import { supabase } from '../../lib/supabase';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [downloads, setDownloads] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Manuscript[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // Fetch submissions from manuscripts table
      const { data: manuscriptData } = await supabase
        .from('manuscripts')
        .select('*')
        .eq('author_id', user?.id)
        .order('created_at', { ascending: false });

      if (manuscriptData) {
        // Fixed mapping to use author_id and include created_at
        setSubmissions(manuscriptData.map((m: any) => ({
          id: m.id,
          title: m.title,
          author_id: m.author_id,
          status: m.status,
          uploadDate: new Date(m.created_at).toLocaleDateString(),
          visibility: m.visibility,
          created_at: m.created_at
        })));
      }

      // Fetch personal download logs
      const { data: logsData } = await supabase
        .from('download_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('timestamp', { ascending: false });

      if (logsData) setDownloads(logsData);

    } catch (err) {
      console.error('Data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-32 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.5em] block mb-4">Scholar Console</span>
            <h1 className="text-4xl md:text-6xl font-serif text-blue-950 leading-tight">Researcher Workspace</h1>
            <p className="text-slate-400 font-light italic mt-2">Active repository management for {user?.firstName} {user?.lastName}.</p>
          </motion.div>
          <button 
            onClick={fetchUserData}
            className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-blue-900 hover:border-blue-100 transition-all shadow-sm"
          >
            <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </header>

        {isLoading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
             <Loader2 className="animate-spin text-blue-950" size={40} />
             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.6em]">Synchronizing Repository...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Active Submissions */}
              <section className="space-y-10">
                <h3 className="text-xl font-serif text-blue-950 flex items-center gap-4">
                  <History className="text-amber-700" size={24} /> Manuscript Repository
                </h3>
                <div className="space-y-6">
                  {submissions.length > 0 ? submissions.map((paper, i) => (
                    <motion.div 
                      key={paper.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="premium-card p-12 rounded-[3.5rem]"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                        <div className="space-y-4">
                          <h4 className="text-2xl font-serif text-blue-950 font-medium max-w-xl leading-snug">{paper.title}</h4>
                          <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Clock size={16} /> Submitted: {paper.uploadDate}</span>
                            <span className="flex items-center gap-2"><FileCheck size={16} /> Ref: {paper.id.slice(0, 8)}</span>
                          </div>
                        </div>
                        <span className={`px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border ${
                          paper.status === 'UNDER_REVIEW' ? 'bg-amber-50 text-amber-800 border-amber-100' : 
                          paper.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                          'bg-blue-50 text-blue-900 border-blue-100'
                        }`}>
                          {paper.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="pt-8 border-t border-slate-50 flex gap-4">
                        <button className="px-8 py-3 bg-slate-50 text-blue-950 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">Review Feedback</button>
                        <button className="px-8 py-3 bg-blue-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg">Manage Asset</button>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="py-32 bg-white rounded-[4rem] border border-dashed border-slate-200 text-center space-y-4">
                      <p className="text-slate-400 font-light italic text-lg">Your scholarly submissions will appear here.</p>
                      <Link to="/submit" className="text-blue-900 font-bold uppercase text-[10px] tracking-[0.3em] hover:underline">Begin First Submission</Link>
                    </div>
                  )}
                </div>
              </section>

              {/* Download History */}
              <section className="space-y-10">
                 <h3 className="text-xl font-serif text-blue-950 flex items-center gap-4">
                  <Download className="text-emerald-700" size={24} /> Scholarly Access Logs
                </h3>
                <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                  {downloads.length > 0 ? (
                    <div className="space-y-8">
                      {downloads.map((d: any) => (
                        <div key={d.id} className="flex justify-between items-center pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                          <div>
                            <p className="text-base font-medium text-blue-950">Asset: {d.file_name}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Accessed: {new Date(d.timestamp).toLocaleString()}</p>
                          </div>
                          <span className="px-4 py-1.5 bg-slate-50 text-slate-300 rounded-full text-[9px] font-bold uppercase tracking-widest">Logged: {d.id.toString().slice(0, 8)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-300 text-sm italic font-light">Securely preserving your access history...</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-10">
              <motion.div 
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm text-center space-y-10"
              >
                <div className="w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100 overflow-hidden relative group">
                  <User size={54} className="text-blue-900 transition-transform group-hover:scale-110 duration-700" />
                  <div className="absolute inset-0 bg-blue-950/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-3xl font-serif text-blue-950 font-bold">{user?.firstName} {user?.lastName}</h4>
                  <div className={`inline-block px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] ${
                    user?.isVerified ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-amber-50 text-amber-800 border border-amber-100'
                  }`}>
                    {user?.isVerified ? 'Verified Scholar' : 'Identity Verification Pending'}
                  </div>
                </div>
                
                <div className="text-left space-y-6 pt-10 border-t border-slate-50">
                   <div className="flex items-start gap-4 text-slate-500">
                      <MapPin size={20} className="shrink-0 mt-1 text-slate-300" />
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-1">Regional Context</p>
                        <p className="text-sm font-medium text-slate-700">{user?.city}, {user?.pincode}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 text-slate-500">
                      <Building size={20} className="shrink-0 mt-1 text-slate-300" />
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-1">Affiliated Institution</p>
                        <p className="text-sm font-medium text-slate-700">{user?.institutionName || 'Self-Independent Scholar'}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 text-slate-500">
                      <GraduationCap size={20} className="shrink-0 mt-1 text-slate-300" />
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-1">Academic Profile</p>
                        <p className="text-sm font-medium text-slate-700">{user?.department} <br /> PhD: {user?.phdStatus}</p>
                      </div>
                   </div>
                </div>
              </motion.div>

              <div className="bg-blue-950 text-white p-12 rounded-[4rem] space-y-8 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.4)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 opacity-5 blur-[50px] group-hover:opacity-10 transition-opacity" />
                <FileCheck className="text-amber-500 mb-4" size={40} />
                <h4 className="text-3xl font-serif italic">Scholarly Certification</h4>
                <p className="text-blue-200/60 text-base leading-relaxed font-light italic">Validated researchers are eligible for official JMRH certification upon successful multidisciplinary vetting.</p>
                <button className="w-full py-5 bg-white/10 hover:bg-white text-blue-950 hover:text-blue-950 transition-all duration-700 rounded-3xl text-[10px] font-bold uppercase tracking-[0.4em] border border-white/10 group-hover:border-transparent">Request Certification</button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
