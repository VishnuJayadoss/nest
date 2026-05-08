"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineChartPie,
  HiOutlineChevronDown,
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineDownload,
  HiOutlineFilter,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineSparkles,
  HiOutlineTrendingUp,
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
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Stage = "Discovery" | "Qualified" | "Proposal" | "Negotiation" | "Contract" | "Won" | "Lost";
type Priority = "Low" | "Medium" | "High";

interface Deal {
  id: string;
  name: string;
  company: string;
  contact: string;
  stage: Stage;
  value: number;
  probability: number;
  expectedClose: string;
  owner: string;
  ownerInitials: string;
  priority: Priority;
  lastActivity: string;
  activityCount: number;
  meetings: number;
  emails: number;
}

const stageMeta: Record<Stage, { color: string; border: string; dot: string; probability: number }> = {
  Discovery: { color: "text-blue-300 bg-blue-500/15", border: "border-blue-500/40", dot: "bg-blue-400", probability: 24 },
  Qualified: { color: "text-cyan-300 bg-cyan-500/15", border: "border-cyan-500/40", dot: "bg-cyan-400", probability: 42 },
  Proposal: { color: "text-yellow-300 bg-yellow-500/15", border: "border-yellow-500/40", dot: "bg-yellow-400", probability: 58 },
  Negotiation: { color: "text-orange-300 bg-orange-500/15", border: "border-orange-500/40", dot: "bg-orange-400", probability: 73 },
  Contract: { color: "text-purple-300 bg-purple-500/15", border: "border-purple-500/40", dot: "bg-purple-400", probability: 86 },
  Won: { color: "text-emerald-300 bg-emerald-500/15", border: "border-emerald-500/40", dot: "bg-emerald-400", probability: 100 },
  Lost: { color: "text-red-300 bg-red-500/15", border: "border-red-500/40", dot: "bg-red-400", probability: 0 },
};

const stageChartColors: Record<Stage, string> = {
  Discovery: "#3b82f6",
  Qualified: "#06b6d4",
  Proposal: "#f59e0b",
  Negotiation: "#f97316",
  Contract: "#8b5cf6",
  Won: "#10b981",
  Lost: "#ef4444",
};

const priorityStyle: Record<Priority, string> = {
  Low: "bg-slate-500/15 text-slate-300",
  Medium: "bg-amber-500/15 text-amber-300",
  High: "bg-rose-500/15 text-rose-300",
};

