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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  HiOutlineDownload,
  HiOutlineFilter,
  HiOutlineOfficeBuilding,
  HiOutlinePlus,
  HiOutlineReceiptTax,
  HiOutlineX,
} from "react-icons/hi";
import "../../erp.css";

type PaymentStatus = "Paid" | "Pending" | "Partially Paid" | "Overdue" | "Cancelled";
type DeliveryStatus = "Ordered" | "Processing" | "Shipped" | "Received" | "Cancelled";

type PurchaseOrder = {
  id: string;
  supplier: string;
  products: number;
  amount: string;
  payment: PaymentStatus;
  delivery: DeliveryStatus;
  date: string;
  expected: string;
  orderedProducts: string[];
  invoice: string;
  paymentHistory: string;
  tracking: string;
  notes: string;
};

const metrics = [
  { label: "Total Purchase Orders", value: "326", detail: "Current quarter", trend: "+8.4%", tone: "blue" },
  { label: "Pending Purchases", value: "46", detail: "Awaiting action", trend: "-5.2%", tone: "yellow" },
  { label: "Completed Purchases", value: "248", detail: "Received successfully", trend: "+9.7%", tone: "green" },
  { label: "Total Purchase Value", value: "$2.14M", detail: "Committed spend", trend: "+6.8%", tone: "purple" },
  { label: "Pending Payments", value: "$184K", detail: "Supplier dues", trend: "+1.8%", tone: "red" },
  { label: "Active Suppliers", value: "62", detail: "Approved vendors", trend: "+4", tone: "cyan" },
] as const;

const purchases: PurchaseOrder[] = [
  {
    id: "PO-7741",
    supplier: "Nova Industrial",
    products: 12,
    amount: "$42,600",
    payment: "Pending",
    delivery: "Processing",
    date: "May 14, 2026",
    expected: "May 21, 2026",
    orderedProducts: ["Servo Motor Kit × 120", "Drive Coupler × 60"],
    invoice: "Awaiting supplier invoice",
    paymentHistory: "Advance pending approval",
    tracking: "Supplier preparing dispatch",
    notes: "Urgent replenishment for automation line.",
  },
  {
    id: "PO-7738",
    supplier: "Helix Components",
    products: 8,
    amount: "$31,480",
    payment: "Partially Paid",
    delivery: "Shipped",
    date: "May 13, 2026",
    expected: "May 19, 2026",
    orderedProducts: ["Industrial Sensor Array × 75"],
    invoice: "INV-HX-441 received",
    paymentHistory: "50% advance paid",
    tracking: "Carrier SH-6684 in transit",
    notes: "Balance payable on receipt.",
  },
  {
    id: "PO-7733",
    supplier: "Structa Works",
    products: 5,
    amount: "$18,920",
    payment: "Paid",
    delivery: "Received",
    date: "May 11, 2026",
    expected: "May 16, 2026",
    orderedProducts: ["Modular Rack Frame × 32"],
    invoice: "INV-ST-908 matched",
    paymentHistory: "Paid in full",
    tracking: "Received into North Hub",
    notes: "Inspection completed with no variance.",
  },
  {
    id: "PO-7729",
    supplier: "PrintForge Supply",
    products: 4,
    amount: "$14,280",
    payment: "Overdue",
    delivery: "Ordered",
    date: "May 09, 2026",
    expected: "May 18, 2026",
    orderedProducts: ["Warehouse Label Printer × 20"],
    invoice: "INV-PF-221 outstanding",
    paymentHistory: "Payment overdue by 3 days",
    tracking: "Order acknowledged",
    notes: "Vendor credit hold risk.",
  },
  {
    id: "PO-7721",
    supplier: "RouteIQ Systems",
    products: 6,
    amount: "$22,760",
    payment: "Cancelled",
    delivery: "Cancelled",
    date: "May 07, 2026",
    expected: "Cancelled",
    orderedProducts: ["Smart Pallet Tracker × 120"],
    invoice: "No invoice generated",
    paymentHistory: "Cancelled before payment",
    tracking: "Cancelled after demand revision",
    notes: "Forecast correction removed need.",
  },
];

const trend = [
  { month: "Jan", spend: 280, orders: 42 },
  { month: "Feb", spend: 314, orders: 48 },
  { month: "Mar", spend: 352, orders: 54 },
  { month: "Apr", spend: 368, orders: 58 },
  { month: "May", spend: 402, orders: 61 },
  { month: "Jun", spend: 426, orders: 63 },
];

const procurementCosts = [
  { month: "Jan", ordered: 280, received: 246 },
  { month: "Feb", ordered: 314, received: 284 },
  { month: "Mar", ordered: 352, received: 326 },
  { month: "Apr", ordered: 368, received: 342 },
  { month: "May", ordered: 402, received: 376 },
  { month: "Jun", ordered: 426, received: 398 },
];

