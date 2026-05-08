"use client";

import { useMemo, useState } from "react";
import "../../crm.css";
import {
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineChartSquareBar,
  HiOutlineChatAlt2,
  HiOutlineChevronDown,
  HiOutlineClipboardCheck,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineFilter,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlinePlus,
  HiOutlinePresentationChartLine,
  HiOutlineSearch,
  HiOutlineSpeakerphone,
  HiOutlineTicket,
} from "react-icons/hi";

type ModuleKey =
  | "pipelines"
  | "tasks"
  | "calendar"
  | "calls"
  | "emails"
  | "communication"
  | "marketing"
  | "support"
  | "quotations"
  | "reports"
  | "notifications"
  | "settings";

type Tone = "primary" | "accent" | "warning" | "danger";

interface Metric {
  label: string;
  value: string;
  sub: string;
  tone: Tone;
}

interface Column {
  key: string;
  label: string;
}

interface Row {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  owner: string;
  value: string;
  due: string;
  channel: string;
}

interface FeatureConfig {
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  filters: string[];
  columns: Column[];
  metrics: Metric[];
  rows: Row[];
  focus: { label: string; value: string; caption: string }[];
  activity: { title: string; meta: string; tone: Tone }[];
}

const toneClasses: Record<Tone, string> = {
  primary: "crm-icon-primary text-blue-400",
  accent: "crm-icon-accent text-emerald-400",
  warning: "crm-icon-warning text-yellow-400",
  danger: "crm-icon-danger text-red-400",
};

const badgeClasses: Record<string, string> = {
  Active: "bg-green-500/20 text-green-400 border border-green-500/30",
  Scheduled: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Draft: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Review: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Sent: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Completed: "bg-green-500/20 text-green-400 border border-green-500/30",
  Overdue: "bg-red-500/20 text-red-400 border border-red-500/30",
  Open: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Escalated: "bg-red-500/20 text-red-400 border border-red-500/30",
  Won: "bg-green-500/20 text-green-400 border border-green-500/30",
  Paused: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Enabled: "bg-green-500/20 text-green-400 border border-green-500/30",
};

