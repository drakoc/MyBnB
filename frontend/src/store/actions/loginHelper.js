import {urlBase} from "../constants";
import {setCurrentUserToken, fetchCurrentUser} from "./currentUser";

export const verifyAccessToken = verifyAccessToken => dispatch => {
    const accessToken = localStorage.getItem("userTokenAccess");
    const refreshToken = localStorage.getItem("userTokenRefresh");

    let token = {
        access: accessToken,
        refresh: refreshToken
    };

    const headers = new Headers({
        "Content-Type": "application/json"
    });
    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({token: accessToken})
    };

    return fetch(`${urlBase}/backend/api/auth/token/verify/`, config)
        .then(response => {
            if (response.status === 200) {
                dispatch(setCurrentUserToken(token));
                return true;
            } else {
                return false
            }
        })
};

export const refreshToken = refreshToken => dispatch => {

    const accessToken = localStorage.getItem("userTokenAccess");
    const refreshToken = localStorage.getItem("userTokenRefresh");

    const headers = new Headers({
        Authorization: `Bearer ${accessToken}`
    });

    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({refresh: refreshToken})
    };

    return fetch(`${urlBase}/backend/api/auth/token/refresh/`, config)
        .then(response => {
            if (response.status === 400) {
                localStorage.removeItem("userTokenRefresh");
                return false;
            } else if (response.status === 401) {
                localStorage.removeItem("userTokenRefresh");
                return false;
            } else if (response.status === 415) {
                localStorage.removeItem("userTokenRefresh");
                return false;
            }
            return response.json();
        })
        .then(data => {
            if (!data) {
                return false;
            }
            const token = {
                access: data.access,
                refresh: refreshToken
            };
            localStorage.setItem("userTokenAccess", data.access);
            dispatch(setCurrentUserToken(token));
            return true;
        });
};

export const loginAction = data => dispatch => {

    const headers = new Headers({
        "Content-Type": "application/json"
    });

    const config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    };

    return fetch(`${urlBase}/backend/api/auth/token/`, config)
        .then(response => {
            if (!response.ok) {
                return "password"
            }
            return response.json()

        })
        .then(token => {
            if (token !== "password") {
                dispatch(setCurrentUserToken(token));
                dispatch(fetchCurrentUser());
                return "ok"
            }
            return token
        })
        .catch(error => {
            return "server"
        })
};
