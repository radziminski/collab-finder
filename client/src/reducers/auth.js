import { REGISTER_SUCCESS, LOGOUT, REGISTER_FAIL, LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                user: payload.data.user,
                isAuthenticated: true,
                isLoading: false,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            };

        default:
            return state;
    }
}
