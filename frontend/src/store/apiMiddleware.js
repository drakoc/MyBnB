import {API, urlBase} from './constants'

export default ({dispatch, getState}) => next => action => {
    if (action.type !== API) {
        return next(action)
    }

    const {currentUser} = getState();
    let myHeaders = new Headers({
        'Content-Type': 'application/json',
    });

    if (currentUser.token) {
        const accessToken = currentUser.token.access;
        myHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    const config = {
        method: action.method || 'GET',
        headers: myHeaders
    };
    if (action.data) {
        config.body = JSON.stringify(action.data);
    }

    const actionCreator = action.success;

    return fetch(`${urlBase}${action.url}`, config)
        .then(res => res.json())
        .then(data => {
            const next_action = actionCreator(data);
            dispatch(next_action);
        })
        .catch(err => {
            //error handler
        })
}
