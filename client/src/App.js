import React, { Fragment } from 'react';
import './assets/sass/main.scss';
import Navbar from './components/layout/Navbar';
import Landing from './components/views/Landing';

const App = () => {
    return (
        <Fragment>
            <Navbar />
            <Landing />
        </Fragment>
    );
};

export default App;
