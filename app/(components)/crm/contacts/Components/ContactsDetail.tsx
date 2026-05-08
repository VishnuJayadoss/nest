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
  HiOutlineLocationMarker,
  HiOutlineChevronDown,
  HiOutlineFilter,
  HiOutlineTag,
  HiOutlineCalendar,
  HiOutlineGlobe,
} from "react-icons/hi";

// ── Types ─────────────────────────────────────────────
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  address: string;
  city: string;
  country: string;
  website: string;
  tags: string[];
  status: "Active" | "Inactive" | "VIP" | "Blocked";
  source: "Website" | "Referral" | "Social Media" | "Cold Call" | "Email Campaign" | "Trade Show";
  assignedTo: string;
  notes: string;
  createdDate: string;
  lastContact: string;
}

// ── Mock Data ─────────────────────────────────────────
const initialContacts: Contact[] = [
  { id: "C001", firstName: "Alice", lastName: "Johnson", email: "alice@acmecorp.com", phone: "+1 555-0101", company: "Acme Corp", jobTitle: "CEO", address: "123 Business Ave", city: "New York", country: "USA", website: "https://acmecorp.com", tags: ["Decision Maker", "Enterprise"], status: "VIP", source: "Referral", assignedTo: "Sarah J.", notes: "Key decision maker, interested in enterprise plan", createdDate: "2024-03-15", lastContact: "2024-06-20" },
  { id: "C002", firstName: "Bob", lastName: "Martinez", email: "bob@techstart.com", phone: "+1 555-0102", company: "TechStart Inc", jobTitle: "CTO", address: "456 Innovation Blvd", city: "San Francisco", country: "USA", website: "https://techstart.com", tags: ["Tech"], status: "Active", source: "Website", assignedTo: "Mike C.", notes: "Looking for API integrations", createdDate: "2024-04-10", lastContact: "2024-06-18" },
  { id: "C003", firstName: "Carol", lastName: "White", email: "carol@dataflow.com", phone: "+1 555-0103", company: "DataFlow Ltd", jobTitle: "VP Sales", address: "789 Data Street", city: "London", country: "UK", website: "https://dataflow.com", tags: ["Enterprise"], status: "Active", source: "Trade Show", assignedTo: "Emma D.", notes: "Met at Tech Summit 2024", createdDate: "2024-02-20", lastContact: "2024-06-15" },
  { id: "C004", firstName: "David", lastName: "Lee", email: "david@globalent.com", phone: "+1 555-0104", company: "Global Enterprises", jobTitle: "Procurement Manager", address: "321 Global Tower", city: "Singapore", country: "Singapore", website: "https://globalent.com", tags: ["Budget"], status: "Inactive", source: "Cold Call", assignedTo: "John W.", notes: "Budget constraints, follow up next quarter", createdDate: "2024-01-05", lastContact: "2024-05-10" },
  { id: "C005", firstName: "Eva", lastName: "Brown", email: "eva@startup.com", phone: "+1 555-0105", company: "StartUp Ventures", jobTitle: "Founder", address: "555 Startup Lane", city: "Austin", country: "USA", website: "https://startup.com", tags: ["Startup", "Decision Maker"], status: "VIP", source: "Referral", assignedTo: "Sarah J.", notes: "Fast-growing startup, high potential", createdDate: "2024-05-01", lastContact: "2024-06-22" },
  { id: "C006", firstName: "Frank", lastName: "Wilson", email: "frank@nexatech.com", phone: "+1 555-0106", company: "NexaTech", jobTitle: "IT Director", address: "888 Tech Park", city: "Toronto", country: "Canada", website: "https://nexatech.ca", tags: ["Enterprise", "Tech"], status: "Active", source: "Social Media", assignedTo: "Mike C.", notes: "Active on LinkedIn", createdDate: "2024-04-25", lastContact: "2024-06-19" },
  { id: "C007", firstName: "Grace", lastName: "Kim", email: "grace@cloudbase.com", phone: "+1 555-0107", company: "CloudBase", jobTitle: "DevOps Lead", address: "777 Cloud Way", city: "Seattle", country: "USA", website: "https://cloudbase.io", tags: ["Tech"], status: "Active", source: "Email Campaign", assignedTo: "Emma D.", notes: "Interested in cloud solutions", createdDate: "2024-05-15", lastContact: "2024-06-21" },
  { id: "C008", firstName: "Henry", lastName: "Scott", email: "henry@infosys.com", phone: "+1 555-0108", company: "InfoSys", jobTitle: "CFO", address: "999 Finance Center", city: "Mumbai", country: "India", website: "https://infosys.com", tags: ["Decision Maker", "Enterprise"], status: "Blocked", source: "Referral", assignedTo: "John W.", notes: "Do not contact - competitor", createdDate: "2023-11-10", lastContact: "2024-01-15" },
];

// ── Config ────────────────────────────────────────────
const statusConfig: Record<Contact["status"], string> = {
  Active: "bg-green-500/20 text-green-400 border border-green-500/30",
  Inactive: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
  VIP: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Blocked: "bg-red-500/20 text-red-400 border border-red-500/30",
};

