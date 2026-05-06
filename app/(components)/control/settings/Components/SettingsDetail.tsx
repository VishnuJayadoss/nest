"use client";

import { useState } from "react";
import "@/app/layout/header.css";
import {
    HiOutlineCog,
    HiOutlineBell,
    HiOutlineShieldCheck,
    HiOutlineLink,
    HiOutlineColorSwatch,
    HiOutlineGlobe,
    HiOutlineMail,
    HiOutlineKey,
    HiOutlineDatabase,
    HiOutlineCloud,
    HiOutlineCheck,
    HiOutlineX,
    HiOutlineSun,
    HiOutlineMoon,
    HiOutlineDesktopComputer,
} from "react-icons/hi";

type Theme = "light" | "dark" | "system";
type Language = "en" | "es" | "fr" | "de" | "ja";

const languages: Record<Language, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    ja: "日本語",
};

export default function SettingsDetail() {
    // General
    const [productName, setProductName] = useState("NexaPanel");
    const [companyName, setCompanyName] = useState("Nexa Corporation");
    const [timezone, setTimezone] = useState("America/New_York");
    const [language, setLanguage] = useState<Language>("en");
    const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

    // Notifications
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [weeklyReport, setWeeklyReport] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);

    // Security
    const [twoFactor, setTwoFactor] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState("30");
    const [ipWhitelist, setIpWhitelist] = useState(false);
    const [auditLog, setAuditLog] = useState(true);

    // Integrations
    const [slackEnabled, setSlackEnabled] = useState(true);
    const [githubEnabled, setGithubEnabled] = useState(false);
    const [stripeEnabled, setStripeEnabled] = useState(true);
    const [awsEnabled, setAwsEnabled] = useState(false);

    // Appearance
    const [theme, setTheme] = useState<Theme>("dark");
    const [compactMode, setCompactMode] = useState(false);
    const [animations, setAnimations] = useState(true);

    const [saved, setSaved] = useState(false);

    function handleSave() {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    }

    return (
        <div className="dash-page p-6 space-y-6 max-w-5xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Settings</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Configure your product settings and preferences
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    className={`profile-save-btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${saved ? "profile-save-success" : ""}`}
                >
                    {saved ? <><HiOutlineCheck className="w-4 h-4" />Saved!</> : <><HiOutlineCog className="w-4 h-4" />Save All</>}
                </button>
            </div>

            {/* ── General Settings ── */}
            <div className="panel-card rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                    <HiOutlineCog className="w-5 h-5" style={{ color: "var(--violet)" }} />
                    <h2 className="text-base font-semibold text-white">General Settings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="profile-label">Product Name</label>
                        <div className="profile-input-wrap">
                            <HiOutlineGlobe className="profile-input-icon" />
                            <input value={productName} onChange={(e) => setProductName(e.target.value)} className="profile-input" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="profile-label">Company Name</label>
                        <div className="profile-input-wrap">
                            <HiOutlineGlobe className="profile-input-icon" />
                            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="profile-input" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="profile-label">Timezone</label>
                        <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="settings-select">
                            <option value="America/New_York">Eastern Time (ET)</option>
                            <option value="America/Chicago">Central Time (CT)</option>
                            <option value="America/Denver">Mountain Time (MT)</option>
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            <option value="Europe/London">London (GMT)</option>
                            <option value="Europe/Paris">Paris (CET)</option>
                            <option value="Asia/Tokyo">Tokyo (JST)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="profile-label">Language</label>
                        <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="settings-select">
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="profile-label">Date Format</label>
                        <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} className="settings-select">
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Notifications ── */}
            <div className="panel-card rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                    <HiOutlineBell className="w-5 h-5" style={{ color: "var(--violet)" }} />
                    <h2 className="text-base font-semibold text-white">Notification Preferences</h2>
                </div>

                <div className="space-y-3">
                    <ToggleRow
                        label="Email Notifications"
                        desc="Receive notifications via email"
                        checked={emailNotifs}
                        onChange={setEmailNotifs}
                        icon={<HiOutlineMail className="w-4 h-4" />}
                    />
                    <ToggleRow
                        label="Push Notifications"
                        desc="Browser and mobile push notifications"
                        checked={pushNotifs}
                        onChange={setPushNotifs}
                        icon={<HiOutlineBell className="w-4 h-4" />}
                    />
                    <ToggleRow
                        label="SMS Notifications"
                        desc="Critical alerts via SMS"
                        checked={smsNotifs}
                        onChange={setSmsNotifs}
                        icon={<HiOutlineMail className="w-4 h-4" />}
                    />
                    <div className="pt-2" style={{ borderTop: "1px solid var(--panel-border)" }} />
                    <ToggleRow
                        label="Weekly Reports"
                        desc="Receive weekly summary reports"
                        checked={weeklyReport}
                        onChange={setWeeklyReport}
                        icon={<HiOutlineMail className="w-4 h-4" />}
                    />
                    <ToggleRow
                        label="Security Alerts"
                        desc="Immediate alerts for security events"
                        checked={securityAlerts}
                        onChange={setSecurityAlerts}
                        icon={<HiOutlineShieldCheck className="w-4 h-4" />}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ── Security ── */}
                <div className="panel-card rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 mb-2">
                        <HiOutlineShieldCheck className="w-5 h-5" style={{ color: "var(--violet)" }} />
                        <h2 className="text-base font-semibold text-white">Security</h2>
                    </div>

                    <div className="space-y-3">
                        <ToggleRow
                            label="Two-Factor Authentication"
                            desc="Require 2FA for all users"
                            checked={twoFactor}
                            onChange={setTwoFactor}
                            icon={<HiOutlineKey className="w-4 h-4" />}
                        />
                        <ToggleRow
                            label="IP Whitelist"
                            desc="Restrict access by IP address"
                            checked={ipWhitelist}
                            onChange={setIpWhitelist}
                            icon={<HiOutlineShieldCheck className="w-4 h-4" />}
                        />
                        <ToggleRow
                            label="Audit Logging"
                            desc="Track all user activities"
                            checked={auditLog}
                            onChange={setAuditLog}
                            icon={<HiOutlineDatabase className="w-4 h-4" />}
                        />
                    </div>

                    <div className="space-y-1.5 pt-2" style={{ borderTop: "1px solid var(--panel-border)" }}>
                        <label className="profile-label">Session Timeout (minutes)</label>
                        <select value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} className="settings-select">
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="0">Never</option>
                        </select>
                    </div>
                </div>

                {/* ── Integrations ── */}
                <div className="panel-card rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 mb-2">
                        <HiOutlineLink className="w-5 h-5" style={{ color: "var(--violet)" }} />
                        <h2 className="text-base font-semibold text-white">Integrations</h2>
                    </div>

                    <div className="space-y-3">
                        <IntegrationRow
                            name="Slack"
                            desc="Team communication"
                            enabled={slackEnabled}
                            onChange={setSlackEnabled}
                            color="violet"
                        />
                        <IntegrationRow
                            name="GitHub"
                            desc="Code repository"
                            enabled={githubEnabled}
                            onChange={setGithubEnabled}
                            color="blue"
                        />
                        <IntegrationRow
                            name="Stripe"
                            desc="Payment processing"
                            enabled={stripeEnabled}
                            onChange={setStripeEnabled}
                            color="green"
                        />
                        <IntegrationRow
                            name="AWS"
                            desc="Cloud infrastructure"
                            enabled={awsEnabled}
                            onChange={setAwsEnabled}
                            color="orange"
                        />
                    </div>
                </div>
            </div>

            {/* ── Appearance ── */}
            <div className="panel-card rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                    <HiOutlineColorSwatch className="w-5 h-5" style={{ color: "var(--violet)" }} />
                    <h2 className="text-base font-semibold text-white">Appearance</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="profile-label mb-3 block">Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                            <ThemeOption
                                icon={<HiOutlineSun className="w-5 h-5" />}
                                label="Light"
                                active={theme === "light"}
                                onClick={() => setTheme("light")}
                            />
                            <ThemeOption
                                icon={<HiOutlineMoon className="w-5 h-5" />}
                                label="Dark"
                                active={theme === "dark"}
                                onClick={() => setTheme("dark")}
                            />
                            <ThemeOption
                                icon={<HiOutlineDesktopComputer className="w-5 h-5" />}
                                label="System"
                                active={theme === "system"}
                                onClick={() => setTheme("system")}
                            />
                        </div>
                    </div>

                    <div className="pt-2" style={{ borderTop: "1px solid var(--panel-border)" }} />

                    <ToggleRow
                        label="Compact Mode"
                        desc="Reduce spacing for more content"
                        checked={compactMode}
                        onChange={setCompactMode}
                        icon={<HiOutlineDesktopComputer className="w-4 h-4" />}
                    />
                    <ToggleRow
                        label="Animations"
                        desc="Enable smooth transitions and effects"
                        checked={animations}
                        onChange={setAnimations}
                        icon={<HiOutlineColorSwatch className="w-4 h-4" />}
                    />
                </div>
            </div>

            {/* ── Danger Zone ── */}
            <div className="settings-danger-card rounded-2xl p-6 space-y-4">
                <div>
                    <h2 className="text-base font-semibold text-white mb-1">Danger Zone</h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Irreversible actions that affect your entire product</p>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <div>
                        <p className="text-sm font-semibold text-white">Reset All Settings</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Restore default configuration</p>
                    </div>
                    <button className="settings-danger-btn px-4 py-2 rounded-lg text-xs font-medium">
                        Reset
                    </button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <div>
                        <p className="text-sm font-semibold text-white">Delete All Data</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Permanently delete all product data</p>
                    </div>
                    <button className="settings-danger-btn px-4 py-2 rounded-lg text-xs font-medium">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

