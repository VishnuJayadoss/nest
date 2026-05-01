type Props = Readonly<{
    setIsRegister: (value: boolean) => void;
}>;

export default function RegisterForm({ setIsRegister }: Props) {
    return (
        <div className="form-inner">
            <h2 className="form-title">Create account</h2>

            <div className="field-group">
                <input type="text" id="name" placeholder=" " />
                <label htmlFor="name">Full Name</label>
                <div className="field-bar" />
            </div>

            <div className="field-group">
                <input type="email" id="email" placeholder=" " />
                <label htmlFor="email">Email</label>
                <div className="field-bar" />
            </div>

            <div className="field-group">
                <input type="password" id="reg-password" placeholder=" " />
                <label htmlFor="reg-password">Password</label>
                <div className="field-bar" />
            </div>

            <div className="field-group">
                <input type="password" id="confirm-password" placeholder=" " />
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="field-bar" />
            </div>

            <button className="btn-primary" style={{ marginTop: "4px" }}>
                Create Account
            </button>

            <button
                onClick={() => setIsRegister(false)}
                className="btn-link"
            >
                Already have an account? Sign in →
            </button>
        </div>
    );
}