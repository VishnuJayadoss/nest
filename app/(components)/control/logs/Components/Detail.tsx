"use client";

import "@/app/layout/header.css";
import { HiOutlineClipboardList } from "react-icons/hi";

const logs = [
  { action: "User Login", user: "admin@nexapanel.com", ip: "192.168.1.1", time: "2 min ago", color: "green" },
  { action: "Settings Updated", user: "admin@nexapanel.com", ip: "192.168.1.1", time: "15 min ago", color: "blue" },
  { action: "Tenant Created", user: "admin@nexapanel.com", ip: "192.168.1.1", time: "1 hour ago", color: "violet" },
  { action: "Failed Login", user: "unknown@example.com", ip: "203.0.113.0", time: "2 hours ago", color: "red" },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>System activity and audit trail</p>
        </div>
      </div>

      <div className="panel-card rounded-2xl p-6">
        <div className="space-y-3">
          {logs.map((log, i) => (
            <div key={i} className="project-row p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`stat-icon-${log.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                  <HiOutlineClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{log.action}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{log.user} • {log.ip}</p>
                </div>
              </div>
              <span className="text-xs" style={{ color: "var(--text-faint)" }}>{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