function ToggleRow({ label, desc, checked, onChange, icon }: {
    label: string;
    desc: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    icon: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl settings-toggle-row">
            <div className="flex items-center gap-3">
                <div className="settings-icon-box" style={{ color: "var(--violet)" }}>{icon}</div>
                <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</p>
                </div>
            </div>
            <button onClick={() => onChange(!checked)} className={`settings-toggle ${checked ? "settings-toggle-on" : ""}`}>
                <span className="settings-toggle-thumb" />
            </button>
        </div>
    );
}

function IntegrationRow({ name, desc, enabled, onChange, color }: {
    name: string;
    desc: string;
    enabled: boolean;
    onChange: (v: boolean) => void;
    color: "violet" | "blue" | "green" | "orange";
}) {
    return (
        <div className={`integration-row integration-row-${color} flex items-center justify-between p-4 rounded-xl`}>
            <div className="flex items-center gap-3">
                <div className={`integration-icon stat-icon-${color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                    <HiOutlineCloud className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {enabled && <span className="integration-badge">Connected</span>}
                <button onClick={() => onChange(!enabled)} className={`integration-btn integration-btn-${color} px-3 py-1.5 rounded-lg text-xs font-medium`}>
                    {enabled ? "Disconnect" : "Connect"}
                </button>
            </div>
        </div>
    );
}

function ThemeOption({ icon, label, active, onClick }: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button onClick={onClick} className={`theme-option flex flex-col items-center gap-2 p-4 rounded-xl ${active ? "theme-option-active" : ""}`}>
            <div className="theme-icon">{icon}</div>
            <span className="text-xs font-medium text-white">{label}</span>
            {active && <HiOutlineCheck className="w-3.5 h-3.5 absolute top-2 right-2" style={{ color: "var(--violet)" }} />}
        </button>
    );
}
