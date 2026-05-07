import DashboardHeader from "@/app/layout/Header";
import ERPSideBar from "./ERPSidebar";



export default function ERPLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen">
            <DashboardHeader />
            <div className="flex flex-1 overflow-hidden">
                <ERPSideBar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
