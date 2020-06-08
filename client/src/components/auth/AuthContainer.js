import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthContainer = ({ authType }) => {
    const [authTypeSate, setAuthTypeState] = useState(authType);

    let component = <Login changeAuthType={() => setAuthTypeState('register')} />;
    let authSelectLoginClass = 'auth-type selected';
    let authSelectRegisterClass = 'auth-type';

    if (authTypeSate === 'register') {
        component = <Register changeAuthType={() => setAuthTypeState('login')} />;
        authSelectLoginClass = 'auth-type ';
        authSelectRegisterClass = 'auth-type selected';
    }

    return (
        <div className="auth-container">
            <div className="auth-select">
                <div className={authSelectLoginClass} onClick={() => setAuthTypeState('login')}>
                    login
                </div>
                <div className={authSelectRegisterClass} onClick={() => setAuthTypeState('register')}>
                    sign up
                </div>
            </div>
            {component}
        </div>
    );
};

export default AuthContainer;