const supplierAnalytics = [
  { supplier: "Nova", spend: 186 },
  { supplier: "Helix", spend: 164 },
  { supplier: "Structa", spend: 142 },
  { supplier: "RouteIQ", spend: 118 },
];

const supplierMetrics = [
  { label: "On-time delivery", value: "94.2%" },
  { label: "PO acceptance", value: "97.6%" },
  { label: "Payment compliance", value: "91.4%" },
  { label: "Vendor rating", value: "4.7 / 5" },
];

const supplierList = [
  "Nova Industrial · 96% on-time",
  "Helix Components · 94% on-time",
  "Structa Works · 92% on-time",
];

const workflow = [
  { label: "Purchase Request", state: "complete" },
  { label: "Approval Process", state: "complete" },
  { label: "Order Placement", state: "complete" },
  { label: "Shipment Tracking", state: "active" },
  { label: "Stock Receiving", state: "pending" },
  { label: "Invoice Processing", state: "pending" },
] as const;

const activity = [
  { title: "Pending Approvals", detail: "PO-7741 awaiting finance sign-off", meta: "14m ago", tone: "yellow" },
  { title: "Incoming Deliveries", detail: "Helix shipment due May 19", meta: "28m ago", tone: "purple" },
  { title: "Supplier Notifications", detail: "PrintForge updated lead time to 9 days", meta: "44m ago", tone: "blue" },
  { title: "Low Stock Alerts", detail: "Servo Motor Kit reorder triggered", meta: "1h ago", tone: "red" },
  { title: "Recent Purchase Activities", detail: "Structa receipt posted by Maya R.", meta: "2h ago", tone: "green" },
] as const;

const features = [
  "Purchase order management",
  "Supplier management",
  "Inventory restocking",
  "Multi-product purchases",
  "Approval workflows",
  "Invoice generation",
  "Payment tracking",
  "Delivery tracking",
];

const toneClass = {
  blue: "from-blue-500/25 to-cyan-400/10 border-blue-400/20 text-blue-300",
  purple: "from-violet-500/25 to-fuchsia-400/10 border-violet-400/20 text-violet-300",
  green: "from-emerald-500/25 to-teal-400/10 border-emerald-400/20 text-emerald-300",
  cyan: "from-cyan-500/25 to-blue-400/10 border-cyan-400/20 text-cyan-300",
  yellow: "from-amber-500/25 to-yellow-400/10 border-amber-400/20 text-amber-300",
  red: "from-rose-500/25 to-red-400/10 border-rose-400/20 text-rose-300",
} as const;

const paymentClass: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  Pending: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  "Partially Paid": "bg-blue-500/15 text-blue-300 border-blue-400/20",
  Overdue: "bg-rose-500/15 text-rose-300 border-rose-400/20",
  Cancelled: "bg-slate-500/15 text-slate-300 border-slate-400/20",
};

