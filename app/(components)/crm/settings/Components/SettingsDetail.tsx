"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import "../../crm.css";
import {
  HiOutlineArchive,
  HiOutlineBell,
  HiOutlineClipboardList,
  HiOutlineCloudDownload,
  HiOutlineCog,
  HiOutlineColorSwatch,
  HiOutlineCreditCard,
  HiOutlineDatabase,
  HiOutlineDocumentDownload,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineRefresh,
  HiOutlineSave,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTag,
  HiOutlineTrash,
  HiOutlineUpload,
  HiOutlineUserGroup,
  HiOutlineX,
} from "react-icons/hi";

type Status = "Active" | "Warning" | "Error" | "Information" | "Disabled";

interface Category {
  name: string;
  icon: ReactNode;
}

interface UserRow {
  name: string;
  role: string;
  status: Status;
  lastLogin: string;
  permissions: string;
}

interface IntegrationRow {
  name: string;
  provider: string;
  status: Status;
  key: string;
  webhook: string;
}

interface LogRow {
  event: string;
  user: string;
  type: string;
  status: Status;
  time: string;
}

const categories: Category[] = [
  { name: "General Settings", icon: <HiOutlineCog className="h-4 w-4" /> },
  { name: "Company Profile", icon: <HiOutlineOfficeBuilding className="h-4 w-4" /> },
  { name: "User Management", icon: <HiOutlineUserGroup className="h-4 w-4" /> },
  { name: "Roles & Permissions", icon: <HiOutlineShieldCheck className="h-4 w-4" /> },
  { name: "Security", icon: <HiOutlineLockClosed className="h-4 w-4" /> },
  { name: "Notifications", icon: <HiOutlineBell className="h-4 w-4" /> },
  { name: "Email Configuration", icon: <HiOutlineMail className="h-4 w-4" /> },
  { name: "Payment Integrations", icon: <HiOutlineCreditCard className="h-4 w-4" /> },
  { name: "CRM Settings", icon: <HiOutlineClipboardList className="h-4 w-4" /> },
  { name: "Branding", icon: <HiOutlineColorSwatch className="h-4 w-4" /> },
  { name: "Localization", icon: <HiOutlineGlobeAlt className="h-4 w-4" /> },
  { name: "API & Webhooks", icon: <HiOutlineKey className="h-4 w-4" /> },
  { name: "Backup & Restore", icon: <HiOutlineDatabase className="h-4 w-4" /> },
  { name: "Audit Logs", icon: <HiOutlineDocumentText className="h-4 w-4" /> },
];

const users: UserRow[] = [
  { name: "Sarah Johnson", role: "Sales Admin", status: "Active", lastLogin: "May 11, 2026 09:12 AM", permissions: "CRM, Deals, Reports" },
  { name: "Priya Shah", role: "Support Lead", status: "Active", lastLogin: "May 11, 2026 08:48 AM", permissions: "Support, Customers, Reports" },
  { name: "Nina Patel", role: "Marketing Manager", status: "Active", lastLogin: "May 10, 2026 05:22 PM", permissions: "Marketing, Emails, Leads" },
  { name: "John Wilson", role: "Ops Analyst", status: "Warning", lastLogin: "May 09, 2026 02:11 PM", permissions: "Reports, Audit Logs" },
  { name: "Legacy API User", role: "Integration", status: "Disabled", lastLogin: "Apr 24, 2026 01:06 PM", permissions: "API read-only" },
];

const integrations: IntegrationRow[] = [
  { name: "Razorpay", provider: "Payments", status: "Active", key: "rzp_live_****9214", webhook: "https://crm.acme.io/hooks/razorpay" },
  { name: "Stripe", provider: "Payments", status: "Active", key: "sk_live_****4418", webhook: "https://crm.acme.io/hooks/stripe" },
  { name: "PayPal", provider: "Payments", status: "Warning", key: "pp_live_****2039", webhook: "Webhook retry required" },
  { name: "Salesforce Sync", provider: "CRM", status: "Information", key: "sf_sync_****7731", webhook: "Streaming events enabled" },
];

const apiAccess = [
  { name: "Production API Key", scope: "Full CRM access", status: "Active", usage: "82K calls", created: "Feb 12, 2026" },
  { name: "Marketing Automation Token", scope: "Campaigns and leads", status: "Active", usage: "31K calls", created: "Mar 08, 2026" },
  { name: "Legacy Webhook Token", scope: "Read-only events", status: "Warning", usage: "4K calls", created: "Nov 19, 2025" },
];

