import { memo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Mail, ShieldCheck } from "lucide-react";

const editors = [
  {
    name: "Dr. Karthick B",
    role: "Editor-in-Chief",
    badge: "Principal Intellectual",
    email: "editor.jmrh@gmail.com",
    specialization: "Academic Governance • Multidisciplinary Methods",
    bio: "Visionary academic dedicated to the evolution of multidisciplinary research paradigms and global scholarly integrity.",
    location: "Nilgiris, Tamil Nadu, India",
  },
  {
    name: "Dr. K. Thamarai Selvi K",
    role: "Editorial Advisory",
    badge: "Assistant Professor",
    email: "thamarai@jems.org",
    specialization: "Entrepreneurship • Digital Inclusion",
    bio: "Leading specialist in financial inclusion and innovation ecosystems, ensuring rigorous peer oversight for socio-economic studies.",
    location: "Government Arts College, India",
  },
];

const EditorialBoardSection = memo(() => {
  return (
    <section id="editorial" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 max-w-3xl mx-auto space-y-6"
        >
          <p className="section-label">Institutional Governance</p>
          <h2 className="section-title text-5xl">
            Editorial <span className="italic academic-underline py-1">Leadership</span>
          </h2>
          <p className="text-text-muted text-lg leading-[1.8] font-sans">
            JMRH is governed by a council of distinguished academicians who ensure the
            rigor, ethical transparency, and scholarly impact of every publication.
          </p>
        </motion.div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {editors.map((editor, idx) => (
            <motion.div
              key={editor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="premium-card p-10 group overflow-hidden relative"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-[1000ms]" />

              <div className="relative z-10 space-y-10">
                <div className="flex items-start justify-between">
                  <div className="w-20 h-20 bg-bg-alt flex items-center justify-center rounded-2xl group-hover:bg-oxford transition-all duration-700">
                    <GraduationCap className="w-10 h-10 text-teal group-hover:text-gold transition-colors" />
                  </div>
                  <div className="text-right">
                    <p className="section-label text-[8px] mb-1">{editor.role}</p>
                    <p className="font-serif italic text-teal font-bold">{editor.badge}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-3xl text-oxford group-hover:text-teal transition-colors font-bold">{editor.name}</h3>
                  <div className="flex items-center gap-2 text-text-subtle font-ui text-xs uppercase tracking-widest">
                    <MapPin className="w-3 h-3 text-gold" />
                    {editor.location}
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-border">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Domain Expertise</p>
                    <p className="font-serif italic text-lg text-oxford leading-tight">{editor.specialization}</p>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed font-sans italic opacity-80 group-hover:opacity-100 transition-opacity">
                    "{editor.bio}"
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-8 h-8 rounded-full bg-oxford/5 flex items-center justify-center group-hover:bg-teal transition-colors">
                      <Mail className="w-4 h-4 text-teal group-hover:text-white" />
                    </div>
                    <a href={`mailto:${editor.email}`} className="text-xs font-bold font-ui text-oxford hover:text-gold transition-colors underline decoration-gold/30 underline-offset-4">
                      {editor.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ethics Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 p-12 bg-oxford text-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-10 text-center md:text-left relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_10s_infinite_linear]" />

          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center shrink-0 border border-gold/20">
            <ShieldCheck className="w-10 h-10 text-gold" />
          </div>

          <div className="space-y-2 relative z-10 flex-1">
            <h4 className="font-serif text-2xl text-gold italic">Universal Peer-Review Ethics</h4>
            <p className="text-white/60 text-sm leading-relaxed max-w-3xl">
              The board enforces absolute confidentiality and fairness, adhering strictly to COPE guidelines
              to protect researchers and maintain the purity of scholarly discourse in the digital age.
            </p>
          </div>

          <button className="px-8 py-4 bg-white text-oxford text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-gold hover:text-white transition-all shadow-xl">
            Explore Protocols
          </button>
        </motion.div>
      </div>
    </section>
  );
});

export default EditorialBoardSection;
