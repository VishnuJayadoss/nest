"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineClock,
  HiOutlineDownload,
  HiOutlineExclamation,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlinePencil,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineRefresh,
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

type CalendarView = "Monthly" | "Weekly" | "Daily";
type EventType = "Meeting" | "Call" | "Follow-up" | "Demo" | "Client Visit" | "Deadline";
type EventStatus = "Scheduled" | "Completed" | "Pending" | "Cancelled" | "Missed";
type Priority = "High" | "Medium" | "Low";

interface ScheduleEvent {
  id: string;
  title: string;
  type: EventType;
  customer: string;
  assignedTo: string;
  date: string;
  day: number;
  time: string;
  endTime: string;
  status: EventStatus;
  priority: Priority;
  duration: string;
  location: string;
  notes: string;
}

const events: ScheduleEvent[] = [
  { id: "CAL-1001", title: "Acme procurement meeting", type: "Meeting", customer: "Acme Corp", assignedTo: "Sarah Johnson", date: "2026-05-08", day: 8, time: "09:30 AM", endTime: "10:15 AM", status: "Scheduled", priority: "High", duration: "45m", location: "Google Meet", notes: "Finalize pricing model and procurement timeline." },
  { id: "CAL-1002", title: "Helio renewal risk call", type: "Call", customer: "Helio Health", assignedTo: "Priya Shah", date: "2026-05-08", day: 8, time: "11:00 AM", endTime: "11:30 AM", status: "Pending", priority: "High", duration: "30m", location: "Phone", notes: "Capture adoption blockers before renewal committee." },
  { id: "CAL-1003", title: "CloudBase product demo", type: "Demo", customer: "CloudBase", assignedTo: "Emma Davis", date: "2026-05-09", day: 9, time: "01:00 PM", endTime: "02:00 PM", status: "Scheduled", priority: "Medium", duration: "60m", location: "Zoom", notes: "Show scheduling automation and reporting workflows." },
  { id: "CAL-1004", title: "Northstar proposal follow-up", type: "Follow-up", customer: "Northstar Bank", assignedTo: "Mike Chen", date: "2026-05-10", day: 10, time: "10:00 AM", endTime: "10:20 AM", status: "Scheduled", priority: "Medium", duration: "20m", location: "Email + Call", notes: "Send ROI summary and confirm legal reviewer." },
  { id: "CAL-1005", title: "Global SLA deadline", type: "Deadline", customer: "Global Enterprises", assignedTo: "Priya Shah", date: "2026-05-08", day: 8, time: "04:00 PM", endTime: "04:00 PM", status: "Missed", priority: "High", duration: "Due", location: "Support queue", notes: "Executive-visible SLA risk requires escalation note." },
  { id: "CAL-1006", title: "DataFlow onsite success visit", type: "Client Visit", customer: "DataFlow Ltd", assignedTo: "Emma Davis", date: "2026-05-12", day: 12, time: "02:30 PM", endTime: "04:00 PM", status: "Scheduled", priority: "Low", duration: "90m", location: "Client office", notes: "Review onboarding milestones with operations leadership." },
  { id: "CAL-1007", title: "NexaTech partner sync", type: "Meeting", customer: "NexaTech", assignedTo: "Mike Chen", date: "2026-05-14", day: 14, time: "03:30 PM", endTime: "04:00 PM", status: "Completed", priority: "Low", duration: "30m", location: "Teams", notes: "Partner scope confirmed and campaign handoff created." },
  { id: "CAL-1008", title: "Orbit Retail callback", type: "Call", customer: "Orbit Retail", assignedTo: "John Wilson", date: "2026-05-15", day: 15, time: "12:15 PM", endTime: "12:35 PM", status: "Cancelled", priority: "Low", duration: "20m", location: "Phone", notes: "Customer requested reschedule after data sync completes." },
  { id: "CAL-1009", title: "TechStart automation demo", type: "Demo", customer: "TechStart Inc", assignedTo: "Nina Patel", date: "2026-05-18", day: 18, time: "09:00 AM", endTime: "10:00 AM", status: "Scheduled", priority: "Medium", duration: "60m", location: "Zoom", notes: "Founder team wants lead routing and sequence examples." },
  { id: "CAL-1010", title: "Apex implementation follow-up", type: "Follow-up", customer: "Apex Logistics", assignedTo: "Sarah Johnson", date: "2026-05-20", day: 20, time: "02:00 PM", endTime: "02:30 PM", status: "Pending", priority: "High", duration: "30m", location: "Google Meet", notes: "Confirm implementation sponsor and kickoff attendees." },
];

