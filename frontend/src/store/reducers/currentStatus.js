import {
    SET_CURRENT_USER_AUTH,
    SET_CURRENT_USER,
    SET_FAVORITES,
    REMOVE_CURRENT_USER,
} from '../constants';

const iniState = {
    authorization: false,
    user: false,
    favorites: false,
};

const currentStatus = (state = iniState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER_AUTH:
            return {...state, ...{authorization: true}};
        case SET_FAVORITES:
            return {...state, ...{favorites: true}};
        case SET_CURRENT_USER:
            return {...state, ...{user: true}};
        case REMOVE_CURRENT_USER:
            return iniState;
        default:
            return state;
    }
};

export default currentStatus;
