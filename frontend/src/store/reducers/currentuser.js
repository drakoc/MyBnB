import {
    SET_CURRENT_USER,
    SET_CURRENT_USER_AUTH,
    REMOVE_CURRENT_USER,
    SET_FAVORITES,
} from '../constants'

const iniState = {
    favorites: [],
};

const currentUser = (state = iniState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return ({...state, ...{user: action.data}});
        case SET_CURRENT_USER_AUTH:
            return ({...state, ...{token: action.token}});
        case REMOVE_CURRENT_USER:
            return iniState;
        case SET_FAVORITES:
            return ({...state, ...{favorites: action.data}});
        default:
            return state
    }
};

export default currentUser
