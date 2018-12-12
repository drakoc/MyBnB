import {
    API,
    SET_PROPERTY_LIST,
} from '../constants';

export const fetchProperties = (canton) => ({
    type: API,
    url: `/backend/api/property/bycanton/?canton=${canton}`,
    success: setPropertiesList,
});

const setPropertiesList = (data) => ({
    type: SET_PROPERTY_LIST,
    data,
});
