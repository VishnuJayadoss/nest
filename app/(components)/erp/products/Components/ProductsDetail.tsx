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
  HiOutlineCube,
  HiOutlineDocumentDuplicate,
  HiOutlineDownload,
  HiOutlineFilter,
  HiOutlinePhotograph,
  HiOutlinePlus,
  HiOutlineUpload,
  HiOutlineX,
} from "react-icons/hi";
import "../../erp.css";

type ProductStatus = "Active" | "Draft" | "Out of Stock" | "Low Stock" | "Archived";

type Product = {
  name: string;
  sku: string;
  barcode: string;
  category: string;
  brand: string;
  price: string;
  stock: number;
  warehouse: string;
  status: ProductStatus;
  updated: string;
  supplier: string;
  reorderPoint: number;
  salesHistory: string;
  purchaseHistory: string;
};

const metrics = [
  { label: "Total Products", value: "2,486", detail: "Across 18 categories", trend: "+6.4%", tone: "blue" },
  { label: "Active Products", value: "2,104", detail: "Sellable catalog", trend: "+4.8%", tone: "green" },
  { label: "Low Stock Items", value: "86", detail: "Need replenishment", trend: "-8.1%", tone: "yellow" },
  { label: "Out of Stock", value: "24", detail: "Unavailable SKUs", trend: "-3.6%", tone: "red" },
  { label: "Total Inventory Value", value: "$1.86M", detail: "Weighted cost basis", trend: "+5.8%", tone: "purple" },
  { label: "Top Selling Products", value: "148", detail: "Fast movers this month", trend: "+11.2%", tone: "cyan" },
] as const;

const products: Product[] = [
  {
    name: "Servo Motor Kit",
    sku: "SRV-MTR-204",
    barcode: "8901234502041",
    category: "Automation",
    brand: "AxisCore",
    price: "$248.00",
    stock: 42,
    warehouse: "North Hub",
    status: "Low Stock",
    updated: "May 15, 2026",
    supplier: "Nova Industrial",
    reorderPoint: 60,
    salesHistory: "184 units sold in 30 days",
    purchaseHistory: "Last PO: 120 units on May 2",
  },
  {
    name: "Industrial Sensor Array",
    sku: "SNS-ARR-118",
    barcode: "8901234501181",
    category: "Electronics",
    brand: "Helix",
    price: "$418.00",
    stock: 186,
    warehouse: "Central Hub",
    status: "Active",
    updated: "May 15, 2026",
    supplier: "Helix Components",
    reorderPoint: 80,
    salesHistory: "96 units sold in 30 days",
    purchaseHistory: "Last PO: 90 units on Apr 28",
  },
  {
    name: "Warehouse Label Printer",
    sku: "PRN-LBL-077",
    barcode: "8901234500771",
    category: "Hardware",
    brand: "PrintForge",
    price: "$329.00",
    stock: 0,
    warehouse: "West Hub",
    status: "Out of Stock",
    updated: "May 14, 2026",
    supplier: "PrintForge Supply",
    reorderPoint: 24,
    salesHistory: "42 units sold in 30 days",
    purchaseHistory: "PO pending approval",
  },
  {
    name: "Smart Pallet Tracker",
    sku: "TRK-PLT-440",
    barcode: "8901234504401",
    category: "Logistics",
    brand: "RouteIQ",
    price: "$119.00",
    stock: 312,
    warehouse: "South Hub",
    status: "Active",
    updated: "May 13, 2026",
    supplier: "RouteIQ Systems",
    reorderPoint: 100,
    salesHistory: "226 units sold in 30 days",
    purchaseHistory: "Last PO: 240 units on Apr 30",
  },
  {
    name: "Modular Rack Frame",
    sku: "RCK-FRM-009",
    barcode: "8901234500092",
    category: "Storage",
    brand: "Structa",
    price: "$579.00",
    stock: 64,
    warehouse: "North Hub",
    status: "Draft",
    updated: "May 12, 2026",
    supplier: "Structa Works",
    reorderPoint: 30,
    salesHistory: "Launch scheduled for June",
    purchaseHistory: "Initial PO received",
  },
  {
    name: "Legacy Control Board",
    sku: "CTL-BRD-331",
    barcode: "8901234503312",
    category: "Electronics",
    brand: "AxisCore",
    price: "$189.00",
    stock: 14,
    warehouse: "Central Hub",
    status: "Archived",
    updated: "May 10, 2026",
    supplier: "AxisCore",
    reorderPoint: 20,
    salesHistory: "Discontinued product",
    purchaseHistory: "No active purchasing",
  },
];

