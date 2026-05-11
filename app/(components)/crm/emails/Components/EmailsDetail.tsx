"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineArrowRight,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlineMail,
  HiOutlineMailOpen,
  HiOutlinePaperClip,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineReply,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineTemplate,
  HiOutlineTrash,
  HiOutlineTrendingUp,
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

type EmailType = "Sales Email" | "Follow-up" | "Proposal" | "Support" | "Marketing" | "Internal";
type EmailStatus = "Sent" | "Draft" | "Scheduled" | "Failed" | "Opened" | "Replied";
type Priority = "High" | "Medium" | "Low";

interface EmailRecord {
  id: string;
  subject: string;
  sender: string;
  senderRole: string;
  recipient: string;
  recipientEmail: string;
  company: string;
  assignedEmployee: string;
  type: EmailType;
  dateTime: string;
  status: EmailStatus;
  priority: Priority;
  openRate: number;
  replyTime: string;
  crmTags: string[];
  attachments: string[];
  preview: string;
}

const emails: EmailRecord[] = [
  { id: "EM-2481", subject: "Enterprise rollout proposal with security addendum", sender: "Sarah Johnson", senderRole: "Strategic AE", recipient: "Maya Bennett", recipientEmail: "maya.bennett@acme.com", company: "Acme Corp", assignedEmployee: "Sarah Johnson", type: "Proposal", dateTime: "May 11, 2026 09:42 AM", status: "Opened", priority: "High", openRate: 86, replyTime: "42m avg", crmTags: ["Deal: Enterprise rollout", "Stage: Procurement", "ARR: $186K"], attachments: ["Security_Addendum.pdf", "Acme_Proposal_v4.pdf"], preview: "Sharing the revised commercial proposal, procurement checklist, and final security language for your review." },
  { id: "EM-2482", subject: "Demo recap and recommended success plan", sender: "Emma Davis", senderRole: "Customer Success", recipient: "Noah Sterling", recipientEmail: "noah@cloudbase.io", company: "CloudBase", assignedEmployee: "Emma Davis", type: "Follow-up", dateTime: "May 11, 2026 08:15 AM", status: "Replied", priority: "Medium", openRate: 92, replyTime: "18m avg", crmTags: ["Account: Expansion", "Health: Green"], attachments: ["Implementation_Plan.xlsx"], preview: "Here is the recap from today's operations workflow demo along with the rollout plan we discussed." },
  { id: "EM-2483", subject: "Partner co-sell introduction for finance vertical", sender: "Mike Chen", senderRole: "Partner Manager", recipient: "Ava Morris", recipientEmail: "ava@nexatech.co", company: "NexaTech", assignedEmployee: "Mike Chen", type: "Sales Email", dateTime: "May 10, 2026 05:30 PM", status: "Scheduled", priority: "High", openRate: 0, replyTime: "Queued", crmTags: ["Partner", "Co-sell", "Finance"], attachments: [], preview: "Introducing both teams so we can align on the finance vertical opportunity and ownership model." },
  { id: "EM-2484", subject: "Support SLA summary and remediation update", sender: "Priya Shah", senderRole: "Support Lead", recipient: "Liam Carter", recipientEmail: "liam@globalent.com", company: "Global Enterprises", assignedEmployee: "Priya Shah", type: "Support", dateTime: "May 10, 2026 03:12 PM", status: "Sent", priority: "High", openRate: 73, replyTime: "2h avg", crmTags: ["Ticket: API timeout", "SLA: At risk"], attachments: ["Incident_Summary.pdf"], preview: "A concise summary of the timeout incident, the current mitigation plan, and the next update window." },
  { id: "EM-2485", subject: "Q2 executive webinar invitation", sender: "Nina Patel", senderRole: "Demand Gen", recipient: "Olivia Grant", recipientEmail: "olivia@northstarbank.com", company: "Northstar Bank", assignedEmployee: "Nina Patel", type: "Marketing", dateTime: "May 09, 2026 11:00 AM", status: "Opened", priority: "Low", openRate: 68, replyTime: "Campaign", crmTags: ["Campaign: Exec Webinar", "Segment: Banking"], attachments: [], preview: "A targeted executive invitation for the revenue intelligence webinar and private roundtable." },
  { id: "EM-2486", subject: "Internal account handoff notes for renewal risk", sender: "John Wilson", senderRole: "Revenue Ops", recipient: "Helio Health Team", recipientEmail: "renewals@heliohealth.com", company: "Helio Health", assignedEmployee: "John Wilson", type: "Internal", dateTime: "May 09, 2026 09:28 AM", status: "Draft", priority: "Medium", openRate: 0, replyTime: "Draft", crmTags: ["Renewal risk", "CS handoff"], attachments: ["Risk_Notes.docx"], preview: "Internal notes for the renewal call, adoption blockers, and suggested executive escalation path." },
  { id: "EM-2487", subject: "Updated invoice delivery failed", sender: "Amir Khan", senderRole: "Billing Ops", recipient: "Finance Desk", recipientEmail: "finance@orbitretail.com", company: "Orbit Retail", assignedEmployee: "Amir Khan", type: "Support", dateTime: "May 08, 2026 04:50 PM", status: "Failed", priority: "Medium", openRate: 0, replyTime: "Retry", crmTags: ["Billing", "Email bounce"], attachments: ["Invoice_3941.pdf"], preview: "Delivery failed due to a mail server rejection. Billing operations needs a verified finance address." },
];

