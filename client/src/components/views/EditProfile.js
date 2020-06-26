import React, { useState, useEffect } from 'react';
import SectionTitle from '../typography/SectionTitle';
import TextInput from '../inputs/TextInput';
import Textarea from '../inputs/Textarea';
import ButtonFull from '../buttons/ButtonFull';
import { connect } from 'react-redux';
import { saveProfile, updateProfile } from '../../actions/profile';

const EditProfile = ({ profile, saveProfile, updateProfile }) => {
    const [bio, setBio] = useState('');
    const [company, setCompany] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [daw, setDaw] = useState('');
    const [status, setStatus] = useState('');
    const [skills, setSkills] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [soundcloud, setSoundcloud] = useState('');

    useEffect(() => {
        if (profile) {
            setBio(profile.bio || '');
            setCompany(profile.company || '');
            setWebsite(profile.website || '');
            setLocation(profile.location || '');
            setDaw(profile.daw || '');
            setStatus(profile.status || '');
            if (typeof profile.skills !== 'string') setSkills(profile.skills.join(', '));
            else setSkills(profile.skills || '');
            setFacebook(profile.socials ? profile.socials.facebook || '' : '');
            setInstagram(profile.socials ? profile.socials.instagram || '' : '');
            setYoutube(profile.socials ? profile.socials.youtube || '' : '');
            setSoundcloud(profile.socials ? profile.socials.soundcloud || '' : '');
        }
    }, [profile]);

    const onSubmit = (e) => {
        e.preventDefault();
        const newProfile = {
            bio,
            company,
            website,
            location,
            daw,
            status,
            skills,
            facebook,
            instagram,
            youtube,
            soundcloud,
            socials: {},
        };
        console.log(newProfile);

        if (!profile) saveProfile(newProfile);
        else updateProfile(newProfile);
    };

    return (
        <section className="section section-profile-edit">
            <form onSubmit={onSubmit}>
                <div className="m-bottom-medium">
                    <SectionTitle>Set up your profile</SectionTitle>
                </div>
                <h2 className="text-small text-semi-bold m-bottom-tiny">Personal Info</h2>
                <Textarea
                    label="Bio*"
                    icon="fas fa-book"
                    onChange={setBio}
                    subtitle="Tell us something about yourself"
                    defaultValue={bio}
                    required
                />
                <TextInput
                    label="Company"
                    icon="fa fa-building"
                    onChange={setCompany}
                    defaultValue={company}
                    subtitle="Tell us where are you working"
                />

                <h2 className="text-small text-semi-bold m-bottom-tiny">Musical Info</h2>
                <TextInput
                    label="Status"
                    icon="fa fa-user"
                    onChange={setStatus}
                    defaultValue={status}
                    subtitle="Choose one from: Producer, Singer, Composer, Engineer"
                    required
                />
                <TextInput
                    label="DAW*"
                    icon="fa fa-user"
                    onChange={setDaw}
                    defaultValue={daw}
                    subtitle="Choose one from: FL Studio, Ableton Live, Pro Tools, Logic Pro, Studio One, Reaper"
                    required
                />
                <TextInput
                    label="Skills"
                    icon="fa fa-user"
                    defaultValue={skills}
                    subtitle="What skills do you have?"
                    onChange={setSkills}
                />

                <h2 className="text-small text-semi-bold m-bottom-tiny">Contact Info</h2>
                <TextInput
                    label="Website"
                    icon="fa fa-globe"
                    subtitle="If you have personal website, put it here"
                    onChange={setWebsite}
                    defaultValue={website}
                />
                <TextInput
                    label="Location*"
                    icon="fa fa-map"
                    subtitle="Where are you from? (country)"
                    onChange={setLocation}
                    defaultValue={location}
                    required
                />

                <h2 className="text-small text-semi-bold m-bottom-tiny">Social Links</h2>
                <TextInput
                    designType="inline"
                    label="Facebook"
                    icon="fab fa-facebook-square"
                    onChange={setFacebook}
                    defaultValue={facebook}
                />
                <TextInput
                    designType="inline"
                    label="Instagram"
                    icon="fab fa-instagram-square"
                    onChange={setInstagram}
                    defaultValue={instagram}
                />
                <TextInput
                    designType="inline"
                    label="Youtube"
                    icon="fab fa-youtube-square"
                    onChange={setYoutube}
                    defaultValue={youtube}
                />
                <TextInput
                    designType="inline"
                    label="Soundcloud"
                    icon="fab fa-soundcloud"
                    onChange={setSoundcloud}
                    defaultValue={soundcloud}
                />

                <div className="u-center m-bottom-large m-top-large">
                    <ButtonFull type="submit">Save Profile</ButtonFull>
                </div>
            </form>
        </section>
    );
};

const mapStateToProps = (state) => ({
    profile: state.profile.profile,
});

export default connect(mapStateToProps, { saveProfile, updateProfile })(EditProfile);
