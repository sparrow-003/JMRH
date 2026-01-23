import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, Users, FileText, Activity, 
  Download, BarChart3, Clock, 
  Trash2, Search, Filter, RefreshCw, Eye, 
  ShieldCheck, Globe,
  BookOpen, FileDown, LayoutDashboard, Calendar, ListFilter,
  CheckCircle2 as AcceptedIcon, RotateCcw as RevisionIcon, XCircle as RejectedIcon, Send as PublishedIcon,
  X, Mail, Award, UserCog, Ban, CheckCircle, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../components/AuthContext';
import { UserProfile, Manuscript, VisitLog, DownloadLog, UserRole } from '../../types';

const AdminDashboard: React.FC = () => {
  const { user, role, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'users' | 'analytics'>('overview');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [logs, setLogs] = useState<VisitLog[]>([]);
  const [downloads, setDownloads] = useState<DownloadLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDiscipline, setFilterDiscipline] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Management State
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [roleModal, setRoleModal] = useState<{ user: UserProfile, targetRole?: UserRole, targetStatus?: UserProfile['status'] } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || role !== 'ADMIN')) {
      navigate('/system/control-panel/login');
      return;
    }

    if (isAuthenticated && role === 'ADMIN') {
      fetchAllData();
    }
  }, [isAuthenticated, role, authLoading, navigate]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const { data: userData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (userData) {
        setUsers(userData.map(u => ({
          id: u.id,
          firstName: u.first_name,
          lastName: u.last_name,
          email: u.email,
          role: u.role as UserRole,
          city: u.city,
          pincode: u.pincode,
          age: u.age,
          phdStatus: u.phd_status,
          department: u.department,
          institutionName: u.institution_name,
          isVerified: u.is_verified,
          status: u.status,
          createdAt: u.created_at
        })));
      }

      const { data: manuscriptData } = await supabase
        .from('manuscripts')
        .select(`*, author_profile:profiles(*)`)
        .order('created_at', { ascending: false });
      if (manuscriptData) setManuscripts(manuscriptData);

      const { data: visitLogs } = await supabase.from('visit_logs').select('*').order('timestamp', { ascending: false }).limit(100);
      if (visitLogs) setLogs(visitLogs);

      const { data: downloadLogs } = await supabase
        .from('download_logs')
        .select(`*, profiles(first_name, last_name, email)`)
        .order('timestamp', { ascending: false })
        .limit(100);
      if (downloadLogs) setDownloads(downloadLogs);

    } catch (error: any) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateManuscriptStatus = async (id: string, status: Manuscript['status']) => {
    const { error } = await supabase.from('manuscripts').update({ status }).eq('id', id);
    if (!error) fetchAllData();
  };

  const handleDeleteManuscript = async (id: string) => {
    if (!confirm("Delete this manuscript permanently?")) return;
    const { error } = await supabase.from('manuscripts').delete().eq('id', id);
    if (!error) fetchAllData();
  };

  const applyUserUpdate = async () => {
    if (!roleModal) return;
    setIsUpdating(true);
    try {
      const updates: any = {};
      if (roleModal.targetRole) updates.role = roleModal.targetRole;
      if (roleModal.targetStatus) updates.status = roleModal.targetStatus;

      const { error } = await supabase.from('profiles').update(updates).eq('id', roleModal.user.id);
      if (error) throw error;
      
      setRoleModal(null);
      await fetchAllData();
    } catch (e: any) {
      alert("Failed to update user: " + e.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredManuscripts = useMemo(() => {
    return manuscripts.filter(m => {
      const searchLower = searchTerm.toLowerCase();
      const authorName = `${m.author_profile?.first_name || ''} ${m.author_profile?.last_name || ''}`.toLowerCase();
      const authorEmail = (m.author_profile?.email || '').toLowerCase();
      const manuscriptTitle = (m.title || '').toLowerCase();

      const matchesSearch = 
        manuscriptTitle.includes(searchLower) || 
        authorName.includes(searchLower) ||
        authorEmail.includes(searchLower);
      
      const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
      const disc = (m as any).discipline;
      const matchesDiscipline = filterDiscipline === 'all' || disc === filterDiscipline;
      
      const mDate = new Date(m.created_at);
      const matchesDateFrom = !dateFrom || mDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || mDate <= new Date(dateTo);

      return matchesSearch && matchesStatus && matchesDiscipline && matchesDateFrom && matchesDateTo;
    });
  }, [manuscripts, searchTerm, filterStatus, filterDiscipline, dateFrom, dateTo]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const searchLower = userSearchTerm.toLowerCase();
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      return fullName.includes(searchLower) || u.email.toLowerCase().includes(searchLower) || u.institutionName?.toLowerCase().includes(searchLower);
    });
  }, [users, userSearchTerm]);

  const statusStats = useMemo(() => {
    const stats = {
      SUBMITTED: 0,
      UNDER_REVIEW: 0,
      REVISION: 0,
      ACCEPTED: 0,
      REJECTED: 0,
      PUBLISHED: 0,
    };
    manuscripts.forEach(m => {
      if (m.status in stats) {
        stats[m.status as keyof typeof stats]++;
      }
    });
    return stats;
  }, [manuscripts]);

  const disciplines = Array.from(new Set(manuscripts.map(m => (m as any).discipline).filter(Boolean)));

  if (authLoading || !isAuthenticated || role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg">
        {/* Fix: Use the imported Lock icon from lucide-react to prevent reference to the global Lock class */}
        <Lock size={48} className="text-slate-200 mb-6" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validating Administrative Privileges...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-24 pb-12 px-6">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-xl shadow-accent/20">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-4xl font-serif text-primary font-medium tracking-tight">Admin Console</h1>
            </div>
          </div>
          <nav className="flex bg-white p-1.5 rounded-[2rem] border border-slate-100 shadow-sm gap-1">
            {[
              { id: 'overview', label: 'Dashboard', icon: <BarChart3 size={14} /> },
              { id: 'submissions', label: 'Deposits', icon: <FileText size={14} /> },
              { id: 'users', label: 'Scholars', icon: <Users size={14} /> },
              { id: 'analytics', label: 'Audit Trail', icon: <Clock size={14} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); }}
                className={`flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-primary'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-4">
              <Users size={40} className="text-accent" />
              <h4 className="text-4xl font-serif text-primary font-bold">{users.length}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Total Scholars</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-4">
              <FileText size={40} className="text-accent" />
              <h4 className="text-4xl font-serif text-primary font-bold">{manuscripts.length}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Total Deposits</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-4">
              <Activity size={40} className="text-accent" />
              <h4 className="text-4xl font-serif text-primary font-bold">{logs.length}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Recent Activity</p>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-wrap gap-4 overflow-x-auto pb-4">
              <button 
                onClick={() => setFilterStatus('all')}
                className={`flex-1 min-w-[150px] p-6 rounded-[2.5rem] border transition-all text-left relative overflow-hidden group ${
                  filterStatus === 'all' ? 'bg-primary text-white border-primary shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-accent/40'
                }`}
              >
                <div className="flex justify-between items-start mb-2 relative z-10">
                   <ListFilter size={18} className={filterStatus === 'all' ? 'text-accent' : 'text-slate-200'} />
                   <span className="text-2xl font-serif font-bold">{manuscripts.length}</span>
                </div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] relative z-10">Universal Pool</p>
              </button>
              {Object.entries(statusStats).map(([status, count]) => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`flex-1 min-w-[150px] p-6 rounded-[2.5rem] border transition-all text-left relative overflow-hidden group ${
                    filterStatus === status ? 'bg-white border-accent shadow-xl' : 'bg-white text-slate-400 border-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 relative z-10">
                     <span className={`w-1.5 h-1.5 rounded-full mt-2.5 ${
                       status === 'ACCEPTED' ? 'bg-emerald-500' :
                       status === 'PUBLISHED' ? 'bg-blue-500' : 'bg-slate-300'
                     }`} />
                     <span className={`text-2xl font-serif font-bold ${filterStatus === status ? 'text-primary' : 'text-slate-400'}`}>{count}</span>
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] relative z-10">{status.replace('_', ' ')}</p>
                </button>
              ))}
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left min-w-[1100px]">
                <thead>
                  <tr className="bg-bg text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-10 py-6">Identity</th>
                    <th className="px-10 py-6">Scholarly Thesis</th>
                    <th className="px-10 py-6">Researcher</th>
                    <th className="px-10 py-6">Submission Date</th>
                    <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredManuscripts.map((m) => (
                    <tr key={m.id} className="group hover:bg-bg/40 transition-all duration-300">
                      <td className="px-10 py-8">
                         <div className="space-y-2">
                           <p className="text-[10px] font-mono text-slate-300 italic">#{m.id.slice(0,8)}</p>
                           <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border shadow-sm ${
                             m.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                             m.status === 'PUBLISHED' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                           }`}>
                             {m.status.replace('_', ' ')}
                           </span>
                         </div>
                      </td>
                      <td className="px-10 py-8">
                        <p className="text-base font-serif text-primary font-medium max-w-md leading-tight">{m.title}</p>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-primary text-white flex items-center justify-center text-[11px] font-bold shadow-sm">
                            {m.author_profile?.first_name?.[0]}{m.author_profile?.last_name?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">{m.author_profile?.first_name} {m.author_profile?.last_name}</p>
                            <p className="text-[10px] text-slate-400 font-light truncate max-w-[150px]">{m.author_profile?.institution_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <p className="text-sm text-slate-400 font-light flex items-center gap-2"><Calendar size={12} /> {new Date(m.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-10 py-8 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {m.file_url && (
                              <a href={m.file_url} target="_blank" className="p-3 text-primary bg-white border border-slate-100 rounded-xl hover:border-accent shadow-sm">
                                <Eye size={16} />
                              </a>
                            )}
                            <button onClick={() => handleUpdateManuscriptStatus(m.id, 'ACCEPTED')} className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl">
                              <AcceptedIcon size={16} />
                            </button>
                            <button onClick={() => handleDeleteManuscript(m.id)} className="p-3 text-slate-200 hover:text-red-900 hover:bg-red-50 rounded-xl">
                              <Trash2 size={16} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Audit / Analytics Content */}
        {activeTab === 'analytics' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                 <h3 className="text-xl font-serif text-primary mb-10 flex items-center gap-3"><Globe size={24} className="text-accent" /> Recent Page Visits</h3>
                 <div className="space-y-6">
                    {logs.map(log => (
                       <div key={log.id} className="flex justify-between items-center pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                          <div>
                             <p className="text-sm font-bold text-primary">{log.path}</p>
                             <p className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleString()}</p>
                          </div>
                          <span className="text-[10px] font-mono text-slate-300">{log.ip}</span>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                 <h3 className="text-xl font-serif text-primary mb-10 flex items-center gap-3"><FileDown size={24} className="text-accent" /> Resource Downloads</h3>
                 <div className="space-y-6">
                    {downloads.map(d => (
                       <div key={d.id} className="flex justify-between items-center pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                          <div>
                             <p className="text-sm font-bold text-primary">{d.file_name}</p>
                             <p className="text-[10px] text-slate-400">{d.profiles?.first_name} {d.profiles?.last_name} • {new Date(d.timestamp).toLocaleString()}</p>
                          </div>
                          <Download size={16} className="text-slate-200" />
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* Confirmation Modal */}
        <AnimatePresence>
          {roleModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white max-w-md w-full rounded-[3rem] p-10 shadow-2xl border border-slate-100"
              >
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                    <ShieldCheck size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-primary">Confirm Modification</h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      Modify identity <span className="font-bold text-primary">{roleModal.user.firstName} {roleModal.user.lastName}</span>?
                    </p>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setRoleModal(null)} className="flex-1 py-4 bg-bg text-slate-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest">Cancel</button>
                    <button onClick={applyUserUpdate} disabled={isUpdating} className="flex-1 btn-premium">Apply</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;