import { SET_ALERT } from '../actions/types';

const initialState = {
    type: null,
    msg: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ALERT:
            return {
                type: action.payload.type,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
}
