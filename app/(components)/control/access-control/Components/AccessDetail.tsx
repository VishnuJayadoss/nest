"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
    HiOutlineSearch,
    HiOutlineX,
    HiOutlineLockClosed,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
    HiOutlineCheck,
    HiOutlinePlus,
    HiOutlineTrash,
} from "react-icons/hi";
import { MdCircle } from "react-icons/md";

type Role = "Admin" | "Editor" | "Viewer";

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: Role;
    hasAccess: boolean;
}

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    status: "Active" | "Beta" | "Deprecated";
    users: number;
    color: "violet" | "blue" | "green" | "orange";
}

const allUsers: User[] = [
    { id: 1,  name: "Alice Johnson",  email: "alice@nexapanel.com",   avatar: "AJ", role: "Admin",  hasAccess: true  },
    { id: 2,  name: "Bob Smith",      email: "bob@nexapanel.com",     avatar: "BS", role: "Editor", hasAccess: true  },
    { id: 3,  name: "Carol White",    email: "carol@nexapanel.com",   avatar: "CW", role: "Viewer", hasAccess: true  },
    { id: 4,  name: "David Lee",      email: "david@nexapanel.com",   avatar: "DL", role: "Viewer", hasAccess: false },
    { id: 5,  name: "Eva Martinez",   email: "eva@nexapanel.com",     avatar: "EM", role: "Editor", hasAccess: false },
    { id: 6,  name: "Frank Chen",     email: "frank@nexapanel.com",   avatar: "FC", role: "Viewer", hasAccess: false },
    { id: 7,  name: "Grace Kim",      email: "grace@nexapanel.com",   avatar: "GK", role: "Admin",  hasAccess: false },
    { id: 8,  name: "Henry Brown",    email: "henry@nexapanel.com",   avatar: "HB", role: "Editor", hasAccess: false },
];

const products: Product[] = [
    { id: 1, name: "Analytics Engine",    description: "Real-time data analytics and reporting platform",    category: "Analytics",  status: "Active",     users: 24, color: "violet" },
    { id: 2, name: "User Management",     description: "Centralized user identity and access management",    category: "Security",   status: "Active",     users: 18, color: "blue"   },
    { id: 3, name: "Payment Gateway",     description: "Secure payment processing and transaction handling",  category: "Finance",    status: "Active",     users: 12, color: "green"  },
    { id: 4, name: "Notification Hub",    description: "Multi-channel notification and messaging service",   category: "Messaging",  status: "Beta",       users: 9,  color: "orange" },
    { id: 5, name: "File Storage",        description: "Scalable cloud file storage and CDN delivery",       category: "Storage",    status: "Active",     users: 31, color: "blue"   },
    { id: 6, name: "Audit Logger",        description: "Comprehensive audit trail and compliance logging",   category: "Security",   status: "Beta",       users: 7,  color: "violet" },
    { id: 7, name: "Email Service",       description: "Transactional and marketing email delivery",         category: "Messaging",  status: "Active",     users: 22, color: "green"  },
    { id: 8, name: "Legacy API",          description: "Deprecated REST API v1 endpoints",                   category: "API",        status: "Deprecated", users: 3,  color: "orange" },
];

const roleColors: Record<Role, string> = {
    Admin:  "role-admin",
    Editor: "role-editor",
    Viewer: "role-viewer",
};

