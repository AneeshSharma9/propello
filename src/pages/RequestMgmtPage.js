import React, { useEffect, useState, useContext } from 'react';
import { AccountContext } from '../components/Account'
import Navbar from '../components/Navbar'
import { fetchData, deleteData } from '../firebaseData';
import { useNavigate } from 'react-router-dom';

function RequestMgmtPage() {
    const [outgoingData, setOutgoingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getUsername } = useContext(AccountContext);
    const username = getUsername();

    const fetchRequests = async () => {
        setLoading(true);
        const data = await fetchData('requests');
        const filteredData = data.filter(item => item.username === username);
        setOutgoingData(filteredData);
        setLoading(false);
    };

    const handleDelete = async (documentId) => {
        try {
            await deleteData('requests', documentId);
            fetchRequests();
        } catch (error) {
            console.log('Error deleting record:', error);
        }
    };

    useEffect(() => {
        if (username) {
            fetchRequests();
        }
        // eslint-disable-next-line
    }, [username]);

    const navigate = useNavigate();

    const toChat = (targetUser) => {
        navigate('/chat', { state: { username: targetUser } });
    }

    const toCheckout = (item) => {
        navigate('/checkout', { state: { item } });
    }

    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
                <h1 className="customh1 mb-4">Your Requests</h1>
                {loading ? (
                    <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                        <div className="spinner-border text-secondary" role="status" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="mt-3" style={{ fontSize: '0.95rem' }}>Loading your requests...</p>
                    </div>
                ) : outgoingData.length === 0 ? (
                    <div className="text-center py-5 fade-in-up" style={{ color: 'var(--text-light)' }}>
                        <p>No outgoing requests yet.</p>
                        <a className="btn primary-button" href="/explore">Browse Services</a>
                    </div>
                ) : (
                    <div className="fade-in-up" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table className="table mb-0">
                                <thead className="table-bg">
                                    <tr>
                                        <th>Requested</th>
                                        <th>Service</th>
                                        <th>Directions</th>
                                        <th>End Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {outgoingData.map((item) => (
                                        <tr key={item.id}>
                                            <td style={{ fontWeight: 500 }}>{item.requested}</td>
                                            <td>{item.service}</td>
                                            <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.directions}</td>
                                            <td>{item.endDate}</td>
                                            <td>{item.amount != null ? `$${item.amount}` : "-"}</td>
                                            <td>
                                                <span style={{
                                                    padding: '0.25rem 0.6rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 600,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.3px',
                                                    backgroundColor: item.accepted === 'accepted' || item.accepted === 'completed' ? '#d1fae5' : item.accepted === 'rejected' ? '#fee2e2' : '#f3f4f6',
                                                    color: item.accepted === 'accepted' || item.accepted === 'completed' ? '#065f46' : item.accepted === 'rejected' ? '#991b1b' : '#374151'
                                                }}>
                                                    {item.accepted}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <button onClick={() => { toChat(item.requested) }} className="btn secondary-button mr-2" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                        Message
                                                    </button>
                                                    {(item.accepted === "accepted" || item.accepted === "completed") && (
                                                        <button onClick={() => toCheckout(item)} className="btn primary-button mr-2" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                            Pay
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDelete(item.id)} className="btn btn-outline-danger" style={{ fontSize: '0.82rem', padding: '0.35rem 0.6rem' }}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default RequestMgmtPage