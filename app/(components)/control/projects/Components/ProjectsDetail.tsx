"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
    HiOutlineSearch,
    HiOutlineFilter,
    HiOutlinePlus,
    HiOutlineUserGroup,
    HiOutlineCalendar,
    HiOutlineDotsVertical,
    HiOutlineClipboardList,
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlineViewGrid,
    HiOutlineViewList,
} from "react-icons/hi";

type Status = "All" | "Active" | "Pending" | "Review" | "Completed";
type Color = "violet" | "blue" | "green" | "orange" | "cyan" | "rose";

interface Project {
    id: number;
    name: string;
    description: string;
    status: Exclude<Status, "All">;
    progress: number;
    color: Color;
    members: { avatar: string }[];
    dueDate: string;
    tasks: { done: number; total: number };
    category: string;
}

const projects: Project[] = [
    {
        id: 1, name: "E-commerce Platform", description: "Full-stack online store with payment integration and inventory management.",
        status: "Active", progress: 85, color: "violet", dueDate: "Dec 30, 2024", category: "Web App",
        members: [{ avatar: "AJ" }, { avatar: "BS" }, { avatar: "CW" }, { avatar: "DL" }],
        tasks: { done: 34, total: 40 },
    },
    {
        id: 2, name: "Mobile App Redesign", description: "Complete UI/UX overhaul of the iOS and Android applications.",
        status: "Active", progress: 60, color: "blue", dueDate: "Jan 15, 2025", category: "Mobile",
        members: [{ avatar: "EM" }, { avatar: "FC" }],
        tasks: { done: 18, total: 30 },
    },
    {
        id: 3, name: "API Integration", description: "Third-party API integrations for CRM, analytics, and communication tools.",
        status: "Pending", progress: 30, color: "orange", dueDate: "Feb 1, 2025", category: "Backend",
        members: [{ avatar: "GK" }, { avatar: "HB" }, { avatar: "AJ" }],
        tasks: { done: 9, total: 30 },
    },
    {
        id: 4, name: "Dashboard Analytics", description: "Real-time analytics dashboard with charts, KPIs, and export features.",
        status: "Review", progress: 95, color: "green", dueDate: "Dec 28, 2024", category: "Web App",
        members: [{ avatar: "BS" }, { avatar: "CW" }, { avatar: "DL" }, { avatar: "EM" }, { avatar: "FC" }],
        tasks: { done: 38, total: 40 },
    },
    {
        id: 5, name: "Auth & Security Module", description: "OAuth2, MFA, and role-based access control implementation.",
        status: "Completed", progress: 100, color: "cyan", dueDate: "Dec 10, 2024", category: "Security",
        members: [{ avatar: "GK" }, { avatar: "AJ" }],
        tasks: { done: 25, total: 25 },
    },
    {
        id: 6, name: "Email Campaign Tool", description: "Drag-and-drop email builder with scheduling and analytics.",
        status: "Active", progress: 45, color: "rose", dueDate: "Feb 20, 2025", category: "Marketing",
        members: [{ avatar: "HB" }, { avatar: "BS" }, { avatar: "CW" }],
        tasks: { done: 14, total: 32 },
    },
    {
        id: 7, name: "Cloud Migration", description: "Migrate legacy infrastructure to AWS with zero downtime strategy.",
        status: "Pending", progress: 15, color: "blue", dueDate: "Mar 10, 2025", category: "DevOps",
        members: [{ avatar: "DL" }, { avatar: "EM" }],
        tasks: { done: 4, total: 28 },
    },
    {
        id: 8, name: "Customer Portal", description: "Self-service portal for customers to manage subscriptions and support.",
        status: "Review", progress: 78, color: "violet", dueDate: "Jan 5, 2025", category: "Web App",
        members: [{ avatar: "FC" }, { avatar: "GK" }, { avatar: "HB" }],
        tasks: { done: 21, total: 27 },
    },
];

const statusConfig: Record<Exclude<Status, "All">, { label: string; cls: string; icon: React.ReactNode }> = {
    Active:    { label: "Active",    cls: "status-active",    icon: <HiOutlineClock className="w-3 h-3" /> },
    Pending:   { label: "Pending",   cls: "status-pending",   icon: <HiOutlineExclamationCircle className="w-3 h-3" /> },
    Review:    { label: "Review",    cls: "status-review",    icon: <HiOutlineClipboardList className="w-3 h-3" /> },
    Completed: { label: "Completed", cls: "status-completed", icon: <HiOutlineCheckCircle className="w-3 h-3" /> },
};

const filterTabs: Status[] = ["All", "Active", "Pending", "Review", "Completed"];

