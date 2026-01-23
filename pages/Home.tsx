
import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Globe, Trophy, GraduationCap, PenTool, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { JOURNAL_PARTICULARS, JOURNAL_TITLE } from '../constants';

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".editorial-fade", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-transparent min-h-screen relative" ref={heroRef}>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-56 pb-32 px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 border border-accent/20 bg-accent/5 text-accent rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-12"
        >
          <PenTool size={12} /> Excellence in Multidisciplinary Research
        </motion.div>

        <div className="max-w-[1400px] mx-auto space-y-12">
          <h1 className="editorial-fade text-6xl md:text-[8rem] lg:text-[10rem] font-serif text-primary leading-[0.9] tracking-tightest">
            Scholarly<br />
            <span className="italic font-normal text-accent/80">Horizon.</span>
          </h1>
          
          <div className="space-y-8 pt-8">
            <p className="editorial-fade text-slate-400 font-bold text-[10px] uppercase tracking-[0.8em] flex items-center justify-center gap-6">
               <span className="w-16 h-px bg-accent/20" /> 
               Official Journal Publication 2025
               <span className="w-16 h-px bg-accent/20" />
            </p>
            <h2 className="editorial-fade text-xl md:text-3xl font-serif text-slate-600 italic max-w-4xl mx-auto leading-relaxed px-4">
              A peer-reviewed, open-access platform fostering interdisciplinary innovation and rigorous academic inquiry.
            </h2>
          </div>

          <div className="editorial-fade flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <Link to="/submit" className="btn-premium w-full sm:w-auto">
              Submit Manuscript
            </Link>
            <Link to="/archives" className="w-full sm:w-auto px-12 py-4 border border-slate-200 text-primary rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-3">
              View Repository <ArrowUpRight size={14} className="text-accent" />
            </Link>
          </div>
        </div>
      </section>

      {/* Journal Particulars Table - PRD 4.1 Requirement */}
      <section className="py-24 bg-bg border-y border-accent/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="crystal-card overflow-hidden">
            <div className="bg-primary p-6 text-center">
              <h3 className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">Journal Particulars</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-accent/10">
              {JOURNAL_PARTICULARS.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center px-10 py-6 hover:bg-accent/5 transition-colors">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm font-serif text-primary italic font-medium">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-10 py-6 bg-accent/5">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">ISSN (Online)</span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">To be assigned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">Foundational Mission</span>
              <h3 className="text-5xl md:text-7xl font-serif text-primary leading-tight">Authentic<br/><span className="italic text-accent/70">Governance.</span></h3>
              <p className="text-slate-600 text-lg font-light leading-relaxed max-w-lg">
                JMRH aims to provide a credible, structured platform for academic discourse, ensuring accessibility and transparency across multidisciplinary fields.
              </p>
              <div className="pt-6">
                <Link to="/about" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Explore Aims & Scope <ChevronRight size={14} className="text-accent group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-12">
              <div className="p-12 border-l-2 border-accent/20 bg-white/40 space-y-6">
                 <Trophy className="text-accent" size={32} />
                 <h4 className="text-2xl font-serif italic">The Vision</h4>
                 <p className="text-slate-500 text-base font-light leading-relaxed">
                   To be a globally recognized journal that bridges the gap between theoretical research and practical societal impact.
                 </p>
              </div>
              <div className="p-12 border-l-2 border-primary/20 bg-primary/5 space-y-6">
                 <Globe className="text-primary" size={32} />
                 <h4 className="text-2xl font-serif italic">Open Access Policy</h4>
                 <p className="text-slate-500 text-base font-light leading-relaxed">
                   Providing immediate, free access to research results to support the global exchange of knowledge.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