const sourceOptions: Contact["source"][] = ["Website", "Referral", "Social Media", "Cold Call", "Email Campaign", "Trade Show"];
const statusOptions: Contact["status"][] = ["Active", "Inactive", "VIP", "Blocked"];
const tagOptions = ["Decision Maker", "Enterprise", "Startup", "Tech", "Budget", "Partner", "Prospect"];

const emptyForm: Omit<Contact, "id" | "createdDate" | "lastContact"> = {
  firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "",
  address: "", city: "", country: "", website: "", tags: [],
  status: "Active", source: "Website", assignedTo: "", notes: "",
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

function InputField({ label, value, onChange, type = "text", placeholder = "", rows }: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; placeholder?: string; rows?: number;
}) {
  if (rows) {
    return (
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 transition resize-none"
        />
      </div>
    );
  }
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
export default function ContactsDetail() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterSource, setFilterSource] = useState<string>("All");
  const [filterTags, setFilterTags] = useState<string>("All");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [form, setForm] = useState<Omit<Contact, "id" | "createdDate" | "lastContact">>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ── Filtered contacts ──
  const filtered = contacts.filter((c) => {
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    const matchSource = filterSource === "All" || c.source === filterSource;
    const matchTags = filterTags === "All" || c.tags.includes(filterTags);
    return matchSearch && matchStatus && matchSource && matchTags;
  });

  // ── Handlers ──
  const openAdd = () => { setForm(emptyForm); setModal("add"); };
  const openEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setForm({
      firstName: contact.firstName, lastName: contact.lastName, email: contact.email,
      phone: contact.phone, company: contact.company, jobTitle: contact.jobTitle,
      address: contact.address, city: contact.city, country: contact.country,
      website: contact.website, tags: contact.tags, status: contact.status,
      source: contact.source, assignedTo: contact.assignedTo, notes: contact.notes
    });
    setModal("edit");
  };
  const openView = (contact: Contact) => { setSelectedContact(contact); setModal("view"); };
  const closeModal = () => { setModal(null); setSelectedContact(null); };

  const saveContact = () => {
    if (modal === "add") {
      const newContact: Contact = {
        ...form,
        id: `C${Date.now()}`,
        createdDate: new Date().toISOString().split("T")[0],
        lastContact: new Date().toISOString().split("T")[0]
      };
      setContacts([newContact, ...contacts]);
    } else if (modal === "edit" && selectedContact) {
      setContacts(contacts.map((c) => c.id === selectedContact.id ? { ...c, ...form } : c));
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (deleteId) setContacts(contacts.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  const f = (key: keyof typeof form) => (v: string) => setForm((prev) => ({ ...prev, [key]: key === "tags" ? v.split(",").map(t => t.trim()).filter(Boolean) : v }));

  return (
    <div className="crm-dashboard min-h-screen p-6 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Contacts</h1>
          <p className="mt-1 text-sm text-slate-400">Manage your customer and prospect contacts</p>
        </div>
        <button onClick={openAdd} className="crm-btn crm-btn-primary">
          <HiOutlinePlus className="h-4 w-4" />
          Add Contact
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Contacts" value={contacts.length} sub="All time" color="text-white" />
        <StatCard label="Active" value={contacts.filter((c) => c.status === "Active").length} sub="Active contacts" color="text-green-400" />
        <StatCard label="VIP" value={contacts.filter((c) => c.status === "VIP").length} sub="VIP contacts" color="text-purple-400" />
        <StatCard label="Inactive" value={contacts.filter((c) => c.status === "Inactive").length} sub="Needs follow-up" color="text-slate-400" />
        <StatCard label="This Month" value={contacts.filter((c) => c.lastContact >= new Date().toISOString().slice(0, 7)).length} sub="Recent contacts" color="text-blue-400" />
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
              placeholder="Search contacts..."
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

          {/* Tags filter */}
          <div className="relative">
            <select
              value={filterTags}
              onChange={(e) => setFilterTags(e.target.value)}
              className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none focus:border-blue-500 transition"
            >
              <option value="All">All Tags</option>
              {tagOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 ml-auto">
            <HiOutlineFilter className="h-4 w-4" />
            {filtered.length} of {contacts.length} contacts
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="crm-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Company</th>
                <th>Job Title</th>
                <th>Source</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Assigned To</th>
                <th>Last Contact</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">No contacts found</td>
                </tr>
              )}
              {filtered.map((contact) => (
                <tr key={contact.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="crm-icon-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold">
                        {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{contact.firstName} {contact.lastName}</p>
                        <p className="text-xs text-slate-400">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <HiOutlineOfficeBuilding className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-sm text-slate-300">{contact.company}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-slate-300">{contact.jobTitle}</span>
                  </td>
                  <td>
                    <span className="text-sm text-slate-300">{contact.source}</span>
                  </td>
                  <td>
                    <span className={`crm-badge text-xs ${statusConfig[contact.status]}`}>{contact.status}</span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                      {contact.tags.length > 2 && (
                        <span className="text-xs text-slate-500">+{contact.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-slate-300">{contact.assignedTo}</span>
                  </td>
                  <td>
                    <span className="text-sm text-slate-400">{contact.lastContact}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openView(contact)} className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition" title="View">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                      <button onClick={() => openEdit(contact)} className="p-2 rounded-lg hover:bg-yellow-500/20 text-yellow-400 transition" title="Edit">
                        <HiOutlinePencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(contact.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition" title="Delete">
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
          <div className="crm-card w-full max-w-3xl rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{modal === "add" ? "Add New Contact" : "Edit Contact"}</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField label="First Name" value={form.firstName} onChange={f("firstName")} placeholder="Alice" />
              <InputField label="Last Name" value={form.lastName} onChange={f("lastName")} placeholder="Johnson" />
              <InputField label="Email" value={form.email} onChange={f("email")} type="email" placeholder="alice@company.com" />
              <InputField label="Phone" value={form.phone} onChange={f("phone")} placeholder="+1 555-0000" />
              <InputField label="Company" value={form.company} onChange={f("company")} placeholder="Acme Corp" />
              <InputField label="Job Title" value={form.jobTitle} onChange={f("jobTitle")} placeholder="CEO" />
              <InputField label="Address" value={form.address} onChange={f("address")} placeholder="123 Business Ave" />
              <InputField label="City" value={form.city} onChange={f("city")} placeholder="New York" />
              <InputField label="Country" value={form.country} onChange={f("country")} placeholder="USA" />
              <InputField label="Website" value={form.website} onChange={f("website")} placeholder="https://company.com" />
              <SelectField label="Source" value={form.source} onChange={f("source")} options={sourceOptions} />
              <SelectField label="Status" value={form.status} onChange={f("status")} options={statusOptions} />
              <InputField label="Assigned To" value={form.assignedTo} onChange={f("assignedTo")} placeholder="Sales rep name" />
              <InputField label="Tags (comma separated)" value={form.tags.join(", ")} onChange={f("tags")} placeholder="Decision Maker, Enterprise" />
              <div className="sm:col-span-2">
                <InputField label="Notes" value={form.notes} onChange={f("notes")} placeholder="Additional notes..." rows={3} />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition">
                Cancel
              </button>
              <button
                onClick={saveContact}
                disabled={!form.firstName || !form.email}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition
                  ${form.firstName && form.email ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90" : "bg-slate-700 text-slate-500 cursor-not-allowed"}`}
              >
                {modal === "add" ? "Add Contact" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── View Modal ── */}
      {modal === "view" && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="crm-card w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Contact Details</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white transition">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            {/* Avatar + name */}
            <div className="mb-5 flex items-center gap-4">
              <div className="crm-icon-primary flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold">
                {selectedContact.firstName.charAt(0)}{selectedContact.lastName.charAt(0)}
              </div>
              <div>
                <p className="text-xl font-bold text-white">{selectedContact.firstName} {selectedContact.lastName}</p>
                <p className="text-sm text-slate-400">{selectedContact.jobTitle} at {selectedContact.company}</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: <HiOutlineMail className="h-4 w-4" />, label: "Email", value: selectedContact.email },
                { icon: <HiOutlinePhone className="h-4 w-4" />, label: "Phone", value: selectedContact.phone },
                { icon: <HiOutlineOfficeBuilding className="h-4 w-4" />, label: "Company", value: selectedContact.company },
                { icon: <HiOutlineLocationMarker className="h-4 w-4" />, label: "Location", value: `${selectedContact.city}, ${selectedContact.country}` },
                { icon: <HiOutlineGlobe className="h-4 w-4" />, label: "Website", value: selectedContact.website },
                { icon: <HiOutlineUser className="h-4 w-4" />, label: "Assigned To", value: selectedContact.assignedTo },
                { icon: <HiOutlineCalendar className="h-4 w-4" />, label: "Created", value: selectedContact.createdDate },
                { icon: <HiOutlineCalendar className="h-4 w-4" />, label: "Last Contact", value: selectedContact.lastContact },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 rounded-xl bg-slate-800/50 px-4 py-3">
                  <span className="text-slate-400">{row.icon}</span>
                  <span className="w-28 text-xs text-slate-500">{row.label}</span>
                  <span className="text-sm text-white">{row.value}</span>
                </div>
              ))}

              {/* Tags */}
              <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineTag className="h-4 w-4 text-slate-400" />
                  <span className="text-xs text-slate-500">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="text-xs text-slate-500 mb-1">Status</p>
                  <span className={`crm-badge text-xs ${statusConfig[selectedContact.status]}`}>{selectedContact.status}</span>
                </div>
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="text-xs text-slate-500 mb-1">Source</p>
                  <p className="text-sm text-white">{selectedContact.source}</p>
                </div>
              </div>

              {/* Notes */}
              {selectedContact.notes && (
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="text-xs text-slate-500 mb-2">Notes</p>
                  <p className="text-sm text-slate-300">{selectedContact.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition">
                Close
              </button>
              <button onClick={() => openEdit(selectedContact)} className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition">
                Edit Contact
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
            <h3 className="text-lg font-bold text-white">Delete Contact?</h3>
            <p className="mt-2 text-sm text-slate-400">This action cannot be undone. The contact will be permanently removed.</p>
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