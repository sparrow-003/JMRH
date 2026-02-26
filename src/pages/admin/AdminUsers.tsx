import { memo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useJMRH } from "@/context/JMRHContext";
import {
    Search, Mail, GraduationCap, Building, User as UserIcon,
    Ban, CheckCircle, UserPlus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const AdminUsers = memo(() => {
    const { users, papers, updateUser, banUser, unbanUser } = useJMRH();
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();

    // Filter only standard USER role
    const scholarUsers = users.filter(u => u.role === 'USER' && (
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    const handlePromote = async (userId: string) => {
        await updateUser(userId, { role: 'PROFESSOR' });
        toast({ title: "Scholar Promoted", description: "The user is now a Professor/Reviewer." });
    };

    return (
        <DashboardLayout role="ADMIN">
            <div className="space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                        <p className="section-label text-gold">Institutional Registry</p>
                        <h1 className="text-5xl font-serif font-bold italic text-white leading-tight">Registered Scholars</h1>
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-80">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 bg-white/5 border-white/10 text-white italic h-14 rounded-none h-14"
                            />
                        </div>
                    </div>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {scholarUsers.map(user => (
                        <div key={user.id} className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:border-gold/30 transition-all duration-500 group relative overflow-hidden">
                            {/* Accents */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[100px] -mr-16 -mt-16 transition-all group-hover:bg-gold/10" />

                            <div className="relative z-10 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-gold text-2xl font-serif italic">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className={`px-4 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest border ${user.status === 'ACTIVE' ? 'border-teal-500/30 text-teal-400' : 'border-red-500/30 text-red-400'}`}>
                                        {user.status}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold transition-colors">{user.name}</h3>
                                    <div className="flex items-center gap-2 text-white/40 text-xs text-ellipsis overflow-hidden">
                                        <Mail size={12} /> {user.email}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="h-10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-bold tracking-widest text-[9px] uppercase transition-all">
                                                Registry Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-h-[90vh] overflow-y-auto bg-[#0A0C10] border-white/10 text-white">
                                            <DialogHeader>
                                                <DialogTitle className="font-serif italic text-3xl text-gold">{user.name}</DialogTitle>
                                            </DialogHeader>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                                                <div className="space-y-6">
                                                    <h4 className="text-teal-400 uppercase tracking-widest text-xs font-bold border-b border-white/10 pb-2">Personal Identity</h4>
                                                    <div className="space-y-4">
                                                        <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-bold">Email</label><p className="font-serif text-lg">{user.email}</p></div>
                                                        <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-bold">Contact</label><p className="font-serif text-lg">{user.phoneNumber || "N/A"}</p></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <h4 className="text-teal-400 uppercase tracking-widest text-xs font-bold border-b border-white/10 pb-2">Institutional Status</h4>
                                                    <div className="space-y-4">
                                                        <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-bold">University</label><p className="font-serif text-lg">{user.university || "N/A"}</p></div>
                                                        <div className="space-y-1"><label className="text-[10px] uppercase text-white/40 font-bold">Department</label><p className="font-serif text-lg">{user.department || "N/A"}</p></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submission Portfolio */}
                                            <div className="py-6 border-t border-white/10">
                                                <h4 className="text-teal-400 uppercase tracking-widest text-xs font-bold mb-4">Submission Portfolio</h4>
                                                <div className="space-y-3">
                                                    {papers.filter(p => p.authorId === user.id).length > 0 ? (
                                                        papers.filter(p => p.authorId === user.id).map(p => (
                                                            <div key={p.id} className="p-4 bg-white/5 border border-white/5 flex justify-between items-center group/paper hover:bg-white/10 transition-all">
                                                                <div>
                                                                    <p className="text-sm font-serif font-bold group-hover/paper:text-gold transition-colors">{p.title}</p>
                                                                    <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold">{p.discipline} | Filed: {p.submissionDate}</p>
                                                                </div>
                                                                <span className={`text-[8px] px-2 py-0.5 rounded border border-white/10 font-black uppercase tracking-widest ${p.status === 'PUBLISHED' ? 'text-teal' : 'text-gold'}`}>
                                                                    {p.status}
                                                                </span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold italic">No manuscripts filed to date.</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-white/10">
                                                <h4 className="text-gold uppercase tracking-widest text-xs font-bold mb-4">Nexus Actions</h4>
                                                <div className="flex flex-wrap gap-4">
                                                    <Button onClick={() => handlePromote(user.id)} className="bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-white border border-teal-500/30 h-12 px-6 rounded-none uppercase text-[10px] font-black tracking-widest">
                                                        <UserPlus size={14} className="mr-2" /> Promote to Professor
                                                    </Button>
                                                    {user.status === 'ACTIVE' ? (
                                                        <Button onClick={() => banUser(user.id)} className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 h-12 px-6 rounded-none uppercase text-[10px] font-black tracking-widest">
                                                            <Ban size={14} className="mr-2" /> Ban Scholar
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={() => unbanUser(user.id)} className="bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/30 h-12 px-6 rounded-none uppercase text-[10px] font-black tracking-widest">
                                                            <CheckCircle size={14} className="mr-2" /> Restore access
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    {user.status === 'ACTIVE' ? (
                                        <Button onClick={() => banUser(user.id)} className="h-10 bg-red-500/5 hover:bg-red-500 text-red-500/60 hover:text-white border border-red-500/10 font-bold tracking-widest text-[9px] uppercase transition-all">
                                            Terminate
                                        </Button>
                                    ) : (
                                        <Button onClick={() => unbanUser(user.id)} className="h-10 bg-green-500/5 hover:bg-green-500 text-green-500/60 hover:text-white border border-green-500/10 font-bold tracking-widest text-[9px] uppercase transition-all">
                                            Restore
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {scholarUsers.length === 0 && (
                        <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center space-y-4">
                            <UserIcon size={48} className="text-white/10" />
                            <p className="font-serif italic text-white/20 text-xl tracking-widest">No scholars matching your query.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
});

export default AdminUsers;
