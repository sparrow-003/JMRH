import { useState, memo, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useJMRH } from "@/context/JMRHContext";
import {
    BookOpen,
    User as UserIcon,
    Lock,
    Mail,
    ArrowRight,
    Building,
    Phone,
    MapPin,
    GraduationCap,
    Calendar,
    Hash,
    Building2,
    ShieldCheck,
    Cpu,
    Globe,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const UNIVERSITIES = [
    "Anna University", "University of Madras", "SRM Institute", "VIT University", "IIT Madras",
    "Bangalore University", "University of Mysore", "Cochin University", "University of Kerala",
    "Other Recognized University"
];

const DEPARTMENTS = [
    "Computer Science & IT", "Electronics & Communication", "Mechanical Engineering",
    "Commerce & Management", "Biotechnology", "Social Sciences", "Law", "Multidisciplinary"
];

const AuthPage = memo(() => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    // Login State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Registration State
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPass, setRegPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");

    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [degree, setDegree] = useState("");
    const [university, setUniversity] = useState("");
    const [college, setCollege] = useState("");
    const [department, setDepartment] = useState("");
    const [studyType, setStudyType] = useState("");

    const { signIn, signUp } = useJMRH();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    const handleAuth = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                await signIn(email, password);
                navigate(location.state?.from?.pathname || '/');
            } else {
                if (regPass !== repeatPass) {
                    toast({ title: "Validation Error", description: "Passwords do not match.", variant: "destructive" });
                    setLoading(false);
                    return;
                }
                await signUp(regName, regEmail, regPass, {
                    address, phoneNumber, age, dob, city, pincode, degree, university, college, department, studyType
                });
                setIsLogin(true);
            }
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "An unexpected error occurred.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0C10] flex flex-col font-sans selection:bg-gold/30">
            <Header />
            <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-24 relative overflow-hidden">
                {/* Cinematic Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-teal/10 blur-[160px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 blur-[140px] animate-pulse delay-1000" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
                </div>

                <div className={`w-full ${isLogin ? 'max-w-md' : 'max-w-6xl'} space-y-12 relative z-10`}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-4">
                            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50">Secure Academic Node</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="font-serif text-6xl font-black text-white tracking-tighter leading-none">
                                {isLogin ? "Nexus Access" : "The Registry"}
                            </h1>
                            <p className="text-xs uppercase tracking-[0.6em] text-gold font-bold">
                                {isLogin ? "Institutional Authentication Protocol" : "Join the Multidisciplinary Horizon"}
                            </p>
                        </div>
                    </motion.div>

                    <form onSubmit={handleAuth} className="bg-[#111418] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        {/* Decorative Accents */}
                        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
                        <div className="absolute top-0 right-0 p-8">
                            <Cpu className="text-white/5 group-hover:text-gold/20 transition-colors duration-1000" size={40} />
                        </div>

                        <div className="p-10 md:p-16">
                            {isLogin ? (
                                <div className="space-y-12">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Mail size={14} className="text-gold" />
                                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Credential ID</span>
                                        </div>
                                        <Input
                                            required
                                            type="email"
                                            placeholder="academic.id@horizon.edu"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-16 border-0 border-b-2 border-white/5 bg-transparent rounded-none px-0 font-serif text-2xl italic text-white focus:border-gold transition-all duration-500 placeholder:text-white/10 shadow-none focus-visible:ring-0"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Lock size={14} className="text-gold" />
                                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Security Matrix</span>
                                        </div>
                                        <Input
                                            required
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-16 border-0 border-b-2 border-white/5 bg-transparent rounded-none px-0 font-serif text-2xl text-white focus:border-gold transition-all duration-500 placeholder:text-white/10 shadow-none focus-visible:ring-0"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                    <div className="space-y-12">
                                        <div className="space-y-2 border-l-2 border-gold pl-6">
                                            <h3 className="font-serif italic text-3xl font-bold text-white">Identity</h3>
                                            <p className="text-[10px] uppercase tracking-widest text-gold/50">Personal Details</p>
                                        </div>

                                        <div className="space-y-8">
                                            <Input required placeholder="Full Legal Name" value={regName} onChange={(e) => setRegName(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 font-serif italic text-lg text-white focus:border-gold transition-all" />
                                            <div className="grid grid-cols-2 gap-6">
                                                <Input required type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all text-sm" />
                                                <Input required type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all text-sm" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <Input required placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all text-sm" />
                                                <Input required placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all text-sm" />
                                            </div>
                                            <Input required placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all text-sm" />
                                            <Input required type="email" placeholder="Email Address" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all text-sm" />
                                            <div className="grid grid-cols-2 gap-6">
                                                <Input required type="password" placeholder="Pass-key" value={regPass} onChange={(e) => setRegPass(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all text-sm" />
                                                <Input required type="password" placeholder="Verify" value={repeatPass} onChange={(e) => setRepeatPass(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all text-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        <div className="space-y-2 border-l-2 border-teal pl-6">
                                            <h3 className="font-serif italic text-3xl font-bold text-white">Scholarship</h3>
                                            <p className="text-[10px] uppercase tracking-widest text-teal/50">Academic Status</p>
                                        </div>

                                        <div className="space-y-8">
                                            <Select onValueChange={setDegree} required>
                                                <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-none text-white/50 focus:ring-0 focus:border-gold">
                                                    <SelectValue placeholder="Current Degree" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#111418] border-white/10 text-white rounded-none">
                                                    <SelectItem value="Bachelors">Bachelor's Degree</SelectItem>
                                                    <SelectItem value="Masters">Master's Degree</SelectItem>
                                                    <SelectItem value="PhD">PhD / Doctorate</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <Select onValueChange={setUniversity} required>
                                                <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-none text-white/50 focus:ring-0 focus:border-gold">
                                                    <SelectValue placeholder="Institution" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#111418] border-white/10 text-white rounded-none">
                                                    {UNIVERSITIES.map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                                </SelectContent>
                                            </Select>

                                            <Input required placeholder="College Name" value={college} onChange={(e) => setCollege(e.target.value)} className="h-14 bg-white/5 border-white/10 rounded-none px-4 text-white focus:border-gold transition-all" />

                                            <Select onValueChange={setDepartment} required>
                                                <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-none text-white/50 focus:ring-0 focus:border-gold">
                                                    <SelectValue placeholder="Department" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#111418] border-white/10 text-white rounded-none">
                                                    {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                                </SelectContent>
                                            </Select>

                                            <Select onValueChange={setStudyType} required>
                                                <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-none text-white/50 focus:ring-0 focus:border-gold">
                                                    <SelectValue placeholder="Engagement Mode" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#111418] border-white/10 text-white rounded-none">
                                                    <SelectItem value="FullTime">Full Time</SelectItem>
                                                    <SelectItem value="PartTime">Part Time</SelectItem>
                                                    <SelectItem value="Research">Research Scholar</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-16">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-20 rounded-none bg-gold text-[#0A0C10] hover:bg-white hover:text-black transition-all duration-700 font-black tracking-[1em] shadow-[0_10px_40px_rgba(212,175,55,0.2)] flex items-center justify-center gap-4 text-sm uppercase relative group overflow-hidden disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center gap-4">
                                        {loading ? <Zap className="animate-spin" size={18} /> : (isLogin ? "Terminate Access Protocol" : "Authorize Nexus Identity")} <ArrowRight size={18} />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div className="text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[11px] uppercase tracking-[0.6em] font-black text-white/20 hover:text-gold transition-all border-b border-white/5 pb-2 hover:border-gold"
                        >
                            {isLogin ? "Request New Registration Protocol" : "Authorize Existing Account Matrix"}
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
});

export default AuthPage;
