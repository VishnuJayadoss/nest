"use client";

import { useState, type ReactNode } from "react";
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
  HiOutlineArchive,
  HiOutlineDownload,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineSwitchHorizontal,
  HiOutlineX,
} from "react-icons/hi";
import "../../erp.css";

type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock" | "Reserved" | "Damaged";

type InventoryItem = {
  product: string;
  sku: string;
  barcode: string;
  category: string;
  warehouse: string;
  available: number;
  reserved: number;
  reorder: number;
  value: string;
  status: InventoryStatus;
  supplier: string;
  notes: string;
};

const metrics = [
  { label: "Total Stock Items", value: "41,286", detail: "Across 4 warehouses", trend: "+5.2%", tone: "blue" },
  { label: "Inventory Value", value: "$1.86M", detail: "Weighted valuation", trend: "+5.8%", tone: "purple" },
  { label: "Low Stock Products", value: "86", detail: "Below reorder point", trend: "-8.1%", tone: "yellow" },
  { label: "Out of Stock Products", value: "24", detail: "Unavailable SKUs", trend: "-3.6%", tone: "red" },
  { label: "Warehouses", value: "4", detail: "Multi-site operation", trend: "+1 site", tone: "cyan" },
  { label: "Inventory Turnover", value: "6.8x", detail: "Trailing 12 months", trend: "+0.4x", tone: "green" },
] as const;

const inventory: InventoryItem[] = [
  {
    product: "Servo Motor Kit",
    sku: "SRV-MTR-204",
    barcode: "8901234502041",
    category: "Automation",
    warehouse: "North Hub",
    available: 42,
    reserved: 18,
    reorder: 60,
    value: "$10,416",
    status: "Low Stock",
    supplier: "Nova Industrial",
    notes: "Priority replenishment item for assembly line customers.",
  },
  {
    product: "Industrial Sensor Array",
    sku: "SNS-ARR-118",
    barcode: "8901234501181",
    category: "Electronics",
    warehouse: "Central Hub",
    available: 186,
    reserved: 24,
    reorder: 80,
    value: "$77,748",
    status: "In Stock",
    supplier: "Helix Components",
    notes: "High-margin SKU with stable movement.",
  },
  {
    product: "Warehouse Label Printer",
    sku: "PRN-LBL-077",
    barcode: "8901234500771",
    category: "Hardware",
    warehouse: "West Hub",
    available: 0,
    reserved: 0,
    reorder: 24,
    value: "$0",
    status: "Out of Stock",
    supplier: "PrintForge Supply",
    notes: "Backorder triggered after vendor delay.",
  },
  {
    product: "Smart Pallet Tracker",
    sku: "TRK-PLT-440",
    barcode: "8901234504401",
    category: "Logistics",
    warehouse: "South Hub",
    available: 312,
    reserved: 42,
    reorder: 100,
    value: "$37,128",
    status: "Reserved",
    supplier: "RouteIQ Systems",
    notes: "Large outbound allocation for enterprise order.",
  },
  {
    product: "Damaged Control Board",
    sku: "CTL-BRD-331",
    barcode: "8901234503312",
    category: "Electronics",
    warehouse: "Central Hub",
    available: 14,
    reserved: 0,
    reorder: 20,
    value: "$2,646",
    status: "Damaged",
    supplier: "AxisCore",
    notes: "Awaiting QA disposition and insurance review.",
  },
];

const turnover = [
  { month: "Jan", turnover: 5.6 },
  { month: "Feb", turnover: 5.9 },
  { month: "Mar", turnover: 6.1 },
  { month: "Apr", turnover: 6.3 },
  { month: "May", turnover: 6.5 },
  { month: "Jun", turnover: 6.8 },
];

const valuation = [
  { month: "Jan", value: 1280 },
  { month: "Feb", value: 1360 },
  { month: "Mar", value: 1490 },
  { month: "Apr", value: 1560 },
  { month: "May", value: 1720 },
  { month: "Jun", value: 1860 },
];

