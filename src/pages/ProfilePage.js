import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../components/Account'
import Navbar from '../components/Navbar'
import { putData, fetchData, updateData, deleteData } from '../firebaseData';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';

const options = [
    { value: "Web Development", label: "Web Development" },
    { value: "IOS Development", label: "iOS Development" },
    { value: "Android Development", label: "Android Development" },
    { value: "Scripting", label: "Scripting" },
    { value: "Testing", label: "Testing" },
];

function ProfilePage() {
    const { user, profile, getUsername, refreshProfile } = useContext(AccountContext);
    const navigate = useNavigate();
    const fullName = (profile?.name || user?.displayName || "there").split(" ")[0];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [availability, setAvailability] = useState("");
    const [selected, setSelected] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formMessage, setFormMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [displayName, setDisplayName] = useState(profile?.name || "");
    const [phone, setPhone] = useState(profile?.phone || "");
    const [bio, setBio] = useState(profile?.bio || "");
    const [settingsMessage, setSettingsMessage] = useState(null);
    const [savingSettings, setSavingSettings] = useState(false);

    const fetchListings = async () => {
        if (!user?.uid) return;
        const data = await fetchData('services');
        setListings(data.filter(item => item.userId === user.uid));
        setLoading(false);
    };

    useEffect(() => {
        fetchListings();
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        setDisplayName(profile?.name || "");
        setPhone(profile?.phone || "");
        setBio(profile?.bio || "");
    }, [profile]);

    const resetForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        setDeliveryTime("");
        setAvailability("");
        setSelected(null);
        setEditingId(null);
        setFormMessage(null);
    };

    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    };

    const startEdit = (listing) => {
        setEditingId(listing.id);
        setName(listing.name || "");
        setDescription(listing.description || "");
        setPrice(listing.price != null ? String(listing.price) : "");
        setDeliveryTime(listing.deliveryTime != null ? String(listing.deliveryTime) : "");
        setAvailability(listing.availability || "");
        setSelected(options.find(o => o.value === listing.service) || null);
        setFormMessage(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (listingId) => {
        if (!window.confirm("Delete this listing?")) return;
        await deleteData('services', listingId);
        fetchListings();
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!selected) return;
        setSubmitting(true);
        const listingData = {
            userId: user?.uid,
            username: getUsername(),
            description: description,
            name: name,
            service: selected.value,
            price: price !== "" ? Number(price) : null,
            deliveryTime: deliveryTime !== "" ? Number(deliveryTime) : null,
            availability: availability,
        };
        try {
            if (editingId) {
                await updateData('services', editingId, listingData);
                setFormMessage({ type: 'success', text: 'Listing updated successfully.' });
                resetForm();
                fetchListings();
            } else {
                await putData('services', listingData);
                navigate('/explore');
            }
        } catch (err) {
            console.error(err);
            setFormMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        }
        setSubmitting(false);
    };

    const onSaveSettings = async (event) => {
        event.preventDefault();
        setSavingSettings(true);
        setSettingsMessage(null);
        try {
            await updateData('users', user.uid, { name: displayName, phone, bio });
            await refreshProfile();
            setSettingsMessage({ type: 'success', text: 'Profile settings saved.' });
        } catch (err) {
            console.error(err);
            setSettingsMessage({ type: 'error', text: 'Could not save your settings. Please try again.' });
        }
        setSavingSettings(false);
    };

    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem', maxWidth: '640px' }}>
                <h1 className="customh1 mb-2">Welcome {fullName}!</h1>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    Manage your profile, service listings, and preferences.
                </p>

                {/* Offer / Edit a Service */}
                <div style={{ background: 'var(--bg-gray)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 className="customh2 mb-1" style={{ fontSize: '1.25rem' }}>
                        {editingId ? "Edit Listing" : "Offer a Service"}
                    </h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                        {editingId
                            ? "Update the details of your existing listing."
                            : "Set up your service listing to start receiving requests."}
                    </p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <div className="form-control alert alert-secondary" style={{ marginBottom: 0, cursor: 'default' }}>
                                {getUsername()}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Display Name</label>
                            <input className="form-control" placeholder="Your display name" value={name} onChange={(event) => setName(event.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Service</label>
                            <Select options={options} onChange={handleChange} autoFocus={true} placeholder="Select a service..." value={selected} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" maxLength="200" placeholder="Describe what you offer..." value={description} onChange={(event) => setDescription(event.target.value)} style={{ resize: 'vertical' }} />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Price (USD)</label>
                                    <input className="form-control" type="number" min="0" step="0.01" placeholder="e.g. 50" value={price} onChange={(event) => setPrice(event.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Delivery Time (days)</label>
                                    <input className="form-control" type="number" min="1" step="1" placeholder="e.g. 3" value={deliveryTime} onChange={(event) => setDeliveryTime(event.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Availability</label>
                            <select className="form-control" value={availability} onChange={(event) => setAvailability(event.target.value)}>
                                <option value="">Select availability...</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Weekends only">Weekends only</option>
                                <option value="Flexible">Flexible</option>
                            </select>
                        </div>
                        {formMessage && (
                            <div className={`alert ${formMessage.type === 'error' ? 'alert-danger' : 'alert-success'} py-2`} role="alert" style={{ fontSize: '0.85rem', borderRadius: 'var(--radius)' }}>
                                {formMessage.text}
                            </div>
                        )}
                        <div className="d-flex align-items-center">
                            <button className="btn primary-button mt-1" type="submit" disabled={!selected || submitting}>
                                {submitting ? "Saving..." : (editingId ? "Update Listing" : "Save Listing")}
                            </button>
                            {editingId && (
                                <button type="button" className="btn secondary-button mt-1 ml-3" onClick={resetForm}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Your Listings */}
                <div style={{ background: 'var(--bg-gray)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                    <h2 className="customh2 mb-1" style={{ fontSize: '1.25rem' }}>Your Listings</h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                        View, edit, or remove the services you offer.
                    </p>
                    {loading ? (
                        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Loading your listings...</p>
                    ) : listings.length === 0 ? (
                        <div className="text-center py-3" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                            <p className="mb-1">You don't have any listings yet.</p>
                            <p>Use the form above to offer your first service.</p>
                        </div>
                    ) : (
                        <div>
                            {listings.map((listing) => (
                                <div key={listing.id} className="d-flex align-items-center justify-content-between mb-2 p-3 fade-in-up" style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                                    <div style={{ minWidth: 0 }}>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <strong style={{ fontSize: '0.95rem', marginRight: '0.5rem' }}>{listing.name}</strong>
                                            <span className="badge" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)', marginRight: '0.5rem' }}>{listing.service}</span>
                                            {listing.price != null && (
                                                <span className="badge" style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>${listing.price}</span>
                                            )}
                                        </div>
                                        {listing.description && (
                                            <p className="mb-1" style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>{listing.description}</p>
                                        )}
                                        <p className="mb-0" style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                                            {listing.deliveryTime != null ? `Delivery: ${listing.deliveryTime} day${listing.deliveryTime === 1 ? "" : "s"}` : "Delivery: not specified"}
                                            {listing.availability ? `  ·  Availability: ${listing.availability}` : ""}
                                        </p>
                                    </div>
                                    <div className="ml-3 d-flex flex-column">
                                        <button onClick={() => startEdit(listing)} className="btn secondary-button mb-2" style={{ fontSize: '0.8rem', padding: '0.3rem 0.9rem' }}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(listing.id)} className="btn btn-outline-danger" style={{ fontSize: '0.8rem', padding: '0.3rem 0.9rem' }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Settings */}
                <div style={{ background: 'var(--bg-gray)', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border)' }}>
                    <h2 className="customh2 mb-1" style={{ fontSize: '1.25rem' }}>Profile Settings</h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                        Update your personal details.
                    </p>
                    <form onSubmit={onSaveSettings}>
                        <div className="form-group">
                            <label>Username</label>
                            <div className="form-control alert alert-secondary" style={{ marginBottom: 0, cursor: 'default' }}>
                                {getUsername()}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Display Name</label>
                            <input className="form-control" placeholder="Your full name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <div className="form-control alert alert-secondary" style={{ marginBottom: 0, cursor: 'default' }}>
                                {profile?.email || user?.email || "-"}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input className="form-control" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(event) => setPhone(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>About You</label>
                            <textarea className="form-control" rows="3" maxLength="300" placeholder="Tell others about your skills and experience..." value={bio} onChange={(event) => setBio(event.target.value)} style={{ resize: 'vertical' }} />
                        </div>
                        {settingsMessage && (
                            <div className={`alert ${settingsMessage.type === 'error' ? 'alert-danger' : 'alert-success'} py-2`} role="alert" style={{ fontSize: '0.85rem', borderRadius: 'var(--radius)' }}>
                                {settingsMessage.text}
                            </div>
                        )}
                        <button className="btn primary-button mt-1" type="submit" disabled={savingSettings}>
                            {savingSettings ? "Saving..." : "Save Settings"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfilePage