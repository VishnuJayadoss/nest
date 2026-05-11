"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineCloudDownload,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentDownload,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlineLightningBolt,
  HiOutlinePlus,
  HiOutlinePresentationChartLine,
  HiOutlineShare,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineTrash,
  HiOutlineTrendingUp,
  HiOutlineUsers,
  HiOutlineX,
} from "react-icons/hi";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ReportCategory = "Sales Reports" | "CRM Reports" | "Marketing Reports" | "Support Reports" | "Financial Reports" | "Employee Performance";
type ReportStatus = "Ready" | "Processing" | "Scheduled" | "Failed";
type ExportType = "PDF" | "Excel" | "CSV";

interface Report {
  id: string;
  name: string;
  category: ReportCategory;
  generatedBy: string;
  department: string;
  dateRange: string;
  lastGenerated: string;
  status: ReportStatus;
  exportType: ExportType;
  description: string;
}

const reports: Report[] = [
  { id: "RPT-7101", name: "Executive Revenue Forecast", category: "Financial Reports", generatedBy: "Sarah Johnson", department: "Revenue", dateRange: "Q2 2026", lastGenerated: "May 11, 2026 09:30 AM", status: "Ready", exportType: "PDF", description: "Forecasted ARR, weighted pipeline, expansion potential, and churn-adjusted revenue." },
  { id: "RPT-7102", name: "Enterprise Sales Funnel", category: "Sales Reports", generatedBy: "Mike Chen", department: "Sales", dateRange: "Last 90 days", lastGenerated: "May 11, 2026 08:12 AM", status: "Ready", exportType: "Excel", description: "Lead to close conversion by stage, owner, segment, and deal velocity." },
  { id: "RPT-7103", name: "Campaign Attribution Pack", category: "Marketing Reports", generatedBy: "Nina Patel", department: "Marketing", dateRange: "May 2026", lastGenerated: "Processing now", status: "Processing", exportType: "CSV", description: "Campaign spend, sourced pipeline, open rates, MQL flow, and influenced revenue." },
  { id: "RPT-7104", name: "Support SLA Compliance", category: "Support Reports", generatedBy: "Priya Shah", department: "Support", dateRange: "This week", lastGenerated: "Scheduled 4:00 PM", status: "Scheduled", exportType: "PDF", description: "Ticket queue health, escalation trends, SLA breaches, and agent performance." },
  { id: "RPT-7105", name: "CRM Health Score", category: "CRM Reports", generatedBy: "Emma Davis", department: "Customer Success", dateRange: "Current quarter", lastGenerated: "May 10, 2026 05:45 PM", status: "Ready", exportType: "Excel", description: "Account health, active customers, lifecycle risk, adoption, and renewal indicators." },
  { id: "RPT-7106", name: "Sales Productivity Scorecard", category: "Employee Performance", generatedBy: "John Wilson", department: "Operations", dateRange: "Last 30 days", lastGenerated: "May 10, 2026 10:15 AM", status: "Ready", exportType: "CSV", description: "Rep activity, meetings, calls, emails, completed tasks, and deal movement." },
  { id: "RPT-7107", name: "Failed Billing Export", category: "Financial Reports", generatedBy: "Amir Khan", department: "Finance", dateRange: "April 2026", lastGenerated: "May 09, 2026 03:20 PM", status: "Failed", exportType: "Excel", description: "Billing summaries and payment status export requiring a retry." },
];

