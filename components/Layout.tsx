
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 ${
        scrolled ? 'glass-header py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex flex-col group">
          <div className="flex items-center gap-3">
            <PenTool size={20} className="text-accent" />
            <span className="text-primary font-serif text-2xl font-bold tracking-tightest">JMRH.</span>
          </div>
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1 italic">Research Horizon</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-[10px] font-bold uppercase tracking-widest transition-all relative group ${
                location.pathname === link.href ? 'text-accent' : 'text-slate-400 hover:text-primary'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 ${location.pathname === link.href ? 'w-full' : 'group-hover:w-full'}`}></span>
            </Link>
          ))}
          
          <div className="flex items-center gap-6 pl-6 border-l border-accent/10">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={role === 'ADMIN' ? `/system/control-panel/dashboard` : `/user/${user?.id}`}
                  className="px-6 py-2 border border-slate-200 text-primary rounded-sm text-[9px] font-bold uppercase tracking-widest hover:border-accent transition-all"
                >
                  Portal
                </Link>
                <button onClick={handleLogout} className="text-slate-300 hover:text-red-500 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-8 py-3 bg-primary text-white rounded-sm text-[9px] font-bold uppercase tracking-widest hover:bg-accent transition-all"
              >
                Scholar Access
              </Link>
            )}
          </div>
        </div>

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
            className="lg:hidden absolute top-full left-0 right-0 bg-bg border-b border-accent/10 p-10 flex flex-col gap-6 shadow-xl"
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
