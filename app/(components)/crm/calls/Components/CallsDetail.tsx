"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineCalendar,
  HiOutlineChevronDown,
  HiOutlineClock,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlineMicrophone,
  HiOutlinePencil,
  HiOutlinePhone,
  HiOutlinePhoneIncoming,
  HiOutlinePhoneMissedCall,
  HiOutlinePhoneOutgoing,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineTrash,
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

type CallType = "Incoming" | "Outgoing" | "Follow-up" | "Demo Call" | "Sales Call" | "Support Call";
type CallStatus = "Completed" | "Scheduled" | "Missed" | "Ongoing" | "Cancelled";
type Priority = "High" | "Medium" | "Low";

interface CallRecord {
  id: string;
  callerName: string;
  company: string;
  type: CallType;
  assignedEmployee: string;
  phoneNumber: string;
  duration: string;
  dateTime: string;
  status: CallStatus;
  priority: Priority;
  recording: boolean;
  outcome: string;
  notes: string;
  relatedDeal: string;
  followUp: string;
}

const calls: CallRecord[] = [
  { id: "CALL-1001", callerName: "Olivia Carter", company: "Acme Corp", type: "Sales Call", assignedEmployee: "Sarah Johnson", phoneNumber: "+1 (415) 555-0184", duration: "18m 42s", dateTime: "2026-05-08 09:20 AM", status: "Completed", priority: "High", recording: true, outcome: "Proposal review booked", notes: "Procurement needs final commercial terms and security addendum by Monday.", relatedDeal: "Acme enterprise rollout - $186K", followUp: "2026-05-09 10:00 AM" },
  { id: "CALL-1002", callerName: "Daniel Kim", company: "CloudBase", type: "Demo Call", assignedEmployee: "Emma Davis", phoneNumber: "+1 (212) 555-0198", duration: "42m 11s", dateTime: "2026-05-08 10:45 AM", status: "Ongoing", priority: "Medium", recording: true, outcome: "Discovery in progress", notes: "Operations leader is validating reporting, routing, and permission workflows.", relatedDeal: "CloudBase operations suite - $92K", followUp: "2026-05-10 11:30 AM" },
  { id: "CALL-1003", callerName: "Maya Shah", company: "Helio Health", type: "Follow-up", assignedEmployee: "Priya Shah", phoneNumber: "+1 (646) 555-0172", duration: "0m", dateTime: "2026-05-08 11:30 AM", status: "Missed", priority: "High", recording: false, outcome: "No answer", notes: "Renewal risk account. Needs callback before executive health review.", relatedDeal: "Helio renewal - $74K", followUp: "2026-05-08 02:15 PM" },
  { id: "CALL-1004", callerName: "Ethan Brooks", company: "Northstar Bank", type: "Outgoing", assignedEmployee: "Mike Chen", phoneNumber: "+1 (312) 555-0167", duration: "13m 05s", dateTime: "2026-05-08 01:10 PM", status: "Scheduled", priority: "Medium", recording: false, outcome: "Pending call", notes: "Confirm ROI model owner and legal review sequence.", relatedDeal: "Northstar revenue intelligence - $128K", followUp: "2026-05-08 01:10 PM" },
  { id: "CALL-1005", callerName: "Sophia Reyes", company: "DataFlow Ltd", type: "Support Call", assignedEmployee: "John Wilson", phoneNumber: "+1 (718) 555-0149", duration: "27m 18s", dateTime: "2026-05-07 04:05 PM", status: "Completed", priority: "Low", recording: true, outcome: "Issue resolved", notes: "Report export timeout was tied to a stale connector token.", relatedDeal: "DataFlow analytics expansion - $64K", followUp: "2026-05-12 09:30 AM" },
  { id: "CALL-1006", callerName: "Noah Martin", company: "Global Enterprises", type: "Incoming", assignedEmployee: "Priya Shah", phoneNumber: "+1 (202) 555-0138", duration: "8m 36s", dateTime: "2026-05-07 03:40 PM", status: "Completed", priority: "High", recording: true, outcome: "Escalation created", notes: "API timeout concern routed to support leadership with SLA visibility.", relatedDeal: "Global pilot expansion - $210K", followUp: "2026-05-08 04:00 PM" },
  { id: "CALL-1007", callerName: "Ava Bennett", company: "NexaTech", type: "Incoming", assignedEmployee: "Mike Chen", phoneNumber: "+1 (650) 555-0116", duration: "0m", dateTime: "2026-05-09 12:00 PM", status: "Cancelled", priority: "Low", recording: false, outcome: "Cancelled by client", notes: "Partner requested reschedule after campaign scope update.", relatedDeal: "NexaTech partner co-sell - $48K", followUp: "2026-05-14 03:30 PM" },
  { id: "CALL-1008", callerName: "Liam Foster", company: "Orbit Retail", type: "Follow-up", assignedEmployee: "Nina Patel", phoneNumber: "+1 (503) 555-0181", duration: "19m 22s", dateTime: "2026-05-09 02:20 PM", status: "Scheduled", priority: "Low", recording: false, outcome: "Scheduled", notes: "Review data connector readiness and lead enrichment use case.", relatedDeal: "Orbit data connector - $36K", followUp: "2026-05-09 02:20 PM" },
  { id: "CALL-1009", callerName: "Isabella Nguyen", company: "TechStart Inc", type: "Demo Call", assignedEmployee: "Sarah Johnson", phoneNumber: "+1 (408) 555-0128", duration: "36m 50s", dateTime: "2026-05-10 09:00 AM", status: "Scheduled", priority: "Medium", recording: false, outcome: "Scheduled", notes: "Founder team wants lead routing and automated callback examples.", relatedDeal: "TechStart API automation - $52K", followUp: "2026-05-10 09:00 AM" },
  { id: "CALL-1010", callerName: "James Walker", company: "Apex Logistics", type: "Sales Call", assignedEmployee: "Emma Davis", phoneNumber: "+1 (617) 555-0105", duration: "22m 14s", dateTime: "2026-05-06 02:35 PM", status: "Completed", priority: "Medium", recording: true, outcome: "Stakeholder map updated", notes: "Economic buyer added CFO to implementation budget review.", relatedDeal: "Apex implementation - $83K", followUp: "2026-05-13 03:00 PM" },
];

