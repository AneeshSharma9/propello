import React, { useContext, useState } from 'react';
import { AccountContext } from '../components/Account'
import Navbar from '../components/Navbar'
import { putData } from '../firebaseData';
import Select from "react-select";

function ProfilePage() {
    const { user, profile, getUsername } = useContext(AccountContext);
    const fullName = (profile?.name || user?.displayName || "there").split(" ")[0];

    const [name, setName] = useState(profile?.name || "");
    const [description, setDesc] = useState(null);

    const options = [
        { value: "Web Development", label: "Web Development" },
        { value: "IOS Development", label: "iOS Development" },
        { value: "Android Development", label: "Android Development" },
        { value: "Scripting", label: "Scripting" },
        { value: "Testing", label: "Testing" },
    ];

    const [selected, setSelected] = useState(null);
    const [saved, setSaved] = useState(false);

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!selected) return;
        const userData = {
            userId: user?.uid,
            username: getUsername(),
            description: description,
            name: name,
            service: selected.value
        }
        await putData('services', userData)
        setSaved(true);
    };

    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem', maxWidth: '640px' }}>
                <h1 className="customh1 mb-2">Welcome {fullName}!</h1>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    Set up your service listing to start receiving requests.
                </p>
                <div style={{ background: 'var(--bg-gray)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border)' }}>
                    <h2 className="customh2 mb-4" style={{ fontSize: '1.25rem' }}>Offer a Service</h2>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <div className="form-control alert alert-secondary" style={{ marginBottom: 0, cursor: 'default' }}>
                                {getUsername()}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Display Name</label>
                            <input className="form-control" placeholder="Your display name" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Service</label>
                            <Select options={options} onChange={handleChange} autoFocus={true} placeholder="Select a service..." />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input className="form-control" maxLength="41" placeholder="Brief description (max 41 chars)" value={description} onChange={(event) => setDesc(event.target.value)} />
                        </div>
                        <button className="btn primary-button mt-2" type="submit" disabled={!selected}>Save Listing</button>
                        {saved && (
                            <span className="ml-3" style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>Saved!</span>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfilePage