import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, SAVE_PROFILE, UPDATE_PROFILE, PROFILE_LOADING } from './types';
import getErrorsFromResponse from '../utils/getErrorsFromResponse';

export const getCurrentUserProfile = () => async (dispatch) => {
    dispatch({
        type: PROFILE_LOADING,
    });
    try {
        const res = await axios.get('api/profile/me');
        console.log('GETTING PROFILE', res.data.data.profile);
        dispatch({
            type: GET_PROFILE,
            payload: res.data.data,
        });
    } catch (err) {
        console.error(err.response);
        const errors = getErrorsFromResponse(err);
        console.log(errors);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.data.message, status: err.response.status },
        });
    }
};

export const saveProfile = (profile) => async (dispatch) => {
    dispatch({
        type: PROFILE_LOADING,
    });
    try {
        const res = await axios.post('api/profile', profile);
        console.log(res);
        dispatch({
            type: SAVE_PROFILE,
            payload: res.data.data,
        });
    } catch (err) {
        console.error(err.response);
        const errors = getErrorsFromResponse(err);
        console.log(errors);
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response,
        });
    }
};

export const updateProfile = (profile) => async (dispatch) => {
    dispatch({
        type: PROFILE_LOADING,
    });
    try {
        console.log('updating', profile);
        const res = await axios.patch('api/profile', profile);
        console.log(res);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.data,
        });
    } catch (err) {
        console.error(err.response);
        const errors = getErrorsFromResponse(err);
        console.log(errors);
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response,
        });
    }
};

export const clearProfile = () => async (dispatch) => {};