const deliveryClass: Record<DeliveryStatus, string> = {
  Ordered: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  Processing: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  Shipped: "bg-violet-500/15 text-violet-300 border-violet-400/20",
  Received: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
  Cancelled: "bg-rose-500/15 text-rose-300 border-rose-400/20",
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

export default function PurchasesDetail() {
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseOrder | null>(null);

  return (
    <div className="erp-dashboard min-h-full px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <header className="erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-blue-300/80">Procurement operations</p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Purchases Management</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Manage purchase orders, suppliers, procurement workflows, and inventory restocking.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Create Purchase Order", icon: <HiOutlinePlus /> },
                { label: "Add Supplier", icon: <HiOutlineOfficeBuilding /> },
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
            <Panel title="Purchases Table">
              <div className="max-h-[420px] overflow-auto rounded-2xl border border-white/10">
                <table className="min-w-full border-separate border-spacing-0 text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-950/95 text-left text-slate-400 backdrop-blur">
                    <tr>
                      {["Purchase ID", "Supplier Name", "Products Count", "Total Amount", "Payment Status", "Delivery Status", "Purchase Date", "Expected Delivery", "Actions"].map((head) => (
                        <th key={head} className="border-b border-white/10 px-4 py-3 font-medium">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase) => (
                      <tr key={purchase.id} onClick={() => setSelectedPurchase(purchase)} className="cursor-pointer transition hover:bg-white/[0.035]">
                        <td className="border-b border-white/5 px-4 py-4 font-medium text-white">{purchase.id}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{purchase.supplier}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{purchase.products}</td>
                        <td className="border-b border-white/5 px-4 py-4 font-semibold text-white">{purchase.amount}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={paymentClass[purchase.payment]}>{purchase.payment}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={deliveryClass[purchase.delivery]}>{purchase.delivery}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-400">{purchase.date}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{purchase.expected}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {["View", "Edit", "Receive Stock", "Generate Invoice", "Delete"].map((action) => (
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

            <Panel title="Procurement Workflow">
              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                {workflow.map((step, index) => (
                  <div key={step.label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <div
                      className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                        step.state === "complete"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : step.state === "active"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-slate-500/15 text-slate-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium text-white">{step.label}</p>
                    <p className="mt-2 text-xs capitalize text-slate-400">{step.state}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <section className="grid gap-5 xl:grid-cols-2">
              <Panel title="Purchase Analytics">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id="purchaseSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="spend" name="Spend ($K)" stroke="#3b82f6" fill="url(#purchaseSpend)" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="orders" name="Orders" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Procurement Costs">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={procurementCosts}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Bar dataKey="ordered" name="Ordered ($K)" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="received" name="Received ($K)" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <Panel title="Supplier Analytics">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={supplierAnalytics}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="supplier" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="spend" name="Spend ($K)" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Supplier Performance">
                <div className="space-y-4">
                  {supplierMetrics.map((item) => (
                    <MetricBlock key={item.label} label={item.label} value={item.value} />
                  ))}
                </div>
              </Panel>
            </section>

            <section className="grid gap-5 xl:grid-cols-3">
              <Panel title="Top Suppliers">
                <SimpleList items={supplierList} />
              </Panel>
              <Panel title="Inventory Replenishment Metrics">
                <MetricBlock label="Fill rate" value="93%" />
                <MetricBlock label="Backorder rate" value="4.8%" />
                <MetricBlock label="Replenishment accuracy" value="96%" />
              </Panel>
              <Panel title="Purchase Order Performance">
                <MetricBlock label="Received on time" value="89%" />
                <MetricBlock label="Variance-free receipts" value="94%" />
                <MetricBlock label="Approval SLA" value="97%" />
              </Panel>
            </section>
          </div>

          <aside className="space-y-5">
            <Panel title="Filters">
              <div className="space-y-3">
                {["Filter by Supplier", "Filter by Payment Status", "Filter by Delivery Status", "Filter by Purchase Date", "Date Range Picker"].map((item) => (
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

            <Panel title="ERP Purchase Features">
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

      {selectedPurchase ? (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/60 backdrop-blur-sm">
          <button aria-label="Close purchase detail drawer" className="flex-1 cursor-default" onClick={() => setSelectedPurchase(null)} />
          <aside className="erp-drawer h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0a1020]/95 p-5 shadow-2xl shadow-slate-950/70">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-300/80">Purchase detail</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{selectedPurchase.id}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedPurchase.supplier}</p>
              </div>
              <button
                onClick={() => setSelectedPurchase(null)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:text-white"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailCard title="Purchase Information">
                <DetailRow label="Amount" value={selectedPurchase.amount} />
                <DetailRow label="Purchase date" value={selectedPurchase.date} />
                <DetailRow label="Expected" value={selectedPurchase.expected} />
              </DetailCard>
              <DetailCard title="Supplier Details">
                <DetailRow label="Supplier" value={selectedPurchase.supplier} />
                <DetailRow label="Products" value={`${selectedPurchase.products}`} />
              </DetailCard>
              <DetailCard title="Invoice Information">
                <p className="text-sm text-slate-300">{selectedPurchase.invoice}</p>
              </DetailCard>
              <DetailCard title="Payment History">
                <p className="text-sm text-slate-300">{selectedPurchase.paymentHistory}</p>
              </DetailCard>
            </div>

            <div className="mt-4 grid gap-4">
              <DetailCard title="Ordered Products">
                <SimpleList items={selectedPurchase.orderedProducts} />
              </DetailCard>
              <DetailCard title="Quantity & Pricing">
                <DetailRow label="Payment status" value={selectedPurchase.payment} />
                <DetailRow label="Delivery status" value={selectedPurchase.delivery} />
              </DetailCard>
              <DetailCard title="Delivery Tracking">
                <p className="text-sm text-slate-300">{selectedPurchase.tracking}</p>
              </DetailCard>
              <DetailCard title="Purchase Timeline">
                <SimpleList items={["Request approved", "PO issued", "Shipment tracked"]} />
              </DetailCard>
              <DetailCard title="Attachments & Notes">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">{selectedPurchase.notes}</div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
                    <HiOutlineReceiptTax className="text-blue-300" />
                    purchase-order.pdf
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

function MetricBlock({ label, value }: { label: string; value: string }) {
  const width = value.includes("%") ? value : "88%";

  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500" style={{ width }} />
      </div>
    </div>
  );
}

function SimpleList({ items }: { items: string[] }) {
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
