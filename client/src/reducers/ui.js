import { OPEN_LOGIN, OPEN_REGISTER, CLOSE_AUTH } from '../actions/types';

const initialState = {
    showAuthModal: false,
    authType: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_LOGIN:
            return {
                ...state,
                showAuthModal: true,
                authType: 'login',
            };
        case OPEN_REGISTER:
            return {
                ...state,
                showAuthModal: true,
                authType: 'register',
            };
        case CLOSE_AUTH:
            return {
                ...state,
                showAuthModal: false,
                authType: null,
            };
        default:
            return state;
    }
}
