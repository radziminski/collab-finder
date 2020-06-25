import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './types';
import { setAlert } from './alert';
import { closeAuth } from './ui';
import setAuthTokenHeader from '../utils/setAuthTokenHeader';

export const regsiter = ({ name, email, password }) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/auth/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        dispatch(closeAuth());
        dispatch(setAlert({ msg: 'Register successfull', type: 'success' }));
    } catch (err) {
        console.log(err.response.data.error.errors);
        dispatch(setAlert({ msg: err.response.data.error.errors[0].msg, type: 'danger' }));
        dispatch({
            type: REGISTER_FAIL,
            payload: err,
        });
    }
};

export const login = ({ email, password }) => async (dispatch) => {
    console.log('login');
    dispatch({
        type: LOADING,
    });
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/auth/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(closeAuth());
        dispatch(setAlert({ msg: 'Login successfull', type: 'success' }));
    } catch (err) {
        console.log(err);
        dispatch(setAlert({ msg: err.response.data.error.errors[0].msg, type: 'danger' }));
        dispatch({
            type: LOGIN_FAIL,
            payload: err,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const jwt = localStorage.token;

    if (jwt) setAuthTokenHeader(jwt);

    try {
        const res = await axios.get('/api/auth/');
        res.data.token = jwt;
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.error(err);

        if (err.response && err.response.data.error)
            dispatch(setAlert({ msg: err.response.data.error.errors[0].msg, type: 'danger' }));

        dispatch({
            type: LOGIN_FAIL,
            payload: err,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
    dispatch({
        type: CLEAR_PROFILE,
    });
};
