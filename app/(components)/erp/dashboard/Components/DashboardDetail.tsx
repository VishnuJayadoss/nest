"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineCube,
  HiOutlineDocumentReport,
  HiOutlineExclamationCircle,
  HiOutlineFilter,
  HiOutlineReceiptTax,
  HiOutlineShoppingCart,
  HiOutlineTruck,
} from "react-icons/hi";
import "../../erp.css";

const kpis = [
  { label: "Total Revenue", value: "$4.28M", description: "Gross booked revenue", trend: "+12.4%", tone: "blue" },
  { label: "Inventory Value", value: "$1.86M", description: "Across 4 warehouses", trend: "+5.8%", tone: "purple" },
  { label: "Sales Orders", value: "1,284", description: "Open and fulfilled", trend: "+9.1%", tone: "green" },
  { label: "Purchase Orders", value: "326", description: "Active supplier POs", trend: "+3.6%", tone: "cyan" },
  { label: "Pending Payments", value: "$248K", description: "Awaiting settlement", trend: "-4.2%", tone: "yellow" },
  { label: "Net Profit", value: "$892K", description: "Current fiscal month", trend: "+14.7%", tone: "pink" },
] as const;

const revenueGrowth = [
  { month: "Jan", revenue: 420, profit: 98 },
  { month: "Feb", revenue: 460, profit: 112 },
  { month: "Mar", revenue: 510, profit: 126 },
  { month: "Apr", revenue: 545, profit: 138 },
  { month: "May", revenue: 590, profit: 151 },
  { month: "Jun", revenue: 642, profit: 168 },
];

const inventoryTrend = [
  { week: "W1", available: 8400, reserved: 2200 },
  { week: "W2", available: 8100, reserved: 2400 },
  { week: "W3", available: 8600, reserved: 2300 },
  { week: "W4", available: 9020, reserved: 2510 },
  { week: "W5", available: 8760, reserved: 2680 },
  { week: "W6", available: 9180, reserved: 2730 },
];

const salesPurchases = [
  { month: "Jan", sales: 380, purchases: 250 },
  { month: "Feb", sales: 420, purchases: 270 },
  { month: "Mar", sales: 465, purchases: 310 },
  { month: "Apr", sales: 490, purchases: 330 },
  { month: "May", sales: 540, purchases: 348 },
  { month: "Jun", sales: 582, purchases: 364 },
];

const expenseBreakdown = [
  { name: "COGS", value: 42, color: "#3b82f6" },
  { name: "Payroll", value: 24, color: "#8b5cf6" },
  { name: "Logistics", value: 14, color: "#06b6d4" },
  { name: "Operations", value: 12, color: "#f59e0b" },
  { name: "Other", value: 8, color: "#64748b" },
];

const orderPerformance = [
  { day: "Mon", onTime: 93, delayed: 7 },
  { day: "Tue", onTime: 95, delayed: 5 },
  { day: "Wed", onTime: 91, delayed: 9 },
  { day: "Thu", onTime: 96, delayed: 4 },
  { day: "Fri", onTime: 94, delayed: 6 },
  { day: "Sat", onTime: 97, delayed: 3 },
];

const inventoryCards = [
  { title: "Low Stock Products", value: "18 SKUs", helper: "6 need reorder today", progress: 72, badge: "Attention", tone: "yellow" },
  { title: "Out of Stock", value: "7 SKUs", helper: "2 critical items", progress: 28, badge: "Alert", tone: "red" },
  { title: "Warehouse Usage", value: "81%", helper: "North hub near capacity", progress: 81, badge: "Healthy", tone: "blue" },
  { title: "Top Selling Products", value: "Industrial Kits", helper: "1,284 units this month", progress: 88, badge: "Leading", tone: "green" },
  { title: "Inventory Alerts", value: "12 Open", helper: "4 supplier delays", progress: 54, badge: "Review", tone: "purple" },
] as const;

