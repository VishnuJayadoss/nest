"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
  HiOutlineDocumentReport,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineCalendar,
  HiOutlineFilter,
} from "react-icons/hi";

interface Report {
  id: string;
  name: string;
  module: "CRM" | "ERP" | "HRM" | "Support" | "Billing" | "Analytics";
  type: "Usage" | "Revenue" | "Performance" | "User Activity" | "Ticket Summary" | "Subscription";
  generatedDate: string;
  fileSize: string;
  format: "PDF" | "CSV" | "Excel";
  status: "completed" | "processing" | "failed";
}

const mockReports: Report[] = [
  {
    id: "R001",
    name: "CRM Monthly Usage Report",
    module: "CRM",
    type: "Usage",
    generatedDate: "2024-01-15",
    fileSize: "2.4 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: "R002",
    name: "ERP Performance Analysis",
    module: "ERP",
    type: "Performance",
    generatedDate: "2024-01-14",
    fileSize: "1.8 MB",
    format: "Excel",
    status: "completed",
  },
  {
    id: "R003",
    name: "HRM Employee Activity Report",
    module: "HRM",
    type: "User Activity",
    generatedDate: "2024-01-13",
    fileSize: "3.2 MB",
    format: "CSV",
    status: "completed",
  },
  {
    id: "R004",
    name: "Support Ticket Summary",
    module: "Support",
    type: "Ticket Summary",
    generatedDate: "2024-01-12",
    fileSize: "1.1 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: "R005",
    name: "Monthly Revenue Report",
    module: "Billing",
    type: "Revenue",
    generatedDate: "2024-01-11",
    fileSize: "2.9 MB",
    format: "Excel",
    status: "completed",
  },
  {
    id: "R006",
    name: "Platform Analytics Dashboard",
    module: "Analytics",
    type: "Performance",
    generatedDate: "2024-01-10",
    fileSize: "4.1 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: "R007",
    name: "Subscription Management Report",
    module: "Billing",
    type: "Subscription",
    generatedDate: "2024-01-09",
    fileSize: "1.5 MB",
    format: "CSV",
    status: "processing",
  },
  {
    id: "R008",
    name: "CRM Sales Pipeline Analysis",
    module: "CRM",
    type: "Performance",
    generatedDate: "2024-01-08",
    fileSize: "2.7 MB",
    format: "Excel",
    status: "completed",
  },
];

const reportTemplates = [
  {
    id: "T001",
    name: "CRM Monthly Usage",
    module: "CRM",
    description: "Track CRM module usage and tenant activity",
    icon: "📊",
  },
  {
    id: "T002",
    name: "CRM Sales Pipeline",
    module: "CRM",
    description: "Analyze sales pipeline and conversion metrics",
    icon: "📈",
  },
  {
    id: "T003",
    name: "ERP Inventory Report",
    module: "ERP",
    description: "Detailed inventory and stock analysis",
    icon: "📦",
  },
  {
    id: "T004",
    name: "ERP Financial Summary",
    module: "ERP",
    description: "Financial performance and budget tracking",
    icon: "💰",
  },
  {
    id: "T005",
    name: "HRM Employee Report",
    module: "HRM",
    description: "Employee activity and performance metrics",
    icon: "👥",
  },
  {
    id: "T006",
    name: "HRM Payroll Summary",
    module: "HRM",
    description: "Payroll processing and salary details",
    icon: "💳",
  },
  {
    id: "T007",
    name: "Support Ticket Analysis",
    module: "Support",
    description: "Support ticket metrics and resolution times",
    icon: "🎫",
  },
  {
    id: "T008",
    name: "Revenue Report",
    module: "Billing",
    description: "Monthly and annual revenue analysis",
    icon: "💵",
  },
  {
    id: "T009",
    name: "Subscription Report",
    module: "Billing",
    description: "Subscription status and renewal tracking",
    icon: "📋",
  },
  {
    id: "T010",
    name: "Platform Analytics",
    module: "Analytics",
    description: "Overall platform performance and insights",
    icon: "📉",
  },
];

const moduleColors: Record<string, string> = {
  CRM: "bg-blue-500/20 text-blue-400",
  ERP: "bg-purple-500/20 text-purple-400",
  HRM: "bg-green-500/20 text-green-400",
  Support: "bg-orange-500/20 text-orange-400",
  Billing: "bg-pink-500/20 text-pink-400",
  Analytics: "bg-indigo-500/20 text-indigo-400",
};

const formatColors: Record<string, string> = {
  PDF: "bg-red-500/20 text-red-400",
  CSV: "bg-green-500/20 text-green-400",
  Excel: "bg-blue-500/20 text-blue-400",
};

