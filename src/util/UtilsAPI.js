import {ACCESS_TOKEN} from '../constants';

export function request(options) {

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
}