import React, { useState } from 'react';
import Modal from '../layout/Modal';
import Auth from '../auth/AuthContainer';
import { connect } from 'react-redux';

const Navbar = ({ isAuthenticated }) => {
    const [showAuth, setShowAuth] = useState(false);
    const [authType, setAuthType] = useState('login');

    const openAuthModal = (authType) => {
        setAuthType(authType);
        setShowAuth(true);
    };
    const closeAuthModal = (authType) => {
        setAuthType(authType);
        setShowAuth(false);
    };

    let loggedInLinks = (
        <ul className="nav list-row">
            <li className="nav-link selected">Home</li>
            <li className="nav-link">Producers</li>
            <li className="nav-link">My Collabs</li>
            <li className="nav-link">Browse Collabs</li>
        </ul>
    );

    let loggedOutLinks = (
        <ul className="nav list-row">
            <li className="nav-link selected">Home</li>
            <li className="nav-link">Producers</li>
            <li className="nav-link" onClick={() => openAuthModal('login')}>
                Login
            </li>
            <li className="nav-link" onClick={() => openAuthModal('register')}>
                Sign-up
            </li>
        </ul>
    );

    return (
        <>
            <header className="navbar">
                <h1 className="text-dark">
                    <div className="logo">
                        <div className="text-gradient">Collab </div> &nbsp;Finder
                    </div>
                </h1>
                <nav>{isAuthenticated ? loggedInLinks : loggedOutLinks}</nav>
            </header>
            <Modal open={showAuth} onClose={closeAuthModal}>
                <Auth onClose={closeAuthModal} authType={authType} />
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
