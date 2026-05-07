"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlus,
} from "react-icons/hi";

interface Tenant {
  id: string;
  name: string;
  email: string;
  access: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    export: boolean;
    admin: boolean;
  };
  status: "active" | "inactive";
  addedDate: string;
}

const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    access: { view: true, edit: true, delete: false, export: true, admin: false },
    status: "active",
    addedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Tech Solutions Inc",
    email: "info@techsolutions.com",
    access: { view: true, edit: true, delete: false, export: false, admin: false },
    status: "active",
    addedDate: "2024-02-10",
  },
  {
    id: "3",
    name: "Global Enterprises",
    email: "admin@globalent.com",
    access: { view: true, edit: true, delete: true, export: true, admin: true },
    status: "active",
    addedDate: "2024-01-05",
  },
  {
    id: "4",
    name: "StartUp Ventures",
    email: "hello@startupventures.com",
    access: { view: true, edit: false, delete: false, export: false, admin: false },
    status: "inactive",
    addedDate: "2024-03-01",
  },
];

export default function Detail() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [showModal, setShowModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const toggleAccess = (tenantId: string, permission: keyof Tenant["access"]) => {
    setTenants(
      tenants.map((tenant) =>
        tenant.id === tenantId
          ? { ...tenant, access: { ...tenant.access, [permission]: !tenant.access[permission] } }
          : tenant
      )
    );
  };

  const toggleStatus = (tenantId: string) => {
    setTenants(
      tenants.map((tenant) =>
        tenant.id === tenantId
          ? { ...tenant, status: tenant.status === "active" ? "inactive" : "active" }
          : tenant
      )
    );
  };

  const removeTenant = (tenantId: string) => {
    setTenants(tenants.filter((tenant) => tenant.id !== tenantId));
  };

  const openTenantModal = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowModal(true);
  };

  return (
    <div className="dash-page p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">HRM Access Management</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Manage tenant access and permissions for HRM module
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition">
          <HiOutlinePlus className="w-4 h-4" />
          Add Tenant
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Tenants</p>
          <p className="text-2xl font-bold text-white mt-1">{tenants.length}</p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Active Tenants</p>
          <p className="text-2xl font-bold text-white mt-1">{tenants.filter((t) => t.status === "active").length}</p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Admin Access</p>
          <p className="text-2xl font-bold text-white mt-1">{tenants.filter((t) => t.access.admin).length}</p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Inactive Tenants</p>
          <p className="text-2xl font-bold text-white mt-1">{tenants.filter((t) => t.status === "inactive").length}</p>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="panel-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white">Tenant</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">View</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">Edit</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">Delete</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">Export</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">Admin</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-white">{tenant.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {tenant.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(tenant.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        tenant.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {tenant.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                  {Object.entries(tenant.access).map(([key, value]) => (
                    <td key={key} className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleAccess(tenant.id, key as keyof Tenant["access"])}
                        className={`inline-flex items-center justify-center w-6 h-6 rounded transition ${
                          value
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {value ? (
                          <HiOutlineCheck className="w-4 h-4" />
                        ) : (
                          <HiOutlineX className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openTenantModal(tenant)}
                        className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition"
                        title="View Details"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeTenant(tenant.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                        title="Remove Tenant"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Details Modal */}
      {showModal && selectedTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="panel-card rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Tenant Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Name</p>
                <p className="text-sm font-medium text-white mt-1">{selectedTenant.name}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Email</p>
                <p className="text-sm font-medium text-white mt-1">{selectedTenant.email}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Added Date</p>
                <p className="text-sm font-medium text-white mt-1">{selectedTenant.addedDate}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Permissions</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(selectedTenant.access).map(([key, value]) => (
                    <div
                      key={key}
                      className={`px-3 py-2 rounded-lg text-xs font-medium capitalize ${
                        value
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {key}: {value ? "✓" : "✗"}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
