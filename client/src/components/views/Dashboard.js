import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ getCurrentUserProfile, profile: { profile, isLoading } }) => {
    useEffect(() => {
        getCurrentUserProfile();
    }, []);

    if (!profile) return <Redirect to="/profile/edit" />;
    if (isLoading) {
        return <div>LOADING</div>;
    }
    return <div>Dashboard</div>;
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);