const kpis = [
  { label: "Total Revenue", value: "$8.42M", description: "Closed and expansion revenue", trend: "+18.4%", progress: 88, icon: <HiOutlineCurrencyDollar className="h-5 w-5" />, glow: "bg-blue-500/20" },
  { label: "Total Leads", value: "42,860", description: "Across CRM and campaigns", trend: "+12.7%", progress: 74, icon: <HiOutlineUsers className="h-5 w-5" />, glow: "bg-cyan-500/20" },
  { label: "Conversion Rate", value: "18.9%", description: "Lead to opportunity rate", trend: "+3.2 pts", progress: 64, icon: <HiOutlineChartPie className="h-5 w-5" />, glow: "bg-emerald-500/20" },
  { label: "Active Customers", value: "3,184", description: "Paying customer accounts", trend: "+8.6%", progress: 80, icon: <HiOutlineSparkles className="h-5 w-5" />, glow: "bg-purple-500/20" },
  { label: "Open Deals", value: "612", description: "Weighted active pipeline", trend: "+41 deals", progress: 69, icon: <HiOutlinePresentationChartLine className="h-5 w-5" />, glow: "bg-fuchsia-500/20" },
  { label: "Monthly Growth", value: "14.6%", description: "Net revenue growth", trend: "+2.1 pts", progress: 76, icon: <HiOutlineTrendingUp className="h-5 w-5" />, glow: "bg-amber-500/20" },
];

const statusStyle: Record<ReportStatus, string> = {
  Ready: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Processing: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Scheduled: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Failed: "bg-red-500/15 text-red-300 border-red-500/30",
};

const revenueData = [
  { month: "Jan", revenue: 520, customers: 2460, leads: 5400, support: 84, roi: 3.8 },
  { month: "Feb", revenue: 610, customers: 2590, leads: 6100, support: 87, roi: 4.2 },
  { month: "Mar", revenue: 680, customers: 2740, leads: 6800, support: 89, roi: 4.8 },
  { month: "Apr", revenue: 760, customers: 2910, leads: 7200, support: 91, roi: 5.1 },
  { month: "May", revenue: 842, customers: 3184, leads: 7860, support: 94, roi: 5.7 },
  { month: "Jun", revenue: 930, customers: 3420, leads: 8400, support: 95, roi: 6.2 },
];

const funnelData = [
  { name: "Visitors", value: 124000, fill: "#3b82f6" },
  { name: "Leads", value: 42860, fill: "#6366f1" },
  { name: "MQLs", value: 18420, fill: "#8b5cf6" },
  { name: "Opportunities", value: 6120, fill: "#a855f7" },
  { name: "Customers", value: 3184, fill: "#10b981" },
];

const campaignData = [
  { name: "Webinar", value: 84 },
  { name: "Nurture", value: 78 },
  { name: "Paid Ads", value: 72 },
  { name: "Social", value: 63 },
  { name: "Partner", value: 69 },
];

const categoryBreakdown = [
  { name: "Sales", value: 32, fill: "#3b82f6" },
  { name: "CRM", value: 18, fill: "#8b5cf6" },
  { name: "Marketing", value: 22, fill: "#10b981" },
  { name: "Support", value: 16, fill: "#f59e0b" },
  { name: "Finance", value: 12, fill: "#ef4444" },
];

const insightPanels = [
  { title: "Top Performing Salesperson", value: "Sarah Johnson", caption: "$1.84M closed revenue" },
  { title: "Best Marketing Campaign", value: "Security Webinar", caption: "6.2x ROI and 941 leads" },
  { title: "Revenue Forecast", value: "$9.3M", caption: "Projected next month" },
  { title: "Pending Reports", value: "7", caption: "3 scheduled, 4 processing" },
  { title: "Recent Activities", value: "24", caption: "Exports and dashboard refreshes" },
];

const analyticsSections = [
  { title: "Sales Analytics", value: "$5.8M", caption: "Weighted sales pipeline", tone: "from-blue-500/20 to-cyan-500/10" },
  { title: "Customer Analytics", value: "93.2%", caption: "Average customer health", tone: "from-emerald-500/20 to-blue-500/10" },
  { title: "Employee Productivity", value: "86%", caption: "Quota activity completion", tone: "from-purple-500/20 to-blue-500/10" },
  { title: "Marketing ROI", value: "5.7x", caption: "Attributed return", tone: "from-fuchsia-500/20 to-purple-500/10" },
  { title: "Ticket Resolution Metrics", value: "94%", caption: "SLA compliance", tone: "from-yellow-500/20 to-blue-500/10" },
  { title: "Financial Performance", value: "31%", caption: "Gross margin expansion", tone: "from-cyan-500/20 to-purple-500/10" },
];

