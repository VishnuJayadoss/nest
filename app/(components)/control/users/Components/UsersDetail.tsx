"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
    HiOutlineSearch,
    HiOutlinePlus,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlineCalendar,
    HiOutlineDotsVertical,
    HiOutlineUserGroup,
    HiOutlineShieldCheck,
    HiOutlinePencil,
    HiOutlineTrash,
} from "react-icons/hi";
import { MdCircle } from "react-icons/md";

type Role = "Admin" | "Editor" | "Viewer" | "Guest";
type Status = "All" | "Active" | "Inactive" | "Pending";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role: Role;
    status: Exclude<Status, "All">;
    location: string;
    joinedDate: string;
    projects: number;
    lastActive: string;
    color: "violet" | "blue" | "green" | "orange" | "cyan" | "rose";
}

const users: User[] = [
    { id: 1,  name: "Alice Johnson",   email: "alice@nexapanel.com",   phone: "+1 234-567-8901", avatar: "AJ", role: "Admin",  status: "Active",   location: "New York, USA",    joinedDate: "Jan 15, 2023", projects: 12, lastActive: "2 min ago",  color: "violet" },
    { id: 2,  name: "Bob Smith",       email: "bob@nexapanel.com",     phone: "+1 234-567-8902", avatar: "BS", role: "Editor", status: "Active",   location: "London, UK",       joinedDate: "Feb 20, 2023", projects: 8,  lastActive: "1 hour ago", color: "blue"   },
    { id: 3,  name: "Carol White",     email: "carol@nexapanel.com",   phone: "+1 234-567-8903", avatar: "CW", role: "Viewer", status: "Active",   location: "Toronto, Canada",  joinedDate: "Mar 10, 2023", projects: 5,  lastActive: "3 hours ago",color: "green"  },
    { id: 4,  name: "David Lee",       email: "david@nexapanel.com",   phone: "+1 234-567-8904", avatar: "DL", role: "Viewer", status: "Inactive", location: "Sydney, Australia",joinedDate: "Apr 5, 2023",  projects: 3,  lastActive: "2 days ago", color: "orange" },
    { id: 5,  name: "Eva Martinez",    email: "eva@nexapanel.com",     phone: "+1 234-567-8905", avatar: "EM", role: "Editor", status: "Active",   location: "Madrid, Spain",    joinedDate: "May 12, 2023", projects: 10, lastActive: "30 min ago", color: "cyan"   },
    { id: 6,  name: "Frank Chen",      email: "frank@nexapanel.com",   phone: "+1 234-567-8906", avatar: "FC", role: "Viewer", status: "Pending",  location: "Singapore",        joinedDate: "Jun 8, 2023",  projects: 0,  lastActive: "Never",      color: "rose"   },
    { id: 7,  name: "Grace Kim",       email: "grace@nexapanel.com",   phone: "+1 234-567-8907", avatar: "GK", role: "Admin",  status: "Active",   location: "Seoul, Korea",     joinedDate: "Jul 22, 2023", projects: 15, lastActive: "5 min ago",  color: "violet" },
    { id: 8,  name: "Henry Brown",     email: "henry@nexapanel.com",   phone: "+1 234-567-8908", avatar: "HB", role: "Editor", status: "Active",   location: "Berlin, Germany",  joinedDate: "Aug 3, 2023",  projects: 7,  lastActive: "1 day ago",  color: "blue"   },
    { id: 9,  name: "Iris Taylor",     email: "iris@nexapanel.com",    phone: "+1 234-567-8909", avatar: "IT", role: "Guest",  status: "Pending",  location: "Paris, France",    joinedDate: "Sep 14, 2023", projects: 0,  lastActive: "Never",      color: "orange" },
    { id: 10, name: "Jack Wilson",     email: "jack@nexapanel.com",    phone: "+1 234-567-8910", avatar: "JW", role: "Viewer", status: "Inactive", location: "Tokyo, Japan",     joinedDate: "Oct 1, 2023",  projects: 2,  lastActive: "1 week ago", color: "green"  },
    { id: 11, name: "Karen Davis",     email: "karen@nexapanel.com",   phone: "+1 234-567-8911", avatar: "KD", role: "Editor", status: "Active",   location: "Mumbai, India",    joinedDate: "Nov 5, 2023",  projects: 9,  lastActive: "10 min ago", color: "cyan"   },
    { id: 12, name: "Leo Anderson",    email: "leo@nexapanel.com",     phone: "+1 234-567-8912", avatar: "LA", role: "Viewer", status: "Active",   location: "São Paulo, Brazil",joinedDate: "Dec 12, 2023", projects: 4,  lastActive: "2 hours ago",color: "rose"   },
];

