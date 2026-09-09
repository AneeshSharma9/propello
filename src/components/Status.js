import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AccountContext } from "./Account"

const Status = () => {
    const { logOut } = useContext(AccountContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        navigate("/login", { replace: true });
    };

    return (
        <div className="status-logout">
            <Link className="dropdown-item" to="/login" onClick={handleLogout}>Logout</Link>
        </div>
    )
}

export default Status;