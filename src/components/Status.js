import React, { useContext } from "react"
import { AccountContext } from "./Account"

const Status = () => {
    const { logOut } = useContext(AccountContext);

    const handleLogout = () => {
        logOut();
        window.location.href = "login";
    };

    return (
        <div className="status-logout">
            <a href="/login" className="dropdown-item" onClick={handleLogout}>Logout</a>
        </div>
    )
}

export default Status;