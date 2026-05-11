"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineArchive,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineDownload,
  HiOutlineExclamation,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlinePaperClip,
  HiOutlinePlus,
  HiOutlineReply,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineTicket,
  HiOutlineTrash,
  HiOutlineTrendingUp,
  HiOutlineUserGroup,
  HiOutlineX,
} from "react-icons/hi";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TicketType = "Technical Issue" | "Billing" | "Account Support" | "Product Inquiry" | "Feature Request" | "Complaint";
type Priority = "Critical" | "High" | "Medium" | "Low";
type TicketStatus = "Open" | "In Progress" | "Pending" | "Resolved" | "Closed" | "Escalated";

interface ThreadMessage {
  author: string;
  role: "customer" | "agent" | "internal";
  time: string;
  body: string;
}

interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  company: string;
  subject: string;
  type: TicketType;
  assignedAgent: string;
  priority: Priority;
  status: TicketStatus;
  createdDate: string;
  lastUpdate: string;
  slaStatus: string;
  satisfaction: number;
  attachments: string[];
  crmRecords: string[];
  internalNotes: string;
  resolutionHistory: string[];
  thread: ThreadMessage[];
}

const tickets: Ticket[] = [
  {
    id: "SUP-4801",
    customerName: "Maya Bennett",
    customerEmail: "maya.bennett@acme.com",
    company: "Acme Corp",
    subject: "SSO role mapping fails for procurement users",
    type: "Technical Issue",
    assignedAgent: "Priya Shah",
    priority: "Critical",
    status: "Escalated",
    createdDate: "May 11, 2026 08:10 AM",
    lastUpdate: "9m ago",
    slaStatus: "30m remaining",
    satisfaction: 68,
    attachments: ["SSO_Error_Log.txt", "Role_Map.csv"],
    crmRecords: ["Account: Acme Corp", "Deal: Enterprise rollout", "SLA: Platinum"],
    internalNotes: "Engineering has reproduced the role claim mismatch. Keep procurement and legal stakeholders updated.",
    resolutionHistory: ["Escalated to identity team", "Temporary role override applied", "Root cause analysis in progress"],
    thread: [
      { author: "Maya Bennett", role: "customer", time: "08:10 AM", body: "Several procurement users cannot access the approval workspace after SSO login." },
      { author: "Priya Shah", role: "agent", time: "08:16 AM", body: "We found the failed claim mapping and escalated this to our identity team." },
      { author: "Engineering", role: "internal", time: "08:44 AM", body: "Internal note: mismatch is isolated to procurement role aliases." },
    ],
  },
  {
    id: "SUP-4802",
    customerName: "Noah Sterling",
    customerEmail: "noah@cloudbase.io",
    company: "CloudBase",
    subject: "Implementation checklist export is missing milestones",
    type: "Product Inquiry",
    assignedAgent: "Emma Davis",
    priority: "Medium",
    status: "In Progress",
    createdDate: "May 11, 2026 07:35 AM",
    lastUpdate: "22m ago",
    slaStatus: "4h remaining",
    satisfaction: 91,
    attachments: ["Checklist_Screenshot.png"],
    crmRecords: ["Account: CloudBase", "Plan: Growth", "CS owner: Emma Davis"],
    internalNotes: "Customer expects export before onboarding kickoff. Product team confirmed this is a display setting.",
    resolutionHistory: ["Checklist settings reviewed", "Export configuration shared"],
    thread: [
      { author: "Noah Sterling", role: "customer", time: "07:35 AM", body: "The exported checklist does not show milestone owners." },
      { author: "Emma Davis", role: "agent", time: "07:42 AM", body: "I am checking the export configuration and will send the corrected version shortly." },
    ],
  },
  {
    id: "SUP-4803",
    customerName: "Finance Desk",
    customerEmail: "finance@orbitretail.com",
    company: "Orbit Retail",
    subject: "Invoice delivery address needs correction",
    type: "Billing",
    assignedAgent: "Amir Khan",
    priority: "Low",
    status: "Resolved",
    createdDate: "May 10, 2026 04:12 PM",
    lastUpdate: "1h ago",
    slaStatus: "Met",
    satisfaction: 96,
    attachments: ["Invoice_3941.pdf"],
    crmRecords: ["Account: Orbit Retail", "Billing profile: Updated"],
    internalNotes: "Billing mailbox verified and invoice resent.",
    resolutionHistory: ["Billing address corrected", "Invoice resent", "Customer confirmed receipt"],
    thread: [
      { author: "Finance Desk", role: "customer", time: "Yesterday", body: "Please use the updated billing mailbox for invoice delivery." },
      { author: "Amir Khan", role: "agent", time: "Yesterday", body: "Confirmed. The invoice has been resent to the updated mailbox." },
    ],
  },
  {
    id: "SUP-4804",
    customerName: "Liam Carter",
    customerEmail: "liam@globalent.com",
    company: "Global Enterprises",
    subject: "API timeout during pilot data sync",
    type: "Technical Issue",
    assignedAgent: "Priya Shah",
    priority: "High",
    status: "Open",
    createdDate: "May 10, 2026 03:18 PM",
    lastUpdate: "38m ago",
    slaStatus: "2h remaining",
    satisfaction: 72,
    attachments: ["Latency_Log.csv", "Incident_Summary.pdf"],
    crmRecords: ["Account: Global Enterprises", "Ticket cluster: API latency", "Pilot: Revenue intelligence"],
    internalNotes: "Executive visibility possible if latency remains unresolved today.",
    resolutionHistory: ["Logs collected", "Traffic spike identified"],
    thread: [
      { author: "Liam Carter", role: "customer", time: "03:18 PM", body: "The pilot sync is timing out during high-volume imports." },
      { author: "Priya Shah", role: "agent", time: "03:26 PM", body: "We are reviewing logs and will provide the next update inside the SLA window." },
    ],
  },
  {
    id: "SUP-4805",
    customerName: "Olivia Grant",
    customerEmail: "olivia@northstarbank.com",
    company: "Northstar Bank",
    subject: "Request for custom approval workflow",
    type: "Feature Request",
    assignedAgent: "Leon Meyer",
    priority: "Medium",
    status: "Pending",
    createdDate: "May 09, 2026 11:04 AM",
    lastUpdate: "Yesterday",
    slaStatus: "Waiting on product",
    satisfaction: 88,
    attachments: ["Workflow_Requirements.docx"],
    crmRecords: ["Account: Northstar Bank", "Opportunity: Workflow expansion"],
    internalNotes: "Feature request has expansion potential. Product needs to scope custom approvals.",
    resolutionHistory: ["Requirement captured", "Product review requested"],
    thread: [
      { author: "Olivia Grant", role: "customer", time: "May 09", body: "Can your workflow support separate executive and compliance approvals?" },
      { author: "Leon Meyer", role: "agent", time: "May 09", body: "We documented the requirement and are checking product feasibility." },
    ],
  },
  {
    id: "SUP-4806",
    customerName: "Ava Morris",
    customerEmail: "ava@nexatech.co",
    company: "NexaTech",
    subject: "Partner portal login complaint",
    type: "Complaint",
    assignedAgent: "Mike Chen",
    priority: "High",
    status: "Closed",
    createdDate: "May 08, 2026 02:20 PM",
    lastUpdate: "May 09, 2026",
    slaStatus: "Met",
    satisfaction: 82,
    attachments: [],
    crmRecords: ["Partner: NexaTech", "Portal access: Restored"],
    internalNotes: "Closed after partner admin access was restored and confirmed.",
    resolutionHistory: ["Admin role reset", "Partner confirmed access", "Ticket closed"],
    thread: [
      { author: "Ava Morris", role: "customer", time: "May 08", body: "Our partner admin cannot access co-sell opportunities." },
      { author: "Mike Chen", role: "agent", time: "May 08", body: "The partner admin role has been restored. Please confirm access." },
    ],
  },
];