const featureCards = [
  { title: "Export reports", icon: <HiOutlineCloudDownload className="h-5 w-5" /> },
  { title: "Scheduled reports", icon: <HiOutlineCalendar className="h-5 w-5" /> },
  { title: "Download center", icon: <HiOutlineDocumentDownload className="h-5 w-5" /> },
  { title: "Real-time analytics", icon: <HiOutlineLightningBolt className="h-5 w-5" /> },
  { title: "Custom dashboards", icon: <HiOutlineChartBar className="h-5 w-5" /> },
  { title: "KPI tracking", icon: <HiOutlineTrendingUp className="h-5 w-5" /> },
  { title: "CRM integrated metrics", icon: <HiOutlineTag className="h-5 w-5" /> },
  { title: "Automated reporting", icon: <HiOutlineSparkles className="h-5 w-5" /> },
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

export default function ReportsDetail() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [dateRange, setDateRange] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const departments = useMemo(() => Array.from(new Set(reports.map((report) => report.department))), []);
  const employees = useMemo(() => Array.from(new Set(reports.map((report) => report.generatedBy))), []);

  const filteredReports = reports.filter((report) => {
    const matchesDate = dateRange === "All" || report.dateRange.toLowerCase().includes(dateRange.toLowerCase()) || report.lastGenerated.toLowerCase().includes(dateRange.toLowerCase());
    const matchesDepartment = departmentFilter === "All" || report.department === departmentFilter;
    const matchesEmployee = employeeFilter === "All" || report.generatedBy === employeeFilter;
    const matchesType = typeFilter === "All" || report.category === typeFilter;
    const matchesStatus = statusFilter === "All" || report.status === statusFilter;
    return matchesDate && matchesDepartment && matchesEmployee && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#06101f] text-slate-100">
      <div className="space-y-6 p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/50 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Business intelligence command center
              </div>
              <h1 className="text-4xl font-bold text-white">Reports & Analytics</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">Track business performance, sales insights, customer analytics, and operational metrics.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowReportModal(true)} className="crm-btn crm-btn-primary"><HiOutlinePlus className="h-4 w-4" />Generate Report</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineDownload className="h-4 w-4" />Export Report</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineCalendar className="h-4 w-4" />Schedule Report</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineFilter className="h-4 w-4" />Filter</button>
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
            <input value={dateRange} onChange={(event) => setDateRange(event.target.value || "All")} placeholder="Date range: Q2" className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400/60" />
            <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {departments.map((department) => <option key={department}>{department}</option>)}
            </select>
            <select value={employeeFilter} onChange={(event) => setEmployeeFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {employees.map((employee) => <option key={employee}>{employee}</option>)}
            </select>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {["Sales Reports", "CRM Reports", "Marketing Reports", "Support Reports", "Financial Reports", "Employee Performance"].map((type) => <option key={type}>{type}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {Object.keys(statusStyle).map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/50 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Main Reports Library</h2>
                <p className="text-sm text-slate-500">Generated reports, ownership, date range, status, exports, and sharing controls.</p>
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">{filteredReports.length} reports</span>
            </div>
            <div className="max-h-[560px] overflow-auto rounded-2xl border border-white/10 crm-scrollbar">
              <table className="min-w-[1180px] w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur">
                  <tr className="text-left text-xs uppercase text-slate-500">
                    {["Report Name", "Category", "Generated By", "Date Range", "Last Generated", "Status", "Export Type", "Actions"].map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-14 text-center text-sm text-slate-500">No reports match the current filters.</td>
                    </tr>
                  )}
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-t border-white/10 transition hover:bg-blue-500/[0.06]">
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-white">{report.name}</p>
                        <p className="mt-1 max-w-md truncate text-xs text-slate-500">{report.description}</p>
                      </td>
                      <td className="px-4 py-4"><span className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-200">{report.category}</span></td>
                      <td className="px-4 py-4 text-sm text-slate-300">{report.generatedBy}</td>
                      <td className="px-4 py-4 text-sm text-slate-400">{report.dateRange}</td>
                      <td className="px-4 py-4 text-sm text-slate-400">{report.lastGenerated}</td>
                      <td className="px-4 py-4"><span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${statusStyle[report.status]}`}>{report.status}</span></td>
                      <td className="px-4 py-4 text-sm font-semibold text-white">{report.exportType}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {[
                            { title: "View", icon: <HiOutlineEye className="h-4 w-4" /> },
                            { title: "Download", icon: <HiOutlineDownload className="h-4 w-4" /> },
                            { title: "Schedule", icon: <HiOutlineCalendar className="h-4 w-4" /> },
                            { title: "Share", icon: <HiOutlineShare className="h-4 w-4" /> },
                            { title: "Delete", icon: <HiOutlineTrash className="h-4 w-4" /> },
                          ].map((action) => (
                            <button key={action.title} title={action.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-slate-400 transition hover:border-blue-400/40 hover:text-white">
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
              <h2 className="text-lg font-bold text-white">Insights Panel</h2>
              <p className="text-sm text-slate-500">Executive signals, forecast, pending work, and recent analytics activity.</p>
            </div>
            {insightPanels.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-400/40">
                <p className="text-xs font-semibold uppercase text-slate-500">{item.title}</p>
                <p className="mt-2 text-xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-xs text-slate-400">{item.caption}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="grid gap-5 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 xl:col-span-2">
            <h3 className="mb-4 text-base font-bold text-white">Revenue Growth Chart</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" fill="url(#revenueFill)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="roi" name="Marketing ROI" stroke="#a855f7" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Sales Funnel Analytics</h3>
            <ResponsiveContainer width="100%" height={280}>
              <FunnelChart>
                <Tooltip content={<ChartTip />} />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList position="right" fill="#cbd5e1" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Report Category Mix</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip content={<ChartTip />} />
                <Pie data={categoryBreakdown} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={4}>
                  {categoryBreakdown.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Lead Conversion Graph</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="leads" name="Leads" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Customer Growth Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="customers" name="Customers" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Marketing Campaign Performance</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={campaignData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="value" name="Performance" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Support Resolution Analytics</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="support" name="Resolution %" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Detailed Analytics Sections</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {analyticsSections.map((item) => (
                <div key={item.title} className={`rounded-2xl border border-white/10 bg-linear-to-br ${item.tone} p-4`}>
                  <p className="text-xs font-semibold uppercase text-slate-400">{item.title}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.caption}</p>
                </div>
              ))}
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
      </div>

      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-blue-950/40">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Generate Report</h2>
                <p className="text-xs text-slate-500">Create a CRM-integrated analytics report.</p>
              </div>
              <button onClick={() => setShowReportModal(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><HiOutlineX className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Report name" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <select className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60">
                <option>Sales Reports</option>
                <option>CRM Reports</option>
                <option>Marketing Reports</option>
                <option>Support Reports</option>
                <option>Financial Reports</option>
                <option>Employee Performance</option>
              </select>
              <input placeholder="Date range" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <textarea placeholder="Report description..." rows={5} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 text-slate-400">
                  <button title="Schedule" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineCalendar className="h-4 w-4" /></button>
                  <button title="Download center" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineDocumentDownload className="h-4 w-4" /></button>
                  <button title="Share" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineShare className="h-4 w-4" /></button>
                </div>
                <button onClick={() => setShowReportModal(false)} className="crm-btn crm-btn-primary"><HiOutlineSparkles className="h-4 w-4" />Generate</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowReportModal(true)} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-950/50 transition hover:-translate-y-1" title="Generate Report">
        <HiOutlinePlus className="h-6 w-6" />
      </button>
    </div>
  );
}
