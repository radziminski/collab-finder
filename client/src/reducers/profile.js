import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, SAVE_PROFILE, PROFILE_LOADING } from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    isLoading: false,
    error: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: payload.profile,
                isLoading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                isLoading: false,
                error: null,
            };
        case SAVE_PROFILE:
            return {
                ...state,
                profile: payload.profile,
                isLoading: false,
            };
        default:
            return state;
    }
}
