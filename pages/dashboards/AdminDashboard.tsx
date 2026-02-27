
import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield, Users, FileText, Activity,
  Download, BarChart3, Clock,
  Trash2, Search, Filter, RefreshCw, Eye,
  ShieldCheck, Globe,
  BookOpen, FileDown, LayoutDashboard, Calendar, ListFilter,
  CheckCircle2 as AcceptedIcon, RotateCcw as RevisionIcon, XCircle as RejectedIcon, Send as PublishedIcon,
  X, Mail, Award, UserCog, Ban, CheckCircle, Lock,
  ChevronRight, ArrowUpRight, Zap, Database, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../components/AuthContext';
import { UserProfile, Manuscript, VisitLog, DownloadLog, UserRole } from '../../types';

const AdminDashboard: React.FC = () => {
  const { role, isAuthenticated, isLoading: authLoading } = useAuth();
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
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Management State
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
        setUsers(userData.map((u: any) => ({
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
    if (!error) await fetchAllData();
  };

  const handleDeleteManuscript = async (id: string) => {
    if (!confirm("Caution: This will permanently expunge this scholarly record. Proceed?")) return;
    const { error } = await supabase.from('manuscripts').delete().eq('id', id);
    if (!error) await fetchAllData();
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
      alert("Failed to update Scholar Profile: " + e.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredManuscripts = useMemo(() => {
    return manuscripts.filter((m: Manuscript) => {
      const searchLower = searchTerm.toLowerCase();
      const authorName = `${m.author_profile?.first_name || ''} ${m.author_profile?.last_name || ''}`.toLowerCase();
      const titleLower = (m.title || '').toLowerCase();
      const matchesSearch = titleLower.includes(searchLower) || authorName.includes(searchLower);
      const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [manuscripts, searchTerm, filterStatus]);

  const filteredUsers = useMemo(() => {
    return users.filter((u: UserProfile) => {
      const searchLower = userSearchTerm.toLowerCase();
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      return fullName.includes(searchLower) || u.email.toLowerCase().includes(searchLower);
    });
  }, [users, userSearchTerm]);

  if (authLoading || !isAuthenticated || role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg gap-6">
        <Lock size={48} className="text-accent animate-pulse" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">Establishing Secure Administrative Core...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-28 pb-20 px-8">
      <div className="max-w-[1700px] mx-auto">

        {/* ENHANCED HEADER */}
        <header className="mb-14 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-4 bg-primary text-white rounded-3xl shadow-2xl shadow-primary/20">
                <Shield size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-serif text-primary tracking-tight leading-none mb-2">Governance Console</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Network Secure & Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white/50 backdrop-blur-md p-1.5 rounded-[2.5rem] border border-slate-100 shadow-xl">
            {[
              { id: 'overview', label: 'Summary', icon: <LayoutDashboard size={14} /> },
              { id: 'submissions', label: 'Repository', icon: <BookOpen size={14} /> },
              { id: 'users', label: 'Scholars', icon: <Users size={14} /> },
              { id: 'analytics', label: 'Intelligence', icon: <Activity size={14} /> }
            ].map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-xl translate-y-[-2px]' : 'text-slate-400 hover:text-primary'
                  }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* QUICK ACTIONS BAR */}
        <div className="mb-12 flex gap-4 overflow-x-auto pb-2">
          <button onClick={fetchAllData} className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:border-accent hover:text-primary transition-all shadow-sm">
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Synchronize Data
          </button>
          <button className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:border-accent hover:text-primary transition-all shadow-sm">
            <FileDown size={14} /> Export Audit Logs
          </button>
          <div className="h-10 w-px bg-slate-100 mx-2 self-center"></div>
          <div className="flex items-center gap-4 px-6 py-4 bg-accent/5 border border-accent/10 rounded-2xl">
            <Zap size={14} className="text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Priority Vetting Queue: {manuscripts.filter((m: Manuscript) => m.status === 'SUBMITTED').length}</span>
          </div>
        </div>

        {/* OVERVIEW CONTENT */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Registered Scholars', val: users.length, icon: <Users />, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Active Manuscripts', val: manuscripts.length, icon: <FileText />, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Downloads Logged', val: downloads.length, icon: <Download />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'System Visibility', val: logs.length, icon: <Globe />, color: 'text-indigo-500', bg: 'bg-indigo-50' }
              ].map((stat: any, i: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative group overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-[5rem] opacity-50 transition-all group-hover:scale-110`}></div>
                  <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-sm`}>
                    {stat.icon}
                  </div>
                  <h4 className="text-4xl font-serif text-primary font-bold relative z-10 mb-2">{stat.val}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] relative z-10">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* SYSTEM HEALTH */}
              <div className="lg:col-span-1 bg-primary p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <Database className="absolute bottom-[-20px] right-[-20px] w-64 h-64 opacity-5" />
                <h3 className="text-2xl font-serif mb-8 flex items-center gap-4"><Terminal size={24} className="text-accent" /> System Health</h3>
                <div className="space-y-8">
                  <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl">
                    <div>
                      <p className="text-[9px] uppercase font-bold tracking-widest opacity-50 mb-1">Database Latency</p>
                      <p className="text-lg font-mono">14ms <span className="text-emerald-400 text-xs">Optimal</span></p>
                    </div>
                    <div className="w-12 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl">
                    <div>
                      <p className="text-[9px] uppercase font-bold tracking-widest opacity-50 mb-1">Server Capacity</p>
                      <p className="text-lg font-mono">2.4% <span className="text-emerald-400 text-xs">Stable</span></p>
                    </div>
                    <div className="w-12 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                      <div className="w-1/5 h-full bg-emerald-500"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <ShieldCheck size={20} className="text-accent" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Encryption: AES-256 Active</p>
                  </div>
                </div>
              </div>

              {/* RECENT ANALYTICS PREVIEW */}
              <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] border border-slate-100">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-serif text-primary">Live Traffic</h3>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                    View Intelligence <ArrowUpRight size={14} />
                  </span>
                </div>
                <div className="space-y-6">
                  {logs.slice(0, 5).map((log: VisitLog, i: number) => (
                    <div key={log.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 transition-all hover:pl-2">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{log.path}</p>
                          <p className="text-[10px] text-slate-300 uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <span className="px-4 py-1 bg-bg border border-slate-50 rounded-full text-[9px] font-mono text-slate-400">{log.ip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBMISSIONS REPOSITORY */}
        {activeTab === 'submissions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div className="relative flex-grow max-w-xl">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="text" placeholder="Search Repository Identity or Title..."
                    className="w-full pl-16 pr-8 py-5 bg-bg border-none rounded-3xl text-sm focus:ring-2 focus:ring-accent/10 transition-all"
                    value={searchTerm} onChange={(e: any) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={filterStatus} onChange={(e: any) => setFilterStatus(e.target.value)}
                    className="px-8 py-5 bg-bg rounded-3xl text-[10px] font-bold uppercase tracking-widest text-slate-500 border-none appearance-none cursor-pointer hover:bg-slate-100 transition-all"
                  >
                    <option value="all">Universal Pool</option>
                    <option value="SUBMITTED">Under Vetting</option>
                    <option value="ACCEPTED">Scholarly Approved</option>
                    <option value="PUBLISHED">Digital Repository</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[1200px]">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] border-b border-slate-50">
                      <th className="pb-8 px-4">Scholarly Thesis</th>
                      <th className="pb-8 px-4">Authored By</th>
                      <th className="pb-8 px-4">Status</th>
                      <th className="pb-8 px-4">Vetting Date</th>
                      <th className="pb-8 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredManuscripts.map((m: Manuscript) => (
                      <tr key={m.id} className="group hover:bg-bg/40 transition-all duration-300">
                        <td className="py-10 px-4 max-w-lg">
                          <p className="text-lg font-serif text-primary font-medium leading-snug group-hover:text-accent transition-colors">{m.title}</p>
                          <p className="text-[10px] font-mono text-slate-300 mt-2 italic">ID: {m.id.toUpperCase()}</p>
                        </td>
                        <td className="py-10 px-4">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                              {m.author_profile?.first_name?.[0]}{m.author_profile?.last_name?.[0]}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-700">{m.author_profile?.first_name} {m.author_profile?.last_name}</p>
                              <p className="text-[10px] text-slate-400 italic truncate max-w-[200px]">{m.author_profile?.institution_name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-10 px-4">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${m.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            m.status === 'PUBLISHED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                              m.status === 'SUBMITTED' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                            }`}>
                            {m.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-10 px-4">
                          <p className="text-xs font-mono text-slate-400">{new Date(m.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        </td>
                        <td className="py-10 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            {m.file_url && (
                              <a href={m.file_url} target="_blank" className="p-3.5 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-accent hover:border-accent hover:shadow-xl transition-all">
                                <Eye size={16} />
                              </a>
                            )}
                            <button onClick={() => handleUpdateManuscriptStatus(m.id, 'ACCEPTED')} className="p-3.5 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all">
                              <CheckCircle size={16} />
                            </button>
                            <button onClick={() => handleDeleteManuscript(m.id)} className="p-3.5 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-500 hover:border-red-500 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCHOLAR MANAGEMENT */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-12">
                <div className="relative flex-grow max-w-xl">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="text" placeholder="Identity Search (Name, Email)..."
                    className="w-full pl-16 pr-8 py-5 bg-bg border-none rounded-3xl text-sm focus:ring-2 focus:ring-accent/10 transition-all"
                    value={userSearchTerm} onChange={(e: any) => setUserSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredUsers.map((u: UserProfile) => (
                  <div key={u.id} className="p-8 bg-bg rounded-[3rem] border border-transparent hover:border-accent/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-[2rem] bg-white flex items-center justify-center text-lg font-bold text-primary shadow-sm border border-slate-50 group-hover:bg-primary group-hover:text-white transition-all">
                        {u.firstName[0]}{u.lastName[0]}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setRoleModal({ user: u, targetRole: u.role === 'ADMIN' ? 'USER' : 'ADMIN' })} className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-accent border border-slate-50 transition-all">
                          <UserCog size={16} />
                        </button>
                        <button onClick={() => setRoleModal({ user: u, targetStatus: u.status === 'Active' ? 'Suspended' : 'Active' })} className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-red-500 border border-slate-50 transition-all">
                          {u.status === 'Active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xl font-serif text-primary truncate">{u.firstName} {u.lastName}</h5>
                        <p className="text-[10px] text-slate-400 font-mono italic">{u.email}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 ${u.role === 'ADMIN' ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'}`}>
                          <Shield size={10} /> {u.role}
                        </span>
                        <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border shadow-sm ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                          {u.status}
                        </span>
                      </div>
                      <div className="pt-4 border-t border-slate-50 mt-4">
                        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest mb-1 italic">Research Affiliation</p>
                        <p className="text-xs text-slate-500 font-light truncate">{u.institutionName || 'Independent Scholar'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* INTELLIGENCE / AUDIT TRAIL */}
        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-2xl font-serif text-primary flex items-center gap-4"><Globe size={28} className="text-accent" /> Network Footprints</h3>
                  <span className="px-4 py-1.5 bg-bg rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 border border-slate-50">Last 100 Syncs</span>
                </div>
                <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {logs.map((log: VisitLog) => (
                    <div key={log.id} className="flex justify-between items-center group">
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                          <Terminal size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{log.path}</p>
                          <p className="text-[10px] text-slate-300 flex items-center gap-2"><Clock size={10} /> {new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-200 bg-slate-50 px-3 py-1 rounded-lg group-hover:bg-accent group-hover:text-white transition-all">{log.ip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-2xl font-serif text-primary flex items-center gap-4"><FileDown size={28} className="text-accent" /> Asset Sovereignty</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  </div>
                </div>
                <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {downloads.map((d: DownloadLog) => (
                    <div key={d.id} className="p-6 bg-bg/40 rounded-3xl border border-transparent hover:border-accent/10 hover:bg-white transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm text-accent group-hover:bg-primary group-hover:text-white transition-all">
                          <Download size={16} />
                        </div>
                        <p className="text-[9px] font-mono text-slate-300">{new Date(d.timestamp).toLocaleTimeString()}</p>
                      </div>
                      <h5 className="text-sm font-bold text-primary mb-2 truncate">{d.file_name}</h5>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[8px] font-bold text-accent">
                          {d.profiles?.first_name?.[0]}{d.profiles?.last_name?.[0]}
                        </div>
                        <p className="text-[10px] text-slate-400 italic">Accessed by Researcher {d.profiles?.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* MODAL SYSTEM */}
        <AnimatePresence>
          {roleModal && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-xl flex items-center justify-center p-8"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
                className="bg-white max-w-lg w-full rounded-[4rem] p-16 shadow-2xl relative"
              >
                <div className="text-center space-y-8">
                  <div className="w-24 h-24 bg-primary text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary/20 rotate-3">
                    <ShieldCheck size={40} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-serif text-primary">Scholarly Override</h3>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      You are about to modify the administrative configuration for researcher <br />
                      <span className="font-bold text-primary bg-accent/5 px-2 py-1 rounded-lg">"{roleModal.user.firstName} {roleModal.user.lastName}"</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <button onClick={() => setRoleModal(null)} className="py-5 bg-bg text-slate-400 rounded-[2rem] text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">Abort Action</button>
                    <button onClick={applyUserUpdate} disabled={isUpdating} className="py-5 bg-primary text-white rounded-[2rem] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-accent transition-all">
                      {isUpdating ? 'Executing...' : 'Confirm Override'}
                    </button>
                  </div>
                </div>
                <div className="absolute top-10 right-10 text-slate-100">
                  <Lock size={120} />
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

// Updated for git commit
