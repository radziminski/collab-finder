import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/sass/main.scss';
import Navbar from './components/layout/Navbar';
import Landing from './components/views/Landing';
import { Provider } from 'react-redux';
import store from './store';
import Collabs from './components/views/Collabs';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <Route path="/collabs" component={Collabs} />
            </Router>
        </Provider>
    );
};

export default App;
