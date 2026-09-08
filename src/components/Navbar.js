import React, { useContext } from "react";
import logo from "../public/campus_coder_logo_temp.png";
import Status from "../components/Status"
import { AccountContext } from "./Account";

function Navbar() {
    const { user, profile } = useContext(AccountContext);
    const displayName = profile?.name || user?.displayName || "";
    const firstname = displayName ? String(displayName).split(" ")[0] : "";
    const loginhrefLabel = user ? "profile" : "login";

    return (
        <nav className="navbar navbar-bg fixed-top navbar-expand-lg navbar-light">
            <div className="d-flex align-items-center pl-3">
                <a href="/" className="d-flex align-items-center text-decoration-none">
                    <img src={logo} alt="Propello" width={36} className="mr-2" style={{ borderRadius: '6px' }} />
                    <span className="logo">Propello</span>
                </a>
            </div>
            <button
                className="navbar-toggler border-0"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mt-2 mb-2 align-items-center">
                    <li className="nav-item nav-item-style">
                        <a className="navcolor nav-link px-3" href="/">
                            Home
                        </a>
                    </li>
                    <li className="nav-item nav-item-style">
                        <a className="navcolor nav-link px-3" href="explore">
                            Explore
                        </a>
                    </li>
                    {user && profile ? (
                        <li className="nav-item dropdown nav-item-style">
                            <a
                                className="navcolor nav-link dropdown-toggle px-3"
                                href="#/"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {firstname || "Account"}
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" style={{ borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
                                <a className="dropdown-item" href="/profile">Profile</a>
                                <a className="dropdown-item" href="/tasks">Tasks</a>
                                <a className="dropdown-item" href="/requestmgmt">Your Requests</a>
                                <div className="dropdown-divider"></div>
                                <Status />
                            </div>
                        </li>
                    ) : (
                        <li className="ml-2 mr-3">
                            <a className="login-button nav-link px-4" href={loginhrefLabel}>Log In</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;