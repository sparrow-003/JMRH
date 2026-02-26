import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, Send, ChevronRight, ShieldCheck, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJMRH } from "@/context/JMRHContext";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Guidelines", href: "/guidelines" },
  { label: "Editorial", href: "/editorial-board" },
  { label: "Ethics", href: "/ethics-policy" },
  { label: "Archives", href: "/archives" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" }
];

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser } = useJMRH();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
      ${scrolled || location.pathname !== "/"
        ? "bg-white/90 backdrop-blur-2xl border-b border-black/5 py-3 shadow-sm"
        : "bg-transparent py-5"}`}>
      <div className="container max-w-[1800px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* 3D Book Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 perspective-1000">
              <motion.div
                className="relative w-full h-full transition-all duration-1000 preserve-3d"
                whileHover={{ rotateY: 180 }}
              >
                {/* Front Cover */}
                <div className="absolute inset-0 bg-oxford flex items-center justify-center backface-hidden shadow-xl border-r-2 border-gold/40">
                  <BookOpen className="w-6 h-6 text-gold" />
                </div>
                {/* Back Cover / Pages */}
                <div className="absolute inset-0 bg-gold flex items-center justify-center rotate-y-180 backface-hidden shadow-xl border-l-2 border-oxford/40">
                  <div className="flex flex-col gap-1">
                    <div className="w-6 h-0.5 bg-oxford/20" />
                    <div className="w-6 h-0.5 bg-oxford/20" />
                    <div className="w-6 h-0.5 bg-oxford/20" />
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-black text-oxford tracking-tighter leading-none group-hover:text-gold transition-colors duration-500">
                JMRH<span className="text-gold group-hover:text-oxford">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-teal font-black font-ui mt-0.5 opacity-80">Research Horizon</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 hover:text-gold relative group
                  ${location.pathname === link.href ? "text-gold" : "text-oxford/60"}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-gold transition-all duration-500 rounded-full
                  ${location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Buttons & Profile */}
          <div className="hidden lg:flex items-center gap-6">
            {!currentUser ? (
              <div className="flex items-center gap-3 px-4 py-2 bg-gold/5 border border-gold/10 rounded-full">
                <ShieldCheck size={12} className="text-gold" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-gold/60">Trial Access</span>
                <Link to="/auth" className="text-[9px] uppercase tracking-[0.3em] font-black text-oxford hover:text-gold transition-colors ml-2 underline underline-offset-4">Sign In</Link>
              </div>
            ) : (
              <Link to="/account" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-oxford/5 flex items-center justify-center border border-black/5 group-hover:border-gold transition-all">
                  <UserIcon size={16} className="text-teal" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-black text-oxford">{currentUser.name.split(' ')[0]}</span>
                  <span className={`text-[8px] uppercase tracking-[0.2em] font-bold ${currentUser.role === 'ADMIN' ? 'text-red-500' : 'text-teal'}`}>{currentUser.role}</span>
                </div>
              </Link>
            )}

            <Link
              to="/submit-paper"
              className="flex items-center gap-2 bg-oxford text-white px-8 py-3.5 text-[10px] uppercase tracking-[0.25em] font-black hover:bg-gold hover:text-oxford transition-all duration-500 shadow-2xl group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Submit <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center text-oxford border border-black/5 hover:border-gold transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 lg:hidden bg-white px-8 pt-24 pb-12 flex flex-col"
          >
            <div className="container mx-auto h-full flex flex-col">
              <div className="flex justify-between items-center mb-16 border-b border-black/5 pb-8">
                <span className="font-serif text-3xl font-bold italic text-oxford">Scholar Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-oxford text-white hover:bg-gold transition-colors">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-8 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-serif text-4xl italic transition-all flex items-center justify-between group
                      ${location.pathname === link.href ? "text-gold translate-x-4" : "text-oxford/40 hover:text-gold hover:translate-x-2"}`}
                  >
                    {link.label}
                    <ChevronRight className={`transition-all duration-500 ${location.pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} size={32} />
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-6">
                {!currentUser ? (
                  <div className="p-6 bg-gold/5 border border-gold/10 space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-gold" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">Trial Access</span>
                    </div>
                    <p className="text-[10px] text-oxford/40 font-bold uppercase tracking-widest leading-relaxed">
                      You are exploring in Observer Mode. Authorized access is restricted.
                    </p>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="block text-[10px] uppercase tracking-[0.3em] font-black text-teal hover:text-gold transition-colors">Authorize Node →</Link>
                  </div>
                ) : (
                  <Link to="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-6 bg-oxford/5 border border-black/5">
                    <div className="w-12 h-12 rounded-full bg-oxford text-gold flex items-center justify-center font-serif italic text-xl">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-black text-oxford">{currentUser.name}</p>
                      <p className="text-[9px] uppercase tracking-widest text-teal font-bold">{currentUser.role} Profile</p>
                    </div>
                  </Link>
                )}

                <Button asChild className="w-full h-16 rounded-none bg-oxford text-white text-[11px] font-bold tracking-[0.3em] hover:bg-gold transition-all duration-500 shadow-xl">
                  <Link to="/submit-paper" onClick={() => setIsMenuOpen(false)}>SUBMIT MANUSCRIPT</Link>
                </Button>

                <div className="flex justify-between items-center px-1">
                  <p className="text-[9px] uppercase tracking-widest text-oxford/20 font-bold">© 2025 JMRH Portal</p>
                  <div className="flex gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                    <span className="text-[8px] uppercase tracking-widest text-teal font-black">Secure Shell Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

export default Header;
