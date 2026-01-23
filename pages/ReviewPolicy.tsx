
import React from 'react';
import { GitPullRequest, Search, CheckCircle2, MessageSquare, Clock, AlertCircle, EyeOff } from 'lucide-react';

const ReviewPolicy: React.FC = () => {
  const steps = [
    {
      title: "Initial Screening",
      desc: "Editorial desk evaluates the manuscript for scope alignment and performs a plagiarism check (< 10%).",
      icon: <Search className="text-blue-600" />
    },
    {
      title: "Double-Blind Peer Review",
      desc: "Impartial evaluation where identity is shielded between authors and reviewers.",
      icon: <EyeOff className="text-blue-600" />
    },
    {
      title: "Technical Recommendation",
      desc: "Reviewers provide critical feedback: Accept, Revision, or Reject.",
      icon: <MessageSquare className="text-blue-600" />
    },
    {
      title: "Editorial Verdict",
      desc: "The Editor-in-Chief makes the final determination based on technical reports.",
      icon: <CheckCircle2 className="text-blue-600" />
    }
  ];

  return (
    <div className="py-40 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-24 text-center space-y-6">
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.5em] block">Quality Assurance</span>
          <h1 className="text-5xl md:text-8xl font-serif text-blue-950 tracking-tighter">Review <span className="italic font-normal serif text-blue-900/60">Policy</span></h1>
          <p className="text-slate-400 text-xl font-light italic">A transparent and rigorous workflow for academic excellence.</p>
        </header>

        <div className="space-y-16">
          {/* Timeline Box */}
          <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl shadow-blue-900/5 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center flex-shrink-0 shadow-inner">
               <Clock size={40} className="text-blue-900" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-blue-950">Review Lifecycle</h3>
              <p className="text-slate-500 font-light text-lg leading-relaxed">
                The standard duration from submission to the first editorial decision is <strong>3–4 weeks</strong>. We prioritize thorough vetting while maintaining operational efficiency.
              </p>
            </div>
          </section>

          {/* Workflow Steps */}
          <section className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-10 p-10 bg-white rounded-[3rem] border border-slate-100 hover:border-blue-200 transition-all duration-700 group">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-950 group-hover:text-white transition-all">
                    {React.cloneElement(step.icon as React.ReactElement<any>, { size: 28 })}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-serif text-blue-950 tracking-tight">{step.title}</h4>
                    <p className="text-slate-500 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Revision Policy */}
          <section className="bg-blue-950 text-white p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="grid grid-cols-12 h-full gap-4 rotate-12 scale-150">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-white/20 rounded-full h-full w-px" />
                  ))}
                </div>
              </div>
             <div className="relative z-10">
                <h2 className="text-3xl font-serif mb-10 flex items-center gap-4 italic">
                  <AlertCircle className="text-amber-500" size={32} /> Revision & Appeal Protocol
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-blue-200/80">
                  <div className="space-y-4">
                    <p className="font-bold text-white uppercase text-[10px] tracking-widest">Revisions</p>
                    <p className="text-base font-light leading-relaxed">Authors are typically given 1–2 weeks for revisions. All updates must be accompanied by a point-by-point rebuttal responding to reviewer queries.</p>
                  </div>
                  <div className="space-y-4">
                    <p className="font-bold text-white uppercase text-[10px] tracking-widest">Appeals</p>
                    <p className="text-base font-light leading-relaxed">Formal appeals may be submitted to the Editor-in-Chief. Reconsideration is granted only upon substantive evidence of technical unfairness.</p>
                  </div>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReviewPolicy;
