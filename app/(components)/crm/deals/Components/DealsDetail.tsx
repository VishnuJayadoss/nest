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
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineClipboardCheck,
  HiOutlineSparkles,
} from "react-icons/hi";

interface Deal {
  id: string;
  title: string;
  contact: string;
  email: string;
  phone: string;
  company: string;
  stage: "Discovery" | "Proposal" | "Negotiation" | "Contract" | "Won" | "Lost";
  priority: "Low" | "Medium" | "High";
  value: number;
  probability: number;
  owner: string;
  source: "Website" | "Referral" | "Outbound" | "Partner" | "Expansion";
  expectedClose: string;
  createdDate: string;
  nextStep: string;
  notes: string;
}

const initialDeals: Deal[] = [
  { id: "D001", title: "Enterprise rollout", contact: "Alice Johnson", email: "alice@acmecorp.com", phone: "+1 555-0101", company: "Acme Corp", stage: "Negotiation", priority: "High", value: 86000, probability: 72, owner: "Sarah J.", source: "Referral", expectedClose: "2024-08-16", createdDate: "2024-05-18", nextStep: "Send revised security addendum", notes: "Procurement is aligned; legal needs one final pass." },
  { id: "D002", title: "API automation package", contact: "Bob Martinez", email: "bob@techstart.com", phone: "+1 555-0102", company: "TechStart Inc", stage: "Proposal", priority: "Medium", value: 32000, probability: 48, owner: "Mike C.", source: "Website", expectedClose: "2024-09-04", createdDate: "2024-06-02", nextStep: "Review implementation timeline", notes: "Technical buyer wants a phased rollout." },
  { id: "D003", title: "Analytics expansion", contact: "Carol White", email: "carol@dataflow.com", phone: "+1 555-0103", company: "DataFlow Ltd", stage: "Contract", priority: "High", value: 124000, probability: 86, owner: "Emma D.", source: "Expansion", expectedClose: "2024-07-24", createdDate: "2024-04-27", nextStep: "Finalize order form", notes: "Existing customer adding two departments." },
  { id: "D004", title: "Regional logistics pilot", contact: "David Lee", email: "david@globalent.com", phone: "+1 555-0104", company: "Global Enterprises", stage: "Discovery", priority: "Medium", value: 54000, probability: 28, owner: "John W.", source: "Outbound", expectedClose: "2024-10-12", createdDate: "2024-06-12", nextStep: "Book workflow mapping call", notes: "Budget owner joins next meeting." },
  { id: "D005", title: "Growth plan upgrade", contact: "Eva Brown", email: "eva@startup.com", phone: "+1 555-0105", company: "StartUp Ventures", stage: "Won", priority: "High", value: 41000, probability: 100, owner: "Sarah J.", source: "Expansion", expectedClose: "2024-06-28", createdDate: "2024-05-21", nextStep: "Introduce customer success", notes: "Closed with annual prepay." },
  { id: "D006", title: "Managed services bundle", contact: "Frank Wilson", email: "frank@nexatech.com", phone: "+1 555-0106", company: "NexaTech", stage: "Proposal", priority: "Low", value: 27000, probability: 42, owner: "Mike C.", source: "Partner", expectedClose: "2024-09-19", createdDate: "2024-06-07", nextStep: "Clarify support scope", notes: "Partner co-sell motion in progress." },
  { id: "D007", title: "Cloud operations suite", contact: "Grace Kim", email: "grace@cloudbase.com", phone: "+1 555-0107", company: "CloudBase", stage: "Negotiation", priority: "High", value: 73000, probability: 64, owner: "Emma D.", source: "Website", expectedClose: "2024-08-02", createdDate: "2024-05-29", nextStep: "Confirm start date", notes: "Security review passed." },
  { id: "D008", title: "Finance process review", contact: "Henry Scott", email: "henry@infosys.com", phone: "+1 555-0108", company: "InfoSys", stage: "Lost", priority: "Low", value: 19000, probability: 0, owner: "John W.", source: "Outbound", expectedClose: "2024-06-18", createdDate: "2024-04-14", nextStep: "Archive lost reason", notes: "Lost to incumbent renewal." },
];

const stageConfig: Record<Deal["stage"], string> = {
  Discovery: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Proposal: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Negotiation: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  Contract: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Won: "bg-green-500/20 text-green-400 border border-green-500/30",
  Lost: "bg-red-500/20 text-red-400 border border-red-500/30",
};

