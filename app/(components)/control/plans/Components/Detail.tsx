"use client";

import "@/app/layout/header.css";
import { useState } from "react";
import { HiOutlineCreditCard, HiOutlineCheckCircle, HiOutlinePlus, HiOutlineX, HiOutlinePencil, HiOutlineDocumentText, HiOutlineClock, HiOutlineChartBar, HiOutlineGift, HiOutlineShieldCheck, HiOutlineReceiptRefund, HiOutlineSearch } from "react-icons/hi";

const plans = [
  { id: 1, name: "Basic", price: "$29", users: "Up to 10 users", features: ["CRM Access", "Basic Support", "5GB Storage"], color: "blue", subscribers: 45 },
  { id: 2, name: "Professional", price: "$99", users: "Up to 50 users", features: ["CRM + ERP", "Priority Support", "50GB Storage", "API Access"], color: "violet", subscribers: 67 },
  { id: 3, name: "Enterprise", price: "$299", users: "Unlimited users", features: ["Full Suite", "24/7 Support", "Unlimited Storage", "Custom Integration"], color: "green", subscribers: 30 },
];

const subscriptions = [
  { id: 1, customer: "Acme Corp", plan: "Enterprise", status: "Active", startDate: "2026-01-15", renewalDate: "2026-07-15", amount: "$299/mo" },
  { id: 2, customer: "TechStart Inc", plan: "Professional", status: "Active", startDate: "2026-02-20", renewalDate: "2026-08-20", amount: "$99/mo" },
  { id: 3, customer: "DataFlow Ltd", plan: "Enterprise", status: "Active", startDate: "2025-12-01", renewalDate: "2026-06-01", amount: "$299/mo" },
];

const transactions = [
  { id: 1, customer: "Acme Corp", amount: "$299", date: "May 5, 2026", type: "Payment", status: "Completed" },
  { id: 2, customer: "TechStart Inc", amount: "$99", date: "May 4, 2026", type: "Payment", status: "Completed" },
  { id: 3, customer: "DataFlow Ltd", amount: "$-50", date: "May 3, 2026", type: "Refund", status: "Completed" },
];

const invoices = [
  { id: "INV-001", customer: "Acme Corp", amount: "$299", date: "May 5, 2026", status: "Paid", dueDate: "May 20, 2026" },
  { id: "INV-002", customer: "TechStart Inc", amount: "$99", date: "May 4, 2026", status: "Paid", dueDate: "May 20, 2026" },
  { id: "INV-003", customer: "DataFlow Ltd", amount: "$299", date: "May 1, 2026", status: "Pending", dueDate: "May 15, 2026" },
];

const coupons = [
  { id: 1, code: "SAVE20", discount: "20%", maxUses: 100, usesLeft: 45, expiry: "2026-12-31", status: "Active" },
  { id: 2, code: "SUMMER50", discount: "$50", maxUses: 50, usesLeft: 0, expiry: "2026-08-31", status: "Expired" },
  { id: 3, code: "FLAT100", discount: "$100", maxUses: 200, usesLeft: 150, expiry: "2026-10-31", status: "Active" },
];

const renewalRequests = [
  { id: 1, customer: "Acme Corp", currentPlan: "Enterprise", requestedPlan: "Enterprise Plus", status: "Pending" },
  { id: 2, customer: "TechStart Inc", currentPlan: "Professional", requestedPlan: "Enterprise", status: "Approved" },
  { id: 3, customer: "DataFlow Ltd", currentPlan: "Basic", requestedPlan: "Professional", status: "Pending" },
];

const sectionOptions = [
  { id: "plans", label: "Plans", icon: <HiOutlineCreditCard className="w-5 h-5" /> },
  { id: "subscriptions", label: "Active Subscriptions", icon: <HiOutlineCheckCircle className="w-5 h-5" /> },
  { id: "transactions", label: "Transactions", icon: <HiOutlineReceiptRefund className="w-5 h-5" /> },
  { id: "invoices", label: "Invoices", icon: <HiOutlineDocumentText className="w-5 h-5" /> },
  { id: "coupons", label: "Coupons", icon: <HiOutlineGift className="w-5 h-5" /> },
  { id: "usagelimits", label: "Usage Limits", icon: <HiOutlineShieldCheck className="w-5 h-5" /> },
  { id: "paymentgateways", label: "Payment Gateways", icon: <HiOutlineCreditCard className="w-5 h-5" /> },
  { id: "renewalrequests", label: "Renewal Requests", icon: <HiOutlineClock className="w-5 h-5" /> },
  { id: "analytics", label: "Subscription Analytics", icon: <HiOutlineChartBar className="w-5 h-5" /> },
];