const warehouses = [
  { name: "North Hub", usage: 91, units: "12,480 units" },
  { name: "West Hub", usage: 74, units: "9,160 units" },
  { name: "Central Hub", usage: 68, units: "8,420 units" },
  { name: "South Hub", usage: 82, units: "10,910 units" },
];

const salesOrders = [
  { id: "SO-10482", customer: "Apex Manufacturing", products: 12, amount: "$24,800", payment: "Paid", delivery: "Delivered", date: "May 14, 2026" },
  { id: "SO-10481", customer: "Nova Retail Group", products: 8, amount: "$12,460", payment: "Pending", delivery: "Processing", date: "May 14, 2026" },
  { id: "SO-10477", customer: "Orion Systems", products: 16, amount: "$38,920", payment: "Paid", delivery: "Shipped", date: "May 13, 2026" },
  { id: "SO-10469", customer: "BluePeak Logistics", products: 5, amount: "$8,740", payment: "Failed", delivery: "Cancelled", date: "May 12, 2026" },
  { id: "SO-10463", customer: "Helix Components", products: 10, amount: "$17,580", payment: "Pending", delivery: "Processing", date: "May 11, 2026" },
];

const purchaseSummary = [
  { title: "Recent Purchase Orders", value: "46", detail: "$612K committed", trend: "+8.4%" },
  { title: "Vendor Performance", value: "94.2%", detail: "On-time fulfillment", trend: "+2.1%" },
  { title: "Pending Deliveries", value: "19", detail: "4 due today", trend: "-6.5%" },
  { title: "Supplier Payments", value: "$184K", detail: "Due in 7 days", trend: "+1.8%" },
];

const financeCards = [
  { title: "Profit & Loss", value: "$892K", detail: "Net margin 20.8%", trend: "+14.7%" },
  { title: "Cash Flow", value: "$1.14M", detail: "Free cash available", trend: "+7.9%" },
  { title: "Tax Summary", value: "$126K", detail: "Estimated liability", trend: "+3.2%" },
  { title: "Revenue Forecast", value: "$4.61M", detail: "Next 30 days", trend: "+9.6%" },
];

const activityFeed = [
  { title: "Recent Transactions", detail: "Invoice INV-2084 paid by Apex Manufacturing", meta: "$24,800 · 12m ago", tone: "green" },
  { title: "Inventory Alerts", detail: "Servo Motor Kit fell below reorder point", meta: "North Hub · 28m ago", tone: "yellow" },
  { title: "Pending Approvals", detail: "PO-7741 awaiting finance approval", meta: "$42,600 · 42m ago", tone: "purple" },
  { title: "Delivery Updates", detail: "Shipment SH-8892 reached Bengaluru DC", meta: "ETA 3h · 1h ago", tone: "blue" },
  { title: "ERP Notifications", detail: "Monthly tax filing window opens tomorrow", meta: "Accounting · 2h ago", tone: "gray" },
] as const;

const features = [
  "Multi-warehouse support",
  "Invoice generation",
  "Inventory tracking",
  "Purchase management",
  "Financial accounting",
  "Vendor management",
  "Real-time ERP analytics",
];

const toneClass = {
  blue: "from-blue-500/25 to-cyan-400/10 border-blue-400/20 text-blue-300",
  purple: "from-violet-500/25 to-fuchsia-400/10 border-violet-400/20 text-violet-300",
  green: "from-emerald-500/25 to-teal-400/10 border-emerald-400/20 text-emerald-300",
  cyan: "from-cyan-500/25 to-blue-400/10 border-cyan-400/20 text-cyan-300",
  yellow: "from-amber-500/25 to-yellow-400/10 border-amber-400/20 text-amber-300",
  pink: "from-fuchsia-500/25 to-pink-400/10 border-fuchsia-400/20 text-fuchsia-300",
  red: "from-rose-500/25 to-red-400/10 border-rose-400/20 text-rose-300",
  gray: "from-slate-500/20 to-slate-400/5 border-slate-400/20 text-slate-300",
} as const;