export default function AccessDetail() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [users, setUsers] = useState<User[]>(allUsers);
    const [search, setSearch] = useState("");

    const filtered = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    const grantedUsers  = filtered.filter((u) => u.hasAccess);
    const availableUsers = filtered.filter((u) => !u.hasAccess);

    function toggleAccess(id: number) {
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, hasAccess: !u.hasAccess } : u));
    }

    function changeRole(id: number, role: Role) {
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
    }

    function openModal(product: Product) {
        setSearch("");
        setSelectedProduct(product);
    }

    return (
        <div className="dash-page p-6 space-y-6">

            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Access Control</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Manage user permissions per product
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg" style={{ background: "var(--panel-elevated)", color: "var(--text-muted)", border: "1px solid var(--panel-border)" }}>
                    <HiOutlineShieldCheck className="w-4 h-4" />
                    {products.length} Products
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className={`ac-product-card ac-card-${product.color} rounded-2xl p-5 flex flex-col gap-4`}>

                        {/* Top row */}
                        <div className="flex items-start justify-between">
                            <div className={`ac-icon-${product.color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <HiOutlineLockClosed className="w-5 h-5" />
                            </div>
                            <span className={`product-status-badge status-${product.status.toLowerCase()}`}>
                                {product.status}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-white mb-1">{product.name}</h3>
                            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{product.description}</p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid var(--panel-border)" }}>
                            <div className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                                <HiOutlineUserGroup className="w-3.5 h-3.5" />
                                <span className="text-xs">{product.users} users</span>
                            </div>
                            <button
                                onClick={() => openModal(product)}
                                className={`ac-manage-btn ac-btn-${product.color} flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium`}
                            >
                                <HiOutlineShieldCheck className="w-3.5 h-3.5" />
                                Manage
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Modal ── */}
            {selectedProduct && (
                <div className="ac-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
                    <div className="ac-modal w-full max-w-lg rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--panel-border)" }}>
                            <div className="flex items-center gap-3">
                                <div className={`ac-icon-${selectedProduct.color} w-9 h-9 rounded-xl flex items-center justify-center`}>
                                    <HiOutlineLockClosed className="w-4 h-4" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-white">{selectedProduct.name}</h2>
                                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Manage user access</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedProduct(null)} className="ac-close-btn w-8 h-8 rounded-lg flex items-center justify-center">
                                <HiOutlineX className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--panel-border)" }}>
                            <div className="ac-search flex items-center gap-2 px-3 h-10 rounded-xl">
                                <HiOutlineSearch className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent text-sm outline-none flex-1 placeholder:text-slate-500 text-slate-200"
                                    autoFocus
                                />
                                {search && (
                                    <button onClick={() => setSearch("")}>
                                        <HiOutlineX className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* User List */}
                        <div className="overflow-y-auto" style={{ maxHeight: "380px" }}>

                            {/* Granted */}
                            {grantedUsers.length > 0 && (
                                <div>
                                    <div className="px-6 py-2 flex items-center gap-2">
                                        <MdCircle className="w-1.5 h-1.5 text-green-400" />
                                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                                            Has Access ({grantedUsers.length})
                                        </span>
                                    </div>
                                    {grantedUsers.map((u) => (
                                        <UserRow key={u.id} user={u} onToggle={toggleAccess} onRoleChange={changeRole} />
                                    ))}
                                </div>
                            )}

                            {/* Available */}
                            {availableUsers.length > 0 && (
                                <div>
                                    <div className="px-6 py-2 flex items-center gap-2" style={{ borderTop: grantedUsers.length > 0 ? "1px solid var(--panel-border)" : "none" }}>
                                        <MdCircle className="w-1.5 h-1.5" style={{ color: "var(--text-faint)" }} />
                                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                                            No Access ({availableUsers.length})
                                        </span>
                                    </div>
                                    {availableUsers.map((u) => (
                                        <UserRow key={u.id} user={u} onToggle={toggleAccess} onRoleChange={changeRole} />
                                    ))}
                                </div>
                            )}

                            {filtered.length === 0 && (
                                <div className="px-6 py-10 text-center">
                                    <HiOutlineSearch className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--text-faint)" }} />
                                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>No users found</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--panel-border)" }}>
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                {users.filter((u) => u.hasAccess).length} of {users.length} users have access
                            </span>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className={`ac-manage-btn ac-btn-${selectedProduct.color} flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium`}
                            >
                                <HiOutlineCheck className="w-3.5 h-3.5" />
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function UserRow({ user, onToggle, onRoleChange }: {
    user: User;
    onToggle: (id: number) => void;
    onRoleChange: (id: number, role: Role) => void;
}) {
    return (
        <div className={`ac-user-row flex items-center gap-3 px-6 py-3 ${user.hasAccess ? "ac-user-granted" : ""}`}>
            {/* Avatar */}
            <div className="avatar-ring w-8 h-8 flex-shrink-0">
                <div className="avatar-inner">
                    <span className="text-white text-xs font-bold">{user.avatar}</span>
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{user.email}</p>
            </div>

            {/* Role selector (only when has access) */}
            {user.hasAccess && (
                <select
                    value={user.role}
                    onChange={(e) => onRoleChange(user.id, e.target.value as Role)}
                    className={`ac-role-select ${roleColors[user.role]} text-xs rounded-lg px-2 py-1 outline-none cursor-pointer`}
                >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                </select>
            )}

            {/* Toggle button */}
            <button
                onClick={() => onToggle(user.id)}
                className={`ac-toggle-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${user.hasAccess ? "ac-revoke" : "ac-grant"}`}
            >
                {user.hasAccess
                    ? <><HiOutlineTrash className="w-3.5 h-3.5" /> Revoke</>
                    : <><HiOutlinePlus className="w-3.5 h-3.5" /> Grant</>
                }
            </button>
        </div>
    );
}