const kpis = [
  { label: "Total Emails", value: "18,426", description: "All CRM messages this quarter", trend: "+14.2% volume", progress: 88, icon: <HiOutlineMail className="h-5 w-5" />, tone: "bg-blue-500/20" },
  { label: "Sent Emails", value: "12,890", description: "Delivered by sales and CS", trend: "+946 this week", progress: 74, icon: <HiOutlineArrowRight className="h-5 w-5" />, tone: "bg-cyan-500/20" },
  { label: "Open Rate", value: "71.8%", description: "Weighted across sequences", trend: "+5.4 pts", progress: 72, icon: <HiOutlineMailOpen className="h-5 w-5" />, tone: "bg-emerald-500/20" },
  { label: "Reply Rate", value: "24.6%", description: "Human replies captured", trend: "+3.1 pts", progress: 58, icon: <HiOutlineReply className="h-5 w-5" />, tone: "bg-purple-500/20" },
  { label: "Pending Replies", value: "318", description: "Awaiting client response", trend: "-36 vs yesterday", progress: 46, icon: <HiOutlineClock className="h-5 w-5" />, tone: "bg-amber-500/20" },
  { label: "Scheduled Emails", value: "142", description: "Queued follow-ups", trend: "38 for today", progress: 61, icon: <HiOutlineCalendar className="h-5 w-5" />, tone: "bg-fuchsia-500/20" },
];

