"use client";

import { useEffect, useRef, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import type { Instance } from "flatpickr/dist/types/instance";
import type { ReactElement } from "react";
import {
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
  HiOutlineCalendar,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClipboardCheck,
  HiOutlineArrowLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { HiOutlineChartBarSquare, HiChevronDown } from "react-icons/hi2";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ── Data ──────────────────────────────────────────────
const filters = ["Today", "Yesterday", "This Week", "This Month", "Custom Date"];

const revenueData = [
  { month: "Jan", revenue: 32000, target: 40000 },
  { month: "Feb", revenue: 28000, target: 40000 },
  { month: "Mar", revenue: 45000, target: 40000 },
  { month: "Apr", revenue: 38000, target: 40000 },
  { month: "May", revenue: 52000, target: 40000 },
  { month: "Jun", revenue: 47000, target: 40000 },
  { month: "Jul", revenue: 61000, target: 40000 },
];

const dealStageData = [
  { stage: "Prospecting", count: 15 },
  { stage: "Qualification", count: 22 },
  { stage: "Proposal", count: 18 },
  { stage: "Negotiation", count: 12 },
  { stage: "Closed Won", count: 33 },
];

const pipelineData = [
  { name: "Prospecting", value: 15, color: "#3b82f6" },
  { name: "Qualification", value: 22, color: "#8b5cf6" },
  { name: "Proposal", value: 18, color: "#f59e0b" },
  { name: "Negotiation", value: 12, color: "#10b981" },
  { name: "Closed Won", value: 33, color: "#06b6d4" },
];

const topDeals = [
  { id: 1, name: "Enterprise Software License", company: "Global Enterprises", value: 250000, stage: "Negotiation", probability: 75 },
  { id: 2, name: "Cloud Migration Project", company: "Tech Solutions Inc", value: 180000, stage: "Proposal", probability: 60 },
  { id: 3, name: "Support Services Contract", company: "DataFlow Ltd", value: 95000, stage: "Qualification", probability: 40 },
  { id: 4, name: "Consulting Services", company: "Acme Corporation", value: 75000, stage: "Prospecting", probability: 20 },
];

const recentActivities = [
  { id: 1, type: "call", title: "Call with Acme Corp", desc: "Discussed Q2 requirements", time: "2h ago", user: "Sarah J." },
  { id: 2, type: "email", title: "Email to Tech Solutions", desc: "Sent proposal for new project", time: "4h ago", user: "Mike C." },
  { id: 3, type: "task", title: "Follow-up task created", desc: "Schedule meeting with Global", time: "6h ago", user: "Emma D." },
  { id: 4, type: "deal", title: "Deal moved to Proposal", desc: "DataFlow Ltd – $150,000", time: "1d ago", user: "John W." },
];

const teamData = [
  { name: "Sarah Johnson", leads: 245, deals: 18, pipeline: "$450K", winRate: 72, status: "Active" },
  { name: "Mike Chen", leads: 198, deals: 15, pipeline: "$380K", winRate: 65, status: "Active" },
  { name: "Emma Davis", leads: 312, deals: 22, pipeline: "$520K", winRate: 78, status: "Active" },
  { name: "John Wilson", leads: 156, deals: 12, pipeline: "$280K", winRate: 58, status: "On Leave" },
];

// ── Helpers ───────────────────────────────────────────
const stageColor: Record<string, string> = {
  Prospecting: "bg-blue-500/20 text-blue-400",
  Qualification: "bg-purple-500/20 text-purple-400",
  Proposal: "bg-yellow-500/20 text-yellow-400",
  Negotiation: "bg-orange-500/20 text-orange-400",
  "Closed Won": "bg-green-500/20 text-green-400",
};

const activityIcon: Record<string, ReactElement> = {
  call: <HiOutlinePhone className="w-4 h-4" />,
  email: <HiOutlineMail className="w-4 h-4" />,
  task: <HiOutlineClipboardCheck className="w-4 h-4" />,
  deal: <HiOutlineCurrencyDollar className="w-4 h-4" />,
};

interface ChartPayloadItem {
  color: string;
  name: string;
  value: number | string;
}

interface ChartTipProps {
  active?: boolean;
  payload?: ChartPayloadItem[];
}

const ChartTip = ({ active, payload }: ChartTipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white shadow-xl">
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

// ── Flatpickr Range Picker ────────────────────────────
interface DateRangePickerProps {
  readonly onApply: (range: string) => void;
}

function DateRangePicker({ onApply }: DateRangePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<Instance | null>(null);
  const [rangeLabel, setRangeLabel] = useState("");

  useEffect(() => {
    if (!inputRef.current) return;
    const instance = flatpickr(inputRef.current, {
      mode: "range",
      inline: true,
      dateFormat: "Y-m-d",
      onChange: (dates, dateStr) => {
        setRangeLabel(dates.length === 2 ? dateStr : "");
      },
    });
    fpRef.current = Array.isArray(instance) ? instance[0] : instance;
    return () => {
      fpRef.current?.destroy();
    };
  }, []);

  return (
    <div className="space-y-3">
      <input ref={inputRef} type="text" className="hidden" readOnly />
      <div className="flatpickr-inline-wrapper" />
      {rangeLabel && (
        <p className="text-center text-xs text-blue-400 font-medium">{rangeLabel}</p>
      )}
      <button
        onClick={() => rangeLabel && onApply(rangeLabel)}
        disabled={!rangeLabel}
        className={`w-full rounded-xl py-2.5 text-sm font-semibold text-white transition
          ${rangeLabel
            ? "bg-linear-to-r from-blue-500 to-purple-500 hover:opacity-90"
            : "bg-slate-700 text-slate-500 cursor-not-allowed"
          }`}
      >
        Apply Range
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────
export default function DashboardDetail() {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const [openFilter, setOpenFilter] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenFilter(false);
        setShowCustomDate(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFilterSelect = (filter: string) => {
    if (filter === "Custom Date") {
      setShowCustomDate(true);
    } else {
      setSelectedFilter(filter);
      setShowCustomDate(false);
      setOpenFilter(false);
    }
  };

  const handleApply = (range: string) => {
    setSelectedFilter(range);
    setOpenFilter(false);
    setShowCustomDate(false);
  };

  return (
    <div className="crm-dashboard min-h-screen p-6 space-y-6">

      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">CRM Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Welcome back! Here&apos;s your business performance overview.</p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => { setOpenFilter(!openFilter); setShowCustomDate(false); }}
            className="crm-btn crm-btn-primary"
          >
            <HiOutlineCalendar className="h-4 w-4" />
            <span className="max-w-50 truncate">{selectedFilter}</span>
            <HiChevronDown className="h-4 w-4 shrink-0" />
          </button>

          {openFilter && (
            <div
              className="absolute right-0 top-12 z-50 rounded-2xl border border-slate-700 bg-[#0d1b35] shadow-2xl overflow-hidden"
              style={{ width: showCustomDate ? "308px" : "220px" }}
            >
              {/* Options list */}
              {!showCustomDate && (
                <div className="py-1">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => handleFilterSelect(f)}
                      className={`flex w-full items-center justify-between px-5 py-3.5 text-sm transition hover:bg-slate-800/80 ${
                        selectedFilter === f ? "text-blue-400 bg-slate-800/60" : "text-slate-300"
                      }`}
                    >
                      {f}
                      {f === "Custom Date" && <HiOutlineChevronRight className="w-4 h-4 text-slate-500" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Custom date range with flatpickr */}
              {showCustomDate && (
                <div className="p-4 space-y-3">
                  <button
                    onClick={() => setShowCustomDate(false)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                  >
                    <HiOutlineArrowLeft className="w-4 h-4" />
                    Back to options
                  </button>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Date Range</p>
                  <DateRangePicker onApply={handleApply} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="crm-card crm-stat-card rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Leads</p>
              <h2 className="mt-2 text-4xl font-bold text-white">1,234</h2>
              <p className="mt-2 text-xs text-green-400">▲ +12.5% this month</p>
            </div>
            <div className="crm-icon-primary flex h-14 w-14 items-center justify-center rounded-2xl">
              <HiOutlineUsers className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="crm-card crm-stat-card accent rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-400">Revenue</p>
              <h2 className="mt-2 text-4xl font-bold text-white">$85K</h2>
              <p className="mt-2 text-xs text-green-400">▲ +8.2% this month</p>
            </div>
            <div className="crm-icon-accent flex h-14 w-14 items-center justify-center rounded-2xl">
              <HiOutlineCurrencyDollar className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="crm-card crm-stat-card warning rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-400">Active Deals</p>
              <h2 className="mt-2 text-4xl font-bold text-white">87</h2>
              <p className="mt-2 text-xs text-blue-400">▲ +5 new deals</p>
            </div>
            <div className="crm-icon-warning flex h-14 w-14 items-center justify-center rounded-2xl">
              <HiOutlineChartBarSquare className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="crm-card crm-stat-card danger rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-400">Conversion Rate</p>
              <h2 className="mt-2 text-4xl font-bold text-white">32%</h2>
              <p className="mt-2 text-xs text-red-400">▼ -2.4% this month</p>
            </div>
            <div className="crm-icon-danger flex h-14 w-14 items-center justify-center rounded-2xl">
              <HiOutlineTrendingUp className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      {/* ── CHARTS ROW 1 ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="crm-card rounded-2xl p-6 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-white">Revenue vs Target</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTip />} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="crm-card rounded-2xl p-6">
          <h3 className="mb-4 text-base font-semibold text-white">Pipeline Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pipelineData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {pipelineData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<ChartTip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {pipelineData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="text-slate-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CHARTS ROW 2 ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="crm-card rounded-2xl p-6 lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-white">Deal Stage Analysis</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dealStageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="stage" stroke="#475569" tick={{ fontSize: 11 }} />
              <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="count" name="Deals" radius={[8, 8, 0, 0]}>
                {dealStageData.map((_, i) => <Cell key={i} fill={pipelineData[i]?.color ?? "#3b82f6"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="crm-card rounded-2xl p-6">
          <h3 className="mb-4 text-base font-semibold text-white">Quick Stats</h3>
          <div className="space-y-5">
            {[
              { label: "Win Rate", value: "68%", pct: 68, color: "from-blue-500 to-purple-500" },
              { label: "Avg Deal Size", value: "$45K", pct: 75, color: "from-green-500 to-teal-500" },
              { label: "Sales Cycle", value: "45 days", pct: 60, color: "from-yellow-500 to-orange-500" },
              { label: "Customer Sat.", value: "4.8/5", pct: 96, color: "from-pink-500 to-rose-500" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-300">{s.label}</span>
                  <span className="text-sm font-semibold text-white">{s.value}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-700">
                  <div className={`h-1.5 rounded-full bg-linear-to-r ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOP DEALS + ACTIVITY ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="crm-card rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Top Deals</h3>
            <button className="text-xs text-blue-400 hover:text-blue-300 transition">View All</button>
          </div>
          <div className="space-y-3">
            {topDeals.map((deal) => (
              <div key={deal.id} className="rounded-xl bg-slate-800/40 p-4 hover:bg-slate-800/70 transition cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{deal.name}</p>
                    <p className="text-xs text-slate-400">{deal.company}</p>
                  </div>
                  <span className={`crm-badge text-xs ${stageColor[deal.stage]}`}>{deal.stage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-white">${(deal.value / 1000).toFixed(0)}K</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-slate-700">
                      <div className="h-1.5 rounded-full bg-linear-to-r from-blue-500 to-purple-500" style={{ width: `${deal.probability}%` }} />
                    </div>
                    <span className="text-xs text-slate-400">{deal.probability}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="crm-card rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Recent Activity</h3>
            <button className="text-xs text-blue-400 hover:text-blue-300 transition">View All</button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-xl bg-slate-800/40 p-4 hover:bg-slate-800/70 transition">
                <div className="crm-icon-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  {activityIcon[a.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{a.title}</p>
                  <p className="text-xs text-slate-400 truncate">{a.desc}</p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{a.user}</span>
                    <span className="text-xs text-slate-500">{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEAM PERFORMANCE ── */}
      <div className="crm-card rounded-2xl p-6">
        <h3 className="mb-4 text-base font-semibold text-white">Team Performance</h3>
        <div className="overflow-x-auto">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Team Member</th>
                <th>Leads</th>
                <th>Deals</th>
                <th>Pipeline Value</th>
                <th>Win Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((m) => (
                <tr key={m.name}>
                  <td className="font-semibold">{m.name}</td>
                  <td>{m.leads}</td>
                  <td>{m.deals}</td>
                  <td>{m.pipeline}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-slate-700">
                        <div className="h-1.5 rounded-full bg-linear-to-r from-blue-500 to-purple-500" style={{ width: `${m.winRate}%` }} />
                      </div>
                      <span className="text-xs">{m.winRate}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`crm-badge text-xs ${m.status === "Active" ? "crm-badge-accent" : "crm-badge-warning"}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
