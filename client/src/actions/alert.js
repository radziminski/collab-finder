import { SET_ALERT } from './types';

export const setAlert = ({ msg, type }) => (dispatch) => {
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            type,
        },
    });
};