export default function Detail() {
  const [activeSection, setActiveSection] = useState("plans");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);

  const handleAddClick = (type: string) => {
    setModalType(type);
    setShowModal(true);
  };

  const typeMap: { [key: string]: string } = {
    plan: "Plan",
    subscription: "Subscription",
    coupon: "Coupon",
    invoice: "Invoice",
    gateway: "Gateway",
  };
  const modalTitle = typeMap[modalType || ""] || "Item";

  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Plans & Subscriptions</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage all plans and subscription data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 panel-card rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4 px-2">SECTIONS</h3>
          <div className="space-y-2">
            {sectionOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveSection(option.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                  activeSection === option.id
                    ? "bg-violet-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {option.icon}
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Plans Section */}
          {activeSection === "plans" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Available Plans</h2>
                <button
                  onClick={() => handleAddClick("plan")}
                  className="proj-new-btn px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  Add Plan
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div key={plan.id} className={`ac-product-card ac-card-${plan.color} p-6 rounded-2xl`}>
                    <div className={`ac-icon-${plan.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <HiOutlineCreditCard className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-white mb-1">{plan.price}<span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>/month</span></div>
                    <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{plan.users}</p>
                    <div className="space-y-2 mb-6">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <HiOutlineCheckCircle className="w-4 h-4" style={{ color: "var(--green)" }} />
                          <span className="text-sm" style={{ color: "var(--text-muted)" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-4" style={{ borderTop: "1px solid var(--panel-border)" }}>
                      <button className="flex-1 text-sm font-semibold text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                        <HiOutlinePencil className="w-4 h-4" />
                        Edit
                      </button>
                      <div className="text-center flex-1 text-sm font-semibold text-white">{plan.subscribers} subscribers</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Subscriptions Section */}
          {activeSection === "subscriptions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Active Subscriptions</h2>
                <button
                  onClick={() => handleAddClick("subscription")}
                  className="proj-new-btn px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  New Subscription
                </button>
              </div>
              <div className="panel-card rounded-2xl p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--panel-border)" }}>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Plan</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Renewal Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((sub) => (
                        <tr key={sub.id} style={{ borderBottom: "1px solid var(--panel-border)" }}>
                          <td className="py-3 px-4 text-white text-sm font-medium">{sub.customer}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{sub.plan}</td>
                          <td className="py-3 px-4"><span className="project-status active">Active</span></td>
                          <td className="py-3 px-4 text-white text-sm font-semibold">{sub.amount}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{sub.renewalDate}</td>
                          <td className="py-3 px-4">
                            <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Section */}
          {activeSection === "transactions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Transactions</h2>
                <div className="header-search rounded-xl px-3 py-2 flex items-center gap-2">
                  <HiOutlineSearch className="w-4 h-4" style={{ color: "var(--text-faint)" }} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500"
                  />
                </div>
              </div>
              <div className="panel-card rounded-2xl p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--panel-border)" }}>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn) => (
                        <tr key={txn.id} style={{ borderBottom: "1px solid var(--panel-border)" }}>
                          <td className="py-3 px-4 text-white text-sm font-medium">TXN-{txn.id}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{txn.customer}</td>
                          <td className={`py-3 px-4 text-sm font-semibold ${txn.amount.startsWith("-") ? "text-red-400" : "text-green-400"}`}>{txn.amount}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{txn.type}</td>
                          <td className="py-3 px-4"><span className="project-status active">Completed</span></td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{txn.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Invoices Section */}
          {activeSection === "invoices" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Invoices</h2>
                <button
                  onClick={() => handleAddClick("invoice")}
                  className="proj-new-btn px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  Generate Invoice
                </button>
              </div>
              <div className="panel-card rounded-2xl p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--panel-border)" }}>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Invoice ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} style={{ borderBottom: "1px solid var(--panel-border)" }}>
                          <td className="py-3 px-4 text-white text-sm font-medium">{invoice.id}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{invoice.customer}</td>
                          <td className="py-3 px-4 text-white text-sm font-semibold">{invoice.amount}</td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{invoice.date}</td>
                          <td className="py-3 px-4"><span className={`project-status ${invoice.status.toLowerCase()}`}>{invoice.status}</span></td>
                          <td className="py-3 px-4 text-gray-300 text-sm">{invoice.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Coupons Section */}
          {activeSection === "coupons" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Coupons & Discounts</h2>
                <button
                  onClick={() => handleAddClick("coupon")}
                  className="proj-new-btn px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  Create Coupon
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="panel-card rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{coupon.code}</h3>
                        <p className="text-sm text-gray-400">{coupon.discount} off</p>
                      </div>
                      <span className={`project-status ${coupon.status.toLowerCase()}`}>{coupon.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Uses Left</p>
                        <p className="text-lg font-bold text-white">{coupon.usesLeft}/{coupon.maxUses}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Expires</p>
                        <p className="text-lg font-bold text-white">{coupon.expiry}</p>
                      </div>
                    </div>
                    <button className="w-full text-sm font-medium text-violet-400 hover:text-violet-300">Edit Coupon</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage Limits Section */}
          {activeSection === "usagelimits" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Usage Limits Configuration</h2>
              <div className="panel-card rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="basicLimit" className="block text-sm font-medium text-white mb-2">Basic Plan Storage Limit</label>
                    <input id="basicLimit" type="text" defaultValue="5 GB" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500" />
                  </div>
                  <div>
                    <label htmlFor="proLimit" className="block text-sm font-medium text-white mb-2">Professional Plan Storage Limit</label>
                    <input id="proLimit" type="text" defaultValue="50 GB" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500" />
                  </div>
                  <div>
                    <label htmlFor="entLimit" className="block text-sm font-medium text-white mb-2">Enterprise Plan Storage Limit</label>
                    <input id="entLimit" type="text" defaultValue="Unlimited" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500" />
                  </div>
                  <div>
                    <label htmlFor="userLimit" className="block text-sm font-medium text-white mb-2">Maximum API Calls/Month</label>
                    <input id="userLimit" type="text" defaultValue="100,000" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Gateways Section */}
          {activeSection === "paymentgateways" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Payment Gateways</h2>
                <button
                  onClick={() => handleAddClick("gateway")}
                  className="proj-new-btn px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  Add Gateway
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Stripe", "PayPal", "Square", "Razorpay"].map((gateway) => (
                  <div key={gateway} className="panel-card rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">{gateway}</h3>
                      <span className="project-status active">Connected</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">Transactions: 2,345 | Volume: $234,500</p>
                    <div className="flex gap-2">
                      <button className="flex-1 text-sm font-medium text-violet-400 hover:text-violet-300">Configure</button>
                      <button className="flex-1 text-sm font-medium text-red-400 hover:text-red-300">Disconnect</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Renewal Requests Section */}
          {activeSection === "renewalrequests" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Renewal Requests</h2>
              <div className="panel-card rounded-2xl p-6">
                <div className="space-y-3">
                  {renewalRequests.map((req) => (
                    <div key={req.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">{req.customer}</p>
                        <p className="text-sm text-gray-400">{req.currentPlan} → {req.requestedPlan}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`project-status ${req.status.toLowerCase()}`}>{req.status}</span>
                        <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">Review</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === "analytics" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Subscription Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="panel-card rounded-2xl p-6">
                  <p className="text-sm text-gray-400 mb-2">Total Active Subscriptions</p>
                  <p className="text-4xl font-bold text-white mb-2">142</p>
                  <p className="text-xs text-green-400">+12% from last month</p>
                </div>
                <div className="panel-card rounded-2xl p-6">
                  <p className="text-sm text-gray-400 mb-2">Monthly Recurring Revenue</p>
                  <p className="text-4xl font-bold text-white mb-2">$28,450</p>
                  <p className="text-xs text-green-400">+8% from last month</p>
                </div>
                <div className="panel-card rounded-2xl p-6">
                  <p className="text-sm text-gray-400 mb-2">Churn Rate</p>
                  <p className="text-4xl font-bold text-white mb-2">2.3%</p>
                  <p className="text-xs text-red-400">↑ 0.5% from last month</p>
                </div>
                <div className="panel-card rounded-2xl p-6">
                  <p className="text-sm text-gray-400 mb-2">Average Plan Value</p>
                  <p className="text-4xl font-bold text-white mb-2">$200</p>
                  <p className="text-xs text-green-400">+3% from last month</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="panel-card rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New {modalTitle}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <HiOutlineX className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="modalInput" className="block text-sm font-medium text-white mb-2">Name</label>
                <input id="modalInput" type="text" placeholder="Enter name" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500" />
              </div>
              <div>
                <label htmlFor="modalValue" className="block text-sm font-medium text-white mb-2">Value/Amount</label>
                <input id="modalValue" type="text" placeholder="Enter value" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500" />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
