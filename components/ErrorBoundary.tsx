
import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 text-center">
                    <div className="max-w-md w-full space-y-8 p-12 bg-white rounded-[3rem] shadow-xl border border-[rgba(44,44,44,0.05)]">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={40} />
                        </div>

                        <h1 className="text-3xl font-serif text-[#2C2C2C] leading-tight">
                            Application Encountered<br />
                            <span className="italic font-normal text-[#C5A065]">A Scholarly Interruption.</span>
                        </h1>

                        <p className="text-slate-500 font-sans text-sm leading-relaxed">
                            We apologize for this technical variance. The digital repository is currently being stabilized to ensure academic continuity.
                        </p>

                        <div className="pt-8 flex flex-col gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#2C2C2C] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#C5A065] transition-all"
                            >
                                <RefreshCw size={14} /> Refresh Application
                            </button>

                            <button
                                onClick={() => window.location.href = '/'}
                                className="flex items-center justify-center gap-3 px-8 py-4 border border-[rgba(44,44,44,0.1)] text-[#2C2C2C] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all"
                            >
                                <Home size={14} /> Return to Home
                            </button>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 italic">
                            <p className="text-[10px] text-slate-300 font-medium uppercase tracking-[0.2em]">
                                System Audit Trail: Error {this.state.error?.name || "Unknown"}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
// Updated for git commit
