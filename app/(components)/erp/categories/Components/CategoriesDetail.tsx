"use client";

import { useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineCollection,
  HiOutlineDownload,
  HiOutlineFilter,
  HiOutlineFolder,
  HiOutlinePlus,
  HiOutlineUpload,
  HiOutlineX,
} from "react-icons/hi";
import "../../erp.css";

type CategoryStatus = "Active" | "Draft" | "Hidden" | "Archived";

type Category = {
  name: string;
  parent: string;
  products: number;
  status: CategoryStatus;
  created: string;
  updated: string;
  description: string;
  seoTitle: string;
  subcategories: string[];
  assignedProducts: string;
};

const metrics = [
  { label: "Total Categories", value: "186", detail: "Across 5 catalog levels", trend: "+4.2%", tone: "blue" },
  { label: "Active Categories", value: "154", detail: "Visible to operations", trend: "+3.8%", tone: "green" },
  { label: "Subcategories", value: "412", detail: "Nested taxonomy nodes", trend: "+7.4%", tone: "purple" },
  { label: "Products Assigned", value: "2,486", detail: "Mapped SKUs", trend: "+6.1%", tone: "cyan" },
  { label: "Top Category", value: "Electronics", detail: "612 assigned products", trend: "+12.6%", tone: "yellow" },
  { label: "Empty Categories", value: "14", detail: "Need assignment", trend: "-9.3%", tone: "red" },
] as const;

const categories: Category[] = [
  {
    name: "Electronics",
    parent: "Root",
    products: 612,
    status: "Active",
    created: "Jan 12, 2025",
    updated: "May 15, 2026",
    description: "Electrical products, connected devices, and industrial electronics.",
    seoTitle: "Electronics | ERP Catalog",
    subcategories: ["Mobiles", "Laptops", "Accessories"],
    assignedProducts: "612 products across 18 active collections",
  },
  {
    name: "Mobiles",
    parent: "Electronics",
    products: 184,
    status: "Active",
    created: "Feb 03, 2025",
    updated: "May 14, 2026",
    description: "Mobile devices, handheld terminals, and rugged phones.",
    seoTitle: "Mobiles | ERP Catalog",
    subcategories: ["Industrial Phones", "Barcode Scanners"],
    assignedProducts: "184 products assigned",
  },
  {
    name: "Laptops",
    parent: "Electronics",
    products: 96,
    status: "Draft",
    created: "Mar 09, 2025",
    updated: "May 13, 2026",
    description: "Commercial laptops and workstation-class notebooks.",
    seoTitle: "Laptops | ERP Catalog",
    subcategories: ["Workstations", "Ultrabooks"],
    assignedProducts: "96 products assigned",
  },
  {
    name: "Warehouse Equipment",
    parent: "Root",
    products: 324,
    status: "Active",
    created: "Jan 20, 2025",
    updated: "May 12, 2026",
    description: "Storage, labeling, automation, and handling equipment.",
    seoTitle: "Warehouse Equipment | ERP Catalog",
    subcategories: ["Shelving", "Labeling", "Automation"],
    assignedProducts: "324 products assigned",
  },
  {
    name: "Legacy Hardware",
    parent: "Hardware",
    products: 42,
    status: "Hidden",
    created: "Apr 04, 2025",
    updated: "May 11, 2026",
    description: "Products retained for service contracts but hidden from new sales.",
    seoTitle: "Legacy Hardware | ERP Catalog",
    subcategories: ["Discontinued Boards"],
    assignedProducts: "42 products assigned",
  },
  {
    name: "Promotional Bundles",
    parent: "Marketing",
    products: 0,
    status: "Archived",
    created: "May 01, 2025",
    updated: "May 10, 2026",
    description: "Retired campaign bundles and seasonal combinations.",
    seoTitle: "Promotional Bundles | ERP Catalog",
    subcategories: [],
    assignedProducts: "No products assigned",
  },
];

