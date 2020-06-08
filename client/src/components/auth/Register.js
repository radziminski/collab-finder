import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextInput from '../inputs/TextInput';
import { regsiter as registerUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { withRouter } from 'react-router-dom';

const Register = ({ changeAuthType, registerUser, alert, isLoading, isAuthenticated, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState({
        msg: null,
        type: 'success',
    });

    useEffect(() => {
        if (alert)
            setStatus({
                msg: alert.msg,
                type: alert.type,
            });
    }, [alert]);

    useEffect(() => {
        if (isAuthenticated) {
            setTimeout(() => {
                history.push('/collabs');
            }, 1000);
        }
    }, [isAuthenticated]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword)
            return setStatus({ msg: 'Passwords do not match. Please fill in the same password', type: 'error' });

        registerUser({ name, email, password });
    };

    let statusMsg = null;
    if (status.msg)
        statusMsg = (
            <div className={`auth-status-msg ${status.type === 'success' ? ' text-green' : ' text-red'}`}>
                {status.msg}
            </div>
        );
    if (isLoading) statusMsg = <div>LOAADINGG</div>;

    return (
        <>
            <form className="login" onSubmit={onSubmit}>
                <h3 className="text-large text-center m-bottom-small">Sign Up</h3>
                <TextInput
                    label="Name"
                    onChange={(value) => setName(value)}
                    icon="fa fa-user"
                    placeholder="ex. Giant Panda"
                    required
                />
                <TextInput
                    label="email"
                    onChange={(value) => setEmail(value)}
                    required
                    icon="fa fa-envelope"
                    placeholder="ex. panda@gmail.com"
                />
                <TextInput
                    label="password"
                    onChange={(value) => setPassword(value)}
                    type="password"
                    required
                    icon="fas fa-lock"
                    placeholder="ex. panda4life"
                />
                <TextInput
                    label="Confirm Password"
                    onChange={(value) => setConfirmPassword(value)}
                    type="password"
                    required
                    icon="fas fa-lock"
                />
                <div className="m-top-large">
                    {statusMsg}
                    <button className="btn btn-full m-center">Next</button>
                    <div className="auth-type-msg">
                        Already have an account? Login in{' '}
                        <span className="text-gradient text-semi-bold  u-pointer" onClick={changeAuthType}>
                            here.
                        </span>
                    </div>
                </div>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    alert: state.alert,
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, { registerUser, setAlert })(Register));
