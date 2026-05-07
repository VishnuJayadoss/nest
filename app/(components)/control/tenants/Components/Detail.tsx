"use client";

import "@/app/layout/header.css";
import { useState } from "react";
import { HiOutlineOfficeBuilding, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle, HiOutlinePlus, HiOutlineSearch, HiOutlineCreditCard, HiOutlineUserGroup, HiOutlineCube, HiOutlineChartBar, HiOutlineClipboardList, HiOutlineSupport, HiOutlineColorSwatch, HiOutlineBan, HiOutlineX, HiOutlinePencil } from "react-icons/hi";

const stats = [
  { label: "Total Tenants", value: "142", change: "+12%", color: "violet", icon: <HiOutlineOfficeBuilding className="w-5 h-5" /> },
  { label: "Active", value: "128", change: "+8%", color: "green", icon: <HiOutlineCheckCircle className="w-5 h-5" /> },
  { label: "Trial", value: "11", change: "+3%", color: "orange", icon: <HiOutlineClock className="w-5 h-5" /> },
  { label: "Suspended", value: "3", change: "-2%", color: "red", icon: <HiOutlineXCircle className="w-5 h-5" /> },
];

const tenants = [
  { id: 1, name: "Acme Corp", users: 245, plan: "Enterprise", status: "Active", color: "violet", revenue: "$2,450", modules: ["CRM", "ERP", "HRM"] },
  { id: 2, name: "TechStart Inc", users: 89, plan: "Professional", status: "Active", color: "blue", revenue: "$890", modules: ["CRM", "ERP"] },
  { id: 3, name: "DataFlow Ltd", users: 156, plan: "Enterprise", status: "Active", color: "green", revenue: "$1,560", modules: ["CRM", "HRM"] },
  { id: 4, name: "NexaCorp", users: 45, plan: "Basic", status: "Trial", color: "orange", revenue: "$0", modules: ["CRM"] },
  { id: 5, name: "CloudSync", users: 12, plan: "Professional", status: "Suspended", color: "red", revenue: "$0", modules: ["CRM"] },
];

const tenantActions = [
  { icon: <HiOutlineOfficeBuilding className="w-5 h-5" />, label: "Tenant Details", desc: "View complete information", color: "violet" },
  { icon: <HiOutlineCreditCard className="w-5 h-5" />, label: "Subscription & Billing", desc: "Manage plans and payments", color: "blue" },
  { icon: <HiOutlineUserGroup className="w-5 h-5" />, label: "Users & Employees", desc: "Manage tenant users", color: "green" },
  { icon: <HiOutlineCube className="w-5 h-5" />, label: "Enabled Modules", desc: "CRM, ERP, HRM access", color: "orange" },
  { icon: <HiOutlineChartBar className="w-5 h-5" />, label: "Usage & Limits", desc: "Monitor resource usage", color: "cyan" },
  { icon: <HiOutlineClipboardList className="w-5 h-5" />, label: "Activity Logs", desc: "View tenant activity", color: "violet" },
  { icon: <HiOutlineSupport className="w-5 h-5" />, label: "Support History", desc: "Tickets and requests", color: "blue" },
  { icon: <HiOutlineColorSwatch className="w-5 h-5" />, label: "Custom Branding", desc: "Logo and theme settings", color: "green" },
  { icon: <HiOutlineBan className="w-5 h-5" />, label: "Suspend / Activate", desc: "Control tenant access", color: "red" },
];

