import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, isLoading, ...props }) => (
    <Route
        {...props}
        render={(props) => (!isAuthenticated && !isLoading ? <Redirect to="/" /> : <Component {...props} />)}
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(PrivateRoute);
