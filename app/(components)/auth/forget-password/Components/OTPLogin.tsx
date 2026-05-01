"use client";
import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { useRouter } from "next/navigation";

export default function OTPLogin() {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [timer, setTimer] = useState(30);
    const [mounted, setMounted] = useState(false);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    // Trigger entrance animation after mount
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 30);
        return () => clearTimeout(t);
    }, []);

    // Auto-focus first input after entrance
    useEffect(() => {
        if (mounted) {
            const t = setTimeout(() => inputsRef.current[0]?.focus(), 350);
            return () => clearTimeout(t);
        }
    }, [mounted]);

    useEffect(() => {
        if (timer <= 0) return;
        const t = setTimeout(() => setTimer((t) => t - 1), 1000);
        return () => clearTimeout(t);
    }, [timer]);

    const handleChange = (val: string, i: number) => {
        const digit = val.replaceAll(/\D/g, "").slice(-1);
        const next = [...otp];
        next[i] = digit;
        setOtp(next);
        if (digit && i < 5) inputsRef.current[i + 1]?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent, i: number) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) {
            inputsRef.current[i - 1]?.focus();
            const next = [...otp];
            next[i - 1] = "";
            setOtp(next);
        }
        if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus();
        if (e.key === "ArrowRight" && i < 5) inputsRef.current[i + 1]?.focus();
    };

    const handlePaste = (e: ClipboardEvent, i: number) => {
        e.preventDefault();
        const digits = e.clipboardData
            .getData("text")
            .replaceAll(/\D/g, "")
            .slice(0, 6);
        const next = [...otp];
        digits.split("").forEach((d, j) => {
            if (next[i + j] !== undefined) next[i + j] = d;
        });
        setOtp(next);
        inputsRef.current[Math.min(i + digits.length, 5)]?.focus();
    };

    const handleVerify = () => {
        if (otp.some((d) => !d)) {
            setStatus("error");
            return;
        }
        setStatus("loading");
        // call your API here with otp.join("")
        setTimeout(() => {
            setStatus("success");

            // 👉 Redirect after success
            setTimeout(() => {
                router.push("/auth/reset-password");
            }, 800); // small delay for UX
        }, 1200);
    };

    const handleResend = () => {
        setOtp(new Array(6).fill(""));
        setStatus("idle");
        setTimer(30);
        inputsRef.current[0]?.focus();
    };

    const getButtonText = () => {
        if (status === "loading") return "Verifying...";
        if (status === "success") return "Verified ✓";
        return "Verify OTP";
    };

    return (
        <div className="auth-scene">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
            <div className="blob blob-4" />
            <div className="blob blob-5" />

            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <div className="dot-grid" />

            {/* Card with entrance animation */}
            <div
                className={`auth-card auth-card-2 py-6 ${mounted ? "otp-card-enter" : ""}`}
                style={{ opacity: mounted ? undefined : 0 }}
            >
                <div className="form-inner">
                    <div className="text-center">
                        {/* Envelope success icon */}
                        <div style={{ marginBottom: 12 }}>
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ margin: "0 auto", display: "block" }}
                            >
                                <rect x="4" y="12" width="40" height="28" rx="3" fill="rgba(24,95,165,0.18)" stroke="#185FA5" strokeWidth="1.5" />
                                <path d="M4 15 L24 29 L44 15" stroke="#185FA5" strokeWidth="1.5" strokeLinejoin="round" />
                                {/* checkmark badge */}
                                <circle cx="36" cy="12" r="7" fill="#22c55e" />
                                <path d="M32.5 12 L35 14.5 L39.5 9.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h2 className="form-title">Forget Password</h2>
                        <p className="text-[#f4f4f4]" style={{ fontSize: 13, marginBottom: 20 }}>
                            Enter the 6-digit OTP sent to your email
                        </p>

                        {/* OTP inputs */}
                        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
                            {otp.map((val, i) => (
                                <input
                                    key={`otp-input-position-${i}`}
                                    ref={(el) => { inputsRef.current[i] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={val}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    onPaste={(e) => handlePaste(e, i)}
                                    className={val ? "otp-input-filled text-white" : ""}
                                    style={{
                                        width: 46,
                                        height: 54,
                                        textAlign: "center",
                                        fontSize: 22,
                                        fontWeight: 500,
                                        border: `1.5px solid ${status === "error" && !val
                                            ? "#ef4444"
                                            : val
                                                ? "#185FA5"
                                                : "#ccc"
                                            }`,
                                        borderRadius: 8,
                                        outline: "none",
                                        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                                        boxShadow: val ? "0 0 0 3px rgba(24,95,165,0.12)" : "none",
                                    }}
                                />
                            ))}
                        </div>

                        {status === "error" && (
                            <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 6 }}>
                                Please enter all 6 digits.
                            </p>
                        )}
                        {status === "success" && (
                            <p style={{ color: "#22c55e", fontSize: 13, marginBottom: 6 }}>
                                OTP verified successfully! ✓
                            </p>
                        )}

                        <button
                            className="btn-primary btn-primary-1"
                            onClick={handleVerify}
                            disabled={status === "loading" || status === "success"}
                            style={{ marginTop: 10, width: "100%" }}
                        >
                            {getButtonText()}
                        </button>

                        <p style={{ fontSize: 13, marginTop: 12, color: "#f4f4f4" }}>
                            Didn&apos;t receive it?{" "}
                            {timer > 0 ? (
                                <span>Resend in {timer}s</span>
                            ) : (
                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#f4f4f4",
                                        cursor: "pointer",
                                        padding: 0,
                                        font: "inherit",
                                        textDecoration: "underline",
                                    }}
                                    onClick={handleResend}
                                >
                                    Resend OTP
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}