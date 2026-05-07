"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi";

interface Ticket {
  id: string;
  tenant: string;
  subject: string;
  progress: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  createdDate: string;
}

const mockTickets: Ticket[] = [
  {
    id: "#1234",
    tenant: "Acme Corp",
    subject: "Login issue",
    progress: "open",
    priority: "high",
    createdDate: "2024-01-15",
  },
  {
    id: "#1235",
    tenant: "TechStart Inc",
    subject: "Feature request",
    progress: "in-progress",
    priority: "medium",
    createdDate: "2024-01-14",
  },
  {
    id: "#1236",
    tenant: "DataFlow Ltd",
    subject: "Billing question",
    progress: "resolved",
    priority: "low",
    createdDate: "2024-01-13",
  },
  {
    id: "#1237",
    tenant: "Global Enterprises",
    subject: "System crash",
    progress: "open",
    priority: "critical",
    createdDate: "2024-01-12",
  },
];

const progressOptions = [
  { value: "open", label: "Open", color: "bg-blue-500/20 text-blue-400" },
  { value: "in-progress", label: "In Progress", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "resolved", label: "Resolved", color: "bg-green-500/20 text-green-400" },
  { value: "closed", label: "Closed", color: "bg-gray-500/20 text-gray-400" },
];

const priorityOptions = [
  { value: "low", label: "Low", color: "bg-green-500/20 text-green-400" },
  { value: "medium", label: "Medium", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "high", label: "High", color: "bg-orange-500/20 text-orange-400" },
  { value: "critical", label: "Critical", color: "bg-red-500/20 text-red-400" },
];

export default function Detail() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const updateTicket = (
    id: string,
    field: "progress" | "priority",
    value: string
  ) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, [field]: value }
          : ticket
      )
    );
    setOpenDropdown(null);
  };

  const deleteTicket = (id: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  const getProgressColor = (progress: string) => {
    return progressOptions.find((p) => p.value === progress)?.color || "";
  };

  const getPriorityColor = (priority: string) => {
    return priorityOptions.find((p) => p.value === priority)?.color || "";
  };

  const getProgressLabel = (progress: string) => {
    return progressOptions.find((p) => p.value === progress)?.label || progress;
  };

  const getPriorityLabel = (priority: string) => {
    return priorityOptions.find((p) => p.value === priority)?.label || priority;
  };

  return (
    <div className="dash-page p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Manage customer support requests
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Total Tickets</p>
          <p className="text-2xl font-bold text-white mt-1">{tickets.length}</p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Open</p>
          <p className="text-2xl font-bold text-white mt-1">
            {tickets.filter((t) => t.progress === "open").length}
          </p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>In Progress</p>
          <p className="text-2xl font-bold text-white mt-1">
            {tickets.filter((t) => t.progress === "in-progress").length}
          </p>
        </div>
        <div className="panel-card rounded-xl p-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Critical Priority</p>
          <p className="text-2xl font-bold text-white mt-1">
            {tickets.filter((t) => t.priority === "critical").length}
          </p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="panel-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white">
                  Ticket ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white">
                  Tenant
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white">
                  Created Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">
                  Progress
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">
                  Priority
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{ticket.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white">{ticket.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white">{ticket.tenant}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {ticket.createdDate}
                    </p>
                  </td>

                  {/* Progress Dropdown */}
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() => {
                          setOpenDropdown(
                            openDropdown === `${ticket.id}-progress`
                              ? null
                              : `${ticket.id}-progress`
                          );
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${getProgressColor(
                          ticket.progress
                        )}`}
                      >
                        {getProgressLabel(ticket.progress)}
                        <HiOutlineChevronDown className="w-3 h-3" />
                      </button>

                      {openDropdown === `${ticket.id}-progress` && (
                        <div className="absolute top-full mt-1 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 min-w-max">
                          {progressOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() =>
                                updateTicket(ticket.id, "progress", option.value)
                              }
                              className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition first:rounded-t-lg last:rounded-b-lg ${
                                ticket.progress === option.value
                                  ? "bg-slate-700 text-blue-400"
                                  : "text-white"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Priority Dropdown */}
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() => {
                          setOpenDropdown(
                            openDropdown === `${ticket.id}-priority`
                              ? null
                              : `${ticket.id}-priority`
                          );
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {getPriorityLabel(ticket.priority)}
                        <HiOutlineChevronDown className="w-3 h-3" />
                      </button>

                      {openDropdown === `${ticket.id}-priority` && (
                        <div className="absolute top-full mt-1 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 min-w-max">
                          {priorityOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() =>
                                updateTicket(ticket.id, "priority", option.value)
                              }
                              className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition first:rounded-t-lg last:rounded-b-lg ${
                                ticket.priority === option.value
                                  ? "bg-slate-700 text-blue-400"
                                  : "text-white"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition"
                        title="View Details"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTicket(ticket.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                        title="Delete Ticket"
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
    </div>
  );
}
