import React, { useEffect, useState, useContext } from 'react';
import { AccountContext } from '../components/Account'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useToast } from '../components/Toast'
import { fetchWhere, deleteData, deleteWhere, putData, updateData } from '../firebaseData';
import { useNavigate } from 'react-router-dom';

const chatIdFor = (item) => [item.username, item.requested].filter(Boolean).sort().join("__");

function RequestMgmtPage() {
    const [outgoingData, setOutgoingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rateTarget, setRateTarget] = useState(null);
    const [starRating, setStarRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");
    const [savingRating, setSavingRating] = useState(false);
    const { getUsername } = useContext(AccountContext);
    const { showToast } = useToast();
    const username = getUsername();

    const fetchRequests = async () => {
        setLoading(true);
        const data = await fetchWhere('requests', 'username', username);
        setOutgoingData(data);
        setLoading(false);
    };

    const handleDelete = async (item) => {
        try {
            await deleteData('requests', item.id);
            await deleteWhere('chats', 'chatId', chatIdFor(item));
            fetchRequests();
            showToast("Request deleted.");
        } catch (error) {
            console.log('Error deleting record:', error);
            showToast("Could not delete the request.", "error");
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

    const openRateModal = (item) => {
        setRateTarget(item);
        setStarRating(5);
        setReviewComment("");
    }

    const saveRating = async () => {
        if (!rateTarget) return;
        setSavingRating(true);
        try {
            await putData('ratings', {
                providerId: rateTarget.providerId,
                providerName: rateTarget.requested,
                requesterId: rateTarget.requesterId,
                requesterName: rateTarget.username,
                requestId: rateTarget.id,
                rating: starRating,
                comment: reviewComment.trim(),
                timestamp: new Date(),
            });
            await updateData('requests', rateTarget.id, { rated: true });
            setRateTarget(null);
            fetchRequests();
            window.$('#rateModal').modal('hide');
            showToast("Thanks! Your review was submitted.");
        } catch (error) {
            console.log('Error saving rating:', error);
            showToast("Could not submit your review.", "error");
        }
        setSavingRating(false);
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
                                                <div className="d-flex align-items-center flex-wrap">
                                                    <button onClick={() => { toChat(item.requested) }} className="btn secondary-button mr-2 mb-1" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                        Message
                                                    </button>
                                                    {(item.accepted === "accepted" || item.accepted === "completed") && (
                                                        <button onClick={() => toCheckout(item)} className="btn primary-button mr-2 mb-1" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                            Pay
                                                        </button>
                                                    )}
                                                    {item.accepted === "completed" && !item.rated && (
                                                        <button onClick={() => openRateModal(item)} className="btn secondary-button mr-2 mb-1" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                                                            Rate
                                                        </button>
                                                    )}
                                                    {item.accepted === "completed" && item.rated && (
                                                        <span className="mr-2 mb-1" style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>Rated</span>
                                                    )}
                                                    <button onClick={() => handleDelete(item)} className="btn btn-outline-danger mb-1" style={{ fontSize: '0.82rem', padding: '0.35rem 0.6rem' }}>
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

            <div className="modal fade" id="rateModal" tabIndex="-1" role="dialog" aria-labelledby="rateModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="rateModalLabel" style={{ fontWeight: 600, fontSize: '1.05rem' }}>
                                Rate {rateTarget ? rateTarget.requested : ""}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body p-4">
                            <label style={{ fontWeight: 600 }}>Your rating</label>
                            <div className="rate-stars mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`rate-star ${star <= starRating ? "filled" : ""}`}
                                        onClick={() => setStarRating(star)}
                                        aria-label={`${star} star${star === 1 ? "" : "s"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <div className="form-group">
                                <label>Comment (optional)</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    maxLength="300"
                                    placeholder="How was your experience?"
                                    value={reviewComment}
                                    onChange={(event) => setReviewComment(event.target.value)}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn secondary-button" data-dismiss="modal">Cancel</button>
                            <button onClick={saveRating} type="button" className="btn primary-button" disabled={savingRating}>
                                {savingRating ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RequestMgmtPage