const kpis = [
  { label: "Total Tickets", value: "8,942", description: "All support requests this quarter", trend: "+12.8% volume", progress: 84, icon: <HiOutlineTicket className="h-5 w-5" />, glow: "bg-blue-500/20" },
  { label: "Open Tickets", value: "286", description: "Awaiting support action", trend: "-34 vs yesterday", progress: 56, icon: <HiOutlineExclamation className="h-5 w-5" />, glow: "bg-red-500/20" },
  { label: "Resolved Tickets", value: "6,741", description: "Resolved with customer outcome", trend: "+18.1% resolved", progress: 78, icon: <HiOutlineCheckCircle className="h-5 w-5" />, glow: "bg-emerald-500/20" },
  { label: "Pending Tickets", value: "412", description: "Waiting on customer or product", trend: "-9.4% backlog", progress: 48, icon: <HiOutlineClock className="h-5 w-5" />, glow: "bg-amber-500/20" },
  { label: "Avg Response Time", value: "6m 24s", description: "Median first response", trend: "-42s faster", progress: 68, icon: <HiOutlineTrendingUp className="h-5 w-5" />, glow: "bg-purple-500/20" },
  { label: "Customer Satisfaction", value: "93.2%", description: "CSAT across closed tickets", trend: "+3.6 pts", progress: 93, icon: <HiOutlineSparkles className="h-5 w-5" />, glow: "bg-fuchsia-500/20" },
];