const typeStyle: Record<CallType, string> = {
  Incoming: "bg-cyan-500/15 text-cyan-200 border-cyan-400/30",
  Outgoing: "bg-blue-500/15 text-blue-200 border-blue-400/30",
  "Follow-up": "bg-yellow-500/15 text-yellow-200 border-yellow-400/30",
  "Demo Call": "bg-purple-500/15 text-purple-200 border-purple-400/30",
  "Sales Call": "bg-indigo-500/15 text-indigo-200 border-indigo-400/30",
  "Support Call": "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
};

const statusStyle: Record<CallStatus, string> = {
  Completed: "bg-linear-to-r from-emerald-500/20 to-green-500/10 text-emerald-200 border-emerald-400/30",
  Scheduled: "bg-linear-to-r from-yellow-500/20 to-amber-500/10 text-yellow-200 border-yellow-400/30",
  Missed: "bg-linear-to-r from-red-500/20 to-rose-500/10 text-red-200 border-red-400/30",
  Ongoing: "bg-linear-to-r from-blue-500/20 to-cyan-500/10 text-blue-200 border-blue-400/30",
  Cancelled: "bg-linear-to-r from-slate-500/20 to-slate-600/10 text-slate-300 border-slate-500/30",
};

const priorityStyle: Record<Priority, string> = {
  High: "bg-red-500/15 text-red-200 border-red-400/30",
  Medium: "bg-yellow-500/15 text-yellow-200 border-yellow-400/30",
  Low: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const trendData = [
  { day: "Mon", calls: 42, completed: 31, missed: 5 },
  { day: "Tue", calls: 51, completed: 39, missed: 6 },
  { day: "Wed", calls: 47, completed: 35, missed: 4 },
  { day: "Thu", calls: 64, completed: 49, missed: 7 },
  { day: "Fri", calls: 58, completed: 44, missed: 5 },
  { day: "Sat", calls: 24, completed: 18, missed: 3 },
  { day: "Sun", calls: 18, completed: 13, missed: 2 },
];

const teamData = [
  { name: "Sarah", calls: 38, conversion: 46 },
  { name: "Emma", calls: 34, conversion: 41 },
  { name: "Priya", calls: 31, conversion: 39 },
  { name: "Mike", calls: 29, conversion: 36 },
  { name: "Nina", calls: 22, conversion: 32 },
  { name: "John", calls: 19, conversion: 28 },
];

const durationData = [
  { day: "Mon", duration: 18 },
  { day: "Tue", duration: 21 },
  { day: "Wed", duration: 17 },
  { day: "Thu", duration: 24 },
  { day: "Fri", duration: 22 },
  { day: "Sat", duration: 15 },
  { day: "Sun", duration: 14 },
];

const employees = Array.from(new Set(calls.map((call) => call.assignedEmployee)));

function ChartTip({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number | string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/95 px-3 py-2 text-xs text-white shadow-2xl">
      {label && <p className="mb-1 text-slate-400">{label}</p>}
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }}>{item.name}: {item.value}</p>
      ))}
    </div>
  );
}

