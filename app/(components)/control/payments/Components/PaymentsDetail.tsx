"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
    HiOutlineSearch,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineExclamationCircle,
    HiOutlineCurrencyDollar,
    HiOutlineCalendar,
    HiOutlineDotsVertical,
    HiOutlineDownload,
    HiOutlineRefresh,
} from "react-icons/hi";

type PayStatus = "All" | "Paid" | "Unpaid" | "Overdue";

interface Payment {
    id: string;
    user: { name: string; email: string; avatar: string };
    project: string;
    amount: number;
    status: Exclude<PayStatus, "All">;
    dueDate: string;
    paidDate?: string;
    method?: string;
    invoice: string;
}

const payments: Payment[] = [
    { id: "1",  user: { name: "Alice Johnson", email: "alice@nexapanel.com", avatar: "AJ" }, project: "E-commerce Platform",  amount: 4200,  status: "Paid",    dueDate: "Dec 1, 2024",  paidDate: "Nov 28, 2024", method: "Credit Card", invoice: "INV-001" },
    { id: "2",  user: { name: "Bob Smith",     email: "bob@nexapanel.com",   avatar: "BS" }, project: "Mobile App Redesign",  amount: 2800,  status: "Paid",    dueDate: "Dec 5, 2024",  paidDate: "Dec 3, 2024",  method: "Bank Transfer",invoice: "INV-002" },
    { id: "3",  user: { name: "Carol White",   email: "carol@nexapanel.com", avatar: "CW" }, project: "API Integration",      amount: 1500,  status: "Unpaid",  dueDate: "Dec 20, 2024", invoice: "INV-003" },
    { id: "4",  user: { name: "David Lee",     email: "david@nexapanel.com", avatar: "DL" }, project: "Dashboard Analytics",  amount: 3600,  status: "Paid",    dueDate: "Dec 10, 2024", paidDate: "Dec 8, 2024",  method: "PayPal",      invoice: "INV-004" },
    { id: "5",  user: { name: "Eva Martinez",  email: "eva@nexapanel.com",   avatar: "EM" }, project: "Auth & Security",      amount: 2100,  status: "Overdue", dueDate: "Nov 30, 2024", invoice: "INV-005" },
    { id: "6",  user: { name: "Frank Chen",    email: "frank@nexapanel.com", avatar: "FC" }, project: "Email Campaign Tool",  amount: 950,   status: "Unpaid",  dueDate: "Dec 25, 2024", invoice: "INV-006" },
    { id: "7",  user: { name: "Grace Kim",     email: "grace@nexapanel.com", avatar: "GK" }, project: "Cloud Migration",      amount: 5800,  status: "Paid",    dueDate: "Dec 15, 2024", paidDate: "Dec 12, 2024", method: "Bank Transfer",invoice: "INV-007" },
    { id: "8",  user: { name: "Henry Brown",   email: "henry@nexapanel.com", avatar: "HB" }, project: "Customer Portal",      amount: 3200,  status: "Unpaid",  dueDate: "Jan 5, 2025",  invoice: "INV-008" },
    { id: "9",  user: { name: "Iris Taylor",   email: "iris@nexapanel.com",  avatar: "IT" }, project: "E-commerce Platform",  amount: 1800,  status: "Overdue", dueDate: "Nov 20, 2024", invoice: "INV-009" },
    { id: "10", user: { name: "Jack Wilson",   email: "jack@nexapanel.com",  avatar: "JW" }, project: "Mobile App Redesign",  amount: 2400,  status: "Paid",    dueDate: "Dec 18, 2024", paidDate: "Dec 16, 2024", method: "Credit Card", invoice: "INV-010" },
    { id: "11", user: { name: "Karen Davis",   email: "karen@nexapanel.com", avatar: "KD" }, project: "Dashboard Analytics",  amount: 4100,  status: "Paid",    dueDate: "Dec 22, 2024", paidDate: "Dec 20, 2024", method: "PayPal",      invoice: "INV-011" },
    { id: "12", user: { name: "Leo Anderson",  email: "leo@nexapanel.com",   avatar: "LA" }, project: "API Integration",      amount: 1200,  status: "Unpaid",  dueDate: "Jan 10, 2025", invoice: "INV-012" },
];

const statusConfig: Record<Exclude<PayStatus, "All">, { cls: string; icon: React.ReactNode; label: string }> = {
    Paid:    { cls: "pay-status-paid",    icon: <HiOutlineCheckCircle className="w-3.5 h-3.5" />,     label: "Paid"    },
    Unpaid:  { cls: "pay-status-unpaid",  icon: <HiOutlineClock className="w-3.5 h-3.5" />,           label: "Unpaid"  },
    Overdue: { cls: "pay-status-overdue", icon: <HiOutlineExclamationCircle className="w-3.5 h-3.5" />,label: "Overdue" },
};

const tabs: PayStatus[] = ["All", "Paid", "Unpaid", "Overdue"];

