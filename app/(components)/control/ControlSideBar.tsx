"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import "../../layout/header.css";
import {
  HiOutlineViewGrid,
  HiOutlineOfficeBuilding,
  HiOutlineCreditCard,
  HiOutlineCash,
  HiOutlineUserGroup,
  HiOutlineCube,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineSupport,
  HiOutlineChartBar,
  HiOutlineDocumentReport,
  HiOutlineBell,
  HiOutlinePuzzle,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import Link from "next/link";

const navItems = [
  // Dashboard
  {
    icon: <HiOutlineViewGrid className="w-5 h-5" />,
    label: "Dashboard",
    href: "/control/dashboard",
  },

  // Tenant Management
  {
    icon: <HiOutlineOfficeBuilding className="w-5 h-5" />,
    label: "Tenants",
    href: "/control/tenants",
  },

  // Billing & Subscription
  {
    icon: <HiOutlineCreditCard className="w-5 h-5" />,
    label: "Plans & Subscriptions",
    href: "/control/plans",
  },
  {
    icon: <HiOutlineCash className="w-5 h-5" />,
    label: "Transactions",
    href: "/control/transactions",
  },

  // CRM
  {
    icon: <HiOutlineUserGroup className="w-5 h-5" />,
    label: "CRM Management",
    href: "/control/crm",
  },

  // ERP
  {
    icon: <HiOutlineCube className="w-5 h-5" />,
    label: "ERP Management",
    href: "/control/erp",
  },

  // HRM
  {
    icon: <HiOutlineBriefcase className="w-5 h-5" />,
    label: "HRM Management",
    href: "/control/hrm",
  },

  // Users & Permissions
  {
    icon: <HiOutlineUsers className="w-5 h-5" />,
    label: "Users",
    href: "/control/users",
  },
  {
    icon: <HiOutlineShieldCheck className="w-5 h-5" />,
    label: "Roles & Permissions",
    href: "/control/access-control",
  },

  // Support
  {
    icon: <HiOutlineSupport className="w-5 h-5" />,
    label: "Support Tickets",
    href: "/control/support",
  },

  // Analytics & Reports
  {
    icon: <HiOutlineChartBar className="w-5 h-5" />,
    label: "Analytics",
    href: "/control/analytics",
  },
  {
    icon: <HiOutlineDocumentReport className="w-5 h-5" />,
    label: "Reports",
    href: "/control/reports",
  },

  // Notifications
  {
    icon: <HiOutlineBell className="w-5 h-5" />,
    label: "Notifications",
    href: "/control/notifications",
  },

  // Integrations
  {
    icon: <HiOutlinePuzzle className="w-5 h-5" />,
    label: "Integrations",
    href: "/control/integrations",
  },

  // Audit Logs
  {
    icon: <HiOutlineClipboardList className="w-5 h-5" />,
    label: "Audit Logs",
    href: "/control/logs",
  },

  // Settings
  {
    icon: <HiOutlineCog className="w-5 h-5" />,
    label: "Settings",
    href: "/control/settings",
  },
];

export default function ControlSideBar() {
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
        {navItems.map((item) => (
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
