
import React from 'react';
import { Target, Compass, BookOpen, Scale, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const aims = [
    "Promote interdisciplinary research across various scholarly domains.",
    "Encourage innovation by providing a platform for breakthrough findings.",
    "Ensure ethical publishing through rigorous peer-review and plagiarism screening.",
    "Support emerging and established researchers in global knowledge exchange.",
    "Maintain long-term digital archives for the preservation of academic work."
  ];

  const scopes = [
    "Commerce & Management",
    "Economics & Finance",
    "Education & Psychology",
    "Social Sciences & Humanities",
    "Science & Technology",
    "Environmental Studies",
    "Digital Transformation"
  ];

  return (
    <div className="py-40 bg-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-32 text-center space-y-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.6em] block">Journal Foundation</span>
          <h1 className="text-5xl md:text-8xl font-serif text-primary tracking-tighter leading-none">Aims and <span className="italic font-normal serif text-accent/60">Scope</span></h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Aims */}
          <section className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl">
                <Target size={28} />
              </div>
              <h2 className="text-4xl font-serif text-primary">Journal Aims</h2>
            </div>
            <div className="space-y-8">
              {aims.map((aim, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-3 shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-slate-600 text-lg font-light leading-relaxed">{aim}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scope */}
          <section className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
                <Compass size={28} />
              </div>
              <h2 className="text-4xl font-serif text-primary">Publication Scope</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {scopes.map((scope, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl border border-accent/10 flex items-center justify-between group hover:bg-primary transition-all duration-700">
                  <span className="text-lg font-serif text-primary group-hover:text-white transition-colors">{scope}</span>
                  <BookOpen size={18} className="text-slate-300 group-hover:text-accent transition-colors" />
                </div>
              ))}
            </div>
            <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10 flex gap-4 items-start italic">
              <ShieldCheck size={20} className="text-primary mt-1" />
              <p className="text-sm text-slate-500 font-light">
                JMRH matches ISSN India expectations by focusing on high-quality, verified interdisciplinary scholarship.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
