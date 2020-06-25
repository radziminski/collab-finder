import React, { useState } from 'react';
import SectionTitle from '../typography/SectionTitle';
import TextInput from '../inputs/TextInput';
import Textarea from '../inputs/Textarea';

const EditProfile = ({ profile }) => {
    const [name, setName] = useState(profile ? profile.name : '');
    const [bio, setBio] = useState(profile ? profile.bio : '');
    const [company, setCompany] = useState(profile ? profile.company : '');
    const [website, setWebsite] = useState(profile ? profile.website : '');

    return (
        <section className="section section-profile-edit">
            <div className="m-bottom-medium">
                <SectionTitle>Set up your profile</SectionTitle>
            </div>
            <h2 className="text-small text-semi-bold m-bottom-tiny">Personal Info</h2>
            <TextInput label="Name*" icon="fa fa-user" onChange={setName} />
            <Textarea label="Bio*" icon="fas fa-book" onChange={setBio} />
            <TextInput label="Company" icon="fa fa-building" onChange={setCompany} />
            <h2 className="text-small text-semi-bold m-bottom-tiny">Musical Info</h2>
            <TextInput label="DAW*" icon="fa fa-user" onChange={setName} />
            <TextInput label="Skills" icon="fa fa-user" onChange={setName} />
            <h2 className="text-small text-semi-bold m-bottom-tiny">Contact Info</h2>
            <TextInput label="Website" icon="fa fa-globe" onChange={setCompany} />
            <TextInput designType="inline" label="Facebook" icon="fab fa-facebook-square" onChange={setCompany} />
            <TextInput label="Instagram" icon="fab fa-instagram-square" onChange={setCompany} />
            <TextInput label="Youtube" icon="fab fa-youtube-square" onChange={setCompany} />
            <TextInput label="Soundcloud" icon="fab fa-soundcloud" onChange={setCompany} />
        </section>
    );
};

export default EditProfile;
