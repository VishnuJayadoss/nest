"use client";

import "@/app/layout/header.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { HiOutlineChartBar, HiOutlineTrendingUp, HiOutlineUsers, HiOutlineCreditCard } from "react-icons/hi";

// Chart Data
const usageData = [
  { month: "Jan", CRM: 4000, ERP: 2400, HRM: 2400 },
  { month: "Feb", CRM: 3000, ERP: 1398, HRM: 2210 },
  { month: "Mar", CRM: 2000, ERP: 9800, HRM: 2290 },
  { month: "Apr", CRM: 2780, ERP: 3908, HRM: 2000 },
  { month: "May", CRM: 1890, ERP: 4800, HRM: 2181 },
  { month: "Jun", CRM: 2390, ERP: 3800, HRM: 2500 },
];

const revenueData = [
  { month: "Jan", revenue: 4000, target: 5000 },
  { month: "Feb", revenue: 3000, target: 5000 },
  { month: "Mar", revenue: 2000, target: 5000 },
  { month: "Apr", revenue: 2780, target: 5000 },
  { month: "May", revenue: 1890, target: 5000 },
  { month: "Jun", revenue: 2390, target: 5000 },
];

const moduleDistribution = [
  { name: "CRM", value: 35, color: "#3b82f6" },
  { name: "ERP", value: 40, color: "#8b5cf6" },
  { name: "HRM", value: 25, color: "#10b981" },
];

const tenantGrowth = [
  { month: "Jan", tenants: 10 },
  { month: "Feb", tenants: 15 },
  { month: "Mar", tenants: 22 },
  { month: "Apr", tenants: 28 },
  { month: "May", tenants: 35 },
  { month: "Jun", tenants: 42 },
];

const ticketData = [
  { status: "Open", count: 12, color: "#3b82f6" },
  { status: "In Progress", count: 8, color: "#f59e0b" },
  { status: "Resolved", count: 45, color: "#10b981" },
  { status: "Closed", count: 35, color: "#6b7280" },
];

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
  payload: {
    month?: string;
    name?: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-2">
        <p className="text-xs text-white">{payload[0].payload.month || payload[0].payload.name}</p>
        {payload.map((entry: TooltipPayload, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Insights</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Platform analytics and performance metrics
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="panel-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Tenants</p>
              <p className="text-2xl font-bold text-white mt-1">42</p>
              <p className="text-xs mt-1 text-green-400">+12% from last month</p>
            </div>
            <div className="stat-icon-blue w-12 h-12 rounded-xl flex items-center justify-center">
              <HiOutlineUsers className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="panel-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">$16.05K</p>
              <p className="text-xs mt-1 text-green-400">+8% from last month</p>
            </div>
            <div className="stat-icon-green w-12 h-12 rounded-xl flex items-center justify-center">
              <HiOutlineCreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="panel-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Active Users</p>
              <p className="text-2xl font-bold text-white mt-1">156</p>
              <p className="text-xs mt-1 text-green-400">+5% from last month</p>
            </div>
            <div className="stat-icon-violet w-12 h-12 rounded-xl flex items-center justify-center">
              <HiOutlineChartBar className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="panel-card rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Support Tickets</p>
              <p className="text-2xl font-bold text-white mt-1">100</p>
              <p className="text-xs mt-1 text-red-400">+15% from last month</p>
            </div>
            <div className="stat-icon-orange w-12 h-12 rounded-xl flex items-center justify-center">
              <HiOutlineTrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Module Usage Chart */}
        <div className="panel-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Module Usage Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="CRM" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ERP" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="HRM" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="panel-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="revenue" fill="#3b82f6" stroke="#3b82f6" />
              <Area type="monotone" dataKey="target" fill="#10b981" stroke="#10b981" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Module Distribution */}
        <div className="panel-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Module Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={moduleDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {moduleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {moduleDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-white">{item.name}</span>
                </div>
                <span style={{ color: "var(--text-muted)" }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Growth */}
        <div className="panel-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Tenant Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tenantGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="tenants" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket Status */}
        <div className="panel-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ticket Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ticketData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <YAxis dataKey="status" type="category" stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                {ticketData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="panel-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Module Performance</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white">CRM</span>
                <span className="text-sm font-semibold text-blue-400">85%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white">ERP</span>
                <span className="text-sm font-semibold text-purple-400">92%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white">HRM</span>
                <span className="text-sm font-semibold text-green-400">78%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Daily Active Users</span>
              <span className="text-lg font-semibold text-blue-400">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Weekly Active Users</span>
              <span className="text-lg font-semibold text-purple-400">342</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Monthly Active Users</span>
              <span className="text-lg font-semibold text-green-400">512</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Avg Session Duration</span>
              <span className="text-lg font-semibold text-orange-400">24m 32s</span>
            </div>
          </div>
        </div>

        <div className="panel-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Uptime</span>
              <span className="text-lg font-semibold text-green-400">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Avg Response Time</span>
              <span className="text-lg font-semibold text-blue-400">245ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Error Rate</span>
              <span className="text-lg font-semibold text-green-400">0.02%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">API Calls/Day</span>
              <span className="text-lg font-semibold text-purple-400">2.4M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