const stockMovement = [
  { month: "Jan", inbound: 420, outbound: 360 },
  { month: "Feb", inbound: 460, outbound: 395 },
  { month: "Mar", inbound: 510, outbound: 438 },
  { month: "Apr", inbound: 488, outbound: 452 },
  { month: "May", inbound: 560, outbound: 504 },
  { month: "Jun", inbound: 610, outbound: 548 },
];

const inventoryValuation = [
  { month: "Jan", value: 1280 },
  { month: "Feb", value: 1360 },
  { month: "Mar", value: 1490 },
  { month: "Apr", value: 1560 },
  { month: "May", value: 1720 },
  { month: "Jun", value: 1860 },
];

const salesPerformance = [
  { category: "Automation", revenue: 412 },
  { category: "Electronics", revenue: 368 },
  { category: "Logistics", revenue: 284 },
  { category: "Storage", revenue: 192 },
  { category: "Hardware", revenue: 164 },
];

const warehouseDistribution = [
  { name: "North Hub", value: 34, color: "#3b82f6" },
  { name: "Central Hub", value: 28, color: "#8b5cf6" },
  { name: "South Hub", value: 22, color: "#06b6d4" },
  { name: "West Hub", value: 16, color: "#f59e0b" },
];

const activity = [
  { title: "Recently Added Products", detail: "12 new SKUs imported from Structa Works", meta: "18m ago", tone: "blue" },
  { title: "Inventory Alerts", detail: "Servo Motor Kit is below reorder point", meta: "28m ago", tone: "yellow" },
  { title: "Product Updates", detail: "7 prices revised after supplier cost change", meta: "46m ago", tone: "purple" },
  { title: "Pending Approvals", detail: "4 draft products await merchandising review", meta: "1h ago", tone: "gray" },
  { title: "Supplier Notifications", detail: "PrintForge shipment delayed by 2 days", meta: "2h ago", tone: "red" },
] as const;

const features = [
  "Multi-warehouse inventory",
  "SKU generation",
  "Barcode support",
  "Product variants",
  "Bulk import/export",
  "Product categories",
  "Supplier linking",
  "Inventory tracking",
  "Price management",
];

const topSellers = [
  { name: "Smart Pallet Tracker", units: 226, growth: "+18%" },
  { name: "Servo Motor Kit", units: 184, growth: "+11%" },
  { name: "Industrial Sensor Array", units: 96, growth: "+7%" },
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

const statusClass: Record<ProductStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  Draft: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  "Out of Stock": "bg-rose-500/15 text-rose-300 border-rose-400/20",
  "Low Stock": "bg-amber-500/15 text-amber-300 border-amber-400/20",
  Archived: "bg-slate-500/15 text-slate-300 border-slate-400/20",
};