const stockTrend = [
  { week: "W1", incoming: 820, outgoing: 710, transfers: 180 },
  { week: "W2", incoming: 910, outgoing: 760, transfers: 210 },
  { week: "W3", incoming: 880, outgoing: 820, transfers: 190 },
  { week: "W4", incoming: 960, outgoing: 840, transfers: 240 },
  { week: "W5", incoming: 1020, outgoing: 890, transfers: 260 },
  { week: "W6", incoming: 1100, outgoing: 920, transfers: 280 },
];

const warehouseUtilization = [
  { name: "North Hub", usage: 91, color: "#3b82f6" },
  { name: "Central Hub", usage: 78, color: "#8b5cf6" },
  { name: "South Hub", usage: 82, color: "#06b6d4" },
  { name: "West Hub", usage: 67, color: "#f59e0b" },
];

const distribution = [
  { name: "North Hub", value: 34, color: "#3b82f6" },
  { name: "Central Hub", value: 28, color: "#8b5cf6" },
  { name: "South Hub", value: 22, color: "#06b6d4" },
  { name: "West Hub", value: 16, color: "#f59e0b" },
];

const movementCards = [
  { label: "Incoming Stock", value: "1,100", detail: "units this week", tone: "green" },
  { label: "Outgoing Stock", value: "920", detail: "units this week", tone: "blue" },
  { label: "Transfers", value: "280", detail: "inter-warehouse", tone: "purple" },
  { label: "Adjustments", value: "42", detail: "manual corrections", tone: "yellow" },
  { label: "Returns", value: "31", detail: "customer returns", tone: "cyan" },
  { label: "Damaged Stock Logs", value: "12", detail: "open incidents", tone: "red" },
] as const;

const activity = [
  { title: "Low Stock Alerts", detail: "Servo Motor Kit below reorder threshold", meta: "12m ago", tone: "yellow" },
  { title: "Recent Inventory Updates", detail: "Sensor Array stock adjusted +24", meta: "26m ago", tone: "green" },
  { title: "Pending Transfers", detail: "TR-1182 waiting for dispatch approval", meta: "39m ago", tone: "purple" },
  { title: "Warehouse Notifications", detail: "North Hub reached 91% utilization", meta: "1h ago", tone: "blue" },
  { title: "Inventory Activities", detail: "Cycle count completed in Central Hub", meta: "2h ago", tone: "gray" },
] as const;

const features = [
  "Multi-warehouse support",
  "Barcode management",
  "Stock transfers",
  "Inventory adjustments",
  "Reorder alerts",
  "Batch tracking",
  "Real-time stock updates",
  "Inventory valuation",
];

const toneClass = {
  blue: "from-blue-500/25 to-cyan-400/10 border-blue-400/20 text-blue-300",
  purple: "from-violet-500/25 to-fuchsia-400/10 border-violet-400/20 text-violet-300",
  green: "from-emerald-500/25 to-teal-400/10 border-emerald-400/20 text-emerald-300",
  cyan: "from-cyan-500/25 to-blue-400/10 border-cyan-400/20 text-cyan-300",
  yellow: "from-amber-500/25 to-yellow-400/10 border-amber-400/20 text-amber-300",
  red: "from-rose-500/25 to-red-400/10 border-rose-400/20 text-rose-300",
  gray: "from-slate-500/20 to-slate-400/5 border-slate-400/20 text-slate-300",
} as const;

const statusClass: Record<InventoryStatus, string> = {
  "In Stock": "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  "Low Stock": "bg-amber-500/15 text-amber-300 border-amber-400/20",
  "Out of Stock": "bg-rose-500/15 text-rose-300 border-rose-400/20",
  Reserved: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  Damaged: "bg-slate-500/15 text-slate-300 border-slate-400/20",
};

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur">
      <h2 className="mb-4 text-base font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function StatusBadge({ children, className }: { children: ReactNode; className: string }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}>{children}</span>;
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

