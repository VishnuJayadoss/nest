"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineChevronDown,
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineCog,
  HiOutlineDownload,
  HiOutlineExclamation,
  HiOutlineFilter,
  HiOutlineMail,
  HiOutlinePaperClip,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineSparkles,
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

type Stage = "New" | "In Progress" | "Follow-up" | "Waiting Approval" | "Completed" | "Cancelled";
type Priority = "High" | "Medium" | "Low";
type Department = "Sales" | "Success" | "Support" | "Marketing" | "Operations";

interface Task {
  id: string;
  title: string;
  relatedRecord: string;
  assignee: string;
  assigneeInitials: string;
  team: string[];
  department: Department;
  stage: Stage;
  priority: Priority;
  dueDate: string;
  description: string;
  checklistDone: number;
  checklistTotal: number;
  activityCount: number;
  comments: number;
  attachments: number;
  notes: string;
}

const stageMeta: Record<Stage, { color: string; border: string; dot: string; completion: number }> = {
  New: { color: "bg-slate-500/15 text-slate-300", border: "border-slate-500/40", dot: "bg-slate-400", completion: 8 },
  "In Progress": { color: "bg-blue-500/15 text-blue-300", border: "border-blue-500/40", dot: "bg-blue-400", completion: 38 },
  "Follow-up": { color: "bg-purple-500/15 text-purple-300", border: "border-purple-500/40", dot: "bg-purple-400", completion: 54 },
  "Waiting Approval": { color: "bg-yellow-500/15 text-yellow-300", border: "border-yellow-500/40", dot: "bg-yellow-400", completion: 68 },
  Completed: { color: "bg-emerald-500/15 text-emerald-300", border: "border-emerald-500/40", dot: "bg-emerald-400", completion: 100 },
  Cancelled: { color: "bg-red-500/15 text-red-300", border: "border-red-500/40", dot: "bg-red-400", completion: 0 },
};

const stageChartColors: Record<Stage, string> = {
  New: "#94a3b8",
  "In Progress": "#3b82f6",
  "Follow-up": "#8b5cf6",
  "Waiting Approval": "#f59e0b",
  Completed: "#10b981",
  Cancelled: "#ef4444",
};