const eventTone: Record<EventType, { badge: string; dot: string; glow: string; chart: string }> = {
  Meeting: { badge: "bg-blue-500/15 text-blue-200 border-blue-400/30", dot: "bg-blue-400", glow: "shadow-blue-500/20", chart: "#3b82f6" },
  Call: { badge: "bg-cyan-500/15 text-cyan-200 border-cyan-400/30", dot: "bg-cyan-400", glow: "shadow-cyan-500/20", chart: "#06b6d4" },
  "Follow-up": { badge: "bg-yellow-500/15 text-yellow-200 border-yellow-400/30", dot: "bg-yellow-400", glow: "shadow-yellow-500/20", chart: "#f59e0b" },
  Demo: { badge: "bg-purple-500/15 text-purple-200 border-purple-400/30", dot: "bg-purple-400", glow: "shadow-purple-500/20", chart: "#8b5cf6" },
  "Client Visit": { badge: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30", dot: "bg-emerald-400", glow: "shadow-emerald-500/20", chart: "#10b981" },
  Deadline: { badge: "bg-red-500/15 text-red-200 border-red-400/30", dot: "bg-red-400", glow: "shadow-red-500/20", chart: "#ef4444" },
};

const statusStyle: Record<EventStatus, string> = {
  Scheduled: "bg-blue-500/15 text-blue-200 border-blue-400/30",
  Completed: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
  Pending: "bg-yellow-500/15 text-yellow-200 border-yellow-400/30",
  Cancelled: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  Missed: "bg-red-500/15 text-red-200 border-red-400/30",
};

const priorityStyle: Record<Priority, string> = {
  High: "bg-red-500/15 text-red-200 border-red-400/30",
  Medium: "bg-yellow-500/15 text-yellow-200 border-yellow-400/30",
  Low: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const monthDays = Array.from({ length: 35 }, (_, index) => {
  const day = index - 4;
  return {
    label: day < 1 ? 26 + index : day > 31 ? day - 31 : day,
    currentMonth: day >= 1 && day <= 31,
    isToday: day === 8,
  };
});

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "01:00", "02:00", "03:00", "04:00", "05:00"];
const weekDays = ["Mon 4", "Tue 5", "Wed 6", "Thu 7", "Fri 8", "Sat 9", "Sun 10"];
const employees = Array.from(new Set(events.map((event) => event.assignedTo)));

const completionData = [
  { name: "Scheduled", value: 42 },
  { name: "Completed", value: 31 },
  { name: "Pending", value: 18 },
  { name: "Missed", value: 5 },
];

const weeklyData = [
  { day: "Mon", meetings: 8, calls: 11, demos: 3 },
  { day: "Tue", meetings: 10, calls: 9, demos: 4 },
  { day: "Wed", meetings: 7, calls: 13, demos: 5 },
  { day: "Thu", meetings: 12, calls: 8, demos: 4 },
  { day: "Fri", meetings: 14, calls: 15, demos: 6 },
  { day: "Sat", meetings: 5, calls: 4, demos: 1 },
  { day: "Sun", meetings: 3, calls: 2, demos: 1 },
];

const productivityData = [
  { day: "Mon", team: 74, target: 70 },
  { day: "Tue", team: 79, target: 72 },
  { day: "Wed", team: 76, target: 73 },
  { day: "Thu", team: 86, target: 75 },
  { day: "Fri", team: 88, target: 76 },
  { day: "Sat", team: 69, target: 68 },
  { day: "Sun", team: 64, target: 65 },
];

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

function KpiCard({ label, value, description, icon, tone }: { label: string; value: string; description: string; icon: ReactNode; tone: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/40">
      <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${tone}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-blue-200">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function CalendarDetail() {
  const [view, setView] = useState<CalendarView>("Monthly");
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState("2026-05-08");
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const filteredEvents = useMemo(() => events.filter((event) => {
    const matchesType = eventTypeFilter === "All" || event.type === eventTypeFilter;
    const matchesEmployee = employeeFilter === "All" || event.assignedTo === employeeFilter;
    const matchesPriority = priorityFilter === "All" || event.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || event.status === statusFilter;
    return matchesType && matchesEmployee && matchesPriority && matchesStatus;
  }), [employeeFilter, eventTypeFilter, priorityFilter, statusFilter]);

  const todayEvents = events.filter((event) => event.date === "2026-05-08");
  const completedActivities = events.filter((event) => event.status === "Completed").length;
  const overdueActivities = events.filter((event) => event.status === "Missed").length;
  const pendingFollowUps = events.filter((event) => event.type === "Follow-up" && event.status !== "Completed").length;

  const kpis = [
    { label: "Total Meetings", value: "126", description: "Booked this month", icon: <HiOutlineCalendar className="h-5 w-5" />, tone: "bg-blue-500/20" },
    { label: "Upcoming Events", value: "38", description: "Next 14 days", icon: <HiOutlineClock className="h-5 w-5" />, tone: "bg-purple-500/20" },
    { label: "Today's Calls", value: "14", description: "Across sales and CS", icon: <HiOutlinePhone className="h-5 w-5" />, tone: "bg-cyan-500/20" },
    { label: "Pending Follow-ups", value: String(pendingFollowUps), description: "Need owner action", icon: <HiOutlineRefresh className="h-5 w-5" />, tone: "bg-yellow-500/20" },
    { label: "Completed Activities", value: String(completedActivities + 47), description: "Closed this week", icon: <HiOutlineCheckCircle className="h-5 w-5" />, tone: "bg-emerald-500/20" },
    { label: "Overdue Activities", value: String(overdueActivities + 3), description: "Escalation queue", icon: <HiOutlineExclamation className="h-5 w-5" />, tone: "bg-red-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="space-y-6 p-4 sm:p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/50 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Scheduling command center
              </div>
              <h1 className="text-4xl font-bold text-white">Calendar</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">Manage meetings, follow-ups, calls, and schedules.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowAddEvent(true)} className="crm-btn crm-btn-primary">
                <HiOutlinePlus className="h-4 w-4" />
                Add Event
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
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Event Type</span>
              <select value={eventTypeFilter} onChange={(event) => setEventTypeFilter(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-8 text-sm outline-none transition focus:border-blue-400/60">
                <option>All</option>
                {Object.keys(eventTone).map((item) => <option key={item}>{item}</option>)}
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
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</span>
              <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-3 pr-8 text-sm outline-none transition focus:border-blue-400/60">
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
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
            <label>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Date Range</span>
              <input type="date" value={dateRange} onChange={(event) => setDateRange(event.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-300 outline-none transition focus:border-blue-400/60" />
            </label>
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">May 2026 Schedule</h2>
                  <p className="text-sm text-slate-500">Monthly, weekly, and daily planning with color-coded CRM activity.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {(["Monthly", "Weekly", "Daily"] as CalendarView[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => setView(item)}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${view === item ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "border border-white/10 bg-white/[0.03] text-slate-400 hover:border-blue-400/40 hover:text-white"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {view === "Monthly" && (
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <div className="grid grid-cols-7 bg-white/[0.04] text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div key={day} className="px-2 py-3">{day}</div>)}
                  </div>
                  <div className="grid grid-cols-7">
                    {monthDays.map((day, index) => {
                      const dayEvents = events.filter((event) => event.day === day.label && day.currentMonth);
                      return (
                        <div
                          key={`${day.label}-${index}`}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={(event) => event.currentTarget.classList.add("ring-1", "ring-blue-400/40")}
                          className={`min-h-32 border-r border-t border-white/10 bg-slate-950/25 p-2 transition hover:bg-blue-500/[0.04] ${day.currentMonth ? "" : "opacity-35"} ${day.isToday ? "bg-blue-500/10 ring-1 ring-inset ring-blue-400/40" : ""}`}
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${day.isToday ? "bg-blue-500 text-white" : "text-slate-400"}`}>{day.label}</span>
                            {dayEvents.length > 0 && <span className="text-[10px] font-semibold text-slate-500">{dayEvents.length}</span>}
                          </div>
                          <div className="space-y-1.5">
                            {dayEvents.slice(0, 3).map((event) => (
                              <button
                                key={event.id}
                                draggable
                                onClick={() => setSelectedEvent(event)}
                                className={`w-full truncate rounded-lg border px-2 py-1 text-left text-[11px] font-semibold shadow-lg transition hover:-translate-y-0.5 ${eventTone[event.type].badge} ${eventTone[event.type].glow}`}
                              >
                                {event.time} {event.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {view === "Weekly" && (
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <div className="min-w-[980px]">
                    <div className="grid grid-cols-[80px_repeat(7,1fr)] bg-white/[0.04] text-xs font-semibold text-slate-500">
                      <div className="px-3 py-3">Time</div>
                      {weekDays.map((day) => <div key={day} className="border-l border-white/10 px-3 py-3 text-center">{day}</div>)}
                    </div>
                    {timeSlots.map((slot, rowIndex) => (
                      <div key={slot} className="grid grid-cols-[80px_repeat(7,1fr)] border-t border-white/10">
                        <div className="px-3 py-5 text-xs text-slate-500">{slot}</div>
                        {weekDays.map((day, columnIndex) => {
                          const event = events[(rowIndex + columnIndex) % events.length];
                          const shouldShow = (rowIndex + columnIndex) % 5 === 0 || (day.includes("8") && rowIndex > 1 && rowIndex < 6);
                          return (
                            <div key={`${slot}-${day}`} className="min-h-16 border-l border-white/10 p-2 transition hover:bg-blue-500/[0.04]">
                              {shouldShow && (
                                <button onClick={() => setSelectedEvent(event)} className={`w-full rounded-xl border px-2 py-2 text-left text-xs font-semibold transition hover:-translate-y-0.5 ${eventTone[event.type].badge}`}>
                                  <span className="block truncate">{event.title}</span>
                                  <span className="mt-1 block text-[10px] opacity-70">{event.duration}</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === "Daily" && (
                <div className="rounded-2xl border border-white/10">
                  {timeSlots.map((slot, index) => {
                    const event = todayEvents[index % todayEvents.length];
                    const hasEvent = index === 1 || index === 3 || index === 8;
                    return (
                      <div key={slot} className="grid grid-cols-[84px_1fr] border-t border-white/10 first:border-t-0">
                        <div className="px-4 py-5 text-xs font-semibold text-slate-500">{slot}</div>
                        <div className="border-l border-white/10 p-3">
                          {hasEvent ? (
                            <button onClick={() => setSelectedEvent(event)} className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition hover:-translate-y-0.5 ${eventTone[event.type].badge}`}>
                              <span>
                                <span className="block text-sm font-bold">{event.title}</span>
                                <span className="mt-1 block text-xs opacity-75">{event.customer} - {event.location}</span>
                              </span>
                              <span className="text-xs font-semibold">{event.time}</span>
                            </button>
                          ) : (
                            <button onClick={() => setShowAddEvent(true)} className="h-12 w-full rounded-xl border border-dashed border-white/10 text-xs text-slate-600 transition hover:border-blue-400/40 hover:text-blue-300">Open slot</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                {Object.entries(eventTone).map(([type, tone]) => (
                  <span key={type} className="inline-flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />{type}</span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Schedule List</h2>
                  <p className="text-sm text-slate-500">Filtered schedule records with status, priority, and quick actions.</p>
                </div>
                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">{filteredEvents.length} events</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="min-w-[1180px] w-full border-collapse">
                  <thead className="sticky top-0 z-10 bg-slate-950/95 text-left text-xs uppercase tracking-wider text-slate-500 backdrop-blur">
                    <tr>
                      {["Event Title", "Event Type", "Customer/Lead", "Assigned To", "Date", "Time", "Status", "Priority", "Actions"].map((column) => (
                        <th key={column} className="px-4 py-3 font-semibold">{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="border-t border-white/10 transition hover:bg-white/[0.03]">
                        <td className="px-4 py-4">
                          <button onClick={() => setSelectedEvent(event)} className="text-left">
                            <p className="text-sm font-semibold text-white transition hover:text-blue-300">{event.title}</p>
                            <p className="mt-1 text-xs text-slate-500">{event.id} - {event.duration}</p>
                          </button>
                        </td>
                        <td className="px-4 py-4"><Badge className={eventTone[event.type].badge}><span className={`h-2 w-2 rounded-full ${eventTone[event.type].dot}`} />{event.type}</Badge></td>
                        <td className="px-4 py-4 text-sm text-slate-300">{event.customer}</td>
                        <td className="px-4 py-4 text-sm text-slate-300">{event.assignedTo}</td>
                        <td className="px-4 py-4 text-sm text-slate-400">{event.date}</td>
                        <td className="px-4 py-4 text-sm text-slate-400">{event.time}</td>
                        <td className="px-4 py-4"><Badge className={statusStyle[event.status]}>{event.status}</Badge></td>
                        <td className="px-4 py-4"><Badge className={priorityStyle[event.priority]}>{event.priority}</Badge></td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setSelectedEvent(event)} className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-300" title="View"><HiOutlineEye className="h-4 w-4" /></button>
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
          </div>

          <aside className="space-y-5">
            {[
              { title: "Upcoming Meetings", items: events.filter((event) => event.type === "Meeting").slice(0, 3) },
              { title: "Today's Schedule", items: todayEvents },
              { title: "Pending Follow-ups", items: events.filter((event) => event.type === "Follow-up").slice(0, 3) },
              { title: "Recent Activities", items: events.filter((event) => event.status === "Completed" || event.status === "Missed").slice(0, 3) },
            ].map((panel) => (
              <div key={panel.title} className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 backdrop-blur">
                <h2 className="text-base font-bold text-white">{panel.title}</h2>
                <div className="mt-4 space-y-3">
                  {panel.items.map((event) => (
                    <button key={`${panel.title}-${event.id}`} onClick={() => setSelectedEvent(event)} className="flex w-full gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-blue-400/40 hover:bg-blue-500/[0.04]">
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${eventTone[event.type].dot}`} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white">{event.title}</span>
                        <span className="mt-1 block text-xs text-slate-500">{event.time} - {event.assignedTo}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>
        </section>

        <section className="grid gap-5 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Activity Completion Chart</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={completionData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="value" name="Activities" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Weekly Schedule Graph</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="weeklyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="meetings" name="Meetings" stroke="#8b5cf6" fill="url(#weeklyFill)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Team Productivity Trend</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={productivityData}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip content={<ChartTip />} />
                <Line type="monotone" dataKey="team" name="Team" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#64748b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="text-base font-bold text-white">Meeting Performance Metrics</h3>
            <div className="mt-5 space-y-4">
              {[
                { label: "Attendance Rate", value: "94%", tone: "from-emerald-500 to-blue-500" },
                { label: "Avg Response Time", value: "18m", tone: "from-blue-500 to-purple-500" },
                { label: "Reschedule Rate", value: "6.2%", tone: "from-yellow-500 to-purple-500" },
                { label: "Demo Conversion", value: "41%", tone: "from-purple-500 to-fuchsia-500" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-400">{metric.label}</span>
                    <span className="font-bold text-white">{metric.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className={`h-2 rounded-full bg-linear-to-r ${metric.tone}`} style={{ width: metric.value.includes("m") ? "72%" : metric.value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-blue-950/30">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <Badge className={eventTone[selectedEvent.type].badge}>{selectedEvent.type}</Badge>
                <h2 className="mt-3 text-2xl font-bold text-white">{selectedEvent.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedEvent.customer} - {selectedEvent.location}</p>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Owner</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedEvent.assignedTo}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Date & Time</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedEvent.date} - {selectedEvent.time}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Priority</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedEvent.priority}</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-bold text-white">Event Notes</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{selectedEvent.notes}</p>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button className="crm-btn crm-btn-secondary"><HiOutlinePencil className="h-4 w-4" />Edit</button>
              <button className="crm-btn crm-btn-primary"><HiOutlineSparkles className="h-4 w-4" />Open Activity</button>
            </div>
          </div>
        </div>
      )}

      {showAddEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-blue-950/30">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add Event</h2>
              <button onClick={() => setShowAddEvent(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input placeholder="Event title" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <div className="grid gap-3 sm:grid-cols-2">
                <select className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60">
                  {Object.keys(eventTone).map((type) => <option key={type}>{type}</option>)}
                </select>
                <input type="date" defaultValue="2026-05-08" className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              </div>
              <input placeholder="Customer or lead" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <button onClick={() => setShowAddEvent(false)} className="crm-btn crm-btn-primary w-full justify-center">
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowAddEvent(true)} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-950/50 transition hover:-translate-y-1" title="Add Event">
        <HiOutlinePlus className="h-6 w-6" />
      </button>
    </div>
  );
}
