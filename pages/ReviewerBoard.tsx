
import React from 'react';
import { EyeOff, ShieldCheck, UserPlus, ClipboardCheck, Scale, Lock, Mail } from 'lucide-react';
import { CONTACT_EMAILS } from '../constants';

const ReviewerBoard: React.FC = () => {
  return (
    <div className="py-40 bg-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-6 space-y-24">
        <header className="text-center space-y-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block">Quality Assurance</span>
          <h1 className="text-5xl md:text-8xl font-serif text-primary tracking-tighter">Reviewer <span className="italic font-normal serif text-accent/60">Board</span></h1>
          <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto">"Ensuring peer-review integrity and academic governance."</p>
        </header>

        {/* Double Blind Policy */}
        <section className="bg-primary text-white p-12 md:p-20 rounded-[4rem] flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5">
            <EyeOff size={200} />
          </div>
          <div className="bg-white/10 p-8 rounded-full flex-shrink-0">
            <EyeOff size={48} className="text-accent" />
          </div>
          <div className="space-y-6 relative z-10">
            <h2 className="text-3xl font-serif">Double-Blind Peer Review Mechanism</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-lg font-light">
              Identity protection is paramount. Neither the author nor the reviewer are aware of each other's identities during the evaluation phase to ensure absolute impartiality and scientific objectivity.
            </p>
          </div>
        </section>

        {/* Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <section className="space-y-10">
            <h3 className="text-2xl font-serif text-primary flex items-center gap-4">
              <ClipboardCheck className="text-accent" size={28} /> Reviewer Responsibilities
            </h3>
            <ul className="space-y-6">
              {[
                "Evaluation of scientific quality, originality, and significance.",
                "Providing constructive feedback to facilitate academic improvement.",
                "Vetting of citations and plagiarism check compliance.",
                "Declaration of any potential conflict of interest immediately.",
                "Adherence to the monthly review timeline (3–4 weeks)."
              ].map((text: string, i: number) => (
                <li key={i} className="flex items-start gap-4 text-slate-600 text-sm font-light">
                  <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                  {text}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-10">
            <h3 className="text-2xl font-serif text-primary flex items-center gap-4">
              <Lock className="text-accent" size={28} /> Confidentiality & Ethics
            </h3>
            <div className="bg-white p-10 rounded-[3rem] border border-accent/10 space-y-6 italic">
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Manuscripts received for review are confidential documents and must be treated as such. They must not be shown to or discussed with others except as authorized by the Editor-in-Chief.
              </p>
              <div className="h-px bg-accent/10 w-full" />
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Reviewers must not use unpublished materials disclosed in a submitted manuscript for their own research without the express written consent of the author.
              </p>
            </div>
          </section>
        </div>

        {/* Join Board */}
        <section className="bg-accent/5 p-16 rounded-[4rem] border border-accent/10 text-center space-y-10">
          <UserPlus size={48} className="text-accent mx-auto" />
          <div className="space-y-4">
            <h2 className="text-3xl font-serif text-primary">Call for Reviewers</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-light">We welcome experts in Multidisciplinary fields. Please submit your academic profile and institutional ORCID to:</p>
          </div>
          <div className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl text-lg font-serif">
            <Mail size={20} className="text-accent" /> {CONTACT_EMAILS.REVIEW}
          </div>
          <p className="text-[10px] text-accent uppercase font-bold tracking-[0.4em]">Certificates of Contribution are issued per review.</p>
        </section>
      </div>
    </div>
  );
};

export default ReviewerBoard;
