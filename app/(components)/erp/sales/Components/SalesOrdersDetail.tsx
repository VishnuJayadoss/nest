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
  HiOutlineDocumentReport,
  HiOutlineDownload,
  HiOutlineFilter,
  HiOutlinePlus,
  HiOutlineReceiptTax,
  HiOutlineX,
} from "react-icons/hi";
import "../../erp.css";

type PaymentStatus = "Paid" | "Pending" | "Partially Paid" | "Failed" | "Refunded";
type DeliveryStatus = "Processing" | "Packed" | "Shipped" | "Delivered" | "Cancelled";

type SalesOrder = {
  id: string;
  customer: string;
  products: number;
  amount: string;
  payment: PaymentStatus;
  delivery: DeliveryStatus;
  date: string;
  employee: string;
  orderedProducts: string[];
  invoice: string;
  paymentHistory: string;
  tracking: string;
  notes: string;
};

const metrics = [
  { label: "Total Orders", value: "1,284", detail: "This month", trend: "+9.1%", tone: "blue" },
  { label: "Pending Orders", value: "146", detail: "Awaiting fulfillment", trend: "-4.6%", tone: "yellow" },
  { label: "Completed Orders", value: "1,038", detail: "Delivered successfully", trend: "+11.8%", tone: "green" },
  { label: "Total Revenue", value: "$4.28M", detail: "Gross booked sales", trend: "+12.4%", tone: "purple" },
  { label: "Pending Payments", value: "$248K", detail: "Outstanding balance", trend: "-4.2%", tone: "red" },
  { label: "Avg Order Value", value: "$3,334", detail: "Per order", trend: "+3.7%", tone: "cyan" },
] as const;

const orders: SalesOrder[] = [
  {
    id: "SO-10482",
    customer: "Apex Manufacturing",
    products: 12,
    amount: "$24,800",
    payment: "Paid",
    delivery: "Delivered",
    date: "May 14, 2026",
    employee: "Sarah Johnson",
    orderedProducts: ["Servo Motor Kit × 8", "Sensor Array × 4"],
    invoice: "INV-2084 issued May 14",
    paymentHistory: "Paid in full via bank transfer",
    tracking: "Delivered May 16 · POD confirmed",
    notes: "Priority customer. Include installation certificate.",
  },
  {
    id: "SO-10481",
    customer: "Nova Retail Group",
    products: 8,
    amount: "$12,460",
    payment: "Pending",
    delivery: "Processing",
    date: "May 14, 2026",
    employee: "Mike Chen",
    orderedProducts: ["Smart Pallet Tracker × 8"],
    invoice: "Draft invoice prepared",
    paymentHistory: "Awaiting advance payment",
    tracking: "Picking queued",
    notes: "Release after payment confirmation.",
  },
  {
    id: "SO-10477",
    customer: "Orion Systems",
    products: 16,
    amount: "$38,920",
    payment: "Partially Paid",
    delivery: "Shipped",
    date: "May 13, 2026",
    employee: "Emma Davis",
    orderedProducts: ["Industrial Sensor Array × 10", "Label Printer × 6"],
    invoice: "INV-2077 issued May 13",
    paymentHistory: "60% received · balance due on delivery",
    tracking: "Shipment SH-8892 in transit",
    notes: "Customer requested split billing.",
  },
  {
    id: "SO-10469",
    customer: "BluePeak Logistics",
    products: 5,
    amount: "$8,740",
    payment: "Failed",
    delivery: "Cancelled",
    date: "May 12, 2026",
    employee: "John Wilson",
    orderedProducts: ["Warehouse Label Printer × 5"],
    invoice: "Invoice voided",
    paymentHistory: "Card authorization failed",
    tracking: "Order cancelled before dispatch",
    notes: "Re-engage after revised PO.",
  },
  {
    id: "SO-10463",
    customer: "Helix Components",
    products: 10,
    amount: "$17,580",
    payment: "Refunded",
    delivery: "Packed",
    date: "May 11, 2026",
    employee: "Sarah Johnson",
    orderedProducts: ["Modular Rack Frame × 10"],
    invoice: "Credit memo CM-441 issued",
    paymentHistory: "Refund processed after quantity revision",
    tracking: "Packed, awaiting carrier pickup",
    notes: "Partial reorder expected next week.",
  },
];

