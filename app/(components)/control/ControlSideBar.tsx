"use client";

import { useState } from "react";
import "../../layout/header.css";

const navItems = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        label: "Dashboard",
        href: "#",
        active: true,
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        label: "Analytics",
        href: "#",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
        ),
        label: "Projects",
        href: "#",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
        label: "Messages",
        href: "#",
        badge: 4,
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        label: "Settings",
        href: "#",
    },
];

export default function ControlSideBar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside
            className={`
        sidebar-glass relative flex flex-col h-screen text-white
        transition-all duration-300 ease-in-out flex-shrink-0
        ${isOpen ? "w-60" : "w-[64px]"}
      `}
        >
            {/* ── Toggle Button — floats on the right edge ── */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="sidebar-toggle-btn absolute -right-3 top-[22px] z-20
          w-6 h-6 rounded-full flex items-center justify-center text-xs"
                aria-label="Toggle sidebar"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s" }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* ── Logo row — same height as header (64px) ── */}
            <div className="sidebar-logo-row flex items-center gap-3 px-4">
                {/* Logo matches header's N logo exactly */}
                <div
                    className="logo-glow w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)" }}
                >
                    <span className="text-white font-bold text-lg">N</span>
                </div>
                {isOpen && (
                    <span
                        className="text-white font-semibold text-lg truncate"
                        style={{ letterSpacing: "0.04em" }}
                    >
                        NexaPanel
                    </span>
                )}
            </div>

            {/* ── Nav Items ── */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={`nav-item ${item.active ? "active" : ""} flex items-center gap-3 px-3 py-2.5 rounded-xl relative group`}
                    >
                        {/* Icon */}
                        <span className="shrink-0 w-4 flex items-center justify-center">
                            {item.icon}
                        </span>

                        {/* Label */}
                        {isOpen && (
                            <span className="text-sm font-medium truncate">{item.label}</span>
                        )}

                        {/* Badge (open) */}
                        {item.badge && isOpen && (
                            <span className="ml-auto violet-badge">{item.badge}</span>
                        )}

                        {/* Tooltip + badge (collapsed) */}
                        {!isOpen && (
                            <span className="nav-tooltip absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 flex items-center gap-2">
                                {item.label}
                                {item.badge && <span className="violet-badge">{item.badge}</span>}
                            </span>
                        )}
                    </a>
                ))}
            </nav>

            {/* ── Footer / User ── */}
            <div className="sidebar-footer px-3 py-3">
                <div className="sidebar-user-row flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer">
                    <div className="avatar-ring w-8 h-8 flex-shrink-0">
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