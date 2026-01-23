
import React from 'react';
// Fixed: Removed 'Feedback' as it is not an exported member of 'lucide-react'
import { Mail, MapPin, Clock, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';
import { ADDRESS, PUBLISHER, CONTACT_EMAILS } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="py-40 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        <header className="text-center space-y-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.6em] block">Official Communication</span>
          <h1 className="text-5xl md:text-8xl font-serif text-primary tracking-tighter">Contact <span className="italic font-normal serif text-accent/60">Us</span></h1>
          <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto">"Direct channels for scholarly inquiry."</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { label: "Editorial", email: CONTACT_EMAILS.EDITOR, icon: <UserCheck size={24} /> },
                { label: "Submissions", email: CONTACT_EMAILS.SUBMISSION, icon: <MessageSquare size={24} /> },
                { label: "Reviewer Board", email: CONTACT_EMAILS.REVIEW, icon: <ShieldCheck size={24} /> },
                { label: "Office Support", email: CONTACT_EMAILS.GENERAL, icon: <Mail size={24} /> }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-white rounded-[3rem] border border-accent/10 space-y-6 group hover:bg-primary transition-all duration-500">
                  <div className="w-14 h-14 bg-bg text-accent rounded-2xl flex items-center justify-center border border-accent/10 group-hover:bg-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-white mb-1 uppercase text-[10px] tracking-widest">{item.label}</h3>
                    <a href={`mailto:${item.email}`} className="text-accent text-sm font-medium hover:underline block truncate">{item.email}</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-10">
              <h3 className="text-3xl font-serif text-primary">Headquarters</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent/5 text-accent rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">JMRH Publications</p>
                    <p className="text-slate-500 font-light leading-relaxed max-w-md italic">
                      Gudalur, The Nilgiris – 643212<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest">Office Hours</p>
                    <p className="text-slate-500 font-light text-sm">Mon - Sat (9:00 AM - 6:00 PM IST)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-accent/10 shadow-xl space-y-10">
            <h3 className="text-3xl font-serif text-primary">Feedback & Inquiries</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed italic">
              We welcome your feedback and invitation for collaboration.
            </p>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="Scholar Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm" />
                <input type="email" placeholder="Institution Email" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm" />
              </div>
              <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm resize-none" placeholder="Details of inquiry..."></textarea>
              <button type="button" className="btn-premium w-full">Dispatch Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
