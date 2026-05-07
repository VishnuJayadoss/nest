"use client";

import "@/app/layout/header.css";
import { HiOutlinePuzzle } from "react-icons/hi";

const integrations = [
  { name: "Stripe", description: "Payment processing", status: "Connected", color: "violet" },
  { name: "SendGrid", description: "Email service", status: "Connected", color: "blue" },
  { name: "Slack", description: "Team communication", status: "Not Connected", color: "orange" },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage third-party integrations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {integrations.map((int) => (
          <div key={int.name} className={`ac-product-card ac-card-${int.color} p-6 rounded-2xl`}>
            <div className={`ac-icon-${int.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
              <HiOutlinePuzzle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{int.name}</h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{int.description}</p>
            <span className={`project-status ${int.status === "Connected" ? "active" : "pending"}`}>{int.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
