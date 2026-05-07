"use client";

import "@/app/layout/header.css";
import { HiOutlineDocumentReport } from "react-icons/hi";

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Generate and view reports</p>
        </div>
      </div>

      <div className="panel-card rounded-2xl p-6 text-center py-12">
        <div className="stat-icon-blue w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
          <HiOutlineDocumentReport className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Reports Module</h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Generate custom reports and exports</p>
      </div>
    </div>
  );
}