function Panel({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur ${className}`}>
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

export default function ProductsDetail() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const activeProduct = selectedProduct;

  return (
    <div className="erp-dashboard min-h-full px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <header className="erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-blue-300/80">Catalog operations</p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Products Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Manage products, pricing, inventory, SKUs, stock levels, and product analytics.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Add Product", icon: <HiOutlinePlus /> },
                { label: "Import Products", icon: <HiOutlineUpload /> },
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
            <Panel title="Products Table">
              <div className="max-h-[430px] overflow-auto rounded-2xl border border-white/10">
                <table className="min-w-full border-separate border-spacing-0 text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-950/95 text-left text-slate-400 backdrop-blur">
                    <tr>
                      {["Product Image", "Product Name", "SKU", "Category", "Price", "Stock Quantity", "Warehouse", "Status", "Last Updated", "Actions"].map((head) => (
                        <th key={head} className="border-b border-white/10 px-4 py-3 font-medium">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.sku}
                        onClick={() => setSelectedProduct(product)}
                        className="cursor-pointer transition hover:bg-white/[0.035]"
                      >
                        <td className="border-b border-white/5 px-4 py-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-blue-500/20 to-violet-500/20 text-blue-200">
                            <HiOutlineCube className="h-5 w-5" />
                          </div>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4 font-medium text-white">{product.name}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{product.sku}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{product.category}</td>
                        <td className="border-b border-white/5 px-4 py-4 font-semibold text-white">{product.price}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{product.stock}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{product.warehouse}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={statusClass[product.status]}>{product.status}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-400">{product.updated}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {["View", "Edit", "Duplicate", "Archive", "Delete"].map((action) => (
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

            <section className="grid gap-5 xl:grid-cols-2">
              <Panel title="Inventory Overview">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={stockMovement}>
                    <defs>
                      <linearGradient id="inbound" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="inbound" name="Inbound Units" stroke="#3b82f6" fill="url(#inbound)" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="outbound" name="Outbound Units" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Warehouse Stock Distribution">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie data={warehouseDistribution} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={4}>
                      {warehouseDistribution.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-2">
                  {warehouseDistribution.map((item) => (
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

            <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel title="Product Analytics">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={salesPerformance}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="category" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="revenue" name="Revenue ($K)" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Inventory Valuation Graph">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={inventoryValuation}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Line type="monotone" dataKey="value" name="Value ($K)" stroke="#10b981" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Panel>
            </section>

            <section className="grid gap-5 xl:grid-cols-3">
              <Panel title="Low Stock Alerts">
                <div className="space-y-3">
                  {products.filter((product) => product.status === "Low Stock" || product.status === "Out of Stock").map((product) => (
                    <div key={product.sku} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white">{product.name}</p>
                        <StatusBadge className={statusClass[product.status]}>{product.status}</StatusBadge>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">
                        {product.stock} in stock · reorder point {product.reorderPoint}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Fast Moving Products">
                <div className="space-y-3">
                  {topSellers.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white">{item.name}</p>
                        <span className="text-sm font-medium text-emerald-300">{item.growth}</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">{item.units} units sold this month</p>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Product Performance Metrics">
                <div className="space-y-4">
                  {[
                    { label: "Sell-through rate", value: "78%" },
                    { label: "Average gross margin", value: "31%" },
                    { label: "Variant coverage", value: "84%" },
                    { label: "Catalog completeness", value: "96%" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-semibold text-white">{item.value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500" style={{ width: item.value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </section>
          </div>

          <aside className="space-y-5">
            <Panel title="Filters">
              <div className="space-y-3">
                {["Filter by Category", "Filter by Warehouse", "Filter by Status", "Filter by Stock Level", "Filter by Supplier", "Date Range Picker"].map((item) => (
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

            <Panel title="ERP Product Features">
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

      {activeProduct ? (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/60 backdrop-blur-sm">
          <button aria-label="Close product detail drawer" className="flex-1 cursor-default" onClick={() => setSelectedProduct(null)} />
          <aside className="erp-drawer h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0a1020]/95 p-5 shadow-2xl shadow-slate-950/70">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-300/80">Product detail</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{activeProduct.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{activeProduct.sku}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:text-white"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailCard title="Product Information">
                <DetailRow label="Status" value={activeProduct.status} />
                <DetailRow label="Category" value={activeProduct.category} />
                <DetailRow label="Brand" value={activeProduct.brand} />
              </DetailCard>
              <DetailCard title="SKU & Barcode">
                <DetailRow label="SKU" value={activeProduct.sku} />
                <DetailRow label="Barcode" value={activeProduct.barcode} />
              </DetailCard>
              <DetailCard title="Pricing Details">
                <DetailRow label="List price" value={activeProduct.price} />
                <DetailRow label="Margin" value="31%" />
                <DetailRow label="Tax class" value="Standard 18%" />
              </DetailCard>
              <DetailCard title="Stock Levels">
                <DetailRow label="On hand" value={`${activeProduct.stock} units`} />
                <DetailRow label="Reorder point" value={`${activeProduct.reorderPoint} units`} />
                <DetailRow label="Reserved" value="18 units" />
              </DetailCard>
              <DetailCard title="Warehouse Availability">
                <DetailRow label="Primary" value={activeProduct.warehouse} />
                <DetailRow label="Overflow" value="Central Hub" />
              </DetailCard>
              <DetailCard title="Supplier Information">
                <DetailRow label="Supplier" value={activeProduct.supplier} />
                <DetailRow label="Lead time" value="6 days" />
              </DetailCard>
            </div>

            <div className="mt-4 grid gap-4">
              <DetailCard title="Sales History">
                <p className="text-sm text-slate-300">{activeProduct.salesHistory}</p>
              </DetailCard>
              <DetailCard title="Purchase History">
                <p className="text-sm text-slate-300">{activeProduct.purchaseHistory}</p>
              </DetailCard>
              <DetailCard title="Product Images">
                <div className="flex gap-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex h-20 flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] text-slate-400">
                      <HiOutlinePhotograph className="h-6 w-6" />
                    </div>
                  ))}
                </div>
              </DetailCard>
              <DetailCard title="Attachments & Notes">
                <div className="space-y-3">
                  {[
                    { icon: <HiOutlineDocumentDuplicate />, label: "spec-sheet.pdf" },
                    { icon: <HiOutlineArchive />, label: "supplier-warranty.docx" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
                      <span className="text-blue-300">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </DetailCard>
            </div>
          </aside>
        </div>
      ) : null}
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
