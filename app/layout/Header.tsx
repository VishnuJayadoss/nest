"use client";

import { useState } from "react";
import "./header.css"

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export default function DashboardHeader() {
  const [notifCount] = useState(3);

  return (

    <header className="header-glass sticky top-0 z-50 w-full">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── LEFT: Logo ── */}
        <div className="flex items-center gap-3">
          <div className="logo-glow w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)" }}>
            <span className="text-white font-bold text-lg tracking-tight">N</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide hidden sm:block"
            style={{ letterSpacing: "0.04em" }}>
            NexaPanel
          </span>
        </div>

        {/* ── RIGHT: Notifications + Profile ── */}
        <div className="flex items-center gap-3">

          {/* Notification Bell */}
          <button className="notif-btn relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white">
            <BellIcon />
            {notifCount > 0 && (
              <span className="badge-pulse absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{ background: "#ef4444" }} />
            )}
          </button>

          {/* Profile Group — hover triggers dropdown */}
          <div className="profile-group relative">

            {/* Trigger Button */}
            <button className="profile-trigger flex items-center gap-2.5 px-3 h-10 rounded-xl text-slate-200">
              {/* Avatar */}
              <div className="avatar-ring w-7 h-7 flex-shrink-0">
                <div className="avatar-inner">
                  <span className="text-white text-xs font-bold">JD</span>
                </div>
              </div>
              <span className="text-sm font-medium hidden sm:block text-slate-100">John Doe</span>
              <span className="text-slate-400 hidden sm:block"><ChevronDownIcon /></span>
            </button>

            {/* Dropdown Menu */}
            <div className="dropdown-menu absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden"
              style={{ zIndex: 100 }}>
              <div className="dropdown-glass rounded-2xl">

                {/* Header card */}
                <div className="px-4 py-4 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center gap-3">
                    <div className="avatar-ring w-10 h-10 flex-shrink-0">
                      <div className="avatar-inner">
                        <span className="text-white text-sm font-bold">JD</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">John Doe</p>
                      <p className="text-slate-400 text-xs">john@nexapanel.com</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button className="menu-item w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white">
                    <span className="text-indigo-400"><UserIcon /></span>
                    My Profile
                  </button>
                  <button className="menu-item w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white">
                    <span className="text-indigo-400"><SettingsIcon /></span>
                    Settings
                  </button>
                </div>

                {/* Divider + Logout */}
                <div className="border-t py-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <button className="menu-item logout w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300">
                    <span className="text-red-400"><LogoutIcon /></span>
                    Logout
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}