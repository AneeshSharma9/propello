import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "./Account";
import logo from "../public/propello_logo_temp.png";

function Footer() {
    const { user } = useContext(AccountContext);

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 mb-4 mb-lg-0">
                        <div className="d-flex align-items-center mb-3">
                            <img src={logo} alt="Propello" width={30} className="mr-2" style={{ borderRadius: '6px' }} />
                            <span className="footer-logo">Propello</span>
                        </div>
                        <p className="footer-blurb">
                            Propello connects small businesses with talented computer science
                            students for affordable, high-quality software development.
                        </p>
                    </div>
                    <div className="col-6 col-md-3 offset-lg-1 mb-4 mb-lg-0">
                        <h6 className="footer-heading">Explore</h6>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/explore">Browse Services</Link></li>
                            <li><Link to="/#about">About</Link></li>
                            <li><Link to="/#how">How it Works</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-3">
                        <h6 className="footer-heading">Account</h6>
                        <ul className="footer-links">
                            {user ? (
                                <>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/tasks">Tasks</Link></li>
                                    <li><Link to="/requestmgmt">Your Requests</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/login">Log In</Link></li>
                                    <li><Link to="/signup">Sign Up</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} Propello. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;