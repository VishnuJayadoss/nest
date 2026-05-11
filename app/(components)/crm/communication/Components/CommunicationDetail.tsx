"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineAnnotation,
  HiOutlineArchive,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
  HiOutlineClock,
  HiOutlineDownload,
  HiOutlineEmojiHappy,
  HiOutlineFilter,
  HiOutlineMicrophone,
  HiOutlinePaperClip,
  HiOutlinePlus,
  HiOutlineReply,
  HiOutlineSparkles,
  HiOutlineStatusOnline,
  HiOutlineTag,
  HiOutlineTrash,
  HiOutlineUserGroup,
  HiOutlineX,
} from "react-icons/hi";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChannelType = "WhatsApp" | "Live Chat" | "SMS" | "Internal Chat" | "Client Chat" | "Social Media";
type ConversationStatus = "Active" | "Pending" | "Resolved" | "Closed" | "Escalated";
type Priority = "High" | "Medium" | "Low";

interface Message {
  author: string;
  role: "customer" | "agent" | "internal";
  time: string;
  text: string;
  receipt?: string;
  reaction?: string;
}

interface Conversation {
  id: string;
  contact: string;
  contactRole: string;
  company: string;
  channel: ChannelType;
  assignedEmployee: string;
  lastMessage: string;
  lastActivity: string;
  status: ConversationStatus;
  priority: Priority;
  unread: number;
  satisfaction: number;
  attachments: string[];
  voiceNotes: string[];
  crmRecords: string[];
  internalNotes: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "CNV-7401",
    contact: "Maya Bennett",
    contactRole: "Procurement Director",
    company: "Acme Corp",
    channel: "WhatsApp",
    assignedEmployee: "Sarah Johnson",
    lastMessage: "Can you confirm the rollout timeline before legal signs off?",
    lastActivity: "2m ago",
    status: "Active",
    priority: "High",
    unread: 3,
    satisfaction: 94,
    attachments: ["Security_Addendum.pdf", "Rollout_Timeline.xlsx"],
    voiceNotes: ["Procurement clarification - 0:42"],
    crmRecords: ["Deal: Enterprise rollout", "Stage: Procurement", "ARR: $186K"],
    internalNotes: "Legal is ready. Sarah needs to confirm the phased deployment window.",
    messages: [
      { author: "Maya Bennett", role: "customer", time: "09:38 AM", text: "Can you confirm the rollout timeline before legal signs off?", receipt: "Unread" },
      { author: "Sarah Johnson", role: "agent", time: "09:40 AM", text: "Yes. We can support phase one from June 3 and phase two from June 17.", receipt: "Seen" },
      { author: "Revenue Ops", role: "internal", time: "09:41 AM", text: "Internal note: include security addendum link in the next reply.", reaction: "+2 reactions" },
    ],
  },
  {
    id: "CNV-7402",
    contact: "Noah Sterling",
    contactRole: "COO",
    company: "CloudBase",
    channel: "Live Chat",
    assignedEmployee: "Emma Davis",
    lastMessage: "Thanks, this implementation plan answers our main questions.",
    lastActivity: "12m ago",
    status: "Resolved",
    priority: "Medium",
    unread: 0,
    satisfaction: 98,
    attachments: ["Implementation_Plan.xlsx"],
    voiceNotes: [],
    crmRecords: ["Account: Expansion", "Health: Green"],
    internalNotes: "Customer is ready for onboarding kickoff.",
    messages: [
      { author: "Noah Sterling", role: "customer", time: "08:56 AM", text: "Can you send the workflow map from the demo?", receipt: "Seen" },
      { author: "Emma Davis", role: "agent", time: "08:58 AM", text: "Attached the plan and mapped owners for each milestone.", receipt: "Delivered" },
      { author: "Noah Sterling", role: "customer", time: "09:04 AM", text: "Thanks, this implementation plan answers our main questions.", reaction: "+1 reaction" },
    ],
  },
  {
    id: "CNV-7403",
    contact: "Liam Carter",
    contactRole: "VP Engineering",
    company: "Global Enterprises",
    channel: "Client Chat",
    assignedEmployee: "Priya Shah",
    lastMessage: "We still see intermittent API latency in the pilot environment.",
    lastActivity: "18m ago",
    status: "Escalated",
    priority: "High",
    unread: 5,
    satisfaction: 62,
    attachments: ["Incident_Summary.pdf", "Latency_Log.csv"],
    voiceNotes: ["Engineering escalation - 1:14"],
    crmRecords: ["Ticket: API timeout", "SLA: At risk", "Segment: Enterprise"],
    internalNotes: "Engineering owner is required before the next customer update.",
    messages: [
      { author: "Liam Carter", role: "customer", time: "08:17 AM", text: "We still see intermittent API latency in the pilot environment.", receipt: "Unread" },
      { author: "Priya Shah", role: "agent", time: "08:19 AM", text: "I escalated this to engineering and will send the next update inside 30 minutes.", receipt: "Delivered" },
      { author: "Support Lead", role: "internal", time: "08:20 AM", text: "Internal note: attach latest latency log and keep the executive channel warm.", reaction: "+4 reactions" },
    ],
  },
  {
    id: "CNV-7404",
    contact: "Ava Morris",
    contactRole: "Partner Lead",
    company: "NexaTech",
    channel: "Internal Chat",
    assignedEmployee: "Mike Chen",
    lastMessage: "Partner co-sell owner confirmed for finance vertical.",
    lastActivity: "41m ago",
    status: "Pending",
    priority: "Medium",
    unread: 1,
    satisfaction: 86,
    attachments: ["Partner_Rules.docx"],
    voiceNotes: [],
    crmRecords: ["Partner", "Co-sell", "Finance"],
    internalNotes: "Waiting on final territory split from partner operations.",
    messages: [
      { author: "Mike Chen", role: "agent", time: "07:45 AM", text: "Partner co-sell owner confirmed for finance vertical.", receipt: "Seen" },
      { author: "Ava Morris", role: "customer", time: "07:49 AM", text: "Great. Send the territory split once partner ops approves.", receipt: "Seen" },
    ],
  },
  {
    id: "CNV-7405",
    contact: "Olivia Grant",
    contactRole: "SVP Revenue",
    company: "Northstar Bank",
    channel: "Social Media",
    assignedEmployee: "Nina Patel",
    lastMessage: "The executive webinar topic is relevant for our revenue team.",
    lastActivity: "1h ago",
    status: "Active",
    priority: "Low",
    unread: 2,
    satisfaction: 91,
    attachments: [],
    voiceNotes: [],
    crmRecords: ["Campaign: Exec Webinar", "Segment: Banking"],
    internalNotes: "Marketing qualified conversation. Route to sales if the webinar reply includes budget timing.",
    messages: [
      { author: "Olivia Grant", role: "customer", time: "07:12 AM", text: "The executive webinar topic is relevant for our revenue team.", receipt: "Unread" },
      { author: "Nina Patel", role: "agent", time: "07:15 AM", text: "I can reserve two seats and send the private roundtable details.", receipt: "Delivered" },
    ],
  },
  {
    id: "CNV-7406",
    contact: "Finance Desk",
    contactRole: "Billing Team",
    company: "Orbit Retail",
    channel: "SMS",
    assignedEmployee: "Amir Khan",
    lastMessage: "Please use the updated billing mailbox for invoice delivery.",
    lastActivity: "Yesterday",
    status: "Closed",
    priority: "Low",
    unread: 0,
    satisfaction: 88,
    attachments: ["Invoice_3941.pdf"],
    voiceNotes: [],
    crmRecords: ["Billing", "Invoice support"],
    internalNotes: "Closed after finance mailbox was corrected.",
    messages: [
      { author: "Finance Desk", role: "customer", time: "Yesterday", text: "Please use the updated billing mailbox for invoice delivery.", receipt: "Seen" },
      { author: "Amir Khan", role: "agent", time: "Yesterday", text: "Confirmed. The invoice was resent and linked to the billing record.", receipt: "Seen" },
    ],
  },
];

