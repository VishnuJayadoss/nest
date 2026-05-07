"use client";

import "@/app/layout/header.css";
import { HiOutlineSupport, HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";

const tickets = [
  { id: "#1234", tenant: "Acme Corp", subject: "Login issue", status: "Open", priority: "High", color: "red" },
  { id: "#1235", tenant: "TechStart Inc", subject: "Feature request", status: "In Progress", priority: "Medium", color: "orange" },
  { id: "#1236", tenant: "DataFlow Ltd", subject: "Billing question", status: "Resolved", priority: "Low", color: "green" },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage customer support requests</p>
        </div>
      </div>

      <div className="panel-card rounded-2xl p-6">
        <div className="space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="project-row p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`stat-icon-${t.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                  <HiOutlineSupport className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.subject}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{t.id} • {t.tenant}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`project-status ${t.status.toLowerCase().replace(" ", "-")}`}>{t.status}</span>
                <span className="text-xs" style={{ color: "var(--text-faint)" }}>{t.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
