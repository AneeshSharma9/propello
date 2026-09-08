import React, { useContext, useState } from "react";
import { AccountContext } from "./Account"

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phonenum, setPhoneNum] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { signUp } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        signUp(email, password, { username, firstName: firstname, lastName: lastname, phone: phonenum })
            .then(() => {
                window.location.href = "/";
            })
            .catch((err) => {
                console.error(err);
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
                                        <h2 className="customh1" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Create an account</h2>
                                        <p className="login-spacing" style={{ fontSize: '0.9rem' }}>Join Propello today</p>
                                    </div>

                                    <form onSubmit={onSubmit}>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label style={{ fontSize: '0.85rem' }}>First name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="First name"
                                                        value={firstname}
                                                        onChange={(event) => setFirstName(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label style={{ fontSize: '0.85rem' }}>Last name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Last name"
                                                        value={lastname}
                                                        onChange={(event) => setLastName(event.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

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
                                            <label style={{ fontSize: '0.85rem' }}>Phone number</label>
                                            <input
                                                required
                                                type="tel"
                                                className="form-control"
                                                placeholder="+1 (555) 000-0000"
                                                value={phonenum}
                                                onChange={(event) => setPhoneNum(event.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label style={{ fontSize: '0.85rem' }}>Username</label>
                                            <input
                                                required
                                                type="text"
                                                className="form-control"
                                                placeholder="Choose a username"
                                                value={username}
                                                onChange={(event) => setUsername(event.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label style={{ fontSize: '0.85rem' }}>Password</label>
                                            <input
                                                required
                                                type="password"
                                                className="form-control"
                                                placeholder="Create a password"
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
                                            {loading ? 'Creating account...' : 'Sign up'}
                                        </button>
                                    </form>

                                    <div className="text-center mt-4">
                                        <p style={{ fontSize: '0.88rem', color: 'var(--text-light)' }}>
                                            Already have an account?{" "}
                                            <a href="login" className="small-link">Login here</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-5 d-none d-md-block">
                            <div className="auth-image">
                                <img
                                    src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                                    alt="Sign up"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Signup;