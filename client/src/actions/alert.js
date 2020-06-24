import { SET_ALERT } from './types';

export const setAlert = ({ msg, type }) => (dispatch) => {
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            type,
        },
    });
    setTimeout(() => {
        dispatch({
            type: SET_ALERT,
            payload: {
                msg: '',
                type: null,
            },
        });
    }, 3000);
};