export default function PaymentsDetail() {
    const [search, setSearch]       = useState("");
    const [activeTab, setActiveTab] = useState<PayStatus>("All");

    const filtered = payments.filter((p) => {
        const matchSearch =
            p.user.name.toLowerCase().includes(search.toLowerCase()) ||
            p.project.toLowerCase().includes(search.toLowerCase()) ||
            p.invoice.toLowerCase().includes(search.toLowerCase());
        const matchTab = activeTab === "All" || p.status === activeTab;
        return matchSearch && matchTab;
    });

    const totalPaid    = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
    const totalUnpaid  = payments.filter((p) => p.status === "Unpaid").reduce((s, p) => s + p.amount, 0);
    const totalOverdue = payments.filter((p) => p.status === "Overdue").reduce((s, p) => s + p.amount, 0);

    const counts: Record<PayStatus, number> = {
        All:     payments.length,
        Paid:    payments.filter((p) => p.status === "Paid").length,
        Unpaid:  payments.filter((p) => p.status === "Unpaid").length,
        Overdue: payments.filter((p) => p.status === "Overdue").length,
    };

    return (
        <div className="dash-page p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Payments</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Track invoices and payment status
                    </p>
                </div>
                <button className="proj-new-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium">
                    <HiOutlineDownload className="w-4 h-4" />
                    Export
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat-card-green p-5 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                        <div className="stat-icon-green w-10 h-10 rounded-xl flex items-center justify-center">
                            <HiOutlineCheckCircle className="w-5 h-5" />
                        </div>
                        <span className="stat-change positive">+23%</span>
                    </div>
                    <p className="text-2xl font-bold text-white">${totalPaid.toLocaleString()}</p>
                    <p className="text-xs mt-1 font-medium" style={{ color: "var(--text-muted)" }}>Total Paid · {counts.Paid} invoices</p>
                </div>
                <div className="stat-card-orange p-5 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                        <div className="stat-icon-orange w-10 h-10 rounded-xl flex items-center justify-center">
                            <HiOutlineClock className="w-5 h-5" />
                        </div>
                        <span className="stat-change negative">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-white">${totalUnpaid.toLocaleString()}</p>
                    <p className="text-xs mt-1 font-medium" style={{ color: "var(--text-muted)" }}>Total Unpaid · {counts.Unpaid} invoices</p>
                </div>
                <div className="stat-card-violet p-5 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                        <div className="stat-icon-violet w-10 h-10 rounded-xl flex items-center justify-center">
                            <HiOutlineExclamationCircle className="w-5 h-5" />
                        </div>
                        <span className="stat-change negative">Overdue</span>
                    </div>
                    <p className="text-2xl font-bold text-white">${totalOverdue.toLocaleString()}</p>
                    <p className="text-xs mt-1 font-medium" style={{ color: "var(--text-muted)" }}>Total Overdue · {counts.Overdue} invoices</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="ac-search flex items-center gap-2 px-3 h-10 rounded-xl flex-1 max-w-sm">
                    <HiOutlineSearch className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
                    <input
                        type="text"
                        placeholder="Search by name, project, invoice..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent text-sm outline-none flex-1 placeholder:text-slate-500 text-slate-200"
                    />
                </div>
                <div className="flex items-center gap-1 proj-filter-bar p-1 rounded-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`proj-filter-tab px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${activeTab === tab ? "proj-filter-active" : ""}`}
                        >
                            {tab}
                            <span className="proj-count-badge">{counts[tab]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="panel-card rounded-2xl overflow-hidden">

                {/* Head */}
                <div className="proj-list-head grid gap-4 px-5 py-3" style={{ gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr auto" }}>
                    <span>User</span>
                    <span>Project</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span>Date</span>
                    <span></span>
                </div>

                {/* Rows */}
                {filtered.length === 0 ? (
                    <div className="px-5 py-16 text-center">
                        <HiOutlineCurrencyDollar className="w-10 h-10 mx-auto mb-2" style={{ color: "var(--text-faint)" }} />
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>No payments found</p>
                    </div>
                ) : (
                    filtered.map((p, i) => (
                        <div
                            key={p.id}
                            className={`proj-list-row grid gap-4 items-center px-5 py-4 ${i < filtered.length - 1 ? "proj-list-divider" : ""}`}
                            style={{ gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr auto" }}
                        >
                            {/* User */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="avatar-ring w-9 h-9 flex-shrink-0">
                                    <div className="avatar-inner">
                                        <span className="text-white text-xs font-bold">{p.user.avatar}</span>
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{p.user.name}</p>
                                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{p.user.email}</p>
                                </div>
                            </div>

                            {/* Project */}
                            <div className="min-w-0">
                                <p className="text-sm text-white truncate">{p.project}</p>
                                <p className="text-xs" style={{ color: "var(--text-faint)" }}>{p.invoice}</p>
                            </div>

                            {/* Amount */}
                            <div>
                                <p className="text-sm font-bold text-white">${p.amount.toLocaleString()}</p>
                                {p.method && <p className="text-xs" style={{ color: "var(--text-faint)" }}>{p.method}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <span className={`pay-status-badge flex items-center gap-1.5 w-fit ${statusConfig[p.status].cls}`}>
                                    {statusConfig[p.status].icon}
                                    {p.status}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                                <HiOutlineCalendar className="w-3.5 h-3.5 shrink-0" />
                                <div>
                                    <p className="text-xs">{p.paidDate ?? p.dueDate}</p>
                                    {!p.paidDate && <p className="text-xs" style={{ color: "var(--text-faint)" }}>Due</p>}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                                {p.status !== "Paid" && (
                                    <button className="pay-action-btn pay-action-remind flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium">
                                        <HiOutlineRefresh className="w-3 h-3" />
                                        Remind
                                    </button>
                                )}
                                <button className="proj-menu-btn p-1.5 rounded-lg">
                                    <HiOutlineDotsVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
