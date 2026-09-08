import React, { useContext, useState } from 'react';
import { AccountContext } from '../components/Account'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import { putData } from '../firebaseData';

function RequestPage() {
    const { user, getUsername } = useContext(AccountContext);
    const navigate = useNavigate();

    const location = useLocation();
    const [directions, setDirections] = useState("");
    const [endDate, setEndDate] = useState("");
    const [contact, setContact] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            username: getUsername(),
            requesterId: user?.uid,
            requested: location.state.card.username,
            providerId: location.state.card.userId,
            service: location.state.card.service,
            endDate: endDate,
            contact: contact,
            directions: directions,
            accepted: "false"
        }
        await putData('requests', userData)
        navigate('../requestmgmt');
    };

    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem', maxWidth: '640px' }}>
                <h1 className="customh1 mb-4">Request a Service</h1>
                <div style={{ background: 'var(--bg-gray)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border)' }}>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Your Username</label>
                            <div className="form-control alert alert-secondary" style={{ marginBottom: 0, cursor: 'default' }}>
                                {getUsername()}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Requesting From</label>
                            <div className="form-control alert alert-secondary" style={{ marginBottom: 0, cursor: 'default' }}>
                                {location.state.card.name}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Service</label>
                            <div className="form-control alert alert-secondary" style={{ marginBottom: 0, cursor: 'default' }}>
                                {location.state.card.service}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Preferred Contact Info</label>
                            <input className="form-control" placeholder="Email, phone, etc." value={contact} onChange={(event) => setContact(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input className="form-control" placeholder="mm/dd/yyyy" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Project Details</label>
                            <textarea className="form-control" rows="5" placeholder="Describe what you need..." value={directions} onChange={(event) => setDirections(event.target.value)} style={{ resize: 'vertical' }} />
                        </div>
                        <div className="d-flex mt-3">
                            <button className="btn primary-button" type="submit">Submit Request</button>
                            <a className="btn secondary-button ml-3" href="./explore">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RequestPage