export default function ProjectsDetail() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<Status>("All");
    const [view, setView] = useState<"grid" | "list">("grid");

    const filtered = projects.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === "All" || p.status === activeFilter;
        return matchSearch && matchFilter;
    });

    const counts: Record<Status, number> = {
        All:       projects.length,
        Active:    projects.filter((p) => p.status === "Active").length,
        Pending:   projects.filter((p) => p.status === "Pending").length,
        Review:    projects.filter((p) => p.status === "Review").length,
        Completed: projects.filter((p) => p.status === "Completed").length,
    };

    return (
        <div className="dash-page p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {projects.length} total projects
                    </p>
                </div>
                <button className="proj-new-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium">
                    <HiOutlinePlus className="w-4 h-4" />
                    New Project
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

                {/* Search */}
                <div className="ac-search flex items-center gap-2 px-3 h-10 rounded-xl flex-1 max-w-sm">
                    <HiOutlineSearch className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent text-sm outline-none flex-1 placeholder:text-slate-500 text-slate-200"
                    />
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-1 proj-filter-bar p-1 rounded-xl">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`proj-filter-tab px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${activeFilter === tab ? "proj-filter-active" : ""}`}
                        >
                            {tab}
                            <span className="proj-count-badge">{counts[tab]}</span>
                        </button>
                    ))}
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-1 proj-filter-bar p-1 rounded-xl">
                    <button onClick={() => setView("grid")} className={`proj-view-btn p-1.5 rounded-lg ${view === "grid" ? "proj-filter-active" : ""}`}>
                        <HiOutlineViewGrid className="w-4 h-4" />
                    </button>
                    <button onClick={() => setView("list")} className={`proj-view-btn p-1.5 rounded-lg ${view === "list" ? "proj-filter-active" : ""}`}>
                        <HiOutlineViewList className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="panel-card rounded-2xl p-16 text-center">
                    <HiOutlineClipboardList className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-faint)" }} />
                    <p className="text-white font-medium mb-1">No projects found</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try adjusting your search or filter</p>
                </div>
            )}

            {/* Grid View */}
            {view === "grid" && filtered.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </div>
            )}

            {/* List View */}
            {view === "list" && filtered.length > 0 && (
                <div className="panel-card rounded-2xl overflow-hidden">
                    {/* Table head */}
                    <div className="proj-list-head grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3">
                        <span>Project</span>
                        <span>Status</span>
                        <span>Progress</span>
                        <span>Due Date</span>
                        <span></span>
                    </div>
                    {filtered.map((p, i) => (
                        <div
                            key={p.id}
                            className={`proj-list-row grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 ${i < filtered.length - 1 ? "proj-list-divider" : ""}`}
                        >
                            {/* Name */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className={`proj-dot-${p.color} w-2 h-2 rounded-full flex-shrink-0`} />
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{p.category}</p>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <span className={`project-status flex items-center gap-1 w-fit ${statusConfig[p.status].cls}`}>
                                    {statusConfig[p.status].icon}
                                    {p.status}
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-white">{p.progress}%</span>
                                <div className="progress-bar">
                                    <div className={`progress-fill-${p.color}`} style={{ width: `${p.progress}%` }} />
                                </div>
                            </div>

                            {/* Due */}
                            <div className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                                <HiOutlineCalendar className="w-3.5 h-3.5 shrink-0" />
                                <span className="text-xs">{p.dueDate}</span>
                            </div>

                            {/* Actions */}
                            <button className="proj-menu-btn p-1.5 rounded-lg">
                                <HiOutlineDotsVertical className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ProjectCard({ project: p }: { project: Project }) {
    return (
        <div className={`proj-card proj-card-${p.color} rounded-2xl p-5 flex flex-col gap-4`}>

            {/* Top */}
            <div className="flex items-start justify-between">
                <span className={`proj-category-badge proj-cat-${p.color}`}>{p.category}</span>
                <div className="flex items-center gap-2">
                    <span className={`project-status flex items-center gap-1 ${statusConfig[p.status].cls}`}>
                        {statusConfig[p.status].icon}
                        {p.status}
                    </span>
                    <button className="proj-menu-btn p-1 rounded-lg">
                        <HiOutlineDotsVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div>
                <h3 className="text-sm font-semibold text-white mb-1">{p.name}</h3>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>{p.description}</p>
            </div>

            {/* Progress */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Progress</span>
                    <span className="text-xs font-semibold text-white">{p.progress}%</span>
                </div>
                <div className="progress-bar">
                    <div className={`progress-fill-${p.color}`} style={{ width: `${p.progress}%` }} />
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid var(--panel-border)" }}>

                {/* Members */}
                <div className="flex items-center">
                    {p.members.slice(0, 4).map((m, i) => (
                        <div
                            key={i}
                            className="avatar-ring w-7 h-7 flex-shrink-0"
                            style={{ marginLeft: i > 0 ? "-8px" : "0", zIndex: p.members.length - i }}
                        >
                            <div className="avatar-inner">
                                <span className="text-white" style={{ fontSize: "9px", fontWeight: 700 }}>{m.avatar}</span>
                            </div>
                        </div>
                    ))}
                    {p.members.length > 4 && (
                        <span className="text-xs ml-1.5" style={{ color: "var(--text-muted)" }}>+{p.members.length - 4}</span>
                    )}
                </div>

                {/* Tasks + Due */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <HiOutlineClipboardList className="w-3.5 h-3.5" />
                        <span className="text-xs">{p.tasks.done}/{p.tasks.total}</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                        <HiOutlineCalendar className="w-3.5 h-3.5" />
                        <span className="text-xs">{p.dueDate.split(",")[0]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