const statusStyle: Record<EmailStatus, string> = {
  Sent: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Scheduled: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Failed: "bg-red-500/15 text-red-300 border-red-500/30",
  Opened: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Replied: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Draft: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const priorityStyle: Record<Priority, string> = {
  High: "bg-red-500/15 text-red-300 border-red-500/30",
  Medium: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Low: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const openRateData = [
  { day: "Mon", open: 66, reply: 18, activity: 320 },
  { day: "Tue", open: 69, reply: 21, activity: 410 },
  { day: "Wed", open: 73, reply: 25, activity: 468 },
  { day: "Thu", open: 71, reply: 23, activity: 438 },
  { day: "Fri", open: 76, reply: 28, activity: 520 },
  { day: "Sat", open: 62, reply: 16, activity: 184 },
  { day: "Sun", open: 59, reply: 14, activity: 142 },
];

const campaignData = [
  { name: "Proposal", performance: 84 },
  { name: "Follow-up", performance: 72 },
  { name: "Marketing", performance: 61 },
  { name: "Support", performance: 77 },
  { name: "Internal", performance: 53 },
];

const teamMetrics = [
  { name: "Sarah", sent: 286, replies: 74 },
  { name: "Emma", sent: 241, replies: 68 },
  { name: "Mike", sent: 198, replies: 42 },
  { name: "Priya", sent: 176, replies: 59 },
  { name: "Nina", sent: 344, replies: 51 },
];

const panelGroups = [
  { title: "Upcoming Follow-ups", items: ["Acme procurement review at 2:30 PM", "Northstar ROI model tomorrow", "Helio renewal check-in Friday"] },
  { title: "Pending Replies", items: ["318 active waiting threads", "42 high-value deals idle", "9 executive contacts overdue"] },
  { title: "Recent Conversations", items: ["CloudBase replied to demo recap", "Acme opened proposal 4 times", "Global asked for SLA summary"] },
  { title: "Scheduled Emails", items: ["38 queued today", "Partner intro at 5:30 PM", "Renewal sequence starts tomorrow"] },
  { title: "Email Activity Timeline", items: ["09:42 AM proposal opened", "08:15 AM customer replied", "Yesterday sequence completed"] },
];

const featureCards = [
  { title: "Email scheduling", icon: <HiOutlineCalendar className="h-5 w-5" /> },
  { title: "Open tracking", icon: <HiOutlineEye className="h-5 w-5" /> },
  { title: "Attachment support", icon: <HiOutlinePaperClip className="h-5 w-5" /> },
  { title: "Email templates", icon: <HiOutlineTemplate className="h-5 w-5" /> },
  { title: "Threaded conversations", icon: <HiOutlineReply className="h-5 w-5" /> },
  { title: "CRM integration tags", icon: <HiOutlineTag className="h-5 w-5" /> },
  { title: "Follow-up reminders", icon: <HiOutlineClock className="h-5 w-5" /> },
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

function KpiCard({ label, value, description, trend, progress, icon, tone }: {
  label: string;
  value: string;
  description: string;
  trend: string;
  progress: number;
  icon: ReactNode;
  tone: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/40">
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl ${tone}`} />
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

export default function EmailsDetail() {
  const [selectedEmail, setSelectedEmail] = useState<EmailRecord | null>(emails[0]);
  const [showCompose, setShowCompose] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [employeeFilter, setEmployeeFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState("");

  const employees = useMemo(() => Array.from(new Set(emails.map((email) => email.assignedEmployee))), []);

  const filteredEmails = emails.filter((email) => {
    const matchesStatus = statusFilter === "All" || email.status === statusFilter;
    const matchesEmployee = employeeFilter === "All" || email.assignedEmployee === employeeFilter;
    const matchesType = typeFilter === "All" || email.type === typeFilter;
    const matchesPriority = priorityFilter === "All" || email.priority === priorityFilter;
    const matchesDate = !dateRange || email.dateTime.includes(dateRange);
    return matchesStatus && matchesEmployee && matchesType && matchesPriority && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#06101f] text-slate-100">
      <div className="space-y-6 p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/50 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Communication command center
              </div>
              <h1 className="text-4xl font-bold text-white">Email Management</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">Manage email conversations, campaigns, client communication, and follow-ups.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowCompose(true)} className="crm-btn crm-btn-primary"><HiOutlinePlus className="h-4 w-4" />Compose Email</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineCalendar className="h-4 w-4" />Schedule Email</button>
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
            <select value={employeeFilter} onChange={(event) => setEmployeeFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {employees.map((employee) => <option key={employee}>{employee}</option>)}
            </select>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {["Sales Email", "Follow-up", "Proposal", "Support", "Marketing", "Internal"].map((type) => <option key={type}>{type}</option>)}
            </select>
            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input value={dateRange} onChange={(event) => setDateRange(event.target.value)} placeholder="Date range: May 11" className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400/60" />
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/50 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Email Conversations</h2>
                <p className="text-sm text-slate-500">Subject, recipient, company, ownership, delivery state, priority, and fast actions.</p>
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">{filteredEmails.length} records</span>
            </div>
            <div className="max-h-[620px] overflow-auto rounded-2xl border border-white/10 crm-scrollbar">
              <table className="min-w-[1320px] w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur">
                  <tr className="text-left text-xs uppercase text-slate-500">
                    {["Subject", "Recipient", "Company", "Assigned Employee", "Email Type", "Date & Time", "Status", "Priority", "Actions"].map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEmails.map((email) => (
                    <tr key={email.id} onClick={() => setSelectedEmail(email)} className="cursor-pointer border-t border-white/10 transition hover:bg-blue-500/[0.06]">
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-white">{email.subject}</p>
                        <p className="mt-1 max-w-md truncate text-xs text-slate-500">{email.preview}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-200">{email.recipient}</p>
                        <p className="text-xs text-slate-500">{email.recipientEmail}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-300">{email.company}</td>
                      <td className="px-4 py-4 text-sm text-slate-300">{email.assignedEmployee}</td>
                      <td className="px-4 py-4"><span className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-200">{email.type}</span></td>
                      <td className="px-4 py-4 text-sm text-slate-400">{email.dateTime}</td>
                      <td className="px-4 py-4"><span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${statusStyle[email.status]}`}>{email.status}</span></td>
                      <td className="px-4 py-4"><span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${priorityStyle[email.priority]}`}>{email.priority}</span></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {[
                            { title: "View", icon: <HiOutlineEye className="h-4 w-4" /> },
                            { title: "Reply", icon: <HiOutlineReply className="h-4 w-4" /> },
                            { title: "Forward", icon: <HiOutlineArrowRight className="h-4 w-4" /> },
                            { title: "Edit", icon: <HiOutlinePencil className="h-4 w-4" /> },
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
              <p className="text-sm text-slate-500">Live follow-ups, replies, scheduled mail, and timeline signals.</p>
            </div>
            {panelGroups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-400/40">
                <h3 className="text-sm font-bold text-white">{group.title}</h3>
                <div className="mt-3 space-y-2">
                  {group.items.map((item) => (
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

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-7">
          {featureCards.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-blue-950/20 p-4 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-purple-400/40">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-blue-200">{feature.icon}</div>
              <p className="text-sm font-semibold text-white">{feature.title}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 xl:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white"><HiOutlineTrendingUp className="h-5 w-5 text-blue-300" />Open Rate Chart & Reply Rate Graph</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={openRateData}>
                <defs>
                  <linearGradient id="openRateFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="open" name="Open Rate %" stroke="#3b82f6" fill="url(#openRateFill)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="reply" name="Reply Rate %" stroke="#a855f7" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Campaign Performance</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={campaignData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="performance" name="Performance" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Team Communication Metrics</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={teamMetrics}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="sent" name="Sent" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="replies" name="Replies" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white"><HiOutlineChartBar className="h-5 w-5 text-purple-300" />Email Activity Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={openRateData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="activity" name="Email Activity" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="h-full w-full max-w-3xl overflow-y-auto border-l border-white/10 bg-slate-950 p-6 shadow-2xl crm-scrollbar">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-blue-300">{selectedEmail.id}</p>
                <h2 className="mt-2 text-2xl font-bold text-white">{selectedEmail.subject}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedEmail.company} - {selectedEmail.type}</p>
              </div>
              <button onClick={() => setSelectedEmail(null)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><HiOutlineX className="h-5 w-5" /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-xs text-slate-500">Sender Information</p><p className="mt-1 text-sm font-semibold text-white">{selectedEmail.sender}</p><p className="text-xs text-slate-400">{selectedEmail.senderRole}</p></div>
              <div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-xs text-slate-500">Recipient Information</p><p className="mt-1 text-sm font-semibold text-white">{selectedEmail.recipient}</p><p className="text-xs text-slate-400">{selectedEmail.recipientEmail}</p></div>
            </div>
            <div className="mt-5 space-y-4">
              {[
                { title: "Full Email Conversation", body: `${selectedEmail.preview} The thread includes prior discovery notes, stakeholder alignment, and the next requested customer action.` },
                { title: "Open Tracking", body: `${selectedEmail.openRate}% open rate, ${selectedEmail.replyTime}, last tracked on ${selectedEmail.dateTime}.` },
                { title: "Related CRM Records", body: selectedEmail.crmTags.join(" / ") },
                { title: "Notes & Activities", body: "Owner reviewed the thread, linked CRM records, and queued the next follow-up reminder." },
              ].map((section) => (
                <div key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-bold text-white">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{section.body}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-sm font-bold text-white">Attachments</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(selectedEmail.attachments.length ? selectedEmail.attachments : ["No attachments"]).map((attachment) => (
                    <span key={attachment} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-slate-300"><HiOutlinePaperClip className="h-4 w-4" />{attachment}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-sm font-bold text-white">Email Timeline</h3>
                <div className="mt-3 space-y-3">
                  {["Email created", "CRM record linked", selectedEmail.status === "Replied" ? "Client replied" : "Open tracking updated"].map((item) => (
                    <div key={item} className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-blue-400" /><div><p className="text-sm font-semibold text-white">{item}</p><p className="text-xs text-slate-500">Automated communication log</p></div></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-blue-950/40">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Compose Email</h2>
              <button onClick={() => setShowCompose(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><HiOutlineX className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Recipient" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <input placeholder="Subject" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <textarea placeholder="Write a client-ready message..." rows={6} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 text-slate-400">
                  <button title="Attach file" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlinePaperClip className="h-4 w-4" /></button>
                  <button title="Template" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineTemplate className="h-4 w-4" /></button>
                  <button title="CRM tag" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineTag className="h-4 w-4" /></button>
                </div>
                <button onClick={() => setShowCompose(false)} className="crm-btn crm-btn-primary"><HiOutlineSparkles className="h-4 w-4" />Send Email</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowCompose(true)} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-950/50 transition hover:-translate-y-1" title="Compose Email">
        <HiOutlinePlus className="h-6 w-6" />
      </button>
    </div>
  );
}