const configs: Record<ModuleKey, FeatureConfig> = {
  pipelines: {
    title: "Pipelines",
    description: "Design, monitor, and tune every sales pipeline stage",
    action: "Add Pipeline",
    icon: <HiOutlineChartSquareBar className="h-6 w-6" />,
    filters: ["All", "Active", "Paused", "Review"],
    columns: [
      { key: "title", label: "Pipeline" },
      { key: "status", label: "Status" },
      { key: "value", label: "Value" },
      { key: "owner", label: "Owner" },
      { key: "due", label: "Review Date" },
    ],
    metrics: [
      { label: "Active Pipelines", value: "6", sub: "Across sales teams", tone: "primary" },
      { label: "Pipeline Value", value: "$1.42M", sub: "Open opportunity value", tone: "accent" },
      { label: "Avg Velocity", value: "31d", sub: "Lead to close", tone: "warning" },
      { label: "Needs Review", value: "2", sub: "Stage rules stale", tone: "danger" },
    ],
    rows: [
      { id: "P-101", title: "Enterprise Sales", subtitle: "Discovery > Proposal > Contract", status: "Active", value: "$820K", owner: "Sarah J.", due: "2024-08-12", channel: "Direct" },
      { id: "P-102", title: "SMB Growth", subtitle: "Trial > Upgrade > Annual", status: "Active", value: "$240K", owner: "Mike C.", due: "2024-08-20", channel: "Inbound" },
      { id: "P-103", title: "Partner Co-sell", subtitle: "Partner intro > Joint proposal", status: "Review", value: "$310K", owner: "Emma D.", due: "2024-08-02", channel: "Partner" },
      { id: "P-104", title: "Expansion Motion", subtitle: "Usage signal > Success plan", status: "Paused", value: "$95K", owner: "John W.", due: "2024-09-01", channel: "Customer" },
    ],
    focus: [
      { label: "Best Stage", value: "Contract", caption: "86% conversion" },
      { label: "Slowest Stage", value: "Proposal", caption: "12 day average" },
      { label: "Top Owner", value: "Sarah J.", caption: "$820K managed" },
    ],
    activity: [
      { title: "Enterprise Sales stage rule updated", meta: "2h ago", tone: "primary" },
      { title: "Partner Co-sell marked for review", meta: "Yesterday", tone: "warning" },
      { title: "Expansion Motion paused", meta: "Jun 28", tone: "danger" },
    ],
  },
  tasks: {
    title: "Tasks",
    description: "Prioritize follow-ups, handoffs, and sales commitments",
    action: "Add Task",
    icon: <HiOutlineClipboardCheck className="h-6 w-6" />,
    filters: ["All", "Open", "Completed", "Overdue"],
    columns: [
      { key: "title", label: "Task" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Assignee" },
      { key: "channel", label: "Type" },
      { key: "due", label: "Due" },
    ],
    metrics: [
      { label: "Open Tasks", value: "28", sub: "Assigned this week", tone: "primary" },
      { label: "Completed", value: "64", sub: "Last 7 days", tone: "accent" },
      { label: "Due Today", value: "9", sub: "Needs focus", tone: "warning" },
      { label: "Overdue", value: "3", sub: "Past SLA", tone: "danger" },
    ],
    rows: [
      { id: "T-201", title: "Send revised proposal", subtitle: "Acme Corp enterprise rollout", status: "Open", value: "High", owner: "Sarah J.", due: "Today", channel: "Proposal" },
      { id: "T-202", title: "Schedule technical demo", subtitle: "CloudBase operations suite", status: "Open", value: "Medium", owner: "Emma D.", due: "Tomorrow", channel: "Meeting" },
      { id: "T-203", title: "Update lost reason", subtitle: "InfoSys finance review", status: "Overdue", value: "Low", owner: "John W.", due: "Yesterday", channel: "Admin" },
      { id: "T-204", title: "Confirm onboarding owner", subtitle: "StartUp Ventures upgrade", status: "Completed", value: "High", owner: "Sarah J.", due: "Jun 28", channel: "Handoff" },
    ],
    focus: [
      { label: "Today", value: "9", caption: "Tasks due" },
      { label: "High Priority", value: "11", caption: "Open items" },
      { label: "SLA Risk", value: "3", caption: "Overdue tasks" },
    ],
    activity: [
      { title: "Sarah completed onboarding handoff", meta: "35m ago", tone: "accent" },
      { title: "John has an overdue admin task", meta: "1h ago", tone: "danger" },
      { title: "Emma added a demo follow-up", meta: "3h ago", tone: "primary" },
    ],
  },
  calendar: {
    title: "Calendar",
    description: "Coordinate meetings, demos, renewals, and sales events",
    action: "Add Event",
    icon: <HiOutlineCalendar className="h-6 w-6" />,
    filters: ["All", "Scheduled", "Completed", "Pending"],
    columns: [
      { key: "title", label: "Event" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Host" },
      { key: "channel", label: "Channel" },
      { key: "due", label: "Time" },
    ],
    metrics: [
      { label: "Today", value: "7", sub: "Calendar events", tone: "primary" },
      { label: "Demos", value: "4", sub: "Product sessions", tone: "accent" },
      { label: "Renewals", value: "3", sub: "This week", tone: "warning" },
      { label: "Conflicts", value: "1", sub: "Needs reschedule", tone: "danger" },
    ],
    rows: [
      { id: "E-301", title: "Acme legal review", subtitle: "Contract approval call", status: "Scheduled", value: "45m", owner: "Sarah J.", due: "Today 2:00 PM", channel: "Google Meet" },
      { id: "E-302", title: "CloudBase product demo", subtitle: "Operations suite walkthrough", status: "Scheduled", value: "60m", owner: "Emma D.", due: "Tomorrow 11:00 AM", channel: "Zoom" },
      { id: "E-303", title: "NexaTech partner sync", subtitle: "Scope confirmation", status: "Pending", value: "30m", owner: "Mike C.", due: "Fri 4:00 PM", channel: "Teams" },
      { id: "E-304", title: "Startup handoff", subtitle: "Customer success intro", status: "Completed", value: "30m", owner: "Sarah J.", due: "Jun 28", channel: "Zoom" },
    ],
    focus: [
      { label: "Next Event", value: "2:00 PM", caption: "Acme legal review" },
      { label: "Free Slots", value: "5", caption: "This week" },
      { label: "Avg Duration", value: "42m", caption: "Sales meetings" },
    ],
    activity: [
      { title: "CloudBase demo accepted", meta: "20m ago", tone: "accent" },
      { title: "NexaTech sync awaiting reply", meta: "2h ago", tone: "warning" },
      { title: "One calendar conflict found", meta: "Today", tone: "danger" },
    ],
  },
  calls: {
    title: "Calls",
    description: "Log call outcomes, callbacks, and rep activity",
    action: "Log Call",
    icon: <HiOutlinePhone className="h-6 w-6" />,
    filters: ["All", "Completed", "Scheduled", "Pending"],
    columns: [
      { key: "title", label: "Call" },
      { key: "status", label: "Outcome" },
      { key: "owner", label: "Rep" },
      { key: "value", label: "Duration" },
      { key: "due", label: "Time" },
    ],
    metrics: [
      { label: "Calls Today", value: "42", sub: "Team total", tone: "primary" },
      { label: "Connected", value: "26", sub: "62% connect rate", tone: "accent" },
      { label: "Callbacks", value: "8", sub: "Scheduled next", tone: "warning" },
      { label: "Missed", value: "4", sub: "Needs retry", tone: "danger" },
    ],
    rows: [
      { id: "C-401", title: "Acme procurement", subtitle: "Pricing clarification", status: "Completed", value: "18m", owner: "Sarah J.", due: "10:20 AM", channel: "Outbound" },
      { id: "C-402", title: "DataFlow expansion", subtitle: "Department rollout", status: "Scheduled", value: "30m", owner: "Emma D.", due: "2:30 PM", channel: "Discovery" },
      { id: "C-403", title: "Global Enterprises", subtitle: "Budget owner callback", status: "Pending", value: "15m", owner: "John W.", due: "Tomorrow", channel: "Callback" },
      { id: "C-404", title: "NexaTech scope review", subtitle: "Support requirements", status: "Completed", value: "24m", owner: "Mike C.", due: "Yesterday", channel: "Partner" },
    ],
    focus: [
      { label: "Connect Rate", value: "62%", caption: "+8% this week" },
      { label: "Avg Duration", value: "21m", caption: "Connected calls" },
      { label: "Best Rep", value: "Sarah J.", caption: "14 connected" },
    ],
    activity: [
      { title: "Acme call logged with next step", meta: "18m ago", tone: "accent" },
      { title: "Global callback scheduled", meta: "1h ago", tone: "warning" },
      { title: "Four missed calls need retry", meta: "Today", tone: "danger" },
    ],
  },
  emails: {
    title: "Emails",
    description: "Track outbound sequences, replies, and email performance",
    action: "Compose Email",
    icon: <HiOutlineMail className="h-6 w-6" />,
    filters: ["All", "Sent", "Scheduled", "Draft"],
    columns: [
      { key: "title", label: "Email" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Sender" },
      { key: "value", label: "Open Rate" },
      { key: "due", label: "Sent" },
    ],
    metrics: [
      { label: "Sent Today", value: "186", sub: "Across all reps", tone: "primary" },
      { label: "Reply Rate", value: "18%", sub: "+3.1% vs last week", tone: "accent" },
      { label: "Scheduled", value: "34", sub: "Queued messages", tone: "warning" },
      { label: "Drafts", value: "11", sub: "Awaiting review", tone: "danger" },
    ],
    rows: [
      { id: "M-501", title: "Revised Acme proposal", subtitle: "Security addendum attached", status: "Sent", value: "74%", owner: "Sarah J.", due: "Today", channel: "Deal" },
      { id: "M-502", title: "CloudBase demo recap", subtitle: "Operations suite follow-up", status: "Scheduled", value: "N/A", owner: "Emma D.", due: "Tomorrow", channel: "Sequence" },
      { id: "M-503", title: "Partner co-sell intro", subtitle: "NexaTech scope note", status: "Draft", value: "N/A", owner: "Mike C.", due: "Today", channel: "Partner" },
      { id: "M-504", title: "Renewal reminder", subtitle: "Customer health outreach", status: "Sent", value: "61%", owner: "John W.", due: "Jun 27", channel: "Renewal" },
    ],
    focus: [
      { label: "Open Rate", value: "64%", caption: "Last 7 days" },
      { label: "Replies", value: "34", caption: "This week" },
      { label: "Best Template", value: "Demo Recap", caption: "24% reply rate" },
    ],
    activity: [
      { title: "Acme opened revised proposal", meta: "9m ago", tone: "accent" },
      { title: "NexaTech draft needs approval", meta: "1h ago", tone: "warning" },
      { title: "Renewal reminder sequence sent", meta: "Yesterday", tone: "primary" },
    ],
  },
  communication: {
    title: "Communication",
    description: "Unify chat, SMS, meetings, and internal sales threads",
    action: "New Thread",
    icon: <HiOutlineChatAlt2 className="h-6 w-6" />,
    filters: ["All", "Open", "Pending", "Completed"],
    columns: [
      { key: "title", label: "Thread" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Owner" },
      { key: "channel", label: "Channel" },
      { key: "due", label: "Last Update" },
    ],
    metrics: [
      { label: "Open Threads", value: "19", sub: "Across channels", tone: "primary" },
      { label: "SLA Met", value: "94%", sub: "Response compliance", tone: "accent" },
      { label: "Waiting", value: "6", sub: "Customer response", tone: "warning" },
      { label: "Escalated", value: "2", sub: "Manager attention", tone: "danger" },
    ],
    rows: [
      { id: "TH-601", title: "Acme legal clarifications", subtitle: "Contract thread", status: "Open", value: "High", owner: "Sarah J.", due: "12m ago", channel: "Email" },
      { id: "TH-602", title: "CloudBase implementation chat", subtitle: "Technical questions", status: "Pending", value: "Medium", owner: "Emma D.", due: "1h ago", channel: "Slack" },
      { id: "TH-603", title: "Global pilot requirements", subtitle: "Discovery notes", status: "Open", value: "Medium", owner: "John W.", due: "3h ago", channel: "SMS" },
      { id: "TH-604", title: "Startup CS handoff", subtitle: "Closed-loop handoff", status: "Completed", value: "Low", owner: "Sarah J.", due: "Yesterday", channel: "Internal" },
    ],
    focus: [
      { label: "Median Reply", value: "18m", caption: "Across channels" },
      { label: "Top Channel", value: "Email", caption: "52% volume" },
      { label: "Escalations", value: "2", caption: "Need owner" },
    ],
    activity: [
      { title: "Acme thread assigned to Sarah", meta: "12m ago", tone: "primary" },
      { title: "CloudBase waiting on customer", meta: "1h ago", tone: "warning" },
      { title: "Two escalations still open", meta: "Today", tone: "danger" },
    ],
  },
  marketing: {
    title: "Marketing",
    description: "Plan campaigns, measure conversion, and manage audiences",
    action: "Create Campaign",
    icon: <HiOutlineSpeakerphone className="h-6 w-6" />,
    filters: ["All", "Active", "Scheduled", "Draft"],
    columns: [
      { key: "title", label: "Campaign" },
      { key: "status", label: "Status" },
      { key: "value", label: "Leads" },
      { key: "owner", label: "Owner" },
      { key: "due", label: "Launch" },
    ],
    metrics: [
      { label: "Active Campaigns", value: "8", sub: "Live right now", tone: "primary" },
      { label: "New Leads", value: "412", sub: "This month", tone: "accent" },
      { label: "Avg CPL", value: "$38", sub: "-11% vs target", tone: "warning" },
      { label: "Drafts", value: "5", sub: "Need content", tone: "danger" },
    ],
    rows: [
      { id: "MK-701", title: "Enterprise security webinar", subtitle: "ABM target list", status: "Active", value: "146", owner: "Nina P.", due: "Live", channel: "Webinar" },
      { id: "MK-702", title: "Q3 renewal nurture", subtitle: "Customer expansion", status: "Scheduled", value: "89", owner: "Omar R.", due: "Jul 10", channel: "Email" },
      { id: "MK-703", title: "Partner marketplace launch", subtitle: "Co-marketing", status: "Draft", value: "0", owner: "Lena K.", due: "Jul 18", channel: "Partner" },
      { id: "MK-704", title: "Startup founder guide", subtitle: "Inbound asset", status: "Active", value: "177", owner: "Nina P.", due: "Live", channel: "Content" },
    ],
    focus: [
      { label: "Best Campaign", value: "Webinar", caption: "146 leads" },
      { label: "MQL Rate", value: "31%", caption: "+4.2% this month" },
      { label: "Spend", value: "$15.6K", caption: "Month to date" },
    ],
    activity: [
      { title: "Webinar crossed 100 registrations", meta: "45m ago", tone: "accent" },
      { title: "Partner launch draft assigned", meta: "2h ago", tone: "warning" },
      { title: "Renewal nurture scheduled", meta: "Yesterday", tone: "primary" },
    ],
  },
  support: {
    title: "Support Tickets",
    description: "Monitor customer issues, escalation risk, and SLA health",
    action: "New Ticket",
    icon: <HiOutlineTicket className="h-6 w-6" />,
    filters: ["All", "Open", "Pending", "Escalated"],
    columns: [
      { key: "title", label: "Ticket" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Agent" },
      { key: "value", label: "Priority" },
      { key: "due", label: "SLA" },
    ],
    metrics: [
      { label: "Open Tickets", value: "23", sub: "Customer issues", tone: "primary" },
      { label: "Resolved", value: "71", sub: "Last 7 days", tone: "accent" },
      { label: "SLA Risk", value: "5", sub: "Due soon", tone: "warning" },
      { label: "Escalated", value: "3", sub: "Critical accounts", tone: "danger" },
    ],
    rows: [
      { id: "S-801", title: "Acme SSO mapping", subtitle: "Enterprise account", status: "Open", value: "High", owner: "Priya S.", due: "2h left", channel: "Portal" },
      { id: "S-802", title: "DataFlow report export", subtitle: "Analytics module", status: "Pending", value: "Medium", owner: "Leon M.", due: "5h left", channel: "Email" },
      { id: "S-803", title: "Global API timeout", subtitle: "Pilot integration", status: "Escalated", value: "Critical", owner: "Priya S.", due: "30m left", channel: "Phone" },
      { id: "S-804", title: "Startup invoice question", subtitle: "Billing support", status: "Open", value: "Low", owner: "Amir K.", due: "Tomorrow", channel: "Chat" },
    ],
    focus: [
      { label: "SLA Health", value: "91%", caption: "This week" },
      { label: "Median Resolve", value: "6h", caption: "All queues" },
      { label: "Critical", value: "1", caption: "Global API timeout" },
    ],
    activity: [
      { title: "Global API ticket escalated", meta: "14m ago", tone: "danger" },
      { title: "Acme SSO assigned to Priya", meta: "42m ago", tone: "primary" },
      { title: "DataFlow waiting on customer", meta: "2h ago", tone: "warning" },
    ],
  },
  quotations: {
    title: "Quotations",
    description: "Create proposals, quotes, approvals, and customer-ready offers",
    action: "Create Quote",
    icon: <HiOutlineDocumentText className="h-6 w-6" />,
    filters: ["All", "Draft", "Sent", "Won"],
    columns: [
      { key: "title", label: "Quotation" },
      { key: "status", label: "Status" },
      { key: "value", label: "Amount" },
      { key: "owner", label: "Owner" },
      { key: "due", label: "Valid Until" },
    ],
    metrics: [
      { label: "Quotes Sent", value: "17", sub: "This month", tone: "primary" },
      { label: "Accepted", value: "$218K", sub: "Closed value", tone: "accent" },
      { label: "Awaiting Approval", value: "6", sub: "Manager review", tone: "warning" },
      { label: "Expiring", value: "4", sub: "Next 7 days", tone: "danger" },
    ],
    rows: [
      { id: "Q-901", title: "Acme enterprise proposal", subtitle: "Security and implementation", status: "Sent", value: "$86,000", owner: "Sarah J.", due: "2024-08-15", channel: "PDF" },
      { id: "Q-902", title: "CloudBase operations suite", subtitle: "Annual subscription", status: "Draft", value: "$73,000", owner: "Emma D.", due: "2024-08-02", channel: "Doc" },
      { id: "Q-903", title: "DataFlow expansion order", subtitle: "Two departments", status: "Won", value: "$124,000", owner: "Emma D.", due: "2024-07-24", channel: "PDF" },
      { id: "Q-904", title: "NexaTech managed services", subtitle: "Partner bundle", status: "Review", value: "$27,000", owner: "Mike C.", due: "2024-09-19", channel: "Doc" },
    ],
    focus: [
      { label: "Approval Queue", value: "6", caption: "Need manager review" },
      { label: "Avg Discount", value: "8.5%", caption: "Current quotes" },
      { label: "Close Rate", value: "41%", caption: "From sent quotes" },
    ],
    activity: [
      { title: "Acme proposal viewed twice", meta: "11m ago", tone: "accent" },
      { title: "NexaTech quote needs approval", meta: "1h ago", tone: "warning" },
      { title: "DataFlow quote accepted", meta: "Yesterday", tone: "accent" },
    ],
  },
  reports: {
    title: "Reports",
    description: "Build sales, activity, pipeline, and revenue reporting packs",
    action: "Generate Report",
    icon: <HiOutlinePresentationChartLine className="h-6 w-6" />,
    filters: ["All", "Completed", "Scheduled", "Draft"],
    columns: [
      { key: "title", label: "Report" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Owner" },
      { key: "channel", label: "Format" },
      { key: "due", label: "Run Date" },
    ],
    metrics: [
      { label: "Reports", value: "24", sub: "Saved reports", tone: "primary" },
      { label: "Scheduled", value: "9", sub: "Recurring exports", tone: "accent" },
      { label: "Dashboards", value: "6", sub: "Live views", tone: "warning" },
      { label: "Failed Runs", value: "1", sub: "Needs retry", tone: "danger" },
    ],
    rows: [
      { id: "R-1001", title: "Pipeline forecast", subtitle: "Weighted revenue by owner", status: "Completed", value: "2.4 MB", owner: "Sarah J.", due: "Today", channel: "PDF" },
      { id: "R-1002", title: "Activity scorecard", subtitle: "Calls, emails, tasks", status: "Scheduled", value: "Live", owner: "Mike C.", due: "Monday", channel: "Dashboard" },
      { id: "R-1003", title: "Campaign attribution", subtitle: "Lead source conversion", status: "Draft", value: "N/A", owner: "Nina P.", due: "Jul 12", channel: "CSV" },
      { id: "R-1004", title: "Renewal risk report", subtitle: "Health and upcoming renewals", status: "Completed", value: "1.8 MB", owner: "Emma D.", due: "Yesterday", channel: "Excel" },
    ],
    focus: [
      { label: "Next Run", value: "Monday", caption: "Activity scorecard" },
      { label: "Most Viewed", value: "Forecast", caption: "83 views" },
      { label: "Export Queue", value: "2", caption: "In progress" },
    ],
    activity: [
      { title: "Pipeline forecast generated", meta: "30m ago", tone: "accent" },
      { title: "Campaign attribution saved as draft", meta: "2h ago", tone: "warning" },
      { title: "One scheduled report failed", meta: "Yesterday", tone: "danger" },
    ],
  },
  notifications: {
    title: "Notifications",
    description: "Control alerts for deals, tasks, support, and customer events",
    action: "Create Rule",
    icon: <HiOutlineBell className="h-6 w-6" />,
    filters: ["All", "Enabled", "Paused", "Pending"],
    columns: [
      { key: "title", label: "Notification" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Audience" },
      { key: "channel", label: "Channel" },
      { key: "due", label: "Last Triggered" },
    ],
    metrics: [
      { label: "Rules Enabled", value: "18", sub: "Active automations", tone: "primary" },
      { label: "Delivered", value: "1.2K", sub: "This month", tone: "accent" },
      { label: "Muted", value: "5", sub: "User controlled", tone: "warning" },
      { label: "Failed", value: "2", sub: "Webhook errors", tone: "danger" },
    ],
    rows: [
      { id: "N-1101", title: "High value deal changed", subtitle: "Value above $50K", status: "Enabled", value: "High", owner: "Sales Managers", due: "12m ago", channel: "In-app" },
      { id: "N-1102", title: "Task overdue reminder", subtitle: "Past due by 24 hours", status: "Enabled", value: "Medium", owner: "Task Owners", due: "1h ago", channel: "Email" },
      { id: "N-1103", title: "SLA breach warning", subtitle: "Support ticket near breach", status: "Enabled", value: "Critical", owner: "Support Leads", due: "35m ago", channel: "Slack" },
      { id: "N-1104", title: "Weekly digest", subtitle: "Pipeline and activity summary", status: "Paused", value: "Low", owner: "All CRM Users", due: "Friday", channel: "Email" },
    ],
    focus: [
      { label: "Delivery Rate", value: "99.1%", caption: "Last 30 days" },
      { label: "Top Alert", value: "Overdue", caption: "312 triggers" },
      { label: "Webhook Errors", value: "2", caption: "Needs retry" },
    ],
    activity: [
      { title: "SLA warning sent to support leads", meta: "35m ago", tone: "danger" },
      { title: "Deal change alert delivered", meta: "12m ago", tone: "primary" },
      { title: "Weekly digest paused", meta: "Yesterday", tone: "warning" },
    ],
  },
  settings: {
    title: "Settings",
    description: "Configure CRM teams, permissions, stages, and automation rules",
    action: "Add Setting",
    icon: <HiOutlineCog className="h-6 w-6" />,
    filters: ["All", "Enabled", "Review", "Pending"],
    columns: [
      { key: "title", label: "Setting" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Owner" },
      { key: "channel", label: "Area" },
      { key: "due", label: "Updated" },
    ],
    metrics: [
      { label: "Users", value: "42", sub: "CRM seats", tone: "primary" },
      { label: "Automations", value: "16", sub: "Enabled rules", tone: "accent" },
      { label: "Pending Reviews", value: "4", sub: "Admin approval", tone: "warning" },
      { label: "Access Risks", value: "1", sub: "Permission audit", tone: "danger" },
    ],
    rows: [
      { id: "SET-1201", title: "Sales stage definitions", subtitle: "Pipeline rules and probability", status: "Enabled", value: "Core", owner: "Admin", due: "Today", channel: "Pipeline" },
      { id: "SET-1202", title: "Lead assignment routing", subtitle: "Round-robin by region", status: "Review", value: "High", owner: "Ops", due: "Yesterday", channel: "Automation" },
      { id: "SET-1203", title: "Notification preferences", subtitle: "Default CRM alert rules", status: "Enabled", value: "Medium", owner: "Admin", due: "Jun 27", channel: "Alerts" },
      { id: "SET-1204", title: "Role permission audit", subtitle: "Manager and rep visibility", status: "Pending", value: "High", owner: "Security", due: "Jul 02", channel: "Access" },
    ],
    focus: [
      { label: "Default Pipeline", value: "Enterprise", caption: "Used by 18 reps" },
      { label: "Automation Health", value: "97%", caption: "Successful runs" },
      { label: "Audit Item", value: "1", caption: "Permission review" },
    ],
    activity: [
      { title: "Stage definitions updated", meta: "Today", tone: "accent" },
      { title: "Assignment routing needs review", meta: "Yesterday", tone: "warning" },
      { title: "Permission audit flagged one risk", meta: "Jun 27", tone: "danger" },
    ],
  },
};

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="crm-card rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{metric.label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{metric.value}</p>
          <p className="mt-1 text-xs text-slate-500">{metric.sub}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneClasses[metric.tone]}`}>
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
        </div>
      </div>
    </div>
  );
}

export default function SettingsDetail() {
  const config = configs.settings;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredRows = useMemo(() => {
    const query = search.toLowerCase();
    return config.rows.filter((row) => {
      const matchesSearch = [row.title, row.subtitle, row.status, row.owner, row.channel]
        .some((value) => value.toLowerCase().includes(query));
      const matchesFilter = filter === "All" || row.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [config.rows, filter, search]);

  return (
    <div className="crm-dashboard min-h-screen space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="crm-icon-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
            {config.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{config.title}</h1>
            <p className="mt-1 text-sm text-slate-400">{config.description}</p>
          </div>
        </div>
        <button className="crm-btn crm-btn-primary">
          <HiOutlinePlus className="h-4 w-4" />
          {config.action}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {config.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <div className="crm-card rounded-2xl p-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative min-w-56 flex-1">
                <HiOutlineSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={`Search ${config.title.toLowerCase()}...`}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 py-2.5 pl-9 pr-4 text-sm text-white outline-none transition placeholder-slate-500 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <select
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  className="appearance-none rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 pr-8 text-sm text-white outline-none transition focus:border-blue-500"
                >
                  {config.filters.map((item) => <option key={item}>{item}</option>)}
                </select>
                <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-slate-400" />
              </div>

              <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
                <HiOutlineFilter className="h-4 w-4" />
                {filteredRows.length} of {config.rows.length} records
              </div>
            </div>
          </div>

          <div className="crm-card overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="crm-table">
                <thead>
                  <tr>
                    {config.columns.map((column) => <th key={column.key}>{column.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 && (
                    <tr>
                      <td colSpan={config.columns.length} className="py-12 text-center text-slate-500">No records found</td>
                    </tr>
                  )}
                  {filteredRows.map((row) => (
                    <tr key={row.id}>
                      {config.columns.map((column) => {
                        if (column.key === "title") {
                          return (
                            <td key={column.key}>
                              <div>
                                <p className="text-sm font-semibold text-white">{row.title}</p>
                                <p className="text-xs text-slate-400">{row.subtitle}</p>
                              </div>
                            </td>
                          );
                        }

                        if (column.key === "status") {
                          return (
                            <td key={column.key}>
                              <span className={`crm-badge text-xs ${badgeClasses[row.status] ?? "bg-slate-500/20 text-slate-400 border border-slate-500/30"}`}>
                                {row.status}
                              </span>
                            </td>
                          );
                        }

                        return <td key={column.key} className="text-sm text-slate-300">{row[column.key as keyof Row]}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="crm-card rounded-2xl p-5">
            <h2 className="text-base font-semibold text-white">Focus</h2>
            <div className="mt-4 space-y-3">
              {config.focus.map((item) => (
                <div key={item.label} className="rounded-xl bg-slate-800/50 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</span>
                    <span className="text-lg font-bold text-white">{item.value}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="crm-card rounded-2xl p-5">
            <h2 className="text-base font-semibold text-white">Recent Activity</h2>
            <div className="mt-4 space-y-3">
              {config.activity.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-xl bg-slate-800/50 p-3">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toneClasses[item.tone]}`}>
                    <span className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

