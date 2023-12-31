import React, { useState } from 'react';
import { Account } from '../components/Account'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import { putData } from '../AwsFunctions';
import Pool from '../UserPool';

function RequestPage() {
    const user = Pool.getCurrentUser();
    const navigate = useNavigate();

    const location = useLocation();
    const [directions, setDirections] = useState("");
    const [endDate, setEndDate] = useState("");
    const [contact, setContact] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            username: user.getUsername(),
            requested: location.state.card.username,
            service: location.state.card.service,
            endDate: endDate,
            contact: contact,
            directions: directions,
            accepted: "false"
        }
        await putData('outgoing-requests', userData)
        navigate('../requestmgmt');
    };

    

    return (
        <Account>
            <Navbar />
            <div class="container">
                <h1 class="customh1">Requesting Service</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Request for</label>
                        <label class="form-control alert alert-secondary" id="nameInput" aria-describedby="nameHelp">{user.getUsername()}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Requesting service from</label>
                        <label class="form-control alert alert-secondary" id="nameInput" aria-describedby="nameHelp">{location.state.card.name}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Service</label>
                        <label class="form-control alert alert-secondary" id="serviceInput" aria-describedby="serviceHelp">{location.state.card.service}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Preferred Contact Info</label>
                        <input class="form-control" id="contactInput" aria-describedby="contactHelp" placeholder="Email, phone #, etc." value={contact} onChange={(event) => setContact(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">End date</label>
                        <input class="form-control" id="endDateInput" aria-describedby="endDateHelp" placeholder="mm/dd/yyyy" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="directions">Directions</label>
                        <textarea class="form-control" rows="5" id="directionsInput" aria-describedby="directionHelp" placeholder="Enter directions" value={directions} onChange={(event) => setDirections(event.target.value)} />
                    </div>
                    <button class="primary-button btn" type="submit" >Request</button>
                    <a class="secondary-button btn ml-3" type="cancel" href="./explore">Cancel</a>
                </form>
            </div>
        </Account>
    )
}

export default RequestPage