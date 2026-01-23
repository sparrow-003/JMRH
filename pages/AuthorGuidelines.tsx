
import React from 'react';
import { Type, List, Mail, Info, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';

const AuthorGuidelines: React.FC = () => {
  return (
    <div className="py-40 bg-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-24 text-center space-y-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] block">Submission Protocol</span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tighter">Author <span className="italic font-normal serif text-accent/60">Guidelines</span></h1>
          <p className="text-slate-400 text-lg font-gl serif italic max-w-3xl mx-auto leading-relaxed">
            "The Journal of Multidisciplinary Research Horizon invites authors to submit original, unpublished manuscripts that align with the journal’s aims and scope. All submissions must represent authentic scholarly work."
          </p>
        </header>

        <div className="space-y-24">
          {/* Email CTA */}
          <section className="bg-primary text-white p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl font-serif">Submit Your Manuscript</h2>
              <p className="text-slate-400 max-w-xl mx-auto text-sm font-light leading-relaxed">
                JMRH invites original, unpublished research papers for its monthly editions. Submissions should be sent electronically to:
              </p>
              <div className="inline-block px-10 py-4 bg-accent text-white font-bold text-xl font-serif tracking-tight">
                submit.jmrh@gmail.com
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Formatting */}
            <section className="space-y-10">
              <h3 className="text-2xl font-serif text-primary flex items-center gap-4">
                <Type className="text-accent" size={24} /> Manuscript Preparation
              </h3>
              <div className="space-y-4">
                {[
                  { label: "File Format", value: "Microsoft Word (.doc / .docx)" },
                  { label: "Font Style", value: "Times New Roman, 12-point" },
                  { label: "Line Spacing", value: "Double-spaced" },
                  { label: "References", value: "APA 7th Edition Style" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-accent/10">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                    <span className="text-sm font-medium text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Structure */}
            <section className="space-y-10">
              <h3 className="text-2xl font-serif text-primary flex items-center gap-4">
                <List className="text-accent" size={24} /> Standard Structure
              </h3>
              <div className="bg-white p-8 border border-accent/10 space-y-4">
                {[
                  "Abstract (max 250 words)",
                  "Keywords (3-5 items)",
                  "Introduction & Problem Statement",
                  "Literature Review",
                  "Research Methodology",
                  "Results & Discussion",
                  "Conclusion & Recommendations",
                  "References (APA style)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700">
                    <CheckCircle2 size={14} className="text-accent shrink-0" />
                    <span className="font-light text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Ethics & Fees - PRD Specifics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="p-10 border border-accent/20 bg-accent/5 space-y-6">
              <ShieldCheck className="text-accent" size={32} />
              <h4 className="text-xl font-serif italic text-primary">Plagiarism Policy</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                All submissions undergo a technical screening. The similarity index must strictly be <strong>less than 10%</strong>. A professional plagiarism report must accompany the manuscript.
              </p>
            </section>
            <section className="p-10 border border-primary/20 bg-primary/5 space-y-6">
              <CreditCard className="text-primary" size={32} />
              <h4 className="text-xl font-serif italic text-primary">Publication Fee</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                To maintain our open-access model, an article processing charge (APC) of <strong>₹650 (INR)</strong> is applicable per accepted paper. There are no submission fees.
              </p>
            </section>
          </div>

          <section className="bg-white p-10 border border-accent/10 flex gap-6 items-start italic">
            <Info size={24} className="text-accent shrink-0 mt-1" />
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              JMRH adheres to COPE ethical guidelines. By submitting, authors declare that the work is original and has not been published elsewhere.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuthorGuidelines;
