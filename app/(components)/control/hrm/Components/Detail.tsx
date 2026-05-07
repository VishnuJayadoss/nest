"use client";

import "@/app/layout/header.css";
import { HiOutlineBriefcase } from "react-icons/hi";

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">HRM Management</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Human Resource Management</p>
        </div>
      </div>

      <div className="panel-card rounded-2xl p-6 text-center py-12">
        <div className="stat-icon-green w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
          <HiOutlineBriefcase className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">HRM Module</h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage employees and HR processes</p>
      </div>
    </div>
  );
}
