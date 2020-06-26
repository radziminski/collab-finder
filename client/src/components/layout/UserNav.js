import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { withRouter } from 'react-router-dom';

const UserNav = ({ logout, user, history }) => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    const profileImg = user ? user.avatar : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';

    console.log(user);
    let nav = null;
    if (showNav) {
        nav = (
            <div className="user-nav-box">
                <div className="user-nav-info">
                    <div className="user-nav-icon-small" onClick={toggleNav}>
                        <img className="user-nav-img" src={profileImg} alt="User"></img>
                    </div>
                    <div className="user-nav-info-text">
                        <div className="user-nav-name">{user ? user.name : ''}</div>
                        <div className="user-nav-email">{user ? user.email : ''}</div>
                    </div>
                    <button className="user-nav-close-btn" onClick={toggleNav}>
                        <i className="fa fa-times" />
                    </button>
                </div>
                <ul className="user-nav-links">
                    <li
                        className="user-nav-link"
                        onClick={() => {
                            history.push('/profile');
                            toggleNav();
                        }}
                    >
                        <i className="fa fa-user user-nav-link-icon" />
                        My Profile
                    </li>
                    <li className="user-nav-link">
                        <i className="fa fa-lock user-nav-link-icon" />
                        Change Password
                    </li>
                    <li className="user-nav-link" onClick={logout}>
                        <i className="fas fa-sign-out-alt user-nav-link-icon" />
                        Logout
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className="user-nav">
            <div className="user-nav-icon" onClick={toggleNav}>
                <img className="user-nav-img" src={profileImg} alt="User"></img>
            </div>
            {nav}
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default withRouter(connect(mapStateToProps, { logout })(UserNav));
