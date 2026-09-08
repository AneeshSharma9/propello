import React, { useEffect, useState, useContext } from 'react';
import { AccountContext } from '../components/Account'
import Navbar from '../components/Navbar'
import { fetchData, updateData } from '../firebaseData';
import { useNavigate } from 'react-router-dom';

function TasksPage() {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState("");
    const [linkTarget, setLinkTarget] = useState(null);
    const { getUsername } = useContext(AccountContext);
    const username = getUsername();

    const fetchTasks = async () => {
        setLoading(true);
        const data = await fetchData('requests');
        const filteredData = data.filter(item => item.requested === username);
        setTableData(filteredData);
        setLoading(false);
    };

    const handleAccept = async (documentId) => {
        try {
            await updateData('requests', documentId, { accepted: "accepted" });
            fetchTasks();
        } catch (error) {
            console.log('Error updating record:', error);
        }
    };

    const handleReject = async (documentId) => {
        try {
            await updateData('requests', documentId, { accepted: "rejected" });
            fetchTasks();
        } catch (error) {
            console.log('Error updating record:', error);
        }
    };

    useEffect(() => {
        if (username) {
            fetchTasks();
        }
        // eslint-disable-next-line
    }, [username]);

    const navigate = useNavigate();

    const toChat = (targetUser) => {
        navigate('/chat', { state: { username: targetUser } });
    }

    const openLinkModal = (item) => {
        setLinkTarget(item.id);
        setLink(item.githubLink || "");
    }

    const saveLink = async () => {
        if (!linkTarget) return;
        if (!link.includes("https://github.com")) {
            alert("Please enter a valid GitHub repository URL (must include https://github.com).");
            return;
        }
        try {
            await updateData('requests', linkTarget, { githubLink: link, accepted: "completed" });
            setLinkTarget(null);
            setLink("");
            fetchTasks();
            window.$('#githubModal').modal('hide');
        } catch (error) {
            console.log('Error saving link:', error);
            alert("Could not save your link. Please try again.");
        }
    }

    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
                <h1 className="customh1 mb-4">Your Tasks</h1>
                {loading ? (
                    <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                        <div className="spinner-border text-secondary" role="status" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="mt-3" style={{ fontSize: '0.95rem' }}>Loading your tasks...</p>
                    </div>
                ) : tableData.length === 0 ? (
                    <div className="text-center py-5 fade-in-up" style={{ color: 'var(--text-light)' }}>
                        <p>No incoming tasks yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="fade-in-up" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="table mb-0">
                                    <thead className="table-bg">
                                        <tr>
                                            <th>Requester</th>
                                            <th>Service</th>
                                            <th>Directions</th>
                                            <th>End Date</th>
                                            <th>Amount</th>
                                            <th>Chat</th>
                                            <th>Status</th>
                                            <th>Submit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item) => (
                                            <tr key={item.id}>
                                                <td style={{ fontWeight: 500 }}>{item.username}</td>
                                                <td>{item.service}</td>
                                                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.directions}</td>
                                                <td>{item.endDate}</td>
                                                <td>{item.amount != null ? `$${item.amount}` : "-"}</td>
                                                <td>
                                                    <button onClick={() => { toChat(item.username) }} className="btn secondary-button" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                        Message
                                                    </button>
                                                </td>
                                                <td>
                                                    {item.accepted === "false" ? (
                                                        <div className="d-flex align-items-center">
                                                            <button onClick={() => handleAccept(item.id)} className="btn primary-button mr-2" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                                Accept
                                                            </button>
                                                            <button onClick={() => handleReject(item.id)} className="btn btn-outline-danger" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                                Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span style={{
                                                            padding: '0.25rem 0.6rem',
                                                            borderRadius: '4px',
                                                            fontSize: '0.78rem',
                                                            fontWeight: 600,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.3px',
                                                            backgroundColor: item.accepted === 'completed' ? '#d1e7ff' : item.accepted === 'rejected' ? '#fee2e2' : '#d1fae5',
                                                            color: item.accepted === 'completed' ? '#1e40af' : item.accepted === 'rejected' ? '#991b1b' : '#065f46'
                                                        }}>
                                                            {item.accepted}
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {item.accepted === "false" ? (
                                                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Pending</span>
                                                    ) : item.accepted === "rejected" ? (
                                                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>—</span>
                                                    ) : item.githubLink ? (
                                                        <a href={item.githubLink} target="_blank" rel="noreferrer" className="small-link" style={{ fontSize: '0.85rem' }}>View Link</a>
                                                    ) : (
                                                        <button type="button" className="btn secondary-button" onClick={() => openLinkModal(item)} style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                            GitHub Link
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal fade" id="githubModal" tabIndex="-1" role="dialog" aria-labelledby="githubModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="githubModalLabel" style={{ fontWeight: 600, fontSize: '1.05rem' }}>Submit GitHub Link</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="form-outline m-4 input-wrap">
                                        <input
                                            type="url"
                                            className="input-field form-control"
                                            placeholder="https://github.com/..."
                                            value={link}
                                            onChange={(event) => setLink(event.target.value)}
                                        />
                                        <label>GitHub Repository URL</label>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn secondary-button" data-dismiss="modal">Close</button>
                                        <button onClick={saveLink} type="button" className="btn primary-button">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default TasksPage