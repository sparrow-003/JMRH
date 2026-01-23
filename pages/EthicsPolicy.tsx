
import React from 'react';
import { Fingerprint, ShieldCheck, Scale } from 'lucide-react';

const EthicsPolicy: React.FC = () => {
  return (
    <div className="py-40 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-32 text-center space-y-6">
          <span className="text-[10px] font-bold text-red-900 uppercase tracking-[0.5em] block">Academic Integrity</span>
          <h1 className="text-5xl md:text-8xl font-serif text-blue-950 tracking-tighter leading-tight">Publication <br /> <span className="italic font-normal serif text-blue-900/60">Ethics</span></h1>
          <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto">"Strict adherence to UGC and COPE guidelines."</p>
        </header>

        <div className="space-y-40">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-red-950 text-white rounded-2xl flex items-center justify-center">
                  <Fingerprint size={28} />
                </div>
                <h2 className="text-4xl font-serif text-blue-950">Plagiarism Policy</h2>
              </div>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                JMRH strictly adheres to the ethical standards prescribed by the University Grants Commission (UGC) and the Committee on Publication Ethics (COPE).
              </p>
              <div className="p-10 bg-red-50 rounded-[3rem] border border-red-100 space-y-6">
                 <h4 className="text-3xl font-serif text-red-900">Zero Tolerance</h4>
                 <p className="text-red-800 leading-relaxed font-light italic">
                   "Manuscripts with a similarity index exceeding 10% will be rejected outright. Simultaneous submissions and duplicate publications are strictly prohibited."
                 </p>
              </div>
            </div>
            <div className="bg-slate-50 p-16 rounded-[4rem] border border-slate-100">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10">Ethical Standards</h3>
               <div className="space-y-8">
                 {[
                   { title: "Author Responsibility", desc: "Authors bear full responsibility for the authenticity and ethical integrity of their research." },
                   { title: "Source Citation", desc: "Proper acknowledgment and accurate citation of all sources are mandatory." },
                   { title: "Right to Retract", desc: "The editorial team reserves the right to reject or retract articles violating standards at any stage." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 items-start">
                     <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-900 shrink-0">
                        <Scale size={18} />
                     </div>
                     <div>
                       <h5 className="font-bold text-blue-950 mb-1">{item.title}</h5>
                       <p className="text-sm text-slate-400 font-light leading-relaxed">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </section>

          <section className="bg-blue-950 text-white rounded-[5rem] p-16 md:p-32 relative overflow-hidden text-center shadow-2xl">
             <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="grid grid-cols-12 h-full gap-4 rotate-12 scale-150">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-white/20 rounded-full h-full w-px" />
                  ))}
                </div>
              </div>
             
             <div className="relative z-10 space-y-12">
               <ShieldCheck size={64} className="text-amber-500 mx-auto" />
               <h2 className="text-4xl md:text-6xl font-serif">Impartial Excellence</h2>
               <p className="text-blue-200/60 text-xl font-light leading-relaxed max-w-4xl mx-auto italic">
                 "Each issue of JMRH is curated through a rigorous double-blind peer-review system, ensuring impartiality and adherence to international best practices."
               </p>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EthicsPolicy;
