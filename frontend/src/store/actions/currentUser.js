import {
    API,
    POST,
    DELETE,
    SET_CURRENT_USER,
    REMOVE_CURRENT_USER,
    SET_CURRENT_USER_AUTH,
    SET_FAVORITES,
} from '../constants';

export const setCurrentUserAuth = (data) => ({
    type: SET_CURRENT_USER_AUTH,
    token: data
});

export const setCurrentUserToken = (token) => (dispatch) => {
    localStorage.setItem("userTokenAccess", token.access);
    localStorage.setItem("userTokenRefresh", token.refresh);
    dispatch(setCurrentUserAuth(token))
};

export const fetchCurrentUser = () => ({
    type: API,
    url: '/backend/api/users/me/',
    success: setCurrentUser,
    creator: "fetchCurrentUser"
});

export const setCurrentUser = (data) => ({
    type: SET_CURRENT_USER,
    data,
});

export const logout = () => (dispatch) => {
    dispatch(removeCurrentUser());
    localStorage.clear();
};

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER,
});

export const fetchFavorites = () => ({
    type: API,
    url: '/backend/api/users/me/favorites/',
    success: setFavorites,
    creator: "fetchFavorites"
});

export const setFavorites = (data) => ({
    type: SET_FAVORITES,
    data
});

export const addToFavorites = (data) => ({
    type: API,
    url: `/backend/api/property/favorites/${data}`,
    method: POST,
    success: fetchFavorites,
    creator: "addToFavorites"
});

export const removeFromFavorites = (data) => ({
    type: API,
    url: `/backend/api/property/favorites/${data}`,
    method: DELETE,
    success: fetchFavorites,
    creator: "removeFromFavorites"

});