const statusStyle: Record<TicketStatus, string> = {
  Open: "from-blue-500/25 to-cyan-500/10 text-blue-200 border-blue-400/30",
  "In Progress": "from-blue-500/25 to-indigo-500/10 text-blue-200 border-blue-400/30",
  Pending: "from-yellow-500/25 to-amber-500/10 text-yellow-200 border-yellow-400/30",
  Resolved: "from-emerald-500/25 to-green-500/10 text-emerald-200 border-emerald-400/30",
  Closed: "from-slate-500/25 to-slate-600/10 text-slate-300 border-slate-400/25",
  Escalated: "from-red-500/25 to-rose-500/10 text-red-200 border-red-400/30",
};

const priorityStyle: Record<Priority, string> = {
  Critical: "from-red-600/30 to-red-500/10 text-red-200 border-red-400/40",
  High: "from-orange-500/30 to-red-500/10 text-orange-200 border-orange-400/35",
  Medium: "from-yellow-500/30 to-amber-500/10 text-yellow-200 border-yellow-400/35",
  Low: "from-emerald-500/25 to-green-500/10 text-emerald-200 border-emerald-400/30",
};

const volumeData = [
  { day: "Mon", tickets: 184, resolution: 7.2, csat: 89, sla: 94 },
  { day: "Tue", tickets: 221, resolution: 6.8, csat: 91, sla: 95 },
  { day: "Wed", tickets: 246, resolution: 6.1, csat: 93, sla: 96 },
  { day: "Thu", tickets: 238, resolution: 5.7, csat: 94, sla: 97 },
  { day: "Fri", tickets: 274, resolution: 5.3, csat: 95, sla: 98 },
  { day: "Sat", tickets: 128, resolution: 8.4, csat: 88, sla: 91 },
  { day: "Sun", tickets: 106, resolution: 9.1, csat: 86, sla: 90 },
];

const agentData = [
  { name: "Priya", resolved: 142, open: 31 },
  { name: "Emma", resolved: 118, open: 18 },
  { name: "Amir", resolved: 96, open: 12 },
  { name: "Leon", resolved: 88, open: 21 },
  { name: "Mike", resolved: 74, open: 14 },
];

const categoryData = [
  { name: "Technical", value: 38, fill: "#3b82f6" },
  { name: "Billing", value: 18, fill: "#10b981" },
  { name: "Account", value: 14, fill: "#8b5cf6" },
  { name: "Inquiry", value: 12, fill: "#f59e0b" },
  { name: "Feature", value: 10, fill: "#06b6d4" },
  { name: "Complaint", value: 8, fill: "#ef4444" },
];

const sidePanels = [
  { title: "Pending Tickets", items: ["412 tickets pending", "72 waiting on customer", "44 waiting on product"] },
  { title: "Escalation Alerts", items: ["Acme SSO mapping critical", "Global API timeout high risk", "3 platinum accounts escalated"] },
  { title: "Recently Updated Tickets", items: ["CloudBase export updated", "Orbit invoice resolved", "Northstar request moved to product"] },
  { title: "Agent Availability", items: ["Priya online", "Emma online", "Leon in review queue"] },
  { title: "SLA Warnings", items: ["5 tickets due within 1 hour", "1 critical SLA at risk", "Platinum queue at 94% compliance"] },
];

