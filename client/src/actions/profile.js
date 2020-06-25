import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

export const getCurrentUserProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('api/profile/me');
        console.log(res.data.data.profile);
        dispatch({
            type: GET_PROFILE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.data.message, status: err.response.status },
        });
    }
};

export const clearProfile = () => async (dispatch) => {};
