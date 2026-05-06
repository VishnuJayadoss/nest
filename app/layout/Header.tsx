"use client";

import { useState, useRef, useEffect } from "react";
import "./header.css";
import { HiOutlineBell, HiOutlineChevronDown, HiOutlineUser, HiOutlineCog, HiOutlineLogout, HiOutlineSearch } from "react-icons/hi";
import { MdCircle } from "react-icons/md";
import Link from "next/link";

const notifications = [
  { id: 1, title: "New user registered",   desc: "Alex joined the platform",       time: "2m ago",  unread: true  },
  { id: 2, title: "Server alert",          desc: "CPU usage exceeded 90%",          time: "15m ago", unread: true  },
  { id: 3, title: "Payment received",      desc: "$240 from Acme Corp",             time: "1h ago",  unread: true  },
  { id: 4, title: "Deployment complete",   desc: "v2.4.1 deployed successfully",    time: "3h ago",  unread: false },
];

export default function DashboardHeader() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header-glass sticky top-0 z-10 w-full flex items-center">
      <div className="max-w-screen-2xl mx-auto px-6 w-full flex items-center justify-between">

        {/* ── LEFT: Search ── */}
        <div className="header-search hidden md:flex items-center gap-2 px-3 h-9 rounded-xl">
          <HiOutlineSearch className="w-4 h-4 shrink-0" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none w-36 placeholder:text-slate-500 text-slate-200"
          />
        </div>

        <div className="flex items-center gap-3">

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="notif-btn relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white"
            >
              <HiOutlineBell className="w-5 h-5" />
              {unreadCount > 0 && <span className="badge-pulse" />}
            </button>

            {notifOpen && (
              <div className="notif-dropdown absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden" style={{ zIndex: 100 }}>
                <div className="dropdown-glass rounded-2xl">
                  <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <span className="text-white text-sm font-semibold">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setNotifs(notifs.map((n) => ({ ...n, unread: false })))}
                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifs.map((n) => (
                      <div
                        key={n.id}
                        className={`notif-item flex items-start gap-3 px-4 py-3 cursor-pointer ${n.unread ? "notif-unread" : ""}`}
                        onClick={() => setNotifs(notifs.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
                      >
                        <div className="notif-dot-wrap mt-1.5 flex-shrink-0">
                          {n.unread && <MdCircle className="w-2 h-2" style={{ color: "var(--violet)" }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-100 truncate">{n.title}</p>
                          <p className="text-xs text-slate-400 truncate">{n.desc}</p>
                        </div>
                        <span className="text-xs text-slate-500 flex-shrink-0 mt-0.5">{n.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t px-4 py-2.5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Group */}
          <div className="profile-group relative">
            <button className="profile-trigger flex items-center gap-2.5 px-3 h-10 rounded-xl">
              <div className="avatar-ring w-7 h-7">
                <div className="avatar-inner">
                  <span className="text-white text-xs font-bold">JD</span>
                </div>
              </div>
              <span className="text-sm font-medium hidden sm:block text-slate-100">John Doe</span>
              <HiOutlineChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            <div className="dropdown-menu absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden" style={{ zIndex: 100 }}>
              <div className="dropdown-glass rounded-2xl">
                <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center gap-3">
                    <div className="avatar-ring w-10 h-10">
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
                <div className="py-2">
                  <Link href="/control/profile" className="menu-item w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white">
                    <HiOutlineUser className="w-4 h-4 text-indigo-400" />
                    My Profile
                  </Link>
                  <Link href="/control/settings" className="menu-item w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white">
                    <HiOutlineCog className="w-4 h-4 text-indigo-400" />
                    Settings
                  </Link>
                </div>
                <div className="border-t py-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <button className="menu-item logout w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300">
                    <HiOutlineLogout className="w-4 h-4 text-red-400" />
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