const initialDeals: Deal[] = [
  { id: "D-1042", name: "Enterprise rollout", company: "Acme Corp", contact: "Alice Johnson", stage: "Negotiation", value: 96000, probability: 74, expectedClose: "2026-05-22", owner: "Sarah Johnson", ownerInitials: "SJ", priority: "High", lastActivity: "Security review completed", activityCount: 12, meetings: 2, emails: 6 },
  { id: "D-1043", name: "API automation pilot", company: "TechStart Inc", contact: "Bob Martinez", stage: "Proposal", value: 34000, probability: 58, expectedClose: "2026-05-28", owner: "Mike Chen", ownerInitials: "MC", priority: "Medium", lastActivity: "Proposal sent", activityCount: 8, meetings: 1, emails: 5 },
  { id: "D-1044", name: "Analytics expansion", company: "DataFlow Ltd", contact: "Carol White", stage: "Won", value: 124000, probability: 100, expectedClose: "2026-05-16", owner: "Emma Davis", ownerInitials: "ED", priority: "High", lastActivity: "Order form signed", activityCount: 19, meetings: 4, emails: 9 },
  { id: "D-1045", name: "Regional logistics pilot", company: "Global Enterprises", contact: "David Lee", stage: "Discovery", value: 54000, probability: 24, expectedClose: "2026-06-10", owner: "John Wilson", ownerInitials: "JW", priority: "Medium", lastActivity: "Workflow mapping call", activityCount: 5, meetings: 1, emails: 3 },
  { id: "D-1046", name: "Growth plan upgrade", company: "StartUp Ventures", contact: "Eva Brown", stage: "Qualified", value: 41000, probability: 44, expectedClose: "2026-06-04", owner: "Sarah Johnson", ownerInitials: "SJ", priority: "High", lastActivity: "Expansion goals qualified", activityCount: 7, meetings: 2, emails: 2 },
  { id: "D-1047", name: "Managed services bundle", company: "NexaTech", contact: "Frank Wilson", stage: "Proposal", value: 27000, probability: 51, expectedClose: "2026-06-12", owner: "Mike Chen", ownerInitials: "MC", priority: "Low", lastActivity: "Partner intro completed", activityCount: 6, meetings: 1, emails: 4 },
  { id: "D-1048", name: "Cloud operations suite", company: "CloudBase", contact: "Grace Kim", stage: "Contract", value: 73000, probability: 86, expectedClose: "2026-05-19", owner: "Emma Davis", ownerInitials: "ED", priority: "High", lastActivity: "Procurement approved", activityCount: 16, meetings: 3, emails: 8 },
  { id: "D-1049", name: "Finance process review", company: "InfoSys", contact: "Henry Scott", stage: "Lost", value: 19000, probability: 0, expectedClose: "2026-05-02", owner: "John Wilson", ownerInitials: "JW", priority: "Low", lastActivity: "Lost to incumbent", activityCount: 4, meetings: 1, emails: 2 },
  { id: "D-1050", name: "Revenue intelligence suite", company: "Northstar Bank", contact: "Priya Shah", stage: "Qualified", value: 142000, probability: 48, expectedClose: "2026-06-18", owner: "Sarah Johnson", ownerInitials: "SJ", priority: "High", lastActivity: "Business case approved", activityCount: 10, meetings: 2, emails: 7 },
  { id: "D-1051", name: "Customer success workspace", company: "Helio Health", contact: "Mark Evans", stage: "Discovery", value: 67000, probability: 22, expectedClose: "2026-06-24", owner: "Emma Davis", ownerInitials: "ED", priority: "Medium", lastActivity: "Discovery call booked", activityCount: 3, meetings: 1, emails: 1 },
  { id: "D-1052", name: "Data warehouse connector", company: "Orbit Retail", contact: "Nina Patel", stage: "Negotiation", value: 88000, probability: 71, expectedClose: "2026-05-31", owner: "Mike Chen", ownerInitials: "MC", priority: "Medium", lastActivity: "Redlines received", activityCount: 13, meetings: 3, emails: 6 },
];

const revenueForecast = [
  { month: "Jan", forecast: 210, closed: 188 },
  { month: "Feb", forecast: 245, closed: 224 },
  { month: "Mar", forecast: 288, closed: 264 },
  { month: "Apr", forecast: 310, closed: 292 },
  { month: "May", forecast: 356, closed: 318 },
  { month: "Jun", forecast: 402, closed: 0 },
];

const conversionTrend = [
  { week: "W1", rate: 27 },
  { week: "W2", rate: 31 },
  { week: "W3", rate: 29 },
  { week: "W4", rate: 36 },
  { week: "W5", rate: 39 },
  { week: "W6", rate: 42 },
];

const activityItems = [
  { title: "Enterprise rollout pricing review", meta: "Today, 2:30 PM", icon: <HiOutlineCalendar className="h-4 w-4" />, tone: "text-blue-300" },
  { title: "Follow up with Northstar Bank", meta: "Due in 3 hours", icon: <HiOutlinePhone className="h-4 w-4" />, tone: "text-emerald-300" },
  { title: "CloudBase contract approved", meta: "18 minutes ago", icon: <HiOutlineSparkles className="h-4 w-4" />, tone: "text-purple-300" },
  { title: "Send revised proposal to TechStart", meta: "Task due today", icon: <HiOutlineClipboardCheck className="h-4 w-4" />, tone: "text-yellow-300" },
  { title: "DataFlow handoff completed", meta: "Won deal notification", icon: <HiOutlineBell className="h-4 w-4" />, tone: "text-green-300" },
];

