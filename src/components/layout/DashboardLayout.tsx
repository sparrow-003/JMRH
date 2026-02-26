import { ReactNode, memo } from "react";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
    children: ReactNode;
    role: 'ADMIN' | 'PROFESSOR';
}

const DashboardLayout = memo(({ children, role }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <DashboardSidebar role={role} />
            <main className="lg:pl-64 min-h-screen">
                <div className="p-8 lg:p-12 max-w-[1400px] mx-auto animate-academic-reveal">
                    {children}
                </div>
            </main>
        </div>
    );
});

export default DashboardLayout;