const roleConfig: Record<Role, { cls: string; icon: React.ReactNode }> = {
    Admin:  { cls: "user-role-admin",  icon: <HiOutlineShieldCheck className="w-3 h-3" /> },
    Editor: { cls: "user-role-editor", icon: <HiOutlinePencil className="w-3 h-3" /> },
    Viewer: { cls: "user-role-viewer", icon: <HiOutlineUserGroup className="w-3 h-3" /> },
    Guest:  { cls: "user-role-guest",  icon: <HiOutlineUserGroup className="w-3 h-3" /> },
};

const statusTabs: Status[] = ["All", "Active", "Inactive", "Pending"];

export default function UsersDetail() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<Status>("All");

    const filtered = users.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.location.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === "All" || u.status === activeFilter;
        return matchSearch && matchFilter;
    });

    const counts: Record<Status, number> = {
        All:      users.length,
        Active:   users.filter((u) => u.status === "Active").length,
        Inactive: users.filter((u) => u.status === "Inactive").length,
        Pending:  users.filter((u) => u.status === "Pending").length,
    };

    return (
        <div className="dash-page p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Users</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {users.length} total users
                    </p>
                </div>
                <button className="proj-new-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium">
                    <HiOutlinePlus className="w-4 h-4" />
                    Add User
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

                {/* Search */}
                <div className="ac-search flex items-center gap-2 px-3 h-10 rounded-xl flex-1 max-w-sm">
                    <HiOutlineSearch className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent text-sm outline-none flex-1 placeholder:text-slate-500 text-slate-200"
                    />
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-1 proj-filter-bar p-1 rounded-xl">
                    {statusTabs.map((tab) => (
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
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="panel-card rounded-2xl p-16 text-center">
                    <HiOutlineUserGroup className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-faint)" }} />
                    <p className="text-white font-medium mb-1">No users found</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try adjusting your search or filter</p>
                </div>
            )}

            {/* User Grid */}
            {filtered.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((u) => (
                        <UserCard key={u.id} user={u} />
                    ))}
                </div>
            )}
        </div>
    );
}

function UserCard({ user: u }: { user: User }) {
    return (
        <div className={`user-card user-card-${u.color} rounded-2xl p-5 flex flex-col gap-4`}>

            {/* Top */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="avatar-ring w-12 h-12 flex-shrink-0">
                        <div className="avatar-inner">
                            <span className="text-white text-sm font-bold">{u.avatar}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">{u.name}</h3>
                        <span className={`user-role-badge flex items-center gap-1 w-fit mt-1 ${roleConfig[u.role].cls}`}>
                            {roleConfig[u.role].icon}
                            {u.role}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <MdCircle className={`w-2 h-2 ${u.status === "Active" ? "text-green-400" : u.status === "Pending" ? "text-orange-400" : "text-slate-500"}`} />
                    <button className="proj-menu-btn p-1 rounded-lg">
                        <HiOutlineDotsVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
                <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                    <HiOutlineMail className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs truncate">{u.email}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                    <HiOutlinePhone className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs">{u.phone}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                    <HiOutlineLocationMarker className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs">{u.location}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-3 gap-3 pt-3" style={{ borderTop: "1px solid var(--panel-border)" }}>
                <div>
                    <p className="text-xs" style={{ color: "var(--text-faint)" }}>Projects</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{u.projects}</p>
                </div>
                <div>
                    <p className="text-xs" style={{ color: "var(--text-faint)" }}>Joined</p>
                    <p className="text-xs font-medium text-white mt-0.5">{u.joinedDate}</p>
                </div>
                <div>
                    <p className="text-xs" style={{ color: "var(--text-faint)" }}>Last Active</p>
                    <p className="text-xs font-medium text-white mt-0.5">{u.lastActive}</p>
                </div>
            </div>
        </div>
    );
}
