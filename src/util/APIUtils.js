import {ACCESS_TOKEN, API_BASE_URL} from '../constants';

const request = (options) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => {
            if (!response.ok) {
                throw response
            }
            if (response.status !== 204) {
                return response.json()
            }
        }).then(json => {
            return json;
        });
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/v1/users/auth/signIn",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signUp(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/v1/users/auth/signUp",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/v1/users/{id}",
        method: 'GET'
    });
}


