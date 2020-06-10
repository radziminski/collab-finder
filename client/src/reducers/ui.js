import { OPEN_LOGIN, OPEN_REGISTER, CLOSE_AUTH } from '../actions/types';

const initialState = {
    showAuthModal: false,
    authModalType: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_LOGIN:
            return {
                ...state,
                showAuthModal: true,
                authModalType: 'login',
            };
        case OPEN_REGISTER:
            return {
                ...state,
                showAuthModal: true,
                authModalType: 'register',
            };
        case CLOSE_AUTH:
            return {
                ...state,
                showAuthModal: false,
                authModalType: null,
            };
        default:
            return state;
    }
}
