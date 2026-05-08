import DashboardHeader from "@/app/layout/Header";
import CRMSideBar from "./CRMSidebar";
import './crm.css';


export default function CRMLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen">
            <DashboardHeader />
            <div className="flex flex-1 overflow-hidden">
                <CRMSideBar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
