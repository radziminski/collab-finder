import React from 'react';

const Navbar = () => {
    return (
        <header class="navbar">
            <h1 class="text-dark">
                <a href="index.html">
                    <div class="logo">
                        <div class="text-gradient">Collab </div> &nbsp;Finder
                    </div>
                </a>
            </h1>
            <nav>
                <ul class="nav list-row">
                    <li>
                        <a href="profiles.html" class="selected">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="profiles.html">Producers</a>
                    </li>
                    <li>
                        <a href="login.html">Login</a>
                    </li>
                    <li>
                        <a href="register.html">Sign-up</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