const kpis = [
  { label: "Total Conversations", value: "9,842", description: "Unified inbox threads this quarter", trend: "+18.6% volume", progress: 86, icon: <HiOutlineChatAlt2 className="h-5 w-5" />, glow: "bg-blue-500/20" },
  { label: "Active Chats", value: "284", description: "Live conversations in motion", trend: "+31 today", progress: 72, icon: <HiOutlineStatusOnline className="h-5 w-5" />, glow: "bg-cyan-500/20" },
  { label: "Unread Messages", value: "1,126", description: "Awaiting team review", trend: "-14.2% backlog", progress: 48, icon: <HiOutlineAnnotation className="h-5 w-5" />, glow: "bg-amber-500/20" },
  { label: "Response Rate", value: "96.4%", description: "Within SLA across channels", trend: "+2.8 pts", progress: 96, icon: <HiOutlineReply className="h-5 w-5" />, glow: "bg-emerald-500/20" },
  { label: "Avg Response Time", value: "4m 18s", description: "Median first response", trend: "-38s faster", progress: 68, icon: <HiOutlineClock className="h-5 w-5" />, glow: "bg-purple-500/20" },
  { label: "Resolved Conversations", value: "6,318", description: "Closed with customer outcome", trend: "+11.9% resolved", progress: 79, icon: <HiOutlineSparkles className="h-5 w-5" />, glow: "bg-fuchsia-500/20" },
];

