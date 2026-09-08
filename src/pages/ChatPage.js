import React, { useContext, useEffect, useState, useRef } from "react";
import { AccountContext } from "../components/Account";
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { putData, subscribeWhere } from '../firebaseData';

const toDisplayTime = (timestamp) => {
    if (!timestamp) return "";
    const date = typeof timestamp.toDate === "function"
        ? timestamp.toDate()
        : new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp);
    return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

function ChatPage() {
    const { getUsername } = useContext(AccountContext);
    const myUsername = getUsername();
    const location = useLocation();
    const targetUsername = location.state?.username;

    const chatId = [myUsername, targetUsername].filter(Boolean).sort().join("__");

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const endRef = useRef(null);

    useEffect(() => {
        if (!chatId || !targetUsername) return;
        setLoading(true);
        setError(null);
        const unsubscribe = subscribeWhere('chats', 'chatId', chatId, (data) => {
            setMessages(data.sort((a, b) => (a.timestamp?.seconds ?? 0) - (b.timestamp?.seconds ?? 0)));
            setLoading(false);
        }, (err) => {
            console.error('Chat load error:', err);
            setError("Couldn't load messages. Please make sure the chat security rules are deployed.");
            setLoading(false);
        });
        return unsubscribe;
    }, [chatId, targetUsername]);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollTop = endRef.current.scrollHeight;
        }
    }, [messages]);

    const onSend = async (event) => {
        event.preventDefault();
        if (!text.trim() || !chatId) return;
        setSending(true);
        const message = {
            chatId,
            sender: myUsername,
            receiver: targetUsername,
            text: text.trim(),
            timestamp: new Date(),
        };
        await putData('chats', message);
        setText("");
        setSending(false);
    };

    if (!targetUsername) {
        return (
            <>
                <Navbar />
                <div className="offset"></div>
                <div className="container" style={{ paddingTop: '1.5rem' }}>
                    <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
                        <p>No conversation selected.</p>
                        <a className="btn primary-button" href="/explore">Browse Services</a>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '1.25rem', paddingBottom: '3rem', maxWidth: '860px' }}>
                <div className="chat-card">
                    <div className="chat-header">
                        <div>
                            <h5 className="mb-0" style={{ fontWeight: 600 }}>{targetUsername}</h5>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Chat with {targetUsername}</span>
                        </div>
                        <a href="/requestmgmt" className="small-link" style={{ fontSize: '0.85rem' }}>Your Requests</a>
                    </div>

                    <div className="chat-body" ref={endRef}>
                        {loading ? (
                            <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', color: 'var(--text-light)' }}>
                                <div className="spinner-border text-secondary mr-2" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <span>Loading conversation...</span>
                            </div>
                        ) : error ? (
                            <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', color: 'var(--text-light)' }}>
                                <p className="text-center" style={{ maxWidth: '420px' }}>{error}</p>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', color: 'var(--text-light)' }}>
                                <p>No messages yet. Say hello to {targetUsername}!</p>
                            </div>
                        ) : (
                            messages.map((message) => {
                                const mine = message.sender === myUsername;
                                return (
                                    <div key={message.id} className={`chat-bubble ${mine ? "mine" : "theirs"}`}>
                                        {message.text}
                                        <div className={`chat-meta ${mine ? "mine" : ""}`}>
                                            {toDisplayTime(message.timestamp)}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <form onSubmit={onSend} className="chat-input-row">
                        <input
                            className="form-control"
                            placeholder={`Message ${targetUsername}...`}
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            autoFocus
                        />
                        <button className="btn primary-button" type="submit" disabled={sending || text.trim() === ""}>
                            {sending ? "Sending..." : "Send"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChatPage;