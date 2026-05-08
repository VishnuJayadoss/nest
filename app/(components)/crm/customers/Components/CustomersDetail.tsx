"use client";

import { useState } from "react";
import "../../crm.css";
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineOfficeBuilding,
  HiOutlineChevronDown,
  HiOutlineFilter,
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineSparkles,
} from "react-icons/hi";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  location: string;
  segment: "Enterprise" | "Mid Market" | "Small Business" | "Startup";
  status: "Active" | "At Risk" | "Onboarding" | "Paused" | "Churned";
  owner: string;
  plan: "Starter" | "Growth" | "Business" | "Enterprise";
  mrr: number;
  health: number;
  renewalDate: string;
  joinedDate: string;
  notes: string;
}

const initialCustomers: Customer[] = [
  { id: "CU001", name: "Alice Johnson", email: "alice@acmecorp.com", phone: "+1 555-0101", company: "Acme Corp", industry: "Manufacturing", location: "New York, USA", segment: "Enterprise", status: "Active", owner: "Sarah J.", plan: "Enterprise", mrr: 12800, health: 92, renewalDate: "2024-12-15", joinedDate: "2023-01-18", notes: "Expanding into two new departments this quarter." },
  { id: "CU002", name: "Bob Martinez", email: "bob@techstart.com", phone: "+1 555-0102", company: "TechStart Inc", industry: "Software", location: "San Francisco, USA", segment: "Startup", status: "Onboarding", owner: "Mike C.", plan: "Growth", mrr: 3200, health: 78, renewalDate: "2024-10-02", joinedDate: "2024-05-21", notes: "Needs API setup support before launch." },
  { id: "CU003", name: "Carol White", email: "carol@dataflow.com", phone: "+1 555-0103", company: "DataFlow Ltd", industry: "Analytics", location: "London, UK", segment: "Mid Market", status: "Active", owner: "Emma D.", plan: "Business", mrr: 7400, health: 86, renewalDate: "2025-01-12", joinedDate: "2022-09-04", notes: "High usage across reporting modules." },
  { id: "CU004", name: "David Lee", email: "david@globalent.com", phone: "+1 555-0104", company: "Global Enterprises", industry: "Logistics", location: "Singapore", segment: "Enterprise", status: "At Risk", owner: "John W.", plan: "Enterprise", mrr: 15600, health: 46, renewalDate: "2024-08-30", joinedDate: "2021-11-10", notes: "Recent support delays; schedule executive check-in." },
  { id: "CU005", name: "Eva Brown", email: "eva@startup.com", phone: "+1 555-0105", company: "StartUp Ventures", industry: "Finance", location: "Austin, USA", segment: "Small Business", status: "Active", owner: "Sarah J.", plan: "Growth", mrr: 2800, health: 81, renewalDate: "2024-11-18", joinedDate: "2023-07-26", notes: "Good candidate for Business plan upgrade." },
  { id: "CU006", name: "Frank Wilson", email: "frank@nexatech.com", phone: "+1 555-0106", company: "NexaTech", industry: "IT Services", location: "Toronto, Canada", segment: "Mid Market", status: "Paused", owner: "Mike C.", plan: "Business", mrr: 6100, health: 58, renewalDate: "2024-09-24", joinedDate: "2023-02-12", notes: "Implementation paused while their team migrates systems." },
  { id: "CU007", name: "Grace Kim", email: "grace@cloudbase.com", phone: "+1 555-0107", company: "CloudBase", industry: "Cloud", location: "Seattle, USA", segment: "Startup", status: "Active", owner: "Emma D.", plan: "Starter", mrr: 950, health: 74, renewalDate: "2024-07-30", joinedDate: "2024-03-09", notes: "Usage is climbing steadily after onboarding." },
  { id: "CU008", name: "Henry Scott", email: "henry@infosys.com", phone: "+1 555-0108", company: "InfoSys", industry: "Consulting", location: "Mumbai, India", segment: "Enterprise", status: "Churned", owner: "John W.", plan: "Enterprise", mrr: 0, health: 18, renewalDate: "2024-04-15", joinedDate: "2020-06-02", notes: "Lost to competitor after contract review." },
];

