import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/sass/main.scss';
import Navbar from './components/layout/Navbar';
import Landing from './components/views/Landing';
import { Provider } from 'react-redux';
import store from './store';
import Collabs from './components/views/Collabs';
import Dashboard from './components/views/Dashboard';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/views/EditProfile';
import Profile from './components/views/Profile';

axios.defaults.baseURL = 'http://localhost:3000/';

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/collabs" component={Collabs} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute path="/profile/" component={Profile} />
                    <PrivateRoute exact path="/profile/edit" component={EditProfile} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
