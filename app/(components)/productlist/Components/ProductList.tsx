"use client";

import "./productlist.css";

/* ── PRODUCT DATA ── */
const products = [
  { title: "ADMINISTRATION", id: "1" },
  { title: "CRM", id: "2" },
  { title: "ERP", id: "3" },
  { title: "HRM", id: "4" },
  { title: "Billing", id: "5" },
  { title: "Inventory", id: "6" },
];

export default function ProductList() {
  return (
    <div className="auth-scene">

      {/* Blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
      <div className="blob blob-5" />

      {/* Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Grid */}
      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="glass-card">
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}