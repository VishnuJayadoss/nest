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
} from "react-icons/hi";

// ── Types ─────────────────────────────────────────────
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: "Website" | "Referral" | "Social Media" | "Cold Call" | "Email Campaign";
  status: "New" | "Contacted" | "Qualified" | "Unqualified" | "Converted";
  priority: "Low" | "Medium" | "High";
  value: number;
  assignedTo: string;
  createdDate: string;
}

// ── Mock Data ─────────────────────────────────────────
const initialLeads: Lead[] = [
  { id: "L001", name: "Alice Johnson", email: "alice@acmecorp.com", phone: "+1 555-0101", company: "Acme Corp", source: "Website", status: "New", priority: "High", value: 25000, assignedTo: "Sarah J.", createdDate: "2024-06-01" },
  { id: "L002", name: "Bob Martinez", email: "bob@techstart.com", phone: "+1 555-0102", company: "TechStart Inc", source: "Referral", status: "Contacted", priority: "Medium", value: 18000, assignedTo: "Mike C.", createdDate: "2024-06-03" },
  { id: "L003", name: "Carol White", email: "carol@dataflow.com", phone: "+1 555-0103", company: "DataFlow Ltd", source: "Social Media", status: "Qualified", priority: "High", value: 42000, assignedTo: "Emma D.", createdDate: "2024-06-05" },
  { id: "L004", name: "David Lee", email: "david@globalent.com", phone: "+1 555-0104", company: "Global Enterprises", source: "Cold Call", status: "Unqualified", priority: "Low", value: 5000, assignedTo: "John W.", createdDate: "2024-06-07" },
  { id: "L005", name: "Eva Brown", email: "eva@startup.com", phone: "+1 555-0105", company: "StartUp Ventures", source: "Email Campaign", status: "Converted", priority: "High", value: 60000, assignedTo: "Sarah J.", createdDate: "2024-06-09" },
  { id: "L006", name: "Frank Wilson", email: "frank@nexatech.com", phone: "+1 555-0106", company: "NexaTech", source: "Website", status: "New", priority: "Medium", value: 15000, assignedTo: "Mike C.", createdDate: "2024-06-11" },
  { id: "L007", name: "Grace Kim", email: "grace@cloudbase.com", phone: "+1 555-0107", company: "CloudBase", source: "Referral", status: "Contacted", priority: "High", value: 33000, assignedTo: "Emma D.", createdDate: "2024-06-13" },
  { id: "L008", name: "Henry Scott", email: "henry@infosys.com", phone: "+1 555-0108", company: "InfoSys", source: "Cold Call", status: "Qualified", priority: "Medium", value: 27000, assignedTo: "John W.", createdDate: "2024-06-15" },
];

// ── Config ────────────────────────────────────────────
const statusConfig: Record<Lead["status"], string> = {
  New: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Contacted: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Qualified: "bg-green-500/20 text-green-400 border border-green-500/30",
  Unqualified: "bg-red-500/20 text-red-400 border border-red-500/30",
  Converted: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
};

const priorityConfig: Record<Lead["priority"], string> = {
  Low: "bg-slate-500/20 text-slate-400",
  Medium: "bg-orange-500/20 text-orange-400",
  High: "bg-red-500/20 text-red-400",
};

const sourceOptions: Lead["source"][] = ["Website", "Referral", "Social Media", "Cold Call", "Email Campaign"];
const statusOptions: Lead["status"][] = ["New", "Contacted", "Qualified", "Unqualified", "Converted"];
const priorityOptions: Lead["priority"][] = ["Low", "Medium", "High"];

const emptyForm: Omit<Lead, "id" | "createdDate"> = {
  name: "", email: "", phone: "", company: "",
  source: "Website", status: "New", priority: "Medium",
  value: 0, assignedTo: "",
};

// ── Sub-components ────────────────────────────────────
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
      <label className="mb-1.5 block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-9 text-sm text-white outline-none focus:border-blue-500 transition"
        >
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <HiOutlineChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
      />
    </div>
  );
}

