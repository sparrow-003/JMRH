
import React from 'react';
import { Mail, GraduationCap, MapPin, ExternalLink, Shield, BookOpen } from 'lucide-react';
import { EDITORIAL_BOARD } from '../constants';
import { motion } from 'framer-motion';

const EditorialBoard: React.FC = () => {
  return (
    <div className="py-40 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-32 text-center space-y-6">
          <span className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.5em] block">Academic Governance</span>
          <h1 className="text-5xl md:text-8xl font-serif text-blue-950 tracking-tighter">Editorial <span className="italic font-normal serif text-blue-900/60">Board</span></h1>
          <p className="text-slate-400 text-xl font-light italic max-w-2xl mx-auto">Governed by distinguished researchers ensuring the highest scientific quality.</p>
        </header>

        {/* Editor-in-Chief */}
        <section className="space-y-16">
          {EDITORIAL_BOARD.filter(m => m.role === 'Editor-in-Chief').map((member, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className="bg-white rounded-[4rem] p-12 md:p-20 border border-slate-100 shadow-sm relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 p-20 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-1000">
                  <Shield size={300} />
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative z-10">
                  <div className="space-y-10">
                    <div className="w-48 h-48 bg-slate-50 rounded-[3rem] flex items-center justify-center border-2 border-white shadow-xl">
                      <GraduationCap size={64} className="text-blue-950" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-serif text-blue-950 mb-2">{member.name}</h3>
                      <p className="text-amber-800 font-bold uppercase text-[10px] tracking-[0.4em] mb-4">{member.role}</p>
                      <span className="px-5 py-2 bg-blue-50 text-blue-900 rounded-full text-[9px] font-bold uppercase tracking-widest border border-blue-100">
                        {member.designation}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <MapPin size={18} className="text-amber-700 mt-1 shrink-0" />
                          <p className="text-sm text-slate-500 font-light leading-relaxed italic">{member.institution}, <br /> {member.address}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Mail size={18} className="text-amber-700 shrink-0" />
                          <p className="text-sm text-blue-900 font-medium">{member.officialEmail}</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <BookOpen size={18} className="text-amber-700 mt-1 shrink-0" />
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Specialization</p>
                            <p className="text-sm text-slate-700 font-medium">{member.specialization}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-10 bg-slate-50 rounded-[2.5rem] space-y-4">
                       <h4 className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.4em]">Researcher Biography</h4>
                       <p className="text-slate-500 font-light leading-relaxed italic text-lg">
                         Dr. K. Thamarai Selvi K is a dedicated academician and researcher currently serving in the Department of Commerce at Government Arts College, Gudalur. Her research interests focus on entrepreneurship development, tribal empowerment, and digital education.
                       </p>
                       <p className="text-sm text-slate-400 font-light mt-4">
                         Experience: 10 years of teaching and research experience in Commerce and Management.
                       </p>
                    </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </section>

        {/* Board Note */}
        <section className="mt-32 text-center p-16 bg-blue-950 text-white rounded-[4rem] shadow-2xl">
          <h2 className="text-3xl font-serif mb-6 italic">Academic Integrity Disclaimer</h2>
          <p className="text-blue-200/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            All board members are bound by COPE ethical guidelines. No personal email IDs are utilized for ISSN listing or official editorial correspondence.
          </p>
        </section>
      </div>
    </div>
  );
};

export default EditorialBoard;
