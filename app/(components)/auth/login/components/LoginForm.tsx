import Link from "next/link";
import { useState } from "react";
import WelcomeLoader from "../../loader";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const [view, setView] = useState("login"); // login | loading | dashboard
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [shake, setShake] = useState(false);
    const router = useRouter();


    const handleSignIn = () => {
        if (!username || !password) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
        setView("loading");
    };

    if (view === "loading")
        return (
            <WelcomeLoader
                onDone={() => router.push("/productlist")}
            />
        );

    return (
        <div className="form-inner">
            <h2 className="form-title">Welcome back</h2>

            <div className={`field-group ${shake && !username ? "error shake" : ""}`}>
                <input
                    type="text"
                    id="username"
                    placeholder=" "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                />
                <label htmlFor="username">Username</label>
                <div className="field-bar" />
            </div>

            <div className={`field-group ${shake && !password ? "error shake" : ""}`}>
                <input
                    type="password"
                    id="password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                />
                <label htmlFor="password">Password</label>
                <div className="field-bar" />
            </div>

            <button className="btn-primary" onClick={handleSignIn} style={{ marginTop: "10px" }}>
                Sign In
            </button>

            <div className="text-end">
                <Link href="/auth/forget-password" className="btn-link">Forget Password</Link>
            </div>

        </div>
    );
}