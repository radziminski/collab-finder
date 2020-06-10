import React, { useState } from 'react';
import TextInput from '../inputs/TextInput';
import { connect } from 'react-redux';
import { login as loginUser } from '../../actions/auth';

const Login = ({ changeAuthType, isAuthenticated, isLoading, loginUser, alert }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const status = alert;

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('login');
        loginUser({ email, password });
    };

    let statusMsg = null;
    if (status.msg)
        statusMsg = (
            <div
                className={`auth-status-msg ${
                    status.type === 'success' ? ' text-green' : ' text-red'
                }`}
            >
                {status.msg}
            </div>
        );
    if (isLoading) statusMsg = <div>LOAADINGG</div>;

    return (
        <>
            <form className="login" onSubmit={onSubmit}>
                <h3 className="text-large text-center m-bottom-small">Login</h3>
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
                <div className="m-top-large">
                    {statusMsg}
                    <button className="btn btn-full m-center" type="submit">
                        Send
                    </button>
                    <div className="auth-type-msg">
                        Haven't signed up yet? Click{' '}
                        <span
                            className="text-gradient text-semi-bold u-pointer"
                            onClick={changeAuthType}
                        >
                            here.
                        </span>
                    </div>
                </div>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    alert: state.alert,
});

export default connect(mapStateToProps, { loginUser })(Login);
