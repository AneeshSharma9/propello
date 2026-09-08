import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function NotFoundPage() {
    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '560px', textAlign: 'center' }}>
                <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>404</p>
                <h1 className="customh1" style={{ fontSize: '1.5rem' }}>Page not found</h1>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    The page you're looking for doesn't exist or may have moved.
                </p>
                <a className="btn primary-button" href="/explore">Browse Services</a>
            </div>
            <Footer />
        </>
    );
}

export default NotFoundPage;