// ── Main Component ────────────────────────────────────
export default function LeadsDetail() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [filterSource, setFilterSource] = useState<string>("All");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [form, setForm] = useState<Omit<Lead, "id" | "createdDate">>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ── Filtered leads ──
  const filtered = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const matchPriority = filterPriority === "All" || l.priority === filterPriority;
    const matchSource = filterSource === "All" || l.source === filterSource;
    return matchSearch && matchStatus && matchPriority && matchSource;
  });

  // ── Handlers ──
  const openAdd = () => { setForm(emptyForm); setModal("add"); };
  const openEdit = (lead: Lead) => { setSelectedLead(lead); setForm({ name: lead.name, email: lead.email, phone: lead.phone, company: lead.company, source: lead.source, status: lead.status, priority: lead.priority, value: lead.value, assignedTo: lead.assignedTo }); setModal("edit"); };
  const openView = (lead: Lead) => { setSelectedLead(lead); setModal("view"); };
  const closeModal = () => { setModal(null); setSelectedLead(null); };

  const saveLead = () => {
    if (modal === "add") {
      const newLead: Lead = { ...form, id: `L${Date.now()}`, createdDate: new Date().toISOString().split("T")[0] };
      setLeads([newLead, ...leads]);
    } else if (modal === "edit" && selectedLead) {
      setLeads(leads.map((l) => l.id === selectedLead.id ? { ...l, ...form } : l));
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (deleteId) setLeads(leads.filter((l) => l.id !== deleteId));
    setDeleteId(null);
  };

  const f = (key: keyof typeof form) => (v: string) => setForm((prev) => ({ ...prev, [key]: key === "value" ? Number(v) : v }));

  return (
    <div className="crm-dashboard min-h-screen p-6 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Leads</h1>
          <p className="mt-1 text-sm text-slate-400">Track and manage your sales leads pipeline</p>
        </div>
        <button onClick={openAdd} className="crm-btn crm-btn-primary">
          <HiOutlinePlus className="h-4 w-4" />
          Add Lead
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Leads" value={leads.length} sub="All time" color="text-white" />
        <StatCard label="New" value={leads.filter((l) => l.status === "New").length} sub="Awaiting contact" color="text-blue-400" />
        <StatCard label="Qualified" value={leads.filter((l) => l.status === "Qualified").length} sub="Ready to convert" color="text-green-400" />
        <StatCard label="Converted" value={leads.filter((l) => l.status === "Converted").length} sub="Closed deals" color="text-purple-400" />
        <StatCard label="Pipeline Value" value={`$${(leads.reduce((s, l) => s + l.value, 0) / 1000).toFixed(0)}K`} sub="Total estimated" color="text-yellow-400" />
      </div>

      {/* ── Filters ── */}
      <div className="crm-card rounded-2xl p-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <HiOutlineSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full rounded-xl border border-slate-600 bg-slate-800 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none focus:border-blue-500 transition"
            >
              <option value="All">All Status</option>
              {statusOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          {/* Priority filter */}
          <div className="relative">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none focus:border-blue-500 transition"
            >
              <option value="All">All Priority</option>
              {priorityOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          {/* Source filter */}
          <div className="relative">
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none focus:border-blue-500 transition"
            >
              <option value="All">All Sources</option>
              {sourceOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 ml-auto">
            <HiOutlineFilter className="h-4 w-4" />
            {filtered.length} of {leads.length} leads
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="crm-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Company</th>
                <th>Source</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Value</th>
                <th>Assigned To</th>
                <th>Created</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">No leads found</td>
                </tr>
              )}
              {filtered.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="crm-icon-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{lead.name}</p>
                        <p className="text-xs text-slate-400">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <HiOutlineOfficeBuilding className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-sm text-slate-300">{lead.company}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-slate-300">{lead.source}</span>
                  </td>
                  <td>
                    <span className={`crm-badge text-xs ${statusConfig[lead.status]}`}>{lead.status}</span>
                  </td>
                  <td>
                    <span className={`crm-badge text-xs ${priorityConfig[lead.priority]}`}>{lead.priority}</span>
                  </td>
                  <td>
                    <span className="text-sm font-semibold text-white">${lead.value.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="text-sm text-slate-300">{lead.assignedTo}</span>
                  </td>
                  <td>
                    <span className="text-sm text-slate-400">{lead.createdDate}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openView(lead)} className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition" title="View">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                      <button onClick={() => openEdit(lead)} className="p-2 rounded-lg hover:bg-yellow-500/20 text-yellow-400 transition" title="Edit">
                        <HiOutlinePencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(lead.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition" title="Delete">
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

      {/* ── Add / Edit Modal ── */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="crm-card w-full max-w-2xl rounded-2xl p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{modal === "add" ? "Add New Lead" : "Edit Lead"}</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField label="Full Name" value={form.name} onChange={f("name")} placeholder="Alice Johnson" />
              <InputField label="Email" value={form.email} onChange={f("email")} type="email" placeholder="alice@company.com" />
              <InputField label="Phone" value={form.phone} onChange={f("phone")} placeholder="+1 555-0000" />
              <InputField label="Company" value={form.company} onChange={f("company")} placeholder="Acme Corp" />
              <SelectField label="Source" value={form.source} onChange={f("source")} options={sourceOptions} />
              <SelectField label="Status" value={form.status} onChange={f("status")} options={statusOptions} />
              <SelectField label="Priority" value={form.priority} onChange={f("priority")} options={priorityOptions} />
              <InputField label="Estimated Value ($)" value={form.value} onChange={f("value")} type="number" placeholder="10000" />
              <div className="sm:col-span-2">
                <InputField label="Assigned To" value={form.assignedTo} onChange={f("assignedTo")} placeholder="Sales rep name" />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition">
                Cancel
              </button>
              <button
                onClick={saveLead}
                disabled={!form.name || !form.email}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition
                  ${form.name && form.email ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}
              >
                {modal === "add" ? "Add Lead" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── View Modal ── */}
      {modal === "view" && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="crm-card w-full max-w-lg rounded-2xl p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Lead Details</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            {/* Avatar + name */}
            <div className="mb-5 flex items-center gap-4">
              <div className="crm-icon-primary flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold">
                {selectedLead.name.charAt(0)}
              </div>
              <div>
                <p className="text-xl font-bold text-white">{selectedLead.name}</p>
                <p className="text-sm text-slate-400">{selectedLead.company}</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: <HiOutlineMail className="h-4 w-4" />, label: "Email", value: selectedLead.email },
                { icon: <HiOutlinePhone className="h-4 w-4" />, label: "Phone", value: selectedLead.phone },
                { icon: <HiOutlineOfficeBuilding className="h-4 w-4" />, label: "Company", value: selectedLead.company },
                { icon: <HiOutlineUser className="h-4 w-4" />, label: "Assigned To", value: selectedLead.assignedTo },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 rounded-xl bg-slate-800/50 px-4 py-3">
                  <span className="text-slate-400">{row.icon}</span>
                  <span className="w-24 text-xs text-slate-500">{row.label}</span>
                  <span className="text-sm text-white">{row.value}</span>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="text-xs text-slate-500 mb-1">Status</p>
                  <span className={`crm-badge text-xs ${statusConfig[selectedLead.status]}`}>{selectedLead.status}</span>
                </div>
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="text-xs text-slate-500 mb-1">Priority</p>
                  <span className={`crm-badge text-xs ${priorityConfig[selectedLead.priority]}`}>{selectedLead.priority}</span>
                </div>
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="text-xs text-slate-500 mb-1">Source</p>
                  <p className="text-sm text-white">{selectedLead.source}</p>
                </div>
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="text-xs text-slate-500 mb-1">Est. Value</p>
                  <p className="text-sm font-bold text-green-400">${selectedLead.value.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition">
                Close
              </button>
              <button onClick={() => openEdit(selectedLead)} className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition">
                Edit Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="crm-card w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
              <HiOutlineTrash className="h-7 w-7 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Delete Lead?</h3>
            <p className="mt-2 text-sm text-slate-400">This action cannot be undone. The lead will be permanently removed.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition">
                Cancel
              </button>
              <button onClick={confirmDelete} className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
