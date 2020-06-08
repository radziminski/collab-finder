import React from 'react';

const Landing = () => {
    return (
        <section className="home">
            <div className="primary-overlay">
                <div className="home-hero">
                    <h2 className="text-large text-thin  text-shadow">Find a partner for your next song on</h2>
                    <h1 className="text-x-large text-bold ">Collab Finder</h1>
                    <div className="buttons buttons-center m-top-medium">
                        <a href="register.html" className="btn btn-full btn-inline">
                            Sign Up
                        </a>
                        <a href="login.html" className="btn btn-white btn-inline">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
