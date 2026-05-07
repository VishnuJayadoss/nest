"use client";

import "@/app/layout/header.css";
import { HiOutlineOfficeBuilding, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle } from "react-icons/hi";

const stats = [
  { label: "Total Tenants", value: "142", change: "+12%", color: "violet", icon: <HiOutlineOfficeBuilding className="w-5 h-5" /> },
  { label: "Active", value: "128", change: "+8%", color: "green", icon: <HiOutlineCheckCircle className="w-5 h-5" /> },
  { label: "Trial", value: "11", change: "+3%", color: "orange", icon: <HiOutlineClock className="w-5 h-5" /> },
  { label: "Suspended", value: "3", change: "-2%", color: "red", icon: <HiOutlineXCircle className="w-5 h-5" /> },
];

const tenants = [
  { name: "Acme Corp", users: 245, plan: "Enterprise", status: "Active", color: "violet", revenue: "$2,450" },
  { name: "TechStart Inc", users: 89, plan: "Professional", status: "Active", color: "blue", revenue: "$890" },
  { name: "DataFlow Ltd", users: 156, plan: "Enterprise", status: "Active", color: "green", revenue: "$1,560" },
  { name: "NexaCorp", users: 45, plan: "Basic", status: "Trial", color: "orange", revenue: "$0" },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenants</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage all tenant organizations</p>
        </div>
      </div>

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

      <div className="panel-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">All Tenants</h2>
        </div>
        <div className="space-y-3">
          {tenants.map((t) => (
            <div key={t.name} className="project-row p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`stat-icon-${t.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <HiOutlineOfficeBuilding className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`project-status ${t.status.toLowerCase()}`}>{t.status}</span>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{t.users} users</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{t.revenue}/mo</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{t.plan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
