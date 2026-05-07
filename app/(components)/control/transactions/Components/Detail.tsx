"use client";

import "@/app/layout/header.css";
import { HiOutlineCash, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle } from "react-icons/hi";

const transactions = [
  { tenant: "Acme Corp", amount: "$2,450", status: "Paid", date: "Dec 15, 2024", method: "Credit Card", color: "green" },
  { tenant: "TechStart Inc", amount: "$890", status: "Paid", date: "Dec 14, 2024", method: "PayPal", color: "green" },
  { tenant: "DataFlow Ltd", amount: "$1,560", status: "Pending", date: "Dec 16, 2024", method: "Bank Transfer", color: "orange" },
  { tenant: "NexaCorp", amount: "$450", status: "Failed", date: "Dec 13, 2024", method: "Credit Card", color: "red" },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>View all payment transactions</p>
        </div>
      </div>

      <div className="panel-card rounded-2xl p-6">
        <div className="space-y-3">
          {transactions.map((t, i) => (
            <div key={i} className="project-row p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`stat-icon-${t.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                  <HiOutlineCash className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.tenant}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{t.method} • {t.date}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="text-sm font-bold text-white">{t.amount}</p>
                  <span className={`project-status ${t.status.toLowerCase()}`}>{t.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