const categoryPerformance = [
  { month: "Jan", electronics: 320, warehouse: 190, hardware: 140 },
  { month: "Feb", electronics: 338, warehouse: 204, hardware: 148 },
  { month: "Mar", electronics: 360, warehouse: 218, hardware: 154 },
  { month: "Apr", electronics: 382, warehouse: 226, hardware: 166 },
  { month: "May", electronics: 410, warehouse: 242, hardware: 172 },
  { month: "Jun", electronics: 436, warehouse: 258, hardware: 180 },
];

const distribution = [
  { category: "Electronics", products: 612 },
  { category: "Warehouse", products: 324 },
  { category: "Automation", products: 286 },
  { category: "Hardware", products: 248 },
  { category: "Storage", products: 206 },
];

const salesByCategory = [
  { category: "Electronics", revenue: 412 },
  { category: "Warehouse", revenue: 288 },
  { category: "Automation", revenue: 264 },
  { category: "Hardware", revenue: 182 },
  { category: "Storage", revenue: 148 },
];

const activity = [
  { title: "Recently Added Categories", detail: "4 new subcategories added under Warehouse Equipment", meta: "16m ago", tone: "blue" },
  { title: "Category Updates", detail: "Electronics SEO metadata refreshed", meta: "33m ago", tone: "purple" },
  { title: "Empty Categories Alerts", detail: "14 categories have no assigned products", meta: "48m ago", tone: "red" },
  { title: "Product Assignment Notifications", detail: "26 SKUs mapped to Mobiles", meta: "1h ago", tone: "green" },
  { title: "Recent Activities", detail: "Hierarchy reordered by catalog operations", meta: "2h ago", tone: "gray" },
] as const;

const features = [
  "Multi-level categories",
  "Drag-and-drop hierarchy",
  "Product assignment",
  "Category image upload",
  "SEO settings",
  "Bulk import/export",
  "Product mapping",
  "Category analytics",
];

