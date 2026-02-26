import { memo } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useJMRH } from "@/context/JMRHContext";
import {
    Users,
    BookOpen,
    GraduationCap,
    Clock,
    Activity,
    CheckCircle,
    AlertCircle
} from "lucide-react";

const AdminDashboard = memo(() => {
    const { users, papers } = useJMRH();

    const stats = [
        { label: "Total Scholars", value: users.filter(u => u.role === 'USER').length, icon: Users, color: "text-blue-400" },
        { label: "Editorial Board", value: users.filter(u => u.role === 'PROFESSOR').length, icon: GraduationCap, color: "text-teal-400" },
        { label: "Manuscripts", value: papers.length, icon: BookOpen, color: "text-gold" },
        { label: "Pending Review", value: papers.filter(p => p.status === 'SUBMITTED').length, icon: Clock, color: "text-orange-400" },
    ];

    const recentPapers = [...papers].sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()).slice(0, 5);

    return (
        <DashboardLayout role="ADMIN">
            <div className="space-y-12">
                {/* Header */}
                <div className="flex justify-between items-end border-b border-white/5 pb-8">
                    <div className="space-y-2">
                        <p className="section-label">Central Control Unit</p>
                        <h1 className="text-5xl font-serif font-bold italic text-white leading-tight">System Overview</h1>
                    </div>
                    <div className="flex gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                            <Activity size={20} className="text-teal-400 animate-pulse" />
                            <div className="text-right">
                                <p className="text-[8px] uppercase font-bold text-white/40 tracking-widest">Network Status</p>
                                <p className="text-xs font-bold text-teal-400 uppercase tracking-widest">Operational</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="p-8 bg-white/5 rounded-[32px] border border-white/10 group hover:border-gold/50 transition-all duration-700 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex justify-between items-center">
                                    <stat.icon size={28} className={`${stat.color} opacity-60 group-hover:scale-110 transition-transform`} />
                                    <span className="text-[10px] uppercase font-bold text-white/20 tracking-widest">24H Activity</span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-4xl font-serif font-bold text-white">{stat.value}</h3>
                                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-bold">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tables Section */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Submissions */}
                    <div className="lg:col-span-2 space-y-8 p-10 bg-white/5 rounded-[40px] border border-white/10 shadow-3xl">
                        <div className="flex justify-between items-center">
                            <h3 className="font-serif text-2xl font-bold italic text-gold">Latest Manuscripts</h3>
                            <Link to="/secure/admin/papers" className="text-[10px] uppercase tracking-widest font-bold text-teal-400 hover:text-white transition-colors">Audit All Submissions →</Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/20 text-left">
                                        <th className="pb-4 font-bold">Manuscript Title</th>
                                        <th className="pb-4 font-bold">Author Identity</th>
                                        <th className="pb-4 font-bold">Current Phase</th>
                                        <th className="pb-4 font-bold text-right">Filed On</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recentPapers.map((paper) => (
                                        <tr key={paper.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="py-6 pr-4">
                                                <p className="font-serif italic text-lg text-white font-bold group-hover:text-gold transition-colors truncate max-w-[300px]">{paper.title}</p>
                                                <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mt-1">{paper.discipline}</p>
                                            </td>
                                            <td className="py-6 px-4">
                                                <p className="text-sm font-sans text-white/60 font-medium">{paper.authorName}</p>
                                            </td>
                                            <td className="py-6 px-4">
                                                <div className="flex items-center gap-2">
                                                    {paper.status === 'SUBMITTED' ? (
                                                        <Clock size={12} className="text-orange-400" />
                                                    ) : (
                                                        <CheckCircle size={12} className="text-teal-400" />
                                                    )}
                                                    <span className={`text-[10px] uppercase font-bold tracking-widest ${paper.status === 'SUBMITTED' ? 'text-orange-400' : 'text-teal-400'}`}>
                                                        {paper.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-6 pl-4 text-right">
                                                <p className="text-xs font-serif italic text-white/40">{paper.submissionDate}</p>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentPapers.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="py-12 text-center">
                                                <p className="text-text-muted italic flex items-center justify-center gap-3">
                                                    <AlertCircle size={16} /> No manuscripts filed in the current session.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions / Activity */}
                    <div className="space-y-8 p-10 bg-oxford rounded-[40px] border border-white/10 shadow-3xl text-white">
                        <div className="space-y-2">
                            <p className="section-label">System Feed</p>
                            <h3 className="font-serif text-2xl font-bold italic">Audit Logs</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { user: "Admin", action: "Updated System Protocols", time: "2h ago" },
                                { user: "Admin", action: "Authorized Prof. Chen", time: "5h ago" },
                                { user: "System", action: "Nightly Data Sweep Complete", time: "12h ago" },
                            ].map((log, idx) => (
                                <div key={idx} className="p-4 border-l-2 border-gold/40 bg-white/5 space-y-2 group hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase font-bold text-gold">{log.user}</span>
                                        <span className="text-[9px] uppercase font-bold text-white/20">{log.time}</span>
                                    </div>
                                    <p className="text-sm font-sans text-white/80">{log.action}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 block">
                            <button className="w-full h-14 bg-gold text-oxford font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-xl">
                                Generate Quarterly Audit Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
});

export default AdminDashboard;
