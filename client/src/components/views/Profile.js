import React from 'react';
import ProfileCard from '../cards/ProfileCard';
import gravatar from 'gravatar';
import { connect } from 'react-redux';

const Profile = ({ user, profile }) => {
    console.log(
        gravatar.url('radziminski.j@gmail.com', {
            s: '200',
            r: 'pg',
            d: 'mm',
        })
    );

    return (
        <section className="profile">
            <div className="profile-bg"></div>
            <div className="profile-nav"></div>
            <div className="profile-content">
                <ProfileCard
                    name={user ? user.name : ''}
                    img={user ? user.avatar : ''}
                    email={user ? user.email : ''}
                    bio={profile ? profile.bio : ''}
                    daw={profile ? profile.daw : ''}
                    company={profile ? profile.company : ''}
                    status={profile ? profile.status : ''}
                    canBeEdited
                />
                <div className="profile-collabs"></div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.profile.profile,
});

export default connect(mapStateToProps, {})(Profile);
