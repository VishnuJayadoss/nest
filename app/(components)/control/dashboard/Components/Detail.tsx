import "@/app/layout/header.css";
import { HiOutlineOfficeBuilding, HiOutlineUserGroup, HiOutlineCreditCard, HiOutlineCash, HiOutlineChartBar, HiOutlineTrendingUp, HiOutlineSupport, HiOutlineBell } from "react-icons/hi";

const stats = [
  { label: "Total Tenants", value: "142", change: "+12%", color: "violet", icon: <HiOutlineOfficeBuilding className="w-5 h-5" /> },
  { label: "Active Users", value: "8,429", change: "+18%", color: "blue", icon: <HiOutlineUserGroup className="w-5 h-5" /> },
  { label: "Monthly Revenue", value: "$52,450", change: "+23%", color: "green", icon: <HiOutlineCash className="w-5 h-5" /> },
  { label: "Active Subscriptions", value: "128", change: "+8%", color: "orange", icon: <HiOutlineCreditCard className="w-5 h-5" /> },
];

const recentActivity = [
  { tenant: "Acme Corp", action: "Upgraded to Enterprise", time: "2 min ago", color: "violet", icon: <HiOutlineTrendingUp className="w-4 h-4" /> },
  { tenant: "TechStart Inc", action: "New user registered", time: "15 min ago", color: "blue", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
  { tenant: "DataFlow Ltd", action: "Payment received", time: "1 hour ago", color: "green", icon: <HiOutlineCash className="w-4 h-4" /> },
  { tenant: "NexaCorp", action: "Support ticket opened", time: "2 hours ago", color: "orange", icon: <HiOutlineSupport className="w-4 h-4" /> },
];

const quickStats = [
  { label: "Pending Tickets", value: "12", color: "orange", icon: <HiOutlineSupport className="w-5 h-5" /> },
  { label: "New Signups", value: "24", color: "green", icon: <HiOutlineUserGroup className="w-5 h-5" /> },
  { label: "System Alerts", value: "3", color: "red", icon: <HiOutlineBell className="w-5 h-5" /> },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Control Panel Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Monitor and manage your SaaS platform</p>
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

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 panel-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">Recent Activity</h2>
            <button className="text-xs font-medium transition-colors" style={{ color: "var(--violet)" }}>
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="project-row p-4 rounded-xl flex items-center gap-4">
                <div className={`stat-icon-${a.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{a.tenant}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{a.action}</p>
                </div>
                <span className="text-xs shrink-0" style={{ color: "var(--text-faint)" }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="panel-card rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Quick Stats</h2>
          <div className="space-y-4">
            {quickStats.map((s) => (
              <div key={s.label} className="project-row p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`stat-icon-${s.color} w-9 h-9 rounded-lg flex items-center justify-center`}>
                    {s.icon}
                  </div>
                  <span className="text-sm font-medium text-white">{s.label}</span>
                </div>
                <span className="text-xl font-bold text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="panel-card rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-5">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-white mb-1">99.9%</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Uptime</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-white mb-1">1.2s</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Avg Response</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-white mb-1">2.4TB</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Data Processed</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-white mb-1">156K</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>API Calls</div>
          </div>
        </div>
      </div>

    </div>
  );
}
