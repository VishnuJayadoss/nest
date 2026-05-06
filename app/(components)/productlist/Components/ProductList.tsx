"use client";

import Link from "next/link";
import "./productlist.css";

/* ── PRODUCT DATA ── */
const products = [
  { title: "ADMINISTRATION", id: "1", link: "/control/dashboard" },
  { title: "CRM", id: "2", link: "" },
  { title: "ERP", id: "3", link: "" },
  { title: "HRM", id: "4", link: "" },
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
            <Link href={item.link}>
              <h2>{item.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}