"use client";

import "@/app/layout/header.css";
import { HiOutlineCreditCard, HiOutlineCheckCircle } from "react-icons/hi";

const plans = [
  { name: "Basic", price: "$29", users: "Up to 10 users", features: ["CRM Access", "Basic Support", "5GB Storage"], color: "blue", subscribers: 45 },
  { name: "Professional", price: "$99", users: "Up to 50 users", features: ["CRM + ERP", "Priority Support", "50GB Storage", "API Access"], color: "violet", subscribers: 67 },
  { name: "Enterprise", price: "$299", users: "Unlimited users", features: ["Full Suite", "24/7 Support", "Unlimited Storage", "Custom Integration"], color: "green", subscribers: 30 },
];

export default function Detail() {
  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Plans & Subscriptions</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage subscription plans</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`ac-product-card ac-card-${plan.color} p-6 rounded-2xl`}>
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
            <div className="text-center pt-4" style={{ borderTop: "1px solid var(--panel-border)" }}>
              <span className="text-sm font-semibold text-white">{plan.subscribers} subscribers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