const revenueGrowth = [
  { month: "Jan", revenue: 420, orders: 980 },
  { month: "Feb", revenue: 460, orders: 1040 },
  { month: "Mar", revenue: 510, orders: 1124 },
  { month: "Apr", revenue: 545, orders: 1188 },
  { month: "May", revenue: 590, orders: 1246 },
  { month: "Jun", revenue: 642, orders: 1284 },
];

const monthlySales = [
  { month: "Jan", completed: 812, pending: 168 },
  { month: "Feb", completed: 874, pending: 166 },
  { month: "Mar", completed: 936, pending: 188 },
  { month: "Apr", completed: 982, pending: 206 },
  { month: "May", completed: 1024, pending: 222 },
  { month: "Jun", completed: 1038, pending: 246 },
];

const topProducts = [
  { product: "Smart Pallet Tracker", revenue: 226 },
  { product: "Servo Motor Kit", revenue: 184 },
  { product: "Industrial Sensor Array", revenue: 156 },
  { product: "Warehouse Label Printer", revenue: 112 },
];

const customerTrends = [
  { segment: "Enterprise", value: 48 },
  { segment: "Mid-market", value: 29 },
  { segment: "SMB", value: 16 },
  { segment: "Channel", value: 7 },
];

const workflow = [
  { label: "Order Received", state: "complete" },
  { label: "Payment Confirmation", state: "complete" },
  { label: "Packaging", state: "active" },
  { label: "Shipment", state: "pending" },
  { label: "Delivery", state: "pending" },
  { label: "Completion Status", state: "pending" },
] as const;

const activity = [
  { title: "Recent Orders", detail: "SO-10482 created by Sarah Johnson", meta: "12m ago", tone: "blue" },
  { title: "Pending Deliveries", detail: "18 orders waiting for carrier pickup", meta: "24m ago", tone: "purple" },
  { title: "Payment Alerts", detail: "$42K overdue from Nova Retail Group", meta: "38m ago", tone: "yellow" },
  { title: "Refund Requests", detail: "2 requests need finance review", meta: "1h ago", tone: "red" },
  { title: "Sales Activities", detail: "Monthly close forecast revised upward", meta: "2h ago", tone: "green" },
] as const;

const features = [
  "Invoice generation",
  "Payment tracking",
  "Delivery tracking",
  "Multi-product orders",
  "Customer order history",
  "Sales analytics",
  "Tax calculation",
  "Discount management",
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
  Failed: "bg-rose-500/15 text-rose-300 border-rose-400/20",
  Refunded: "bg-violet-500/15 text-violet-300 border-violet-400/20",
};

