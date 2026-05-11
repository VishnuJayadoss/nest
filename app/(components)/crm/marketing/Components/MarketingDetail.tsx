"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineCalendar,
  HiOutlineChartPie,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlinePause,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlinePresentationChartLine,
  HiOutlineSparkles,
  HiOutlineSpeakerphone,
  HiOutlineTag,
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
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CampaignType = "Email Campaign" | "SMS Campaign" | "Social Media" | "WhatsApp Campaign" | "Ad Campaign" | "Lead Nurturing";
type CampaignStatus = "Draft" | "Active" | "Scheduled" | "Completed" | "Paused" | "Cancelled";
type Performance = "High" | "Medium" | "Low";

interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  audience: string;
  assignedTeam: string;
  budget: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  performance: Performance;
  leads: number;
  conversion: string;
  roi: string;
  templates: string[];
  attachments: string[];
  timeline: string[];
  crmLinks: string[];
  notes: string;
}

const campaigns: Campaign[] = [
  { id: "CMP-9101", name: "Enterprise Security Webinar", type: "Email Campaign", audience: "Enterprise CISOs and security buyers", assignedTeam: "Demand Generation", budget: "$42,000", startDate: "May 01, 2026", endDate: "May 24, 2026", status: "Active", performance: "High", leads: 684, conversion: "18.4%", roi: "5.8x", templates: ["Executive invite", "Reminder sequence", "Post-event nurture"], attachments: ["Webinar_Brief.pdf", "Target_Accounts.csv"], timeline: ["Audience approved", "Invite sequence live", "Roundtable reminder scheduled"], crmLinks: ["Campaign: ABM Security", "Segment: Enterprise", "Pipeline influenced: $1.2M"], notes: "High engagement from finance and healthcare verticals. Sales wants extra seats for strategic accounts." },
  { id: "CMP-9102", name: "Q2 Renewal Expansion Nurture", type: "Lead Nurturing", audience: "Customers renewing in the next 90 days", assignedTeam: "Lifecycle Marketing", budget: "$18,500", startDate: "May 06, 2026", endDate: "Jun 18, 2026", status: "Scheduled", performance: "Medium", leads: 312, conversion: "11.7%", roi: "3.4x", templates: ["Health score email", "Expansion offer", "CS handoff SMS"], attachments: ["Renewal_Audience.xlsx"], timeline: ["Segments synced", "CS approvals pending", "Launch queued"], crmLinks: ["Lifecycle: Renewal", "Health: Yellow accounts"], notes: "Waiting for customer success approval on the high-risk segment." },
  { id: "CMP-9103", name: "Founder Growth Playbook", type: "Social Media", audience: "Seed to Series B founders", assignedTeam: "Content Marketing", budget: "$26,000", startDate: "Apr 22, 2026", endDate: "May 30, 2026", status: "Active", performance: "High", leads: 941, conversion: "22.1%", roi: "6.2x", templates: ["LinkedIn carousel", "Landing page", "Founder follow-up"], attachments: ["Playbook_Creative.zip"], timeline: ["Creative approved", "Paid social live", "Sales alerts enabled"], crmLinks: ["Campaign: Founder Growth", "Source: Paid Social"], notes: "Best performing creative is the revenue operations checklist carousel." },
  { id: "CMP-9104", name: "Partner Marketplace Launch", type: "WhatsApp Campaign", audience: "Partner sourced prospects in APAC", assignedTeam: "Partner Marketing", budget: "$14,200", startDate: "May 14, 2026", endDate: "May 28, 2026", status: "Draft", performance: "Medium", leads: 0, conversion: "0%", roi: "Pending", templates: ["WhatsApp intro", "Partner proof point", "Demo booking CTA"], attachments: ["Partner_Copy.docx"], timeline: ["Copy drafted", "Compliance review pending", "Partner list imported"], crmLinks: ["Partner: NexaTech", "Region: APAC"], notes: "Compliance wants opt-in language tightened before approval." },
  { id: "CMP-9105", name: "API Reliability Retargeting", type: "Ad Campaign", audience: "Website visitors from integration pages", assignedTeam: "Performance Marketing", budget: "$58,000", startDate: "Apr 15, 2026", endDate: "May 15, 2026", status: "Completed", performance: "High", leads: 1288, conversion: "16.9%", roi: "7.1x", templates: ["Search ad group", "Retargeting display", "Integration guide"], attachments: ["Attribution_Report.pdf"], timeline: ["Campaign launched", "Budget expanded", "Revenue attribution finalized"], crmLinks: ["Source: Paid Search", "Influenced revenue: $842K"], notes: "Strongest ROI in retargeting cohort. Recommended to clone for data connector use case." },
  { id: "CMP-9106", name: "Dormant Trial Re-activation", type: "SMS Campaign", audience: "Dormant product trials older than 21 days", assignedTeam: "Growth Marketing", budget: "$9,800", startDate: "May 03, 2026", endDate: "May 12, 2026", status: "Paused", performance: "Low", leads: 73, conversion: "3.8%", roi: "0.9x", templates: ["Trial reminder SMS", "Founder incentive", "Support handoff"], attachments: [], timeline: ["SMS sent", "Reply rate under target", "Paused for copy review"], crmLinks: ["Lifecycle: Trial", "Segment: Dormant"], notes: "Low response from SMS-only cohort. Needs segmented value prop before relaunch." },
  { id: "CMP-9107", name: "Legacy Webinar Cleanup", type: "Email Campaign", audience: "Archived webinar list", assignedTeam: "Marketing Ops", budget: "$3,200", startDate: "Apr 01, 2026", endDate: "Apr 07, 2026", status: "Cancelled", performance: "Low", leads: 12, conversion: "0.8%", roi: "0.2x", templates: ["Archive re-engagement"], attachments: ["Suppression_List.csv"], timeline: ["List reviewed", "Deliverability risk found", "Campaign cancelled"], crmLinks: ["Suppression: Legacy"], notes: "Cancelled to protect sender reputation." },
];

