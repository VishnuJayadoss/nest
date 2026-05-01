"use client";
import { useState } from "react";
import Mail from "./Components/Mail";
import OTPLogin from "./Components/OTPLogin";
import "../auth.css";

export default function ForgetPassword() {
    const [step, setStep] = useState<"mail" | "otp">("mail");
    const [fading, setFading] = useState(false);

    /** Called by Mail after envelope animation finishes */
    const handleSendOTP = () => {
        // 1) Fade the whole page out
        setFading(true);
        setTimeout(() => {
            // 2) Swap component while invisible
            setStep("otp");
            // 3) Fade back in (OTPLogin mounts with its own slide-in animation)
            setTimeout(() => setFading(false), 50);
        }, 420);
    };

    return (
        <div
            style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.4s ease",
                willChange: "opacity",
            }}
        >
            {step === "mail" ? (
                <Mail onSendOTP={handleSendOTP} />
            ) : (
                <OTPLogin />
            )}
        </div>
    );
}