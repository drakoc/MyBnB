import {
    SET_PROPERTY_LIST,
} from '../constants';

const houses = (state = {}, action) => {
    switch (action.type) {
        case SET_PROPERTY_LIST:
            return {...state, ...{list: action.data}};
        default:
            return state;
    }
};

export default houses;
