import { useLocation, Link } from "react-router-dom";
import { useEffect, memo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = memo(() => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg space-y-12"
      >
        <div className="relative">
          <BookOpen className="w-32 h-32 text-gold/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <h1 className="text-9xl font-serif italic text-oxford font-bold relative z-10">404</h1>
        </div>

        <div className="space-y-4">
          <p className="section-label text-teal">Uncharted Territory</p>
          <h2 className="font-serif text-3xl font-bold text-oxford">Scholarly Record Not Found</h2>
          <p className="text-text-muted font-sans leading-relaxed italic">
            " The search for knowledge sometimes leads to paths that do not exist. Return to the known foundations to continue your inquiry. "
          </p>
        </div>

        <Button asChild className="rounded-none bg-oxford text-white h-14 px-10 hover:bg-gold hover:text-oxford transition-all duration-500 shadow-xl group">
          <Link to="/" className="flex items-center gap-3">
            <Home className="w-4 h-4" />
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold">Return to Portal</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
});

export default NotFound;
