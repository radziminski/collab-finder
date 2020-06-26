import React from 'react';
import ProfileCard from '../cards/ProfileCard';
import gravatar from 'gravatar';

const Profile = () => {
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
                <ProfileCard name="Jan Radziminski" img="" />
                <div className="profile-collabs"></div>
            </div>
        </section>
    );
};

export default Profile;
