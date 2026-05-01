"use client";
import { useState } from "react";

interface MailProps {
    onSendOTP: () => void;
}

type AnimState = "idle" | "sending" | "flying" | "done";

export default function Mail({ onSendOTP }: MailProps) {
    const [animState, setAnimState] = useState<AnimState>("idle");

    const handleSend = () => {
        if (animState !== "idle") return;

        // Step 1 – button goes into "Sending…" state
        setAnimState("sending");

        // Step 2 – envelope overlay appears and starts flying
        setTimeout(() => setAnimState("flying"), 500);

        // Step 3 – animation done, notify parent
        setTimeout(() => {
            setAnimState("done");
            onSendOTP();
        }, 1800);
    };

    return (
        <>
            {(animState === "flying" || animState === "sending") && (
                <div className="envelope-overlay">
                    <div className="envelope-wrapper">
                        {animState === "flying" && (
                            <>
                                <svg
                                    className="envelope-icon"
                                    width="96"
                                    height="96"
                                    viewBox="0 0 96 96"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Envelope body */}
                                    <rect x="8" y="24" width="80" height="56" rx="6" fill="#185FA5" />
                                    {/* Envelope flap (triangle) */}
                                    <path d="M8 30 L48 58 L88 30" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
                                    {/* Fold lines */}
                                    <path d="M8 80 L36 52" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                                    <path d="M88 80 L60 52" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                                    {/* Shine */}
                                    <rect x="14" y="30" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
                                </svg>
                                <div className="envelope-trail" />
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* ── Mail card ── */}
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

                <div className="auth-card auth-card-1 py-6">
                    <div className="form-inner">
                        <h2 className="form-title text-center">Forget Password</h2>

                        <div className="field-group mx-20">
                            <input
                                type="text"
                                id="username"
                                placeholder=" "
                                disabled={animState !== "idle"}
                            />
                            <label htmlFor="username">Username / Email</label>
                            <div className="field-bar" />
                        </div>

                        <div className="text-center px-6">
                            <button
                                className="btn-primary btn-primary-1"
                                style={{ marginTop: "10px", opacity: animState !== "idle" ? 0.8 : 1 }}
                                onClick={handleSend}
                                disabled={animState !== "idle"}
                            >
                                {animState === "idle" ? (
                                    "Send OTP"
                                ) : (
                                    <>
                                        <span className="btn-spinner" />
                                        Sending…
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