const kpis = [
  { label: "Total Campaigns", value: "126", description: "Across all CRM marketing motions", trend: "+18 this quarter", progress: 82, icon: <HiOutlineSpeakerphone className="h-5 w-5" />, glow: "bg-blue-500/20" },
  { label: "Active Campaigns", value: "24", description: "Live campaigns generating demand", trend: "+6 launched", progress: 74, icon: <HiOutlineLightningBolt className="h-5 w-5" />, glow: "bg-emerald-500/20" },
  { label: "Leads Generated", value: "18.7K", description: "Net new leads this quarter", trend: "+21.4% growth", progress: 88, icon: <HiOutlineUserGroup className="h-5 w-5" />, glow: "bg-cyan-500/20" },
  { label: "Conversion Rate", value: "14.8%", description: "Lead to opportunity conversion", trend: "+2.6 pts", progress: 64, icon: <HiOutlineChartPie className="h-5 w-5" />, glow: "bg-purple-500/20" },
  { label: "Email Open Rate", value: "72.3%", description: "Weighted campaign open rate", trend: "+4.1 pts", progress: 72, icon: <HiOutlineMail className="h-5 w-5" />, glow: "bg-fuchsia-500/20" },
  { label: "Marketing ROI", value: "5.4x", description: "Attributed revenue to spend", trend: "+0.8x vs target", progress: 79, icon: <HiOutlineTrendingUp className="h-5 w-5" />, glow: "bg-amber-500/20" },
];

const statusStyle: Record<CampaignStatus, string> = {
  Draft: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Scheduled: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Completed: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Paused: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Cancelled: "bg-red-500/15 text-red-300 border-red-500/30",
};

const performanceStyle: Record<Performance, string> = {
  High: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Medium: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Low: "bg-red-500/15 text-red-300 border-red-500/30",
};