const priorityConfig: Record<Deal["priority"], string> = {
  Low: "bg-slate-500/20 text-slate-400",
  Medium: "bg-orange-500/20 text-orange-400",
  High: "bg-red-500/20 text-red-400",
};

const stageOptions: Deal["stage"][] = ["Discovery", "Proposal", "Negotiation", "Contract", "Won", "Lost"];
const priorityOptions: Deal["priority"][] = ["Low", "Medium", "High"];
const sourceOptions: Deal["source"][] = ["Website", "Referral", "Outbound", "Partner", "Expansion"];

const emptyForm: Omit<Deal, "id" | "createdDate"> = {
  title: "",
  contact: "",
  email: "",
  phone: "",
  company: "",
  stage: "Discovery",
  priority: "Medium",
  value: 0,
  probability: 25,
  owner: "",
  source: "Website",
  expectedClose: "",
  nextStep: "",
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

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-9 text-sm text-white outline-none transition focus:border-blue-500"
        >
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <HiOutlineChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder = "", rows }: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
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
          onChange={(event) => onChange(event.target.value)}
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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition placeholder-slate-500 focus:border-blue-500"
      />
    </div>
  );
}

function ProbabilityBar({ value }: { value: number }) {
  const color = value >= 75 ? "from-green-500 to-teal-500" : value >= 45 ? "from-yellow-500 to-orange-500" : "from-blue-500 to-cyan-500";

  return (
    <div className="flex min-w-32 items-center gap-2">
      <div className="h-1.5 w-20 rounded-full bg-slate-700">
        <div className={`h-1.5 rounded-full bg-linear-to-r ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-300">{value}%</span>
    </div>
  );
}

export default function DealsDetail() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState<string>("All");
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [filterSource, setFilterSource] = useState<string>("All");
  const [modal, setModal] = useState<"add" | "edit" | "view" | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [form, setForm] = useState<Omit<Deal, "id" | "createdDate">>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = deals.filter((deal) => {
    const query = search.toLowerCase();
    const matchSearch =
      deal.title.toLowerCase().includes(query) ||
      deal.contact.toLowerCase().includes(query) ||
      deal.company.toLowerCase().includes(query) ||
      deal.owner.toLowerCase().includes(query);
    const matchStage = filterStage === "All" || deal.stage === filterStage;
    const matchPriority = filterPriority === "All" || deal.priority === filterPriority;
    const matchSource = filterSource === "All" || deal.source === filterSource;
    return matchSearch && matchStage && matchPriority && matchSource;
  });

  const openPipeline = deals.filter((deal) => deal.stage !== "Won" && deal.stage !== "Lost");
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const openValue = openPipeline.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = openPipeline.reduce((sum, deal) => sum + deal.value * (deal.probability / 100), 0);

  const openAdd = () => {
    setForm(emptyForm);
    setModal("add");
  };

  const openEdit = (deal: Deal) => {
    setSelectedDeal(deal);
    setForm({
      title: deal.title,
      contact: deal.contact,
      email: deal.email,
      phone: deal.phone,
      company: deal.company,
      stage: deal.stage,
      priority: deal.priority,
      value: deal.value,
      probability: deal.probability,
      owner: deal.owner,
      source: deal.source,
      expectedClose: deal.expectedClose,
      nextStep: deal.nextStep,
      notes: deal.notes,
    });
    setModal("edit");
  };

  const openView = (deal: Deal) => {
    setSelectedDeal(deal);
    setModal("view");
  };

  const closeModal = () => {
    setModal(null);
    setSelectedDeal(null);
  };

  const saveDeal = () => {
    if (modal === "add") {
      const newDeal: Deal = {
        ...form,
        id: `D${Date.now()}`,
        createdDate: new Date().toISOString().split("T")[0],
      };
      setDeals([newDeal, ...deals]);
    } else if (modal === "edit" && selectedDeal) {
      setDeals(deals.map((deal) => deal.id === selectedDeal.id ? { ...deal, ...form } : deal));
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (deleteId) setDeals(deals.filter((deal) => deal.id !== deleteId));
    setDeleteId(null);
  };

  const f = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: key === "value" || key === "probability" ? Number(value) : value,
    }));
  };

  return (
    <div className="crm-dashboard min-h-screen space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Deals</h1>
          <p className="mt-1 text-sm text-slate-400">Track opportunities, close dates, value, and sales momentum</p>
        </div>
        <button onClick={openAdd} className="crm-btn crm-btn-primary">
          <HiOutlinePlus className="h-4 w-4" />
          Add Deal
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Open Deals" value={openPipeline.length} sub="Active opportunities" color="text-white" />
        <StatCard label="Open Value" value={`$${(openValue / 1000).toFixed(0)}K`} sub="Unclosed pipeline" color="text-blue-400" />
        <StatCard label="Weighted" value={`$${(weightedValue / 1000).toFixed(0)}K`} sub="Probability adjusted" color="text-green-400" />
        <StatCard label="Won" value={deals.filter((deal) => deal.stage === "Won").length} sub="Closed successfully" color="text-emerald-400" />
        <StatCard label="Total Value" value={`$${(totalValue / 1000).toFixed(0)}K`} sub="All tracked deals" color="text-yellow-400" />
      </div>

      <div className="crm-card rounded-2xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-48 flex-1">
            <HiOutlineSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search deals..."
              className="w-full rounded-xl border border-slate-600 bg-slate-800 py-2.5 pl-9 pr-4 text-sm text-white outline-none transition placeholder-slate-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <select value={filterStage} onChange={(event) => setFilterStage(event.target.value)} className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none transition focus:border-blue-500">
              <option value="All">All Stages</option>
              {stageOptions.map((stage) => <option key={stage}>{stage}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="relative">
            <select value={filterPriority} onChange={(event) => setFilterPriority(event.target.value)} className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none transition focus:border-blue-500">
              <option value="All">All Priority</option>
              {priorityOptions.map((priority) => <option key={priority}>{priority}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="relative">
            <select value={filterSource} onChange={(event) => setFilterSource(event.target.value)} className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none transition focus:border-blue-500">
              <option value="All">All Sources</option>
              {sourceOptions.map((source) => <option key={source}>{source}</option>)}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
          </div>

          <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
            <HiOutlineFilter className="h-4 w-4" />
            {filtered.length} of {deals.length} deals
          </div>
        </div>
      </div>

      <div className="crm-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Company</th>
                <th>Stage</th>
                <th>Priority</th>
                <th>Value</th>
                <th>Probability</th>
                <th>Owner</th>
                <th>Close Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">No deals found</td>
                </tr>
              )}
              {filtered.map((deal) => (
                <tr key={deal.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="crm-icon-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                        <HiOutlineCurrencyDollar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{deal.title}</p>
                        <p className="text-xs text-slate-400">{deal.contact}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <HiOutlineOfficeBuilding className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="text-sm text-slate-300">{deal.company}</span>
                    </div>
                  </td>
                  <td><span className={`crm-badge text-xs ${stageConfig[deal.stage]}`}>{deal.stage}</span></td>
                  <td><span className={`crm-badge text-xs ${priorityConfig[deal.priority]}`}>{deal.priority}</span></td>
                  <td><span className="text-sm font-semibold text-white">${deal.value.toLocaleString()}</span></td>
                  <td><ProbabilityBar value={deal.probability} /></td>
                  <td><span className="text-sm text-slate-300">{deal.owner}</span></td>
                  <td><span className="text-sm text-slate-400">{deal.expectedClose}</span></td>
                  <td>
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openView(deal)} className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/20" title="View">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                      <button onClick={() => openEdit(deal)} className="rounded-lg p-2 text-yellow-400 transition hover:bg-yellow-500/20" title="Edit">
                        <HiOutlinePencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(deal.id)} className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/20" title="Delete">
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
              <h2 className="text-xl font-bold text-white">{modal === "add" ? "Add New Deal" : "Edit Deal"}</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField label="Deal Title" value={form.title} onChange={f("title")} placeholder="Enterprise rollout" />
              <InputField label="Company" value={form.company} onChange={f("company")} placeholder="Acme Corp" />
              <InputField label="Contact Name" value={form.contact} onChange={f("contact")} placeholder="Alice Johnson" />
              <InputField label="Email" value={form.email} onChange={f("email")} type="email" placeholder="alice@company.com" />
              <InputField label="Phone" value={form.phone} onChange={f("phone")} placeholder="+1 555-0000" />
              <InputField label="Deal Value ($)" value={form.value} onChange={f("value")} type="number" placeholder="50000" />
              <SelectField label="Stage" value={form.stage} onChange={f("stage")} options={stageOptions} />
              <SelectField label="Priority" value={form.priority} onChange={f("priority")} options={priorityOptions} />
              <SelectField label="Source" value={form.source} onChange={f("source")} options={sourceOptions} />
              <InputField label="Probability (%)" value={form.probability} onChange={f("probability")} type="number" placeholder="65" />
              <InputField label="Deal Owner" value={form.owner} onChange={f("owner")} placeholder="Sales rep name" />
              <InputField label="Expected Close" value={form.expectedClose} onChange={f("expectedClose")} type="date" />
              <div className="sm:col-span-2">
                <InputField label="Next Step" value={form.nextStep} onChange={f("nextStep")} placeholder="Schedule pricing review" />
              </div>
              <div className="sm:col-span-2">
                <InputField label="Notes" value={form.notes} onChange={f("notes")} placeholder="Deal context and risks..." rows={3} />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700">
                Cancel
              </button>
              <button
                onClick={saveDeal}
                disabled={!form.title || !form.company || !form.contact}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition ${
                  form.title && form.company && form.contact ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90" : "cursor-not-allowed bg-slate-700 text-slate-500"
                }`}
              >
                {modal === "add" ? "Add Deal" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "view" && selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="crm-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Deal Details</h2>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-700 hover:text-white">
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-5 flex items-center gap-4">
              <div className="crm-icon-primary flex h-16 w-16 items-center justify-center rounded-2xl">
                <HiOutlineCurrencyDollar className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{selectedDeal.title}</p>
                <p className="text-sm text-slate-400">{selectedDeal.company} - {selectedDeal.contact}</p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                <p className="text-xs text-slate-500">Deal Value</p>
                <p className="mt-1 text-lg font-bold text-green-400">${selectedDeal.value.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                <p className="text-xs text-slate-500">Probability</p>
                <div className="mt-2"><ProbabilityBar value={selectedDeal.probability} /></div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: <HiOutlineMail className="h-4 w-4" />, label: "Email", value: selectedDeal.email },
                { icon: <HiOutlinePhone className="h-4 w-4" />, label: "Phone", value: selectedDeal.phone },
                { icon: <HiOutlineOfficeBuilding className="h-4 w-4" />, label: "Company", value: selectedDeal.company },
                { icon: <HiOutlineUser className="h-4 w-4" />, label: "Owner", value: selectedDeal.owner },
                { icon: <HiOutlineSparkles className="h-4 w-4" />, label: "Source", value: selectedDeal.source },
                { icon: <HiOutlineCalendar className="h-4 w-4" />, label: "Created", value: selectedDeal.createdDate },
                { icon: <HiOutlineCalendar className="h-4 w-4" />, label: "Close Date", value: selectedDeal.expectedClose },
                { icon: <HiOutlineClipboardCheck className="h-4 w-4" />, label: "Next Step", value: selectedDeal.nextStep },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 rounded-xl bg-slate-800/50 px-4 py-3">
                  <span className="text-slate-400">{row.icon}</span>
                  <span className="w-24 text-xs text-slate-500">{row.label}</span>
                  <span className="text-sm text-white">{row.value}</span>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="mb-1 text-xs text-slate-500">Stage</p>
                  <span className={`crm-badge text-xs ${stageConfig[selectedDeal.stage]}`}>{selectedDeal.stage}</span>
                </div>
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="mb-1 text-xs text-slate-500">Priority</p>
                  <span className={`crm-badge text-xs ${priorityConfig[selectedDeal.priority]}`}>{selectedDeal.priority}</span>
                </div>
              </div>

              {selectedDeal.notes && (
                <div className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <p className="mb-2 text-xs text-slate-500">Notes</p>
                  <p className="text-sm text-slate-300">{selectedDeal.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={closeModal} className="flex-1 rounded-xl border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700">
                Close
              </button>
              <button onClick={() => openEdit(selectedDeal)} className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                Edit Deal
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
            <h3 className="text-lg font-bold text-white">Delete Deal?</h3>
            <p className="mt-2 text-sm text-slate-400">This opportunity will be removed from the pipeline.</p>
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
