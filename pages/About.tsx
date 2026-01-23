import React from 'react';
import { Target, Compass, BookOpen, Scale, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const aims = [
    "Advance scholarly knowledge through rigorous and original interdisciplinary research.",
    "Encourage the integration of diverse academic perspectives to address complex real-world challenges.",
    "Provide a credible and inclusive publication platform for both emerging scholars and established researchers.",
    "Uphold the highest standards of research ethics, transparency, and academic integrity.",
    "Promote meaningful collaboration among researchers across disciplines and institutions."
  ];

  const scopes = [
    "Commerce and Management",
    "Economics and Finance",
    "Education and Psychology",
    "Social Sciences and Humanities",
    "Science and Technology",
    "Environmental Studies and Sustainability",
    "Digital Transformation and Innovation"
  ];

  return (
    <div className="py-40 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-32 text-center space-y-6">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-[0.6em] block">Journal Foundation</span>
          <h1 className="text-5xl md:text-8xl font-serif text-blue-950 tracking-tighter leading-none">Aims and <span className="italic font-normal serif text-blue-900/60">Scope</span></h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Aims */}
          <section className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-950 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                <Target size={28} />
              </div>
              <h2 className="text-4xl font-serif text-blue-950">Aims</h2>
            </div>
            <p className="text-slate-400 text-lg font-light leading-relaxed italic">
              The Journal of Multidisciplinary Research Horizon aims to:
            </p>
            <div className="space-y-8">
              {aims.map((aim, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-3 shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-slate-600 text-lg font-light leading-relaxed">{aim}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scope */}
          <section className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-amber-50 text-amber-900 rounded-2xl flex items-center justify-center">
                <Compass size={28} />
              </div>
              <h2 className="text-4xl font-serif text-blue-950">Scope</h2>
            </div>
            <p className="text-slate-400 text-lg font-light leading-relaxed italic">
              We publish high-quality original research articles, review papers, and case analyses from:
            </p>
            <div className="grid grid-cols-1 gap-4">
              {scopes.map((scope, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group hover:bg-blue-950 transition-all duration-700">
                  <span className="text-lg font-serif text-blue-950 group-hover:text-white transition-colors">{scope}</span>
                  <BookOpen size={18} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
                </div>
              ))}
            </div>
            <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 flex gap-4 items-start">
              <Scale size={20} className="text-blue-900 mt-1" />
              <p className="text-sm text-slate-600 font-light italic">
                We particularly value contributions that adopt interdisciplinary methodologies and innovative frameworks that bridge theory with practice.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;