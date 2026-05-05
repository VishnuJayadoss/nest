import DashboardHeader from "@/app/layout/Header";
import Detail from "./Components/Detail";
import Sidebar from "../ControlSideBar";

export default function Dashboard() {
    return (
        <>
            <DashboardHeader />
            <Sidebar />
            <Detail />
        </>
    );
}