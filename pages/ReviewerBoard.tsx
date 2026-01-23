
import React from 'react';
import { EyeOff, ShieldCheck, UserPlus, ClipboardCheck, Scale } from 'lucide-react';

const ReviewerBoard: React.FC = () => {
  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <header className="text-center">
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Reviewer Board</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">Ensuring academic integrity through a robust, double-blind peer-review mechanism.</p>
        </header>

        {/* Double Blind Policy */}
        <section className="bg-slate-900 text-white rounded-3xl p-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="bg-white/10 p-6 rounded-full flex-shrink-0">
            <EyeOff size={64} className="text-blue-400" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif">Double-Blind Peer Review Policy</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              All manuscripts submitted to JMRH undergo a rigorous <strong>Double-Blind Peer Review</strong> process. This means the reviewers do not know the identity of the authors, and the authors do not know the identity of the reviewers. This ensures total impartiality and objectivity in scientific evaluation.
            </p>
          </div>
        </section>

        {/* Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ClipboardCheck className="text-blue-600" /> Reviewer Responsibilities
            </h3>
            <ul className="space-y-4">
              {[
                "Evaluate the scientific quality, originality, and significance of the research.",
                "Provide constructive, detailed feedback to help authors improve their work.",
                "Ensure references are appropriate and plagiarism is checked.",
                "Declare any potential conflict of interest immediately.",
                "Maintain strict confidentiality regarding the manuscript contents."
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                   <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                   {text}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="text-blue-600" /> Ethical Guidelines
            </h3>
            <div className="prose-academic text-sm text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p>Reviewers must be objective. Criticism of the author's personality is inappropriate. Reviews should be conducted objectively and observations formulated clearly with supporting arguments. Reviewers should identify relevant published work that has not been cited by the authors.</p>
            </div>
          </section>
        </div>

        {/* Join Board */}
        <section className="bg-blue-50 p-10 rounded-3xl border border-blue-200 text-center">
          <UserPlus size={48} className="text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-blue-900 mb-4">Join Our Reviewer Board</h2>
          <p className="text-blue-800 max-w-xl mx-auto mb-8">We are looking for experts in various multidisciplinary fields to join our esteemed reviewer community. Send your academic CV to:</p>
          <div className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 text-lg">
            reviewer@jmrhjournal.com
          </div>
          <p className="mt-4 text-xs text-blue-500 uppercase font-bold tracking-widest">A certification of contribution will be provided for each reviewed paper.</p>
        </section>
      </div>
    </div>
  );
};

export default ReviewerBoard;
