import { motion } from "framer-motion";

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center space-y-8">
            <div className="relative">
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                </div>
            </div>

            <div className="text-center space-y-2">
                <h2 className="font-serif text-2xl italic text-oxford">JMRH Portal</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold animate-pulse">Initializing Scholar Interface</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;