function Badge({ children, className }: { children: ReactNode; className: string }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

function KpiCard({ label, value, description, trend, icon, tone }: { label: string; value: string; description: string; trend: string; icon: ReactNode; tone: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/40">
      <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${tone}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
          <p className="mt-4 text-xs font-semibold text-emerald-300">{trend}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-blue-200">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function CallsDetail() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateRange, setDateRange] = useState("2026-05-08");
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const filteredCalls = useMemo(() => calls.filter((call) => {
    const matchesType = typeFilter === "All" || call.type === typeFilter;
    const matchesEmployee = employeeFilter === "All" || call.assignedEmployee === employeeFilter;
    const matchesStatus = statusFilter === "All" || call.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || call.priority === priorityFilter;
    return matchesType && matchesEmployee && matchesStatus && matchesPriority;
  }), [employeeFilter, priorityFilter, statusFilter, typeFilter]);

  const upcomingCalls = calls.filter((call) => call.status === "Scheduled");
  const missedCalls = calls.filter((call) => call.status === "Missed");
  const completedCalls = calls.filter((call) => call.status === "Completed");
  const todayCalls = calls.filter((call) => call.dateTime.startsWith("2026-05-08"));

  const kpis = [
    { label: "Total Calls", value: "1,284", description: "Logged this month", trend: "+12.6% vs last month", icon: <HiOutlinePhone className="h-5 w-5" />, tone: "bg-blue-500/20" },
    { label: "Today's Calls", value: String(todayCalls.length + 38), description: "Scheduled and completed", trend: "+7 since morning", icon: <HiOutlineCalendar className="h-5 w-5" />, tone: "bg-purple-500/20" },
    { label: "Missed Calls", value: String(missedCalls.length + 11), description: "Need callback workflow", trend: "-3 from yesterday", icon: <HiOutlinePhoneMissedCall className="h-5 w-5" />, tone: "bg-red-500/20" },
    { label: "Completed Calls", value: String(completedCalls.length + 312), description: "Closed call logs", trend: "+18.4% connect rate", icon: <HiOutlinePhoneIncoming className="h-5 w-5" />, tone: "bg-emerald-500/20" },
    { label: "Upcoming Calls", value: String(upcomingCalls.length + 24), description: "Next 7 days", trend: "9 high-priority calls", icon: <HiOutlineClock className="h-5 w-5" />, tone: "bg-yellow-500/20" },
    { label: "Average Call Duration", value: "21m", description: "Connected call average", trend: "+2m consult depth", icon: <HiOutlineMicrophone className="h-5 w-5" />, tone: "bg-cyan-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="space-y-6 p-4 sm:p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/50 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live communication workspace
              </div>
              <h1 className="text-4xl font-bold text-white">Calls Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">Manage client calls, follow-ups, call logs, and sales communication.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowSchedule(true)} className="crm-btn crm-btn-primary">
                <HiOutlinePhoneOutgoing className="h-4 w-4" />
                New Call
              </button>
              <button onClick={() => setShowSchedule(true)} className="crm-btn crm-btn-secondary">
                <HiOutlineCalendar className="h-4 w-4" />
                Schedule Call
              </button>
              <button className="crm-btn crm-btn-secondary">
                <HiOutlineFilter className="h-4 w-4" />
                Filter
              </button>
              <button className="crm-btn crm-btn-secondary">
                <HiOutlineDownload className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/30 backdrop-blur">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <label className="relative">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Call Type</span>
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-8 text-sm outline-none transition focus:border-blue-400/60">
                <option>All</option>
                {Object.keys(typeStyle).map((item) => <option key={item}>{item}</option>)}
              </select>
              <HiOutlineChevronDown className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-slate-500" />
            </label>
            <label className="relative">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Employee</span>
              <select value={employeeFilter} onChange={(event) => setEmployeeFilter(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-8 text-sm outline-none transition focus:border-blue-400/60">
                <option>All</option>
                {employees.map((employee) => <option key={employee}>{employee}</option>)}
              </select>
              <HiOutlineChevronDown className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-slate-500" />
            </label>
            <label className="relative">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</span>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-8 text-sm outline-none transition focus:border-blue-400/60">
                <option>All</option>
                {Object.keys(statusStyle).map((item) => <option key={item}>{item}</option>)}
              </select>
              <HiOutlineChevronDown className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-slate-500" />
            </label>
            <label className="relative">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</span>
              <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-8 text-sm outline-none transition focus:border-blue-400/60">
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <HiOutlineChevronDown className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-slate-500" />
            </label>
            <label>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Date Range</span>
              <input type="date" value={dateRange} onChange={(event) => setDateRange(event.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-300 outline-none transition focus:border-blue-400/60" />
            </label>
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Calls Activity</h2>
                <p className="text-sm text-slate-500">Client conversations, outcomes, recordings, callbacks, and CRM activity logs.</p>
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">{filteredCalls.length} records</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-[1320px] w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950/95 text-left text-xs uppercase tracking-wider text-slate-500 backdrop-blur">
                  <tr>
                    {["Caller Name", "Company", "Call Type", "Assigned Employee", "Phone Number", "Call Duration", "Date & Time", "Status", "Priority", "Actions"].map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCalls.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-14 text-center text-sm text-slate-500">No calls match the current filters.</td>
                    </tr>
                  )}
                  {filteredCalls.map((call) => (
                    <tr key={call.id} className="border-t border-white/10 transition hover:bg-white/[0.03]">
                      <td className="px-4 py-4">
                        <button onClick={() => setSelectedCall(call)} className="text-left">
                          <p className="text-sm font-semibold text-white transition hover:text-blue-300">{call.callerName}</p>
                          <p className="mt-1 text-xs text-slate-500">{call.id}</p>
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-300">{call.company}</td>
                      <td className="px-4 py-4"><Badge className={typeStyle[call.type]}>{call.type}</Badge></td>
                      <td className="px-4 py-4 text-sm text-slate-300">{call.assignedEmployee}</td>
                      <td className="px-4 py-4">
                        <button className="inline-flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1.5 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20">
                          <HiOutlinePhone className="h-4 w-4" />
                          {call.phoneNumber}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                          {call.recording && <HiOutlineMicrophone className="h-4 w-4 text-purple-300" />}
                          {call.duration}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-400">{call.dateTime}</td>
                      <td className="px-4 py-4"><Badge className={statusStyle[call.status]}>{call.status}</Badge></td>
                      <td className="px-4 py-4"><Badge className={priorityStyle[call.priority]}>{call.priority}</Badge></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelectedCall(call)} className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-300" title="View"><HiOutlineEye className="h-4 w-4" /></button>
                          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-500/10 hover:text-emerald-300" title="Call Back"><HiOutlinePhoneOutgoing className="h-4 w-4" /></button>
                          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-purple-500/10 hover:text-purple-300" title="Edit"><HiOutlinePencil className="h-4 w-4" /></button>
                          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-300" title="Delete"><HiOutlineTrash className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-5">
            {[
              { title: "Upcoming Calls", items: upcomingCalls.slice(0, 3), accent: "text-blue-300" },
              { title: "Missed Call Alerts", items: missedCalls, accent: "text-red-300" },
              { title: "Follow-up Reminders", items: calls.filter((call) => call.type === "Follow-up").slice(0, 3), accent: "text-yellow-300" },
              { title: "Recent Activities", items: completedCalls.slice(0, 3), accent: "text-emerald-300" },
              { title: "Today's Schedule", items: todayCalls.slice(0, 4), accent: "text-purple-300" },
            ].map((panel) => (
              <div key={panel.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 backdrop-blur">
                <h2 className="text-base font-bold text-white">{panel.title}</h2>
                <div className="mt-4 space-y-3">
                  {panel.items.length === 0 && <p className="text-sm text-slate-500">No active items.</p>}
                  {panel.items.map((call) => (
                    <button key={`${panel.title}-${call.id}`} onClick={() => setSelectedCall(call)} className="flex w-full gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-blue-400/40 hover:bg-blue-500/[0.04]">
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${call.status === "Missed" ? "bg-red-400" : call.status === "Completed" ? "bg-emerald-400" : "bg-blue-400"}`} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white">{call.callerName}</span>
                        <span className={`mt-1 block text-xs ${panel.accent}`}>{call.company} - {call.dateTime.split(" ")[1]} {call.dateTime.split(" ")[2]}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>
        </section>

        <section className="grid gap-5 xl:grid-cols-5">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 xl:col-span-2">
            <h3 className="mb-4 text-base font-bold text-white">Calls Trend Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="callsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="calls" name="Total Calls" stroke="#3b82f6" fill="url(#callsFill)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Team Call Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teamData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="calls" name="Calls" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Missed vs Completed</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trendData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="missed" name="Missed" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Average Duration</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={durationData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="duration" name="Minutes" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: "#06b6d4" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Employee Productivity</h3>
              <p className="text-sm text-slate-500">Call volume, conversion quality, recording adoption, and CRM logging discipline.</p>
            </div>
            <Badge className="border-blue-400/30 bg-blue-500/15 text-blue-200">CRM Integrated</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {teamData.map((employee) => (
              <div key={employee.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-blue-400/40">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">{employee.name.slice(0, 2).toUpperCase()}</div>
                <p className="text-sm font-bold text-white">{employee.name}</p>
                <p className="mt-1 text-xs text-slate-500">{employee.calls} calls logged</p>
                <div className="mt-4 h-2 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500" style={{ width: `${employee.conversion + 35}%` }} />
                </div>
                <p className="mt-2 text-xs font-semibold text-emerald-300">{employee.conversion}% conversion signal</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedCall && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-slate-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <Badge className={typeStyle[selectedCall.type]}>{selectedCall.type}</Badge>
                <h2 className="mt-3 text-2xl font-bold text-white">{selectedCall.callerName}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedCall.company} - {selectedCall.phoneNumber}</p>
              </div>
              <button onClick={() => setSelectedCall(null)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Assigned To</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedCall.assignedEmployee}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Duration</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedCall.duration}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Outcome</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedCall.outcome}</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {[
                { title: "Caller Information", body: `${selectedCall.callerName} from ${selectedCall.company}. Priority ${selectedCall.priority}.` },
                { title: "Company Details", body: `${selectedCall.company} is attached to ${selectedCall.relatedDeal}.` },
                { title: "Call Notes", body: selectedCall.notes },
                { title: "Call Recording", body: selectedCall.recording ? "Recording available with transcript and sentiment markers." : "No recording available for this call." },
                { title: "Follow-up Schedule", body: selectedCall.followUp },
                { title: "Related Deals", body: selectedCall.relatedDeal },
              ].map((section) => (
                <div key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-bold text-white">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{section.body}</p>
                </div>
              ))}

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-sm font-bold text-white">Activity Timeline</h3>
                <div className="mt-3 space-y-3">
                  {["Call created", "CRM record linked", selectedCall.recording ? "Recording processed" : "Manual note logged", "Follow-up reminder queued"].map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">{item}</p>
                        <p className="text-xs text-slate-500">{selectedCall.dateTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-blue-950/30">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Schedule Call</h2>
              <button onClick={() => setShowSchedule(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input placeholder="Caller name" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <input placeholder="Company or lead" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <div className="grid gap-3 sm:grid-cols-2">
                <select className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60">
                  {Object.keys(typeStyle).map((type) => <option key={type}>{type}</option>)}
                </select>
                <input type="datetime-local" className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              </div>
              <button onClick={() => setShowSchedule(false)} className="crm-btn crm-btn-primary w-full justify-center">
                <HiOutlineSparkles className="h-4 w-4" />
                Create Call Activity
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowSchedule(true)} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-950/50 transition hover:-translate-y-1" title="New Call">
        <HiOutlinePlus className="h-6 w-6" />
      </button>
    </div>
  );
}
