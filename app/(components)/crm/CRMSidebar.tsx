"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import "../../layout/header.css";
import "../../layout/sidebar.css";
import {
    HiOutlineViewGrid,
    HiOutlineUserAdd,
    HiOutlineUsers,
    HiOutlineOfficeBuilding,
    HiOutlineCurrencyDollar,
    HiOutlineChartSquareBar,
    HiOutlineClipboardCheck,
    HiOutlineCalendar,
    HiOutlinePhone,
    HiOutlineMail,
    HiOutlineChatAlt2,
    HiOutlineSpeakerphone,
    HiOutlineTicket,
    HiOutlineDocumentText,
    HiOutlinePresentationChartLine,
    HiOutlineBell,
    HiOutlineCog,
    HiOutlineChevronLeft,
} from "react-icons/hi";
import Link from "next/link";

const crmSidebarItems = [
    // Dashboard
    {
        icon: <HiOutlineViewGrid className="w-5 h-5" />,
        label: "Dashboard",
        href: "/crm/dashboard",
    },

    // Leads
    {
        icon: <HiOutlineUserAdd className="w-5 h-5" />,
        label: "Leads",
        href: "/crm/leads",
    },

    // Contacts
    {
        icon: <HiOutlineUsers className="w-5 h-5" />,
        label: "Contacts",
        href: "/crm/contacts",
    },

    // Customers / Companies
    {
        icon: <HiOutlineOfficeBuilding className="w-5 h-5" />,
        label: "Customers",
        href: "/crm/customers",
    },

    // Deals / Opportunities
    {
        icon: <HiOutlineCurrencyDollar className="w-5 h-5" />,
        label: "Deals",
        href: "/crm/deals",
    },

    // Pipelines
    {
        icon: <HiOutlineChartSquareBar className="w-5 h-5" />,
        label: "Pipelines",
        href: "/crm/pipelines",
    },

    // Tasks
    {
        icon: <HiOutlineClipboardCheck className="w-5 h-5" />,
        label: "Tasks",
        href: "/crm/tasks",
    },

    // Calendar
    {
        icon: <HiOutlineCalendar className="w-5 h-5" />,
        label: "Calendar",
        href: "/crm/calendar",
    },

    // Calls
    {
        icon: <HiOutlinePhone className="w-5 h-5" />,
        label: "Calls",
        href: "/crm/calls",
    },

    // Emails
    {
        icon: <HiOutlineMail className="w-5 h-5" />,
        label: "Emails",
        href: "/crm/emails",
    },

    // Communication
    {
        icon: <HiOutlineChatAlt2 className="w-5 h-5" />,
        label: "Communication",
        href: "/crm/communication",
    },

    // Marketing
    {
        icon: <HiOutlineSpeakerphone className="w-5 h-5" />,
        label: "Marketing",
        href: "/crm/marketing",
    },

    // Support Tickets
    {
        icon: <HiOutlineTicket className="w-5 h-5" />,
        label: "Support Tickets",
        href: "/crm/support",
    },

    // Quotations / Proposals
    {
        icon: <HiOutlineDocumentText className="w-5 h-5" />,
        label: "Quotations",
        href: "/crm/quotations",
    },

    // Reports
    {
        icon: <HiOutlinePresentationChartLine className="w-5 h-5" />,
        label: "Reports",
        href: "/crm/reports",
    },

    // Notifications
    {
        icon: <HiOutlineBell className="w-5 h-5" />,
        label: "Notifications",
        href: "/crm/notifications",
    },

    // Settings
    {
        icon: <HiOutlineCog className="w-5 h-5" />,
        label: "Settings",
        href: "/crm/settings",
    },
];

export default function CRMSideBar() {
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
                {crmSidebarItems.map((item) => (
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
