"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../../auth.css";

export default function AuthPage() {
    const [isRegister, setIsRegister] = useState(false);

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
            <div className="auth-card">

                {/* Login Form */}
                <div className={`form-zone login-zone ${isRegister ? "slide-left" : ""}`}>
                    <LoginForm />
                </div>

                {/* Register Form */}
                <div className={`form-zone register-zone ${isRegister ? "slide-in" : ""}`}>
                    <RegisterForm setIsRegister={setIsRegister} />
                </div>

                {/* Sliding decorative panel */}
                <div className={`deco-panel ${isRegister ? "deco-left" : "deco-right"}`}>
                    <div className="deco-ring ring-1" />
                    <div className="deco-ring ring-2" />

                    <div className="deco-content">
                        {/* Geometric gem SVG */}
                        <svg className="deco-gem" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="28,2 54,18 54,38 28,54 2,38 2,18" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                            <polygon points="28,10 46,20 46,36 28,46 10,36 10,20" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
                            <polygon points="28,18 38,24 38,32 28,38 18,32 18,24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="rgba(255,255,255,0.05)" />
                            <line x1="28" y1="2" x2="28" y2="54" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                            <line x1="2" y1="18" x2="54" y2="38" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                            <line x1="2" y1="38" x2="54" y2="18" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                        </svg>

                        <h2 className="deco-title">
                            {isRegister ? "Welcome Back!" : "Hello, Friend!"}
                        </h2>
                        <p className="deco-sub">
                            {isRegister
                                ? "Already have an account? Sign in and continue your journey."
                                : "Enter your details and start your journey with us today."}
                        </p>

                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="deco-cta"
                        >
                            {isRegister ? "Sign In" : "Register"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}