const performanceData = [
  { week: "W1", performance: 68, open: 64, click: 12, roi: 3.4, revenue: 180 },
  { week: "W2", performance: 72, open: 69, click: 15, roi: 4.1, revenue: 240 },
  { week: "W3", performance: 78, open: 72, click: 18, roi: 4.8, revenue: 310 },
  { week: "W4", performance: 84, open: 75, click: 21, roi: 5.4, revenue: 420 },
  { week: "W5", performance: 81, open: 73, click: 19, roi: 5.1, revenue: 390 },
  { week: "W6", performance: 88, open: 79, click: 24, roi: 6.2, revenue: 520 },
];

const funnelData = [
  { name: "Audience", value: 82000, fill: "#3b82f6" },
  { name: "Engaged", value: 42600, fill: "#6366f1" },
  { name: "Leads", value: 18700, fill: "#8b5cf6" },
  { name: "MQLs", value: 6900, fill: "#a855f7" },
  { name: "Opportunities", value: 2140, fill: "#10b981" },
];

const engagementData = [
  { channel: "Email", engagement: 74 },
  { channel: "SMS", engagement: 38 },
  { channel: "Social", engagement: 66 },
  { channel: "WhatsApp", engagement: 71 },
  { channel: "Ads", engagement: 58 },
  { channel: "Nurture", engagement: 82 },
];

const sidePanels = [
  { title: "Active Campaigns", items: ["24 campaigns live", "8 enterprise ABM motions", "6 nurture streams active"] },
  { title: "Upcoming Launches", items: ["Partner marketplace on May 14", "Renewal nurture on May 16", "Founder webinar on May 20"] },
  { title: "Pending Approvals", items: ["WhatsApp compliance copy", "Renewal high-risk segment", "Paid search budget increase"] },
  { title: "Recent Activities", items: ["Security webinar crossed 600 leads", "Trial reactivation paused", "API retargeting attribution finalized"] },
  { title: "Marketing Notifications", items: ["One campaign cancelled for deliverability", "Three launches queued", "ROI target exceeded by 18%"] },
];

