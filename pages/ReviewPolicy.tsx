
import React from 'react';
import { GitPullRequest, Search, CheckCircle2, MessageSquare, Clock, AlertCircle, EyeOff, ShieldCheck } from 'lucide-react';

const ReviewPolicy: React.FC = () => {
  const steps = [
    {
      title: "Initial Screening",
      desc: "Editorial desk evaluates the manuscript for scope alignment and plagiarism threshold check (< 10%).",
      icon: <Search className="text-accent" />
    },
    {
      title: "Double-Blind Peer Review",
      desc: "An impartial evaluation where identity is protected for both reviewers and authors.",
      icon: <EyeOff className="text-accent" />
    },
    {
      title: "Reviewer Recommendations",
      desc: "Expert technical assessment leading to Accept, Revision, or Reject suggestions.",
      icon: <MessageSquare className="text-accent" />
    },
    {
      title: "Editorial Decision",
      desc: "The Editor-in-Chief makes the final determination based on collective peer reports.",
      icon: <ShieldCheck className="text-accent" />
    }
  ];

  return (
    <div className="py-40 bg-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-24">
        <header className="text-center space-y-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block">Governance Workflow</span>
          <h1 className="text-5xl md:text-8xl font-serif text-primary tracking-tighter">Review <span className="italic font-normal serif text-accent/60">Policy</span></h1>
          <p className="text-slate-400 text-xl font-light italic">"Standardized rigor for academic credibility."</p>
        </header>

        {/* Timeline Box */}
        <section className="bg-primary text-white p-12 rounded-[4rem] flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 p-10 opacity-5">
            <Clock size={200} />
          </div>
          <div className="w-24 h-24 bg-accent rounded-[2.5rem] flex items-center justify-center flex-shrink-0 shadow-lg relative z-10">
            <Clock size={40} className="text-white" />
          </div>
          <div className="space-y-4 relative z-10">
            <h3 className="text-3xl font-serif italic">Decision Timeline</h3>
            <p className="text-slate-300 font-light text-lg leading-relaxed">
              Standard turnaround from submission to first decision is <strong>3–4 weeks</strong>.
            </p>
          </div>
        </section>

        {/* Workflow Steps */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            {steps.map((step: { title: string; desc: string; icon: React.ReactElement }, i: number) => (
              <div key={i} className="flex gap-10 p-10 bg-white rounded-[3rem] border border-accent/10 hover:border-accent group transition-all duration-700">
                <div className="w-16 h-16 bg-bg rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all border border-accent/10">
                  {React.cloneElement(step.icon as any, { size: 28 })}
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-serif text-primary tracking-tight">{step.title}</h4>
                  <p className="text-slate-500 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Appeal Section */}
        <section className="bg-white p-12 md:p-16 rounded-[4rem] border border-accent/10 space-y-12">
          <h2 className="text-3xl font-serif flex items-center gap-4 italic text-primary">
            <AlertCircle className="text-accent" size={32} /> Appeal & Revision Protocol
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-4">
              <p className="font-bold text-accent uppercase text-[10px] tracking-widest">Revisions</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed italic">Authors provided with revision requests must submit point-by-point rebuttals within 1-2 weeks.</p>
            </div>
            <div className="space-y-4">
              <p className="font-bold text-accent uppercase text-[10px] tracking-widest">Appeals</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed italic">Formal technical appeals can be logged with the Editor-in-Chief for procedural reconsideration.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReviewPolicy;
// Updated for git commit
