
import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Globe, Trophy, GraduationCap, PenTool, BookOpen, ChevronRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { JOURNAL_PARTICULARS, JOURNAL_TITLE } from '../constants';

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Very subtle entry animation
    const ctx = gsap.context(() => {
      gsap.from(".editorial-fade", {
        y: 20,
        opacity: 0,
        duration: 2,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-transparent min-h-screen relative" ref={heroRef}>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-48 pb-32 px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="inline-flex items-center gap-3 px-4 py-2 border border-accent/30 text-accent rounded-sm text-[0.7rem] font-bold uppercase tracking-[0.3em] mb-12 bg-white/50 backdrop-blur-sm"
        >
          <PenTool size={10} /> EST. 2025
        </motion.div>

        <div className="max-w-[1400px] mx-auto space-y-10">
          <h1 className="editorial-fade text-6xl md:text-[7rem] lg:text-[9rem] font-serif text-primary leading-[1.1] tracking-tight">
            Scholarly<br />
            <span className="italic font-normal text-secondary">Horizon.</span>
          </h1>

          <div className="space-y-8 pt-8 max-w-2xl mx-auto">
            <p className="editorial-fade text-body-text font-serif italic text-xl md:text-2xl leading-relaxed">
              "To bridge the gap between theoretical inquiry and practical societal impact through rigorous, open-access scholarship."
            </p>
          </div>

          <div className="editorial-fade flex flex-col sm:flex-row items-center justify-center gap-8 pt-12">
            <Link to="/submit" className="btn-scholar text-base px-10 py-4">
              Submit Manuscript
            </Link>
            <Link to="/archives" className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors flex items-center gap-3 border-b border-transparent hover:border-primary pb-1">
              View Repository <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED: Editorial Board Spotlight */}
      <section className="py-32 bg-white border-y border-[rgba(44,44,44,0.03)]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <span className="micro-label">Leadership</span>
            <h2 className="text-4xl font-serif text-primary mt-4">Editorial Board</h2>
            <div className="w-16 h-px bg-accent mx-auto mt-6 opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Profile Card */}
            <div className="lg:col-span-4 sticky top-32">
              <div className="profile-card">
                <div className="w-full aspect-[3/4] bg-slate-100 rounded-md mb-6 relative overflow-hidden">
                  {/* Placeholder for Editor Image */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-80 hover:scale-105 transition-transform duration-700"></div>
                </div>
                <div className="space-y-2">
                  <span className="profile-role-label">Editor-in-Chief</span>
                  <h3 className="text-2xl font-serif text-primary">Dr. Eleanor Sterling</h3>
                  <p className="text-sm font-sans text-secondary uppercase tracking-wider">University of Oxford</p>
                </div>
                <div className="pt-6 border-t border-[rgba(44,44,44,0.05)] space-y-4">
                  <div className="flex items-center gap-3 text-sm text-body-text">
                    <Mail size={14} className="text-accent" />
                    <span>e.sterling@jmrh.org</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-body-text">
                    <Globe size={14} className="text-accent" />
                    <span>Department of Ethics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography Content Panel */}
            <div className="lg:col-span-8">
              <div className="bio-panel">
                <span className="text-accent font-sans font-bold text-xs uppercase tracking-[0.2em] mb-8 block">Biography</span>
                <div className="bio-content font-serif leading-loose text-lg text-body-text space-y-6">
                  <p>
                    <span className="text-5xl float-left mr-4 mt-[-10px] text-primary font-serif">D</span>r. Eleanor Sterling serves as the Director of the Institute for Ethical AI Governance at the University of Oxford. With over two decades of experience in computational ethics and sociotechnical systems, her research focuses on the intersection of algorithmic accountability and human rights law.
                  </p>
                  <p>
                    Before assuming her role as Editor-in-Chief at JMRH, Dr. Sterling published seminal works on "The Algorithmic Social Contract," which have been cited in landmark policy frameworks by the European Commission. She believes that academic publishing must evolve to become more transparent, rigorous, and accessible to the global south.
                  </p>
                  <p>
                    "True scholarship does not merely exist in a vacuum of theory," she often notes in her keynotes. "It must be the bedrock upon which we build resilient, equitable societies." At JMRH, she oversees a multidisciplinary team committed to elevating voices that challenge the status quo while adhering to the highest standards of peer review.
                  </p>
                </div>

                <div className="mt-12 flex gap-6">
                  <button className="text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-accent border-b border-primary hover:border-accent pb-1 transition-all">
                    View Full Publications
                  </button>
                  <button className="text-xs font-bold uppercase tracking-[0.2em] text-secondary hover:text-primary transition-colors">
                    Download CV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Particulars (Refined) */}
      <section className="py-24 bg-bg border-b border-[rgba(44,44,44,0.03)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="crystal-card p-0 overflow-hidden">
            <div className="bg-primary p-8 text-center">
              <h3 className="text-white text-[0.7rem] font-bold uppercase tracking-[0.4em]">Journal Particulars</h3>
            </div>
            <div className="bg-white p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                {JOURNAL_PARTICULARS.map((item: any, idx: number) => (
                  <div key={idx} className="group">
                    <p className="text-[0.65rem] font-bold text-accent uppercase tracking-widest mb-2 group-hover:text-primary transition-colors">{item.label}</p>
                    <p className="text-lg font-serif text-primary italic border-l-2 border-transparent group-hover:border-accent/30 pl-0 group-hover:pl-4 transition-all duration-300">{item.value}</p>
                  </div>
                ))}
                <div className="group">
                  <p className="text-[0.65rem] font-bold text-accent uppercase tracking-widest mb-2">ISSN (Online)</p>
                  <p className="text-lg font-serif text-secondary italic">Pending Assignment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Sub-footer */}
      <section className="py-40 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8">Ready to Contribute?</h2>
        <p className="text-body-text max-w-2xl mx-auto mb-12 text-lg font-serif italic">
          Join a growing community of scholars dedicated to rigorous, impactful research.
        </p>
        <Link to="/submit" className="btn-scholar text-sm px-12 py-5 shadow-xl hover:shadow-2xl">
          Submit Your Manuscript
        </Link>
      </section>
    </div>
  );
};

export default Home;
