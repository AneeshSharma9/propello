import React, { useEffect, useState, useContext } from 'react';
import { AccountContext } from '../components/Account'
import Navbar from '../components/Navbar'
import { fetchData, deleteData, updateData } from '../firebaseData';
import { useNavigate } from 'react-router-dom';

function TasksPage() {
    const [tableData, setTableData] = useState([]);
    const [link, setLink] = useState("");
    const { getUsername } = useContext(AccountContext);
    const username = getUsername();

    const fetchTasks = async () => {
        const data = await fetchData('requests');
        const filteredData = data.filter(item => item.requested === username);
        setTableData(filteredData);
    };

    const handleDelete = async (documentId) => {
        try {
            await deleteData('requests', documentId);
            fetchTasks();
        } catch (error) {
            console.log('Error deleting record:', error);
        }
    };

    const handleAccept = async (documentId) => {
        try {
            await updateData('requests', documentId, { accepted: "accepted" });
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

    const checkLink = () => {
        if (!link.includes("https://github.com")) {
            console.log('false')
        } else {
            console.log('true')
        }
    }

    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
                <h1 className="customh1 mb-4">Your Tasks</h1>
                {tableData.length === 0 ? (
                    <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                        <p>No incoming tasks yet.</p>
                    </div>
                ) : (
                    <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <table className="table mb-0">
                            <thead className="table-bg">
                                <tr>
                                    <th>Requester</th>
                                    <th>Service</th>
                                    <th>Directions</th>
                                    <th>End Date</th>
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
                                                    <button onClick={() => handleDelete(item.id)} className="btn btn-outline-danger" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
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
                                                    backgroundColor: '#d1fae5',
                                                    color: '#065f46'
                                                }}>
                                                    {item.accepted}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {item.accepted === "false" ? (
                                                <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Pending</span>
                                            ) : (
                                                <div>
                                                    <button type="button" className="btn secondary-button" data-toggle="modal" data-target="#exampleModal" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                        GitHub Link
                                                    </button>
                                                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalLabel" style={{ fontWeight: 600, fontSize: '1.05rem' }}>Submit GitHub Link</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="form-outline m-4 input-wrap">
                                                                    <input required
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
                                                                    <button onClick={checkLink} type="button" className="btn primary-button">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default TasksPage