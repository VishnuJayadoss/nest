"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
    HiOutlineUser,
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineShieldCheck,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlineCheck,
    HiOutlinePencil,
    HiOutlineCamera,
    HiOutlineLocationMarker,
    HiOutlineCalendar,
    HiOutlineBriefcase,
} from "react-icons/hi";

type Role = "Super Admin" | "Admin" | "Member";

const roleConfig: Record<Role, { cls: string; desc: string }> = {
    "Super Admin": { cls: "role-super",  desc: "Full access to all resources and settings" },
    "Admin":       { cls: "role-admin",  desc: "Manage users, projects and configurations" },
    "Member":      { cls: "role-member", desc: "Access to assigned projects only" },
};

export default function ProfileDetail() {
    const [firstName,   setFirstName]   = useState("John");
    const [lastName,    setLastName]    = useState("Doe");
    const [email,       setEmail]       = useState("john@nexapanel.com");
    const [phone,       setPhone]       = useState("+1 234-567-8900");
    const [location,    setLocation]    = useState("New York, USA");
    const [jobTitle,    setJobTitle]    = useState("Senior Developer");
    const [role,        setRole]        = useState<Role>("Admin");
    const [profileSaved, setProfileSaved] = useState(false);

    const [currentPwd,  setCurrentPwd]  = useState("");
    const [newPwd,      setNewPwd]      = useState("");
    const [confirmPwd,  setConfirmPwd]  = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew,     setShowNew]     = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pwdSaved,    setPwdSaved]    = useState(false);
    const [pwdError,    setPwdError]    = useState("");

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    const pwdStrength = (pwd: string) => {
        if (!pwd) return 0;
        let score = 0;
        if (pwd.length >= 8)          score++;
        if (/[A-Z]/.test(pwd))        score++;
        if (/[0-9]/.test(pwd))        score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score;
    };

    const strength = pwdStrength(newPwd);
    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
    const strengthCls   = ["", "pwd-weak", "pwd-fair", "pwd-good", "pwd-strong"][strength];

    function handleProfileSave() {
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 2500);
    }

    function handlePasswordSave() {
        setPwdError("");
        if (!currentPwd || !newPwd || !confirmPwd) { setPwdError("All fields are required."); return; }
        if (newPwd !== confirmPwd)                  { setPwdError("New passwords do not match."); return; }
        if (newPwd.length < 8)                      { setPwdError("Password must be at least 8 characters."); return; }
        setPwdSaved(true);
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
        setTimeout(() => setPwdSaved(false), 2500);
    }

    return (
        <div className="dash-page p-6 space-y-6 max-w-4xl mx-auto">

            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-white">Profile</h1>
                <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage your personal information and security</p>
            </div>

            {/* ── Profile Card ── */}
            <div className="panel-card rounded-2xl overflow-hidden">

                {/* Banner */}
                <div className="profile-banner h-28 relative" />

                {/* Avatar + name row */}
                <div className="px-6 pb-6">
                    <div className="flex items-end justify-between" style={{ marginTop: "-40px" }}>
                        <div className="relative">
                            <div className="profile-avatar-ring w-20 h-20 rounded-2xl flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">{initials}</span>
                            </div>
                            <button className="profile-cam-btn absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center">
                                <HiOutlineCamera className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`profile-role-badge ${roleConfig[role].cls}`}>{role}</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-bold text-white">{firstName} {lastName}</h2>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{jobTitle}</p>
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                                <HiOutlineMail className="w-3.5 h-3.5" />{email}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                                <HiOutlineLocationMarker className="w-3.5 h-3.5" />{location}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                                <HiOutlineCalendar className="w-3.5 h-3.5" />Joined Jan 2023
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ── Personal Info ── */}
                <div className="panel-card rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 mb-1">
                        <HiOutlineUser className="w-4 h-4" style={{ color: "var(--violet)" }} />
                        <h3 className="text-sm font-semibold text-white">Personal Information</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="profile-label">First Name</label>
                            <div className="profile-input-wrap">
                                <HiOutlineUser className="profile-input-icon" />
                                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="profile-input" placeholder="First name" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="profile-label">Last Name</label>
                            <div className="profile-input-wrap">
                                <HiOutlineUser className="profile-input-icon" />
                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="profile-input" placeholder="Last name" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="profile-label">Email Address</label>
                        <div className="profile-input-wrap">
                            <HiOutlineMail className="profile-input-icon" />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="profile-input" placeholder="Email" type="email" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="profile-label">Phone Number</label>
                        <div className="profile-input-wrap">
                            <HiOutlinePhone className="profile-input-icon" />
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="profile-input" placeholder="Phone" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="profile-label">Location</label>
                        <div className="profile-input-wrap">
                            <HiOutlineLocationMarker className="profile-input-icon" />
                            <input value={location} onChange={(e) => setLocation(e.target.value)} className="profile-input" placeholder="Location" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="profile-label">Job Title</label>
                        <div className="profile-input-wrap">
                            <HiOutlineBriefcase className="profile-input-icon" />
                            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="profile-input" placeholder="Job title" />
                        </div>
                    </div>

                    <button onClick={handleProfileSave} className={`profile-save-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium ${profileSaved ? "profile-save-success" : ""}`}>
                        {profileSaved ? <><HiOutlineCheck className="w-4 h-4" />Saved!</> : <><HiOutlinePencil className="w-4 h-4" />Save Changes</>}
                    </button>
                </div>

                <div className="space-y-6">

                    {/* ── Role ── */}
                    <div className="panel-card rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <HiOutlineShieldCheck className="w-4 h-4" style={{ color: "var(--violet)" }} />
                            <h3 className="text-sm font-semibold text-white">Role & Permissions</h3>
                        </div>

                        <div className="space-y-2">
                            {(Object.keys(roleConfig) as Role[]).map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={`role-option w-full flex items-center gap-3 p-3.5 rounded-xl text-left ${role === r ? "role-option-active" : ""}`}
                                >
                                    <div className={`role-option-dot ${roleConfig[r].cls}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white">{r}</p>
                                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{roleConfig[r].desc}</p>
                                    </div>
                                    {role === r && <HiOutlineCheck className="w-4 h-4 shrink-0" style={{ color: "var(--violet)" }} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Password ── */}
                    <div className="panel-card rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <HiOutlineLockClosed className="w-4 h-4" style={{ color: "var(--violet)" }} />
                            <h3 className="text-sm font-semibold text-white">Update Password</h3>
                        </div>

                        <div className="space-y-1.5">
                            <label className="profile-label">Current Password</label>
                            <div className="profile-input-wrap">
                                <HiOutlineLockClosed className="profile-input-icon" />
                                <input value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} type={showCurrent ? "text" : "password"} className="profile-input" placeholder="Current password" />
                                <button onClick={() => setShowCurrent(!showCurrent)} className="profile-eye-btn">
                                    {showCurrent ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="profile-label">New Password</label>
                            <div className="profile-input-wrap">
                                <HiOutlineLockClosed className="profile-input-icon" />
                                <input value={newPwd} onChange={(e) => setNewPwd(e.target.value)} type={showNew ? "text" : "password"} className="profile-input" placeholder="New password" />
                                <button onClick={() => setShowNew(!showNew)} className="profile-eye-btn">
                                    {showNew ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                                </button>
                            </div>
                            {newPwd && (
                                <div className="space-y-1 mt-2">
                                    <div className="flex gap-1">
                                        {[1,2,3,4].map((i) => (
                                            <div key={i} className={`pwd-bar flex-1 h-1 rounded-full ${i <= strength ? strengthCls : ""}`} />
                                        ))}
                                    </div>
                                    <p className={`text-xs font-medium ${strengthCls}-text`}>{strengthLabel}</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="profile-label">Confirm New Password</label>
                            <div className="profile-input-wrap">
                                <HiOutlineLockClosed className="profile-input-icon" />
                                <input value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} type={showConfirm ? "text" : "password"} className="profile-input" placeholder="Confirm password" />
                                <button onClick={() => setShowConfirm(!showConfirm)} className="profile-eye-btn">
                                    {showConfirm ? <HiOutlineEyeOff className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {pwdError && <p className="text-xs text-red-400">{pwdError}</p>}

                        <button onClick={handlePasswordSave} className={`profile-save-btn w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium ${pwdSaved ? "profile-save-success" : ""}`}>
                            {pwdSaved ? <><HiOutlineCheck className="w-4 h-4" />Password Updated!</> : <><HiOutlineLockClosed className="w-4 h-4" />Update Password</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
