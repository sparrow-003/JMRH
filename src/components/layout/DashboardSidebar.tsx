import { useNavigate, useLocation, Link } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    GraduationCap,
    Settings,
    LogOut,
    Menu,
    X,
    ShieldCheck
} from "lucide-react";
import { useState, memo, useEffect } from "react";
import { useJMRH } from "@/context/JMRHContext";

interface DashboardSidebarProps {
    role: 'ADMIN' | 'PROFESSOR';
}

const DashboardSidebar = memo(({ role }: DashboardSidebarProps) => {
    // Default to closed on mobile, open on desktop
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, currentUser } = useJMRH();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const adminLinks = [
        { label: "Overview", icon: LayoutDashboard, href: "/secure/admin/dashboard" },
        { label: "Researchers", icon: Users, href: "/secure/admin/users" },
        { label: "Professors", icon: GraduationCap, href: "/secure/admin/professors" },
        { label: "Manuscripts", icon: BookOpen, href: "/secure/admin/papers" },
        { label: "Settings", icon: Settings, href: "/secure/admin/settings" },
    ];

    const professorLinks = [
        { label: "Workspace", icon: LayoutDashboard, href: "/secure/professor/dashboard" },
        { label: "Assignments", icon: BookOpen, href: "/secure/professor/papers" },
    ];

    const links = role === 'ADMIN' ? adminLinks : professorLinks;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            {/* Mobile Toggle */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed top-4 left-4 z-[60] lg:hidden p-2.5 bg-oxford text-white rounded-lg shadow-lg hover:bg-gold hover:text-oxford transition-all"
                >
                    <Menu size={20} />
                </button>
            )}

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 bg-oxford text-white transition-all duration-300 ease-in-out border-r border-white/5 shadow-2xl lg:shadow-none
                ${isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:w-20 lg:translate-x-0"}`}>

                <div className={`flex flex-col h-full p-6 ${!isOpen && "lg:items-center lg:px-2"}`}>

                    {/* Header / Mobile Close */}
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 bg-white/5 border border-gold/40 flex items-center justify-center rotate-45 shrink-0">
                                <BookOpen size={18} className="text-gold -rotate-45" />
                            </div>
                            {isOpen && (
                                <div className="flex flex-col animate-fade-in">
                                    <span className="font-serif text-xl font-bold tracking-tighter">JMRH<span className="text-gold">.</span></span>
                                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold">Systems Desk</span>
                                </div>
                            )}
                        </div>
                        {/* Mobile Close Button (Inside Sidebar) */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden p-2 text-white/40 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* User Profile */}
                    {isOpen && (
                        <div className="mb-10 p-4 bg-white/5 rounded-xl border border-white/5 animate-fade-in">
                            <p className="text-[9px] uppercase tracking-widest text-gold font-bold mb-1">{currentUser?.role} SESSION</p>
                            <h4 className="font-serif italic text-sm font-bold truncate">{currentUser?.name}</h4>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                                className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 group
                                    ${location.pathname === link.href ? "bg-gold text-oxford" : "hover:bg-white/5 text-white/60 hover:text-white"}`}
                            >
                                <link.icon size={20} className={`shrink-0 ${location.pathname === link.href ? "text-oxford" : "text-gold/50 group-hover:text-gold"}`} />
                                {isOpen && <span className="text-xs uppercase tracking-widest font-bold whitespace-nowrap animate-fade-in">{link.label}</span>}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 p-3 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all group mt-auto"
                    >
                        <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
                        {isOpen && <span className="text-xs uppercase tracking-widest font-bold whitespace-nowrap animate-fade-in">Terminate Session</span>}
                    </button>
                </div>
            </aside>
        </>
    );
});

export default DashboardSidebar;