const backups = [
  { name: "Nightly CRM Backup", schedule: "Daily at 01:00 AM", status: "Active", size: "8.4 GB", lastRun: "May 11, 2026" },
  { name: "Weekly Full Backup", schedule: "Sunday at 02:30 AM", status: "Active", size: "42.8 GB", lastRun: "May 10, 2026" },
  { name: "Manual Restore Point", schedule: "On demand", status: "Information", size: "9.1 GB", lastRun: "May 08, 2026" },
];

const logs: LogRow[] = [
  { event: "Security policy updated", user: "Admin", type: "Settings Changes", status: "Information", time: "May 11, 2026 09:42 AM" },
  { event: "Stripe webhook rotated", user: "Finance Ops", type: "Security Events", status: "Active", time: "May 11, 2026 08:20 AM" },
  { event: "Failed login attempt", user: "legacy.api@nests.io", type: "Login Logs", status: "Error", time: "May 10, 2026 11:18 PM" },
  { event: "Role permission exported", user: "John Wilson", type: "User Activities", status: "Information", time: "May 10, 2026 05:14 PM" },
];

const statusStyle: Record<Status, string> = {
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Warning: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  Error: "bg-red-500/15 text-red-300 border-red-500/30",
  Information: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Disabled: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

function Toggle({ enabled = true }: { enabled?: boolean }) {
  return (
    <button className={`relative h-6 w-11 rounded-full border transition ${enabled ? "border-blue-400/40 bg-blue-500/40" : "border-slate-600 bg-slate-800"}`} aria-label="Toggle setting">
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${enabled ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
      <input type={type} defaultValue={value} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-blue-400/60" />
    </label>
  );
}

function SelectField({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
      <select defaultValue={value} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-blue-400/60">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function SectionCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <button className="crm-btn crm-btn-secondary"><HiOutlineSave className="h-4 w-4" />Save</button>
      </div>
      {children}
    </section>
  );
}

function DataTable({ columns, rows }: { columns: string[]; rows: Array<Record<string, string>> }) {
  return (
    <div className="overflow-auto rounded-2xl border border-white/10 crm-scrollbar">
      <table className="min-w-[760px] w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur">
          <tr className="text-left text-xs uppercase text-slate-500">
            {columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[columns[0]]}-${index}`} className="border-t border-white/10 transition hover:bg-blue-500/[0.06]">
              {columns.map((column) => (
                <td key={column} className="px-4 py-4 text-sm text-slate-300">
                  {column === "Status" ? <span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${statusStyle[row[column] as Status]}`}>{row[column]}</span> : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SettingsDetail() {
  const [activeCategory, setActiveCategory] = useState("General Settings");
  const [showModal, setShowModal] = useState(false);

  const userRows = users.map((user) => ({
    User: user.name,
    Role: user.role,
    Status: user.status,
    "Last Login": user.lastLogin,
    Permissions: user.permissions,
  }));

  const integrationRows = integrations.map((item) => ({
    Integration: item.name,
    Provider: item.provider,
    Status: item.status,
    "API Key": item.key,
    Webhook: item.webhook,
  }));

  return (
    <div className="min-h-screen bg-[#06101f] text-slate-100">
      <div className="space-y-6 p-6">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/50 p-6 shadow-2xl shadow-blue-950/20">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Platform administration console
              </div>
              <h1 className="text-4xl font-bold text-white">Settings & Configuration</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-400">Manage system preferences, integrations, security, branding, and platform configuration.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="crm-btn crm-btn-primary"><HiOutlineSave className="h-4 w-4" />Save Changes</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineRefresh className="h-4 w-4" />Reset Settings</button>
              <button className="crm-btn crm-btn-secondary"><HiOutlineDocumentDownload className="h-4 w-4" />Export Configuration</button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 2xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl shadow-slate-950/30">
            <h2 className="px-2 pb-3 text-sm font-bold text-white">Settings Navigation</h2>
            <nav className="max-h-[780px] space-y-1 overflow-auto pr-1 crm-scrollbar">
              {categories.map((category) => {
                const active = activeCategory === category.name;
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${active ? "border border-blue-400/30 bg-blue-500/15 text-white shadow-lg shadow-blue-950/30" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${active ? "bg-linear-to-br from-blue-500 to-purple-500 text-white" : "bg-white/[0.04] text-slate-400"}`}>{category.icon}</span>
                    <span className="truncate font-medium">{category.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-blue-300">Active category</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">{activeCategory}</h2>
                </div>
                <button onClick={() => setShowModal(true)} className="crm-btn crm-btn-primary"><HiOutlinePlus className="h-4 w-4" />Open Configuration Modal</button>
              </div>
            </div>

            <SectionCard title="General Settings" description="Configure core organization preferences, locale, currency, and workspace defaults.">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Company Name" value="NexaPanel Technologies" />
                <Field label="Company Email" value="admin@nexapanel.com" type="email" />
                <Field label="Phone Number" value="+1 415 555 0198" />
                <Field label="Website URL" value="https://nexapanel.com" />
                <SelectField label="Timezone" value="Asia/Kolkata" options={["Asia/Kolkata", "UTC", "America/New_York", "Europe/London"]} />
                <SelectField label="Currency" value="USD" options={["USD", "INR", "EUR", "GBP"]} />
                <SelectField label="Date Format" value="MMM DD, YYYY" options={["MMM DD, YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]} />
                <SelectField label="Language" value="English" options={["English", "Hindi", "Spanish", "French"]} />
              </div>
            </SectionCard>

            <SectionCard title="Company Profile" description="Manage brand assets, legal identifiers, address, business type, and industry classification.">
              <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
                <div className="space-y-3">
                  {["Company Logo Upload", "Favicon Upload"].map((item) => (
                    <button key={item} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-400/30 bg-blue-500/10 px-4 py-6 text-sm font-semibold text-blue-200 transition hover:border-blue-300">
                      <HiOutlineUpload className="h-5 w-5" />
                      {item}
                    </button>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Address" value="410 Market Street, San Francisco, CA" />
                  <Field label="GST/VAT Number" value="VAT-US-8402917" />
                  <SelectField label="Business Type" value="SaaS" options={["SaaS", "Services", "Marketplace", "Enterprise"]} />
                  <SelectField label="Industry" value="CRM Software" options={["CRM Software", "FinTech", "Healthcare", "Retail"]} />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="User Management" description="Invite users, assign roles, review status, last login, and permission coverage.">
              <div className="mb-4 flex flex-wrap gap-3">
                <button className="crm-btn crm-btn-primary"><HiOutlinePlus className="h-4 w-4" />Add User</button>
                <button className="crm-btn crm-btn-secondary"><HiOutlineShieldCheck className="h-4 w-4" />Assign Roles</button>
              </div>
              <DataTable columns={["User", "Role", "Status", "Last Login", "Permissions"]} rows={userRows} />
            </SectionCard>

            <SectionCard title="Roles & Permissions" description="Create roles and manage module-level access controls and CRUD permissions.">
              <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-bold text-white">Role Creation</h3>
                  <div className="mt-4 space-y-3">
                    <Field label="Role Name" value="Regional Sales Manager" />
                    <SelectField label="Access Level" value="Manager" options={["Admin", "Manager", "Agent", "Read-only"]} />
                    <button className="crm-btn crm-btn-primary w-full justify-center"><HiOutlinePlus className="h-4 w-4" />Create Role</button>
                  </div>
                </div>
                <div className="overflow-auto rounded-2xl border border-white/10 crm-scrollbar">
                  <table className="min-w-[720px] w-full border-collapse">
                    <thead className="sticky top-0 bg-slate-950/95">
                      <tr className="text-left text-xs uppercase text-slate-500">
                        {["Module", "Create", "Read", "Update", "Delete"].map((column) => <th key={column} className="px-4 py-3">{column}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {["Leads", "Deals", "Tasks", "Emails", "Reports", "Settings"].map((module, index) => (
                        <tr key={module} className="border-t border-white/10">
                          <td className="px-4 py-4 text-sm font-semibold text-white">{module}</td>
                          {[0, 1, 2, 3].map((permission) => <td key={permission} className="px-4 py-4"><Toggle enabled={index < 4 || permission < 2} /></td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Security" description="Harden authentication, password policies, login controls, session behavior, and IP restrictions.">
              <div className="grid gap-4 lg:grid-cols-2">
                {[
                  ["Two-Factor Authentication", "Require app-based 2FA for all admins."],
                  ["Password Policies", "Minimum 12 characters, rotation every 90 days."],
                  ["Login History", "Capture login location, device, and risk score."],
                  ["IP Restrictions", "Allow access only from approved office/VPN IPs."],
                ].map(([title, desc], index) => (
                  <div key={title} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="mt-1 text-xs text-slate-500">{desc}</p>
                    </div>
                    <Toggle enabled={index !== 3} />
                  </div>
                ))}
                <Field label="Session Timeout" value="30 minutes" />
                <Field label="Allowed IP Ranges" value="192.168.1.0/24, 10.0.0.0/16" />
              </div>
            </SectionCard>

            <SectionCard title="Notifications" description="Control email, SMS, push, reminders, and alert preferences for CRM operations.">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {["Email Notifications", "SMS Notifications", "Push Notifications", "Reminder Settings", "Deal Alerts", "SLA Alerts", "Billing Alerts", "Weekly Digest"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="text-sm font-semibold text-white">{item}</span>
                    <Toggle enabled={index !== 1} />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Email Configuration" description="Configure SMTP, credentials, templates, and delivery testing.">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="SMTP Host" value="smtp.nexapanel.com" />
                <Field label="SMTP Port" value="587" />
                <Field label="Username" value="mailer@nexapanel.com" />
                <Field label="Password" value="••••••••••••" type="password" />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="crm-btn crm-btn-secondary"><HiOutlineMail className="h-4 w-4" />Email Templates</button>
                <button className="crm-btn crm-btn-primary"><HiOutlineSparkles className="h-4 w-4" />Test Email</button>
              </div>
            </SectionCard>

            <SectionCard title="Payment Integrations" description="Manage Razorpay, Stripe, PayPal, API keys, webhooks, and payment status.">
              <DataTable columns={["Integration", "Provider", "Status", "API Key", "Webhook"]} rows={integrationRows} />
            </SectionCard>

            <SectionCard title="Branding & Localization" description="Customize theme, appearance, sidebar style, domain, currency, language, and regional defaults.">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Theme Color Picker" value="#3B82F6" type="color" />
                <SelectField label="Dark/Light Mode" value="Dark" options={["Dark", "Light", "System"]} />
                <SelectField label="Sidebar Style" value="Expanded" options={["Expanded", "Compact", "Icon only"]} />
                <Field label="Custom Domain" value="crm.nexapanel.com" />
                <SelectField label="Localization" value="United States" options={["United States", "India", "United Kingdom", "Germany"]} />
                <SelectField label="Language" value="English" options={["English", "Hindi", "Spanish", "French"]} />
                <Field label="Custom Logo" value="nexapanel-logo-dark.svg" />
                <Field label="Brand Tagline" value="Revenue operations platform" />
              </div>
            </SectionCard>

            <SectionCard title="API & Webhooks" description="Govern API keys, webhook URLs, access tokens, scopes, and API usage logs.">
              <DataTable columns={["Name", "Scope", "Status", "Usage", "Created"]} rows={apiAccess.map((item) => ({ Name: item.name, Scope: item.scope, Status: item.status, Usage: item.usage, Created: item.created }))} />
            </SectionCard>

            <SectionCard title="Backup & Restore" description="Manage backup schedule, manual backup, restore system, downloads, and backup history.">
              <div className="mb-4 flex flex-wrap gap-3">
                <button className="crm-btn crm-btn-primary"><HiOutlineCloudDownload className="h-4 w-4" />Manual Backup</button>
                <button className="crm-btn crm-btn-secondary"><HiOutlineArchive className="h-4 w-4" />Restore System</button>
                <button className="crm-btn crm-btn-secondary"><HiOutlineDocumentDownload className="h-4 w-4" />Download Backup</button>
              </div>
              <DataTable columns={["Name", "Schedule", "Status", "Size", "Last Run"]} rows={backups.map((item) => ({ Name: item.name, Schedule: item.schedule, Status: item.status, Size: item.size, "Last Run": item.lastRun }))} />
            </SectionCard>

            <SectionCard title="Audit Logs" description="Review user activities, settings changes, login logs, security events, and export logs.">
              <div className="mb-4 flex justify-end">
                <button className="crm-btn crm-btn-secondary"><HiOutlineDocumentDownload className="h-4 w-4" />Export Logs</button>
              </div>
              <DataTable columns={["Event", "User", "Type", "Status", "Time"]} rows={logs.map((item) => ({ Event: item.event, User: item.user, Type: item.type, Status: item.status, Time: item.time }))} />
            </SectionCard>
          </main>
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-blue-950/40">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Configuration Change</h2>
                <p className="text-xs text-slate-500">Create a controlled settings update with audit history.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"><HiOutlineX className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Configuration name" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <select className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none focus:border-blue-400/60">
                {categories.map((category) => <option key={category.name}>{category.name}</option>)}
              </select>
              <textarea placeholder="Change notes..." rows={5} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400/60" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2 text-slate-400">
                  <button title="Audit tag" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineTag className="h-4 w-4" /></button>
                  <button title="Security review" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineShieldCheck className="h-4 w-4" /></button>
                  <button title="Edit details" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlinePencil className="h-4 w-4" /></button>
                  <button title="Discard" className="rounded-lg border border-white/10 bg-white/[0.04] p-2 hover:text-white"><HiOutlineTrash className="h-4 w-4" /></button>
                </div>
                <button onClick={() => setShowModal(false)} className="crm-btn crm-btn-primary"><HiOutlineSave className="h-4 w-4" />Save Change</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