export default function InventoryDetail() {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  return (
    <div className="erp-dashboard min-h-full px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <header className="erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-blue-300/80">Warehouse operations</p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Inventory Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Track stock levels, warehouses, inventory movement, and product availability.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Add Inventory", icon: <HiOutlinePlus /> },
                { label: "Stock Transfer", icon: <HiOutlineSwitchHorizontal /> },
                { label: "Export", icon: <HiOutlineDownload /> },
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
          {metrics.map((item) => (
            <div key={item.label} className={`erp-glow-card rounded-3xl border bg-linear-to-br p-5 ${toneClass[item.tone]}`}>
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-white">{item.value}</p>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-400">{item.detail}</span>
                <span className="rounded-full bg-slate-950/40 px-2.5 py-1 font-semibold">{item.trend}</span>
              </div>
            </div>
          ))}
        </section>

        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <Panel title="Inventory Table">
              <div className="max-h-[420px] overflow-auto rounded-2xl border border-white/10">
                <table className="min-w-full border-separate border-spacing-0 text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-950/95 text-left text-slate-400 backdrop-blur">
                    <tr>
                      {["Product Name", "SKU", "Category", "Warehouse", "Available Stock", "Reserved Stock", "Reorder Level", "Inventory Value", "Status", "Actions"].map((head) => (
                        <th key={head} className="border-b border-white/10 px-4 py-3 font-medium">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.sku} onClick={() => setSelectedItem(item)} className="cursor-pointer transition hover:bg-white/[0.035]">
                        <td className="border-b border-white/5 px-4 py-4 font-medium text-white">{item.product}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{item.sku}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{item.category}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{item.warehouse}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{item.available}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{item.reserved}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{item.reorder}</td>
                        <td className="border-b border-white/5 px-4 py-4 font-semibold text-white">{item.value}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={statusClass[item.status]}>{item.status}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {["View", "Edit", "Transfer", "Adjust Stock", "Delete"].map((action) => (
                              <button
                                key={action}
                                onClick={(event) => event.stopPropagation()}
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

            <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <Panel title="Warehouse Overview">
                <div className="grid gap-4 md:grid-cols-2">
                  {warehouseUtilization.map((warehouse) => (
                    <div key={warehouse.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white">{warehouse.name}</p>
                        <span className="text-sm text-slate-400">{warehouse.usage}%</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full" style={{ width: `${warehouse.usage}%`, backgroundColor: warehouse.color }} />
                      </div>
                      <p className="mt-2 text-xs text-slate-400">Capacity indicator</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={stockTrend}>
                      <defs>
                        <linearGradient id="incoming" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                      <XAxis dataKey="week" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend />
                      <Area type="monotone" dataKey="incoming" name="Incoming" stroke="#3b82f6" fill="url(#incoming)" strokeWidth={2.5} />
                      <Line type="monotone" dataKey="outgoing" name="Outgoing" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="transfers" name="Transfers" stroke="#10b981" strokeWidth={2.5} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Panel>

              <Panel title="Stock Distribution Graph">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie data={distribution} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={4}>
                      {distribution.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-2">
                  {distribution.map((item) => (
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

            <section className="grid gap-5 xl:grid-cols-2">
              <Panel title="Inventory Analytics">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={turnover}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Line type="monotone" dataKey="turnover" name="Turnover" stroke="#06b6d4" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Stock Valuation Graph">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={valuation}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="value" name="Value ($K)" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>
            </section>

            <Panel title="Stock Movement">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {movementCards.map((item) => (
                  <div key={item.label} className={`rounded-2xl border bg-linear-to-br p-4 ${toneClass[item.tone]}`}>
                    <p className="text-sm text-slate-300">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <section className="grid gap-5 xl:grid-cols-3">
              <Panel title="Fast Moving Products">
                <ListBlock items={["Smart Pallet Tracker", "Servo Motor Kit", "Industrial Sensor Array"]} />
              </Panel>
              <Panel title="Slow Moving Inventory">
                <ListBlock items={["Legacy Control Board", "Modular Rack Frame", "Cable Harness Kit"]} />
              </Panel>
              <Panel title="Warehouse Performance">
                <ListBlock items={["North Hub · 96% SLA", "Central Hub · 94% SLA", "South Hub · 97% SLA"]} />
              </Panel>
            </section>
          </div>

          <aside className="space-y-5">
            <Panel title="Filters">
              <div className="space-y-3">
                {["Filter by Warehouse", "Filter by Category", "Filter by Status", "Filter by Supplier", "Filter by Stock Level", "Date Range Picker"].map((item) => (
                  <button key={item} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300 transition hover:border-blue-400/30 hover:bg-white/[0.045]">
                    {item}
                    <span className="text-slate-500">▾</span>
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Activity Panel">
              <div className="space-y-3">
                {activity.map((item) => (
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

            <Panel title="ERP Inventory Features">
              <div className="flex flex-wrap gap-2">
                {features.map((feature) => (
                  <span key={feature} className="rounded-full border border-blue-400/15 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-200">
                    {feature}
                  </span>
                ))}
              </div>
            </Panel>
          </aside>
        </div>
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/60 backdrop-blur-sm">
          <button aria-label="Close inventory detail drawer" className="flex-1 cursor-default" onClick={() => setSelectedItem(null)} />
          <aside className="erp-drawer h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0a1020]/95 p-5 shadow-2xl shadow-slate-950/70">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-300/80">Inventory detail</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{selectedItem.product}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedItem.sku}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:text-white"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailCard title="Product Information">
                <DetailRow label="Category" value={selectedItem.category} />
                <DetailRow label="Status" value={selectedItem.status} />
              </DetailCard>
              <DetailCard title="SKU & Barcode">
                <DetailRow label="SKU" value={selectedItem.sku} />
                <DetailRow label="Barcode" value={selectedItem.barcode} />
              </DetailCard>
              <DetailCard title="Warehouse Details">
                <DetailRow label="Warehouse" value={selectedItem.warehouse} />
                <DetailRow label="Inventory value" value={selectedItem.value} />
              </DetailCard>
              <DetailCard title="Current Stock">
                <DetailRow label="Available" value={`${selectedItem.available}`} />
                <DetailRow label="Reserved" value={`${selectedItem.reserved}`} />
                <DetailRow label="Reorder level" value={`${selectedItem.reorder}`} />
              </DetailCard>
            </div>

            <div className="mt-4 grid gap-4">
              <DetailCard title="Stock Movement History">
                <p className="text-sm text-slate-300">+48 received · -26 shipped · +12 transfer-in this week</p>
              </DetailCard>
              <DetailCard title="Supplier Information">
                <DetailRow label="Supplier" value={selectedItem.supplier} />
                <DetailRow label="Lead time" value="6 days" />
              </DetailCard>
              <DetailCard title="Purchase History">
                <p className="text-sm text-slate-300">Last PO received May 2, 2026 · 120 units</p>
              </DetailCard>
              <DetailCard title="Sales History">
                <p className="text-sm text-slate-300">184 units sold in the last 30 days</p>
              </DetailCard>
              <DetailCard title="Reorder Settings">
                <DetailRow label="Threshold" value={`${selectedItem.reorder}`} />
                <DetailRow label="Safety stock" value="20 units" />
              </DetailCard>
              <DetailCard title="Notes & Attachments">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">{selectedItem.notes}</div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
                    <HiOutlineArchive className="text-blue-300" />
                    cycle-count-report.pdf
                  </div>
                </div>
              </DetailCard>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function ListBlock({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
          {item}
        </div>
      ))}
    </div>
  );
}

function DetailCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <p className="mb-3 text-sm font-medium text-white">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right text-slate-200">{value}</span>
    </div>
  );
}