function money(value: number) {
  return `$${(value / 1000).toFixed(value >= 100000 ? 0 : 1)}K`;
}

function ChartTip({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number | string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-xs text-white shadow-2xl">
      {label && <p className="mb-1 text-slate-400">{label}</p>}
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }}>{item.name}: {item.value}</p>
      ))}
    </div>
  );
}

function KpiCard({ label, value, description, trend, icon, tone }: {
  label: string;
  value: string | number;
  description: string;
  trend: string;
  icon: ReactNode;
  tone: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-400/40">
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl ${tone}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
          <p className="mt-3 text-xs font-semibold text-emerald-300">{trend}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function PipelinesDetail() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("All");
  const [ownerFilter, setOwnerFilter] = useState<string>("All");
  const [probabilityFilter, setProbabilityFilter] = useState<string>("All");
  const [valueFilter, setValueFilter] = useState<string>("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const owners = useMemo(() => Array.from(new Set(deals.map((deal) => deal.owner))), [deals]);

  const filteredDeals = deals.filter((deal) => {
    const query = search.toLowerCase();
    const matchesSearch =
      deal.name.toLowerCase().includes(query) ||
      deal.company.toLowerCase().includes(query) ||
      deal.contact.toLowerCase().includes(query);
    const matchesStage = stageFilter === "All" || deal.stage === stageFilter;
    const matchesOwner = ownerFilter === "All" || deal.owner === ownerFilter;
    const matchesProbability =
      probabilityFilter === "All" ||
      (probabilityFilter === "High" && deal.probability >= 70) ||
      (probabilityFilter === "Medium" && deal.probability >= 40 && deal.probability < 70) ||
      (probabilityFilter === "Low" && deal.probability < 40);
    const matchesValue =
      valueFilter === "All" ||
      (valueFilter === "100K+" && deal.value >= 100000) ||
      (valueFilter === "50K-100K" && deal.value >= 50000 && deal.value < 100000) ||
      (valueFilter === "Under 50K" && deal.value < 50000);
    const matchesDateFrom = !dateFrom || deal.expectedClose >= dateFrom;
    const matchesDateTo = !dateTo || deal.expectedClose <= dateTo;
    return matchesSearch && matchesStage && matchesOwner && matchesProbability && matchesValue && matchesDateFrom && matchesDateTo;
  });

  const openDeals = deals.filter((deal) => deal.stage !== "Won" && deal.stage !== "Lost");
  const wonDeals = deals.filter((deal) => deal.stage === "Won");
  const lostDeals = deals.filter((deal) => deal.stage === "Lost");
  const totalPipelineValue = openDeals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedRevenue = openDeals.reduce((sum, deal) => sum + deal.value * (deal.probability / 100), 0);
  const winRate = Math.round((wonDeals.length / Math.max(wonDeals.length + lostDeals.length, 1)) * 100);
  const averageDealSize = Math.round(deals.reduce((sum, deal) => sum + deal.value, 0) / deals.length);

  const funnelData = (Object.keys(stageMeta) as Stage[]).map((stage) => ({
    name: stage,
    value: deals.filter((deal) => deal.stage === stage).length,
    fill: stage === "Lost" ? "#ef4444" : stage === "Won" ? "#10b981" : "#3b82f6",
  }));

  const stageRevenue = (Object.keys(stageMeta) as Stage[]).map((stage) => ({
    stage,
    value: Math.round(deals.filter((deal) => deal.stage === stage).reduce((sum, deal) => sum + deal.value, 0) / 1000),
    fill: stageChartColors[stage],
  }));

  const updateDealStage = (dealId: string, stage: Stage) => {
    setDeals((current) => current.map((deal) => (
      deal.id === dealId
        ? {
          ...deal,
          stage,
          probability: stage === "Won" || stage === "Lost" ? stageMeta[stage].probability : Math.max(deal.probability, stageMeta[stage].probability),
          lastActivity: `Moved to ${stage}`,
        }
        : deal
    )));
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">

      <div className="space-y-6 p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/40 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live sales operations
              </div>
              <h1 className="text-4xl font-bold text-white">Sales Pipeline</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">Track opportunities, forecast revenue, and manage deal stages.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowAdd(true)} className="crm-btn crm-btn-primary">
                <HiOutlinePlus className="h-4 w-4" />
                Add Pipeline
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

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Open Deals" value={openDeals.length} description="Active opportunities" trend="+8.4% vs last month" icon={<HiOutlineChartBar className="h-5 w-5" />} tone="bg-blue-500/20" />
          <KpiCard label="Total Pipeline Value" value={money(totalPipelineValue)} description="Open opportunity value" trend="+12.1% pipeline lift" icon={<HiOutlineCurrencyDollar className="h-5 w-5" />} tone="bg-purple-500/20" />
          <KpiCard label="Weighted Revenue" value={money(weightedRevenue)} description="Probability adjusted" trend="+$42K forecast" icon={<HiOutlineTrendingUp className="h-5 w-5" />} tone="bg-emerald-500/20" />
          <KpiCard label="Win Rate" value={`${winRate}%`} description="Closed won ratio" trend="+4.2 pts this quarter" icon={<HiOutlineChartPie className="h-5 w-5" />} tone="bg-cyan-500/20" />
          <KpiCard label="Lost Deals" value={lostDeals.length} description="Closed lost records" trend="-2 vs last month" icon={<HiOutlineX className="h-5 w-5" />} tone="bg-red-500/20" />
          <KpiCard label="Avg Deal Size" value={money(averageDealSize)} description="Across all deals" trend="+6.7% expansion" icon={<HiOutlineSparkles className="h-5 w-5" />} tone="bg-amber-500/20" />
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/30 backdrop-blur">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <HiOutlineSearch className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search deals..." className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400/60" />
            </div>
            <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {(Object.keys(stageMeta) as Stage[]).map((stage) => <option key={stage}>{stage}</option>)}
            </select>
            <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {owners.map((owner) => <option key={owner}>{owner}</option>)}
            </select>
            <select value={probabilityFilter} onChange={(event) => setProbabilityFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select value={valueFilter} onChange={(event) => setValueFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              <option>100K+</option>
              <option>50K-100K</option>
              <option>Under 50K</option>
            </select>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-300 outline-none transition focus:border-blue-400/60" />
            <input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-300 outline-none transition focus:border-blue-400/60" />
            <div className="flex items-center gap-2 text-sm text-slate-400 xl:col-span-4">
              <HiOutlineFilter className="h-4 w-4" />
              Showing {filteredDeals.length} of {deals.length} deals
            </div>
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/50 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Pipeline List</h2>
                <p className="text-sm text-slate-500">Review opportunities, owners, stage movement, and activity in a table format.</p>
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">Table view</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-[1120px] w-full border-collapse">
                <thead className="bg-white/[0.04]">
                  <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3 font-semibold">Deal</th>
                    <th className="px-4 py-3 font-semibold">Company</th>
                    <th className="px-4 py-3 font-semibold">Stage</th>
                    <th className="px-4 py-3 font-semibold">Priority</th>
                    <th className="px-4 py-3 font-semibold">Value</th>
                    <th className="px-4 py-3 font-semibold">Probability</th>
                    <th className="px-4 py-3 font-semibold">Owner</th>
                    <th className="px-4 py-3 font-semibold">Close Date</th>
                    <th className="px-4 py-3 font-semibold">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeals.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-14 text-center text-sm text-slate-500">
                        No deals match the current filters.
                      </td>
                    </tr>
                  )}
                  {filteredDeals.map((deal) => (
                    <tr key={deal.id} className="border-t border-white/10 transition hover:bg-white/[0.03]">
                      <td className="px-4 py-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${stageMeta[deal.stage].dot}`} />
                            <p className="text-sm font-semibold text-white">{deal.name}</p>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">{deal.id} - {deal.lastActivity}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <HiOutlineOfficeBuilding className="h-4 w-4 shrink-0 text-slate-500" />
                          <div>
                            <p className="text-sm text-slate-200">{deal.company}</p>
                            <p className="text-xs text-slate-500">{deal.contact}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={deal.stage}
                          onChange={(event) => updateDealStage(deal.id, event.target.value as Stage)}
                          className={`rounded-xl border px-3 py-2 text-xs font-semibold outline-none transition ${stageMeta[deal.stage].border} ${stageMeta[deal.stage].color}`}
                        >
                          {(Object.keys(stageMeta) as Stage[]).map((stage) => <option key={stage}>{stage}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${priorityStyle[deal.priority]}`}>{deal.priority}</span>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-white">{money(deal.value)}</td>
                      <td className="px-4 py-4">
                        <div className="flex min-w-36 items-center gap-2">
                          <div className="h-1.5 flex-1 rounded-full bg-slate-800">
                            <div className="h-1.5 rounded-full bg-linear-to-r from-blue-500 to-purple-500" style={{ width: `${deal.probability}%` }} />
                          </div>
                          <span className="w-9 text-right text-xs font-semibold text-slate-300">{deal.probability}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div title={deal.owner} className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500 text-xs font-bold text-white">
                            {deal.ownerInitials}
                          </div>
                          <span className="text-sm text-slate-300">{deal.owner}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-400">{deal.expectedClose}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><HiOutlineMail className="h-3.5 w-3.5" />{deal.emails}</span>
                          <span className="flex items-center gap-1"><HiOutlineCalendar className="h-3.5 w-3.5" />{deal.meetings}</span>
                          <span className="flex items-center gap-1"><HiOutlineClock className="h-3.5 w-3.5" />{deal.activityCount}</span>
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
              <h2 className="text-lg font-bold text-white">Activity Center</h2>
              <p className="text-sm text-slate-500">Meetings, follow-ups, tasks, and notifications.</p>
            </div>
            <div className="space-y-3">
              {activityItems.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-400/40">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ${item.tone}`}>{item.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
              <p className="text-sm font-semibold text-purple-100">Tasks due today</p>
              <p className="mt-2 text-3xl font-bold text-white">7</p>
              <p className="mt-1 text-xs text-purple-200/70">3 high priority follow-ups need attention.</p>
            </div>
          </aside>
        </section>

        <section className="grid gap-5 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 xl:col-span-2">
            <h3 className="mb-4 text-base font-bold text-white">Revenue Forecast</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueForecast}>
                <defs>
                  <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#3b82f6" fill="url(#forecastFill)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="closed" name="Closed" stroke="#10b981" strokeWidth={2.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Sales Funnel</h3>
            <ResponsiveContainer width="100%" height={260}>
              <FunnelChart>
                <Tooltip content={<ChartTip />} />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  {funnelData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Conversion Rate</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={conversionTrend}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="rate" name="Conversion" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: "#a855f7" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
          <h3 className="mb-4 text-base font-bold text-white">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stageRevenue}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="stage" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="value" name="Stage Value ($K)" radius={[10, 10, 0, 0]}>
                {stageRevenue.map((entry) => <Cell key={entry.stage} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add Pipeline</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input placeholder="Deal name" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <input placeholder="Company" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <input placeholder="Deal value" type="number" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <button onClick={() => setShowAdd(false)} className="crm-btn crm-btn-primary w-full justify-center">
                Create Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
