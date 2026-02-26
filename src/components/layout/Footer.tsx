import { memo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ShieldCheck, Globe, Instagram, Mail, ArrowRight } from "lucide-react";

const Footer = memo(() => {
  return (
    <footer className="bg-white border-t border-black/5 pt-24 overflow-hidden relative font-ui">
      <div className="container max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">

          {/* Brand */}
          <div className="md:col-span-5 space-y-10">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-oxford flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-700">
                <BookOpen size={20} className="text-gold -rotate-45 group-hover:-rotate-90 transition-transform duration-700" />
              </div>
              <span className="font-serif text-3xl font-black text-oxford tracking-tighter">JMRH</span>
            </Link>

            <p className="font-sans text-sm text-oxford/50 leading-loose max-w-sm">
              "Strengthening the quality, integrity, and impact of multidisciplinary research for a global scholarly community."
            </p>

            <div className="flex gap-6">
              {[Instagram, Globe, Mail, ShieldCheck].map((Icon, idx) => (
                <a key={idx} href="#" className="text-oxford/40 hover:text-gold transition-colors">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Administrative Office</h4>
              <p className="text-xs text-oxford/50 leading-relaxed font-sans">
                JMRH Publications <br />
                Gudalur, The Nilgiris – 643212 <br />
                Tamil Nadu, India
              </p>
              <div className="pt-2">
                <p className="text-[9px] font-bold text-oxford/30 uppercase tracking-widest">Connect with us</p>
                <p className="text-gold font-bold text-[10px] uppercase mt-1">info@jmrhpublications.com</p>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { label: "About Journal", href: "/about" },
                  { label: "Editorial Board", href: "/editorial-board" },
                  { label: "Ethics Policy", href: "/ethics-policy" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.href} className="text-[10px] uppercase font-bold text-oxford/40 hover:text-gold transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">Resources</h4>
              <ul className="space-y-4">
                {[
                  { label: "Author Guidelines", href: "/guidelines" },
                  { label: "Digital Archives", href: "/archives" },
                  { label: "Contact Us", href: "/contact" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.href} className="text-[10px] uppercase font-bold text-oxford/40 hover:text-gold transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Protocol Bar */}
      <div className="bg-oxford py-6">
        <div className="container max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gold/10 flex items-center justify-center rotate-45">
              <span className="text-gold text-[10px] font-black -rotate-45">J</span>
            </div>
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold">Manuscript Intake Protocol Active 2026</p>
          </div>
          <div className="flex items-center gap-8 text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">
            <p>© JMRH Publications</p>
            <div className="w-[1px] h-4 bg-white/10" />
            <p>Scholarly Excellence Verified</p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
