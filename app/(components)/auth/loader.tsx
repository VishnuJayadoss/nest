import { useState, useEffect } from "react";
import "./auth.css";

const HexIcon = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[28, 22, 16, 10].map((r, i) => (
            <polygon
                key={i}
                points={Array.from({ length: 6 }, (_, k) => {
                    const angle = (Math.PI / 3) * k - Math.PI / 6;
                    return `${30 + r * Math.cos(angle)},${30 + r * Math.sin(angle)}`;
                }).join(" ")}
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
            />
        ))}
    </svg>
);

export default function WelcomeLoader({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("loading");

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setPhase("text");
                    setTimeout(() => onDone(), 1800);
                    return 100;
                }
                return p + 2;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loader-wrapper">

            {/* Animated rings */}
            <div className="loader-rings-container">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`loader-ring loader-ring-${i}`}
                    />
                ))}
                <div className="loader-spinner-wrap">
                    <div className="loader-spinner" />
                </div>
            </div>

            {/* Progress bar */}
            <div className="loader-progress-track">
                <div
                    className="loader-progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="loader-progress-label">
                {progress < 100 ? `LOADING... ${progress}%` : "COMPLETE"}
            </div>

            {phase === "text" && (
                <div className="loader-welcome-text">
                    <div className="loader-welcome-heading">
                        Welcome to Our Products
                    </div>
                    <div className="loader-welcome-sub">
                        Redirecting to your Product List...
                    </div>
                </div>
            )}
        </div>
    );
}