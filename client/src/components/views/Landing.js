import React from 'react';
import { connect } from 'react-redux';
import { openLogin, openRegister } from '../../actions/ui';
import { Redirect } from 'react-router-dom';

const Landing = ({ isAuthenticated, openLogin, openRegister }) => {
    const onAuthClicked = (authType) => {
        if (isAuthenticated) {
            // Redirect to collabs
            return;
        }

        if (authType === 'login') openLogin();
        else openRegister();
    };

    if (isAuthenticated) return <Redirect to="/dashboard" />;

    return (
        <section className="home">
            <div className="primary-overlay">
                <div className="home-hero">
                    <h2 className="text-large text-thin text-shadow">Find a partner for your next song on</h2>
                    <h1 className="text-x-large text-bold ">Collab Finder</h1>
                    <div className="buttons buttons-center m-top-medium">
                        <button className="btn btn-full btn-inline" onClick={() => onAuthClicked('register')}>
                            Sign Up
                        </button>
                        <button className="btn btn-white btn-inline" onClick={() => onAuthClicked('login')}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { openLogin, openRegister })(Landing);
