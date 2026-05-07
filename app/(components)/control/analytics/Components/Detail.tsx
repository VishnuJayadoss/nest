"use client";

import "@/app/layout/header.css";
import { HiOutlineChartBar, HiOutlineTrendingUp } from "react-icons/hi";

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Platform analytics and insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="panel-card rounded-2xl p-6 text-center py-12">
          <div className="stat-icon-violet w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
            <HiOutlineChartBar className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Usage Analytics</h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Track platform usage metrics</p>
        </div>
        <div className="panel-card rounded-2xl p-6 text-center py-12">
          <div className="stat-icon-green w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
            <HiOutlineTrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Revenue Analytics</h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Monitor revenue trends</p>
        </div>
      </div>
    </div>
  );
}
