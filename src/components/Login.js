import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "./Account";
import logo from '../public/campus_coder_logo_temp.png'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { signIn, signInWithGoogle } = useContext(AccountContext);
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        signIn(email, password)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                console.log("Failed to login", err);
                setError(err);
                setLoading(false);
            });
    };

    const onGoogle = () => {
        setLoading(true);
        signInWithGoogle()
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                console.log("Failed to login with Google", err);
                setError(err);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="offset"></div>
            <section className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-5 col-md-6 col-sm-10">
                            <div className="card auth-card">
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <img src={logo} alt="Propello" width={44} style={{ borderRadius: '8px', marginBottom: '12px' }} />
                                        <h2 className="customh1" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Propello</h2>
                                        <p className="login-spacing" style={{ fontSize: '0.9rem' }}>Sign into your account</p>
                                    </div>

                                    <form onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <label style={{ fontSize: '0.85rem' }}>Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="form-control"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label style={{ fontSize: '0.85rem' }}>Password</label>
                                            <input
                                                required
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                            />
                                        </div>

                                        {error && (
                                            <div className="alert alert-danger py-2" role="alert" style={{ fontSize: '0.83rem', borderRadius: 'var(--radius)' }}>
                                                {error.message}
                                            </div>
                                        )}

                                        <button type="submit" className="btn primary-button login-button-shadow mt-1" style={{ width: '100%', padding: '0.6rem' }} disabled={loading}>
                                            {loading ? 'Signing in...' : 'Login'}
                                        </button>
                                    </form>

                                    <div className="auth-divider">or</div>

                                    <button type="button" className="google-button" onClick={onGoogle} disabled={loading}>
                                        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                        </svg>
                                        Continue with Google
                                    </button>

                                    <div className="text-center mt-4">
                                        <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                                            Don't have an account?{" "}
                                            <Link to="signup" className="small-link">Register here</Link>
                                        </p>
                                        <Link to="/login" style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-5 d-none d-md-block">
                            <div className="auth-image">
                                <img
                                    src="https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                                    alt="Login"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;