import React, { useEffect } from 'react';
import Modal from '../layout/Modal';
import Auth from '../auth/AuthContainer';
import { connect } from 'react-redux';
import { openLogin, openRegister, closeAuth } from '../../actions/ui';
import { loginByJWT, logOut } from '../../actions/auth';

const Navbar = ({
    isAuthenticated,
    loginByJWT,
    authType,
    showAuth,
    openLogin,
    openRegister,
    closeAuth,
    logOut,
}) => {
    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt) loginByJWT({ jwt });
    }, []);

    let loggedInLinks = (
        <ul className="nav list-row">
            <li className="nav-link selected">Home</li>
            <li className="nav-link">Producers</li>
            <li className="nav-link" onClick={logOut}>
                Logout
            </li>
            <li className="nav-link">Browse Collabs</li>
        </ul>
    );

    let loggedOutLinks = (
        <ul className="nav list-row">
            <li className="nav-link selected">Home</li>
            <li className="nav-link">Producers</li>
            <li className="nav-link" onClick={openLogin}>
                Login
            </li>
            <li className="nav-link" onClick={openRegister}>
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
            <Modal open={showAuth && !isAuthenticated} onClose={closeAuth}>
                <Auth authType={authType} />
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    showAuth: state.ui.showAuthModal,
    authType: state.ui.authType,
});

export default connect(mapStateToProps, { openLogin, logOut, openRegister, closeAuth, loginByJWT })(
    Navbar
);