const statusStyle: Record<ConversationStatus, string> = {
  Active: "from-blue-500/25 to-cyan-500/10 text-blue-200 border-blue-400/30",
  Pending: "from-yellow-500/25 to-amber-500/10 text-yellow-200 border-yellow-400/30",
  Resolved: "from-emerald-500/25 to-green-500/10 text-emerald-200 border-emerald-400/30",
  Closed: "from-slate-500/25 to-slate-600/10 text-slate-300 border-slate-400/25",
  Escalated: "from-red-500/25 to-rose-500/10 text-red-200 border-red-400/30",
};

const priorityStyle: Record<Priority, string> = {
  High: "bg-red-500/15 text-red-300 border-red-500/30",
  Medium: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Low: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const responseData = [
  { day: "Mon", response: 6.2, resolution: 72, volume: 760, csat: 86 },
  { day: "Tue", response: 5.4, resolution: 76, volume: 830, csat: 88 },
  { day: "Wed", response: 4.9, resolution: 81, volume: 910, csat: 91 },
  { day: "Thu", response: 4.3, resolution: 84, volume: 870, csat: 90 },
  { day: "Fri", response: 4.1, resolution: 88, volume: 940, csat: 93 },
  { day: "Sat", response: 7.8, resolution: 69, volume: 420, csat: 84 },
  { day: "Sun", response: 8.4, resolution: 66, volume: 370, csat: 82 },
];

const teamData = [
  { name: "Sarah", active: 34, resolved: 126 },
  { name: "Emma", active: 28, resolved: 118 },
  { name: "Priya", active: 41, resolved: 104 },
  { name: "Mike", active: 19, resolved: 92 },
  { name: "Nina", active: 25, resolved: 88 },
];

const sidePanels = [
  { title: "Active Conversations", items: ["284 live threads", "37 enterprise accounts online", "18 channels updating now"] },
  { title: "Pending Replies", items: ["112 customer replies due", "24 high-priority waits", "8 idle beyond SLA"] },
  { title: "Team Online Status", items: ["Sarah online", "Emma online", "Priya in escalation queue"] },
  { title: "Recent Activities", items: ["Acme asked rollout question", "CloudBase marked resolved", "Northstar engaged from social"] },
  { title: "Escalation Alerts", items: ["Global API latency needs owner", "3 support chats nearing SLA", "1 executive thread active"] },
];

const featureCards = [
  { title: "Unified inbox", icon: <HiOutlineChatAlt2 className="h-5 w-5" /> },
  { title: "Multi-channel messaging", icon: <HiOutlineAnnotation className="h-5 w-5" /> },
  { title: "Internal team chat", icon: <HiOutlineUserGroup className="h-5 w-5" /> },
  { title: "Conversation tagging", icon: <HiOutlineTag className="h-5 w-5" /> },
  { title: "Auto assignment", icon: <HiOutlineSparkles className="h-5 w-5" /> },
  { title: "Chat history", icon: <HiOutlineClock className="h-5 w-5" /> },
  { title: "CRM linked conversations", icon: <HiOutlineStatusOnline className="h-5 w-5" /> },
  { title: "Real-time updates", icon: <HiOutlineChartBar className="h-5 w-5" /> },
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

export default function CommunicationDetail() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [showChat, setShowChat] = useState(false);
  const [channelFilter, setChannelFilter] = useState<string>("All");
  const [employeeFilter, setEmployeeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState("");

  const employees = useMemo(() => Array.from(new Set(conversations.map((conversation) => conversation.assignedEmployee))), []);

  const filteredConversations = conversations.filter((conversation) => {
    const matchesChannel = channelFilter === "All" || conversation.channel === channelFilter;
    const matchesEmployee = employeeFilter === "All" || conversation.assignedEmployee === employeeFilter;
    const matchesStatus = statusFilter === "All" || conversation.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || conversation.priority === priorityFilter;
    const matchesDate = !dateRange || conversation.lastActivity.toLowerCase().includes(dateRange.toLowerCase());
    return matchesChannel && matchesEmployee && matchesStatus && matchesPriority && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#06101f] text-slate-100">
      <div className="space-y-6 p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/50 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Real-time collaboration hub
              </div>
              <h1 className="text-4xl font-bold text-white">Communication Center</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">Manage conversations, team collaboration, client interactions, and communication channels.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowChat(true)} className="crm-btn crm-btn-primary"><HiOutlinePlus className="h-4 w-4" />New Conversation</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineUserGroup className="h-4 w-4" />Create Channel</button>
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
            <select value={channelFilter} onChange={(event) => setChannelFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {["WhatsApp", "Live Chat", "SMS", "Internal Chat", "Client Chat", "Social Media"].map((channel) => <option key={channel}>{channel}</option>)}
            </select>
            <select value={employeeFilter} onChange={(event) => setEmployeeFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {employees.map((employee) => <option key={employee}>{employee}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {Object.keys(statusStyle).map((status) => <option key={status}>{status}</option>)}
            </select>
            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input value={dateRange} onChange={(event) => setDateRange(event.target.value)} placeholder="Date range: 2m ago" className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400/60" />
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/50 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Unified Conversations</h2>
                <p className="text-sm text-slate-500">Live channel ownership, last message, SLA posture, priority, and quick actions.</p>
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">{filteredConversations.length} conversations</span>
            </div>
            <div className="max-h-[620px] overflow-auto rounded-2xl border border-white/10 crm-scrollbar">
              <table className="min-w-[1320px] w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur">
                  <tr className="text-left text-xs uppercase text-slate-500">
                    {["Conversation ID", "Contact/Customer", "Channel Type", "Assigned Employee", "Last Message", "Last Activity", "Status", "Priority", "Actions"].map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredConversations.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-14 text-center text-sm text-slate-500">No conversations match the current filters.</td>
                    </tr>
                  )}
                  {filteredConversations.map((conversation) => (
                    <tr key={conversation.id} onClick={() => setSelectedConversation(conversation)} className="cursor-pointer border-t border-white/10 transition hover:bg-blue-500/[0.06]">
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-white">{conversation.id}</p>
                        <p className="text-xs text-slate-500">{conversation.unread} unread</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-white">{conversation.contact}</p>
                        <p className="text-xs text-slate-500">{conversation.company} - {conversation.contactRole}</p>
                      </td>
                      <td className="px-4 py-4"><span className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-200">{conversation.channel}</span></td>
                      <td className="px-4 py-4 text-sm text-slate-300">{conversation.assignedEmployee}</td>
                      <td className="px-4 py-4"><p className="max-w-sm truncate text-sm text-slate-300">{conversation.lastMessage}</p></td>
                      <td className="px-4 py-4 text-sm text-slate-400">{conversation.lastActivity}</td>
                      <td className="px-4 py-4"><span className={`rounded-lg border bg-linear-to-r px-2.5 py-1 text-xs font-semibold ${statusStyle[conversation.status]}`}>{conversation.status}</span></td>
                      <td className="px-4 py-4"><span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${priorityStyle[conversation.priority]}`}>{conversation.priority}</span></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {[
                            { title: "Open Chat", icon: <HiOutlineChatAlt2 className="h-4 w-4" /> },
                            { title: "Assign", icon: <HiOutlineUserGroup className="h-4 w-4" /> },
                            { title: "Reply", icon: <HiOutlineReply className="h-4 w-4" /> },
                            { title: "Archive", icon: <HiOutlineArchive className="h-4 w-4" /> },
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
              <p className="text-sm text-slate-500">Live workload, online teammates, recent activity, and escalation signals.</p>
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
                <h2 className="text-lg font-bold text-white">Conversation Detail Panel</h2>
                <p className="text-sm text-slate-500">Customer information, chat messages, attachments, voice notes, CRM links, and status.</p>
              </div>
              <button onClick={() => setShowChat(true)} className="crm-btn crm-btn-secondary"><HiOutlineChatAlt2 className="h-4 w-4" />Open</button>
            </div>
            {selectedConversation && (
              <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-blue-300">Customer Information</p>
                    <h3 className="mt-2 text-xl font-bold text-white">{selectedConversation.contact}</h3>
                    <p className="text-sm text-slate-400">{selectedConversation.contactRole}</p>
                    <p className="mt-1 text-sm text-slate-500">{selectedConversation.company}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Conversation Status</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`rounded-lg border bg-linear-to-r px-2.5 py-1 text-xs font-semibold ${statusStyle[selectedConversation.status]}`}>{selectedConversation.status}</span>
                      <span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${priorityStyle[selectedConversation.priority]}`}>{selectedConversation.priority}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Related CRM Records</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedConversation.crmRecords.map((record) => <span key={record} className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-200">{record}</span>)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Internal Notes</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{selectedConversation.internalNotes}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{selectedConversation.channel}</p>
                      <p className="text-xs text-emerald-300">Typing indicator active - read receipts enabled</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">{selectedConversation.satisfaction}% CSAT</span>
                  </div>
                  <div className="space-y-3">
                    {selectedConversation.messages.map((message) => (
                      <div key={`${message.author}-${message.time}`} className={`flex ${message.role === "agent" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[78%] rounded-2xl border px-4 py-3 ${message.role === "agent" ? "border-blue-400/30 bg-blue-500/15" : message.role === "internal" ? "border-purple-400/30 bg-purple-500/15" : "border-white/10 bg-white/[0.05]"}`}>
                          <div className="mb-1 flex items-center justify-between gap-4">
                            <p className="text-xs font-semibold text-white">{message.author}</p>
                            <p className="text-[11px] text-slate-500">{message.time}</p>
                          </div>
                          <p className="text-sm leading-6 text-slate-300">{message.text}</p>
                          <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                            {message.receipt && <span>{message.receipt}</span>}
                            {message.reaction && <span>{message.reaction}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                      Customer typing...
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-white"><HiOutlinePaperClip className="h-4 w-4" />Attachments</p>
                      <p className="text-xs text-slate-400">{selectedConversation.attachments.length ? selectedConversation.attachments.join(", ") : "No files attached"}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-white"><HiOutlineMicrophone className="h-4 w-4" />Voice Notes</p>
                      <p className="text-xs text-slate-400">{selectedConversation.voiceNotes.length ? selectedConversation.voiceNotes.join(", ") : "No voice notes"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
              <h3 className="mb-4 text-base font-bold text-white">Activity Timeline</h3>
              {["Conversation opened", "Auto assignment completed", "CRM record linked", "Read receipt captured"].map((item) => (
                <div key={item} className="mb-3 flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item}</p>
                    <p className="text-xs text-slate-500">Real-time communication log</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
              <h3 className="mb-4 text-base font-bold text-white">Chat UI Capabilities</h3>
              <div className="grid gap-2">
                {["Message bubbles", "Typing indicators", "Read receipts", "Emoji reactions", "File uploads", "Voice message support"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    <HiOutlineEmojiHappy className="h-4 w-4 text-blue-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
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
            <h3 className="mb-4 text-base font-bold text-white">Response Time Chart</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={responseData}>
                <defs>
                  <linearGradient id="responseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="response" name="Avg Response Time" stroke="#3b82f6" fill="url(#responseFill)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="csat" name="Customer Satisfaction" stroke="#a855f7" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Message Volume Analytics</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={responseData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="volume" name="Messages" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Resolution Rate Graph</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={responseData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="resolution" name="Resolution Rate" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
          <h3 className="mb-4 text-base font-bold text-white">Team Communication Metrics</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={teamData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="active" name="Active Chats" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>

      {showChat && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-blue-950/40">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">New Conversation</h2>
                <p className="text-xs text-slate-500">Start a real-time CRM-linked chat.</p>
              </div>
              <button onClick={() => setShowChat(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><HiOutlineX className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Contact or customer" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <select className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60">
                <option>Live Chat</option>
                <option>WhatsApp</option>
                <option>SMS</option>
                <option>Internal Chat</option>
                <option>Client Chat</option>
                <option>Social Media</option>
              </select>
              <textarea placeholder="Write the first message..." rows={5} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 text-slate-400">
                  <button title="Upload file" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlinePaperClip className="h-4 w-4" /></button>
                  <button title="Voice note" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineMicrophone className="h-4 w-4" /></button>
                  <button title="Tag conversation" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineTag className="h-4 w-4" /></button>
                </div>
                <button onClick={() => setShowChat(false)} className="crm-btn crm-btn-primary"><HiOutlineSparkles className="h-4 w-4" />Start Chat</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowChat(true)} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-950/50 transition hover:-translate-y-1" title="New Conversation">
        <HiOutlinePlus className="h-6 w-6" />
      </button>
    </div>
  );
}
