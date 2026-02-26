
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ArrowRight, Globe, Mail, PenTool, ChevronRight } from 'lucide-react';
import { NAV_LINKS, ADDRESS, PUBLISHER, JOURNAL_TITLE } from '../constants';
import { useAuth } from './AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, role, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 ${scrolled ? 'bg-[rgba(250,249,246,0.95)] backdrop-blur-md border-b border-[rgba(44,44,44,0.08)] py-4' : 'bg-transparent py-8'
        }`}
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        {/* Identity */}
        <Link to="/" className="flex flex-col group">
          <div className="flex items-center gap-3">
            <span className="text-primary font-serif text-3xl font-bold tracking-tight">JMRH.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-[0.8rem] font-bold uppercase tracking-[0.15em] transition-colors ${location.pathname === link.href ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-6 pl-8 border-l border-primary/10">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to={role === 'ADMIN' ? `/system/control-panel/dashboard` : `/user/${user?.id}`}
                  className="text-[0.75rem] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-secondary hover:text-red-500 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-scholar"
              >
                Scholar Access
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-primary">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-bg border-b border-primary/10 p-10 flex flex-col gap-6 shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-serif text-primary hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Footer = () => (
  <footer className="bg-bg border-t border-accent/10 pt-24 pb-12 px-8">
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="flex items-center gap-3">
            <PenTool size={24} className="text-accent" />
            <h2 className="text-3xl font-serif text-primary font-bold tracking-tightest">JMRH.</h2>
          </div>
          <p className="text-slate-500 text-lg font-serif italic max-w-md">
            Promoting excellence in multidisciplinary research through rigorous scholarly vetting.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-accent/20 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Globe size={16} /></a>
            <a href="mailto:jmrhpublications@gmail.com" className="w-10 h-10 border border-accent/20 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Mail size={16} /></a>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">The Publisher</h3>
          <p className="text-sm text-primary font-bold leading-tight">{PUBLISHER}</p>
          <p className="text-[11px] text-slate-400 font-light leading-relaxed italic">{ADDRESS}</p>
        </div>
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Resource Hub</h3>
          <ul className="space-y-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <li><Link to="/guidelines" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-accent/30" /> Guidelines</Link></li>
            <li><Link to="/editorial" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-accent/30" /> Board Members</Link></li>
            <li><Link to="/archives" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-accent/30" /> Digital Repository</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-accent/30" /> Support Desk</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-t border-accent/5 pt-12">
        <div className="space-y-2">
          <p className="text-primary/70">&copy; 2025 Journal of Multidisciplinary Research Horizon (JMRH)</p>
          <p className="text-slate-300 font-light italic">Published by JMRH Publications • Gudalur, Tamil Nadu, India.</p>
        </div>
        <div className="flex gap-4">
          <span className="text-accent bg-accent/5 px-4 py-2 border border-accent/10">ISSN (Online): To be assigned by ISSN India</span>
        </div>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
// Updated for git commit
