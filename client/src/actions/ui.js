import { OPEN_LOGIN, OPEN_REGISTER, CLOSE_AUTH } from './types';

export const openLogin = () => (dispatch) => {
    dispatch({
        type: OPEN_LOGIN,
    });
};

export const openRegister = () => (dispatch) => {
    dispatch({
        type: OPEN_REGISTER,
    });
};

export const closeAuth = () => (dispatch) => {
    dispatch({
        type: CLOSE_AUTH,
    });
};
