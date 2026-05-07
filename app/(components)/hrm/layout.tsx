import DashboardHeader from "@/app/layout/Header";
import HRMSideBar from "./HRMSidebar";



export default function HRMLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen">
            <DashboardHeader />
            <div className="flex flex-1 overflow-hidden">
                <HRMSideBar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
