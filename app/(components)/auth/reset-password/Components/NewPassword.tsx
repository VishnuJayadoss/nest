"use client";

import { useRouter } from "next/navigation";

export default function NewPassword() {

    const router = useRouter();

    const handleresetpassword = () => {
        setTimeout(() => {
            router.push("/auth/login");
        }, 800);
    }

    return (
        <div className="auth-scene">

            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
            <div className="blob blob-4" />
            <div className="blob blob-5" />

            {/* Background orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <div className="dot-grid" />

            {/* Card */}
            <div className="auth-card auth-card-4 py-6">

                <div className="form-inner">
                    <h2 className="form-title text-center">Reset Password</h2>

                    <div className="field-group mx-8">
                        <input type="password" id="password" placeholder=" " />
                        <label htmlFor="password">New Password</label>
                        <div className="field-bar" />
                    </div>

                    <div className="field-group mx-8">
                        <input type="password" id="password" placeholder=" " />
                        <label htmlFor="password">Confirm Password</label>
                        <div className="field-bar" />
                    </div>
                    <div className="text-center">
                        <button onClick={handleresetpassword} className="btn-primary btn-primary-1" style={{ marginTop: "10px" }}>
                            Confirm
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}