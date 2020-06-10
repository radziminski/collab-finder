import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from './types';
import { setAlert } from './alert';

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

export const loginByJWT = ({ jwt }) => async (dispatch) => {
    dispatch({
        type: LOADING,
    });
    const config = {
        headers: {
            'x-auth-token': jwt,
        },
    };
    try {
        const res = await axios.get('/api/auth/', config);
        res.data.token = jwt;
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(setAlert({ msg: 'Login successfull', type: 'success' }));
    } catch (err) {
        console.log(err);
        if (err.response && err.response.data.error)
            dispatch(setAlert({ msg: err.response.data.error.errors[0].msg, type: 'danger' }));
        dispatch({
            type: LOGIN_FAIL,
            payload: err,
        });
        localStorage.removeItem('token');
    }
};

export const logOut = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
