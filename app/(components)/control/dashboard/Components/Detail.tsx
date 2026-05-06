import "@/app/layout/header.css";
import { HiOutlineClipboardList, HiOutlineUserGroup, HiOutlineCheckCircle, HiOutlineClock, HiOutlinePlus, HiOutlineUserAdd, HiOutlineChartBar } from "react-icons/hi";

const stats = [
  { label: "Total Projects", value: "24",     change: "+12%", color: "violet", icon: <HiOutlineClipboardList className="w-5 h-5" /> },
  { label: "Total Users",    value: "1,429",  change: "+8%",  color: "blue",   icon: <HiOutlineUserGroup className="w-5 h-5" /> },
  { label: "Paid",           value: "$12,450",change: "+23%", color: "green",  icon: <HiOutlineCheckCircle className="w-5 h-5" /> },
  { label: "Unpaid",         value: "$3,280", change: "-5%",  color: "orange", icon: <HiOutlineClock className="w-5 h-5" /> },
];

const recentProjects = [
  { name: "E-commerce Platform",  client: "Acme Corp",  status: "Active",  progress: 85, color: "violet", users: 12, due: "Dec 30" },
  { name: "Mobile App Redesign",  client: "TechStart",  status: "Active",  progress: 60, color: "blue",   users: 8,  due: "Jan 15" },
  { name: "API Integration",      client: "DataFlow",   status: "Pending", progress: 30, color: "orange", users: 5,  due: "Feb 1"  },
  { name: "Dashboard Analytics",  client: "NexaCorp",   status: "Review",  progress: 95, color: "green",  users: 15, due: "Dec 28" },
];

const actions = [
  { color: "violet", label: "New Project",  desc: "Create a new project",  icon: <HiOutlinePlus className="w-5 h-5" /> },
  { color: "blue",   label: "Add User",     desc: "Invite team members",   icon: <HiOutlineUserAdd className="w-5 h-5" /> },
  { color: "green",  label: "View Reports", desc: "Analytics & insights",  icon: <HiOutlineChartBar className="w-5 h-5" /> },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Welcome back, John 👋</p>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "var(--panel-elevated)", color: "var(--text-muted)", border: "1px solid var(--panel-border)" }}>
          {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card-${s.color} p-5 rounded-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`stat-icon-${s.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                {s.icon}
              </div>
              <span className={`stat-change ${s.change.startsWith("+") ? "positive" : "negative"}`}>
                {s.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="panel-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">Recent Projects</h2>
          <button className="text-xs font-medium transition-colors" style={{ color: "var(--violet)" }}>
            View All →
          </button>
        </div>
        <div className="space-y-3">
          {recentProjects.map((p) => (
            <div key={p.name} className="project-row p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-white">{p.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`project-status ${p.status.toLowerCase()}`}>{p.status}</span>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{p.client}</span>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>· {p.users} members</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{p.progress}%</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Due {p.due}</p>
                </div>
              </div>
              <div className="progress-bar">
                <div className={`progress-fill-${p.color}`} style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((a) => (
          <button key={a.label} className={`action-card action-card-${a.color} p-5 rounded-2xl text-left`}>
            <div className={`action-icon-${a.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              {a.icon}
            </div>
            <p className="text-sm font-semibold text-white mb-1">{a.label}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{a.desc}</p>
          </button>
        ))}
      </div>

    </div>
  );
}