const statusConfig: Record<Customer["status"], string> = {
  Active: "bg-green-500/20 text-green-400 border border-green-500/30",
  "At Risk": "bg-red-500/20 text-red-400 border border-red-500/30",
  Onboarding: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Paused: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Churned: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
};

const segmentConfig: Record<Customer["segment"], string> = {
  Enterprise: "bg-purple-500/20 text-purple-400",
  "Mid Market": "bg-blue-500/20 text-blue-400",
  "Small Business": "bg-teal-500/20 text-teal-400",
  Startup: "bg-orange-500/20 text-orange-400",
};

const statusOptions: Customer["status"][] = ["Active", "At Risk", "Onboarding", "Paused", "Churned"];
const segmentOptions: Customer["segment"][] = ["Enterprise", "Mid Market", "Small Business", "Startup"];
const planOptions: Customer["plan"][] = ["Starter", "Growth", "Business", "Enterprise"];

const emptyForm: Omit<Customer, "id" | "joinedDate"> = {
  name: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  location: "",
  segment: "Mid Market",
  status: "Onboarding",
  owner: "",
  plan: "Growth",
  mrr: 0,
  health: 75,
  renewalDate: "",
  notes: "",
};

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="crm-card rounded-2xl p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-9 text-sm text-white outline-none transition focus:border-blue-500"
        >
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <HiOutlineChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder = "", rows }: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
}) {
  if (rows) {
    return (
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full resize-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition placeholder-slate-500 focus:border-blue-500"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition placeholder-slate-500 focus:border-blue-500"
      />
    </div>
  );
}

function HealthBar({ value }: { value: number }) {
  const color = value >= 80 ? "from-green-500 to-teal-500" : value >= 60 ? "from-yellow-500 to-orange-500" : "from-red-500 to-rose-500";

  return (
    <div className="flex min-w-32 items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-slate-700">
        <div className={`h-1.5 rounded-full bg-linear-to-r ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-300">{value}%</span>
    </div>
  );
}

export default function CustomersDetail() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterSegment, setFilterSegment] = useState<string>("All");
  const [filterPlan, setFilterPlan] = useState<string>("All");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState<Omit<Customer, "id" | "joinedDate">>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = customers.filter((customer) => {
    const query = search.toLowerCase();
    const matchSearch =
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.company.toLowerCase().includes(query) ||
      customer.industry.toLowerCase().includes(query);
    const matchStatus = filterStatus === "All" || customer.status === filterStatus;
    const matchSegment = filterSegment === "All" || customer.segment === filterSegment;
    const matchPlan = filterPlan === "All" || customer.plan === filterPlan;
    return matchSearch && matchStatus && matchSegment && matchPlan;
  });

  const totalMrr = customers.reduce((sum, customer) => sum + customer.mrr, 0);
  const averageHealth = Math.round(customers.reduce((sum, customer) => sum + customer.health, 0) / customers.length);

  const openAdd = () => {
    setForm(emptyForm);
    setModal("add");
  };

  const openEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      industry: customer.industry,
      location: customer.location,
      segment: customer.segment,
      status: customer.status,
      owner: customer.owner,
      plan: customer.plan,
      mrr: customer.mrr,
      health: customer.health,
      renewalDate: customer.renewalDate,
      notes: customer.notes,
    });
    setModal("edit");
  };

  const openView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModal("view");
  };

  const closeModal = () => {
    setModal(null);
    setSelectedCustomer(null);
  };

  const saveCustomer = () => {
    if (modal === "add") {
      const newCustomer: Customer = {
        ...form,
        id: `CU${Date.now()}`,
        joinedDate: new Date().toISOString().split("T")[0],
      };
      setCustomers([newCustomer, ...customers]);
    } else if (modal === "edit" && selectedCustomer) {
      setCustomers(customers.map((customer) => customer.id === selectedCustomer.id ? { ...customer, ...form } : customer));
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (deleteId) setCustomers(customers.filter((customer) => customer.id !== deleteId));
    setDeleteId(null);
  };

  const f = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: key === "mrr" || key === "health" ? Number(value) : value,
    }));
  };

  return (
    <div className="crm-dashboard min-h-screen space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Customers</h1>
          <p className="mt-1 text-sm text-slate-400">Manage accounts, renewals, health, and recurring revenue</p>
        </div>
        <button onClick={openAdd} className="crm-btn crm-btn-primary">
          <HiOutlinePlus className="h-4 w-4" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Customers" value={customers.length} sub="Managed accounts" color="text-white" />
        <StatCard label="Active" value={customers.filter((customer) => customer.status === "Active").length} sub="Healthy accounts" color="text-green-400" />
        <StatCard label="At Risk" value={customers.filter((customer) => customer.status === "At Risk").length} sub="Needs attention" color="text-red-400" />
        <StatCard label="Monthly MRR" value={`$${(totalMrr / 1000).toFixed(1)}K`} sub="Recurring revenue" color="text-blue-400" />
        <StatCard label="Avg Health" value={`${averageHealth}%`} sub="Portfolio score" color="text-yellow-400" />
      </div>

      <div className="crm-card rounded-2xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-48 flex-1">
            <HiOutlineSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full rounded-xl border border-slate-600 bg-slate-800 py-2.5 pl-9 pr-4 text-sm text-white outline-none transition placeholder-slate-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none transition focus:border-blue-500">
              <option value="All">All Status</option>
              {statusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="relative">
            <select value={filterSegment} onChange={(e) => setFilterSegment(e.target.value)} className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none transition focus:border-blue-500">
              <option value="All">All Segments</option>
              {segmentOptions.map((segment) => <option key={segment}>{segment}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="relative">
            <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)} className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none transition focus:border-blue-500">
              <option value="All">All Plans</option>
              {planOptions.map((plan) => <option key={plan}>{plan}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
            <HiOutlineFilter className="h-4 w-4" />
            {filtered.length} of {customers.length} customers
          </div>
        </div>
      </div>

      <div className="crm-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Company</th>
                <th>Segment</th>
                <th>Status</th>
                <th>Plan</th>
                <th>MRR</th>
                <th>Health</th>
                <th>Renewal</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">No customers found</td>
                </tr>
              )}
              {filtered.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="crm-icon-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold">
                        {customer.name.split(" ").map((part) => part.charAt(0)).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{customer.name}</p>
                        <p className="text-xs text-slate-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <HiOutlineOfficeBuilding className="h-4 w-4 shrink-0 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-300">{customer.company}</p>
                        <p className="text-xs text-slate-500">{customer.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className={`crm-badge text-xs ${segmentConfig[customer.segment]}`}>{customer.segment}</span></td>
                  <td><span className={`crm-badge text-xs ${statusConfig[customer.status]}`}>{customer.status}</span></td>
                  <td><span className="text-sm text-slate-300">{customer.plan}</span></td>
                  <td><span className="text-sm font-semibold text-white">${customer.mrr.toLocaleString()}</span></td>
                  <td><HealthBar value={customer.health} /></td>
                  <td><span className="text-sm text-slate-400">{customer.renewalDate}</span></td>
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openView(customer)} className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/20" title="View">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                      <button onClick={() => openEdit(customer)} className="rounded-lg p-2 text-yellow-400 transition hover:bg-yellow-500/20" title="Edit">
                        <HiOutlinePencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(customer.id)} className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/20" title="Delete">
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="crm-card max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{modal === "add" ? "Add New Customer" : "Edit Customer"}</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField label="Customer Name" value={form.name} onChange={f("name")} placeholder="Alice Johnson" />
              <InputField label="Email" value={form.email} onChange={f("email")} type="email" placeholder="alice@company.com" />
              <InputField label="Phone" value={form.phone} onChange={f("phone")} placeholder="+1 555-0000" />
              <InputField label="Company" value={form.company} onChange={f("company")} placeholder="Acme Corp" />
              <InputField label="Industry" value={form.industry} onChange={f("industry")} placeholder="Software" />
              <InputField label="Location" value={form.location} onChange={f("location")} placeholder="New York, USA" />
              <SelectField label="Segment" value={form.segment} onChange={f("segment")} options={segmentOptions} />
              <SelectField label="Status" value={form.status} onChange={f("status")} options={statusOptions} />
              <SelectField label="Plan" value={form.plan} onChange={f("plan")} options={planOptions} />
              <InputField label="Account Owner" value={form.owner} onChange={f("owner")} placeholder="Sales rep name" />
              <InputField label="Monthly MRR ($)" value={form.mrr} onChange={f("mrr")} type="number" placeholder="5000" />
              <InputField label="Health Score" value={form.health} onChange={f("health")} type="number" placeholder="85" />
              <div className="sm:col-span-2">
                <InputField label="Renewal Date" value={form.renewalDate} onChange={f("renewalDate")} type="date" />
              </div>
              <div className="sm:col-span-2">
                <InputField label="Notes" value={form.notes} onChange={f("notes")} placeholder="Customer context and next steps..." rows={3} />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700">
                Cancel
              </button>
              <button
                onClick={saveCustomer}
                disabled={!form.name || !form.email || !form.company}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition ${
                  form.name && form.email && form.company ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90" : "cursor-not-allowed bg-slate-700 text-slate-500"
                }`}
              >
                {modal === "add" ? "Add Customer" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "view" && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="crm-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Customer Details</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-5 flex items-center gap-4">
              <div className="crm-icon-primary flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold">
                {selectedCustomer.name.split(" ").map((part) => part.charAt(0)).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-xl font-bold text-white">{selectedCustomer.name}</p>
                <p className="text-sm text-slate-400">{selectedCustomer.company} - {selectedCustomer.industry}</p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                <p className="text-xs text-slate-500">Monthly MRR</p>
                <p className="mt-1 text-lg font-bold text-green-400">${selectedCustomer.mrr.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                <p className="text-xs text-slate-500">Health Score</p>
                <div className="mt-2"><HealthBar value={selectedCustomer.health} /></div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: <HiOutlineMail className="h-4 w-4" />, label: "Email", value: selectedCustomer.email },
                { icon: <HiOutlinePhone className="h-4 w-4" />, label: "Phone", value: selectedCustomer.phone },
                { icon: <HiOutlineOfficeBuilding className="h-4 w-4" />, label: "Company", value: selectedCustomer.company },
                { icon: <HiOutlineLocationMarker className="h-4 w-4" />, label: "Location", value: selectedCustomer.location },
                { icon: <HiOutlineUser className="h-4 w-4" />, label: "Owner", value: selectedCustomer.owner },
                { icon: <HiOutlineCurrencyDollar className="h-4 w-4" />, label: "Plan", value: selectedCustomer.plan },
                { icon: <HiOutlineCalendar className="h-4 w-4" />, label: "Joined", value: selectedCustomer.joinedDate },
                { icon: <HiOutlineCalendar className="h-4 w-4" />, label: "Renewal", value: selectedCustomer.renewalDate },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 rounded-xl bg-slate-800/50 px-4 py-3">
                  <span className="text-slate-400">{row.icon}</span>
                  <span className="w-24 text-xs text-slate-500">{row.label}</span>
                  <span className="text-sm text-white">{row.value}</span>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="mb-1 text-xs text-slate-500">Status</p>
                  <span className={`crm-badge text-xs ${statusConfig[selectedCustomer.status]}`}>{selectedCustomer.status}</span>
                </div>
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="mb-1 text-xs text-slate-500">Segment</p>
                  <span className={`crm-badge text-xs ${segmentConfig[selectedCustomer.segment]}`}>{selectedCustomer.segment}</span>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <div className="mb-2 flex items-center gap-2">
                    <HiOutlineSparkles className="h-4 w-4 text-slate-400" />
                    <p className="text-xs text-slate-500">Notes</p>
                  </div>
                  <p className="text-sm text-slate-300">{selectedCustomer.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700">
                Close
              </button>
              <button onClick={() => openEdit(selectedCustomer)} className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                Edit Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="crm-card w-full max-w-sm rounded-2xl p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
              <HiOutlineTrash className="h-7 w-7 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Delete Customer?</h3>
            <p className="mt-2 text-sm text-slate-400">This customer account will be removed from the list.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700">
                Cancel
              </button>
              <button onClick={confirmDelete} className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