const priorityStyle: Record<Priority, string> = {
  High: "bg-red-500/15 text-red-300 border-red-500/30",
  Medium: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Low: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

const initialTasks: Task[] = [
  { id: "TW-1001", title: "Send revised enterprise proposal", relatedRecord: "Acme Corp - Enterprise rollout", assignee: "Sarah Johnson", assigneeInitials: "SJ", team: ["MC", "ED"], department: "Sales", stage: "In Progress", priority: "High", dueDate: "2026-05-09", description: "Finalize pricing and security addendum before procurement review.", checklistDone: 3, checklistTotal: 5, activityCount: 12, comments: 5, attachments: 2, notes: "Legal clause still needs final approval from procurement." },
  { id: "TW-1002", title: "Book implementation discovery", relatedRecord: "CloudBase - Operations suite", assignee: "Emma Davis", assigneeInitials: "ED", team: ["SJ"], department: "Success", stage: "New", priority: "Medium", dueDate: "2026-05-10", description: "Schedule workflow discovery with technical stakeholders.", checklistDone: 1, checklistTotal: 4, activityCount: 4, comments: 2, attachments: 1, notes: "Customer asked for Monday or Tuesday morning." },
  { id: "TW-1003", title: "Escalate support SLA risk", relatedRecord: "Global Enterprises - API timeout", assignee: "Priya Shah", assigneeInitials: "PS", team: ["JW", "AM"], department: "Support", stage: "Waiting Approval", priority: "High", dueDate: "2026-05-08", description: "Prepare escalation summary and confirm remediation owner.", checklistDone: 4, checklistTotal: 5, activityCount: 18, comments: 8, attachments: 3, notes: "Potential executive visibility if SLA breach is missed." },
  { id: "TW-1004", title: "Follow up after product demo", relatedRecord: "Northstar Bank - Revenue intelligence", assignee: "Mike Chen", assigneeInitials: "MC", team: ["SJ", "ED"], department: "Sales", stage: "Follow-up", priority: "Medium", dueDate: "2026-05-11", description: "Send demo recap, ROI model, and technical Q&A.", checklistDone: 2, checklistTotal: 4, activityCount: 9, comments: 4, attachments: 2, notes: "Economic buyer requested a shorter ROI summary." },
  { id: "TW-1005", title: "Approve partner campaign copy", relatedRecord: "NexaTech - Partner co-sell", assignee: "Nina Patel", assigneeInitials: "NP", team: ["MC"], department: "Marketing", stage: "Waiting Approval", priority: "Low", dueDate: "2026-05-13", description: "Review partner launch messaging and landing page CTA.", checklistDone: 5, checklistTotal: 6, activityCount: 7, comments: 3, attachments: 4, notes: "Partner logo lockup was updated this morning." },
  { id: "TW-1006", title: "Complete onboarding handoff", relatedRecord: "DataFlow Ltd - Analytics expansion", assignee: "Emma Davis", assigneeInitials: "ED", team: ["SJ", "PS"], department: "Success", stage: "Completed", priority: "High", dueDate: "2026-05-06", description: "Move closed-won account into customer success onboarding.", checklistDone: 6, checklistTotal: 6, activityCount: 15, comments: 6, attachments: 2, notes: "CS owner accepted handoff and kickoff is scheduled." },
  { id: "TW-1007", title: "Clean duplicate lead records", relatedRecord: "Orbit Retail - Data connector", assignee: "John Wilson", assigneeInitials: "JW", team: ["AM"], department: "Operations", stage: "Cancelled", priority: "Low", dueDate: "2026-05-04", description: "Merge duplicate contacts after enrichment sync.", checklistDone: 0, checklistTotal: 3, activityCount: 2, comments: 1, attachments: 0, notes: "Cancelled because CRM sync resolved duplicates automatically." },
  { id: "TW-1008", title: "Call renewal risk account", relatedRecord: "Helio Health - Success workspace", assignee: "Priya Shah", assigneeInitials: "PS", team: ["ED"], department: "Success", stage: "In Progress", priority: "High", dueDate: "2026-05-08", description: "Discuss adoption blockers and capture renewal risk notes.", checklistDone: 2, checklistTotal: 5, activityCount: 11, comments: 4, attachments: 1, notes: "Customer health dipped after support backlog." },
  { id: "TW-1009", title: "Draft follow-up workflow", relatedRecord: "TechStart Inc - API automation", assignee: "Mike Chen", assigneeInitials: "MC", team: ["NP"], department: "Sales", stage: "New", priority: "Medium", dueDate: "2026-05-15", description: "Create post-proposal follow-up workflow for trial accounts.", checklistDone: 0, checklistTotal: 4, activityCount: 3, comments: 1, attachments: 1, notes: "Use founder-focused messaging." },
];

const productivityTrend = [
  { day: "Mon", completed: 24, pending: 18, productivity: 71 },
  { day: "Tue", completed: 31, pending: 15, productivity: 78 },
  { day: "Wed", completed: 27, pending: 21, productivity: 74 },
  { day: "Thu", completed: 38, pending: 14, productivity: 86 },
  { day: "Fri", completed: 34, pending: 17, productivity: 82 },
  { day: "Sat", completed: 16, pending: 10, productivity: 69 },
  { day: "Sun", completed: 11, pending: 8, productivity: 63 },
];

const workloadData = [
  { name: "Sarah", tasks: 18 },
  { name: "Mike", tasks: 14 },
  { name: "Emma", tasks: 21 },
  { name: "Priya", tasks: 16 },
  { name: "Nina", tasks: 9 },
  { name: "John", tasks: 12 },
];

const scheduleItems = [
  { title: "Acme proposal review", meta: "Today, 10:30 AM", icon: <HiOutlineCalendar className="h-4 w-4" />, tone: "text-blue-300" },
  { title: "Call Helio Health", meta: "Due in 1 hour", icon: <HiOutlinePhone className="h-4 w-4" />, tone: "text-emerald-300" },
  { title: "Global SLA deadline", meta: "Today, 4:00 PM", icon: <HiOutlineExclamation className="h-4 w-4" />, tone: "text-red-300" },
  { title: "Northstar follow-up reminder", meta: "Tomorrow, 9:00 AM", icon: <HiOutlineBell className="h-4 w-4" />, tone: "text-purple-300" },
  { title: "Weekly productivity review", meta: "Friday, 3:30 PM", icon: <HiOutlineChartBar className="h-4 w-4" />, tone: "text-yellow-300" },
];

const automationCards = [
  { title: "Auto Reminder", desc: "Notify owners before due dates and after SLA drift.", icon: <HiOutlineBell className="h-5 w-5" />, tone: "from-blue-500/20 to-cyan-500/10" },
  { title: "Auto Assignment", desc: "Route work by territory, account segment, and capacity.", icon: <HiOutlineUserGroup className="h-5 w-5" />, tone: "from-purple-500/20 to-blue-500/10" },
  { title: "Email Trigger", desc: "Send contextual CRM emails when tasks advance.", icon: <HiOutlineMail className="h-5 w-5" />, tone: "from-emerald-500/20 to-blue-500/10" },
  { title: "Follow-up Workflow", desc: "Create sequenced tasks after demos and proposals.", icon: <HiOutlineSparkles className="h-5 w-5" />, tone: "from-fuchsia-500/20 to-purple-500/10" },
  { title: "Deadline Alerts", desc: "Escalate overdue work to managers automatically.", icon: <HiOutlineClock className="h-5 w-5" />, tone: "from-red-500/20 to-orange-500/10" },
];

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

function KpiCard({ label, value, description, trend, progress, icon, tone }: {
  label: string;
  value: string | number;
  description: string;
  trend: string;
  progress: number;
  icon: ReactNode;
  tone: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-blue-950/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-400/40">
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

export default function TasksDetail() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [employeeFilter, setEmployeeFilter] = useState<string>("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [dueDateFilter, setDueDateFilter] = useState("");

  const employees = useMemo(() => Array.from(new Set(tasks.map((task) => task.assignee))), [tasks]);
  const departments = useMemo(() => Array.from(new Set(tasks.map((task) => task.department))), [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase();
    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      task.relatedRecord.toLowerCase().includes(query) ||
      task.assignee.toLowerCase().includes(query);
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || task.stage === statusFilter;
    const matchesEmployee = employeeFilter === "All" || task.assignee === employeeFilter;
    const matchesDepartment = departmentFilter === "All" || task.department === departmentFilter;
    const matchesDueDate = !dueDateFilter || task.dueDate === dueDateFilter;
    return matchesSearch && matchesPriority && matchesStatus && matchesEmployee && matchesDepartment && matchesDueDate;
  });

  const completedTasks = tasks.filter((task) => task.stage === "Completed");
  const cancelledTasks = tasks.filter((task) => task.stage === "Cancelled");
  const pendingTasks = tasks.filter((task) => task.stage !== "Completed" && task.stage !== "Cancelled");
  const overdueTasks = tasks.filter((task) => task.dueDate <= "2026-05-08" && task.stage !== "Completed" && task.stage !== "Cancelled");
  const upcomingMeetings = scheduleItems.filter((item) => item.title.toLowerCase().includes("review") || item.title.toLowerCase().includes("call")).length;
  const productivity = Math.round((completedTasks.length / Math.max(tasks.length - cancelledTasks.length, 1)) * 100);

  const kpis = [
    { label: "Total Tasks", value: tasks.length, description: "Across all workflows", trend: "+12.4% this week", progress: 86, icon: <HiOutlineClipboardCheck className="h-5 w-5" />, tone: "bg-blue-500/20" },
    { label: "Pending Tasks", value: pendingTasks.length, description: "Active work items", trend: "-4 from yesterday", progress: 64, icon: <HiOutlineClock className="h-5 w-5" />, tone: "bg-purple-500/20" },
    { label: "Completed Tasks", value: completedTasks.length, description: "Finished this cycle", trend: "+18.2% completion", progress: 78, icon: <HiOutlineSparkles className="h-5 w-5" />, tone: "bg-emerald-500/20" },
    { label: "Overdue Tasks", value: overdueTasks.length, description: "Past due date", trend: "-2 SLA risks", progress: 32, icon: <HiOutlineExclamation className="h-5 w-5" />, tone: "bg-red-500/20" },
    { label: "Upcoming Meetings", value: upcomingMeetings, description: "Today and tomorrow", trend: "3 CRM touchpoints", progress: 52, icon: <HiOutlineCalendar className="h-5 w-5" />, tone: "bg-cyan-500/20" },
    { label: "Team Productivity", value: `${productivity}%`, description: "Completed vs active", trend: "+6.8 pts this week", progress: productivity, icon: <HiOutlineChartBar className="h-5 w-5" />, tone: "bg-amber-500/20" },
  ];

  const stageDistribution = (Object.keys(stageMeta) as Stage[]).map((stage) => ({
    stage,
    count: tasks.filter((task) => task.stage === stage).length,
    fill: stageChartColors[stage],
  }));

  const updateTaskStage = (taskId: string, stage: Stage) => {
    setTasks((current) => current.map((task) => (
      task.id === taskId
        ? {
          ...task,
          stage,
          checklistDone: stage === "Completed" ? task.checklistTotal : task.checklistDone,
          activityCount: task.activityCount + 1,
        }
        : task
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
                Workflow operations live
              </div>
              <h1 className="text-4xl font-bold text-white">Task Workflow</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">Manage activities, follow-ups, meetings, and team productivity.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowAdd(true)} className="crm-btn crm-btn-primary">
                <HiOutlinePlus className="h-4 w-4" />
                Add Task
              </button>
              <button className="crm-btn crm-btn-secondary">
                <HiOutlineCog className="h-4 w-4" />
                Create Workflow
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
          {kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/30 backdrop-blur">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <HiOutlineSearch className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks..." className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400/60" />
            </div>
            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {(Object.keys(stageMeta) as Stage[]).map((stage) => <option key={stage}>{stage}</option>)}
            </select>
            <select value={employeeFilter} onChange={(event) => setEmployeeFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {employees.map((employee) => <option key={employee}>{employee}</option>)}
            </select>
            <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm outline-none transition focus:border-blue-400/60">
              <option>All</option>
              {departments.map((department) => <option key={department}>{department}</option>)}
            </select>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
            <input type="date" value={dueDateFilter} onChange={(event) => setDueDateFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-300 outline-none transition focus:border-blue-400/60" />
            <div className="flex items-center gap-2 text-sm text-slate-400 xl:col-span-5">
              <HiOutlineFilter className="h-4 w-4" />
              Showing {filteredTasks.length} of {tasks.length} tasks
            </div>
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900/50 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Main Task Workflow Board</h2>
                <p className="text-sm text-slate-500">Review tasks, owners, due dates, checklist progress, and workflow status in table format.</p>
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">Table view</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-[1180px] w-full border-collapse">
                <thead className="bg-white/[0.04]">
                  <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3 font-semibold">Task</th>
                    <th className="px-4 py-3 font-semibold">Related CRM Record</th>
                    <th className="px-4 py-3 font-semibold">Assignee</th>
                    <th className="px-4 py-3 font-semibold">Due Date</th>
                    <th className="px-4 py-3 font-semibold">Priority</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Checklist</th>
                    <th className="px-4 py-3 font-semibold">Team</th>
                    <th className="px-4 py-3 font-semibold">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-14 text-center text-sm text-slate-500">
                        No tasks match the current filters.
                      </td>
                    </tr>
                  )}
                  {filteredTasks.map((task) => {
                    const checklistPct = Math.round((task.checklistDone / task.checklistTotal) * 100);
                    return (
                      <tr key={task.id} className="border-t border-white/10 transition hover:bg-white/[0.03]">
                        <td className="px-4 py-4">
                          <button onClick={() => setSelectedTask(task)} className="block text-left">
                            <div className="flex items-center gap-2">
                              <span className={`h-2.5 w-2.5 rounded-full ${stageMeta[task.stage].dot}`} />
                              <p className="text-sm font-semibold text-white transition hover:text-blue-300">{task.title}</p>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{task.id} - {task.department}</p>
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-300">{task.relatedRecord}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div title={task.assignee} className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500 text-xs font-bold text-white">
                              {task.assigneeInitials}
                            </div>
                            <span className="text-sm text-slate-300">{task.assignee}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-400">{task.dueDate}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${priorityStyle[task.priority]}`}>{task.priority}</span>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={task.stage}
                            onChange={(event) => updateTaskStage(task.id, event.target.value as Stage)}
                            className={`rounded-xl border px-3 py-2 text-xs font-semibold outline-none transition ${stageMeta[task.stage].border} ${stageMeta[task.stage].color}`}
                          >
                            {(Object.keys(stageMeta) as Stage[]).map((stage) => <option key={stage}>{stage}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex min-w-36 items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-slate-800">
                              <div className="h-1.5 rounded-full bg-linear-to-r from-blue-500 to-purple-500" style={{ width: `${checklistPct}%` }} />
                            </div>
                            <span className="w-12 text-right text-xs font-semibold text-slate-300">{task.checklistDone}/{task.checklistTotal}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex -space-x-2">
                            {[task.assigneeInitials, ...task.team].slice(0, 3).map((initials) => (
                              <div key={initials} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-950 bg-linear-to-br from-blue-500 to-purple-500 text-[10px] font-bold text-white">
                                {initials}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><HiOutlineClipboardCheck className="h-3.5 w-3.5" />{task.activityCount}</span>
                            <span className="flex items-center gap-1"><HiOutlinePaperClip className="h-3.5 w-3.5" />{task.attachments}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div>
              <h2 className="text-lg font-bold text-white">Calendar & Schedule</h2>
              <p className="text-sm text-slate-500">Meetings, calls, deadlines, reminders, and timeline.</p>
            </div>
            <div className="space-y-3">
              {scheduleItems.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-400/40">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ${item.tone}`}>{item.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
              <p className="text-sm font-semibold text-red-100">Notifications & Alerts</p>
              <p className="mt-2 text-3xl font-bold text-white">{overdueTasks.length}</p>
              <p className="mt-1 text-xs text-red-200/70">Overdue task warnings need attention today.</p>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {automationCards.map((card) => (
            <div key={card.title} className={`rounded-2xl border border-white/10 bg-linear-to-br ${card.tone} p-5 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-blue-400/40`}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-blue-200">
                {card.icon}
              </div>
              <h3 className="text-sm font-bold text-white">{card.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">{card.desc}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 xl:col-span-2">
            <h3 className="mb-4 text-base font-bold text-white">Weekly Productivity Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={productivityTrend}>
                <defs>
                  <linearGradient id="productivityFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="productivity" name="Productivity %" stroke="#3b82f6" fill="url(#productivityFill)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Pending vs Completed</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={productivityTrend}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="pending" name="Pending" fill="#64748b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
            <h3 className="mb-4 text-base font-bold text-white">Task Completion</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Tooltip content={<ChartTip />} />
                <Pie data={stageDistribution} dataKey="count" nameKey="stage" innerRadius={56} outerRadius={82} paddingAngle={4}>
                  {stageDistribution.map((entry) => <Cell key={entry.stage} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
          <h3 className="mb-4 text-base font-bold text-white">Employee Workload Chart</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={workloadData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTip />} />
              <Line type="monotone" dataKey="tasks" name="Open Tasks" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: "#a855f7" }} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-slate-950 p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">{selectedTask.id}</p>
                <h2 className="mt-2 text-2xl font-bold text-white">{selectedTask.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedTask.relatedRecord}</p>
              </div>
              <button onClick={() => setSelectedTask(null)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Assignee</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedTask.assignee}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Due Date</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedTask.dueDate}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">Priority</p>
                <p className="mt-1 text-sm font-semibold text-white">{selectedTask.priority}</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {[
                { title: "Task Description", body: selectedTask.description },
                { title: "Notes", body: selectedTask.notes },
                { title: "Related CRM Records", body: selectedTask.relatedRecord },
                { title: "Email / Call Logs", body: `${selectedTask.comments} comments, ${selectedTask.attachments} attachments, ${selectedTask.activityCount} activity events.` },
              ].map((section) => (
                <div key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-bold text-white">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{section.body}</p>
                </div>
              ))}

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-sm font-bold text-white">Checklist</h3>
                <div className="mt-3 space-y-2">
                  {Array.from({ length: selectedTask.checklistTotal }).map((_, index) => {
                    const done = index < selectedTask.checklistDone;
                    return (
                      <div key={index} className="flex items-center gap-3 rounded-xl bg-slate-900/70 px-3 py-2 text-sm">
                        <span className={`h-4 w-4 rounded border ${done ? "border-emerald-400 bg-emerald-400" : "border-slate-600"}`} />
                        <span className={done ? "text-slate-300" : "text-slate-500"}>{done ? "Completed step" : "Pending step"} {index + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-sm font-bold text-white">Activity Timeline</h3>
                <div className="mt-3 space-y-3">
                  {["Task created", "Owner assigned", selectedTask.stage === "Completed" ? "Marked completed" : "Latest update added"].map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">{item}</p>
                        <p className="text-xs text-slate-500">CRM activity log</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add Task</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input placeholder="Task title" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <input placeholder="Related lead, deal, or customer" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <input placeholder="Due date" type="date" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60" />
              <button onClick={() => setShowAdd(false)} className="crm-btn crm-btn-primary w-full justify-center">
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setShowAdd(true)} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-white shadow-2xl shadow-blue-950/50 transition hover:-translate-y-1" title="Add Task">
        <HiOutlinePlus className="h-6 w-6" />
      </button>
    </div>
  );
}
