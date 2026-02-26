import { useState, memo, FormEvent } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useJMRH, UserRole } from "@/context/JMRHContext";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SecureLoginPageProps {
    role: 'ADMIN' | 'PROFESSOR';
}

const SecureLoginPage = memo(({ role }: SecureLoginPageProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser, signIn, logout } = useJMRH();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    // If already logged in with correct role, redirect away
    if (currentUser?.role === role) {
        return <Navigate to={role === 'ADMIN' ? '/secure/admin/dashboard' : '/secure/professor/dashboard'} replace />;
    }

    const handleAuth = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Use proper Supabase authentication with password verification
            await signIn(email, password);

            // After signIn, the auth state change listener in JMRHContext will
            // fetch the user profile and role. We need to wait briefly for state to update.
            // The ProtectedRoute will handle role verification server-side via RLS.
            
            toast({ title: "Console Access Granted", description: `Authenticating as ${role}...` });
            navigate(location.state?.from?.pathname || (role === 'ADMIN' ? '/secure/admin/dashboard' : '/secure/professor/dashboard'));
        } catch (error: any) {
            toast({ 
                title: "Authentication Failed", 
                description: error?.message || "Invalid credentials.", 
                variant: "destructive" 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Cinematic Overlays */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-fixed bg-cover" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px] -mr-[300px] -mb-[300px]" />
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -ml-[200px] -mt-[200px]" />

            <div className="w-full max-w-sm space-y-12 relative z-10 animate-academic-reveal">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gold/10 border-2 border-gold/40 flex items-center justify-center rotate-45 mx-auto transition-transform duration-1000 hover:rotate-90">
                        <ShieldCheck className="text-gold -rotate-45" size={32} />
                    </div>
                    <div className="space-y-1">
                        <h1 className="font-serif text-3xl font-bold tracking-tight text-white uppercase italic">
                            {role} CONSOLE
                        </h1>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">Secure Editorial Vetting Authority</p>
                    </div>
                </div>

                <form onSubmit={handleAuth} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-teal transition-colors flex items-center gap-3">
                                <Mail size={12} className="text-gold" /> System Email
                            </label>
                            <Input
                                required
                                type="email"
                                placeholder="secure@jmrh.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="bg-white/5 border-white/10 focus:border-gold h-14 text-lg font-serif italic text-white placeholder:text-white/10 rounded-none transition-all"
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-teal transition-colors flex items-center gap-3">
                                <Lock size={12} className="text-gold" /> Authorization Key
                            </label>
                            <Input
                                required
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="bg-white/5 border-white/10 focus:border-gold h-14 text-white placeholder:text-white/10 rounded-none transition-all"
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full h-16 rounded-none bg-gold text-oxford hover:bg-white transition-all duration-700 font-bold tracking-[0.3em] flex items-center justify-center gap-4 text-xs"
                    >
                        {isLoading ? (
                            <><Loader2 size={16} className="animate-spin" /> VERIFYING...</>
                        ) : (
                            <>VERIFY & ENTER PORTAL <ArrowRight size={16} /></>
                        )}
                    </Button>
                </form>

                <div className="pt-12 text-center">
                    <div className="w-12 h-[1.5px] bg-white/10 mx-auto mb-6" />
                    <p className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-bold italic leading-relaxed">
                        Access restricted to authorized editorial personnel. <br />
                        All authentication attempts are audited and logged.
                    </p>
                </div>
            </div>
        </div>
    );
});

export default SecureLoginPage;
