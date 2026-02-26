import { useState, memo, FormEvent } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useJMRH } from "@/context/JMRHContext";
import {
    GraduationCap,
    Plus,
    Mail,
    Trash2,
    CheckCircle,
    AlertCircle,
    MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const AdminProfessors = memo(() => {
    const { users, createProfessor, banUser, unbanUser, updateUser } = useJMRH();
    const { toast } = useToast();

    // Create State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [openCreate, setOpenCreate] = useState(false);

    // Details State
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dept, setDept] = useState("");
    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [bio, setBio] = useState("");

    // Edit State
    const [editingProf, setEditingProf] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editDept, setEditDept] = useState("");
    const [editUniversity, setEditUniversity] = useState("");
    const [editDegree, setEditDegree] = useState("");
    const [editSpecialization, setEditSpecialization] = useState("");
    const [editBio, setEditBio] = useState("");

    const professors = users.filter(u => u.role === 'PROFESSOR');

    const handleCreate = (e: FormEvent) => {
        e.preventDefault();
        createProfessor(name, email, {
            phoneNumber: phone,
            address: address,
            department: dept,
            university: university,
            degree: degree,
            specialization: specialization,
            bio: bio
        });

        // Reset Form
        setName(""); setEmail(""); setPhone(""); setAddress("");
        setDept(""); setUniversity(""); setDegree(""); setSpecialization(""); setBio("");
        setOpenCreate(false);

        toast({ title: "Professor Account Initialized", description: `Access credentials issued for ${name}` });
    };

    const startEdit = (prof: any) => {
        setEditingProf(prof.id);
        setEditName(prof.name);
        setEditEmail(prof.email);
        setEditPhone(prof.phoneNumber || "");
        setEditAddress(prof.address || "");
        setEditDept(prof.department || "");
        setEditUniversity(prof.university || "");
        setEditDegree(prof.degree || "");
        setEditSpecialization(prof.specialization || "");
        setEditBio(prof.bio || "");
    };

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        if (!editingProf) return;

        updateUser(editingProf, {
            name: editName,
            email: editEmail,
            phoneNumber: editPhone,
            address: editAddress,
            department: editDept,
            university: editUniversity,
            degree: editDegree,
            specialization: editSpecialization,
            bio: editBio
        });

        setEditingProf(null);
        toast({ title: "Professor Profile Updated", description: "All changes have been saved to the registry." });
    };

    return (
        <DashboardLayout role="ADMIN">
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                        <p className="section-label">Editorial Council</p>
                        <h1 className="text-5xl font-serif font-bold italic text-white leading-tight">Board Management</h1>
                    </div>

                    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                        <DialogTrigger asChild>
                            <Button className="rounded-none h-14 bg-gold text-oxford px-8 font-bold tracking-widest hover:bg-white transition-all shadow-xl flex items-center gap-3">
                                <Plus size={18} /> INITIALIZE PROFESSOR ACCOUNT
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-oxford border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="font-serif italic text-2xl text-gold">Assign New Member</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-6 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Full Scholarly Name</label>
                                        <Input required placeholder="Dr. Researcher Name" value={name} onChange={(e) => setName(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Institutional Email</label>
                                        <Input required type="email" placeholder="scholar@institution.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Phone Number</label>
                                        <Input required placeholder="+1 234..." value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Current Address</label>
                                        <Input required placeholder="City, Country" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">University / Institution</label>
                                        <Input required placeholder="University name" value={university} onChange={(e) => setUniversity(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Department</label>
                                        <Input required placeholder="e.g. Computer Science" value={dept} onChange={(e) => setDept(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Academic Degree/Title</label>
                                        <Input required placeholder="PhD, MSc, etc." value={degree} onChange={(e) => setDegree(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Specialization</label>
                                        <Input required placeholder="e.g. AI Ethics" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Biography</label>
                                        <Input placeholder="Short professional bio..." value={bio} onChange={(e) => setBio(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full h-12 rounded-none bg-gold text-oxford font-bold tracking-[0.2em] hover:bg-white transition-all">
                                    CONFIRM ACCOUNT ISSUANCE
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {professors.map((prof) => (
                        <div key={prof.id} className="p-8 bg-white/5 rounded-[40px] border border-white/10 group hover:border-gold/30 transition-all duration-700 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-3xl">
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <Dialog open={editingProf === prof.id} onOpenChange={(open) => !open && setEditingProf(null)}>
                                    <DialogTrigger asChild>
                                        <button onClick={() => startEdit(prof)} className="text-white/20 hover:text-gold transition-colors">
                                            <CheckCircle size={20} />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-oxford border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="font-serif italic text-2xl text-gold">Edit Member Profile</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleUpdate} className="space-y-6 pt-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="col-span-2 space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Name</label>
                                                    <Input required value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                                <div className="col-span-2 space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Email</label>
                                                    <Input required type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Phone</label>
                                                    <Input required value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Address</label>
                                                    <Input required value={editAddress} onChange={(e) => setEditAddress(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">University</label>
                                                    <Input required value={editUniversity} onChange={(e) => setEditUniversity(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Department</label>
                                                    <Input required value={editDept} onChange={(e) => setEditDept(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Degree</label>
                                                    <Input required value={editDegree} onChange={(e) => setEditDegree(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Specialization</label>
                                                    <Input required value={editSpecialization} onChange={(e) => setEditSpecialization(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                                <div className="col-span-2 space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-teal">Bio</label>
                                                    <Input value={editBio} onChange={(e) => setEditBio(e.target.value)} className="bg-white/5 border-white/10 text-white italic h-12" />
                                                </div>
                                            </div>
                                            <Button type="submit" className="w-full h-12 rounded-none bg-gold text-oxford font-bold tracking-[0.2em] hover:bg-white transition-all">
                                                SAVE CHANGES
                                            </Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="space-y-6">
                                <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl group-hover:bg-gold transition-all duration-700">
                                    <GraduationCap size={32} className="text-teal-400 group-hover:text-oxford" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition-colors">{prof.name}</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{prof.degree} • {prof.university}</p>
                                    <p className="text-[10px] italic text-teal-400/80">{prof.department} | {prof.specialization}</p>
                                </div>
                            </div>

                            <div className="space-y-6 pt-10 mt-auto border-t border-white/5">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
                                    <span className="text-white/20">Status</span>
                                    <span className={prof.status === 'ACTIVE' ? "text-teal-400" : "text-red-400"}>{prof.status}</span>
                                </div>

                                <div className="flex gap-4">
                                    {prof.status === 'ACTIVE' ? (
                                        <Button
                                            variant="ghost"
                                            onClick={() => banUser(prof.id)}
                                            className="flex-1 rounded-none border border-white/10 text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all text-[10px] uppercase font-bold tracking-widest h-12"
                                        >
                                            Deactivate
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            onClick={() => unbanUser(prof.id)}
                                            className="flex-1 rounded-none border border-white/10 text-white/40 hover:text-teal-400 hover:bg-teal-400/5 transition-all text-[10px] uppercase font-bold tracking-widest h-12"
                                        >
                                            Authorize
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {professors.length === 0 && (
                        <div className="lg:col-span-3 py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center space-y-4">
                            <AlertCircle size={48} className="text-white/10" />
                            <p className="font-serif italic text-white/20 text-xl tracking-widest">No board members found in the current directive.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
});

export default AdminProfessors;
