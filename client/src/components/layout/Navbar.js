import React from 'react';
import Modal from '../layout/Modal';
import Auth from '../auth/AuthContainer';
import { connect } from 'react-redux';
import { openLogin, openRegister, closeAuth } from '../../actions/ui';
import { logout } from '../../actions/auth';
import UserNav from './UserNav';

const Navbar = ({ isAuthenticated, loadUser, authType, showAuth, openLogin, openRegister, closeAuth, logout }) => {
    let authLinks = (
        <ul className="nav list-row">
            <li className="nav-link selected">Home</li>
            <li className="nav-link">Producers</li>
            <li className="nav-link" onClick={logout}>
                Logout
            </li>
            <li className="nav-link nav-link-selected">Browse Collabs</li>
            <li className="nav-link">
                <UserNav />
            </li>
        </ul>
    );

    let guestLinks = (
        <ul className="nav list-row">
            <li className="nav-link selected">Home</li>
            <li className="nav-link">Producers</li>
            <li className="nav-link" onClick={openLogin}>
                Login
            </li>
            <li className="nav-link nav-link-selected" onClick={openRegister}>
                Sign-up
            </li>
        </ul>
    );

    let className = 'navbar';
    if (isAuthenticated) className += ' navbar-shadow';

    return (
        <>
            <header className={className}>
                <h1 className="text-dark">
                    <div className="logo">
                        <div className="text-gradient">Collab </div> &nbsp;Finder
                    </div>
                </h1>
                <nav>{isAuthenticated ? authLinks : guestLinks}</nav>
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

export default connect(mapStateToProps, { openLogin, logout, openRegister, closeAuth })(Navbar);
