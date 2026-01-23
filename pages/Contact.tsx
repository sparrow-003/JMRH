import React from 'react';
import { Mail, MapPin, Clock, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';
import { ADDRESS, PUBLISHER, CONTACT_EMAILS } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="py-40 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-32 space-y-6">
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.6em] block">Communication Hub</span>
          <h1 className="text-5xl md:text-8xl font-serif text-blue-950 tracking-tighter">Contact <span className="italic font-normal serif text-blue-900/60">Us</span></h1>
          <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto">Direct channels for all editorial and scholarly inquiries.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-10 bg-slate-50 rounded-[3rem] space-y-6 border border-slate-100 group hover:border-blue-200 transition-colors">
                <div className="w-14 h-14 bg-white text-blue-950 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-blue-950 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1 uppercase text-[10px] tracking-widest">General</h3>
                  <a href={`mailto:${CONTACT_EMAILS.GENERAL}`} className="text-blue-600 text-sm hover:underline font-medium">{CONTACT_EMAILS.GENERAL}</a>
                </div>
              </div>
              <div className="p-10 bg-slate-50 rounded-[3rem] space-y-6 border border-slate-100 group hover:border-amber-200 transition-colors">
                <div className="w-14 h-14 bg-white text-amber-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-amber-800 group-hover:text-white transition-all">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1 uppercase text-[10px] tracking-widest">Submissions</h3>
                  <a href={`mailto:${CONTACT_EMAILS.SUBMISSION}`} className="text-amber-800 text-sm hover:underline font-medium">{CONTACT_EMAILS.SUBMISSION}</a>
                </div>
              </div>
              <div className="p-10 bg-slate-50 rounded-[3rem] space-y-6 border border-slate-100 group hover:border-emerald-200 transition-colors">
                <div className="w-14 h-14 bg-white text-emerald-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-emerald-800 group-hover:text-white transition-all">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1 uppercase text-[10px] tracking-widest">Reviews</h3>
                  <a href={`mailto:${CONTACT_EMAILS.REVIEW}`} className="text-emerald-800 text-sm hover:underline font-medium">{CONTACT_EMAILS.REVIEW}</a>
                </div>
              </div>
              <div className="p-10 bg-slate-50 rounded-[3rem] space-y-6 border border-slate-100 group hover:border-red-200 transition-colors">
                <div className="w-14 h-14 bg-white text-red-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-red-800 group-hover:text-white transition-all">
                  <UserCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1 uppercase text-[10px] tracking-widest">Editorial</h3>
                  <a href={`mailto:${CONTACT_EMAILS.EDITOR}`} className="text-red-800 text-sm hover:underline font-medium">{CONTACT_EMAILS.EDITOR}</a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-serif text-blue-950">Journal Headquarters</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-blue-950 text-lg">Published by {PUBLISHER}</p>
                    <p className="text-slate-500 font-light leading-relaxed">{ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock size={22} />
                  </div>
                  <p className="text-slate-500 font-light">Service: Mon - Sat (9:00 AM - 6:00 PM IST)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-xl shadow-blue-900/5">
             <h3 className="text-3xl font-serif text-blue-950 mb-10">Electronic Inquiry</h3>
             <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-900/10 outline-none text-sm transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Institution Email</label>
                    <input type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-900/10 outline-none text-sm transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Inquiry Subject</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-900/10 outline-none text-sm transition-all appearance-none cursor-pointer">
                    <option>General Support</option>
                    <option>Manuscript Status</option>
                    <option>Editorial Correspondence</option>
                    <option>Reviewer Collaboration</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Message</label>
                  <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-900/10 outline-none text-sm transition-all resize-none" placeholder="Detail your scholarly inquiry..."></textarea>
                </div>
                <button type="button" className="w-full py-6 bg-blue-950 text-white font-bold rounded-2xl hover:bg-amber-800 transition-all shadow-2xl shadow-blue-950/20 uppercase text-[10px] tracking-[0.5em]">
                  Dispatch Inqury
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;