const paymentStatus = {
  Paid: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  Pending: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  Failed: "bg-rose-500/15 text-rose-300 border-rose-400/20",
};

const deliveryStatus = {
  Processing: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  Shipped: "bg-violet-500/15 text-violet-300 border-violet-400/20",
  Delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  Cancelled: "bg-slate-500/15 text-slate-300 border-slate-400/20",
};

function Panel({
  title,
  children,
  className = "",
  action,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <section className={`erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number | string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-3 py-2 text-xs shadow-2xl">
      {label ? <p className="mb-1 text-slate-400">{label}</p> : null}
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }}>
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}

function StatusBadge({ children, className }: { children: ReactNode; className: string }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}>{children}</span>;
}

export default function DashboardDetail() {
  return (
    <div className="erp-dashboard min-h-full px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <header className="erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-blue-300/80">Enterprise resource planning</p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">ERP Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Monitor inventory, finance, sales, operations, and business performance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Create Invoice", icon: <HiOutlineReceiptTax /> },
                { label: "Add Product", icon: <HiOutlineCube /> },
                { label: "Generate Report", icon: <HiOutlineDocumentReport /> },
                { label: "Filter", icon: <HiOutlineFilter /> },
              ].map((item, index) => (
                <button
                  key={item.label}
                  className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                    index === 0
                      ? "border-blue-400/20 bg-linear-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-950/40"
                      : "border-white/10 bg-white/[0.045] text-slate-200 hover:border-blue-400/30 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {kpis.map((item) => (
            <div key={item.label} className={`erp-glow-card rounded-3xl border bg-linear-to-br p-5 ${toneClass[item.tone]}`}>
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-white">{item.value}</p>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-400">{item.description}</span>
                <span className="rounded-full bg-slate-950/40 px-2.5 py-1 font-semibold">{item.trend}</span>
              </div>
            </div>
          ))}
        </section>

        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <section className="grid gap-5 xl:grid-cols-2">
              <Panel title="Revenue Growth Chart">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueGrowth}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue ($K)" stroke="#3b82f6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="profit" name="Profit ($K)" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Inventory Stock Trend">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={inventoryTrend}>
                    <defs>
                      <linearGradient id="available" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="week" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="available" name="Available Units" stroke="#06b6d4" fill="url(#available)" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="reserved" name="Reserved Units" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <Panel title="Sales vs Purchases">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={salesPurchases}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Bar dataKey="sales" name="Sales ($K)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="purchases" name="Purchases ($K)" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Expense Analytics">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie data={expenseBreakdown} innerRadius={48} outerRadius={78} dataKey="value" paddingAngle={4}>
                      {expenseBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-2">
                  {expenseBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </span>
                      <span className="text-slate-400">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </section>

            <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <Panel title="Monthly Profit Graph">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueGrowth}>
                    <defs>
                      <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="profit" name="Profit ($K)" stroke="#8b5cf6" fill="url(#profit)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Order Performance">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={orderPerformance}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Bar dataKey="onTime" stackId="a" name="On-time %" fill="#10b981" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="delayed" stackId="a" name="Delayed %" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>
            </section>

            <Panel title="Inventory Management">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {inventoryCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-slate-300">{card.title}</p>
                      <StatusBadge className={toneClass[card.tone]}>{card.badge}</StatusBadge>
                    </div>
                    <p className="mt-4 text-2xl font-semibold text-white">{card.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{card.helper}</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full bg-linear-to-r ${toneClass[card.tone].split(" ").slice(0, 2).join(" ")}`}
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {warehouses.map((warehouse) => (
                  <div key={warehouse.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{warehouse.name}</p>
                      <span className="text-sm text-slate-400">{warehouse.units}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500" style={{ width: `${warehouse.usage}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{warehouse.usage}% warehouse usage</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Sales Orders">
              <div className="max-h-[360px] overflow-auto rounded-2xl border border-white/10">
                <table className="min-w-full border-separate border-spacing-0 text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-950/95 text-left text-slate-400 backdrop-blur">
                    <tr>
                      {["Order ID", "Customer", "Product Count", "Amount", "Payment Status", "Delivery Status", "Order Date", "Actions"].map((head) => (
                        <th key={head} className="border-b border-white/10 px-4 py-3 font-medium">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {salesOrders.map((order) => (
                      <tr key={order.id} className="group transition hover:bg-white/[0.035]">
                        <td className="border-b border-white/5 px-4 py-4 font-medium text-white">{order.id}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{order.customer}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{order.products}</td>
                        <td className="border-b border-white/5 px-4 py-4 font-semibold text-white">{order.amount}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={paymentStatus[order.payment as keyof typeof paymentStatus]}>{order.payment}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={deliveryStatus[order.delivery as keyof typeof deliveryStatus]}>{order.delivery}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-400">{order.date}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {["View", "Edit", "Invoice", "Delete"].map((action) => (
                              <button
                                key={action}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300 transition hover:border-blue-400/30 hover:text-white"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <section className="grid gap-5 xl:grid-cols-2">
              <Panel title="Purchase & Vendor">
                <div className="grid gap-3 sm:grid-cols-2">
                  {purchaseSummary.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <p className="text-sm text-slate-400">{item.title}</p>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <p className="text-2xl font-semibold text-white">{item.value}</p>
                        <span className="text-xs font-medium text-emerald-300">{item.trend}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-medium text-white">Purchase Analytics</p>
                    <span className="text-xs text-slate-400">Supplier score 94 / 100</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[94%] rounded-full bg-linear-to-r from-cyan-500 to-blue-500" />
                  </div>
                </div>
              </Panel>

              <Panel title="Financial Overview">
                <div className="grid gap-3 sm:grid-cols-2">
                  {financeCards.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <p className="text-sm text-slate-400">{item.title}</p>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <p className="text-2xl font-semibold text-white">{item.value}</p>
                        <span className="text-xs font-medium text-emerald-300">{item.trend}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </section>
          </div>

          <aside className="space-y-5">
            <Panel title="Filters">
              <div className="space-y-3">
                {["Filter by Date Range", "Filter by Warehouse", "Filter by Product Category", "Filter by Status", "Filter by Vendor"].map((filter) => (
                  <button
                    key={filter}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300 transition hover:border-blue-400/30 hover:bg-white/[0.045]"
                  >
                    {filter}
                    <span className="text-slate-500">▾</span>
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Activity Panel">
              <div className="space-y-3">
                {activityFeed.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <div className="flex items-start gap-3">
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full bg-linear-to-r ${toneClass[item.tone].split(" ").slice(0, 2).join(" ")}`} />
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
                        <p className="mt-2 text-xs text-slate-500">{item.meta}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="ERP Features">
              <div className="flex flex-wrap gap-2">
                {features.map((feature) => (
                  <span key={feature} className="rounded-full border border-blue-400/15 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-200">
                    {feature}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title="Operational Pulse">
              <div className="space-y-4">
                {[
                  { icon: <HiOutlineShoppingCart />, label: "Orders fulfilled", value: "94.6%" },
                  { icon: <HiOutlineTruck />, label: "On-time delivery", value: "96.8%" },
                  { icon: <HiOutlineClipboardList />, label: "Pending approvals", value: "11" },
                  { icon: <HiOutlineChartBar />, label: "Forecast accuracy", value: "91.2%" },
                  { icon: <HiOutlineExclamationCircle />, label: "Critical alerts", value: "4" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-300">{item.icon}</span>
                      <span className="text-sm text-slate-300">{item.label}</span>
                    </div>
                    <span className="font-semibold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </aside>
        </div>
      </div>
    </div>
  );
}
