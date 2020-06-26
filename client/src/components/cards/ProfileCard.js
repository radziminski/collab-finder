import React from 'react';
import ButtonFull from '../buttons/ButtonFull';
import { withRouter } from 'react-router-dom';

const ProfileCard = ({ img, name, email, bio, daw, status, company, canBeEdited, history }) => {
    return (
        <div className="profile-card">
            <img src={img} alt="user" className="profile-card-img" />
            <h2 className="text-large text-semi-bold-2">{name}</h2>
            <h3 className="text-small text-thin text-normal">{email}</h3>
            <div className="profile-card-content">
                <h4 className="profile-card-subtitle">DAW</h4>
                <p className="text-normal m-bottom-tiny">{daw || '-'}</p>

                <h4 className="profile-card-subtitle">Status</h4>
                <p className="text-normal m-bottom-tiny">{status || '-'}</p>

                <h4 className="profile-card-subtitle">Company</h4>
                <p className="text-normal m-bottom-tiny">{company || '-'}</p>

                <h4 className="profile-card-subtitle">Bio</h4>
                <p className="text-normal m-bottom-tiny">{bio || 'This user has not added his bio yet.'}</p>

                {canBeEdited ? (
                    <div className="u-center m-top-medium">
                        <ButtonFull onClick={() => history.push('/profile/edit/')}>Edit Profile</ButtonFull>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default withRouter(ProfileCard);