const deliveryClass: Record<DeliveryStatus, string> = {
  Processing: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  Packed: "bg-amber-500/15 text-amber-300 border-amber-400/20",
  Shipped: "bg-violet-500/15 text-violet-300 border-violet-400/20",
  Delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
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

export default function SalesOrdersDetail() {
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);

  return (
    <div className="erp-dashboard min-h-full px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <header className="erp-panel rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-blue-300/80">Revenue operations</p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Sales Orders</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                Manage customer orders, invoices, deliveries, payments, and sales performance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Create Order", icon: <HiOutlinePlus /> },
                { label: "Generate Invoice", icon: <HiOutlineReceiptTax /> },
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
            <Panel title="Sales Orders Table">
              <div className="max-h-[420px] overflow-auto rounded-2xl border border-white/10">
                <table className="min-w-full border-separate border-spacing-0 text-sm">
                  <thead className="sticky top-0 z-10 bg-slate-950/95 text-left text-slate-400 backdrop-blur">
                    <tr>
                      {["Order ID", "Customer Name", "Products Count", "Total Amount", "Payment Status", "Delivery Status", "Order Date", "Assigned Employee", "Actions"].map((head) => (
                        <th key={head} className="border-b border-white/10 px-4 py-3 font-medium">{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} onClick={() => setSelectedOrder(order)} className="cursor-pointer transition hover:bg-white/[0.035]">
                        <td className="border-b border-white/5 px-4 py-4 font-medium text-white">{order.id}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{order.customer}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{order.products}</td>
                        <td className="border-b border-white/5 px-4 py-4 font-semibold text-white">{order.amount}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={paymentClass[order.payment]}>{order.payment}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <StatusBadge className={deliveryClass[order.delivery]}>{order.delivery}</StatusBadge>
                        </td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-400">{order.date}</td>
                        <td className="border-b border-white/5 px-4 py-4 text-slate-300">{order.employee}</td>
                        <td className="border-b border-white/5 px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            {["View", "Edit", "Invoice", "Track Delivery", "Delete"].map((action) => (
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
              <Panel title="Sales Performance">
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueGrowth}>
                    <defs>
                      <linearGradient id="salesRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" name="Revenue ($K)" stroke="#3b82f6" fill="url(#salesRevenue)" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="orders" name="Orders" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Monthly Sales Analytics">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlySales}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel title="Sales Analytics">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topProducts}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="product" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="revenue" name="Revenue ($K)" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Panel>

              <Panel title="Customer Purchase Analytics">
                <div className="space-y-4">
                  {customerTrends.map((item) => (
                    <div key={item.segment}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-300">{item.segment}</span>
                        <span className="font-semibold text-white">{item.value}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </section>

            <Panel title="Order Processing Workflow">
              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                {workflow.map((step, index) => (
                  <div key={step.label} className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-4">
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

            <section className="grid gap-5 xl:grid-cols-3">
              <Panel title="Order Completion Rate">
                <MetricBlock label="Delivered" value="80.8%" />
                <MetricBlock label="In progress" value="14.6%" />
                <MetricBlock label="Cancelled" value="4.6%" />
              </Panel>
              <Panel title="Top Selling Products">
                <SimpleList items={["Smart Pallet Tracker", "Servo Motor Kit", "Industrial Sensor Array"]} />
              </Panel>
              <Panel title="Sales Conversion Metrics">
                <MetricBlock label="Quote to order" value="42%" />
                <MetricBlock label="Repeat customers" value="68%" />
                <MetricBlock label="Refund rate" value="1.9%" />
              </Panel>
            </section>
          </div>

          <aside className="space-y-5">
            <Panel title="Filters">
              <div className="space-y-3">
                {["Filter by Payment Status", "Filter by Delivery Status", "Filter by Customer", "Filter by Employee", "Date Range Picker"].map((item) => (
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

            <Panel title="ERP Sales Features">
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

      {selectedOrder ? (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/60 backdrop-blur-sm">
          <button aria-label="Close sales order detail drawer" className="flex-1 cursor-default" onClick={() => setSelectedOrder(null)} />
          <aside className="erp-drawer h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0a1020]/95 p-5 shadow-2xl shadow-slate-950/70">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-300/80">Sales order detail</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{selectedOrder.id}</h2>
                <p className="mt-1 text-sm text-slate-400">{selectedOrder.customer}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:text-white"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailCard title="Order Information">
                <DetailRow label="Amount" value={selectedOrder.amount} />
                <DetailRow label="Order date" value={selectedOrder.date} />
                <DetailRow label="Assigned" value={selectedOrder.employee} />
              </DetailCard>
              <DetailCard title="Customer Details">
                <DetailRow label="Customer" value={selectedOrder.customer} />
                <DetailRow label="Products" value={`${selectedOrder.products}`} />
              </DetailCard>
              <DetailCard title="Invoice Information">
                <p className="text-sm text-slate-300">{selectedOrder.invoice}</p>
              </DetailCard>
              <DetailCard title="Payment History">
                <p className="text-sm text-slate-300">{selectedOrder.paymentHistory}</p>
              </DetailCard>
            </div>

            <div className="mt-4 grid gap-4">
              <DetailCard title="Ordered Products">
                <SimpleList items={selectedOrder.orderedProducts} />
              </DetailCard>
              <DetailCard title="Quantity & Pricing">
                <DetailRow label="Payment status" value={selectedOrder.payment} />
                <DetailRow label="Delivery status" value={selectedOrder.delivery} />
              </DetailCard>
              <DetailCard title="Delivery Tracking">
                <p className="text-sm text-slate-300">{selectedOrder.tracking}</p>
              </DetailCard>
              <DetailCard title="Order Timeline">
                <SimpleList items={["Order received", "Payment verified", "Packaging in progress"]} />
              </DetailCard>
              <DetailCard title="Notes & Attachments">
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">{selectedOrder.notes}</div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300">
                    <HiOutlineDocumentReport className="text-blue-300" />
                    order-summary.pdf
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
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500" style={{ width: value }} />
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
