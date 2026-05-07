"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import "../../layout/header.css";
import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineOfficeBuilding,
  HiOutlineIdentification,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineClipboardCheck,
  HiOutlineCurrencyDollar,
  HiOutlineUserAdd,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineDocumentReport,
  HiOutlineBell,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import Link from "next/link";

const hrmSidebarItems = [
  // Dashboard
  {
    icon: <HiOutlineViewGrid className="w-5 h-5" />,
    label: "Dashboard",
    href: "/hrm/dashboard",
  },

  // Employees
  {
    icon: <HiOutlineUsers className="w-5 h-5" />,
    label: "Employees",
    href: "/hrm/employees",
  },

  // Departments
  {
    icon: <HiOutlineOfficeBuilding className="w-5 h-5" />,
    label: "Departments",
    href: "/hrm/departments",
  },

  // Designations
  {
    icon: <HiOutlineIdentification className="w-5 h-5" />,
    label: "Designations",
    href: "/hrm/designations",
  },

  // Attendance
  {
    icon: <HiOutlineClock className="w-5 h-5" />,
    label: "Attendance",
    href: "/hrm/attendance",
  },

  // Leave Management
  {
    icon: <HiOutlineCalendar className="w-5 h-5" />,
    label: "Leave Management",
    href: "/hrm/leaves",
  },

  // Payroll
  {
    icon: <HiOutlineCurrencyDollar className="w-5 h-5" />,
    label: "Payroll",
    href: "/hrm/payroll",
  },

  // Recruitment
  {
    icon: <HiOutlineUserAdd className="w-5 h-5" />,
    label: "Recruitment",
    href: "/hrm/recruitment",
  },

  // Performance Management
  {
    icon: <HiOutlineChartBar className="w-5 h-5" />,
    label: "Performance",
    href: "/hrm/performance",
  },

  // Training
  {
    icon: <HiOutlineAcademicCap className="w-5 h-5" />,
    label: "Training",
    href: "/hrm/training",
  },

  // Shift Management
  {
    icon: <HiOutlineClipboardCheck className="w-5 h-5" />,
    label: "Shifts",
    href: "/hrm/shifts",
  },

  // Teams
  {
    icon: <HiOutlineUserGroup className="w-5 h-5" />,
    label: "Teams",
    href: "/hrm/teams",
  },

  // Projects
  {
    icon: <HiOutlineBriefcase className="w-5 h-5" />,
    label: "Projects",
    href: "/hrm/projects",
  },

  // Reports
  {
    icon: <HiOutlineDocumentReport className="w-5 h-5" />,
    label: "Reports",
    href: "/hrm/reports",
  },

  // Notifications
  {
    icon: <HiOutlineBell className="w-5 h-5" />,
    label: "Notifications",
    href: "/hrm/notifications",
  },

  // Activity Logs
  {
    icon: <HiOutlineClipboardList className="w-5 h-5" />,
    label: "Activity Logs",
    href: "/hrm/logs",
  },

  // Settings
  {
    icon: <HiOutlineCog className="w-5 h-5" />,
    label: "Settings",
    href: "/hrm/settings",
  },
];

export default function HRMSideBar() {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();

    return (
        <aside className={`sidebar-glass relative flex flex-col h-full text-white z-20 transition-all duration-300 ease-in-out shrink-0 ${isOpen ? "w-60" : "w-16"}`}>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="sidebar-toggle-btn absolute -right-3 top-5.5 z-20 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                aria-label="Toggle sidebar"
            >
                <HiOutlineChevronLeft
                    className="w-3 h-3"
                    style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s" }}
                />
            </button>

            {/* Logo row */}
            <div className="sidebar-logo-row flex items-center gap-3 px-4">
                <div
                    className="logo-glow w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)" }}
                >
                    <span className="text-white font-bold text-lg">N</span>
                </div>
                {isOpen && (
                    <span className="text-white font-semibold text-lg truncate" style={{ letterSpacing: "0.04em" }}>
                        NexaPanel
                    </span>
                )}
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {hrmSidebarItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`nav-item ${pathname === item.href ? "active" : ""} flex items-center gap-3 px-3 py-2.5 rounded-xl relative group`}
                    >
                        <span className="shrink-0 w-4 flex items-center justify-center">{item.icon}</span>
                        {isOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Footer / User */}
            <div className="sidebar-footer px-3 py-3">
                <div className="sidebar-user-row flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer">
                    <div className="avatar-ring w-8 h-8 shrink-0">
                        <div className="avatar-inner">
                            <span className="text-white text-xs font-bold">JD</span>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-slate-100 truncate leading-tight">John Doe</p>
                            <p className="text-xs truncate leading-tight" style={{ color: "var(--text-faint)" }}>
                                john@nexapanel.com
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
