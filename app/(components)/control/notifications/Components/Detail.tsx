"use client";

import "@/app/layout/header.css";
import { HiOutlineBell } from "react-icons/hi";

const notifications = [
  { title: "New tenant signup", message: "Acme Corp has signed up", time: "5 min ago", color: "green" },
  { title: "Payment received", message: "TechStart Inc paid $890", time: "1 hour ago", color: "blue" },
  { title: "Support ticket", message: "New ticket from DataFlow Ltd", time: "2 hours ago", color: "orange" },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>System notifications and alerts</p>
        </div>
      </div>

      <div className="panel-card rounded-2xl p-6">
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <div key={i} className="project-row p-4 rounded-xl flex items-center gap-4">
              <div className={`stat-icon-${n.color} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                <HiOutlineBell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{n.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{n.message}</p>
              </div>
              <span className="text-xs shrink-0" style={{ color: "var(--text-faint)" }}>{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