const featureCards = [
  { title: "Ticket assignment", icon: <HiOutlineUserGroup className="h-5 w-5" /> },
  { title: "SLA tracking", icon: <HiOutlineClock className="h-5 w-5" /> },
  { title: "Internal team notes", icon: <HiOutlineDocumentText className="h-5 w-5" /> },
  { title: "Conversation history", icon: <HiOutlineReply className="h-5 w-5" /> },
  { title: "Attachment support", icon: <HiOutlinePaperClip className="h-5 w-5" /> },
  { title: "Escalation workflow", icon: <HiOutlineExclamation className="h-5 w-5" /> },
  { title: "CRM-linked customer history", icon: <HiOutlineTag className="h-5 w-5" /> },
  { title: "Auto ticket routing", icon: <HiOutlineSparkles className="h-5 w-5" /> },
];

function ChartTip({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number | string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-xs text-white shadow-2xl">
      {label && <p className="mb-1 text-slate-400">{label}</p>}
      {payload.map((item) => <p key={item.name} style={{ color: item.color }}>{item.name}: {item.value}</p>)}
    </div>
  );
}

function KpiCard({ label, value, description, trend, progress, icon, glow }: {
  label: string;
  value: string;
  description: string;
  trend: string;
  progress: number;
  icon: ReactNode;
  glow: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/40">
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl ${glow}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
          <div className="mt-4 h-1.5 rounded-full bg-slate-800">
            <div className="h-1.5 rounded-full bg-linear-to-r from-blue-500 to-purple-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-3 text-xs font-semibold text-emerald-300">{trend}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function SupportDetail() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(tickets[0]);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [agentFilter, setAgentFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState("");

  const agents = useMemo(() => Array.from(new Set(tickets.map((ticket) => ticket.assignedAgent))), []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;
    const matchesType = typeFilter === "All" || ticket.type === typeFilter;
    const matchesAgent = agentFilter === "All" || ticket.assignedAgent === agentFilter;
    const matchesDate = !dateRange || ticket.createdDate.toLowerCase().includes(dateRange.toLowerCase()) || ticket.lastUpdate.toLowerCase().includes(dateRange.toLowerCase());
    return matchesStatus && matchesPriority && matchesType && matchesAgent && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#06101f] text-slate-100">
      <div className="space-y-6 p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/50 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Helpdesk operations live
              </div>
              <h1 className="text-4xl font-bold text-white">Support Tickets</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">Manage customer issues, support requests, resolutions, and service workflows.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowTicketModal(true)} className="crm-btn crm-btn-primary"><HiOutlinePlus className="h-4 w-4" />Create Ticket</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineUserGroup className="h-4 w-4" />Assign Ticket</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineFilter className="h-4 w-4" />Filter</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineDownload className="h-4 w-4" />Export</button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/30 backdrop-blur">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <HiOutlineFilter className="h-4 w-4 text-blue-300" />
            Filters
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {Object.keys(statusStyle).map((status) => <option key={status}>{status}</option>)}
            </select>
            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {["Technical Issue", "Billing", "Account Support", "Product Inquiry", "Feature Request", "Complaint"].map((type) => <option key={type}>{type}</option>)}
            </select>
            <select value={agentFilter} onChange={(event) => setAgentFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {agents.map((agent) => <option key={agent}>{agent}</option>)}
            </select>
            <input value={dateRange} onChange={(event) => setDateRange(event.target.value)} placeholder="Date range: May 11" className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400/60" />
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/50 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Support Ticket Queue</h2>
                <p className="text-sm text-slate-500">Priority, ownership, SLA state, customer context, and resolution controls.</p>
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">{filteredTickets.length} tickets</span>
            </div>
            <div className="max-h-[620px] overflow-auto rounded-2xl border border-white/10 crm-scrollbar">
              <table className="min-w-[1480px] w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur">
                  <tr className="text-left text-xs uppercase text-slate-500">
                    {["Ticket ID", "Customer Name", "Subject", "Ticket Type", "Assigned Agent", "Priority", "Status", "Created Date", "Last Update", "Actions"].map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-14 text-center text-sm text-slate-500">No tickets match the current filters.</td>
                    </tr>
                  )}
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="cursor-pointer border-t border-white/10 transition hover:bg-blue-500/[0.06]">
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-white">{ticket.id}</p>
                        <p className="text-xs text-slate-500">SLA: {ticket.slaStatus}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-white">{ticket.customerName}</p>
                        <p className="text-xs text-slate-500">{ticket.company}</p>
                      </td>
                      <td className="px-4 py-4"><p className="max-w-sm truncate text-sm text-slate-300">{ticket.subject}</p></td>
                      <td className="px-4 py-4"><span className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-200">{ticket.type}</span></td>
                      <td className="px-4 py-4 text-sm text-slate-300">{ticket.assignedAgent}</td>
                      <td className="px-4 py-4"><span className={`rounded-lg border bg-linear-to-r px-2.5 py-1 text-xs font-semibold ${priorityStyle[ticket.priority]}`}>{ticket.priority}</span></td>
                      <td className="px-4 py-4"><span className={`rounded-lg border bg-linear-to-r px-2.5 py-1 text-xs font-semibold ${statusStyle[ticket.status]}`}>{ticket.status}</span></td>
                      <td className="px-4 py-4 text-sm text-slate-400">{ticket.createdDate}</td>
                      <td className="px-4 py-4 text-sm text-slate-400">{ticket.lastUpdate}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {[
                            { title: "View", icon: <HiOutlineEye className="h-4 w-4" /> },
                            { title: "Assign", icon: <HiOutlineUserGroup className="h-4 w-4" /> },
                            { title: "Reply", icon: <HiOutlineReply className="h-4 w-4" /> },
                            { title: "Resolve", icon: <HiOutlineCheckCircle className="h-4 w-4" /> },
                            { title: "Close", icon: <HiOutlineArchive className="h-4 w-4" /> },
                            { title: "Delete", icon: <HiOutlineTrash className="h-4 w-4" /> },
                          ].map((action) => (
                            <button key={action.title} onClick={(event) => event.stopPropagation()} title={action.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-400 transition hover:border-blue-400/40 hover:text-white">
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div>
              <h2 className="text-lg font-bold text-white">Activity Panel</h2>
              <p className="text-sm text-slate-500">Ticket health, escalations, agent status, and SLA warnings.</p>
            </div>
            {sidePanels.map((panel) => (
              <div key={panel.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-400/40">
                <h3 className="text-sm font-bold text-white">{panel.title}</h3>
                <div className="mt-3 space-y-2">
                  {panel.items.map((item) => (
                    <div key={item} className="flex gap-2 text-xs text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </aside>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">Ticket Detail Drawer</h2>
                <p className="text-sm text-slate-500">Customer details, conversation history, SLA, notes, CRM links, and resolution history.</p>
              </div>
              <button onClick={() => setShowTicketModal(true)} className="crm-btn crm-btn-secondary"><HiOutlinePlus className="h-4 w-4" />Create</button>
            </div>
            {selectedTicket && (
              <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-blue-300">Ticket Information</p>
                    <h3 className="mt-2 text-xl font-bold text-white">{selectedTicket.subject}</h3>
                    <p className="mt-1 text-sm text-slate-400">{selectedTicket.id} - {selectedTicket.type}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`rounded-lg border bg-linear-to-r px-2.5 py-1 text-xs font-semibold ${priorityStyle[selectedTicket.priority]}`}>{selectedTicket.priority}</span>
                      <span className={`rounded-lg border bg-linear-to-r px-2.5 py-1 text-xs font-semibold ${statusStyle[selectedTicket.status]}`}>{selectedTicket.status}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Customer Details</p>
                    <p className="mt-2 text-sm font-semibold text-white">{selectedTicket.customerName}</p>
                    <p className="text-xs text-slate-400">{selectedTicket.customerEmail}</p>
                    <p className="mt-1 text-xs text-slate-500">{selectedTicket.company}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">SLA Status</p>
                    <p className="mt-2 text-2xl font-bold text-white">{selectedTicket.slaStatus}</p>
                    <p className="mt-1 text-xs text-slate-500">{selectedTicket.satisfaction}% customer satisfaction signal</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Internal Notes</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{selectedTicket.internalNotes}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <h3 className="text-sm font-bold text-white">Full Conversation Thread</h3>
                    <div className="mt-4 space-y-3">
                      {selectedTicket.thread.map((message) => (
                        <div key={`${message.author}-${message.time}`} className={`rounded-2xl border px-4 py-3 ${message.role === "agent" ? "border-blue-400/30 bg-blue-500/15" : message.role === "internal" ? "border-purple-400/30 bg-purple-500/15" : "border-white/10 bg-white/[0.04]"}`}>
                          <div className="mb-1 flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold text-white">{message.author}</p>
                            <p className="text-[11px] text-slate-500">{message.time}</p>
                          </div>
                          <p className="text-sm leading-6 text-slate-300">{message.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><HiOutlinePaperClip className="h-4 w-4" />Attachments</h3>
                      <p className="text-xs text-slate-400">{selectedTicket.attachments.length ? selectedTicket.attachments.join(", ") : "No attachments"}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white"><HiOutlineTag className="h-4 w-4" />Related CRM Records</h3>
                      <p className="text-xs text-slate-400">{selectedTicket.crmRecords.join(", ")}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-sm font-bold text-white">Resolution History</h3>
                    <div className="mt-3 space-y-3">
                      {selectedTicket.resolutionHistory.map((item) => (
                        <div key={item} className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                          <div>
                            <p className="text-sm font-semibold text-white">{item}</p>
                            <p className="text-xs text-slate-500">Support workflow activity</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Activity Timeline</h3>
            {["Ticket created", "Agent assigned", "SLA timer started", "Customer update sent", "CRM record linked"].map((item) => (
              <div key={item} className="mb-3 flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                <div>
                  <p className="text-sm font-semibold text-white">{item}</p>
                  <p className="text-xs text-slate-500">Automated support activity log</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-blue-950/20 p-4 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-purple-400/40">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-blue-200">{feature.icon}</div>
              <p className="text-sm font-semibold text-white">{feature.title}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 xl:col-span-2">
            <h3 className="mb-4 text-base font-bold text-white">Ticket Volume Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="ticketVolumeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="tickets" name="Tickets" stroke="#3b82f6" fill="url(#ticketVolumeFill)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="sla" name="SLA Compliance" stroke="#a855f7" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Agent Performance</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={agentData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="open" name="Open" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Ticket Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip content={<ChartTip />} />
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={4}>
                  {categoryData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Resolution Time Chart</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={volumeData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="resolution" name="Resolution Hours" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Customer Satisfaction Graph</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={volumeData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="csat" name="CSAT" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">SLA Compliance Metrics</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={volumeData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="sla" name="SLA Compliance" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-blue-950/40">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Create Ticket</h2>
                <p className="text-xs text-slate-500">Open a CRM-linked customer support request.</p>
              </div>
              <button onClick={() => setShowTicketModal(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><HiOutlineX className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Customer name or account" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <input placeholder="Ticket subject" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <select className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60">
                <option>Technical Issue</option>
                <option>Billing</option>
                <option>Account Support</option>
                <option>Product Inquiry</option>
                <option>Feature Request</option>
                <option>Complaint</option>
              </select>
              <textarea placeholder="Describe the customer issue..." rows={5} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 text-slate-400">
                  <button title="Attach file" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlinePaperClip className="h-4 w-4" /></button>
                  <button title="Internal note" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineDocumentText className="h-4 w-4" /></button>
                  <button title="CRM link" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineTag className="h-4 w-4" /></button>
                </div>
                <button onClick={() => setShowTicketModal(false)} className="crm-btn crm-btn-primary"><HiOutlineSparkles className="h-4 w-4" />Create Ticket</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowTicketModal(true)} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-950/50 transition hover:-translate-y-1" title="Create Ticket">
        <HiOutlinePlus className="h-6 w-6" />
      </button>
    </div>
  );
}
