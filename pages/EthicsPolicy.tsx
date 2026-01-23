
import React from 'react';
import { Fingerprint, ShieldCheck, Scale, AlertTriangle, UserCheck, BookOpen } from 'lucide-react';

const EthicsPolicy: React.FC = () => {
  return (
    <div className="py-40 bg-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        <header className="text-center space-y-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block">Academic Integrity Framework</span>
          <h1 className="text-5xl md:text-8xl font-serif text-primary tracking-tighter leading-tight">Publication <br /> <span className="italic font-normal serif text-accent/60">Ethics</span></h1>
          <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto">"UGC & COPE Compliant Governance."</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-4xl font-serif text-primary">Core Compliance</h2>
            </div>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              JMRH adheres to the guidelines established by the <strong>University Grants Commission (UGC)</strong> and the <strong>Committee on Publication Ethics (COPE)</strong> to maintain international publishing standards.
            </p>
            <div className="p-10 bg-white rounded-[3rem] border border-accent/10 space-y-6">
              <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Plagiarism Threshold</h4>
              <p className="text-primary text-2xl font-serif italic">
                Strictly &lt; 10% Similarity Index.
              </p>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Manuscripts exceeding this limit or those involved in duplicate/simultaneous submissions will be rejected without further review.
              </p>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[4rem] border border-accent/10 shadow-sm space-y-12">
            <h3 className="text-2xl font-serif text-primary">Duties of Stakeholders</h3>
            <div className="space-y-8">
              {[
                { title: "Authors", desc: "Declaration of originality and acknowledgement of all sources.", icon: <UserCheck size={18} /> },
                { title: "Reviewers", desc: "Confidentiality, objectivity, and timely technical assessment.", icon: <Scale size={18} /> },
                { title: "Editors", desc: "Impartiality, academic integrity, and quality governance.", icon: <BookOpen size={18} /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-bg rounded-xl flex items-center justify-center text-accent shrink-0 border border-accent/10">
                     {item.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-primary mb-1 text-sm uppercase tracking-widest">{item.title}</h5>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Misconduct Section */}
        <section className="p-12 md:p-24 bg-primary text-white rounded-[4rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-20 opacity-5">
             <AlertTriangle size={300} />
          </div>
          <div className="relative z-10 max-w-4xl space-y-8">
            <h2 className="text-4xl font-serif italic">Handling Misconduct & Retractions</h2>
            <p className="text-slate-300 font-light text-lg leading-relaxed">
              In cases of suspected research misconduct (falsification, fabrication, or unethical behavior), the editorial board will follow COPE flowcharts for investigation. If misconduct is confirmed, the paper will be retracted from the digital archives with a formal public notice.
            </p>
            <div className="inline-block px-8 py-3 bg-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
              Ethical Compliance Declaration Required for all submissions
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EthicsPolicy;
