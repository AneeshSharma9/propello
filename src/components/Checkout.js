import { CLIENT_ID } from '../config/Config'
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Checkout = () => {
    const location = useLocation();
    const item = location.state?.item;
    const amount = item?.amount != null && !isNaN(item.amount) ? Number(item.amount).toFixed(2) : "20.00";

    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: `Propello Service - ${item?.service || "Service"}`,
                    amount: {
                        currency_code: "USD",
                        value: amount,
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            setSuccess(true);
        });
    };

    const onError = (data, actions) => {
        setErrorMessage("An error occurred with your payment.");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!");
        }
    }, [success]);

    return (
        <>
            <Navbar />
            <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                <div className="offset"></div>
                <section>
                    <div className="container py-4" style={{ maxWidth: '560px' }}>
                        {!item ? (
                            <div className="p-4 text-center" style={{ background: 'var(--bg-gray)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                                <p style={{ color: 'var(--text-light)' }}>Nothing to check out right now.</p>
                                <a className="btn primary-button" href="/explore">Browse Services</a>
                            </div>
                        ) : (
                        <div className="p-4" style={{ background: 'var(--bg-gray)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                            <h2 className="customh1 mb-1" style={{ fontSize: '1.5rem' }}>Payment Details</h2>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Review your request before paying.</p>

                            <div className="mb-3">
                                <label style={{ fontSize: '0.82rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>Provider</label>
                                <div className="form-control alert alert-secondary" style={{ marginBottom: 0 }}>{item.requested}</div>
                            </div>
                            <div className="mb-3">
                                <label style={{ fontSize: '0.82rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>Service</label>
                                <div className="form-control alert alert-secondary" style={{ marginBottom: 0 }}>{item.service}</div>
                            </div>
                            <div className="mb-3">
                                <label style={{ fontSize: '0.82rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>Task Details</label>
                                <div className="form-control alert alert-secondary" style={{ marginBottom: 0 }}>{item.directions || "-"}</div>
                            </div>
                            <div className="mb-3">
                                <label style={{ fontSize: '0.82rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 600 }}>Amount Due</label>
                                <div className="form-control alert alert-secondary" style={{ marginBottom: 0 }}>
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>${amount}</span>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                <PayPalButtons
                                    style={{ layout: "vertical", disableMaxWidth: true, color: "blue", shape: "rect", height: 45 }}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                />
                            </div>
                        </div>
                        )}
                    </div>
                </section>
            </PayPalScriptProvider>
        </>
    );
}

export default Checkout
