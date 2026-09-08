import React, { useContext } from "react";
import { AccountContext } from "./Account";
import logo from "../public/campus_coder_logo_temp.png";

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
                            <li><a href="/">Home</a></li>
                            <li><a href="/explore">Browse Services</a></li>
                            <li><a href="/#about">About</a></li>
                            <li><a href="/#how">How it Works</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md-3">
                        <h6 className="footer-heading">Account</h6>
                        <ul className="footer-links">
                            {user ? (
                                <>
                                    <li><a href="/profile">Profile</a></li>
                                    <li><a href="/tasks">Tasks</a></li>
                                    <li><a href="/requestmgmt">Your Requests</a></li>
                                </>
                            ) : (
                                <>
                                    <li><a href="/login">Log In</a></li>
                                    <li><a href="/signup">Sign Up</a></li>
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