export default function Detail() {
  const [selectedTenant, setSelectedTenant] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    plan: "Basic",
    status: "Active",
  });

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTenant = tenants.find(t => t.id === selectedTenant);

  const handleCreateClick = () => {
    setFormData({ name: "", plan: "Basic", status: "Active" });
    setShowCreateModal(true);
  };

  const handleManagementAction = (actionLabel: string) => {
    setSelectedAction(actionLabel);
    setShowEditModal(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateSubmit = () => {
    console.log("Creating tenant:", formData);
    setShowCreateModal(false);
    setFormData({ name: "", plan: "Basic", status: "Active" });
  };

  const handleEditSubmit = () => {
    console.log("Updating tenant:", formData);
    setShowEditModal(false);
  };

  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenants</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage all tenant organizations</p>
        </div>
        <button className="proj-new-btn px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2" onClick={handleCreateClick}>
          <HiOutlinePlus className="w-4 h-4" />
          Create Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`stat-card-${s.color} p-5 rounded-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`stat-icon-${s.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                {s.icon}
              </div>
              <span className={`stat-change ${s.change.startsWith("+") ? "positive" : "negative"}`}>
                {s.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* All Tenants List */}
        <div className="lg:col-span-1 panel-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">All Tenants</h2>
          </div>
          
          {/* Search */}
          <div className="header-search rounded-xl px-3 py-2 flex items-center gap-2 mb-4">
            <HiOutlineSearch className="w-4 h-4" style={{ color: "var(--text-faint)" }} />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full"
            />
          </div>

          <div className="space-y-2 max-h-150 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139, 92, 246, 0.3) transparent" }}>
            {filteredTenants.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTenant(t.id)}
                className={`w-full text-left project-row p-3 rounded-xl transition-all ${
                  selectedTenant === t.id ? "ring-2 ring-violet-500" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`stat-icon-${t.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                    <HiOutlineOfficeBuilding className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`project-status ${t.status.toLowerCase()}`}>{t.status}</span>
                      <span className="text-xs" style={{ color: "var(--text-faint)" }}>{t.users} users</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tenant Management Options */}
        <div className="lg:col-span-2 space-y-6">
          {selectedTenant ? (
            <>
              {/* Selected Tenant Header */}
              <div className="panel-card rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`stat-icon-${currentTenant?.color} w-16 h-16 rounded-xl flex items-center justify-center`}>
                      <HiOutlineOfficeBuilding className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{currentTenant?.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`project-status ${currentTenant?.status.toLowerCase()}`}>{currentTenant?.status}</span>
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>{currentTenant?.plan} Plan</span>
                        <span className="text-sm font-semibold text-white">{currentTenant?.revenue}/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6" style={{ borderTop: "1px solid var(--panel-border)" }}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{currentTenant?.users}</div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Total Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{currentTenant?.modules.length}</div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Active Modules</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Usage</div>
                  </div>
                </div>
              </div>

              {/* Management Actions Grid */}
              <div className="panel-card rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">Tenant Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tenantActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleManagementAction(action.label)}
                      className={`tenant-action-card tenant-action-${action.color} p-4 rounded-xl text-left flex items-start gap-3 transition-all`}
                    >
                      <div className={`tenant-action-icon tenant-action-icon-${action.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                        {action.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white mb-0.5">{action.label}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{action.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enabled Modules */}
              <div className="panel-card rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-4">Enabled Modules</h3>
                <div className="flex flex-wrap gap-2">
                  {currentTenant?.modules.map((module) => (
                    <span key={module} className="project-status active">{module}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="panel-card rounded-2xl p-12 text-center">
              <div className="stat-icon-violet w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HiOutlineOfficeBuilding className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Select a Tenant</h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Choose a tenant from the list to view management options</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Tenant Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="panel-card rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Create New Tenant</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <HiOutlineX className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="tenantName" className="block text-sm font-medium text-white mb-2">Tenant Name</label>
                <input
                  id="tenantName"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="Enter tenant name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label htmlFor="planSelect" className="block text-sm font-medium text-white mb-2">Plan</label>
                <select
                  id="planSelect"
                  value={formData.plan}
                  onChange={(e) => handleFormChange("plan", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500"
                >
                  <option>Basic</option>
                  <option>Professional</option>
                  <option>Enterprise</option>
                </select>
              </div>

              <div>
                <label htmlFor="statusSelect" className="block text-sm font-medium text-white mb-2">Status</label>
                <select
                  id="statusSelect"
                  value={formData.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500"
                >
                  <option>Active</option>
                  <option>Trial</option>
                  <option>Suspended</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSubmit}
                  className="flex-1 px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Management Modal */}
      {showEditModal && currentTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="panel-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedAction}</h2>
                <p className="text-sm text-gray-400 mt-1">Tenant: {currentTenant.name}</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <HiOutlineX className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="space-y-6">
              {selectedAction === "Tenant Details" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="detailTenantName" className="block text-sm font-medium text-white mb-2">Tenant Name</label>
                    <input
                      id="detailTenantName"
                      type="text"
                      defaultValue={currentTenant.name}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="detailPlan" className="block text-sm font-medium text-white mb-2">Plan</label>
                    <input
                      id="detailPlan"
                      type="text"
                      defaultValue={currentTenant.plan}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="detailUsers" className="block text-sm font-medium text-white mb-2">Total Users</label>
                    <input
                      id="detailUsers"
                      type="text"
                      defaultValue={currentTenant.users}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              )}

              {selectedAction === "Subscription & Billing" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="billingPlan" className="block text-sm font-medium text-white mb-2">Plan</label>
                      <input
                        id="billingPlan"
                        type="text"
                        defaultValue={currentTenant.plan}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-white mb-2">Monthly Revenue</label>
                      <input
                        id="monthlyRevenue"
                        type="text"
                        defaultValue={currentTenant.revenue}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="billingCycle" className="block text-sm font-medium text-white mb-2">Billing Cycle</label>
                    <select id="billingCycle" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500">
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Annual</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedAction === "Users & Employees" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="usersTotal" className="block text-sm font-medium text-white mb-2">Total Users</label>
                    <input
                      id="usersTotal"
                      type="text"
                      defaultValue={currentTenant.users}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="addNewUser" className="block text-sm font-medium text-white mb-2">Add New User</label>
                    <input
                      id="addNewUser"
                      type="email"
                      placeholder="user@example.com"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              )}

              {selectedAction === "Enabled Modules" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">Current Enabled Modules:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentTenant.modules.map((module) => (
                      <span key={module} className="project-status active">{module}</span>
                    ))}
                  </div>
                  <div className="space-y-2 mt-4">
                    <p className="text-sm text-gray-400">Available Modules:</p>
                    {["CRM", "ERP", "HRM", "Analytics", "Reports"].map((module) => (
                      <label key={module} className="flex items-center gap-2 text-white">
                        <input
                          type="checkbox"
                          defaultChecked={currentTenant.modules.includes(module)}
                          className="rounded"
                        />
                        {module}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {selectedAction === "Usage & Limits" && (
                <div className="space-y-4">
                  <div>
                    <p className="block text-sm font-medium text-white mb-2">Current Usage: 98%</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-violet-600 h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-xs text-gray-400">Storage Used</p>
                      <p className="text-lg font-bold text-white">980 MB</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <p className="text-xs text-gray-400">Storage Limit</p>
                      <p className="text-lg font-bold text-white">1000 MB</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedAction === "Activity Logs" && (
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-white">User login: John Doe</p>
                    <p className="text-xs text-gray-400">May 6, 2026 - 2:45 PM</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-white">Module enabled: Analytics</p>
                    <p className="text-xs text-gray-400">May 5, 2026 - 10:20 AM</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-white">Plan updated: Basic → Professional</p>
                    <p className="text-xs text-gray-400">May 1, 2026 - 3:15 PM</p>
                  </div>
                </div>
              )}

              {selectedAction === "Support History" && (
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Ticket #1001</p>
                      <span className="project-status active">Resolved</span>
                    </div>
                    <p className="text-xs text-gray-400">Issue with user login - May 3, 2026</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Ticket #1000</p>
                      <span className="project-status active">Resolved</span>
                    </div>
                    <p className="text-xs text-gray-400">Feature request: Custom branding - April 28, 2026</p>
                  </div>
                </div>
              )}

              {selectedAction === "Custom Branding" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="logoUrl" className="block text-sm font-medium text-white mb-2">Logo URL</label>
                    <input
                      id="logoUrl"
                      type="text"
                      placeholder="https://example.com/logo.png"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="primaryColor" className="block text-sm font-medium text-white mb-2">Primary Color</label>
                    <input
                      id="primaryColor"
                      type="color"
                      defaultValue="#8B5CF6"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="brandingCompanyName" className="block text-sm font-medium text-white mb-2">Company Name</label>
                    <input
                      id="brandingCompanyName"
                      type="text"
                      defaultValue={currentTenant.name}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              )}

              {selectedAction === "Suspend / Activate" && (
                <div className="space-y-4">
                  <div className="bg-yellow-900 bg-opacity-20 border border-yellow-600 rounded-lg p-4">
                    <p className="text-sm text-yellow-200">
                      Current Status: <span className="font-semibold">{currentTenant.status}</span>
                    </p>
                  </div>
                  <div>
                    <label htmlFor="changeStatus" className="block text-sm font-medium text-white mb-2">Change Status</label>
                    <select id="changeStatus" className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-violet-500">
                      <option>Active</option>
                      <option>Trial</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="changeReason" className="block text-sm font-medium text-white mb-2">Reason (optional)</label>
                    <textarea
                      id="changeReason"
                      placeholder="Enter reason for status change"
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-violet-500"
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-6 mt-6" style={{ borderTop: "1px solid var(--panel-border)" }}>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
              >
                <HiOutlinePencil className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