const featureCards = [
  { title: "Marketing automation", icon: <HiOutlineLightningBolt className="h-5 w-5" /> },
  { title: "Audience segmentation", icon: <HiOutlineUserGroup className="h-5 w-5" /> },
  { title: "Campaign scheduling", icon: <HiOutlineCalendar className="h-5 w-5" /> },
  { title: "Email templates", icon: <HiOutlineDocumentText className="h-5 w-5" /> },
  { title: "SMS automation", icon: <HiOutlineMail className="h-5 w-5" /> },
  { title: "WhatsApp integration", icon: <HiOutlineSpeakerphone className="h-5 w-5" /> },
  { title: "Lead nurturing workflows", icon: <HiOutlineClipboardList className="h-5 w-5" /> },
  { title: "CRM linked campaigns", icon: <HiOutlineTag className="h-5 w-5" /> },
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

export default function MarketingDetail() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(campaigns[0]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [teamFilter, setTeamFilter] = useState<string>("All");
  const [performanceFilter, setPerformanceFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState("");

  const teams = useMemo(() => Array.from(new Set(campaigns.map((campaign) => campaign.assignedTeam))), []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesType = typeFilter === "All" || campaign.type === typeFilter;
    const matchesStatus = statusFilter === "All" || campaign.status === statusFilter;
    const matchesTeam = teamFilter === "All" || campaign.assignedTeam === teamFilter;
    const matchesPerformance = performanceFilter === "All" || campaign.performance === performanceFilter;
    const matchesDate = !dateRange || campaign.startDate.toLowerCase().includes(dateRange.toLowerCase()) || campaign.endDate.toLowerCase().includes(dateRange.toLowerCase());
    return matchesType && matchesStatus && matchesTeam && matchesPerformance && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#06101f] text-slate-100">
      <div className="space-y-6 p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/50 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Marketing automation command center
              </div>
              <h1 className="text-4xl font-bold text-white">Marketing Management</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">Manage campaigns, audience engagement, automation, and marketing performance.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowCampaignModal(true)} className="crm-btn crm-btn-primary"><HiOutlinePlus className="h-4 w-4" />Create Campaign</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineLightningBolt className="h-4 w-4" />Launch Campaign</button>
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
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {["Email Campaign", "SMS Campaign", "Social Media", "WhatsApp Campaign", "Ad Campaign", "Lead Nurturing"].map((type) => <option key={type}>{type}</option>)}
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {Object.keys(statusStyle).map((status) => <option key={status}>{status}</option>)}
            </select>
            <select value={teamFilter} onChange={(event) => setTeamFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {teams.map((team) => <option key={team}>{team}</option>)}
            </select>
            <select value={performanceFilter} onChange={(event) => setPerformanceFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input value={dateRange} onChange={(event) => setDateRange(event.target.value)} placeholder="Date range: May" className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400/60" />
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/50 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Campaign Portfolio</h2>
                <p className="text-sm text-slate-500">Campaign ownership, budget, schedule, state, performance, and launch controls.</p>
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">{filteredCampaigns.length} campaigns</span>
            </div>
            <div className="max-h-[620px] overflow-auto rounded-2xl border border-white/10 crm-scrollbar">
              <table className="min-w-[1400px] w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur">
                  <tr className="text-left text-xs uppercase text-slate-500">
                    {["Campaign Name", "Campaign Type", "Audience", "Assigned Team", "Budget", "Start Date", "End Date", "Status", "Performance", "Actions"].map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-14 text-center text-sm text-slate-500">No campaigns match the current filters.</td>
                    </tr>
                  )}
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} onClick={() => setSelectedCampaign(campaign)} className="cursor-pointer border-t border-white/10 transition hover:bg-blue-500/[0.06]">
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-white">{campaign.name}</p>
                        <p className="text-xs text-slate-500">{campaign.id} - {campaign.leads.toLocaleString()} leads</p>
                      </td>
                      <td className="px-4 py-4"><span className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-200">{campaign.type}</span></td>
                      <td className="px-4 py-4"><p className="max-w-xs truncate text-sm text-slate-300">{campaign.audience}</p></td>
                      <td className="px-4 py-4 text-sm text-slate-300">{campaign.assignedTeam}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-white">{campaign.budget}</td>
                      <td className="px-4 py-4 text-sm text-slate-400">{campaign.startDate}</td>
                      <td className="px-4 py-4 text-sm text-slate-400">{campaign.endDate}</td>
                      <td className="px-4 py-4"><span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${statusStyle[campaign.status]}`}>{campaign.status}</span></td>
                      <td className="px-4 py-4"><span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${performanceStyle[campaign.performance]}`}>{campaign.performance}</span></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          {[
                            { title: "View", icon: <HiOutlineEye className="h-4 w-4" /> },
                            { title: "Edit", icon: <HiOutlinePencil className="h-4 w-4" /> },
                            { title: "Launch", icon: <HiOutlineLightningBolt className="h-4 w-4" /> },
                            { title: "Pause", icon: <HiOutlinePause className="h-4 w-4" /> },
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
              <p className="text-sm text-slate-500">Launches, approvals, activity, and marketing alerts.</p>
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
                <h2 className="text-lg font-bold text-white">Campaign Detail Panel</h2>
                <p className="text-sm text-slate-500">Overview, audience, templates, timeline, conversion data, attachments, and activities.</p>
              </div>
              <button onClick={() => setShowCampaignModal(true)} className="crm-btn crm-btn-secondary"><HiOutlinePlus className="h-4 w-4" />Create</button>
            </div>
            {selectedCampaign && (
              <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-blue-300">Campaign Overview</p>
                    <h3 className="mt-2 text-xl font-bold text-white">{selectedCampaign.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{selectedCampaign.type}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{selectedCampaign.notes}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Audience Details</p>
                    <p className="mt-2 text-sm text-slate-300">{selectedCampaign.audience}</p>
                    <p className="mt-2 text-xs text-slate-500">{selectedCampaign.leads.toLocaleString()} leads generated</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">Attachments</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(selectedCampaign.attachments.length ? selectedCampaign.attachments : ["No attachments"]).map((attachment) => <span key={attachment} className="rounded-lg border border-white/10 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300">{attachment}</span>)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Conversion", value: selectedCampaign.conversion },
                      { label: "ROI", value: selectedCampaign.roi },
                      { label: "Budget", value: selectedCampaign.budget },
                    ].map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs text-slate-500">{metric.label}</p>
                        <p className="mt-1 text-lg font-bold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-sm font-bold text-white">Email/SMS Templates</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {selectedCampaign.templates.map((template) => <div key={template} className="rounded-xl bg-slate-950/70 px-3 py-2 text-xs text-slate-300">{template}</div>)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-sm font-bold text-white">Campaign Timeline</h3>
                    <div className="mt-3 space-y-3">
                      {selectedCampaign.timeline.map((item) => (
                        <div key={item} className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                          <div>
                            <p className="text-sm font-semibold text-white">{item}</p>
                            <p className="text-xs text-slate-500">Marketing automation activity</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-sm font-bold text-white">CRM Linked Campaigns</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedCampaign.crmLinks.map((link) => <span key={link} className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-200">{link}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Lead Conversion Data</h3>
            <ResponsiveContainer width="100%" height={340}>
              <FunnelChart>
                <Tooltip content={<ChartTip />} />
                <Funnel dataKey="value" data={funnelData} isAnimationActive fill="#3b82f6">
                  <LabelList position="right" fill="#cbd5e1" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
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
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-white"><HiOutlinePresentationChartLine className="h-5 w-5 text-blue-300" />Campaign Performance Chart</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="campaignPerformanceFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="performance" name="Performance Score" stroke="#3b82f6" fill="url(#campaignPerformanceFill)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="roi" name="ROI" stroke="#a855f7" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Audience Engagement Graph</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={engagementData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="channel" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="engagement" name="Engagement" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">ROI Analytics</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={performanceData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="roi" name="ROI Multiple" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Open & Click Rate Trends</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={performanceData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="open" name="Open Rate" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="click" name="Click Rate" stroke="#a855f7" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Revenue Attribution Chart</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={performanceData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="revenue" name="Attributed Revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {showCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-blue-950/40">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Create Campaign</h2>
                <p className="text-xs text-slate-500">Build a CRM-linked marketing automation workflow.</p>
              </div>
              <button onClick={() => setShowCampaignModal(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><HiOutlineX className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Campaign name" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <select className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60">
                <option>Email Campaign</option>
                <option>SMS Campaign</option>
                <option>Social Media</option>
                <option>WhatsApp Campaign</option>
                <option>Ad Campaign</option>
                <option>Lead Nurturing</option>
              </select>
              <input placeholder="Audience segment" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <textarea placeholder="Campaign brief..." rows={5} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 text-slate-400">
                  <button title="Templates" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineDocumentText className="h-4 w-4" /></button>
                  <button title="Audience segment" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineUserGroup className="h-4 w-4" /></button>
                  <button title="CRM tag" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineTag className="h-4 w-4" /></button>
                </div>
                <button onClick={() => setShowCampaignModal(false)} className="crm-btn crm-btn-primary"><HiOutlineSparkles className="h-4 w-4" />Create Campaign</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowCampaignModal(true)} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-950/50 transition hover:-translate-y-1" title="Create Campaign">
        <HiOutlinePlus className="h-6 w-6" />
      </button>
    </div>
  );
}