export default function Detail() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [activeTab, setActiveTab] = useState<"reports" | "templates">("reports");
  const [selectedModule, setSelectedModule] = useState<string>("All");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const deleteReport = (id: string) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const downloadReport = (report: Report) => {
    const element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(`Report: ${report.name}\nGenerated: ${report.generatedDate}\nModule: ${report.module}\nFormat: ${report.format}`)}`);
    element.setAttribute("download", `${report.name}.${report.format.toLowerCase()}`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateReport = (templateId: string) => {
    const template = reportTemplates.find((t) => t.id === templateId);
    if (template) {
      const newReport: Report = {
        id: `R${Date.now()}`,
        name: template.name,
        module: template.module as any,
        type: template.name.includes("Usage")
          ? "Usage"
          : template.name.includes("Performance")
          ? "Performance"
          : template.name.includes("Activity")
          ? "User Activity"
          : template.name.includes("Ticket")
          ? "Ticket Summary"
          : template.name.includes("Revenue")
          ? "Revenue"
          : "Subscription",
        generatedDate: new Date().toISOString().split("T")[0],
        fileSize: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
        format: ["PDF", "CSV", "Excel"][Math.floor(Math.random() * 3)] as any,
        status: "completed",
      };
      setReports([newReport, ...reports]);
      setShowGenerateModal(false);
      setSelectedTemplate(null);
    }
  };

  const filteredReports =
    selectedModule === "All"
      ? reports
      : reports.filter((r) => r.module === selectedModule);

  const filteredTemplates =
    selectedModule === "All"
      ? reportTemplates
      : reportTemplates.filter((t) => t.module === selectedModule);

  return (
    <div className="dash-page p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Generate and manage reports across all modules
          </p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Reports</p>
          <p className="text-2xl font-bold text-white mt-1">{reports.length}</p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Completed</p>
          <p className="text-2xl font-bold text-white mt-1">
            {reports.filter((r) => r.status === "completed").length}
          </p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Processing</p>
          <p className="text-2xl font-bold text-white mt-1">
            {reports.filter((r) => r.status === "processing").length}
          </p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Size</p>
          <p className="text-2xl font-bold text-white mt-1">
            {(
              reports.reduce((sum, r) => sum + parseFloat(r.fileSize), 0)
            ).toFixed(1)}{" "}
            MB
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700">
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
            activeTab === "reports"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Generated Reports
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
            activeTab === "templates"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Report Templates
        </button>
      </div>

      {/* Module Filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", "CRM", "ERP", "HRM", "Support", "Billing", "Analytics"].map(
          (module) => (
            <button
              key={module}
              onClick={() => setSelectedModule(module)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedModule === module
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-gray-300 hover:bg-slate-600"
              }`}
            >
              {module}
            </button>
          )
        )}
      </div>

      {/* Generated Reports Tab */}
      {activeTab === "reports" && (
        <div className="panel-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white">
                    Report Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white">
                    Module
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white">
                    Generated Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white">
                    Format
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white">
                    Size
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">
                        {report.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          moduleColors[report.module]
                        }`}
                      >
                        {report.module}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-white">{report.type}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {report.generatedDate}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          formatColors[report.format]
                        }`}
                      >
                        {report.format}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="text-sm text-white">{report.fileSize}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          report.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : report.status === "processing"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {report.status.charAt(0).toUpperCase() +
                          report.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => downloadReport(report)}
                          className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition"
                          title="Download Report"
                        >
                          <HiOutlineDownload className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-green-500/20 text-green-400 transition"
                          title="View Report"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteReport(report.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                          title="Delete Report"
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
      )}

      {/* Report Templates Tab */}
      {activeTab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="panel-card rounded-2xl p-6 hover:border-blue-500/50 transition cursor-pointer"
              onClick={() => {
                setSelectedTemplate(template.id);
                setShowGenerateModal(true);
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{template.icon}</div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    moduleColors[template.module]
                  }`}
                >
                  {template.module}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {template.name}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {template.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  generateReport(template.id);
                }}
                className="w-full mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
              >
                Generate Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="panel-card rounded-2xl max-w-md w-full p-6">
            <h2 className="text-lg font-bold text-white mb-4">Generate Report</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white block mb-2">
                  Select Template
                </label>
                <select
                  value={selectedTemplate || ""}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none transition"
                >
                  <option value="">Choose a template...</option>
                  {reportTemplates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.module})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white block mb-2">
                  Export Format
                </label>
                <div className="flex gap-2">
                  {["PDF", "CSV", "Excel"].map((format) => (
                    <button
                      key={format}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition"
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white block mb-2">
                  Date Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none transition"
                  />
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowGenerateModal(false);
                  setSelectedTemplate(null);
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedTemplate) {
                    generateReport(selectedTemplate);
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
