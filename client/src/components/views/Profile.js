import React, { useEffect } from 'react';
import ProfileCard from '../cards/ProfileCard';
import gravatar from 'gravatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentUserProfile } from '../../actions/profile';

const Profile = ({ user, profile, history, getCurrentUserProfile }) => {
    console.log(
        gravatar.url('radziminski.j@gmail.com', {
            s: '200',
            r: 'pg',
            d: 'mm',
        })
    );

    useEffect(() => {
        getCurrentUserProfile();
    }, []);

    return (
        <section className="profile">
            <div className="profile-bg"></div>
            <div className="profile-nav"></div>
            <div className="profile-content">
                {profile ? (
                    <ProfileCard
                        name={user ? user.name : ''}
                        img={user ? user.avatar : ''}
                        email={user ? user.email : ''}
                        profile={profile}
                        canBeEdited
                    />
                ) : null}
                <div className="profile-collabs"></div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.profile.profile,
});

export default withRouter(connect(mapStateToProps, { getCurrentUserProfile })(Profile));
