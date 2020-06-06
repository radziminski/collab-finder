import React from 'react';

const Landing = () => {
    return (
        <section class="home">
            <div class="primary-overlay">
                <div class="home-hero">
                    <h2 class="text-large text-thin  text-shadow">Find a collaborator for your new song on</h2>
                    <h1 class="text-x-large text-bold ">Collab Finder</h1>
                    <div class="buttons buttons-center m-top-medium">
                        <a href="register.html" class="btn btn-full">
                            Sign Up
                        </a>
                        <a href="login.html" class="btn btn-white">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