const hierarchy = [
  {
    label: "Electronics",
    children: ["Mobiles", "Laptops", "Accessories"],
  },
  {
    label: "Warehouse Equipment",
    children: ["Shelving", "Labeling", "Automation"],
  },
  {
    label: "Hardware",
    children: ["Fasteners", "Legacy Hardware"],
  },
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

const statusClass: Record<CategoryStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  Draft: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  Hidden: "bg-rose-500/15 text-rose-300 border-rose-400/20",
  Archived: "bg-slate-500/15 text-slate-300 border-slate-400/20",
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

export default function CategoriesDetail() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Electronics: true,
    "Warehouse Equipment": true,
    Hardware: false,
  });

  return (
    <div className="erp-dashboard min-h-full px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <header className="erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-blue-300/80">Catalog architecture</p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Categories Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Organize products, manage category structures, and streamline inventory classification.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Add Category", icon: <HiOutlinePlus /> },
                { label: "Import Categories", icon: <HiOutlineUpload /> },
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
            <Panel title="Categories Table">
              <div className="max-h-[420px] overflow-auto rounded-2xl border border-white/10">
                <table className="min-w-full border-separate border-spacing-0 text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-950/95 text-left text-slate-400 backdrop-blur">
                    <tr>
                      {["Category Image/Icon", "Category Name", "Parent Category", "Products Count", "Status", "Created Date", "Last Updated", "Actions"].map((head) => (
                        <th key={head} className="border-b border-white/10 px-4 py-3 font-medium">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr
                        key={category.name}
                        onClick={() => setSelectedCategory(category)}
                        className="cursor-pointer transition hover:bg-white/[0.035]"
                      >
                        <td className="border-b border-white/5 px-4 py-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-blue-500/20 to-violet-500/20 text-blue-200">
                            <HiOutlineCollection className="h-5 w-5" />
                          </div>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4 font-medium text-white">{category.name}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{category.parent}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{category.products}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={statusClass[category.status]}>{category.status}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-400">{category.created}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-400">{category.updated}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {["View", "Edit", "Add Subcategory", "Archive", "Delete"].map((action) => (
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

            <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
              <Panel title="Category Hierarchy">
                <div className="space-y-3">
                  {hierarchy.map((node) => (
                    <div key={node.label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <button
                        className="flex w-full items-center justify-between text-left"
                        onClick={() => setExpanded((current) => ({ ...current, [node.label]: !current[node.label] }))}
                      >
                        <span className="flex items-center gap-3 font-medium text-white">
                          {expanded[node.label] ? <HiOutlineChevronDown /> : <HiOutlineChevronRight />}
                          <HiOutlineFolder className="text-blue-300" />
                          {node.label}
                        </span>
                        <span className="text-xs text-slate-500">Drag to sort</span>
                      </button>
                      {expanded[node.label] ? (
                        <div className="mt-3 space-y-2 border-l border-white/10 pl-7">
                          {node.children.map((child) => (
                            <div key={child} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2 text-sm text-slate-300 transition hover:border-blue-400/25">
                              <span className="text-slate-500">├──</span>
                              {child}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Category Performance Chart">
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={categoryPerformance}>
                    <defs>
                      <linearGradient id="electronics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="electronics" name="Electronics" stroke="#3b82f6" fill="url(#electronics)" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="warehouse" name="Warehouse" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="hardware" name="Hardware" stroke="#10b981" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>
            </section>

            <section className="grid gap-5 xl:grid-cols-3">
              <Panel title="Product Distribution Graph">
                <ResponsiveContainer width="100%" height={230}>
                  <BarChart data={distribution}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="category" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="products" name="Products" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Sales by Category">
                <ResponsiveContainer width="100%" height={230}>
                  <LineChart data={salesByCategory}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="category" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Line type="monotone" dataKey="revenue" name="Revenue ($K)" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Inventory Allocation Metrics">
                <div className="space-y-4">
                  {[
                    { label: "Electronics", value: "34%" },
                    { label: "Warehouse", value: "26%" },
                    { label: "Automation", value: "21%" },
                    { label: "Hardware", value: "19%" },
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
                {["Filter by Status", "Filter by Parent Category", "Filter by Product Count", "Filter by Created Date", "Date Range Picker"].map((item) => (
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

            <Panel title="ERP Category Features">
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

      {selectedCategory ? (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/60 backdrop-blur-sm">
          <button aria-label="Close category detail drawer" className="flex-1 cursor-default" onClick={() => setSelectedCategory(null)} />
          <aside className="erp-drawer h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0a1020]/95 p-5 shadow-2xl shadow-slate-950/70">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-300/80">Category detail</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{selectedCategory.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedCategory.parent}</p>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:text-white"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailCard title="Category Information">
                <DetailRow label="Status" value={selectedCategory.status} />
                <DetailRow label="Created" value={selectedCategory.created} />
                <DetailRow label="Updated" value={selectedCategory.updated} />
              </DetailCard>
              <DetailCard title="Parent Category">
                <DetailRow label="Parent" value={selectedCategory.parent} />
                <DetailRow label="Products" value={`${selectedCategory.products}`} />
              </DetailCard>
              <DetailCard title="Subcategories">
                <p className="text-sm text-slate-300">
                  {selectedCategory.subcategories.length ? selectedCategory.subcategories.join(", ") : "No subcategories"}
                </p>
              </DetailCard>
              <DetailCard title="Assigned Products">
                <p className="text-sm text-slate-300">{selectedCategory.assignedProducts}</p>
              </DetailCard>
            </div>

            <div className="mt-4 grid gap-4">
              <DetailCard title="Category Description">
                <p className="text-sm text-slate-300">{selectedCategory.description}</p>
              </DetailCard>
              <DetailCard title="SEO Information">
                <DetailRow label="SEO title" value={selectedCategory.seoTitle} />
                <DetailRow label="Slug" value={selectedCategory.name.toLowerCase().replaceAll(" ", "-")} />
              </DetailCard>
              <DetailCard title="Activity Timeline">
                <div className="space-y-3">
                  {[
                    "Hierarchy updated by Maya R.",
                    "18 products reassigned",
                    "SEO description refreshed",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </DetailCard>
              <DetailCard title="Attachments & Notes">
                <div className="space-y-3">
                  {["taxonomy-map.pdf", "seo-guidelines.docx"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
                      {item}
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
