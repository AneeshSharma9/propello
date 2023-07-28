import React, { useState, useEffect } from 'react'
import Pool from '../UserPool';

function Navbar() {
    const getIdToken = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            return new Promise((resolve, reject) => {
                user.getSession((err, session) => {
                    if (err) {
                        console.log('Session Error:', err);
                        reject(err);
                    } else {
                        resolve(session.getIdToken().getJwtToken());
                    }
                });
            });
        }
        return null;
    };

    const [loginLabel, setLoginLabel] = useState('');
    const [loginhrefLabel, setLoginhrefLabel] = useState('');
    const [requestMgmtLabel, setRequestMgmtLabel] = useState('');

    useEffect(() => {
        const fetchFullName = async () => {
            const idToken = await getIdToken();
            if (idToken) {
                const decodedToken = JSON.parse(atob(idToken.split('.')[1]));
                console.log(decodedToken);
                const name = decodedToken.name || 'Unknown';
                //setLoginLabel('');
                setLoginhrefLabel('profile')
                setLoginLabel(name);
                setRequestMgmtLabel('Manage Requests')
            } else {
                setLoginhrefLabel('login')
                setLoginLabel('Log In');
                setRequestMgmtLabel('')
            }
        };

        fetchFullName();
    }, []);

    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="logo" href="/">Campus Coder</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="navcolor nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="navcolor nav-link" href="explore">Explore</a>
                    </li>
                    <li class="nav-item">
                        <a class="navcolor nav-link" href="requestmgmt">{requestMgmtLabel}</a>
                    </li>
                    <li class="login-button">
                        <a class="colorchange nav-link" href={loginhrefLabel}>{loginLabel}</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar